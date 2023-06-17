/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from "db-init/dbConn";
import Event from "db-init/models/events";
import authToken from "middlewares/auth";

const getEventById = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (authToken(req, res)) {
        const { eventId } = req.query;

        if (!eventId) {
          res.status(400).json({
            error: "eventId is required to process this request.",
          });
        }

        let event = await Event.findOne({ _id: eventId });
        if (event) {
          res.status(200).json({
            success: `Event found with eventId ${eventId}`,
            data: event,
          });
        } else {
          res.status(400).json({
            success: false,
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

export default createConnection(getEventById);
