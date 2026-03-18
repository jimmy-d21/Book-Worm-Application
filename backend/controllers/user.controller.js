import UserModel from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provide all the fields." });
    }

    const emailExists = await UserModel.findEmailExist(email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const usernameExists = await UserModel.findUsernameExist(username);
    if (usernameExists) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const user = await UserModel.register(username, email, password);
    res.status(201).json({ message: "Account created successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
