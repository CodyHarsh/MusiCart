const feedback = require("../models/feedback");
const { success, error } = require("../utlis/responseWrapper");

const feedbackController = async (req, res) => {
    try {
        const {userId, type, message} = req.body;

        if(!userId ||  !type || !message){
            return res.status(200).json(error(401, "User Details are missing",[] ))
        }

        const response = await feedback.create({
            user: userId,
            type, 
            message
        })

        if(!response){
            return res.status(400).json(error(400, "Backend Error",[]))
        }

        return res.status(200).json(success(200, "Feedback created successfully", []))


    } catch (error) {
        console.log("Error while Feedback: " + error);

        return res.status(500).json(error(500, "Internal Server Error", []))
    }
}

module.exports = feedbackController;