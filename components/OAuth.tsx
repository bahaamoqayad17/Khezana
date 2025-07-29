import AppleIcon from "@/icons/Apple";
import FacebookIcon from "@/icons/Facebook";
import GoogleIcon from "@/icons/Google";
// import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

// WebBrowser.maybeCompleteAuthSession(); // Ensures browser session completion

const OAuth = () => {
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  /** ✅ Google OAuth Configuration */
  //   const [googleRequest, googleResponse, googlePromptAsync] =
  //     Google.useAuthRequest({
  //       clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  //       webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  //       androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  //       iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  //     });

  //   /** ✅ Facebook OAuth Configuration */
  //   const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
  //     clientId: process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_ID,
  //     redirectUri: "https://auth.expo.io/@bahaamoqayad17/alpazar-app",
  //   });

  //   useEffect(() => {
  //     if (googleResponse?.type === "success") {
  //       setLoading(true);
  //       setActiveProvider("google");
  //       // handleOAuthLogin("google", googleResponse.authentication.accessToken);
  //     }
  //   }, [googleResponse]);

  //   useEffect(() => {
  //     if (fbResponse?.type === "success") {
  //       const accessToken = fbResponse?.authentication?.accessToken;
  //       setActiveProvider("facebook");
  //       WebBrowser.dismissBrowser();
  //       //   handleOAuthLogin("facebook", accessToken);
  //     }
  //   }, [fbResponse]);

  const handleGoogleLogin = () => {
    setActiveProvider("google");
    setLoading(true);
    // googlePromptAsync();
  };

  const handleFacebookLogin = () => {
    setActiveProvider("facebook");
    setLoading(true);
    // fbPromptAsync();
  };

  const handleAppleLogin = () => {
    setActiveProvider("apple");
    setLoading(true);
    // TODO: Implement Apple Sign-In
    console.log("Apple Sign-In not implemented yet");
    setTimeout(() => {
      setLoading(false);
      setActiveProvider(null);
    }, 1000);
  };

  return (
    <View className="flex-row justify-around items-center mt-10 w-[80%]">
      {/* Apple Button */}
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

      <TouchableOpacity
        className="items-center"
        onPress={handleFacebookLogin}
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
