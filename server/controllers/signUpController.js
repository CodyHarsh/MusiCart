const User = require("../models/user")
const bcrypt = require("bcrypt");
const { error, success } = require("../utlis/responseWrapper");
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
 const signupController = async(req, res) => {

    try{
    
        const {name, email, password, mobile} = req.body;
        if(!name || !email || !password || !mobile){
            return res.status(200).json(error(400, "User Details Not Provided", []) )
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const prevUser = await User.findOne({email})

        if(prevUser){
            return res.status(401).json(error(401, "User Already Exist", []))
        }

        const prevUser2 = await User.findOne({mobile})

        if(prevUser2){
            return res.status(401).json(error(401, "User Already Exist", []))
        }

        const response = await User.create({
            name, email, mobile, password: hashedPassword
        })

        if(!response){
            return res.status(400).json(error(400, "Unable to SignUp", []));
        }

        // removing the password
        response.password = undefined;
        const token = jwt.sign({ id: response._id }, JWT_SECRET);
        
        return res.status(200).json(success(200, "User Registered Successfully", {response, token}))
        
    }catch(err){
        console.log("Error while signup: " + err);

        return res.status(500).json(error(500, "Internal Server Error", []))
        
    }

}

module.exports = signupController