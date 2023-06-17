import createConnection from "db-init/dbConn";
import Event from "db-init/models/events";
import authToken from "middlewares/auth";

const isFavorite = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (authToken(req, res)) {
        const { eventId } = req.query;
        const { email } = req.user;

        if (!eventId) {
          res.status(400).json({
            error: "eventId is required to process this request.",
          });
        }

        const events = await Event.findById(eventId);

        let isFavorite = false;

        if (events?.favorites && events?.favorites?.length > 0) {
          for (const favorite of events?.favorites) {
            if (favorite.email === email) {
              isFavorite = true;
              break;
            }
          }
        }

        res.status(200).json({
          success: `Successfully fetched`,
          data: isFavorite,
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

export default createConnection(isFavorite);
