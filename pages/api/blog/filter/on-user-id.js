import Blog from 'db-init/models/blogs'
import createConnection from 'db-init/dbConn'
import authToken from 'middlewares/auth'

const filterBlogOnUserId = async (req, res) => {
  try {
    if (req.method == 'POST') {
      if (authToken(req, res)) {
        const { userId } = req.body

        if (!userId) {
          res.status(400).json({
            error: 'userId is required to process this request.'
          })
        }

        const allFilteredBlogs = await Blog.find({ 'user.uid': userId })

        if (allFilteredBlogs && allFilteredBlogs?.length) {
          res.status(200).json({
            success: `Successfully fetched the blogs for user : ${userId}`,
            data: allFilteredBlogs
          })
        }
        res.status(400).json({ success: `Unable to find blog for user : ${userId}. Please check your userId.` })
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

export default createConnection(filterBlogOnUserId)
