const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const dbConnect = async() => {
    try {
        const connect = await mongoose.connect(MONGO_DB_URL)

        console.log(`DB Connected ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1); // 1 means with error and 0 means exit process gracefully
    }
}

module.exports ={dbConnect};