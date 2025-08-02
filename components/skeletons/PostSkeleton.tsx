import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function PostSkeleton() {
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
    <View className="bg-white mx-4 my-2 p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Header skeleton */}
      <View className="flex-row items-center mb-3">
        {/* Avatar skeleton */}
        <Animated.View style={[styles.avatarSkeleton, { opacity }]} />

        <View className="flex-1">
          {/* User name skeleton */}
          <Animated.View style={[styles.userNameSkeleton, { opacity }]} />
          {/* Timestamp skeleton */}
          <Animated.View style={[styles.timestampSkeleton, { opacity }]} />
        </View>

        {/* Menu dots skeleton */}
        <Animated.View style={[styles.menuSkeleton, { opacity }]} />
      </View>

      {/* Post content skeleton */}
      <View className="mb-4">
        {/* Title skeleton */}
        <Animated.View style={[styles.titleSkeleton, { opacity }]} />

        {/* Body skeleton - multiple lines */}
        <Animated.View style={[styles.bodyLine1Skeleton, { opacity }]} />
        <Animated.View style={[styles.bodyLine2Skeleton, { opacity }]} />
        <Animated.View style={[styles.bodyLine3Skeleton, { opacity }]} />
      </View>

      {/* Interaction buttons skeleton */}
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
        <View className="flex-row items-center">
          <Animated.View style={[styles.buttonIconSkeleton, { opacity }]} />
          <Animated.View style={[styles.buttonTextSkeleton, { opacity }]} />
        </View>

        <View className="flex-row items-center">
          <Animated.View style={[styles.buttonIconSkeleton, { opacity }]} />
          <Animated.View style={[styles.buttonTextSkeleton, { opacity }]} />
        </View>

        <View className="flex-row items-center">
          <Animated.View style={[styles.buttonIconSkeleton, { opacity }]} />
          <Animated.View style={[styles.buttonTextSkeleton, { opacity }]} />
        </View>

        <Animated.View style={[styles.buttonIconSkeleton, { opacity }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginRight: 12,
  },
  userNameSkeleton: {
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: 96,
    marginBottom: 4,
  },
  timestampSkeleton: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: 64,
  },
  menuSkeleton: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  titleSkeleton: {
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "75%",
    marginBottom: 8,
  },
  bodyLine1Skeleton: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "100%",
    marginBottom: 4,
  },
  bodyLine2Skeleton: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "83%",
    marginBottom: 4,
  },
  bodyLine3Skeleton: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "80%",
  },
  buttonIconSkeleton: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginRight: 4,
  },
  buttonTextSkeleton: {
    width: 16,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});
