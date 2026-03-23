import * as userService from "../services/user.service.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match. Please try again." });
    }

    const user = await userService.register({ username, email, password });
    const token = generateToken(user.id);

    res.status(201).json({
      message: "Account created successfully",
      data: { user, token }
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(error.status || 500).json({
      message: error.message || "Internal server error"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userService.login({ email, password });

    const { password: _, ...safeUser } = user;
    const token = generateToken(safeUser.id);

    res.status(200).json({
      message: "Login successful",
      data: {
        user: safeUser,
        token
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(error.status || 500).json({
      message: error.message || "Internal server error"
    });
  }
};

export const getAuthUser = async (req, res) => {
  try {
    const user = req.user;
    const { password: _, ...safeUser } = user;

    res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}