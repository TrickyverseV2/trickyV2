import createConnection from "db-init/dbConn";
import Record from "db-init/models/records";
import User from "db-init/models/users";
import authToken from "middlewares/auth";
import Moment from "moment";

const addRecord = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (authToken(req, res)) {
        const { email } = req.user;
        const { ownerEmail, ownerMobileNumber, stayId } = req.body;
        console.log("body", req.body);

        if (!ownerEmail || !ownerMobileNumber || !stayId) {
          res.status(400).json({
            error:
              "stayId, ownerEmail and ownerMobileNumber fields are required to process this request.",
          });
        }

        const user = await User.findOne({ email: email });

        const isRecordAlreadyExists = await Record.findOne({ stayId: stayId });

        let savedRecord;

        let dateTime = new Date();

        let date = Moment(dateTime).format("DD-MM-YYYY");
        let time = Moment(dateTime).format("hh:mm:ss");

        if (isRecordAlreadyExists) {
          savedRecord = await Record.findOneAndUpdate(
            { stayId: stayId },
            {
              customerDetails: [
                ...isRecordAlreadyExists?.customerDetails,
                {
                  email: email,
                  mobileNumber: user?.mobileNumber,
                  date: date,
                  time: time,
                },
              ],
            }
          );
        } else {
          savedRecord = await new Record({
            ownerEmail,
            ownerMobileNumber,
            stayId,
            customerDetails: [
              {
                email: email,
                mobileNumber: user?.mobileNumber,
                date: date,
                time: time,
              },
            ],
          }).save();
        }

        if (savedRecord) {
          res.status(200).json({
            success: `Record added successfully`,
          });
        }
        res.status(400).json({ error: `Unable to add a record` });
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

export default createConnection(addRecord);
