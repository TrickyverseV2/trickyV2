/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from "db-init/dbConn";
import Blog from "db-init/models/blogs";
import authToken from "middlewares/auth";

const getAllBlog = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (authToken(req, res)) {
        let blog = await Blog.find({});
        if (blog) {
          res
            .status(200)
            .json({
              success: `Successfully fetched all the blogs`,
              data: blog,
            });
        } else {
          res.status(400).json({ success: false, error: `No blogs found.` });
        }
      }
    } else {
      res.status(400).json({
        error: "This method is not allowed",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`,
    });
  }
};

export default createConnection(getAllBlog);
