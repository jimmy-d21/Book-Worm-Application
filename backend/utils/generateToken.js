import jwt from "jsonwebtoken";
import ENV from "./ENV.js";

const generateToken = (userId) => {
    const token = jwt.sign({userId}, ENV.jwt, {expiresIn: "15d"});
    return token;
}

export default generateToken;