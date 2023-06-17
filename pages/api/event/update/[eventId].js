import createConnection from "db-init/dbConn";
import Event from "db-init/models/events";
import authToken from "middlewares/auth";

const updateEventById = async (req, res) => {
  try {
    if (req.method == "PUT") {
      if (authToken(req, res)) {
        const { eventId } = req.query;

        if (!eventId) {
          res.status(400).json({
            error: "eventId is required to process this request.",
          });
        }

        if (Object.entries(req.body).length === 0) {
          res.status(400).json({
            error: "Data is required to process this request.",
          });
        }

        const events = await Event.findById(eventId);

        const isEventUpdated = await Event.findOneAndUpdate(
          { _id: eventId },
          {
            ...req.body,
            participatedUsers:
              events?.participatedUsers && req.body?.participatedUsers
                ? [...events?.participatedUsers, req.body?.participatedUsers]
                : req.body?.participatedUsers
                ? [req.body?.participatedUsers]
                : events?.participatedUsers,
            favorites:
              events?.favorites && req.body?.favorites
                ? [...events?.favorites, req.body?.favorites]
                : req.body?.favorites
                ? [req.body?.favorites]
                : events?.favorites,
            modificationLogs: [
              ...events?.modificationLogs,
              { userAgent: "Event Updated", time: Date.now() },
            ],
          }
        );

        if (isEventUpdated) {
          res.status(200).json({
            success: req.body?.participatedUsers
              ? `Your Order is Booked for the event ${events?.title}.`
              : `Event updated successfully for eventId ${eventId}`,
          });
        }

        res.status(400).json({
          error: `No Event found with eventId ${eventId}`,
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

export default createConnection(updateEventById);
