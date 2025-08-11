import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function UnAuthorized() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("@/assets/unauthorized.png")}
        className="w-3/4 h-1/2"
        resizeMode="contain"
      />
      <Text className="text-center text-primary font-SomarBold text-2xl">
        {t("unauthorized")}
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("/auth/login")}
        className="bg-secondary rounded-xl p-4 mt-10"
        style={{ width: "75%" }}
      >
        <Text className="text-white font-SomarBlack text-center">
          {t("login")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
