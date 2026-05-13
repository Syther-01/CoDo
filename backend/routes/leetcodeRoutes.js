const express = require("express");
const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// Direct LeetCode GraphQL  (same approach as server.py)
// Node calls this server-side so CORS is not an issue.
// These headers stop LeetCode returning an HTML block page.
// ─────────────────────────────────────────────────────────────────────────────
const LC_GRAPHQL = "https://leetcode.com/graphql";

const LC_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Referer: "https://leetcode.com",
  Origin: "https://leetcode.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
    "AppleWebKit/537.36 (KHTML, like Gecko) " +
    "Chrome/124.0.0.0 Safari/537.36",
  "x-csrftoken": "dummy",
};

// mirrors lc_post() from server.py
async function lcPost(query, variables = {}) {
  const resp = await fetch(LC_GRAPHQL, {
    method: "POST",
    headers: LC_HEADERS,
    body: JSON.stringify({ query, variables }),
  });

  const raw = await resp.text();

  if (raw.trim().startsWith("<")) {
    throw new Error(
      `LeetCode returned HTML (HTTP ${resp.status}). ` +
        "Likely rate-limited — wait 30 s and retry."
    );
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`LeetCode response not valid JSON: ${raw.slice(0, 200)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/leetcode/analysis/:username
// Used by DSA.jsx → LeetCodeCard + LeetCodeAnalytics
// Returns { profile, stats, topics }
//
// Step 1 – one GraphQL call: profile + submitStats + tagProblemCounts
// Step 2 – fetch last 50 AC submissions, resolve real E/M/H per topic
// Step 3 – score topics → strength: "strong" | "mid" | "weak"
// ─────────────────────────────────────────────────────────────────────────────
router.get("/analysis/:username", async (req, res) => {
  const { username } = req.params;

  const USER_QUERY = `
    query GetUser($u: String!) {
      matchedUser(username: $u) {
        username
        profile { realName userAvatar ranking }
        submitStats: submitStatsGlobal {
          acSubmissionNum { difficulty count }
        }
        tagProblemCounts {
          advanced     { tagName tagSlug problemsSolved }
          intermediate { tagName tagSlug problemsSolved }
          fundamental  { tagName tagSlug problemsSolved }
        }
      }
    }
  `;

  const SUB_QUERY = `
    query($u: String!, $limit: Int!) {
      recentAcSubmissionList(username: $u, limit: $limit) { titleSlug }
    }
  `;

  const PROB_QUERY = `
    query($slug: String!) {
      question(titleSlug: $slug) {
        difficulty
        topicTags { name slug }
      }
    }
  `;

  try {
    // ── 1. User profile + tag counts ───────────────────────────────────────
    const userData = await lcPost(USER_QUERY, { u: username });

    if (!userData?.data?.matchedUser) {
      const msg =
        userData?.errors?.[0]?.message ?? `User "${username}" not found.`;
      return res.status(404).json({ message: msg });
    }

    const u = userData.data.matchedUser;

    // ── 2. Parse overall easy / medium / hard counts ───────────────────────
    const acNums   = u.submitStats?.acSubmissionNum ?? [];
    const getCount = (diff) =>
      acNums.find((x) => x.difficulty === diff)?.count ?? 0;

    const totalSolved = getCount("All");
    const easySolved  = getCount("Easy");
    const medSolved   = getCount("Medium");
    const hardSolved  = getCount("Hard");

    // ── 3. Fetch last 50 AC submissions → real per-topic E/M/H ────────────
    //    (same loop as server.py get_submissions)
    let topicDiff = {};

    try {
      const subData = await lcPost(SUB_QUERY, { u: username, limit: 50 });
      const subs    = subData?.data?.recentAcSubmissionList ?? [];
      const slugs   = [...new Set(subs.map((s) => s.titleSlug))].slice(0, 30);

      for (const slug of slugs) {
        try {
          const r = await lcPost(PROB_QUERY, { slug });
          const q = r?.data?.question;
          if (!q) continue;

          const diff = q.difficulty.toLowerCase(); // "easy" | "medium" | "hard"

          for (const tag of q.topicTags ?? []) {
            if (!topicDiff[tag.name]) {
              topicDiff[tag.name] = { easy: 0, medium: 0, hard: 0 };
            }
            topicDiff[tag.name][diff] += 1;
          }
        } catch (inner) {
          console.warn(`  skip ${slug}:`, inner.message);
        }
      }
    } catch (subErr) {
      // submissions are optional — falls back to ratio estimate below
      console.warn("Submissions fetch failed, using ratio estimate:", subErr.message);
    }

    // ── 4. Build topics from tagProblemCounts ──────────────────────────────
    const { fundamental = [], intermediate = [], advanced = [] } =
      u.tagProblemCounts ?? {};

    // Global ratios used as fallback when real submission data is missing
    const eRatio = totalSolved > 0 ? easySolved / totalSolved : 0.34;
    const hRatio = totalSolved > 0 ? hardSolved / totalSolved : 0.21;

    const buildTopics = (tags, tier) =>
      tags.map((tag) => {
        const n    = tag.problemsSolved;
        const real = topicDiff[tag.tagName];

        let e, m, h;
        if (real) {
          // real submission data available — scale ratios to full solved count
          const total = real.easy + real.medium + real.hard || 1;
          e = Math.round(n * (real.easy / total));
          h = Math.round(n * (real.hard / total));
          m = Math.max(0, n - e - h);
        } else {
          // fallback: global difficulty ratio
          e = Math.round(n * eRatio);
          h = Math.round(n * hRatio);
          m = Math.max(0, n - e - h);
        }

        return {
          name:       tag.tagName,
          difficulty: tier,
          count:      n,
          easy:       Math.max(0, e),
          medium:     Math.max(0, m),
          hard:       Math.max(0, h),
        };
      });

    const topics = [
      ...buildTopics(fundamental,  "Easy"),
      ...buildTopics(intermediate, "Medium"),
      ...buildTopics(advanced,     "Hard"),
    ].sort((a, b) => b.count - a.count);

    // ── 5. Score → strong / mid / weak ────────────────────────────────────
    const score    = (t) => t.easy * 1 + t.medium * 2.5 + t.hard * 5;
    const avgScore =
      topics.map(score).reduce((s, x) => s + x, 0) / Math.max(topics.length, 1);

    topics.forEach((t) => {
      const s    = score(t);
      t.strength =
        s >= avgScore * 1.2  ? "strong" :
        s <= avgScore * 0.65 ? "weak"   : "mid";
    });

    // ── 6. Send response ───────────────────────────────────────────────────
    res.json({
      profile: {
        username,
        realName: u.profile?.realName   ?? username,
        avatar:   u.profile?.userAvatar ?? null,
        ranking:  u.profile?.ranking    ?? null,
      },
      stats: {
        total:  totalSolved,
        easy:   easySolved,
        medium: medSolved,
        hard:   hardSolved,
      },
      topics,
    });

  } catch (err) {
    console.error("Analysis Route Error:", err.message);
    const status = err.message.includes("HTML") ? 502 : 500;
    res.status(status).json({ message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/leetcode/skill-map/:username  (kept — other parts of app may use it)
// ─────────────────────────────────────────────────────────────────────────────
router.get("/skill-map/:username", async (req, res) => {
  const { username } = req.params;

  const query = `
    query GetUser($u: String!) {
      matchedUser(username: $u) {
        tagProblemCounts {
          advanced     { tagName tagSlug problemsSolved }
          intermediate { tagName tagSlug problemsSolved }
          fundamental  { tagName tagSlug problemsSolved }
        }
      }
    }
  `;

  try {
    const data = await lcPost(query, { u: username });

    if (!data?.data?.matchedUser?.tagProblemCounts) {
      return res.status(404).json({ message: "User stats not found" });
    }

    const { fundamental, intermediate, advanced } =
      data.data.matchedUser.tagProblemCounts;

    const topicMap = {};
    const processTags = (tags, difficulty) =>
      (tags ?? []).forEach((tag) => {
        topicMap[tag.tagName] = { count: tag.problemsSolved, difficulty };
      });

    processTags(fundamental,  "Easy");
    processTags(intermediate, "Medium");
    processTags(advanced,     "Hard");

    res.json({ username, topicMap });
  } catch (err) {
    const status = err.message.includes("HTML") ? 502 : 500;
    res.status(status).json({ message: err.message });
  }
});

module.exports = router;