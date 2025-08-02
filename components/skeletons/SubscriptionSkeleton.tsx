import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const SubscriptionSkeletonItem = ({ opacity }: { opacity: Animated.Value }) => (
  <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
    <View className="flex-row items-center justify-between">
      {/* Left side - Plan info skeleton */}
      <View className="flex-1 ml-4">
        <Animated.View style={[styles.planTitleSkeleton, { opacity }]} />
        <Animated.View style={[styles.planDescSkeleton, { opacity }]} />
      </View>

      {/* Right side - Crown and badge skeleton */}
      <View className="items-center">
        <Animated.View style={[styles.crownSkeleton, { opacity }]} />
        <Animated.View style={[styles.badgeSkeleton, { opacity }]} />
      </View>
    </View>
  </View>
);

const SubscriptionSkeleton = () => {
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
    <View className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <SubscriptionSkeletonItem key={index} opacity={opacity} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  planTitleSkeleton: {
    width: 96,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  planDescSkeleton: {
    width: 128,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  crownSkeleton: {
    width: 64,
    height: 64,
    backgroundColor: "#E0E0E0",
    borderRadius: 32,
    marginBottom: 8,
  },
  badgeSkeleton: {
    width: 80,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },
});

export default SubscriptionSkeleton;
