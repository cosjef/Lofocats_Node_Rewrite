// create a function and export it in this file
// only protect POST, PUT, DELETE routes with JWT
// don't protect GET if its not sensitive

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
   
    // try-catch block
    // try to decode the token
    try {

    // verify an incoming token
    // verify method will return a decoded JWT if it succeeds
    // verify method verifies and decode
    // if not token present, we should fail (no token is present)
    // get the token from the authorization header
    // const token = req.headers.authorization;
    // get the token from the authorization header ignoring the word "Bearer" and the white space after it
    const token = req.headers.authorization.split(" ")[1];   
    console.log(token);

    //pass the token to the verify method
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // get the token from the POST body and pass to verify method
    // const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        // set a variable to extract userdata if needed
        req.userData = decoded;
        // call next if we successfully authenticated
        next();

    } catch (error) {
        return res.status(401).json ({
            message: 'Auth failed. Invalid JWT'
        });
    }
    
   
}