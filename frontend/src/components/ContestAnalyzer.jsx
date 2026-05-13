function ContestAnalyzer({ contests }) {

  if (!contests.length) return null

  const ratingChanges = contests.map(
    (contest) =>
      contest.newRating - contest.oldRating
  )

  const positiveContests =
    ratingChanges.filter((x) => x > 0).length

  const negativeContests =
    ratingChanges.filter((x) => x < 0).length

  const averageChange = (

    ratingChanges.reduce(
      (a, b) => a + b,
      0
    ) / ratingChanges.length

  ).toFixed(1)

  const maxGain =
    Math.max(...ratingChanges)

  const maxLoss =
    Math.min(...ratingChanges)

  const currentRating =
    contests[contests.length - 1]?.newRating

  const peakRating =
    Math.max(
      ...contests.map((c) => c.newRating)
    )

  // AI-like insights
  const insights = []

  if (averageChange > 0) {

    insights.push(
      "Your overall contest trajectory is positive with consistent rating growth."
    )

  } else {

    insights.push(
      "Your contest performance has been unstable recently. Focus on consistency and reducing negative contests."
    )

  }

  if (negativeContests > positiveContests) {

    insights.push(
      "You are losing rating in more contests than you are gaining. Practicing virtual contests under time pressure may help."
    )

  }

  if (maxLoss < -100) {

    insights.push(
      "Large rating drops indicate inconsistency during difficult contests. Improving implementation accuracy could stabilize performance."
    )

  }

  if (peakRating - currentRating > 150) {

    insights.push(
      "Your current rating is significantly below your peak. This may indicate inconsistency or lack of recent practice."
    )

  }

  if (maxGain > 100) {

    insights.push(
      "You have shown strong peak performances. Your ceiling is high when contest execution goes well."
    )

  }

  return (

    <div className="max-w-7xl mx-auto mt-24 px-6">

      {/* Heading */}
      <div className="mb-10">

        <h2 className="text-4xl font-bold">
          AI Contest Analyzer
        </h2>

        <p className="text-gray-500 mt-2">
          Intelligent insights generated from contest performance
        </p>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

          <p className="text-gray-500">
            Average Rating Change
          </p>

          <h3 className="text-4xl font-bold mt-3 text-blue-400">
            {averageChange}
          </h3>

        </div>

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

          <p className="text-gray-500">
            Positive Contests
          </p>

          <h3 className="text-4xl font-bold mt-3 text-green-400">
            {positiveContests}
          </h3>

        </div>

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

          <p className="text-gray-500">
            Negative Contests
          </p>

          <h3 className="text-4xl font-bold mt-3 text-red-400">
            {negativeContests}
          </h3>

        </div>

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

          <p className="text-gray-500">
            Peak Rating
          </p>

          <h3 className="text-4xl font-bold mt-3 text-purple-400">
            {peakRating}
          </h3>

        </div>

      </div>

      {/* Insights */}
      <div className="bg-[#111] border border-gray-800 rounded-3xl p-8">

        <h3 className="text-3xl font-bold mb-8">
          Generated Insights
        </h3>

        <div className="space-y-6">

          {insights.map((insight, index) => (

            <div
              key={index}

              className="bg-black/30 border border-gray-800 rounded-2xl p-6"
            >

              <div className="flex gap-4">

                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">

                  AI

                </div>

                <p className="text-lg text-gray-300 leading-relaxed">

                  {insight}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default ContestAnalyzer