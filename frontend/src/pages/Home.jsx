import Navbar from "../components/Navbar"

import Hero from "../components/Hero"

import Features from "../components/Features"

import { Link } from "react-router-dom"

function Home() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    )

  return (

    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Logged In Dashboard Buttons */}
      {user && (

        <section className="px-6 -mt-8 mb-24">

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

            {/* CP Dashboard */}
            <Link to="/cp">

              <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 hover:scale-[1.03] hover:border-purple-500/40 transition duration-300 flex flex-col">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-black mb-8">

                  CP

                </div>

                <h2 className="text-4xl font-black">

                  CP Dashboard

                </h2>

                <p className="text-gray-400 text-lg mt-5 leading-relaxed">

                  Analyze contests, track ratings,
                  detect bottlenecks,
                  and improve competitive programming performance.

                </p>

              </div>

            </Link>

            {/* DSA Dashboard */}
            <Link to="/dsa">

              <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 hover:scale-[1.03] hover:border-cyan-500/40 transition duration-300 flex flex-col">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl font-black mb-8">

                  DSA

                </div>

                <h2 className="text-4xl font-black">

                  DSA Dashboard

                </h2>

                <p className="text-gray-400 text-lg mt-5 leading-relaxed">

                    Track LeetCode progress,
                    analyze topic coverage,
                    monitor solving consistency,
                    and improve long-term DSA performance.

                </p>

              </div>

            </Link>

          </div>

        </section>

      )}

      {/* Features */}
      <Features />

    </div>

  )

}

export default Home