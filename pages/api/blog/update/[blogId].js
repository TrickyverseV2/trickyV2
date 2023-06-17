import createConnection from "db-init/dbConn";
import Blog from "db-init/models/blogs";
import authToken from "middlewares/auth";

const updateBlogById = async (req, res) => {
  try {
    if (req.method == "PUT") {
      if (authToken(req, res)) {
        const { blogId } = req.query;

        if (!blogId) {
          res.status(400).json({
            error: "blogId is required to process this request.",
          });
        }

        if (Object.entries(req.body).length === 0) {
          res.status(400).json({
            error: "Data is required to process this request.",
          });
        }

        const isBlogUpdated = await Blog.findOneAndUpdate(
          { _id: blogId },
          req.body
        );

        if (isBlogUpdated) {
          res.status(200).json({ success: `Blog updated successfully` });
        }

        res
          .status(400)
          .json({
            success: false,
            error: `No blog found with blogId ${blogId}`,
          });
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

export default createConnection(updateBlogById);
