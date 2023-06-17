/* eslint-disable lines-around-comment */
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, unique: true, required: false, sparse: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, unique: true, required: false, sparse: true },
  profileImage: { type: String, required: false },
  displayName: { type: String, required: false },
  region: { type: String, required: false },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: false }],
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log', required: false }],
  isProfileComplete: { type: Boolean, default: false },
  createdOn: { type: Date },
  updatedOn: { type: Date }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
