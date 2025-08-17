import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function BookCardSkeleton() {
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
    <View
      className="bg-white rounded-xl shadow-md overflow-hidden p-4 mt-10"
      style={{ width: 185 }}
    >
      {/* Book Image Skeleton */}
      <Animated.View style={[styles.bookImage, { opacity }]} />

      {/* Book Info Skeleton */}
      <View className="mt-4">
        {/* Title Lines */}
        <Animated.View style={[styles.bookTitleLine1, { opacity }]} />
        <Animated.View style={[styles.bookTitleLine2, { opacity }]} />

        {/* Price and Cart Section */}
        <View className="flex-row justify-between items-center mt-4">
          <Animated.View style={[styles.bookPrice, { opacity }]} />
          <Animated.View style={[styles.cartIcon, { opacity }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
  },
  bookTitleLine1: {
    width: "80%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 4,
  },
  bookTitleLine2: {
    width: "60%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 16,
  },
  bookPrice: {
    width: 60,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  cartIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },
});
