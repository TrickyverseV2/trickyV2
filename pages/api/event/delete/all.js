import createConnection from "src/db-init/dbConn";
import Event from "src/db-init/models/events";
import authToken from "src/middlewares/auth";

const deleteAllEvents = async (req, res) => {
  try {
    if (req.method == "DELETE") {
      if (authToken(req, res)) {
        let blog = await Event.deleteMany({});
        if (blog) {
          res.status(200).json({ success: `All Events deleted` });
        } else {
          res.status(400).json({ error: `No events found` });
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

export default createConnection(deleteAllEvents);
