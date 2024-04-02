const express = require("express");
require("dotenv").config();
const {success, error} = require('./utlis/responseWrapper');
const { dbConnect } = require("./config/dbConnect");
const cors = require('cors')

//Port 
const PORT = process.env.PORT || 4000;

const app = express();

//routes
const userRoute = require("./routes/userRoute");
const productRoute= require("./routes/productRoute");
app.use(express.json());

const corsOptions = {
  origin: '*',
  credentials: true // If you need to include cookies in the request (e.g., for authentication)
};

//Enabling the access of the application:
app.use(cors(corsOptions))


//Connecting the database:
dbConnect();

//Routes:
app.use("/user", userRoute)
app.use("/product", productRoute);


//App Starting Route:
app.get("/",(req, res)=>{
    return res.status(200).json(success(200, "Server Started", {}));
})


app.listen(PORT, () => {
    try{
        console.log(`Server Started at ${PORT}`)
    }catch(error){
        console.log("Server Not Started: ", error )
    }
})