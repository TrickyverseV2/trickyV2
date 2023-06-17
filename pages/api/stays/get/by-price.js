/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from "db-init/dbConn";
import Stay from "db-init/models/stays";
import authToken from "middlewares/auth";

const getStayByPrice = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (authToken(req, res)) {
        const { price } = req.body;

        if (!price) {
          res.status(400).json({
            error: "price is required to process this request.",
          });
        }
        console.log(price, "price");

        let stays = await Stay.find({ price: { $lte: price } });
        console.log(stays, "stays");
        if (stays) {
          res.status(200).json({
            success: `Stay found with price less than ${price}`,
            data: stays,
          });
        } else {
          res.status(400).json({
            success: false,
            error: `No stays found with price less than ${price}`,
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

export default createConnection(getStayByPrice);
