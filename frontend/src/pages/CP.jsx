import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"

import ProfileCard from "../components/ProfileCard"

import RatingChart from "../components/RatingChart"

import TopicAnalytics from "../components/TopicAnalytics"

import ContestDepthAnalyzer from "../components/ContestDepthAnalyzer"

import {
  getUserInfo,
  getUserRating,
  getUserSubmissions
} from "../services/codeforces"

function CP() {

  const [user, setUser] =
    useState(null)

  const [contests, setContests] =
    useState([])

  const [submissions, setSubmissions] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  async function fetchUser(handle) {

    try {

      setLoading(true)

      const userData =
        await getUserInfo(handle)

      const ratingData =
        await getUserRating(handle)

      const submissionData =
        await getUserSubmissions(handle)

      setUser(userData)

      setContests(ratingData)

      setSubmissions(submissionData)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  // Auto Load Logged In User
  useEffect(() => {

    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      )

    if (
      savedUser &&
      savedUser.codeforcesHandle
    ) {

      fetchUser(
        savedUser.codeforcesHandle
      )

    }

  }, [])

  return (

    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

      <Navbar />

      {/* Heading */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">

        <p className="text-purple-400 uppercase tracking-[0.3em] text-sm font-semibold">

          Competitive Programming Dashboard

        </p>

        <h1 className="text-6xl font-black mt-6 leading-tight">

          Codeforces
          <br />
          Analytics

        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-3xl leading-relaxed">

          Analyze contest performance,
          rating progression,
          weak topics,
          bottlenecks,
          and competitive programming growth.

        </p>

      </section>

      {/* Loading */}
      {loading && (

        <div className="text-center mt-16 text-gray-400 text-lg">

          Loading analytics...

        </div>

      )}

      {/* Empty State */}
      {!loading && !user && (

        <div className="text-center mt-24 px-6">

          <h2 className="text-4xl font-bold">

            No Codeforces Handle Found

          </h2>

          <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">

            Add your Codeforces handle
            from the profile page
            to access analytics.

          </p>

        </div>

      )}

      {/* Analytics */}
      {!loading && user && (
        <>

          <ProfileCard user={user} />

          {contests.length > 0 && (

            <RatingChart
              contests={contests}
            />

          )}

          {submissions.length > 0 && (

            <TopicAnalytics
              submissions={submissions}
            />

          )}

          {contests.length > 0 &&
          submissions.length > 0 && (

            <ContestDepthAnalyzer
              contests={contests}
              submissions={submissions}
            />

          )}

        </>
      )}

    </div>

  )

}

export default CP