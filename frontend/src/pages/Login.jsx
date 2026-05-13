import { useState }
from "react"

import axios from "axios"

const API =
  import.meta.env.VITE_BACKEND_URL

import { Link, useNavigate }
from "react-router-dom"

function Login() {

  const navigate =
    useNavigate()

  const [formData, setFormData] =
    useState({

      email: "",
      password: ""

    })

  const [loading, setLoading] =
    useState(false)

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })

  }

  async function handleSubmit(e) {

    e.preventDefault()

    try {

      setLoading(true)

      const res =
        await axios.post(
          `${API}/api/auth/login`,
          formData
        )   

      // Save token
      localStorage.setItem(

        "token",

        res.data.token

      )

      localStorage.setItem(

        "user",

        JSON.stringify(
          res.data.user
        )

      )

      navigate("/")

    } catch (error) {

      alert(
        error.response.data.message
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10">

        <h1 className="text-4xl font-black text-center">

          Login

        </h1>

        <p className="text-gray-400 text-center mt-4">

          Continue to CoDo

        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <button
            type="submit"

            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        <p className="text-gray-400 text-center mt-8">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-purple-400"
          >

            Signup

          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login