
const
    jwt = require('jsonwebtoken'),
    jwtDecode = require('jwt-decode'),
    User = require('./src/models/userModel.js'),
    {JWT_SECRET, EXPIRESIN} = process.env;

// function for creating tokens
function signToken(user) {
    // toObject() returns a basic js object with only the info from the db
    //   const userData = user.toObject();
    //   delete userData.password;
    const token = jwt.sign({
            _id: user.toObject()._id,
            role: user.toObject().role,
            name: user.toObject().name,
            email: user.toObject().email,
            __v: user.toObject().__v
        }, JWT_SECRET,
        {
            expiresIn: EXPIRESIN // expires in 5 min
        });
//    console.log(token)

//    console.log(refreshtoken)
    return token;
}

function refreshToken(token) {
    const decodedd = jwtDecode(token);

//    console.log(refreshtoken)
    return token = jwt.sign({
            _id: decodedd._id,
            role: decodedd.role,
            name:decodedd.name,
            email: decodedd.email,
            __v: decodedd.__v
        }, JWT_SECRET,
        {
            expiresIn: EXPIRESIN // expires in 5 min
        });
}

// function for verifying tokens
function verifyToken(req, res, next) {

    // grab token from either headers, req.body, or query string
    const token = req.header("token") || req.get('token') || req.body.token || req.query.token;
    // if no token present, deny access
    if (!token) return res.status(401).json({success: false, message: "No token provided"});
    // otherwise, try to verify token

    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        // if problem with token verification, deny access
        if (err) return res.status(403).json({success: false, message: "Invalid token."});
        // otherwise, search for user by id that was embedded in token
        User.findById(decodedData._id, (err, user) => {
            // if no user, deny access
            if (!user) return res.json({success: false, message: "Invalid token."});
            // otherwise, add user to req object
            req.user = user;
            // go on to process the route:
            next()
        })
    })
}

module.exports = {
    signToken,
    verifyToken,
    refreshToken
};
