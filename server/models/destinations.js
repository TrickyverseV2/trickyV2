const mongoose=require("mongoose")



const destinationModel = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: false },
}
  ,{timestamps:true});

  module.exports=  mongoose.model("destinations", destinationModel);
