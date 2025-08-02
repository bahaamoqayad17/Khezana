import React, { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function UserProfileSkeleton() {
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
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <Animated.View style={[styles.headerButton, { opacity }]} />
        <Animated.View style={[styles.headerButton, { opacity }]} />
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="bg-white pt-8 pb-6">
          {/* Avatar */}
          <View className="items-center mb-4">
            <Animated.View style={[styles.avatar, { opacity }]} />
          </View>

          {/* Name and Streak */}
          <View className="items-center mb-6">
            <Animated.View style={[styles.nameStreak, { opacity }]} />
          </View>

          {/* Stats */}
          <View className="flex-row justify-center mb-8">
            <View className="items-center mx-8">
              <Animated.View style={[styles.statNumber, { opacity }]} />
              <Animated.View style={[styles.statLabel, { opacity }]} />
            </View>
            <View className="items-center mx-8">
              <Animated.View style={[styles.statNumber, { opacity }]} />
              <Animated.View style={[styles.statLabel, { opacity }]} />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-center space-x-6 px-8">
            <View className="items-center">
              <Animated.View style={[styles.actionButton, { opacity }]} />
              <Animated.View style={[styles.actionLabel, { opacity }]} />
            </View>
            <View className="items-center">
              <Animated.View style={[styles.actionButton, { opacity }]} />
              <Animated.View style={[styles.actionLabel, { opacity }]} />
            </View>
            <View className="items-center">
              <Animated.View style={[styles.actionButton, { opacity }]} />
              <Animated.View style={[styles.actionLabel, { opacity }]} />
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4 py-4 space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} className="bg-white rounded-2xl p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Animated.View style={[styles.menuTitle, { opacity }]} />
                  <Animated.View style={[styles.menuSubtitle, { opacity }]} />
                </View>
                <Animated.View style={[styles.editIcon, { opacity }]} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#E0E0E0",
  },
  nameStreak: {
    width: 150,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  statNumber: {
    width: 40,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 4,
  },
  statLabel: {
    width: 60,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E0E0E0",
    marginBottom: 8,
  },
  actionLabel: {
    width: 50,
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  menuTitle: {
    width: "60%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 4,
  },
  menuSubtitle: {
    width: "80%",
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  editIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});
