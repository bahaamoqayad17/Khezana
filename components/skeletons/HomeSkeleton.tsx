import React, { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function HomeSkeleton() {
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
    <SafeAreaView className="flex-1 pb-10">
      {/* Header Skeleton */}
      <View className="px-5 py-4 flex-row justify-between items-center">
        <Animated.View style={[styles.headerTitle, { opacity }]} />
        <View className="flex-row gap-2">
          <Animated.View style={[styles.headerIcon, { opacity }]} />
          <Animated.View style={[styles.headerIcon, { opacity }]} />
        </View>
      </View>

      <ScrollView className="flex-1" style={{ marginHorizontal: 20 }}>
        {/* Slider Skeleton */}
        <View className="mt-4">
          <Animated.View style={[styles.slider, { opacity }]} />
        </View>

        <View className="mt-4">
          {/* Categories Skeleton */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-2"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <Animated.View
                key={item}
                style={[styles.categoryButton, { opacity }]}
              />
            ))}
          </ScrollView>

          {/* Book Sections Skeleton */}
          {[1, 2, 3].map((section) => (
            <View key={section}>
              {/* Section Header Skeleton */}
              <View className="flex-row justify-between items-center mt-10">
                <Animated.View style={[styles.sectionTitle, { opacity }]} />
                <View className="flex-row items-center gap-2">
                  <Animated.View style={[styles.viewAllText, { opacity }]} />
                  <Animated.View style={[styles.viewAllIcon, { opacity }]} />
                </View>
              </View>

              {/* Books Row Skeleton */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4"
                contentContainerStyle={{ gap: 16 }}
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <View
                    key={item}
                    className="bg-white rounded-xl shadow-md overflow-hidden p-4 mt-10"
                    style={{ width: 185 }}
                  >
                    {/* Book Image Skeleton */}
                    <Animated.View style={[styles.bookImage, { opacity }]} />

                    {/* Book Info Skeleton */}
                    <View className="mt-4">
                      {/* Title Lines */}
                      <Animated.View
                        style={[styles.bookTitleLine1, { opacity }]}
                      />
                      <Animated.View
                        style={[styles.bookTitleLine2, { opacity }]}
                      />

                      {/* Price and Cart Section */}
                      <View className="flex-row justify-between items-center mt-4">
                        <Animated.View
                          style={[styles.bookPrice, { opacity }]}
                        />
                        <Animated.View style={[styles.cartIcon, { opacity }]} />
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Header
  headerTitle: {
    width: 120,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
  },

  // Slider
  slider: {
    width: "100%",
    height: 180,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },

  // Categories
  categoryButton: {
    width: 100,
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    marginRight: 12,
  },

  // Section Headers
  sectionTitle: {
    width: 150,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  viewAllText: {
    width: 80,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  viewAllIcon: {
    width: 16,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },

  // Book Cards
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
