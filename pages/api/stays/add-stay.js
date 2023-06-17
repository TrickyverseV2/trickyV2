import createConnection from "db-init/dbConn";
import Stay from "db-init/models/stays";
import User from "db-init/models/users";
import authToken from "middlewares/auth";

const addStay = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (authToken(req, res)) {
        const { userName, email } = req.user;
        const {
          title,
          address,
          stayType,
          thumbnail,
          price,
          facilitiesProvided,
        } = req.body;

        if (
          !title ||
          !address ||
          !stayType ||
          !thumbnail ||
          !price ||
          !facilitiesProvided
        ) {
          res.status(400).json({
            error:
              "title, address, stayType, thumbnail, price and facilitiesProvided fields are required to process this request.",
          });
        }

        const user = await User.findOne({ userName: userName });
        let savedStay = await new Stay({
          ...req.body,
          user: {
            userName: userName,
            displayName: user?.displayName,
            profileImage: user?.profileImage,
            region: user?.region,
            email: user?.email,
            mobileNumber: user?.mobileNumber,
          },
          modificationLogs: [{ userAgent: "Stay Created", time: Date.now() }],
        }).save();

        if (savedStay) {
          res.status(200).json({
            success: `Stay created successfully for stayId : ${savedStay?._id}`,
          });
        }
        res.status(400).json({ success: `Unable to create stay` });
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

export default createConnection(addStay);
