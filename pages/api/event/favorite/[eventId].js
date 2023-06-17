import createConnection from "db-init/dbConn";
import Event from "db-init/models/events";
import authToken from "middlewares/auth";

const addOrRemoveFavoriteEventById = async (req, res) => {
  try {
    if (req.method == "PUT") {
      if (authToken(req, res)) {
        const { eventId } = req.query;
        const { email } = req.user;

        if (!eventId) {
          res.status(400).json({
            error: "eventId is required to process this request.",
          });
        }

        const events = await Event.findById(eventId);

        let updatedFavorites = [];
        let isEventUpdated;
        let isFavoriteAdded = true;

        if (events?.favorites && events?.favorites?.length > 0) {
          for (const favorite of events?.favorites) {
            if (favorite.email === email) {
              isFavoriteAdded = false;
              continue;
            }
            updatedFavorites.push(favorite);
          }

          if (events?.favorites?.length == updatedFavorites.length) {
            isEventUpdated = await Event.findOneAndUpdate(
              { _id: eventId },
              {
                favorites: [...events?.favorites, { email: email }],
              }
            );
          } else {
            isEventUpdated = await Event.findOneAndUpdate(
              { _id: eventId },
              {
                favorites: updatedFavorites,
              }
            );
          }
        } else {
          isEventUpdated = await Event.findOneAndUpdate(
            { _id: eventId },
            {
              favorites: [{ email: email }],
            }
          );
        }

        if (isEventUpdated) {
          res.status(200).json({
            success: `${
              isFavoriteAdded
                ? "Successfully added the event to the favorites list"
                : "Successfully removed the event from the favorites list"
            }`,
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

export default createConnection(addOrRemoveFavoriteEventById);
