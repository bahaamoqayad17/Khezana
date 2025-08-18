import BlogStreak from "@/components/BlogStreak";
import PlainTitle from "@/components/PlainTitle";
import ReadingStreak from "@/components/ReadingStreak";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Leaderboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"reading" | "forum">("reading");

  return (
    <SafeAreaView className="flex-1 bg-white mb-10">
      <PlainTitle title={t("leaderboard")} />

      {/* Common Header Section */}
      <View className="px-6">
        {/* Achievement Icon and Title */}
        <View className="items-center mb-6">
          {activeTab === "reading" ? (
            <View className="items-center">
              <View className="items-center flex-row gap-2 justify-center mb-4 mt-4">
                <Text className="text-3xl font-SomarBlack">
                  {t("reading_leaderboard")}
                </Text>
                <Text className="text-2xl">🏆</Text>
              </View>
              <Text className="text-sm font-SomarRegular text-gray-600">
                {t("reading_leaderboard_desc")}
              </Text>
            </View>
          ) : (
            <View className="items-center">
              <View className="items-center flex-row gap-2 justify-center mb-4 mt-4">
                <Text className="text-3xl font-SomarBlack">
                  {t("forum_leaderboard")}
                </Text>
                <Text className="text-2xl">🏆</Text>
              </View>
              <Text className="text-sm font-SomarRegular text-gray-600">
                {t("forum_leaderboard_desc")}
              </Text>
            </View>
          )}
        </View>

        {/* Tabs */}
        <View
          className="flex-row gap-1 mb-6 p-1"
          style={{ borderWidth: 1, borderColor: "#E7E7E7", borderRadius: 8 }}
        >
          <TouchableOpacity
            className={`flex-1 flex-row py-3 rounded-lg items-center justify-center ${
              activeTab === "reading" ? "bg-secondary" : "bg-transparent"
            }`}
            onPress={() => setActiveTab("reading")}
          >
            <Text
              className={`font-SomarBold text-sm ${
                activeTab === "reading" ? "text-white" : "text-gray-600"
              }`}
            >
              {t("reading_leaderboard")}
            </Text>

            <Text className="text-xl">🏆</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 flex-row py-3 rounded-lg items-center justify-center ${
              activeTab === "forum" ? "bg-secondary" : "bg-transparent"
            }`}
            onPress={() => setActiveTab("forum")}
          >
            <Text
              className={`font-SomarBold text-sm ${
                activeTab === "forum" ? "text-white" : "text-gray-600"
              }`}
            >
              {t("forum_leaderboard")}
            </Text>

            <Text className="text-xl">🏆</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Content */}
      {activeTab === "reading" ? <ReadingStreak /> : <BlogStreak />}
    </SafeAreaView>
  );
}
