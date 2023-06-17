/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from '../../db-init/dbConn'
import User from '../../db-init/models/users'
import authToken from 'src/middlewares/auth'

const getUserDetails = async (req, res) => {
  try {
    if (req.method == 'GET') {
      if (authToken(req, res)) {
        const { userName, email } = req.user
        let userDetails
        if (userName) {
          userDetails = await User.findOne({ userName: userName })
        } else if (email) {
          userDetails = await User.findOne({ email: email })
        }

        if (userDetails) {
          res.status(200).json({
            success: `Successfully fetched the user details for ${email ? `email ${email}` : `userName ${userName}`}`,
            data: userDetails
          })
        } else {
          res
            .status(400)
            .json({ success: false, error: `No user found with ${email ? `email ${email}` : `userName ${userName}`}` })
        }
      }
    } else {
      res.status(400).json({
        error: 'This method is not allowed'
      })
    }
  } catch (err) {
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`
    })
  }
}

export default createConnection(getUserDetails)
