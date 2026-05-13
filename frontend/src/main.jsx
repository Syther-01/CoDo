import React from "react"
import ReactDOM from "react-dom/client"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import "./index.css"

import Home from "./pages/Home"
import CP from "./pages/CP"
import DSA from "./pages/DSA"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"

ReactDOM.createRoot(
  document.getElementById("root")
).render(

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cp"
          element={<CP />}
        />

        <Route
          path="/dsa"
          element={<DSA />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>

    </BrowserRouter>

)