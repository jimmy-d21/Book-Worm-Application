import jwt from "jsonwebtoken";
import ENV from "../utils/ENV.js";
import UserModel from "../models/user.model.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No authentication token, access denied" });
    }

    const decoded = jwt.verify(token, ENV.jwt);

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ error: "Token is not valid" });
  }
};

export default authUser;
