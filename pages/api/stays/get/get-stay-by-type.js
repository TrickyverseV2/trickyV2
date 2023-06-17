/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from "db-init/dbConn";
import Stay from "db-init/models/stays";
import authToken from "middlewares/auth";

const getStayByType = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (authToken(req, res)) {
        const { stayType } = req.body;

        if (!stayType) {
          res.status(400).json({
            error: "stayType is required to process this request.",
          });
        }

        let allStays = [];
        for (let i = 0; i < stayType.length; i++) {
          let stays = await Stay.find({ stayType: stayType[i] });
          allStays = [...allStays, ...stays];
        }
        if (allStays) {
          res.status(200).json({
            success: `Successfully fetched all the stays for stayType ${stayType}`,
            data: allStays,
          });
        } else {
          res.status(400).json({
            success: false,
            error: `No stays found for stayType ${stayType}`,
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

export default createConnection(getStayByType);
