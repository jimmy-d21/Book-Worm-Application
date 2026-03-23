import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../context/AuthContext";
import Toast from "react-native-toast-message";

export default function Signup() {
  const { fetchRegister } = useAuthContext();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    const result = await fetchRegister(
      username,
      email,
      password,
      confirmPassword,
    );

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "🎉 Account Created",
        text2:
          result.message ||
          "Your account has been successfully registered. Welcome aboard!",
      });
      setEmail("");
      setPassword("");
      setUsername("");
      router.replace("/(tabs)"); // redirect to home or dashboard
    } else {
      Toast.show({
        type: "error",
        text1: "Register Failed",
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
      <View
        style={{
          padding: 25,
          borderRadius: 15,
          width: "100%",
          backgroundColor: "#fff",
          gap: 15,
        }}
      >
        {/* Title Logo */}
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "600",
              color: "#16a34a",
              marginBottom: 5,
            }}
          >
            BookWorm 🐛
          </Text>
          <Text style={{ color: "#6b7280", fontWeight: "500" }}>
            Share your favorite reads
          </Text>
        </View>
        {/* USERNAME */}
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "600" }}>Username</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderColor: "#BFC6C4",
            }}
          >
            <FontAwesome6 name="user" size={24} color="#7FB77E" />
            <TextInput
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="Enter your username"
              style={{ flex: 1 }}
            />
          </View>
        </View>

        {/* EMAIL */}
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "600" }}>Email</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
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
              paddingVertical: 10,
              paddingHorizontal: 15,
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

        {/* CONFIRM PASSWORD */}
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "600" }}>Confirm Password</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderColor: "#BFC6C4",
            }}
          >
            <Ionicons
              name={
                showConfirmPassword
                  ? "lock-open-outline"
                  : "lock-closed-outline"
              }
              size={24}
              color="#7FB77E"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="******"
              style={{ flex: 1 }}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#7FB77E"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
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
            Sign Up
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
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)")}>
            <Text style={{ fontWeight: "800", fontSize: 14, color: "#16a34a" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
