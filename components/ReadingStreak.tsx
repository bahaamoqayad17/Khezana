import BooksIcon from "@/icons/Books";
import FirstIcon from "@/icons/First";
import Readers1Icon from "@/icons/Readers1";
import Readers2Icon from "@/icons/Readers2";
import Readers3Icon from "@/icons/Readers3";
import Readers4Icon from "@/icons/Readers4";
import SecondIcon from "@/icons/Second";
import SmallFireIcon from "@/icons/SmallFire";
import ThirdIcon from "@/icons/Third";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ReadingStreak() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"current" | "weekly" | "monthly">(
    "monthly"
  );

  // Mock data for reading achievements
  const stats = [
    { icon: <Readers1Icon />, value: "156", label: t("consecutive_days") },
    { icon: <Readers2Icon />, value: "98.5%", label: t("improvement_rate") },
    { icon: <Readers3Icon />, value: "15,382", label: t("books_read") },
    { icon: <Readers4Icon />, value: "1,247", label: t("participants") },
  ];

  const achievements = [
    {
      title: t("top_reader"),
      position: 1,
      user: t("mahmoud_alqasemi"),
      days: 47,
      books: 23,
      points: 1200,
      avatar: "م",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-400",
    },
    {
      title: t("exceptional_reader"),
      position: 2,
      user: t("fatema_alzahra"),
      days: 42,
      books: 18,
      points: 980,
      avatar: "ف",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-400",
    },
    {
      title: t("good_reader"),
      position: 3,
      user: t("nour_salem"),
      days: 38,
      books: 15,
      points: 850,
      avatar: "ن",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-400",
    },
    {
      title: t("good_reader"),
      position: 4,
      user: t("tariq_hassan"),
      days: 35,
      books: 14,
      points: 780,
      avatar: "ط",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
    },
    {
      title: t("good_reader"),
      position: 5,
      user: t("nayel_qasemi"),
      days: 32,
      books: 12,
      points: 720,
      avatar: "ن",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
    },
    {
      title: t("good_reader"),
      position: 6,
      user: t("hadi_khalil"),
      days: 30,
      books: 11,
      points: 680,
      avatar: "ه",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
    },
  ];

  return (
    <ScrollView className="flex-1 px-6">
      {/* Statistics Cards */}
      <View className="flex-row mb-6 gap-4">
        {stats.map((stat, index) => (
          <View
            key={index}
            className="flex-1 bg-white rounded-xl p-4 mb-3 items-center gap-1"
            style={{ borderWidth: 1, borderColor: "#E7E7E7" }}
          >
            {stat.icon}
            <Text className="text-xl font-SomarBold text-gray-800">
              {stat.value}
            </Text>
            <Text className="text-xs font-SomarMedium text-gray-600 text-center">
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View
        className="flex-row gap-1 mb-6 p-1"
        style={{ borderWidth: 1, borderColor: "#E7E7E7", borderRadius: 8 }}
      >
        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg items-center justify-center ${
            activeTab === "monthly" ? "bg-secondary" : "bg-transparent"
          }`}
          onPress={() => setActiveTab("monthly")}
        >
          <Text
            className={`font-SomarBold text-sm ${
              activeTab === "monthly" ? "text-white" : "text-gray-600"
            }`}
          >
            هذا الشهر
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg items-center justify-center ${
            activeTab === "weekly" ? "bg-secondary" : "bg-transparent"
          }`}
          onPress={() => setActiveTab("weekly")}
        >
          <Text
            className={`font-SomarBold text-sm ${
              activeTab === "weekly" ? "text-white" : "text-gray-600"
            }`}
          >
            الأسبوع الماضي
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg items-center justify-center ${
            activeTab === "current" ? "bg-secondary" : "bg-transparent"
          }`}
          onPress={() => setActiveTab("current")}
        >
          <Text
            className={`font-SomarBold text-sm ${
              activeTab === "current" ? "text-white" : "text-gray-600"
            }`}
          >
            العام الحالي
          </Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard */}
      <View className="gap-4">
        {achievements.map((achievement, index) => (
          <View
            key={index}
            className="bg-white rounded-2xl p-5 relative"
            style={{
              borderLeftWidth: 5,
              elevation: 1,
              borderLeftColor:
                achievement.position === 1
                  ? "#FFD700"
                  : achievement.position === 2
                    ? "#CE9664"
                    : achievement.position === 3
                      ? "#65382C"
                      : "#888888",
            }}
          >
            {/* Position Badge - Top Right */}

            {/* Trophy Icon for Top 3 */}

            {/* Main Content */}
            <View className="flex-row items-center gap-1">
              {achievement.position <= 3 ? (
                <View>
                  {achievement.position === 1 ? (
                    <FirstIcon />
                  ) : achievement.position === 2 ? (
                    <SecondIcon />
                  ) : achievement.position === 3 ? (
                    <ThirdIcon />
                  ) : null}
                </View>
              ) : (
                <View
                  className="bg-gray-100 rounded-full items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                  }}
                >
                  <Text
                    style={{
                      color: "#888888",
                      fontSize: 16,
                    }}
                    className="font-SomarBold"
                  >
                    {index + 1}
                  </Text>
                </View>
              )}
              {/* Left Side - Avatar */}
              <View className="mr-4">
                <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center">
                  <Text className="text-white font-SomarBold text-xl">
                    {achievement.avatar}
                  </Text>
                </View>
              </View>

              {/* Center - User Info */}
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-2">
                  <Text className="text-lg font-SomarBold text-gray-800">
                    {achievement.user}
                  </Text>
                  {achievement.position <= 3 && (
                    <View
                      className="bg-gray-100 px-4 py-2 rounded-3xl"
                      style={{
                        backgroundColor: "#F5ECDF",
                      }}
                    >
                      <Text className="text-sm font-SomarBlack">
                        {achievement.position === 1
                          ? t("first_place")
                          : achievement.position === 2
                            ? t("second_place")
                            : achievement.position === 3
                              ? t("third_place")
                              : ""}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Stats Row */}
                <View className="flex-row flex-wrap items-center gap-2 mb-3">
                  <View className="flex-row items-center gap-1">
                    <SmallFireIcon />
                    <Text className="text-sm font-SomarRegular text-gray-600">
                      {achievement.days} {t("consecutive_days")}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-1">
                    <BooksIcon color="gray" />
                    <Text className="text-sm font-SomarRegular text-gray-600">
                      {achievement.books} {t("book")}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row flex-wrap gap-2">
                  <View
                    className="bg-gray-100 px-3 py-1.5 rounded-lg"
                    style={{
                      borderWidth: 1,
                      borderColor: "#E7E7E7",
                    }}
                  >
                    <Text className="text-xs font-SomarMedium text-gray-600">
                      {t("golden_reader")}
                    </Text>
                  </View>

                  <View
                    className="bg-gray-100 px-3 py-1.5 rounded-lg"
                    style={{
                      borderWidth: 1,
                      borderColor: "#E7E7E7",
                    }}
                  >
                    <Text className="text-xs font-SomarMedium text-gray-600">
                      {t("exceptional_reader")}
                    </Text>
                  </View>

                  <View
                    className="bg-gray-100 px-3 py-1.5 rounded-lg"
                    style={{
                      borderWidth: 1,
                      borderColor: "#E7E7E7",
                    }}
                  >
                    <Text className="text-xs font-SomarMedium text-gray-600">
                      {t("professional_reader")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
