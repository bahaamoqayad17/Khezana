import { Section as SectionType } from "@epubjs-react-native/core";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  searchTerm: string;
  isCurrentSection: boolean;
  section: SectionType;
  onPress: (section: SectionType) => void;
}

function Section({ searchTerm, isCurrentSection, section, onPress }: Props) {
  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = section?.label.split(regex);
  return (
    <TouchableOpacity
      key={section.id}
      className="w-full flex-row justify-between items-center"
      onPress={() => onPress(section)}
    >
      <View className="justify-center items-center">
        <Ionicons
          name="bookmark"
          size={20}
          color={isCurrentSection ? "#3B82F6" : "#9CA3AF"}
        />
      </View>

      <View className="w-4/5">
        {!searchTerm && (
          <Text
            className={`italic ${isCurrentSection ? "text-blue-500" : "text-black"}`}
          >
            {section?.label}
          </Text>
        )}

        {searchTerm && (
          <Text
            className={`italic ${isCurrentSection ? "text-blue-500" : "text-black"}`}
          >
            {parts.filter(String).map((part, index) => {
              return regex.test(part) ? (
                <Text className="bg-yellow-300" key={`${index}-part-highlight`}>
                  {part}
                </Text>
              ) : (
                <Text key={`${index}-part`}>{part}</Text>
              );
            })}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Styles replaced with Tailwind classes

export default Section;
