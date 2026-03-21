import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContextProvider } from "../context/AuthContext"

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
        <Stack screenOptions={{headerShown: false}}/>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
