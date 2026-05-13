import { Link } from "react-router-dom"

function Navbar() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    )

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* LEFT LOGO */}
        <Link to="/">

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">

            CoDo

          </h1>

        </Link>

        {/* CENTER NAV */}
        {user && (

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-12">

            {/* HOME */}
            <Link
              to="/"

              className="group relative text-xl font-bold tracking-wide transition"
            >

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                HOME

              </span>

              <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></div>

            </Link>

            {/* CP */}
            <Link
              to="/cp"

              className="group relative text-xl font-bold tracking-wide transition"
            >

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                CP

              </span>

              <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></div>

            </Link>

            {/* DSA */}
            <Link
              to="/dsa"

              className="group relative text-xl font-bold tracking-wide transition"
            >

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                DSA

              </span>

              <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></div>

            </Link>

          </div>

        )}

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {!user && (
            <>

              <Link
                to="/login"

                className="text-gray-300 hover:text-white transition font-medium"
              >

                Login

              </Link>

              <Link
                to="/signup"

                className="bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
              >

                Signup

              </Link>

            </>
          )}

          {user && (

            <Link
              to="/profile"

              className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl hover:bg-white/10 transition"
            >

              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg">

                {
                  user.name
                    ?.charAt(0)
                    ?.toUpperCase()
                }

              </div>

              <div className="text-left">

                <p className="font-semibold">

                  {user.name}

                </p>

                <p className="text-xs text-gray-400">

                  My Profile

                </p>

              </div>

            </Link>

          )}

        </div>

      </div>

    </nav>

  )

}

export default Navbar