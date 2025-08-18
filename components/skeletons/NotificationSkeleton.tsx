import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const NotificationSkeletonItem = ({ opacity }: { opacity: Animated.Value }) => (
  <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
    <View className="flex-row items-center justify-between">
      {/* Left side - User avatar skeleton */}
      <Animated.View style={[styles.avatarSkeleton, { opacity }]} />

      {/* Middle - Content skeleton */}
      <View className="flex-1 mx-4">
        <Animated.View style={[styles.titleSkeleton, { opacity }]} />
        <Animated.View style={[styles.contentSkeleton, { opacity }]} />
        <Animated.View style={[styles.descriptionSkeleton, { opacity }]} />
      </View>

      {/* Right side - Time and status skeleton */}
      <View className="items-end">
        <Animated.View style={[styles.timeSkeleton, { opacity }]} />
        <Animated.View style={[styles.statusSkeleton, { opacity }]} />
      </View>
    </View>
  </View>
);

export default function NotificationSkeleton() {
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
  }, [opacity]);

  return (
    <View className="px-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <NotificationSkeletonItem key={index} opacity={opacity} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSkeleton: {
    width: 48,
    height: 48,
    backgroundColor: "#E0E0E0",
    borderRadius: 24,
  },
  titleSkeleton: {
    width: 140,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
  },
  contentSkeleton: {
    width: 200,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
  },
  descriptionSkeleton: {
    width: 160,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  timeSkeleton: {
    width: 60,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
  },
  statusSkeleton: {
    width: 40,
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});
