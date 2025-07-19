// import * as Updates from "expo-updates";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";

const OnBoarding1 = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("ar");

  const languages = [
    { code: "ar", name: "arabic", flag: "🇸🇦" },
    { code: "en", name: "english", flag: "🇺🇸" },
    { code: "fr", name: "french", flag: "🇫🇷" },
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // i18n.changeLanguage(languageCode);
    // if (I18nManager.isRTL !== (languageCode === "ar")) {
    //   I18nManager.forceRTL(languageCode === "ar");
    //   //   Updates.reloadAsync();
    // }
    // AsyncStorage.setItem("language", languageCode);
  };

  return (
    <View className="flex-1 items-center justify-center">
      {/* Skip text at top */}
      <Text className="text-4xl text-primary font-SomarBold text-center">
        {t("choose_language")}
      </Text>

      {/* Main illustration */}
      <View className="justify-center items-center px-10 my-[12%]">
        <View className="w-full">
          <Image source={require("@/assets/onboarding-1.jpg")} />
        </View>

        <View className="lines flex-row justify-center items-center mt-7">
          <View className="line2"></View>
          <View className="line"></View>
        </View>
      </View>

      {/* Language selection cards */}
      <View className="w-full px-14">
        <View className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {languages.map((language, index) => (
            <TouchableOpacity
              key={language.code}
              className={`py-4 ${
                selectedLanguage === language.code ? "bg-secondary" : "bg-white"
              } ${
                index !== languages.length - 1 ? "border-b border-gray-200" : ""
              }`}
              onPress={() => handleLanguageSelect(language.code)}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text
                className={`text-lg font-SomarMedium text-center ${
                  selectedLanguage === language.code
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {t(language.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default OnBoarding1;
