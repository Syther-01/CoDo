import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"
import LeetCodeCard from "../components/LeetCodeCard"
import LeetCodeAnalytics from "../components/LeetCodeAnalytics"

import { getLeetCodeAnalysis } from "../services/leetcode"

function DSA() {

  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function fetchUser(handle) {

    try {

      setLoading(true)
      setError("")
      setAnalysis(null)

      const data = await getLeetCodeAnalysis(handle)

      if (!data) {
        setError("Could not load data for this handle. Check the username.")
        return
      }

      setAnalysis(data)

    } catch (err) {

      console.error(err)
      setError("Something went wrong. Try again.")

    } finally {

      setLoading(false)

    }

  }

  // Auto-load logged-in user's LeetCode handle
  useEffect(() => {

    const savedUser = JSON.parse(localStorage.getItem("user"))

    if (savedUser && savedUser.leetcodeHandle) {
      fetchUser(savedUser.leetcodeHandle)
    }

  }, [])

  return (

    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-20" />
      <div className="absolute top-40 right-0 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20" />

      <Navbar />

      {/* Heading */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold">
          DSA Performance Dashboard
        </p>

        <h1 className="text-6xl font-black mt-6 leading-tight">
          LeetCode
          <br />
          Analytics Platform
        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-3xl leading-relaxed">
          Track problem-solving consistency, topic strengths,
          interview readiness, and long-term DSA growth.
        </p>

      </section>

      {/* Loading */}
      {loading && (
        <div className="text-center mt-16 text-gray-400 text-lg">
          Loading analytics...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center mt-16 px-6">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      )}

      {/* No handle saved */}
      {!loading && !error && !analysis && (
        <div className="text-center mt-24 px-6">

          <h2 className="text-4xl font-bold">
            No LeetCode Handle Found
          </h2>

          <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Add your LeetCode handle from profile settings to access analytics.
          </p>

        </div>
      )}

      {/* Analytics */}
      {!loading && analysis && (
        <>
          <LeetCodeCard profile={analysis.profile} stats={analysis.stats} />
          <LeetCodeAnalytics topics={analysis.topics} stats={analysis.stats} />
        </>
      )}

    </div>

  )

}

export default DSA