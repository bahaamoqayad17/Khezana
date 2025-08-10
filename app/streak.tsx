import BlogStreak from "@/components/BlogStreak";
import PlainTitle from "@/components/PlainTitle";
import ReadingStreak from "@/components/ReadingStreak";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Streak() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"reading" | "forum">("reading");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PlainTitle title={t("achievements_leaderboard")} />

      {/* Common Header Section */}
      <View className="px-6 py-4">
        {/* Achievement Icon and Title */}
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-yellow-500 rounded-full items-center justify-center mb-3">
            <Text className="text-2xl">🏆</Text>
          </View>
          <Text className="text-xl font-SomarBold text-primary text-center">
            {activeTab === "reading"
              ? t("reading_leaderboard")
              : t("forum_leaderboard")}
          </Text>
          <Text className="text-sm font-SomarMedium text-gray-600 text-center mt-1">
            {activeTab === "reading"
              ? t("reading_leaderboard_desc")
              : t("forum_leaderboard_desc")}
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-gray-100 rounded-lg p-1 mb-4">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md ${
              activeTab === "reading" ? "bg-white" : "bg-transparent"
            }`}
            onPress={() => setActiveTab("reading")}
          >
            <Text
              className={`text-center font-SomarBold ${
                activeTab === "reading" ? "text-primary" : "text-gray-600"
              }`}
            >
              {t("reading_leaderboard")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 rounded-md ${
              activeTab === "forum" ? "bg-white" : "bg-transparent"
            }`}
            onPress={() => setActiveTab("forum")}
          >
            <Text
              className={`text-center font-SomarBold ${
                activeTab === "forum" ? "text-primary" : "text-gray-600"
              }`}
            >
              {t("forum_leaderboard")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Content */}
      {activeTab === "reading" ? <ReadingStreak /> : <BlogStreak />}
    </SafeAreaView>
  );
}
