import React from "react";
import { View } from "react-native";

export default function PostSkeleton() {
  return (
    <View className="bg-white mx-4 my-2 p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Header skeleton */}
      <View className="flex-row items-center mb-3">
        {/* Avatar skeleton */}
        <View className="w-10 h-10 rounded-full bg-gray-200 mr-3" />

        <View className="flex-1">
          {/* User name skeleton */}
          <View className="h-4 bg-gray-200 rounded w-24 mb-1" />
          {/* Timestamp skeleton */}
          <View className="h-3 bg-gray-200 rounded w-16" />
        </View>

        {/* Menu dots skeleton */}
        <View className="w-6 h-6 bg-gray-200 rounded" />
      </View>

      {/* Post content skeleton */}
      <View className="mb-4">
        {/* Title skeleton */}
        <View className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

        {/* Body skeleton - multiple lines */}
        <View className="h-3 bg-gray-200 rounded w-full mb-1" />
        <View className="h-3 bg-gray-200 rounded w-5/6 mb-1" />
        <View className="h-3 bg-gray-200 rounded w-4/5" />
      </View>

      {/* Interaction buttons skeleton */}
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
        <View className="flex-row items-center">
          <View className="w-6 h-6 bg-gray-200 rounded mr-1" />
          <View className="w-4 h-3 bg-gray-200 rounded" />
        </View>

        <View className="flex-row items-center">
          <View className="w-6 h-6 bg-gray-200 rounded mr-1" />
          <View className="w-4 h-3 bg-gray-200 rounded" />
        </View>

        <View className="flex-row items-center">
          <View className="w-6 h-6 bg-gray-200 rounded mr-1" />
          <View className="w-4 h-3 bg-gray-200 rounded" />
        </View>

        <View className="w-6 h-6 bg-gray-200 rounded" />
      </View>
    </View>
  );
}
