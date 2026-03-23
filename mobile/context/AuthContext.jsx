import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from storage on app start
  const checkAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedToken || !storedUser) return;

      // Parse the stored user string back into an object
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } catch (err) {
      console.log("Auth check failed, clearing session:", err.message);
      await AsyncStorage.clear();
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogin = async (email, password) => {
    try {
      const { data } = await api.post("/api/users/login", { email, password });

      // Backend returns error field on failure
      if (data.error) {
        return { success: false, message: data.error };
      }

      const user = data.data?.user || data.user;
      const token = data.data?.token || data.token;
      const message = data.message;

      // Save to storage and state
      await saveToStorage(user, token);

      // Return success with backend message
      return { success: true, message };
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      return { success: false, message };
    }
  };

  const fetchRegister = async (username, email, password, confirmPassword) => {
    try {
      const { data } = await api.post("/api/users/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      if (data.error) {
        return { success: false, message: data.error };
      }

      const user = data.data.user || data.data?.user;
      const token = data.data.token || data.data?.token;
      const message = data.message;

      // Save to storage and state
      saveToStorage(user, token);

      // Return success with backend message
      return { success: true, message };
    } catch (error) {
      console.log("Register ERROR:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      return { success: false, message };
    }
  };

  const saveToStorage = async (user, token) => {
    if (!token) throw new Error("No token received");

    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, fetchLogin, logout, fetchRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used inside AuthContextProvider");
  return context;
};
