import FollowIcon from "@/icons/Follow";
import TrophyIcon from "@/icons/Trophy";
import { User } from "@/store/models.type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PostQuote from "../PostQuote";
export default function PublicUserProfile({ user }: { user: User }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"user_information" | "brief">(
    "user_information"
  );

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-lg font-SomarBold text-gray-600">
          {t("user_not_found")}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pb-10">
      {/* Header */}
      <View className="flex-row items-center justify-between gap-2 px-5 pt-20 pb-10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={26} color="#65382C" />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-SomarBold text-primary text-center">
            {t("profile")}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* User Profile Section */}
        <View className="px-4">
          <View className="items-center">
            {/* User Image */}
            <Image
              source={{
                uri: user?.profile_image
                  ? `${process.env.EXPO_PUBLIC_API_URL}storage/${user.profile_image}`
                  : "https://via.placeholder.com/120x120/E0E0E0/999999?text=User",
              }}
              className="rounded-full shadow-lg"
              style={{ width: 120, height: 120 }}
              resizeMode="cover"
            />

            {/* User Name */}
            <View className="items-center gap-2">
              <Text className="text-3xl font-SomarBold text-black">
                {user.name}
              </Text>

              <TrophyIcon />

              <Text className="text-lg font-SomarRegular text-gray">
                {t("professional_reader")}
              </Text>
              {/* <SmallFireIcon />
                <Text className="text-md font-SomarRegular text-gray">
                  {0}&nbsp;{t("consecutive_days")}
                </Text> */}
            </View>

            {/* User Stats */}
            <View
              className="flex-row justify-center items-center mt-2 bg-white rounded-xl p-4 mx-4"
              style={{ width: "100%" }}
            >
              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  {t("books_count")}
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="w-px h-8 bg-gray-300 mx-2" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  {t("readings_count")}
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="w-px h-8 bg-gray-300 mx-2" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  {t("followers")}
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="w-px h-8 bg-gray-300 mx-2" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  {t("following")}
                </Text>
              </View>
            </View>

            {/* Follow Button */}
            <TouchableOpacity
              className="py-3 rounded-lg mt-6 flex-row items-center justify-center gap-2"
              style={{ backgroundColor: "#D4A574", width: "75%" }}
            >
              <Text className="text-white font-SomarRegular">
                {t("follow")}
              </Text>
              <FollowIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="px-4 mb-4 mt-8">
          <View className="flex-row justify-center">
            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("brief")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "brief" ? "text-primary" : "text-secondary"
                }`}
              >
                {t("brief")}
              </Text>
              {activeTab === "brief" && (
                <View className="absolute bottom-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("user_information")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "user_information"
                    ? "text-primary"
                    : "text-secondary"
                }`}
              >
                {t("user_information")}
              </Text>
              {activeTab === "user_information" && (
                <View className="absolute bottom-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        <View className="mx-4">
          {activeTab === "user_information" ? (
            <View className="space-y-4">
              {/* User Information Card */}
              <View
                className="bg-white rounded-xl p-4 mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                {/* Join Date */}
                <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-gray-100">
                  <Text className="text-sm font-SomarMedium text-gray-600">
                    {t("join_date")}
                  </Text>
                  <Text className="text-sm font-SomarBold text-gray-800">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("ar-SA")
                      : "2023-01-15"}
                  </Text>
                </View>

                {/* User Operations */}
                <Text className="text-xl font-SomarBold text-gray-800 mb-4">
                  {t("user_stats")}
                </Text>

                {/* Operations List */}
                <View className="space-y-4">
                  <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm font-SomarMedium text-gray-600">
                        {t("books_read_count")}
                      </Text>
                      <Text className="text-sm font-SomarBold text-gray-800">
                        65
                      </Text>
                    </View>
                    <View className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "65%" }}
                      />
                    </View>
                  </View>

                  <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm font-SomarMedium text-gray-600">
                        {t("user_level")}
                      </Text>
                      <Text className="text-sm font-SomarBold text-gray-800">
                        50
                      </Text>
                    </View>
                    <View className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "50%" }}
                      />
                    </View>
                  </View>

                  <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm font-SomarMedium text-gray-600">
                        {t("number_bought_books")}
                      </Text>
                      <Text className="text-sm font-SomarBold text-gray-800">
                        30
                      </Text>
                    </View>
                    <View className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "30%" }}
                      />
                    </View>
                  </View>

                  <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm font-SomarMedium text-gray-600">
                        {t("gifted_books")}
                      </Text>
                      <Text className="text-sm font-SomarBold text-gray-800">
                        12
                      </Text>
                    </View>
                    <View className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: "12%" }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* User Reviews Section */}
              <View className="space-y-4">
                <PostQuote />
              </View>
            </View>
          ) : (
            <View className="space-y-4">
              {/* Biography Content */}
              <View
                className="bg-white rounded-xl p-4 mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <Text className="text-lg font-SomarBold text-gray-800 mb-4">
                  {t("brief")}
                </Text>
                <Text className="text-gray-700 font-SomarMedium leading-6">
                  {user?.bio}
                </Text>
              </View>

              {/* Interests Section */}
              <View
                className="bg-white rounded-xl p-4 mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-lg font-SomarBold text-gray-800">
                    {t("my_interests")}
                  </Text>
                </View>

                {/* Interest Tags */}
                <View className="flex-row flex-wrap gap-2">
                  {user?.interests ? (
                    Object.entries(user.interests).map(
                      ([key, interest], index) => {
                        // Define colors array for cycling through different colors
                        const colors = [
                          "#EF4444", // Red
                          "#F97316", // Orange
                          "#10B981", // Green
                          "#6366F1", // Purple
                          "#06B6D4", // Cyan
                          "#8B5CF6", // Violet
                          "#EC4899", // Pink
                        ];

                        return (
                          <TouchableOpacity
                            key={key}
                            className="px-4 py-2 rounded-full"
                            style={{
                              backgroundColor: colors[index % colors.length],
                            }}
                          >
                            <Text className="text-white font-SomarMedium text-sm">
                              {String(interest)}
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    )
                  ) : (
                    // Fallback interests if no user interests available
                    <>
                      <TouchableOpacity
                        className="px-4 py-2 rounded-full"
                        style={{ backgroundColor: "#EF4444" }}
                      >
                        <Text className="text-white font-SomarMedium text-sm">
                          الكتب التعليمية
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="px-4 py-2 rounded-full"
                        style={{ backgroundColor: "#F97316" }}
                      >
                        <Text className="text-white font-SomarMedium text-sm">
                          ديني
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="px-4 py-2 rounded-full"
                        style={{ backgroundColor: "#10B981" }}
                      >
                        <Text className="text-white font-SomarMedium text-sm">
                          صحي
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
