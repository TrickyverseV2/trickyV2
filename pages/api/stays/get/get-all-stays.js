/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from "db-init/dbConn";
import Stay from "db-init/models/stays";
import authToken from "middlewares/auth";

const getAllStays = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (authToken(req, res)) {
        let stay = await Stay.find({});
        if (stay) {
          res.status(200).json({
            success: `Successfully fetched all the stays`,
            data: stay,
          });
        } else {
          res.status(400).json({ success: false, error: `No stays found.` });
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

export default createConnection(getAllStays);