// All requests go through your Node backend (/api/leetcode/...)
// Node proxies to LeetCode GraphQL server-side — no CORS issues.

// ── used by any page that just needs basic profile ────────────────────────────
export async function getLeetCodeUser(username) {
  try {
    const response = await fetch(`/api/leetcode/analysis/${username}`);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to fetch user");
    }
    const data = await response.json();
    // return in a shape compatible with old callers that expect flat fields
    return {
      ...data.profile,
      totalSolved:  data.stats.total,
      easySolved:   data.stats.easy,
      mediumSolved: data.stats.medium,
      hardSolved:   data.stats.hard,
    };
  } catch (error) {
    console.error("getLeetCodeUser error:", error);
    return null;
  }
}

// ── full analysis for DSA.jsx → LeetCodeCard + LeetCodeAnalytics ─────────────
// Returns { profile, stats, topics } or null on error
export async function getLeetCodeAnalysis(username) {
  try {
    const response = await fetch(`/api/leetcode/analysis/${username}`);

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to fetch analysis");
    }

    return await response.json();
  } catch (error) {
    console.error("getLeetCodeAnalysis error:", error);
    return null;
  }
}