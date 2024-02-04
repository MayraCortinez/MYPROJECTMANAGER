const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.set('strictQuery', false)
        const connection = await mongoose.connect('mongodb+srv://mayra:1234@cluster0.mhj1gk2.mongodb.net/?retryWrites=true&w=majority')
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB connected in ${url}`)
    } catch (error) {
        console.log(`ERROR MongoDB: ${error.message}`);
    }
}

module.exports = connectDB