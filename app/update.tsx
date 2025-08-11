import { useTranslation } from "react-i18next";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

export default function ForceUpdate() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center">
      {/* Background Image */}
      <Image
        source={require("@/assets/update.png")}
        className="w-3/4"
        height={100}
        resizeMode="contain"
      />
      <Text className="text-center text-primary font-SomarBold text-2xl">
        {t("newUpdate")}
      </Text>

      <Text className="text-center text-primary font-SomarRegular text-lg mt-4">
        {t("newUpdateRequired")}
      </Text>

      {/* Content Overlay */}
      <TouchableOpacity
        onPress={() => Linking.openURL("https://www.google.com")}
        className="bg-secondary rounded-xl p-4 mt-10"
        style={{ width: "75%" }}
      >
        <Text className="text-white font-SomarBlack text-center">
          {t("update")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
