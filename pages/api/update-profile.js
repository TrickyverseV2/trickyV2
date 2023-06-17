import User from '../../db-init/models/users'
import createConnection from '../../db-init/dbConn'
import authToken from 'src/middlewares/auth'

const updateProfile = async (req, res) => {
  try {
    if (req.method == 'PUT') {
      if (authToken(req, res)) {
        const { userName, email } = req.user
        let isUserUpdated
        isUserUpdated = await User.findOneAndUpdate(
          { $or: [{ userName: userName }, { email: email }] },
          {
            ...req.body,
            updatedOn: Date.now()
          }
        )

        if (isUserUpdated && isUserUpdated?._id) {
          res.status(200).json({ success: 'Successfully updated the user details' })
        }

        res.status(400).json({
          success: `Unable to find user with ${
            email ? `email ${email}` : `userName ${userName}`
          }. Please check your email.`
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

export default createConnection(updateProfile)
