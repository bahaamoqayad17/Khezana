import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import InterestBadge from "@/components/ui/InterestBadge";
import { fetchCategories } from "@/store/CategorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Interests = () => {
  const { t } = useTranslation();
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const toggleInterest = (interest: number) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleNext = () => {
    if (selectedInterests.length >= 3) {
      console.log("Selected interests:", selectedInterests);
      // TODO: Save selected interests and navigate to next screen
      router.replace("/(tabs)");
    }
  };

  const isSelected = (interest: number) => selectedInterests.includes(interest);
  const canProceed = selectedInterests.length >= 3;

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      <TouchableOpacity
        onPress={() => router.back()}
        className="p-2 absolute"
        style={{
          top: "7%",
          left: "7%",
        }}
      >
        <Ionicons name="arrow-forward" size={24} color="#65382c" />
      </TouchableOpacity>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-12 justify-center">
          {/* Title */}
          <View className="items-center mb-12">
            <Text className="text-4xl font-SomarBold text-primary text-center">
              {t("select_interests")}
            </Text>
          </View>

          {/* Categories Grid */}
          <View
            className="flex-row flex-wrap justify-center mt-10"
            style={{ gap: 12 }}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#65382c" />
            ) : (
              categories.map((category, index) => (
                <InterestBadge
                  key={index}
                  label={category.category_name}
                  isSelected={isSelected(category.id)}
                  onToggle={() => toggleInterest(category.id)}
                  size="md"
                />
              ))
            )}
          </View>

          {/* Selection count info */}
        </View>

        {/* Next Button - Fixed at bottom */}
        <View className="px-6 pb-6 bg-white" style={{ marginTop: "20%" }}>
          <TouchableOpacity
            onPress={handleNext}
            disabled={!canProceed}
            className={`rounded-xl p-4 w-full ${
              canProceed ? "bg-secondary" : "bg-gray-300"
            }`}
          >
            <Text
              className={`font-SomarBlack text-center text-lg ${
                canProceed ? "text-white" : "text-gray-500"
              }`}
            >
              {t("next")}
            </Text>
          </TouchableOpacity>
          <View className="items-center" style={{ marginTop: 12 }}>
            <Text className="text-gray-600 font-SomarMedium text-lg text-center">
              {t("select_three_or_more")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Interests;
