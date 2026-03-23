import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Read from .env — must have EXPO_PUBLIC_ prefix
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const API_TIMEOUT = Number(process.env.EXPO_PUBLIC_API_TIMEOUT);

// ✅ Safety check — warns immediately if .env is missing or misconfigured
if (!API_BASE_URL) {
    console.warn("⚠️ EXPO_PUBLIC_API_BASE_URL is not set in your .env file!");
}

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
});

// ✅ Test connection on startup
api.get("/").then((res) => {
    console.log("✅ Backend reachable:", res.data);
}).catch((err) => {
    console.log("❌ Backend NOT reachable");
    console.log("URL tried:", API_BASE_URL);
    console.log("Error:", err.message);
    console.log("Error code:", err.code);
});

// ✅ Attach Bearer token to every request automatically
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;