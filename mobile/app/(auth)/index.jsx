import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
      {/* Image Logo */}
      <Image
        source={require("../../assets/images/book-logo.png")}
        style={{ width: 300, height: 300 }}
      />
      <View
        style={{
          padding: 25,
          borderRadius: 15,
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#fff",
          gap: 15,
        }}
      >
        {/* Email Inputs */}
        <View style={{ flexDirection: "column", gap: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#393E46" }}>
            Email
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderColor: "#BFC6C4",
              borderWidth: 1,
              paddingVertical: 3,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <Ionicons name="mail-outline" size={24} color="#7FB77E" />
            <TextInput
              placeholder="Enter you email"
              style={{ flex: 1, fontSize: 15, fontWeight: "500" }}
            />
          </View>
        </View>
        {/* Password Inputs */}
        <View style={{ flexDirection: "column", gap: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#393E46" }}>
            Password
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderColor: "#BFC6C4",
              borderWidth: 1,
              paddingVertical: 3,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name={showPassword ? "lock-open-outline" : "lock-closed-outline"}
              size={24}
              color="#7FB77E"
            />
            <TextInput
              placeholder="******"
              secureTextEntry={!showPassword}
              style={{ flex: 1, fontSize: 15, fontWeight: "500" }}
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
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#6CA651",
            paddingVertical: 15,
            borderRadius: 15,
          }}
        >
          <Text style={{ fontWeight: "600", color: "#fff", fontSize: 16 }}>
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            gap: 8,
          }}
        >
          <Text style={{ color: "#757575", fontWeight: "400" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={{ color: "#43A047", fontWeight: "600" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
