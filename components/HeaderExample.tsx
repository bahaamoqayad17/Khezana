import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Header from "./Header";

const HeaderExample = () => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-white">
      {/* Categories Header */}
      <Header title={t("categories")} />

      {/* Example usage for different screens */}
      {/* 
      // Home Screen
      <Header title={t("home")} />

      // My Books Screen
      <Header title={t("my_books")} />
      
      // Community Screen
      <Header title={t("community")} />
      */}
    </View>
  );
};

export default HeaderExample;
