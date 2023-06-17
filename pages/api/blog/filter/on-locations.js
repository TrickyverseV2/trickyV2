import Blog from 'db-init/models/blogs'
import createConnection from 'db-init/dbConn'
import authToken from 'middlewares/auth'

const filterBlogOnLocations = async (req, res) => {
  try {
    if (req.method == 'POST') {
      if (authToken(req, res)) {
        const { locations } = req.body

        if (locations.length === 0) {
          res.status(400).json({
            error: 'Atleast 1 location is required to process this request.'
          })
        }

        const allFilteredBlogs = await Blog.find({ locations: { $in: locations } })

        if (allFilteredBlogs && allFilteredBlogs?.length) {
          res.status(200).json({
            success: `Successfully fetched the blogs for locations : ${locations}`,
            data: allFilteredBlogs
          })
        }
        res.status(400).json({ success: `Unable to find blog for locations : ${locations}.` })
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

export default createConnection(filterBlogOnLocations)
