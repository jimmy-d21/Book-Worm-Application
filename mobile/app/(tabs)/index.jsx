import { View, Text, TouchableOpacity } from "react-native";
import { useAuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuthContext();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome {user?.email}</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={{ color: "red", marginTop: 20 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
