import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

export default function Offline() {
  const { t } = useTranslation();

  return (
    <View className="flex-1">
      {/* Background Image */}
      <Image
        source={require("@/assets/offline.png")}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />

      {/* Content Overlay */}
      <View className="flex-1 justify-center items-center px-8">
        <Text className="text-center text-primary font-SomarBold text-2xl mb-8">
          {t("offline")}
        </Text>
      </View>
    </View>
  );
}
