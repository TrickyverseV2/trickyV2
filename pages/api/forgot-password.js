import User from '../../db-init/models/users'
import createConnection from '../../db-init/dbConn'
import authToken from 'src/middlewares/auth'
import bcrypt from 'bcryptjs'

const updatePassword = async (req, res) => {
  try {
    if (req.method == 'PUT') {
      if (authToken(req, res)) {
        const { userName, email } = req.user
        const { newPassword } = req.body
        const salt = await bcrypt.genSalt(10)
        // Hash password
        let encryptedPassword = await bcrypt.hash(newPassword, salt)

        const isUserUpdated = await User.findOneAndUpdate(
          { $or: [{ userName: userName }, { email: email }] },
          {
            password: encryptedPassword
          }
        )

        if (isUserUpdated && isUserUpdated?._id) {
          res.status(200).json({ success: 'Successfully updated the password' })
        }

        res.status(400).json({
          error: `Failed to update the password.`
        })
      } else {
        res.status(400).json({
          error: 'This method is not allowed'
        })
      }
    }
  } catch (err) {
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`
    })
  }
}

export default createConnection(updatePassword)
