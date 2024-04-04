const bcrypt = require("bcrypt");
const { success, error } = require("../utlis/responseWrapper");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const loginController = async (req, res) => {
  try {
    const { password } = req.body;

    //I am using the email for unique identifier for both the mobile number and email
    const email = req.body?.email || req.body?.mobile;

    //Checking if the user have send the required filleds or not
    if (!password && !email) {
      return res.status(200).json(error(200, "User Details Not Given", []));
    }

    //Find the User in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json(error(401, "User Not Exist", []));
    }

    //If user found
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).json(error(401, "Password Not Matched", []));
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    return res
      .status(200)
      .json(success(200, "Login Successfull", { user, token }));
  } catch (err) {
    console.log("Error While LogIn", err);

    return res.status(500).json(error(500, "Internal Server Error", []));
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    //Find the User in the database
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json(error(401, "User Not Exist", []));
    }

    return res
      .status(200)
      .json(success(200, "Login Successfull",  user));
  } catch (err) {
    console.log("Error While LogIn", err);

    return res.status(500).json(error(500, "Internal Server Error", []));
  }
};

module.exports = {loginController, getUserDetails}
