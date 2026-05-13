function Features() {

  const features = [

    {
      title: "Contest Analytics",

      desc:
        "Track contest performance, rankings, rating changes, and participation trends across coding platforms."
    },

    {
      title: "Topic Weakness Detection",

      desc:
        "Identify weak problem-solving areas through topic-wise analysis, contest bottlenecks, and submission patterns."
    },

    {
      title: "DSA Progress Tracking",

      desc:
        "Monitor LeetCode progress, difficulty distribution, topic coverage, and long-term solving consistency."
    }

  ]

  return (

    <section className="px-6 md:px-12 py-24">

      <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">

        Core Features

      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {features.map((feature, index) => (

          <div
            key={index}

            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 hover:scale-105 hover:border-purple-500/40 transition duration-300"
          >

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 mb-6"></div>

            <h3 className="text-3xl font-bold mb-5">

              {feature.title}

            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">

              {feature.desc}

            </p>

          </div>

        ))}

      </div>

    </section>

  )

}

export default Features