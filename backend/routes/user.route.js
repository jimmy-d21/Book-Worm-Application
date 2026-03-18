import express from "express";
import { getAuthUser, login, register } from "../controllers/user.controller.js";
import authUser from "../middleware/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getAuth", authUser, getAuthUser);

export default router;