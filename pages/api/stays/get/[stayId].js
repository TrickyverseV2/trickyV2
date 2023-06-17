/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from "db-init/dbConn";
import Stay from "db-init/models/stays";
import authToken from "middlewares/auth";

const getStayById = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (authToken(req, res)) {
        const { stayId } = req.query;

        if (!stayId) {
          res.status(400).json({
            error: "stayId is required to process this request.",
          });
        }

        let stay = await Stay.findOne({ _id: stayId });
        if (stay) {
          res
            .status(200)
            .json({ success: `Stay found with stayId ${stayId}`, data: stay });
        } else {
          res
            .status(400)
            .json({
              success: false,
              error: `No stay found with stayId ${stayId}`,
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

export default createConnection(getStayById);
