const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ error: "Access denied. Token not provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.userId = decoded.id;
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ error: "Access token has expired." });
        } else {
            return res.status(401).send({ error: "Invalid token." });
        }
    }
}

module.exports = {fetchUser};
