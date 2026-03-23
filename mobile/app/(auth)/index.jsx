import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../context/AuthContext";
import Toast from "react-native-toast-message";

export default function Login() {
  const { fetchLogin } = useAuthContext();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const result = await fetchLogin(email, password);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Welcome 🎉",
        text2: result.message || "Login successful!",
      });
      setEmail("");
      setPassword("");
      router.replace("/(tabs)");
    } else {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: result.message || "Invalid credentials.",
      });
    }
  };

  return (
    <View
      style={{
        flexGrow: 1,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DDF6D2",
      }}
    >
      <Image
        source={require("../../assets/images/book-logo.png")}
        style={{ width: 300, height: 300 }}
      />

      <View
        style={{
          padding: 25,
          borderRadius: 15,
          width: "100%",
          backgroundColor: "#fff",
          gap: 15,
        }}
      >
        {/* EMAIL */}
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "600" }}>Email</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: "#BFC6C4",
            }}
          >
            <Ionicons name="mail-outline" size={24} color="#7FB77E" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter your email"
              style={{ flex: 1 }}
            />
          </View>
        </View>

        {/* PASSWORD */}
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "600" }}>Password</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: "#BFC6C4",
            }}
          >
            <Ionicons
              name={showPassword ? "lock-open-outline" : "lock-closed-outline"}
              size={24}
              color="#7FB77E"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="******"
              style={{ flex: 1 }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#7FB77E"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#6CA651",
            padding: 15,
            borderRadius: 15,
            marginTop: 20,
          }}
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 13, color: "#9ca3af", fontWeight: "500" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={{ fontWeight: "800", fontSize: 14, color: "#16a34a" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
