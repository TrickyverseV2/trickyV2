/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from "db-init/dbConn";
import Event from "db-init/models/events";
import authToken from "middlewares/auth";

const getAllEvents = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (authToken(req, res)) {
        let event = await Event.find({});
        if (event) {
          res.status(200).json({
            success: `Successfully fetched all the events`,
            data: event,
          });
        } else {
          res.status(400).json({ success: false, error: `No Events found.` });
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

export default createConnection(getAllEvents);
