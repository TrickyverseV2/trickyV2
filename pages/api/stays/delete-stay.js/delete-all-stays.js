import createConnection from 'src/db-init/dbConn'
import Stay from 'src/db-init/models/stay'
import authToken from 'src/middlewares/auth'

const deleteAllStays = async (req, res) => {
  try {
    if (req.method == 'DELETE') {
      if (authToken(req, res)) {
        let blog = await Stay.deleteMany({})
        if (blog) {
          res.status(200).json({ success: `All Stays deleted` })
        } else {
          res.status(400).json({ success: false, error: `No stays found` })
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

export default createConnection(deleteAllStays)
