import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

// IMPORTANT INTERVIEW TOPICS
const IMPORTANT_TOPICS = [

  "Array",
  "String",
  "Hash Table",
  "Math",
  "Dynamic Programming",
  "Greedy",
  "Sorting",
  "Binary Search",
  "Depth-First Search",
  "Breadth-First Search",
  "Tree",
  "Binary Tree",
  "Binary Search Tree",
  "Graph",
  "Heap (Priority Queue)",
  "Stack",
  "Queue",
  "Linked List",
  "Recursion",
  "Backtracking",
  "Sliding Window",
  "Two Pointers",
  "Bit Manipulation",
  "Prefix Sum",
  "Trie",
  "Union Find",
  "Monotonic Stack",
  "Topological Sort",
  "Shortest Path",
  "Matrix",
  "Simulation",
  "Counting",
  "Memoization",
  "Divide and Conquer",
  "Segment Tree",
  "Binary Indexed Tree",
  "Intervals",
  "Merge Sort",
  "Quickselect",
  "Bucket Sort",
  "Counting Sort",
  "Geometry",
  "Combinatorics",
  "Number Theory",
  "Probability and Statistics",
  "Game Theory",
  "Rolling Hash",
  "Suffix Array",
  "Bitmask"

]

// Easy×1  Medium×3  Hard×6
const calcScore = (t) =>

  t.easy * 1 +
  t.medium * 3 +
  t.hard * 6

function getLevel(score) {

  if (score >= 121)
    return "Expert"

  if (score >= 61)
    return "Advanced"

  if (score >= 21)
    return "Intermediate"

  return "Beginner"

}

function LeetCodeAnalytics({
  topics = []
}) {

  if (!topics.length)
    return null

  // FILTER IMPORTANT TOPICS
  const filteredTopics =

    topics.filter((t) =>

      IMPORTANT_TOPICS.includes(
        t.name
      )

    )

  // SCORE TOPICS
  const scored =

    filteredTopics

      .map((t) => ({

        ...t,

        score:
          calcScore(t),

        level:
          getLevel(
            calcScore(t)
          )

      }))

      .sort(
        (a, b) =>
          b.score - a.score
      )

  // STRONG
  const strongTopics =

    [...scored]

      .sort(
        (a, b) =>
          b.score - a.score
      )

      .slice(0, 3)

  // WEAK
  const weakTopics =

    [...scored]

      .sort(
        (a, b) =>
          a.score - b.score
      )

      .slice(0, 3)

  // CHART
  const chartData =

    scored

      .map((t) => ({

        topic: t.name,

        Score: t.score,

        Easy: t.easy,

        Medium: t.medium,

        Hard: t.hard,

      }))

  // TOOLTIP
  const CustomTooltip = ({
    active,
    payload
  }) => {

    if (
      !active ||
      !payload?.length
    ) return null

    const d =
      payload[0].payload

    return (

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 shadow-xl">

        <p className="text-white font-semibold mb-2">

          {d.topic}

        </p>

        <p className="text-gray-400 text-sm">

          Easy:
          {" "}
          {d.Easy}
          {" "}
          ·
          {" "}
          {d.Easy * 1}
          {" "}
          pts

        </p>

        <p className="text-gray-400 text-sm">

          Medium:
          {" "}
          {d.Medium}
          {" "}
          ·
          {" "}
          {d.Medium * 3}
          {" "}
          pts

        </p>

        <p className="text-gray-400 text-sm">

          Hard:
          {" "}
          {d.Hard}
          {" "}
          ·
          {" "}
          {d.Hard * 6}
          {" "}
          pts

        </p>

        <p className="text-cyan-400 text-sm font-bold mt-2 border-t border-gray-800 pt-2">

          Score:
          {" "}
          {d.Score}

        </p>

      </div>

    )

  }

  return (

    <div className="max-w-7xl mx-auto mt-24 px-6 pb-24">

      {/* Heading */}
      <div className="mb-10">

        <h2 className="text-5xl font-black">

          Topic Mastery Analytics

        </h2>

        <p className="text-gray-400 mt-3 text-lg">

          Interview-focused DSA analysis · Easy ×1 · Medium ×3 · Hard ×6

        </p>

      </div>

      {/* Strong + Weak */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">

        {/* Strong */}
        <div className="bg-[#111] border border-green-500/10 rounded-3xl p-8">

          <h3 className="text-3xl font-bold text-green-400 mb-8">

            Strongest Topics

          </h3>

          <div className="divide-y divide-gray-800">

            {strongTopics.length > 0

              ? strongTopics.map((t, i) => (

                <div
                  key={i}
                  className="flex items-center justify-between py-5"
                >

                  <div>

                    <p className="text-white font-bold text-xl">

                      {t.name}

                    </p>

                    <p className="text-cyan-400 text-sm mt-1">

                      {t.level}

                    </p>

                    <p className="text-gray-500 text-sm mt-1">

                      E:{t.easy}
                      {" "}
                      ·
                      {" "}
                      M:{t.medium}
                      {" "}
                      ·
                      {" "}
                      H:{t.hard}

                    </p>

                  </div>

                  <p className="text-green-400 font-black text-5xl">

                    {t.score}

                  </p>

                </div>

              ))

              : (

                <p className="text-gray-600 py-4">

                  No strong topics yet.

                </p>

              )}

          </div>

        </div>

        {/* Weak */}
        <div className="bg-[#111] border border-red-500/10 rounded-3xl p-8">

          <h3 className="text-3xl font-bold text-red-400 mb-8">

            Topics to Improve

          </h3>

          <div className="divide-y divide-gray-800">

            {weakTopics.length > 0

              ? weakTopics.map((t, i) => (

                <div
                  key={i}
                  className="flex items-center justify-between py-5"
                >

                  <div>

                    <p className="text-white font-bold text-xl">

                      {t.name}

                    </p>

                    <p className="text-cyan-400 text-sm mt-1">

                      {t.level}

                    </p>

                    <p className="text-gray-500 text-sm mt-1">

                      E:{t.easy}
                      {" "}
                      ·
                      {" "}
                      M:{t.medium}
                      {" "}
                      ·
                      {" "}
                      H:{t.hard}

                    </p>

                  </div>

                  <p className="text-red-400 font-black text-5xl">

                    {t.score}

                  </p>

                </div>

              ))

              : (

                <p className="text-gray-600 py-4">

                  No weak topics detected.

                </p>

              )}

          </div>

        </div>

      </div>

      {/* Chart */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8">

        <h3 className="text-3xl font-bold mb-2">

          Topic Score Breakdown

        </h3>

        <p className="text-gray-400 mt-2 mb-8">

          Top interview-relevant topics ranked by score

        </p>

        <div className="overflow-x-auto">

          <div
            style={{
              width:
                `${Math.max(
                  chartData.length * 60,
                  600
                )}px`,
              minWidth: "100%"
            }}
          >

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <BarChart
                data={chartData}

                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 60
                }}
              >

                <CartesianGrid
                  stroke="#222"
                  vertical={false}
                />

                <XAxis
                  dataKey="topic"

                  tick={{
                    fill: "#777",
                    fontSize: 11
                  }}

                  angle={-25}

                  textAnchor="end"

                  tickLine={false}

                  axisLine={false}

                  height={80}
                />

                <YAxis
                  tick={{
                    fill: "#777",
                    fontSize: 11
                  }}

                  tickLine={false}

                  axisLine={false}
                />

                <Tooltip
                  content={<CustomTooltip />}
                />

                <Bar
                  dataKey="Score"

                  fill="#06b6d4"

                  radius={[4, 4, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  )

}

export default LeetCodeAnalytics