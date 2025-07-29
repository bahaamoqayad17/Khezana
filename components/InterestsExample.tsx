import { InterestBadge } from "@/components/ui";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const InterestsExample = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const sampleInterests = ["الرياضة", "الأدب", "العلوم", "التاريخ"];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const navigateToInterests = () => {
    router.push("/interests");
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-SomarBold text-primary mb-4">
        مثال على استخدام شارات الاهتمامات
      </Text>

      {/* Small example with few badges */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {sampleInterests.map((interest, index) => (
          <InterestBadge
            key={index}
            label={interest}
            isSelected={selectedInterests.includes(interest)}
            onToggle={() => toggleInterest(interest)}
            size="sm"
          />
        ))}
      </View>

      {/* Navigate to full interests screen */}
      <TouchableOpacity
        onPress={navigateToInterests}
        className="bg-primary p-4 rounded-lg"
      >
        <Text className="text-white font-SomarBold text-center">
          انتقل إلى شاشة الاهتمامات الكاملة
        </Text>
      </TouchableOpacity>

      {/* Show selected count */}
      <Text className="text-gray-600 font-SomarRegular text-center mt-4">
        تم اختيار {selectedInterests.length} اهتمامات
      </Text>
    </View>
  );
};

export default InterestsExample;
