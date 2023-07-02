const mongoose=require("mongoose")




const eventModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true,ref: 'User' },
  title: { type: String, required: true },
  venue: { type: String, required: true },
  eventType: { type: String, required: true },
  youtubeUrl: { type: String, required: false },
  price: { type: String, required: true },
  seats: { type: Number, required: true },
  category: { type: String, required:true },
  eventDate: { type: Date, required: true },
  description: { type: String, required: false },
  stays: { type: Array, required: true },
  location: { type: String, required: true },
  status:{type:String,default:"notverified"},
  participatedUsers: [{ type: mongoose.Schema.Types.ObjectId, required: true,ref: 'User' }],
},{timestamps:true});

module.exports=  mongoose.model("events", eventModel);
