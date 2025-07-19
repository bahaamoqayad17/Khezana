import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";

const OnBoarding5 = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 items-center justify-center">
      {/* Skip text at top */}

      {/* Main illustration */}
      <View className="justify-center items-center w-full">
        <Image source={require("@/assets/onboarding-5.jpg")} />
      </View>

      <Text className="text-2xl text-primary font-SomarBlack text-center mt-10">
        {t("welcome_4")}
      </Text>

      <TouchableOpacity className="bg-secondary rounded-xl p-4 w-full mt-10">
        <Text className="text-white font-SomarBlack text-center">
          {t("login")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoarding5;
