// /* eslint-disable lines-around-comment */
const mongoose=require("mongoose")

const blogModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true,ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, required: false },
  locations: { type: Array, required: false },
  isPublished: { type: Boolean, default: false },
  category: { type: String, required:true },
  status:{type:String,default:"notverified"},
  views: {type: Number,required: false,  default:0},
  likes: [{ type: mongoose.Schema.Types.ObjectId, required: true,ref: 'User' }],
  comments: [{ user:{ type: mongoose.Schema.Types.ObjectId, required: true,ref: 'User' } ,comment:{type:String,required:true}}],
  thumbnal: {type: String,required: true},
  body: {type: String,required: true},
},{timestamps:true})

module.exports= mongoose.model('blogs', blogModel)
