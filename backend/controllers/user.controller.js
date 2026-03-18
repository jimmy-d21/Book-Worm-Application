import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (await UserModel.findByEmail(email)) {
      return res.status(409).json({ error: "Email already exists." });
    }

    if (await UserModel.findByUsername(username)) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const user = await UserModel.register(username, email, password);
    const token = generateToken(user.id);

    res.status(201).json({ message: "Account created successfully!", user, token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const { password: _, ...safeUser } = user;
    const token = generateToken(safeUser.id);

    res.status(200).json({ message: "Login successful", user: safeUser, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getAuthUser = async (req,res) => {
    try {
    const user = req.user;
    const {password: _, ...safeUser} = user;

    res.status(200).json({user: safeUser});
    } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });    
    }
}