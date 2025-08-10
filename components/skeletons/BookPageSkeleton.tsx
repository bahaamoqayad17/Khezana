import React, { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function BookPageSkeleton() {
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
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between gap-2 px-5 pt-20 pb-10">
        <Animated.View style={[styles.headerIcon, { opacity }]} />
        <Animated.View style={[styles.headerTitle, { opacity }]} />
        <View className="flex-row gap-2">
          <Animated.View style={[styles.headerIcon, { opacity }]} />
          <Animated.View style={[styles.headerIcon, { opacity }]} />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Book Cover and Info Section */}
        <View className="px-4 py-6">
          <View className="items-center">
            {/* Book Cover */}
            <Animated.View style={[styles.bookCover, { opacity }]} />

            {/* Book Title */}
            <Animated.View style={[styles.bookTitle, { opacity }]} />

            {/* Book Stats */}
            <View className="flex-row justify-between w-full mt-10 px-4">
              <View className="items-center">
                <Animated.View style={[styles.statLabel, { opacity }]} />
                <Animated.View style={[styles.statValue, { opacity }]} />
              </View>
              <View className="items-center">
                <Animated.View style={[styles.statLabel, { opacity }]} />
                <Animated.View style={[styles.statValue, { opacity }]} />
              </View>
              <View className="items-center">
                <Animated.View style={[styles.statLabel, { opacity }]} />
                <Animated.View style={[styles.statValue, { opacity }]} />
              </View>
              <View className="items-center">
                <Animated.View style={[styles.statLabel, { opacity }]} />
                <Animated.View style={[styles.statValue, { opacity }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="px-4 mb-4 mt-4">
          <View className="flex-row justify-center">
            <View className="flex-1 items-center py-3 relative">
              <Animated.View style={[styles.tabText, { opacity }]} />
              <Animated.View style={[styles.tabUnderline, { opacity }]} />
            </View>
            <View className="flex-1 items-center py-3 relative">
              <Animated.View style={[styles.tabText, { opacity }]} />
            </View>
          </View>
        </View>

        {/* Tab Content */}
        <View className="mx-4">
          {/* Overall Rating Section */}
          <View className="rounded-xl p-4 mb-4 flex-row items-center justify-between gap-2">
            <Animated.View style={[styles.reviewsLabel, { opacity }]} />
            <View className="items-center">
              <Animated.View style={[styles.ratingNumber, { opacity }]} />
              <Animated.View style={[styles.ratingBadge, { opacity }]} />
            </View>
          </View>

          {/* Add Comment Section */}
          <View className="bg-white rounded-xl p-4 mb-4 flex-row gap-2">
            <View className="items-center justify-center gap-2">
              <Animated.View style={[styles.userAvatar, { opacity }]} />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-3">
                <Animated.View style={[styles.userName, { opacity }]} />
                <View className="flex-row">
                  {[...Array(5)].map((_, i) => (
                    <Animated.View
                      key={i}
                      style={[styles.starIcon, { opacity }]}
                    />
                  ))}
                </View>
              </View>
              <Animated.View style={[styles.commentInput, { opacity }]} />
            </View>
          </View>

          {/* Reviews List */}
          <View className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} className="bg-white rounded-xl p-4">
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center">
                    <Animated.View style={[styles.reviewAvatar, { opacity }]} />
                    <Animated.View style={[styles.reviewerName, { opacity }]} />
                  </View>
                  <View className="flex-row">
                    {[...Array(5)].map((_, i) => (
                      <Animated.View
                        key={i}
                        style={[styles.reviewStar, { opacity }]}
                      />
                    ))}
                  </View>
                </View>
                <Animated.View style={[styles.reviewComment, { opacity }]} />
                <Animated.View
                  style={[styles.reviewCommentLine2, { opacity }]}
                />
                <Animated.View
                  style={[styles.reviewCommentLine3, { opacity }]}
                />
              </View>
            ))}
          </View>

          {/* About Book Cards */}
          <View
            className="bg-white rounded-xl p-4 mb-4 m-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 5, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 1,
              borderWidth: 1,
              borderColor: "#e7e7e7",
            }}
          >
            <View className="flex-row justify-around mb-4">
              {/* Three info cards */}
              {Array.from({ length: 3 }).map((_, index) => (
                <View key={index} className="book-details-card">
                  <Animated.View style={[styles.cardIcon, { opacity }]} />
                  <Animated.View style={[styles.cardTitle, { opacity }]} />
                  <Animated.View style={[styles.cardContent, { opacity }]} />
                </View>
              ))}
            </View>

            {/* Description */}
            <View className="">
              <Animated.View style={[styles.descriptionLine1, { opacity }]} />
              <Animated.View style={[styles.descriptionLine2, { opacity }]} />
              <Animated.View style={[styles.descriptionLine3, { opacity }]} />
              <Animated.View style={[styles.descriptionLine4, { opacity }]} />
            </View>
          </View>

          {/* Related Books */}
          <View className="bg-white rounded-xl p-4 mb-4">
            <Animated.View style={[styles.relatedBooksTitle, { opacity }]} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Array.from({ length: 3 }).map((_, index) => (
                <View
                  key={index}
                  className="mr-4 items-center"
                  style={{ width: 100 }}
                >
                  <Animated.View
                    style={[styles.relatedBookCover, { opacity }]}
                  />
                  <Animated.View
                    style={[styles.relatedBookTitle, { opacity }]}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Bottom Action Buttons */}
        <View className="bg-white px-4 py-3 mb-10">
          <View className="flex-row gap-2">
            <Animated.View style={[styles.actionButton, { opacity }]} />
            <Animated.View style={[styles.actionButton, { opacity }]} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Header
  headerIcon: {
    width: 26,
    height: 26,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  headerTitle: {
    width: 150,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },

  // Book Cover Section
  bookCover: {
    width: 150,
    height: 200,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
  },
  bookTitle: {
    width: 200,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 16,
  },
  statLabel: {
    width: 60,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 4,
  },
  statValue: {
    width: 40,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },

  // Tabs
  tabText: {
    width: 80,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  tabUnderline: {
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    borderRadius: 1,
    marginTop: 8,
  },

  // Rating Section
  reviewsLabel: {
    width: 60,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  ratingNumber: {
    width: 40,
    height: 32,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 4,
  },
  ratingBadge: {
    width: 80,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },

  // Add Comment Section
  userAvatar: {
    width: 48,
    height: 48,
    backgroundColor: "#E0E0E0",
    borderRadius: 24,
  },
  userName: {
    width: 60,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  starIcon: {
    width: 16,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginLeft: 2,
  },
  commentInput: {
    width: "100%",
    height: 80,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },

  // Reviews
  reviewAvatar: {
    width: 40,
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerName: {
    width: 60,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  reviewStar: {
    width: 14,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginLeft: 1,
  },
  reviewComment: {
    width: "100%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 4,
  },
  reviewCommentLine2: {
    width: "90%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 4,
  },
  reviewCommentLine3: {
    width: "60%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },

  // About Book Cards
  cardIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    width: 60,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 4,
  },
  cardContent: {
    width: 80,
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },

  // Description
  descriptionLine1: {
    width: "100%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
  },
  descriptionLine2: {
    width: "95%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
  },
  descriptionLine3: {
    width: "90%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
  },
  descriptionLine4: {
    width: "70%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },

  // Related Books
  relatedBooksTitle: {
    width: 120,
    height: 18,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 12,
  },
  relatedBookCover: {
    width: 80,
    height: 120,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedBookTitle: {
    width: 70,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },

  // Action Buttons
  actionButton: {
    flex: 1,
    height: 48,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
});
