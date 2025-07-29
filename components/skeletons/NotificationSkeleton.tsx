import React from "react";
import { View } from "react-native";

const NotificationSkeletonItem = () => (
  <View className="bg-gray-100 border border-gray-200 rounded-2xl p-4 mb-4">
    <View className="flex-row items-center justify-between">
      {/* Left side - User avatar skeleton */}
      <View className="w-12 h-12 bg-gray-200 rounded-full" />

      {/* Middle - Content skeleton */}
      <View className="flex-1 mx-4">
        <View className="w-32 h-4 bg-gray-200 rounded mb-2" />
        <View className="w-48 h-3 bg-gray-200 rounded" />
      </View>

      {/* Right side - Time skeleton */}
      <View className="w-16 h-3 bg-gray-200 rounded" />
    </View>
  </View>
);

const NotificationSkeleton = () => {
  return (
    <View className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <NotificationSkeletonItem key={index} />
      ))}
    </View>
  );
};

export default NotificationSkeleton;
