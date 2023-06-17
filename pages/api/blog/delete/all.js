import createConnection from 'db-init/dbConn'
import Blog from 'db-init/models/blogs'
import authToken from 'middlewares/auth'

const deleteAllBlog = async (req, res) => {
  try {
    if (req.method == 'DELETE') {
      if (authToken(req, res)) {
        let blog = await Blog.deleteMany({})
        if (blog) {
          res.status(200).json({ success: `All Blogs deleted` })
        } else {
          res.status(400).json({ success: false, error: `No blogs found` })
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

export default createConnection(deleteAllBlog)
