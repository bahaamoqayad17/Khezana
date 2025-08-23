import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
import ActiveIcon from "@/icons/Active";
import CrownIcon from "@/icons/Crown";
import NotActiveIcon from "@/icons/NotActive";
import { fetchSubscriptions } from "@/store/SubscriptionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Subscriptions() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { subscriptions, loading, error } = useAppSelector(
    (state) => state.subscriptions
  );
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (subscriptions.length === 0) {
      dispatch(fetchSubscriptions());
    }
  }, [subscriptions.length, dispatch]);

  const handleSubscriptionPress = (subscriptionId: number) => {
    console.log("Subscription pressed:", subscriptionId);
    // Toggle expansion - if already expanded, collapse it; otherwise expand this one
    if (expandedSubscriptionId === subscriptionId) {
      setExpandedSubscriptionId(null);
    } else {
      setExpandedSubscriptionId(subscriptionId);
    }
  };

  const handleSubscribePress = () => {
    console.log("Subscribe button pressed");
    // TODO: Navigate to subscription flow
  };

  console.log(subscriptions);

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
              {subscriptions.map((subscription, index) => {
                const isExpanded = expandedSubscriptionId === subscription.id;
                return (
                  <TouchableOpacity
                    key={subscription.id}
                    onPress={() => handleSubscriptionPress(subscription.id)}
                    className="relative bg-white border border-secondary rounded-2xl shadow-sm mb-6"
                    style={{ padding: 20, backgroundColor: "#FBF7F1" }}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={require("@/assets/star.png")}
                      className="absolute"
                      style={{ top: -5, right: -5 }}
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

                    {/* Features Section */}
                    {isExpanded && (
                      <View className="mt-4 pt-4">
                        {subscription.features &&
                        subscription.features.length > 0 ? (
                          <View className="gap-2">
                            {subscription.features.map(
                              (feature, featureIndex) => (
                                <View
                                  key={feature.id}
                                  className="flex-row items-center gap-2"
                                >
                                  {feature.is_active ? (
                                    <ActiveIcon />
                                  ) : (
                                    <NotActiveIcon />
                                  )}
                                  <Text className="text-base font-SomarRegular text-gray-700 flex-1">
                                    {feature.text}
                                  </Text>
                                </View>
                              )
                            )}
                          </View>
                        ) : (
                          <Text className="text-base font-SomarRegular text-gray-500 italic">
                            {t("no_features_available") ||
                              "No features available"}
                          </Text>
                        )}
                      </View>
                    )}

                    {/* User subscription status */}
                    {subscription.is_user_subscribed && (
                      <View className="absolute top-4 right-4">
                        <View className="bg-green-500 rounded-full p-1">
                          <Ionicons name="checkmark" size={12} color="white" />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
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
