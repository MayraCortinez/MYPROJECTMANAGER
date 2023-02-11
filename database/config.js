const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.set('strictQuery', false)
        const connection = await mongoose.connect(process.env.DB_CONNECTION)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB connected in ${url}`)
    } catch (error) {
        console.log(`ERROR MongoDB: ${error.message}`);
    }
}

module.exports = connectDB