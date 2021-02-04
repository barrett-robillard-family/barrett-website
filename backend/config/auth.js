const jwt = require('jsonwebtoken');
const { JWT_TOKEN, ADMIN_IDS } = process.env;

module.exports = function(req, res, next) {
    let token = req.get('Authorization') || req.query.token || req.body.token;
    if (token) {
        token = token.replace('Bearer ', '');
        console.log("AUTHENTICATING: ", token)
        jwt.verify(token, JWT_TOKEN, (err, decoded) => {
            if (err) {
                req.error = err;
                next();
            } else {
                req.user = decoded;
                let isAdmin = ADMIN_IDS.includes(decoded._id);
                if (isAdmin) {
                    console.log('WELCOME ADMIN')
                    req.admin = true;
                }
                next();
            }
        })
    } else {
        console.log("NO TOKEN FOUND..");
        next()
    }
}