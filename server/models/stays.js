const mongoose=require("mongoose")


const staysModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true,ref: 'User' },
  title: { type: String, required: true },
  address: { type: String, required: true },
  stayType: { type: String, required: true },
  thumbnail: { type: String, required: true },
  pictures: { type: Array, required: false },
  price: { type: Number, required: true },
  category: { type: String, required:true },
  destination:{ type: String, required:true },
  facilitiesProvided: { type: Array, required: true },
  status:{type:String,required:false,default:"notverified"},
  description: { type: String, required: false },
  rating: { type: Number, required: false,default:0 },
  reviews: [{user:{ type: mongoose.Schema.Types.ObjectId, required: true,ref: 'User' },comment:{type:String,required:true}}]}
  ,{timestamps:true});

  module.exports=  mongoose.model("stays", staysModel);
