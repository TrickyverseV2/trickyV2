import createConnection from "db-init/dbConn";
import Event from "db-init/models/events";
import authToken from "middlewares/auth";

const deleteEventById = async (req, res) => {
  try {
    if (req.method == "DELETE") {
      if (authToken(req, res)) {
        const { eventId } = req.query;

        if (!eventId) {
          res.status(400).json({
            error: "eventId is required to process this request.",
          });
        }

        let event = await Event.deleteOne({ _id: eventId });
        if (event) {
          res.status(200).json({
            success: `Event deleted successfully with eventId ${eventId}`,
          });
        } else {
          res.status(400).json({
            error: `No event found with eventId ${eventId}`,
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

export default createConnection(deleteEventById);
