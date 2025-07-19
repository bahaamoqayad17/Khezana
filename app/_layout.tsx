import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import i18n from "@/locales/i18";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import { I18nManager, Image, StyleSheet, View } from "react-native";
import "react-native-reanimated";

// Prevent auto-hide and make the splash screen transparent
SplashScreen.preventAutoHideAsync();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAppReady, setIsAppReady] = useState(false);
  const [loaded] = useFonts({
    SomarBlack: require("@/assets/fonts/Somar_Black.ttf"),
    SomarBold: require("@/assets/fonts/Somar_Bold.ttf"),
    SomarLight: require("@/assets/fonts/Somar_Light.ttf"),
    SomarMedium: require("@/assets/fonts/Somar_Medium.ttf"),
    SomarRegular: require("@/assets/fonts/Somar_Regular.ttf"),
    SomarThin: require("@/assets/fonts/Somar_Thin.ttf"),
  });

  // Hide the native splash screen as soon as possible
  useEffect(() => {
    const hideSplash = async () => {
      try {
        // Hide the native splash screen immediately
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Error hiding splash screen:", e);
      }
    };

    hideSplash();
  }, []);

  // Check if fonts are loaded and prepare the app
  useEffect(() => {
    async function prepare() {
      try {
        if (loaded) {
          // After a delay, mark the app as fully ready
          setTimeout(() => {
            setIsAppReady(true);
          }, 3000);

          i18n.use(initReactI18next).init({
            resources: {
              ar: {
                translation: ar,
              },
              en: {
                translation: en,
              },
              fr: {
                translation: fr,
              },
            },
            lng: "ar",
            fallbackLng: "ar",
            interpolation: {
              escapeValue: false,
            },
          });
        }
      } catch (e) {
        console.warn(e);
        setIsAppReady(true);
      }
    }

    prepare();
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (!isAppReady) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#65382C",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
