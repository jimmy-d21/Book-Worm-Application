import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";

export const register = async (data) => {
  const existingEmail = await UserModel.findByEmail(data.email);
  if (existingEmail) {
    throw { status: 409, error: "Email already exists" };
  }

  const existingUsername = await UserModel.findByUsername(data.username);
  if (existingUsername) {
    throw { status: 409, error: "Username already exists" };
  }

  if (data.password.length < 6) {
    throw { status: 400, error: "Password must be at least 6 characters" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await UserModel.register(
    data.username,
    data.email,
    hashedPassword
  );
};

export const login = async (data) => {
  const user = await UserModel.findByEmail(data.email);

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    user?.password
  );

  if (!user || !isPasswordCorrect) {
    throw { status: 401, message: "Invalid credentials" };
  }

  return user;
};