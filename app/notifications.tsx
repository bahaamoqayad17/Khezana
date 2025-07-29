import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import PlainTitle from "@/components/PlainTitle";
import NotificationSkeleton from "@/components/skeletons/NotificationSkeleton";
import { fetchNotifications, markAsRead } from "@/store/NotificationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Notifications() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { notifications, loading, error } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    if (notifications.length === 0) {
      dispatch(fetchNotifications());
    }
  }, [notifications.length, dispatch]);

  const handleNotificationPress = (notificationId: number) => {
    dispatch(markAsRead(notificationId));
    // TODO: Navigate to notification details or related screen
  };

  const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return t("now");
    if (diffInMinutes < 60) return t("minutes_ago");
    if (diffInMinutes < 1440) return t("hours_ago");
    return t("days_ago");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <PlainTitle title={t("notifications")} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {loading ? (
            <NotificationSkeleton />
          ) : error ? (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-red-500 font-SomarRegular text-center">
                حدث خطأ في تحميل الاشعارات
              </Text>
            </View>
          ) : (
            <View className="space-y-4">
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => handleNotificationPress(notification.id)}
                  className={`relative rounded-2xl p-4 border ${
                    notification.is_read
                      ? "bg-white border-gray-200"
                      : "bg-gray-100 border-gray-300"
                  }`}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center">
                    {/* User Avatar */}
                    <View className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      {notification.user_avatar ? (
                        <Image
                          source={{
                            uri: `${process.env.EXPO_PUBLIC_API_URL}${notification.user_avatar}`,
                          }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      ) : (
                        <View className="w-full h-full bg-gray-300 rounded-full items-center justify-center">
                          <Text className="text-white font-SomarBold text-lg">
                            {notification.user_name?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Content */}
                    <View className="flex-1">
                      <Text className="font-SomarBold text-black text-base mb-1">
                        {notification.user_name}
                      </Text>
                      <Text className="font-SomarRegular text-gray-600 text-sm leading-5">
                        {notification.message}
                      </Text>
                    </View>

                    {/* Time */}
                    <View className="ml-3">
                      <Text className="font-SomarRegular text-gray-400 text-xs">
                        {getTimeAgo(notification.created_at)}
                      </Text>
                    </View>
                  </View>

                  {/* Unread indicator */}
                  {!notification.is_read && (
                    <View className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
