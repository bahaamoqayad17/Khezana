import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 3; // 3 columns with padding

const SkeletonItem = ({ opacity }: { opacity: Animated.Value }) => (
  <View
    className="bg-white border border-gray-200 rounded-2xl p-4 mb-4"
    style={{ width: cardWidth }}
  >
    <View className="items-center">
      {/* Image Skeleton */}
      <Animated.View style={[styles.imageSkeleton, { opacity }]} />

      {/* Text Skeleton - Category Name */}
      <View className="w-full items-center space-y-2">
        <Animated.View
          style={[styles.titleSkeleton, { opacity, width: "75%" }]}
        />
        <Animated.View
          style={[styles.subtitleSkeleton, { opacity, width: "50%" }]}
        />
      </View>
    </View>
  </View>
);

const CategorySkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View className="flex-row flex-wrap justify-between">
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonItem key={index} opacity={opacity} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imageSkeleton: {
    width: 64,
    height: 64,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
  },
  titleSkeleton: {
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  subtitleSkeleton: {
    height: 12,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
});

export default CategorySkeleton;
