// /* eslint-disable lines-around-comment */
import { Schema, models, model } from "mongoose";

const staysModel = new Schema({
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

  address: { type: String, required: true },

  stayType: { type: String, required: true },

  thumbnail: { type: String, required: true },

  pictures: { type: Array, required: false },

  price: { type: Number, required: true },

  facilitiesProvided: { type: Array, required: true },

  description: { type: String, required: false },

  rating: { type: Number, required: false },

  reviews: {
    type: Array,

    required: false,

    default: [],

    // [{ id: "user1", region: "jaipur,india", profileImage: "ghj", userName: "", review: "This is test review" }]
  },

  shares: {
    type: Array,

    required: false,

    default: [],

    // [{ id: 'user1', region: 'jaipur,india', type: 'whatsapp', profileImage: 'ghj', userName: '' }]
  },

  favorites: {
    type: Array,

    required: false,

    default: [],

    // [{ id: 'user1', userName: '', region: 'jaipur,india', profileImage: 'ghj' }]
  },

  bookingDetails: {
    type: Array,

    required: false,

    default: [],

    // [{ id: 'user1', email: 'abc@gmamil.com', region: 'jaipur,india', phone: '9876543210', guests: 2, price: 2000, }]
  },

  modificationLogs: { type: Array, default: [] },
});

export default models.stays || model("stays", staysModel);
