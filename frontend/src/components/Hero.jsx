function Hero() {

  return (

    <section className="flex flex-col items-center justify-center text-center py-36 px-6 relative">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent blur-3xl"></div>

      {/* Top Tag */}
      <p className="text-purple-400 font-semibold tracking-[0.35em] uppercase mb-8 text-sm">

        Coding Analytics Platform

      </p>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-8xl font-extrabold leading-tight max-w-6xl">

        Track.
        <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">

          {" "}Analyze.

        </span>

        <br />

        Improve Faster.

      </h1>

      {/* Description */}
      <p className="text-gray-400 text-lg md:text-2xl mt-12 max-w-3xl leading-relaxed">

        CoDo helps programmers analyze performance,
        identify weak topics,
        visualize progress,
        and improve through detailed coding analytics.

      </p>

    </section>

  )

}

export default Hero