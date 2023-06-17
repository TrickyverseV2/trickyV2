// /* eslint-disable lines-around-comment */
import { ObjectId } from "mongodb";
import { Schema, models, model } from "mongoose";

const recordsModel = new Schema({
  ownerMobileNumber: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  stayId: { type: String, required: true },
  customerDetails: {
    type: Array,
    required: true,
    default: [],
    // { email: "abc@gmail.com", mobileNumber: "9876543210", date: Date, time: Date }
  },
});

export default models.records || model("records", recordsModel);
