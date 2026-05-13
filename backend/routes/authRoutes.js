const express =
  require("express")

const router =
  express.Router()

const {
  signup,
  login,
  changePassword,
  updateProfile
} = require(
  "../controllers/authController"
)

// Signup Route
router.post(
  "/signup",
  signup
)

router.post(
  "/login",
  login
)


router.post(
  "/change-password",
  changePassword
)

router.post(
  "/update-profile",
  updateProfile
)

module.exports =
  router