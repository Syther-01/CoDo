const bcrypt =
  require("bcryptjs")

const jwt =
  require("jsonwebtoken")

const User =
  require("../models/User")

// SIGNUP
const signup = async (
  req,
  res
) => {

  try {

    const {

      name,
      email,
      password,
      codeforcesHandle,
      leetcodeHandle

    } = req.body

    // Check existing user
    const existingUser =
      await User.findOne({
        email
      })

    if (existingUser) {

      return res.status(400).json({

        message:
          "User already exists"

      })

    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      )

    // Create user
    const user =
      await User.create({

        name,

        email,

        password:
          hashedPassword,

        codeforcesHandle,

        leetcodeHandle

      })

    // JWT token
    const token =
      jwt.sign(

        {
          id: user._id
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }

      )

    res.status(201).json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        codeforcesHandle:
          user.codeforcesHandle,

        leetcodeHandle:
          user.leetcodeHandle

      }

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message:
        "Server Error"

    })

  }

}

const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body

    // Find user
    const user =
      await User.findOne({
        email
      })

    if (!user) {

      return res.status(400).json({

        message:
          "Invalid credentials"

      })

    }

    // Compare password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid credentials"

      })

    }

    // Generate token
    const token =
      jwt.sign(

        {
          id: user._id
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }

      )

    res.json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        codeforcesHandle:
          user.codeforcesHandle,

        leetcodeHandle:
          user.leetcodeHandle

      }

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message:
        "Server Error"

    })

  }

}

const changePassword =
  async (req, res) => {

  try {

    const {
      email,
      oldPassword,
      newPassword
    } = req.body

    // Find user
    const user =
      await User.findOne({
        email
      })

    if (!user) {

      return res.status(404).json({

        message:
          "User not found"

      })

    }

    // Compare old password
    const isMatch =
      await bcrypt.compare(

        oldPassword,

        user.password

      )

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Old password not matched"

      })

    }

    // Hash new password
    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      )

    user.password =
      hashedPassword

    await user.save()

    res.json({

      message:
        "Password updated successfully"

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message:
        "Server Error"

    })

  }

}

const updateProfile =
  async (req, res) => {

  try {

    const {

      email,

      name,

      codeforcesHandle,

      leetcodeHandle

    } = req.body

    const user =
      await User.findOne({
        email
      })

    if (!user) {

      return res.status(404).json({

        message:
          "User not found"

      })

    }

    user.name = name

    user.codeforcesHandle =
      codeforcesHandle

    user.leetcodeHandle =
      leetcodeHandle

    await user.save()

    res.json({

      message:
        "Profile updated successfully",

      user

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message:
        "Server Error"

    })

  }

}

module.exports = {
  signup,
  login,
  changePassword,
  updateProfile
}