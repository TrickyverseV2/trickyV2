import createConnection from 'src/db-init/dbConn'
import Stay from 'src/db-init/models/stays'
import authToken from 'src/middlewares/auth'

const deleteStayById = async (req, res) => {
  try {
    if (req.method == 'DELETE') {
      if (authToken(req, res)) {
        const { stayId } = req.query

        if (!stayId) {
          res.status(400).json({
            error: 'stayId is required to process this request.'
          })
        }

        let stay = await Stay.deleteOne({ stayId: stayId })
        if (stay) {
          res.status(200).json({ success: `Stay deleted with stayId ${stayId}` })
        } else {
          res.status(400).json({ success: false, error: `No stay found with stayId ${stayId}` })
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

export default createConnection(deleteStayById)
