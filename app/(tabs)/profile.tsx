import UserProfileSkeleton from "@/components/skeletons/UserProfileSkeleton";
import AchievementsIcon from "@/icons/Achievements";
import EditIcon from "@/icons/Edit";
import QuotesIcon from "@/icons/Quotes";
import ShareIcon from "@/icons/Share";
import TrophyIcon from "@/icons/Trophy";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserProfile } from "@/store/UserSlice";
import { showInfoToast } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const { t } = useTranslation();
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        dispatch(fetchUserProfile(JSON.parse(userData).user_id));
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <UserProfileSkeleton />;
  }

  const signOut = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user");
    showInfoToast({
      title: t("logout_success"),
      duration: 3000,
    });
    setTimeout(() => {
      router.replace("/auth/login");
    }, 1000);
  };

  const menuItems = [
    {
      id: "personal-info",
      title: t("personal_information"),
      subtitle: t("personal_info_subtitle"),
      hasEdit: true,
      onPress: () => router.push("/user/profile"),
    },
    {
      id: "settings",
      title: t("settings"),
      subtitle: t("settings_subtitle"),
      hasEdit: true,
      onPress: () => router.push("/user/settings"),
    },
    {
      id: "book-suggestion",
      title: t("book_suggestion"),
      subtitle: t("book_suggestion_subtitle"),
      hasEdit: true,
      onPress: () => router.push("/contact"),
    },
    {
      id: "subscription",
      title: t("subscription"),
      subtitle: "2024-03-08",
      hasEdit: false,
    },
    {
      id: "support",
      title: t("technical_support"),
      subtitle: "",
      hasEdit: false,
      onPress: () => router.push("/technical-support"),
    },
    {
      id: "terms",
      title: t("terms_of_use"),
      onPress: () => router.push("/terms"),
      subtitle: "",
      hasEdit: false,
    },
    {
      id: "logout",
      title: t("logout"),
      onPress: () => signOut(),
      subtitle: "",
      hasEdit: false,
    },
  ];

  const handleShare = () => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}storage/${user?.user_image_url}`;
    const message = t("share_message") + " " + user?.user_name;
    const title = t("share_title");

    Share.share({
      url,
      message,
      title,
    });
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-10 pb-0 mt-10 self-end">
        <TouchableOpacity onPress={handleShare} className="p-2">
          <ShareIcon />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="pt-8 pb-6">
          {/* Avatar */}
          <View className="items-center mb-4">
            {/* <View className="rounded-full border-4 p-4 border-white shadow-sm overflow-hidden"> */}
            <Image
              source={{
                uri: user?.user_image_url?.startsWith("http")
                  ? user?.user_image_url
                  : `${process.env.EXPO_PUBLIC_API_URL}storage/${user?.user_image_url}`,
              }}
              style={{ width: 96, height: 96, borderRadius: 50 }}
              resizeMode="cover"
              onError={(e) => console.log("image error:", e.nativeEvent.error)}
            />
            {/* </View> */}
          </View>

          {/* Name and Streak */}
          <View className="items-center mb-6">
            <View className="flex-row items-center mb-2">
              <Text className="text-3xl font-SomarBold text-black">
                {user?.user_name}
              </Text>
              {/* <SmallFireIcon />
              <Text className="text-md font-SomarRegular text-gray">
                {0}&nbsp;{t("consecutive_days")}
              </Text> */}
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-center mb-8">
            <View className="items-center mx-8">
              <Text className="text-2xl font-bold text-gray-800">{120}</Text>
              <Text className="text-md font-SomarRegular text-gray">
                {t("followers")}
              </Text>
            </View>
            <View className="items-center mx-8">
              <Text className="text-2xl font-bold text-gray-800">{120}</Text>
              <Text className="text-md font-SomarRegular text-gray">
                {t("following")}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-center space-x-6 px-8 gap-2 border-1 border-gray rounded-2xl">
            <TouchableOpacity
              onPress={() => router.push("/user/achievements")}
              // onPress={() => router.push("/user/profits")}
              className="items-center rounded-3xl p-2"
              style={{
                backgroundColor: "#FBF7F1",
                borderColor: "#E7E7E7",
                borderWidth: 1,
              }}
            >
              <View className="w-24 h-24 bg-lightPrimary rounded-4xl items-center justify-center gap-2 mb-2">
                <AchievementsIcon />

                <Text className="text-sm font-SomarRegular text-secondary text-center">
                  {t("my_achievements")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              //   onPress={() => onMenuItemPress?.("notifications")}
              className="items-center rounded-3xl p-2"
              style={{
                backgroundColor: "#FBF7F1",
                borderColor: "#E7E7E7",
                borderWidth: 1,
              }}
            >
              <View className="w-24 h-24 bg-lightPrimary rounded-4xl items-center justify-center gap-2 mb-2">
                <QuotesIcon />

                <Text className="text-sm font-SomarRegular text-secondary text-center">
                  {t("my_quotes")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/leaderboard")}
              className="items-center rounded-3xl p-2"
              style={{
                backgroundColor: "#FBF7F1",
                borderColor: "#E7E7E7",
                borderWidth: 1,
              }}
            >
              <View className="w-24 h-24 bg-lightPrimary rounded-4xl items-center justify-center gap-2 mb-2">
                <TrophyIcon />

                <Text className="text-sm font-SomarRegular text-secondary text-center">
                  {t("leaderboard")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4 py-4 space-y-3">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="rounded-xl p-4 mb-4"
              style={{
                backgroundColor: "#FBF7F1",
                borderColor: "#E7E7E7",
                borderWidth: 1,
              }}
              onPress={item.onPress}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-gray-800 text-xl font-SomarBold mb-1">
                    {item.title}
                  </Text>
                  {item.subtitle ? (
                    <Text className="text-gray text-md font-SomarRegular">
                      {item.subtitle}
                    </Text>
                  ) : null}
                </View>
                {item.hasEdit && (
                  <TouchableOpacity className="p-2 ml-2" onPress={item.onPress}>
                    <EditIcon />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
