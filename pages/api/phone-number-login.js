import User from 'src/db-init/models/users'
import createConnection from 'src/db-init/dbConn'
import { generateJwtToken } from 'src/helpers/generateToken'
import bcrypt from 'bcryptjs'

const phoneNumberLogin = async (req, res) => {
  try {
    if (req.method == 'POST') {
      const { mobileNumber } = req.body

      if (!mobileNumber) {
        res.status(400).json({
          error: 'mobileNumber field is required to process this request.'
        })
      }
      const isUserAlreadyExists = await User.findOne({ mobileNumber: mobileNumber })
      if (isUserAlreadyExists && isUserAlreadyExists?._id) {
        const token = generateJwtToken({
          userName: isUserAlreadyExists.userName,
          email: isUserAlreadyExists?.email
        })

        if (!token) {
          res.status(400).json({
            success: false,
            error: `User authenticated, but Token generation failed, Please try again in some time.`
          })
        }
        res
          .status(200)
          .json({ success: `User successfully logged in with userName ${isUserAlreadyExists.userName}`, token: token })
      } else {
        const salt = await bcrypt.genSalt(10)
        let newUser = new User({
          userName: 'user_123',
          firstName: 'user',
          lastName: 'user',
          mobileNumber,
          password: await bcrypt.hash('user@123', salt),
          isProfileComplete: false,
          createdOn: Date.now(),
          updatedOn: Date.now()
        })

        await newUser.save()

        const token = generateJwtToken({
          userName: 'user_123'
        })

        if (!token) {
          res.status(400).json({
            success: false,
            error: `User authenticated, but Token generation failed, Please try again in some time.`
          })
        }
        res.status(200).json({ success: `Your account is created. Please Complete your profile.`, token: token })
      }
    } else {
      res.status(400).json({
        error: 'This method is not allowed'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`
    })
  }
}

export default createConnection(phoneNumberLogin)
