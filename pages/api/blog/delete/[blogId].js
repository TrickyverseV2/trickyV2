import createConnection from "db-init/dbConn";
import Blog from "db-init/models/blogs";
import authToken from "middlewares/auth";

const deleteBlogById = async (req, res) => {
  try {
    if (req.method == "DELETE") {
      if (authToken(req, res)) {
        const { blogId } = req.query;

        if (!blogId) {
          res.status(400).json({
            error: "blogId is required to process this request.",
          });
        }

        console.log("blogId");
        console.log(blogId);

        let blog = await Blog.deleteOne({ _id: blogId });
        console.log("blog");
        console.log(blog);
        if (blog) {
          res
            .status(200)
            .json({ success: `Blog deleted with blogId ${blogId}` });
        } else {
          res
            .status(400)
            .json({
              success: false,
              error: `No blog found with blogId ${blogId}`,
            });
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

export default createConnection(deleteBlogById);
