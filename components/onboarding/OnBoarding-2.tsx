import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

const OnBoarding2 = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 items-center justify-center">
      {/* Skip text at top */}

      {/* Main illustration */}
      <View className="justify-center items-center">
        <View className="w-full">
          <Image source={require("@/assets/onboarding-2.jpg")} />
        </View>

        <View className="lines flex-row justify-center items-center mt-7">
          <View className="line2"></View>
          <View className="line"></View>
        </View>
      </View>

      <Text className="text-2xl text-primary font-SomarBold text-center mt-10">
        {t("welcome_1")}
      </Text>
    </View>
  );
};

export default OnBoarding2;
