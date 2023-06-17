import User from '../../db-init/models/users'
import createConnection from '../../db-init/dbConn'
import { generateJwtToken } from '../../helpers/generateToken'
import bcrypt from 'bcryptjs'

const login = async (req, res) => {
  try {
    if (req.method == 'POST') {
      let user
      const { userName, email, password } = req.body

      if ((!email && !userName) || !password) {
        res.status(400).json({
          error: `Email or userName and password fields are required to process this request.`
        })
      }

      if (userName) {
        user = await User.findOne({ userName: userName })
      }
      if (email) {
        user = await User.findOne({ email: email })
      }

      if (user) {
        let isPasswordValid = await bcrypt.compare(password, user.password)
        if ((userName == user?.userName || email == user?.email) && isPasswordValid) {
          const token = generateJwtToken({
            userName: user?.userName,
            email: user?.email
          })

          if (!token) {
            res.status(400).json({
              success: false,
              error: `User authenticated, but Token generation failed, Please try again in some time.`
            })
          }
          res.status(200).json({
            success: `User successfully logged in with ${email ? `email ${email}` : `userName ${userName}`}`,
            token: token
          })
        } else {
          res.status(400).json({ success: false, error: 'Invalid credentials' })
        }
      } else {
        res
          .status(400)
          .json({ success: false, error: `No user found with ${email ? `email ${email}` : `userName ${userName}`}` })
      }
    } else {
      res.status(400).json({ error: 'This method is not allowed' })
    }
  } catch (err) {
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`
    })
  }
}

export default createConnection(login)
