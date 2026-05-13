import { useState } from "react"

function SearchBar({ onSearch, platform }) {

  const [handle, setHandle] = useState("")

  function handleSubmit(e) {

    e.preventDefault()

    if (!handle) return

    onSearch(handle)

    setHandle("")
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto flex gap-4 mt-10 px-6"
    >

      <input
        type="text"

        placeholder={`Enter ${platform} Username...`}

        value={handle}

        onChange={(e) =>
          setHandle(e.target.value)
        }

        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 rounded-2xl font-bold hover:scale-105 transition"
      >
        Search
      </button>

    </form>
  )
}

export default SearchBar