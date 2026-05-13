function PlatformSelector({ platform, setPlatform }) {

  const platforms = [
    "Codeforces",
    "LeetCode"
  ]

  return (

    <div className="max-w-7xl mx-auto px-6 mt-12">

      <div className="flex items-center gap-4">

        <p className="text-gray-400 text-lg">
          Select Platform:
        </p>

        <select

          value={platform}

          onChange={(e) =>
            setPlatform(e.target.value)
          }

          className="bg-[#111] border border-gray-800 rounded-xl px-5 py-3 outline-none text-white"
        >

          {platforms.map((item, index) => (

            <option
              key={index}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

    </div>
  )
}

export default PlatformSelector