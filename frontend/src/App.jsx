import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import ProfileCard from "./components/ProfileCard"
import SearchBar from "./components/SearchBar"
import RatingChart from "./components/RatingChart"
import TopicAnalytics from "./components/TopicAnalytics"
import PlatformSelector from "./components/PlatformSelector"
import LeetCodeCard from "./components/LeetCodeCard"
import LeetCodeAnalytics from "./components/LeetCodeAnalytics"
import ContestAnalyzer from "./components/ContestAnalyzer"
import ContestDepthAnalyzer
from "./components/ContestDepthAnalyzer"


import {
  getUserInfo,
  getUserRating,
  getUserSubmissions
} from "./services/codeforces"

import { getLeetCodeUser }
from "./services/leetcode"

function App() {

  const [user, setUser] = useState(null)
  const [platform, setPlatform] =
  useState("Codeforces")

  const [contests, setContests] = useState([])
  const [submissions, setSubmissions] = useState([])

async function fetchUser(handle) {

  // Clear old data first
  setUser(null)

  setContests([])

  setSubmissions([])

  // Codeforces
  if (platform === "Codeforces") {

    const userData =
      await getUserInfo(handle)

    const ratingData =
      await getUserRating(handle)

    const submissionData =
      await getUserSubmissions(handle)

    setUser(userData)

    setContests(ratingData)

    setSubmissions(submissionData)
  }

  // LeetCode
  else if (platform === "LeetCode") {

    const leetcodeUser =
      await getLeetCodeUser(handle)

    setUser(leetcodeUser)
  }

  // Future Platforms
  else {

    alert(
      `${platform} integration coming soon 🚀`
    )

  }
}


  useEffect(() => {

    fetchUser("tourist")

  }, [])

  return (

    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

      <Navbar />

      <Hero />
      <PlatformSelector
        platform={platform}
        setPlatform={setPlatform}
      />

      <Features />

      <SearchBar
        onSearch={fetchUser}
        platform={platform}
      />

      {user && platform === "Codeforces" && (
        <ProfileCard user={user} />
      )}

      {user && platform === "LeetCode" && (
        <>
          <LeetCodeCard user={user} />

          <LeetCodeAnalytics user={user} />
        </>
      )}

      {platform === "Codeforces" &&
      contests.length > 0 && (

        <RatingChart contests={contests} />

      )}

      {platform === "Codeforces" &&
      submissions.length > 0 && (

        <TopicAnalytics submissions={submissions} />

      )}
      
      {platform === "Codeforces" &&
      contests.length > 0 &&
      submissions.length > 0 && (

        <ContestDepthAnalyzer
          contests={contests}
          submissions={submissions}
        />

      )}
    </div>
  )
}

export default App