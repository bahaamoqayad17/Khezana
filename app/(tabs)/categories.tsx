import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CategorySkeleton from "@/components/skeletons/CategorySkeleton";
import { fetchCategories } from "@/store/CategorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 3; // 3 columns with padding

export default function Categories() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const [activeTab, setActiveTab] = useState<"general" | "educational">(
    "general"
  );

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const handleCategoryPress = (categoryId: number, categoryName: string) => {
    console.log("Category pressed:", categoryId, categoryName);
    // TODO: Navigate to category details or books in this category
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title={t("categories")} />

      {/* Tabs */}
      <View className="px-4 mb-4">
        <View className="flex-row justify-center">
          {/* General Categories Tab */}
          <TouchableOpacity
            className="flex-1 items-center py-3 relative"
            onPress={() => setActiveTab("general")}
          >
            <Text
              className={`text-base font-SomarBold ${
                activeTab === "general" ? "text-primary" : "text-secondary"
              }`}
            >
              {t("general_categories")}
            </Text>
            {/* Active Tab Underline */}
            {activeTab === "general" && (
              <View className="active-tab-underline" />
            )}
          </TouchableOpacity>

          {/* Educational Categories Tab */}
          <TouchableOpacity
            className="flex-1 items-center py-3 relative"
            onPress={() => setActiveTab("educational")}
          >
            <Text
              className={`text-base font-SomarBold ${
                activeTab === "educational" ? "text-primary" : "text-secondary"
              }`}
            >
              {t("educational_categories")}
            </Text>
            {/* Active Tab Underline */}
            {activeTab === "educational" && (
              <View className="active-tab-underline" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {loading ? (
            <CategorySkeleton />
          ) : error ? (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-red-500 font-SomarRegular text-center">
                حدث خطأ في تحميل التصنيفات
              </Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.category_id}
                  onPress={() =>
                    router.push(
                      `/books_category?id=${category.category_id}&name=${category.category_name}`
                    )
                  }
                  className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
                  style={{
                    width: cardWidth,
                    borderWidth: 1,
                    borderColor: "#EBD7BD",
                    backgroundColor: "#FFFBFB",
                  }}
                  activeOpacity={0.7}
                >
                  <View className="items-center">
                    <View className="w-16 h-16 mb-3 rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        source={{
                          uri: `${process.env.EXPO_PUBLIC_API_URL}${category.category_image_url}`,
                        }}
                        className="w-full h-full"
                        resizeMode="cover"
                        onError={() => {
                          console.log(
                            "Failed to load image:",
                            category.category_image_url
                          );
                        }}
                      />
                    </View>

                    {/* Category Name */}
                    <Text
                      className="text-sm font-SomarBold text-primary text-center"
                      numberOfLines={2}
                    >
                      {category.category_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
