/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from "db-init/dbConn";
import Event from "db-init/models/events";
import authToken from "middlewares/auth";

const getEventByType = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (authToken(req, res)) {
        const { eventType } = req.body;

        if (!eventType) {
          res.status(400).json({
            error: "eventType is required to process this request.",
          });
        }

        let events = await Event.find({ eventType: eventType });
        if (events) {
          res
            .status(200)
            .json({
              success: `Successfully fetched all the events for eventType ${eventType}`,
              data: events,
            });
        } else {
          res
            .status(400)
            .json({
              success: false,
              error: `No events found for eventType ${eventType}`,
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

export default createConnection(getEventByType);
