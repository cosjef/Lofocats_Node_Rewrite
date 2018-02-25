// create a function and export it in this file
// only protect POST, PUT, DELETE routes with JWT
// don't protect GET routes if its not sensitive

// Create RSA keypair
// ssh-keygen -t rsa -b 4096 -f jwtRS256.key
// openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

const jwt = require('jsonwebtoken');

// Decode the JWT
module.exports = function (req, res, next)  {
   
    // verify an incoming token
    // verify method will return a decoded JWT if it succeeds
    // verify method verifies and decodes
    // if token not present, we should fail (no token is present)
    // get the token from the authorization header
    // const token = req.headers.authorization;
    // get the token from the authorization header ignoring the word "Bearer" and the white space after it
    //const token = req.headers.authorization.split(" ")[1];   
    //console.log(token);

    // jwt.verify(token, secretOrPublicKey, [options, callback])
    // token is the JWT string
    // secretOrPublicKey is a string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA
    // get public key
    /// const cert = fs.readFileSync('jwtRS256.key.pub'); 
    /// const decoded = jwt.verify(token, cert);

    // get the token from the request and pass to verify method
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    
    // original code
    // const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    
    const token = req.body.token || req.query.token || req.headers['Authorization'];
    // const token = req.body.token || req.query.token || req.headers['Authorization'].split(" ")[1];
    console.log('Inbound JWT :' + token);
    if (token){

        // get public key
        const fs = require("fs");
        const cert = fs.readFileSync('jwtRS256.key.pub');
        //console.log('Token from POST body: ' + req.body.token);
        jwt.verify(token, cert, function(err, decoded){
            // failed validation
            if (err) {
                return res.json({
                    message: 'Validation failed'
                });
            }
            req.decoded = decoded;
            console.log('Decoded JWT token values: ' + decoded);
            // no error, proceed 
            next();
        });
    } else {
        // access forbidden without token
        return res.status(403).send( {
            "error": true
        });
    }

    }

