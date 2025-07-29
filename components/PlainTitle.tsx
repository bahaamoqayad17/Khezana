import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PlainTitleProps {
  title: string;
}

const PlainTitle: React.FC<PlainTitleProps> = ({ title }) => {
  return (
    <View className={`flex-row items-center justify-between px-5 pt-20 pb-10`}>
      {/* Title Text */}

      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-forward" size={26} color="#292D32" />
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center">
        <Text className={`text-2xl font-SomarBold text-black text-center`}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default PlainTitle;
