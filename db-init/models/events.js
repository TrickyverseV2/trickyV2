// /* eslint-disable lines-around-comment */
import { Schema, models, model } from "mongoose";

const eventModel = new Schema({
  user: {
    type: Object,
    required: true,
    default: {
      uid: "yyyyy",
      username: "",
      displayName: "",
      profilePic: "",
      region: "",
    },
  },
  title: { type: String, required: true },
  venue: { type: String, required: true },
  eventType: { type: String, required: true },
  videoUrl: { type: String, required: false },
  thumbnail: { type: String, required: true },
  price: { type: String, required: true },
  eventDate: { type: Date, required: true },
  description: { type: String, required: false },
  tags: { type: Array, required: true },
  location: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
  favorites: {
    type: Array,
    required: false,
    default: [],
  },
  basic: {
    type: Object,
    required: true,
    // { price: 200, facilities: 'tour to the museum'}
  },
  advance: {
    type: Object,
    required: false,
    // { price: 500, facilities: 'tour to the museum'}
  },
  premium: {
    type: Object,
    required: false,
    // { price: 1000, facilities: 'tour to the museum'}
  },
  participatedUsers: {
    type: Array,
    required: false,
    default: [],
    // [{ name: "abc" email: 'abc@gmamil.com', phone: '9876543210', guests: 2, price: 2000, packageIncluded: 'basic' }]
  },
  modificationLogs: { type: Array, default: [] },
});

export default models.events || model("events", eventModel);
