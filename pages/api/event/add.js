import createConnection from "db-init/dbConn";
import Event from "db-init/models/events";
import User from "db-init/models/users";
import authToken from "middlewares/auth";

const addEvent = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (authToken(req, res)) {
        const { userName, email } = req.user;
        console.log(req.body, "bodyyyy");
        const {
          title,
          venue,
          eventType,
          location,
          thumbnail,
          tags,
          price,
          eventDate,
          basic,
        } = req.body;

        console.log("body", req.files);

        if (
          !title ||
          !venue ||
          !eventType ||
          !thumbnail ||
          !price ||
          !eventDate ||
          !location ||
          !tags ||
          !basic
        ) {
          res.status(400).json({
            error:
              "title, venue, eventType, thumbnail, price, eventDate, location, tags and basic fields are required to process this request.",
          });
        }
        let videoUrl;

        // https://www.youtube.com/embed/lAUf0q711Ew

        if (req.body?.videoUrl) {
          let tempVideoUrl = req.body.videoUrl.split("/");
          // https://youtu.be/lAUf0q711Ew
          videoUrl = `https://www.youtube.com/embed/${
            tempVideoUrl[tempVideoUrl.length - 1]
          }`;
        }

        const user = await User.findOne({ userName: userName });
        let savedEvent = await new Event({
          ...req.body,
          videoUrl,
          user: {
            userName: userName,
            displayName: user?.displayName,
            profileImage: user?.profileImage,
            region: user?.region,
          },
          modificationLogs: [{ userAgent: "Event Created", time: Date.now() }],
        }).save();

        if (savedEvent) {
          res.status(200).json({
            success: `${title} event created successfully`,
          });
        }
        res.status(400).json({ error: `Unable to create event ${title}` });
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

export default createConnection(addEvent);
