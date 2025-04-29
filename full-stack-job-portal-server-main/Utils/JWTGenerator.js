const jwt = require("jsonwebtoken");

function JWTGenerator(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
}

module.exports = JWTGenerator;
