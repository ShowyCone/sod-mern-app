import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://alexrafael2003:rvCmYyZ99LrxztvM@cluster0.zvthkyv.mongodb.net/?retryWrites=true&w=majority'
    )
    console.log('>>> DB is connected')
  } catch (error) {
    console.error(error)
  }
}
