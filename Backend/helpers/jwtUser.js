const jwt = require('jsonwebtoken');

const generateJWT = id => {
    return jwt.sign({ id }, process.env.JWT_PASS, {
        expiresIn: '6h',
    })
};

module.exports = generateJWT;