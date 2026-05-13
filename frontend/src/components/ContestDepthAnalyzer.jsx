import {
  useEffect,
  useState
} from "react"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

function ContestDepthAnalyzer({
  contests,
  submissions
}) {

  const [contestInsights, setContestInsights] =
    useState([])

  const [selectedContest, setSelectedContest] =
    useState(null)

  const [chartData, setChartData] =
    useState([])

  // GENERIC TAGS
  const genericTags = [

    "math",
    "sortings",
    "brute force",
    "constructive algorithms"

  ]

  // HIGH PRIORITY TOPICS
  const importantTopics = [

    "dp",
    "graphs",
    "trees",
    "data structures",
    "dfs and similar",
    "shortest paths",
    "flows",
    "bitmasks",
    "number theory",
    "two pointers",
    "combinatorics",
    "geometry"

  ]

  useEffect(() => {

    async function analyze() {

      try {

        // FETCH ALL PROBLEMS
        const response = await fetch(
          "https://codeforces.com/api/problemset.problems"
        )

        const data =
          await response.json()

        if (data.status !== "OK")
          return

        const allProblems =
          data.result.problems || []

        const insights = []

        const topicCount = {}

        // ONLY RATED CONTESTS
        const ratedContests =
          contests.filter(
            (contest) =>
              contest.newRating
          )

        // ANALYZE EACH CONTEST
        for (const contest of ratedContests) {

          const contestId =
            contest.contestId

          // GET PROBLEMS
          const contestProblems =

            allProblems.filter(
              (problem) =>
                problem.contestId ===
                contestId
            )

          if (!contestProblems.length)
            continue

          // SORT A B C D...
          contestProblems.sort((a, b) =>
            a.index.localeCompare(
              b.index
            )
          )

          // CONTEST SUBMISSIONS
          const contestSubs =

            submissions.filter(
              (sub) =>
                sub.contestId ===
                contestId
            )

          let bottleneck = null

          // FIND FIRST UNSOLVED
          for (const problem of contestProblems) {

            const solved =

              contestSubs.some(

                (sub) =>

                  sub.problem.index ===
                    problem.index &&

                  sub.verdict ===
                    "OK"

              )

            if (!solved) {

              bottleneck =
                problem

              break

            }

          }

          // FULL SOLVE
          if (!bottleneck)
            continue

          const tags =
            bottleneck.tags || []

          // REMOVE GENERIC
          const cleanTags =

            tags.filter(
              (tag) =>
                !genericTags.includes(tag)
            )

          // HIGH PRIORITY TAGS
          const priorityTags =

            cleanTags.filter(
              (tag) =>
                importantTopics.includes(tag)
            )

          let finalTags = []

          // IF IMPORTANT EXISTS
          if (priorityTags.length) {

            // TAKE ALL IMPORTANT TAGS
            finalTags =
              priorityTags

          }

          // OTHERWISE TAKE NORMAL TAGS
          else {

            finalTags =
              cleanTags

          }

          // COUNT TOPICS
          finalTags.forEach((tag) => {

            if (!topicCount[tag]) {

              topicCount[tag] = 0

            }

            topicCount[tag]++

          })

          // STORE INSIGHT
          insights.push({

            contestId,

            contestTitle:
              contest.contestName,

            contestName:
              bottleneck.name,

            firstUnsolved:
              bottleneck.index,

            rating:
              bottleneck.rating,

            tags:
              finalTags,

            url:
              `https://codeforces.com/problemset/problem/${contestId}/${bottleneck.index}`

          })

        }

        // GRAPH DATA
        const graphData =

          Object.entries(topicCount)

            .map(
              ([topic, count]) => ({

                topic,

                count

              })
            )

            .sort(
              (a, b) =>
                b.count - a.count
            )

        setChartData(graphData)

        setContestInsights(insights)

      } catch (error) {

        console.log(error)

      }

    }

    analyze()

  }, [contests, submissions])

  const topWeakTopics =
    chartData.slice(0, 5)

  return (

    <div className="max-w-7xl mx-auto mt-24 px-6">

      {/* HEADING */}
      <div className="mb-10">

        <h2 className="text-4xl font-bold">
          Contest Depth Analyzer
        </h2>

        <p className="text-gray-500 mt-2">
          Detect where contest-solving momentum breaks
        </p>

      </div>

      {/* TOPICS */}
      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-12">

        <h3 className="text-2xl font-bold mb-8 text-red-400">
          Major Bottleneck Topics
        </h3>

        <div className="grid md:grid-cols-5 gap-6">

          {topWeakTopics.map(
            (topic, index) => (

              <div
                key={index}

                className="bg-black/30 border border-gray-800 rounded-2xl p-6"
              >

                <p className="text-lg font-semibold capitalize">
                  {topic.topic}
                </p>

                <h3 className="text-4xl font-bold mt-4 text-red-400">
                  {topic.count}
                </h3>

                <p className="text-gray-500 mt-2">
                  bottlenecks
                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* GRAPH */}
      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

        <h3 className="text-2xl font-bold mb-8">
          First Unsolved Topic Frequency
        </h3>

        <div className="overflow-x-auto">

          <div
            style={{
              width:
                `${chartData.length * 120}px`,
              minWidth: "100%"
            }}
          >

            <ResponsiveContainer
              width="100%"
              height={500}
            >

              <BarChart
                data={chartData}
              >

                <CartesianGrid
                  stroke="#222"
                  vertical={false}
                />

                <XAxis
                  dataKey="topic"

                  tick={{
                    fill: "#777",
                    fontSize: 12
                  }}

                  angle={-20}

                  textAnchor="end"

                  tickLine={false}

                  axisLine={false}

                  height={80}
                />

                <YAxis
                  tick={{
                    fill: "#777"
                  }}

                  tickLine={false}

                  axisLine={false}
                />

                <Tooltip

                  content={({ active, payload }) => {

                    if (
                      active &&
                      payload &&
                      payload.length
                    ) {

                      const data =
                        payload[0].payload

                      return (

                        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 shadow-xl">

                          <p className="text-white font-semibold text-lg capitalize">
                            {data.topic}
                          </p>

                          <div className="mt-3">

                            <p className="text-red-400 font-semibold">
                              {data.count} bottlenecks
                            </p>

                          </div>

                        </div>

                      )

                    }

                    return null

                  }}
                />

                <Bar
                  dataKey="count"

                  radius={[8, 8, 0, 0]}

                  fill="#ef4444"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* EXPLORER */}
      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mt-12">

        <h3 className="text-2xl font-bold mb-8">
          Contest Bottleneck Explorer
        </h3>

        <select

          defaultValue=""

          onChange={(e) => {

            const selected =
              contestInsights.find(
                (contest) =>
                  contest.contestId.toString() ===
                  e.target.value
              )

            setSelectedContest(selected)

          }}

          className="w-full bg-black/30 border border-gray-800 rounded-2xl px-5 py-4 outline-none mb-10"
        >

          <option
            value=""
            disabled
          >
            Select Contest
          </option>

          {contestInsights.map(
            (contest, index) => (

              <option
                key={index}
                value={contest.contestId}
              >

                {contest.contestTitle}

              </option>

            )
          )}

        </select>

        {selectedContest && (

          <div className="bg-black/30 border border-gray-800 rounded-2xl p-8">

            <h4 className="text-3xl font-bold">

              {selectedContest.firstUnsolved}
              {" — "}
              {selectedContest.contestName}

            </h4>

            <div className="flex flex-wrap gap-3 mt-6">

              {selectedContest.tags.map(
                (tag, idx) => (

                  <span
                    key={idx}

                    className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>

                )
              )}

            </div>

            <p className="text-gray-500 mt-6 text-lg">

              Problem Rating:
              {" "}
              {selectedContest.rating || "N/A"}

            </p>

            <a
              href={selectedContest.url}

              target="_blank"

              rel="noreferrer"

              className="inline-block mt-8 bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-2xl font-bold"
            >
              Solve Problem
            </a>

          </div>

        )}

      </div>

    </div>
  )
}

export default ContestDepthAnalyzer