function ProfileCard({ user }) {

  return (

    <div className="max-w-md mx-auto mt-20 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="flex flex-col items-center text-center">

        <img
          src={user.titlePhoto}
          alt=""
          className="w-32 h-32 rounded-full border-4 border-purple-500"
        />

        <h2 className="text-3xl font-bold mt-5">
          {user.handle}
        </h2>

        <p className="text-purple-400 text-lg mt-2">
          {user.rank}
        </p>

        <div className="grid grid-cols-2 gap-6 mt-8 w-full">

          <div className="bg-black/30 rounded-2xl p-5">
            <p className="text-gray-400">
              Rating
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {user.rating}
            </h3>
          </div>

          <div className="bg-black/30 rounded-2xl p-5">
            <p className="text-gray-400">
              Max Rating
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {user.maxRating}
            </h3>
          </div>

        </div>

      </div>

    </div>

  )
}

export default ProfileCard