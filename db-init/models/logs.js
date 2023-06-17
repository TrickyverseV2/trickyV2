/* eslint-disable lines-around-comment */
import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
  userAgent: { type: String, required: true },
  loggedAt: { type: Date, default: Date.now() }
})

export default mongoose.models.Log || mongoose.model('Log', LogSchema)
