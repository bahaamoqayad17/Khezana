import { Ionicons } from "@expo/vector-icons";
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
import SubscriptionSkeleton from "@/components/skeletons/SubscriptionSkeleton";
import CrownIcon from "@/icons/Crown";
import { fetchSubscriptions } from "@/store/SubscriptionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Subscriptions() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { subscriptions, loading, error } = useAppSelector(
    (state) => state.subscriptions
  );

  useEffect(() => {
    if (subscriptions.length === 0) {
      dispatch(fetchSubscriptions());
    }
  }, [subscriptions.length, dispatch]);

  const handleSubscriptionPress = (subscriptionId: number) => {
    console.log("Subscription pressed:", subscriptionId);
    // TODO: Handle subscription selection
  };

  const handleSubscribePress = () => {
    console.log("Subscribe button pressed");
    // TODO: Navigate to subscription flow
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <PlainTitle title={t("subscriptions")} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {loading ? (
            <SubscriptionSkeleton />
          ) : error ? (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-red-500 font-SomarRegular text-center">
                حدث خطأ في تحميل الاشتراكات
              </Text>
            </View>
          ) : (
            <View className="space-y-4">
              {subscriptions.map((subscription, index) => (
                <TouchableOpacity
                  key={subscription.id}
                  onPress={() => handleSubscriptionPress(subscription.id)}
                  className="relative bg-white border border-secondary rounded-2xl shadow-sm mb-6"
                  style={{ padding: 20 }}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require("@/assets/star.png")}
                    className="absolute top-0 right-0"
                  />

                  <View className="flex-row items-center justify-between">
                    <View className="rounded-full bg-secondary p-4">
                      <CrownIcon />
                    </View>
                    {/* Left side - Plan info */}
                    <View className="flex-1 ml-4">
                      <Text className="text-lg font-SomarBold mb-4">
                        {subscription.title}
                      </Text>
                      <View className="flex-row items-center gap-2">
                        <Text className="text-xl font-SomarBlack text-black">
                          {t("premium")}
                        </Text>
                        <View className="border border-secondary rounded-full px-2 py-0.5 flex-row items-center gap-1">
                          <Text className="text-lg font-SomarBold text-secondary">
                            *
                          </Text>
                          <Text className="text-lg font-SomarRegular text-secondary">
                            {t("new")}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Right side - Crown and Premium badge */}
                    <View className="items-center">
                      <Text className="text-xl font-SomarBlack text-secondary">
                        {subscription.price} {t("dzd")}
                      </Text>
                      <Text className="text-lg font-SomarRegular text-gray">
                        {subscription.duration === "1" && t("per_month")}
                        {subscription.duration === "3" &&
                          t("in") + " " + t("3_months")}
                        {subscription.duration === "6" &&
                          t("in") + " " + t("6_months")}
                        {subscription.duration === "12" &&
                          t("in") + " " + t("year")}
                      </Text>
                    </View>
                  </View>

                  {/* User subscription status */}
                  {subscription.is_user_subscribed && (
                    <View className="absolute top-4 right-4">
                      <View className="bg-green-500 rounded-full p-1">
                        <Ionicons name="checkmark" size={12} color="white" />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View className="px-4 pb-6 bg-white">
          <TouchableOpacity
            onPress={handleSubscribePress}
            className="bg-secondary rounded-xl p-4 w-full"
            activeOpacity={0.8}
          >
            <Text className="text-white font-SomarBlack text-center text-lg">
              {t("subscribe_and_start")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
