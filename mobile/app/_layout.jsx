import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuthContext } from "../context/AuthContext";
import SafeScreen from "../components/SafeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

function RootLayoutNav() {
  const { user, token, loading } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    if (!segments.length) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6CA651" />
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
      <Toast />
      <StatusBar barStyle="dark" />
    </SafeAreaProvider>
  );
}
