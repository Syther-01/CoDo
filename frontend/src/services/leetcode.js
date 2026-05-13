const API =
  import.meta.env.VITE_BACKEND_URL

// ── BASIC PROFILE ─────────────────────────────
export async function getLeetCodeUser(username) {

  try {

    const response = await fetch(

      `${API}/api/leetcode/analysis/${username}`

    )

    if (!response.ok) {

      const err =
        await response.json()

      throw new Error(

        err.message ||

        "Failed to fetch user"

      )

    }

    const data =
      await response.json()

    return {

      ...data.profile,

      totalSolved:
        data.stats.total,

      easySolved:
        data.stats.easy,

      mediumSolved:
        data.stats.medium,

      hardSolved:
        data.stats.hard,

    }

  }

  catch (error) {

    console.error(
      "getLeetCodeUser error:",
      error
    )

    return null

  }

}

// ── FULL ANALYSIS ─────────────────────────────
export async function getLeetCodeAnalysis(username) {

  try {

    const response = await fetch(

      `${API}/api/leetcode/analysis/${username}`

    )

    if (!response.ok) {

      const err =
        await response.json()

      throw new Error(

        err.message ||

        "Failed to fetch analysis"

      )

    }

    return await response.json()

  }

  catch (error) {

    console.error(
      "getLeetCodeAnalysis error:",
      error
    )

    return null

  }

}