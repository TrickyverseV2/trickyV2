import createConnection from "db-init/dbConn";
import Blog from "db-init/models/blogs";
import User from "db-init/models/users";
import authToken from "middlewares/auth";

const addBlog = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (authToken(req, res)) {
        const { userName, email } = req.user;
        const {
          title,
          description,
          media,
          isPublished,
          tags,
          locations,
          created,
          updated,
          shareUrl,
          activated,
          body,
          linksUsed,
        } = req.body;

        if (
          !title ||
          !description
          //  ||
          // !tags ||
          // !locations ||
          // !created ||
          // !updated ||
          // !shareUrl ||
          // !activated ||
          // !body ||
          // !linksUsed
        ) {
          res.status(400).json({
            error:
              "blogId, title, description, tags, locations, created, updated, shareUrl, activated, body and linksUsed fields are required to process this request.",
          });
        }
        const user = await User.findOne({ userName: userName });
        let savedBlog = await new Blog({
          ...req.body,
          user: {
            userName: userName,
            displayName: user?.displayName,
            profileImage: user?.profileImage,
            region: user?.region,
          },
        }).save();

        console.log("savedBlog");
        console.log(savedBlog);

        if (savedBlog) {
          res
            .status(200)
            .json({
              success: `Blog created successfully for blogId : ${savedBlog._id}`,
              data: savedBlog._id
            });
        }
        res
          .status(400)
          .json({ success: `Unable to create blog` });
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

export default createConnection(addBlog);
