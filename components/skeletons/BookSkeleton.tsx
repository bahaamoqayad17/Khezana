import { usePathname } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const BookSkeletonItem = ({ opacity }: { opacity: Animated.Value }) => {
  const pathname = usePathname();

  return (
    <View
      className="rounded-xl p-4 flex-row gap-2 mb-4"
      style={{
        borderWidth: 1,
        borderColor: "#F5ECDF",
      }}
    >
      {/* Book Cover Skeleton */}
      <Animated.View style={[styles.bookCoverSkeleton, { opacity }]} />

      {/* Book Information Skeleton */}
      <View className="flex-1 justify-between">
        {/* Book Title Skeleton */}
        <Animated.View style={[styles.bookTitleSkeleton, { opacity }]} />

        {/* Author Skeleton */}
        <Animated.View style={[styles.authorSkeleton, { opacity }]} />

        {/* Book Stats Skeleton */}
        <View className="flex-row gap-2 items-center">
          {/* Minutes Skeleton */}
          <View className="flex-row items-center gap-1">
            <Animated.View style={[styles.iconSkeleton, { opacity }]} />
            <Animated.View style={[styles.statTextSkeleton, { opacity }]} />
          </View>
          {/* Pages Skeleton */}
          <View className="flex-row items-center gap-1">
            <Animated.View style={[styles.iconSkeleton, { opacity }]} />
            <Animated.View style={[styles.statTextSkeleton, { opacity }]} />
          </View>
        </View>

        {/* Price Skeleton */}
        <View className="flex-row items-center justify-between">
          <Animated.View style={[styles.priceSkeleton, { opacity }]} />
        </View>
      </View>

      {/* Cart Icons Skeleton - show when on cart page */}
      {pathname === "/cart" && (
        <View className="items-center justify-between">
          <Animated.View style={[styles.cartIconSkeleton, { opacity }]} />
          <Animated.View style={[styles.cartIconSkeleton, { opacity }]} />
        </View>
      )}
    </View>
  );
};

const BookSkeleton = ({ count = 5 }: { count?: number }) => {
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
    <View>
      {Array.from({ length: count }).map((_, index) => (
        <BookSkeletonItem key={index} opacity={opacity} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bookCoverSkeleton: {
    width: 80,
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  bookTitleSkeleton: {
    width: 180,
    height: 18,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  authorSkeleton: {
    width: 120,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 12,
  },
  iconSkeleton: {
    width: 16,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  statTextSkeleton: {
    width: 50,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  priceSkeleton: {
    width: 80,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  cartIconSkeleton: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    marginVertical: 8,
  },
});

export default BookSkeleton;
