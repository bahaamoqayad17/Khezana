import AppleIcon from "@/icons/Apple";
import FacebookIcon from "@/icons/Facebook";
import GoogleIcon from "@/icons/Google";
import axios from "@/utils/axios";
import getPushToken from "@/utils/PushToken";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface OAuthUserData {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: "google" | "facebook" | "apple";
}

GoogleSignin.configure({
  webClientId:
    "1046301485171-cm9etb3ttav6dqgq375hf32rsl8d7vaa.apps.googleusercontent.com",
  offlineAccess: true,
  hostedDomain: "",
  forceCodeForRefreshToken: true,
});

const OAuth = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  // Handle OAuth login with backend
  const handleOAuthLogin = async (provider: string, access_token: string) => {
    try {
      setLoading(true);
      setActiveProvider(provider);

      const expo_push_token = await getPushToken();

      const response = await axios.post("/auth/google/callback", {
        access_token,
        expo_push_token,
      });

      await AsyncStorage.setItem("token", response.data.access_token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      showSuccessToast({
        title: t("login_success"),
        duration: 3000,
      });

      setTimeout(() => {
        router.replace("/(tabs)");
      }, 1000);
    } catch (error: any) {
      console.error(`${provider} OAuth error:`, JSON.stringify(error));

      let errorMessage = t("login_error");
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      showErrorToast({
        title: errorMessage,
        duration: 3000,
      });
    } finally {
      setLoading(false);
      setActiveProvider(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setActiveProvider("google");
      setLoading(true);

      // Check if device supports Google Play Services
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Sign in with Google
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.user) {
        const userData: OAuthUserData = {
          id: userInfo.data.user.id,
          email: userInfo.data.user.email,
          name: userInfo.data.user.name || "",
          picture: userInfo.data.user.photo || undefined,
          provider: "google",
        };

        // Get access token
        const tokens = await GoogleSignin.getTokens();

        await handleOAuthLogin("google", tokens.accessToken, userData);
      }
    } catch (error: any) {
      console.error("Google Sign-In error:", error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled Google sign-in");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google sign-in already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showErrorToast({
          title: "Google Play Services not available",
          duration: 3000,
        });
      } else {
        showErrorToast({
          title: t("google_login_error"),
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
      setActiveProvider(null);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setActiveProvider("apple");
      setLoading(true);

      if (Platform.OS === "ios") {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        const userData: OAuthUserData = {
          id: credential.user,
          email: credential.email || "",
          name: credential.fullName
            ? `${credential.fullName.givenName || ""} ${credential.fullName.familyName || ""}`.trim()
            : "",
          provider: "apple",
        };

        await handleOAuthLogin(
          "apple",
          credential.identityToken || "",
          userData
        );
      } else {
        // Apple Sign-In is not available on Android
        showErrorToast({
          title: t("apple_login_not_available"),
          duration: 3000,
        });
        setLoading(false);
        setActiveProvider(null);
      }
    } catch (error: any) {
      console.error("Apple login error:", error);

      if (error.code === "ERR_REQUEST_CANCELED") {
        // User canceled the sign-in flow
        setLoading(false);
        setActiveProvider(null);
        return;
      }

      showErrorToast({
        title: t("apple_login_error"),
        duration: 3000,
      });
      setLoading(false);
      setActiveProvider(null);
    }
  };

  return (
    <View className="flex-row justify-around items-center mt-10 w-[80%]">
      {/* Apple Button - Only show on iOS */}
      {Platform.OS === "ios" && (
        <TouchableOpacity
          className="items-center"
          onPress={handleAppleLogin}
          disabled={loading}
        >
          <View className="w-16 h-16 bg-white rounded-full shadow-sm border border-gray-200 justify-center items-center mb-2">
            {loading && activeProvider === "apple" ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <AppleIcon />
            )}
          </View>
          <Text className="text-sm text-gray-600 font-medium">Apple</Text>
        </TouchableOpacity>
      )}

      {/* Google Button */}
      <TouchableOpacity
        className="items-center"
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <View className="w-16 h-16 bg-white rounded-full shadow-sm border border-gray-200 justify-center items-center mb-2">
          {loading && activeProvider === "google" ? (
            <ActivityIndicator size="small" color="#4285F4" />
          ) : (
            <GoogleIcon />
          )}
        </View>
        <Text className="text-sm text-gray-600 font-medium">Google</Text>
      </TouchableOpacity>

      {/* Facebook Button */}
      <TouchableOpacity
        className="items-center"
        onPress={() => {
          Alert.alert(t("coming_soon"));
        }}
        disabled={loading}
      >
        <View className="w-16 h-16 bg-white rounded-full shadow-sm border border-gray-200 justify-center items-center mb-2">
          {loading && activeProvider === "facebook" ? (
            <ActivityIndicator size="small" color="#1877F2" />
          ) : (
            <FacebookIcon />
          )}
        </View>
        <Text className="text-sm text-gray-600 font-medium">Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OAuth;
