const success = (statusCode, message, data ) => {
    return {
        success: true, 
        code: statusCode,
        message: message, //Eg: User Registered Successfully
        data: data,
    }
}

const error = (statusCode, message, error ) => {
    return {
        success: false,
        code: statusCode,
        message: message, // Eg: No message available"
        error: error, //Eg: Internal Server Error
    }
}

module.exports = {success, error};
