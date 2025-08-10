import PublisherPageSkeleton from "@/components/skeletons/PublisherPageSkeleton";
import FollowIcon from "@/icons/Follow";
import ShareIcon from "@/icons/Share";
import { fetchUser } from "@/store/UserSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserDetails() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"brief" | "contact">("brief");

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id, dispatch]);

  if (loading) {
    return <PublisherPageSkeleton />;
  }

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
    <SafeAreaView className="flex-1 bg-white pb-10">
      {/* Header */}
      <View className="flex-row items-center justify-between gap-2 px-5 pt-20 pb-10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={26} color="#65382C" />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-SomarBold text-primary text-center">
            {t("user")}
          </Text>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity onPress={() => {}}>
            <ShareIcon />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Publisher Profile Section */}
        <View className="px-4">
          <View className="items-center">
            {/* Publisher Image */}
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${user.profile_image}`,
              }}
              className="rounded-full shadow-lg"
              style={{ width: 120, height: 120 }}
              resizeMode="cover"
            />

            {/* Publisher Name */}
            <Text className="text-xl font-SomarBold text-primary mt-4 text-center">
              {user.name}
            </Text>

            {/* Publisher Stats */}
            <View className="flex-row justify-center items-center mt-4">
              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  عدد الكتب
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="vertical-line" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  عدد القراءات
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="vertical-line" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  متابعين
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="vertical-line" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  المتابعة
                </Text>
              </View>
            </View>

            {/* Follow Button */}
            <TouchableOpacity
              className="py-3 rounded-lg mt-4 flex-row items-center justify-center gap-2"
              style={{ backgroundColor: "#D4A574", width: "75%" }}
            >
              <Text className="text-white font-SomarRegular">متابعة</Text>
              <FollowIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="px-4 mb-4 mt-4">
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
                <View className="active-tab-underline" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("contact")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "contact" ? "text-primary" : "text-secondary"
                }`}
              >
                {t("contact_us")}
              </Text>
              {activeTab === "contact" && (
                <View className="active-tab-underline" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        {activeTab === "brief" ? (
          <View className="mx-4">
            {/* User Achievements Section */}
            <View
              className="bg-white rounded-xl p-4 mb-4"
              style={{
                borderWidth: 1,
                borderColor: "#E7E7E7",
              }}
            >
              <Text className="text-lg font-SomarBold text-gray-800 mb-4">
                {t("user_achievements")}
              </Text>

              {/* Achievement Items */}
              <View className="space-y-4">
                {/* Reading Level */}
                <View>
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-SomarMedium text-gray-700">
                      {t("reading_level")}
                    </Text>
                    <Text className="text-sm font-SomarBold text-primary">
                      65
                    </Text>
                  </View>
                  <View className="h-2 bg-gray-200 rounded-full">
                    <View
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: "65%" }}
                    />
                  </View>
                </View>

                {/* Comprehension Level */}
                <View>
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-SomarMedium text-gray-700">
                      {t("comprehension_level")}
                    </Text>
                    <Text className="text-sm font-SomarBold text-primary">
                      50
                    </Text>
                  </View>
                  <View className="h-2 bg-gray-200 rounded-full">
                    <View
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: "50%" }}
                    />
                  </View>
                </View>

                {/* Speed Level */}
                <View>
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-SomarMedium text-gray-700">
                      {t("speed_level")}
                    </Text>
                    <Text className="text-sm font-SomarBold text-primary">
                      40
                    </Text>
                  </View>
                  <View className="h-2 bg-gray-200 rounded-full">
                    <View
                      className="h-2 bg-purple-500 rounded-full"
                      style={{ width: "40%" }}
                    />
                  </View>
                </View>

                {/* Focus Level */}
                <View>
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-SomarMedium text-gray-700">
                      {t("focus_level")}
                    </Text>
                    <Text className="text-sm font-SomarBold text-primary">
                      12
                    </Text>
                  </View>
                  <View className="h-2 bg-gray-200 rounded-full">
                    <View
                      className="h-2 bg-red-500 rounded-full"
                      style={{ width: "12%" }}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Timeline Section */}
            <View className="space-y-4">
              <Text className="text-lg font-SomarBold text-gray-800 mb-3">
                {t("timeline")}
              </Text>

              {/* Timeline Item 1 */}
              <View className="bg-white rounded-xl p-4 border border-gray-200">
                <View className="flex-row items-start">
                  <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mr-3">
                    <Text className="text-white font-SomarBold text-lg">ا</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <Text className="text-base font-SomarBold text-gray-800 ml-2">
                        {t("abtasam")}
                      </Text>
                      <View className="bg-orange-500 rounded px-2 py-1">
                        <Text className="text-white text-xs font-SomarBold">
                          {t("expert")}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-sm font-SomarMedium text-gray-600 mb-3 leading-5">
                      {t("reading_improvement_post")}
                    </Text>
                    <Text className="text-xs font-SomarMedium text-gray-500 mb-3">
                      {t("date_time_1")}
                    </Text>

                    {/* Star Rating */}
                    <View className="flex-row items-center mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Text
                          key={star}
                          className="text-yellow-400 text-lg mr-1"
                        >
                          ⭐
                        </Text>
                      ))}
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row items-center">
                      <TouchableOpacity className="flex-row items-center mr-4">
                        <Ionicons name="heart-outline" size={16} color="#666" />
                        <Text className="text-gray-600 text-sm font-SomarMedium ml-1">
                          0
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center mr-4">
                        <Ionicons
                          name="chatbubble-outline"
                          size={16}
                          color="#666"
                        />
                        <Text className="text-gray-600 text-sm font-SomarMedium ml-1">
                          0
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center">
                        <Ionicons name="share-outline" size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* Timeline Item 2 */}
              <View className="bg-white rounded-xl p-4 border border-gray-200">
                <View className="flex-row items-start">
                  <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center mr-3">
                    <Text className="text-white font-SomarBold text-lg">م</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <Text className="text-base font-SomarBold text-gray-800 ml-2">
                        {t("mahmoud")}
                      </Text>
                      <View className="bg-orange-500 rounded px-2 py-1">
                        <Text className="text-white text-xs font-SomarBold">
                          {t("expert")}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-sm font-SomarMedium text-gray-600 mb-3 leading-5">
                      {t("reading_improvement_post")}
                    </Text>
                    <Text className="text-xs font-SomarMedium text-gray-500 mb-3">
                      {t("date_time_2")}
                    </Text>

                    {/* Action Buttons */}
                    <View className="flex-row items-center">
                      <TouchableOpacity className="flex-row items-center mr-4">
                        <Ionicons name="heart-outline" size={16} color="#666" />
                        <Text className="text-gray-600 text-sm font-SomarMedium ml-1">
                          0
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center mr-4">
                        <Ionicons
                          name="chatbubble-outline"
                          size={16}
                          color="#666"
                        />
                        <Text className="text-gray-600 text-sm font-SomarMedium ml-1">
                          0
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center">
                        <Ionicons name="share-outline" size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View className="mx-4">
            {/* Contact Tab Content */}
            <View
              className="bg-white rounded-xl p-6 mb-4 mt-4"
              style={{
                borderWidth: 1,
                borderColor: "#E7E7E7",
              }}
            >
              <Text className="text-lg font-SomarBold text-gray-800 mb-3">
                {t("contact_info")}
              </Text>
              <Text className="text-gray-600 font-SomarMedium leading-6">
                {t("contact_user_desc")}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
