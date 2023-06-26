const mongoose=require("mongoose")


const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, unique: true, required: false, sparse: true },
  password: { type: String, required: true },
  Bio: { type: String },
  mobileNumber: { type: String, unique: true, required: false, sparse: true },
  Earning: { type: Number, default:0 },
  youtube: { type: String, unique: true,default:"" },
  instagram: { type: String, unique: true,default:""  },
  facebook: { type: String, unique: true,default:"" },
  profileImage: { type: String, required: false },
  displayName: { type: String, required: false },
  region: { type: String, required: false },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: false }],
  isVerified:{type:Boolean,default:false},
  VerficationCode:{type:String, expires: 120 },
  ForgetPasswordCode:{type:String, expires: 120 },
  role: {type:String,default:"user"},
  isAdmin:{type:Boolean,default:false},
  isProfileComplete: { type: Boolean, default: false },
},{timestamps:true})

module.exports= mongoose.model('User', UserSchema)
