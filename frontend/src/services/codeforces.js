export async function getUserInfo(handle) {

  try {

    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`
    )

    const data = await response.json()

    return data.result[0]

  } catch (error) {

    console.log(error)

  }
}

export async function getUserRating(handle) {

  try {

    const response = await fetch(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    )

    const data = await response.json()

    return data.result

  } catch (error) {

    console.log(error)

  }
}

export async function getUserSubmissions(handle) {

  try {

    const response = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle}`
    )

    const data = await response.json()

    return data.result

  } catch (error) {

    console.log(error)

  }
}