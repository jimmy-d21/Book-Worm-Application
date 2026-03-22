import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuthContext } from "../context/AuthContext";
import SafeScreen from "../components/SafeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

function RootLayoutNav() {
  const { user, token, loading } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    if (!segments.length) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = !!user && !!token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <RootLayoutNav />
      </AuthContextProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
