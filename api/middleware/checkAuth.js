const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET_KEY);
        req.userData = decoded;
        next();
    }
    catch (err){
        res.status(401).json({
            status: 401,
            message: "Auth failed"
        });
    }
};