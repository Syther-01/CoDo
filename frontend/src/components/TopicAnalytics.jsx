import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

function TopicAnalytics({ submissions = [] }) {

  const topicStats = {}

  // PROCESS ONLY ACCEPTED SUBMISSIONS
  submissions.forEach((sub) => {

    if (sub.verdict !== "OK") return

    const tags =
      sub.problem?.tags || []

    const rating =
      sub.problem?.rating || 800

    tags.forEach((tag) => {

      if (!topicStats[tag]) {

        topicStats[tag] = {}

      }

      if (!topicStats[tag][rating]) {

        topicStats[tag][rating] = 0

      }

      topicStats[tag][rating]++

    })

  })

  // CREATE TOPIC RATINGS
  const chartData =

  Object.entries(topicStats)

    .map(([tag, ratings]) => {

      const sortedRatings =

        Object.entries(ratings)

          .map(([rating, count]) => ({

            rating: Number(rating),

            count

          }))

          .sort((a, b) =>
            a.rating - b.rating
          )

      let topicRating = 0

      let totalSolved = 0

      sortedRatings.forEach((item) => {

        totalSolved += item.count

      })

      // Find maximum rating
      // where >=10 solved above it
      sortedRatings.forEach((item) => {

        let solvedAbove = 0

        sortedRatings.forEach((x) => {

          if (x.rating >= item.rating) {

            solvedAbove += x.count

          }

        })

        if (solvedAbove >= 10) {

          topicRating =
            Math.max(
              topicRating,
              item.rating
            )

        }

      })

      return {

        topic: tag,

        rating: topicRating,

        solved: totalSolved

      }

    })

    .filter((item) =>
      item.solved >= 5
    )

    .sort((a, b) =>
      b.rating - a.rating
    )
  const strongestTopics =

    [...chartData]

      .sort((a, b) =>
        b.rating - a.rating
      )

      .slice(0, 3)

  // WEAKEST TOPICS
  const weakestTopics =

    [...chartData]

      .sort((a, b) =>
        a.rating - b.rating
      )

      .slice(0, 3)

  return (

    <div className="max-w-7xl mx-auto mt-24 px-6">

      {/* Heading */}
      <div className="mb-10">

        <h2 className="text-4xl font-bold">

          Topic Rating Analytics

        </h2>

        <p className="text-gray-500 mt-3 text-lg">

          Custom topic ratings
          based on solved
          Codeforces problems.

        </p>

      </div>

      {/* Strongest & Weakest */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">

        {/* Strongest */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h3 className="text-3xl font-bold text-green-400 mb-8">

            Strongest Topics

          </h3>

          <div className="space-y-6">

            {strongestTopics.map((topic, index) => (

              <div
                key={index}

                className="flex items-center justify-between border-b border-white/10 pb-5"
              >

                <div>

                  <p className="text-2xl font-semibold capitalize">

                    {topic.topic}

                  </p>

                  <p className="text-gray-500 text-sm mt-2">

                    {topic.solved}
                    {" "}
                    solved problems

                  </p>

                </div>

                <div className="text-green-400 font-black text-3xl">

                  {topic.rating}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Weakest */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h3 className="text-3xl font-bold text-red-400 mb-8">

            Weakest Topics

          </h3>

          <div className="space-y-6">

            {weakestTopics.map((topic, index) => (

              <div
                key={index}

                className="flex items-center justify-between border-b border-white/10 pb-5"
              >

                <div>

                  <p className="text-2xl font-semibold capitalize">

                    {topic.topic}

                  </p>

                  <p className="text-gray-500 text-sm mt-2">

                    {topic.solved}
                    {" "}
                    solved problems

                  </p>

                </div>

                <div className="text-red-400 font-black text-3xl">

                  {topic.rating}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Graph */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h3 className="text-3xl font-bold mb-10">

          Topic Rating Comparison

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

                margin={{
                  top: 20,
                  right: 20,
                  left: 10,
                  bottom: 40
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

                        <div className="bg-[#151515] border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">

                          <p className="text-white font-bold text-lg capitalize">

                            {data.topic}

                          </p>

                          <div className="mt-4 space-y-2">

                            <p className="text-yellow-400 font-semibold">

                              Topic Rating:
                              {" "}
                              {data.rating}

                            </p>

                            <p className="text-green-400">

                              Solved Problems:
                              {" "}
                              {data.solved}

                            </p>

                            <p className="text-gray-400 text-sm">

                              Based on first rating
                              where cumulative solved
                              problems reached 10.

                            </p>

                          </div>

                        </div>

                      )

                    }

                    return null

                  }}
                />

                <Bar
                  dataKey="rating"

                  radius={[10, 10, 0, 0]}

                  fill="#8b5cf6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  )

}

export default TopicAnalytics