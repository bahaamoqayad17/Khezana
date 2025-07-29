import React from "react";
import { View } from "react-native";

const SubscriptionSkeletonItem = () => (
  <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
    <View className="flex-row items-center justify-between">
      {/* Left side - Plan info skeleton */}
      <View className="flex-1 ml-4">
        <View className="w-24 h-5 bg-gray-200 rounded mb-2" />
        <View className="w-32 h-4 bg-gray-200 rounded" />
      </View>

      {/* Right side - Crown and badge skeleton */}
      <View className="items-center">
        <View className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
        <View className="w-20 h-6 bg-gray-200 rounded-full" />
      </View>
    </View>
  </View>
);

const SubscriptionSkeleton = () => {
  return (
    <View className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <SubscriptionSkeletonItem key={index} />
      ))}
    </View>
  );
};

export default SubscriptionSkeleton;
