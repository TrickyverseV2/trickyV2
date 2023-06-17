import Event from "db-init/models/events";
import createConnection from "db-init/dbConn";
import authToken from "middlewares/auth";

const filterEventOnLocation = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (authToken(req, res)) {
        const { location } = req.body;

        if (!location) {
          res.status(400).json({
            error: "Location is required to process this request.",
          });
        }

        const allFilteredEvents = await Event.find({
          location: location,
        });

        if (allFilteredEvents && allFilteredEvents?.length) {
          res.status(200).json({
            success: `Successfully fetched the events in ${location}`,
            data: allFilteredEvents,
          });
        }
        res.status(400).json({
          success: `Unable to find events in ${location}`,
        });
      } else {
        res.status(400).json({
          error: "This method is not allowed",
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`,
    });
  }
};

export default createConnection(filterEventOnLocation);
