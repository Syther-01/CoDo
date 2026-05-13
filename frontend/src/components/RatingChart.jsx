import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

function CustomTooltip({ active, payload }) {

  if (active && payload && payload.length) {

    const data = payload[0].payload

    return (

      <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 shadow-lg">

        <p className="text-white font-semibold text-sm">
          {data.contest}
        </p>

        <p className="text-gray-400 text-sm mt-1">
          {data.fullDate}
        </p>

        <p className="text-blue-400 font-bold mt-2">
          Rating: {data.rating}
        </p>

      </div>
    )
  }

  return null
}

function RatingChart({ contests }) {

  const chartData = contests.map((contest, index) => {

    const date = new Date(
      contest.ratingUpdateTimeSeconds * 1000
    )

    return {

      index,

      displayDate: date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit"
      }),

      fullDate: date.toLocaleDateString(),

      contest: contest.contestName,

      rating: contest.newRating
    }
  })

  return (

    <div className="max-w-7xl mx-auto mt-24 px-6">

      {/* Heading */}
      <div className="mb-8">

        <h2 className="text-4xl font-bold">
          Rating History
        </h2>

        <p className="text-gray-500 mt-2">
          Month vs Rating progression
        </p>

      </div>

      {/* Chart Container */}
      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

        <ResponsiveContainer width="100%" height={500}>

          <LineChart
            data={chartData}

            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 30
            }}
          >

            <CartesianGrid
              stroke="#222"
              vertical={false}
            />

            <XAxis
              dataKey="index"

              tickFormatter={(value) =>
                value % 5 === 0
                  ? chartData[value]?.displayDate
                  : ""
              }

              tick={{
                fill: "#777",
                fontSize: 12
              }}

              tickLine={false}

              axisLine={false}

              angle={-20}

              textAnchor="end"

              height={60}
            />

            <YAxis
              tick={{
                fill: "#777",
                fontSize: 12
              }}

              tickLine={false}

              axisLine={false}

              width={50}

              domain={['dataMin - 100', 'dataMax + 100']}
            />

            <Tooltip
              content={<CustomTooltip />}

              cursor={{
                stroke: "#444",
                strokeWidth: 1
              }}

              wrapperStyle={{
                outline: "none"
              }}
            />

            <Line
              type="monotone"

              dataKey="rating"

              stroke="#5b9bd5"

              strokeWidth={2}

              dot={{
                r: 3,
                fill: "#5b9bd5"
              }}

              activeDot={{
                r: 7,
                fill: "#ffffff",
                stroke: "#5b9bd5",
                strokeWidth: 2
              }}

              isAnimationActive={true}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default RatingChart