import React from "react";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 3; // 3 columns with padding

const SkeletonItem = () => (
  <View
    className="bg-white border border-gray-200 rounded-2xl p-4 mb-4"
    style={{ width: cardWidth }}
  >
    <View className="items-center">
      {/* Image Skeleton */}
      <View
        className="w-16 h-16 mb-3 rounded-2xl bg-gray-200"
        style={{
          backgroundColor: "#E5E5E5",
          opacity: 1,
        }}
      />

      {/* Text Skeleton - Category Name */}
      <View className="w-full items-center space-y-2">
        <View
          className="h-4 rounded"
          style={{
            width: "75%",
            backgroundColor: "#E5E5E5",
          }}
        />
        <View
          className="h-3 rounded"
          style={{
            width: "50%",
            backgroundColor: "#F0F0F0",
          }}
        />
      </View>
    </View>
  </View>
);

const CategorySkeleton = () => {
  return (
    <View className="flex-row flex-wrap justify-between">
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
};

export default CategorySkeleton;
