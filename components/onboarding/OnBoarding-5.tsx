import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import OAuth from "../OAuth";

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

      <TouchableOpacity
        onPress={() => router.replace("/auth/login")}
        className="bg-secondary rounded-xl p-4 w-full mt-10"
      >
        <Text className="text-white font-SomarBlack text-center">
          {t("login")}
        </Text>
      </TouchableOpacity>

      <OAuth />

      <View className="flex-row justify-center items-center mt-10">
        <Text className="font-SomarRegular text-center text-secondary">
          {t("dont_have_account")}
          {"   "}
        </Text>
        <TouchableOpacity onPress={() => router.replace("/auth/register")}>
          <Text className="text-primary font-SomarRegular text-center">
            {t("register")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding5;
