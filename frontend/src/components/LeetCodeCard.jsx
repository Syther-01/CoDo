// Props:
// profile { username, realName, avatar, ranking }
// stats   { total, easy, medium, hard }

function LeetCodeCard({
  profile,
  stats
}) {

  return (

    <div className="max-w-7xl mx-auto px-6 mt-16">

      <div className="relative overflow-hidden bg-[#0f0f0f] border border-white/10 rounded-3xl p-10">

        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          {/* LEFT */}
          <div className="flex items-center gap-7">

            {/* Avatar */}
            <img
              src={
                profile?.avatar ||

                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }

              alt="avatar"

              className="w-32 h-32 rounded-3xl border border-cyan-500/30 object-cover shadow-2xl"

              onError={(e) => {

                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"

              }}
            />

            {/* Info */}
            <div>

              <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm font-semibold">

                Leetcode Profile

              </p>

              <h2 className="text-5xl font-black mt-3">

                {
                  profile?.realName ||

                  profile?.username ||

                  "Unknown User"
                }

              </h2>

              <p className="text-gray-500 text-lg mt-3">

                @
                {
                  profile?.username ||

                  "leetcode"
                }

              </p>

              <div className="flex flex-wrap gap-4 mt-6">

                {/* Ranking */}
                <div className="bg-cyan-500/10 border border-cyan-500/20 px-5 py-3 rounded-2xl">

                  <p className="text-gray-400 text-sm">

                    Global Ranking

                  </p>

                  <p className="text-2xl font-bold text-cyan-400 mt-1">

                    {

                      profile?.ranking

                        ? `#${Number(
                            profile.ranking
                          ).toLocaleString()}`

                        : "N/A"

                    }

                  </p>

                </div>

                {/* Total */}
                <div className="bg-blue-500/10 border border-blue-500/20 px-5 py-3 rounded-2xl">

                  <p className="text-gray-400 text-sm">

                    Total Solved

                  </p>

                  <p className="text-2xl font-bold text-blue-400 mt-1">

                    {stats?.total ?? 0}

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-3 gap-5">

            {/* Easy */}
            <div className="bg-white/[0.03] border border-green-500/20 rounded-3xl px-8 py-6 text-center min-w-[140px]">

              <p className="text-green-400 text-sm uppercase tracking-wider">

                Easy

              </p>

              <h3 className="text-5xl font-black text-green-400 mt-4">

                {stats?.easy ?? 0}

              </h3>

            </div>

            {/* Medium */}
            <div className="bg-white/[0.03] border border-yellow-500/20 rounded-3xl px-8 py-6 text-center min-w-[140px]">

              <p className="text-yellow-400 text-sm uppercase tracking-wider">

                Medium

              </p>

              <h3 className="text-5xl font-black text-yellow-400 mt-4">

                {stats?.medium ?? 0}

              </h3>

            </div>

            {/* Hard */}
            <div className="bg-white/[0.03] border border-red-500/20 rounded-3xl px-8 py-6 text-center min-w-[140px]">

              <p className="text-red-400 text-sm uppercase tracking-wider">

                Hard

              </p>

              <h3 className="text-5xl font-black text-red-400 mt-4">

                {stats?.hard ?? 0}

              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default LeetCodeCard