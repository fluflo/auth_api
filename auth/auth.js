"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = exports.authenicateToken = exports.generateAccessToken = void 0;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
function generateAccessToken(userId) {
    return jwt.sign({
        "sub": userId,
        "iat": Math.floor(Date.now() / 1000)
    }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
}
exports.generateAccessToken = generateAccessToken;
function authenicateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.error(err);
        if (err)
            return res.sendStatus(403);
        req.userId = user.sub;
        next();
    });
}
exports.authenicateToken = authenicateToken;
exports.Encrypt = {
    cryptPassword: (password) => bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash),
    comparePassword: (password, hashPassword) => bcrypt.compare(password, hashPassword)
        .then(resp => resp)
};
