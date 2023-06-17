import createConnection from 'src/db-init/dbConn'
import Stay from 'src/db-init/models/stays'
import authToken from 'src/middlewares/auth'

const updateStayById = async (req, res) => {
  try {
    if (req.method == 'PUT') {
      if (authToken(req, res)) {
        const { stayId } = req.query

        if (!stayId) {
          res.status(400).json({
            error: 'stayId is required to process this request.'
          })
        }

        if (Object.entries(req.body).length === 0) {
          res.status(400).json({
            error: 'Data is required to process this request.'
          })
        }

        const stays = await Stay.findOne({ stayId: stayId })

        const isStayUpdated = await Stay.findOneAndUpdate(
          { stayId: stayId },
          {
            ...req.body,
            rating:
              stays?.rating && req.body?.rating
                ? [...stays?.rating, req.body?.rating]
                : req.body?.rating
                ? [req.body?.rating]
                : stays?.rating,
            reviews:
            stays?.reviews && req.body?.reviews
            ? [...stays?.reviews, req.body?.reviews]
            : req.body?.reviews
            ? [req.body?.reviews]
            : stays?.reviews,
            shares:
            stays?.shares && req.body?.shares
                ? [...stays?.shares, req.body?.shares]
                : req.body?.shares
                ? [req.body?.shares]
                : stays?.shares,
            favorites:
            stays?.favorites && req.body?.favorites
                ? [...stays?.favorites, req.body?.favorites]
                : req.body?.favorites
                ? [req.body?.favorites]
                : stays?.favorites,
            bookingDetails:
            stays?.bookingDetails && req.body?.bookingDetails
            ? [...stays?.bookingDetails, req.body?.bookingDetails]
            : req.body?.bookingDetails
            ? [req.body?.bookingDetails]
            : stays?.bookingDetails,
            modificationLogs: [...stays?.modificationLogs, { userAgent: 'Stay Updated', time: Date.now() }]
          }
        )

        if (isStayUpdated) {
          res.status(200).json({ success: `Stay updated successfully for stayId ${stayId}` })
        }

        res.status(400).json({ success: false, error: `No Stay found with stayId ${stayId}` })
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

export default createConnection(updateStayById)
