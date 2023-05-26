const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");


const isAuthenticated = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: "Please login to continue", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id);
    if (!user) {
        return res.status(401).send({ message: "Please login to continue", success: false });
    }

    req.user = decoded.id;

    next();
};

module.exports = isAuthenticated;