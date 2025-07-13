import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SomarBlack: require("./assets/fonts/Somar_Black.ttf"),
    SomarBold: require("./assets/fonts/Somar_Bold.ttf"),
    SomarLight: require("./assets/fonts/Somar_Light.ttf"),
    SomarMedium: require("./assets/fonts/Somar_Medium.ttf"),
    SomarRegular: require("./assets/fonts/Somar_Regular.ttf"),
    SomarThin: require("./assets/fonts/Somar_Thin.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
