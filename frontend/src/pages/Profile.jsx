import { useState } from "react"

import axios from "axios"

import Navbar from "../components/Navbar"

const API =
  import.meta.env.VITE_BACKEND_URL

function Profile() {

  const savedUser =
    JSON.parse(
      localStorage.getItem("user")
    )

  const [formData, setFormData] =
    useState({

      name:
        savedUser?.name || "",

      email:
        savedUser?.email || "",

      codeforcesHandle:
        savedUser?.codeforcesHandle || "",

      leetcodeHandle:
        savedUser?.leetcodeHandle || "",

      oldPassword: "",

      newPassword: ""

    })

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })

  }

  async function handleUpdate(e) {

    e.preventDefault()

    try {

      const res =
        await axios.post(

          `${API}/api/auth/update-profile`,

          {

            email:
              formData.email,

            name:
              formData.name,

            codeforcesHandle:
              formData.codeforcesHandle,

            leetcodeHandle:
              formData.leetcodeHandle

          }

        )

      localStorage.setItem(

        "user",

        JSON.stringify(
          res.data.user
        )

      )

      alert(
        "Profile updated successfully 🚀"
      )

    } catch (error) {

      alert(
        error.response.data.message
      )

    }

  }

  async function
  handlePasswordChange(e) {

    e.preventDefault()

    try {

      const res =
        await axios.post(

          `${API}/api/auth/change-password`,

          {

            email:
              formData.email,

            oldPassword:
              formData.oldPassword,

            newPassword:
              formData.newPassword

          }

        )

      alert(
        res.data.message
      )

      setFormData({

        ...formData,

        oldPassword: "",

        newPassword: ""

      })

    } catch (error) {

      alert(
        error.response.data.message
      )

    }

  }

  function handleLogout() {

    localStorage.removeItem(
      "token"
    )

    localStorage.removeItem(
      "user"
    )

    window.location.href = "/"

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-black">

          My Profile

        </h1>

        <p className="text-gray-400 mt-5">

          Manage your CoDo account settings.

        </p>

        {/* Profile Update */}
        <form
          onSubmit={handleUpdate}

          className="mt-14 space-y-6"
        >

          <h2 className="text-3xl font-bold">

            Profile Information

          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"

            value={formData.name}

            onChange={handleChange}

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"

            value={formData.email}

            disabled

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 opacity-60"
          />

        <div className="relative">

        <div className="absolute left-4 top-1/2 -translate-y-1/2">

            <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-xl text-sm font-bold">

            CF

            </div>

        </div>

        <input
            type="text"
            name="codeforcesHandle"

            placeholder="Codeforces Handle"

            value={formData.codeforcesHandle}

            onChange={handleChange}

            autoComplete="off"

            className="w-full pl-24 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white autofill:bg-transparent"
        />

        </div>

        <div className="relative">

        <div className="absolute left-4 top-1/2 -translate-y-1/2">

            <div className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-xl text-sm font-bold">

            LC

            </div>

        </div>

        <input
          type="text"
          name="leetcodeHandle"

          placeholder="LeetCode Handle"

          value={formData.leetcodeHandle}

          onChange={handleChange}

          autoComplete="off"

          className="w-full pl-24 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white autofill:bg-transparent"
        />

        </div>

          <button
            type="submit"

            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-4 rounded-2xl font-bold hover:scale-[1.01] transition"
          >

            Update Profile

          </button>

        </form>

        {/* Change Password */}
        <form
          onSubmit={handlePasswordChange}

          className="mt-14 space-y-6"
        >

          <h2 className="text-3xl font-bold">

            Change Password

          </h2>

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"

            value={formData.oldPassword}

            onChange={handleChange}

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"

            value={formData.newPassword}

            onChange={handleChange}

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <button
            type="submit"

            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-4 rounded-2xl font-bold hover:scale-[1.01] transition"
          >

            Change Password

          </button>

        </form>

        {/* Logout */}
        <button
          onClick={handleLogout}

          className="w-full mt-10 border border-red-500/30 text-red-400 py-4 rounded-2xl font-bold hover:bg-red-500/10 transition"
        >

          Logout

        </button>

      </div>

    </div>

  )

}

export default Profile