import mongoose from 'mongoose'

const createConnection = handler => async (req, res) => {
  const uri = 'mongodb+srv://admin:admin@cluster0.svd0dms.mongodb.net/test'
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }
  await mongoose.connect(uri)

  return handler(req, res)
}

export default createConnection
