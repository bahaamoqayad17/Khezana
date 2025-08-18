import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ThemeModalProps {
  visible: boolean;
  currentTheme: string;
  onClose: () => void;
  onSave: (newTheme: string) => void;
}

export default function ThemeModal({
  visible,
  currentTheme,
  onClose,
  onSave,
}: ThemeModalProps) {
  const { t } = useTranslation();
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const themeOptions = [
    { value: "light", label: t("light_colors") },
    { value: "dark", label: t("dark_colors") },
    { value: "auto", label: t("system_default") },
  ];

  const handleSave = () => {
    onSave(selectedTheme);
    onClose();
  };

  const getThemeLabel = (value: string) => {
    const option = themeOptions.find(
      (opt) => opt.value === value || opt.label === value
    );
    return option?.label || value;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
          {/* Header */}
          <View className="items-center mb-6">
            <View
              className="w-16 h-16 rounded-full items-center justify-center mb-4"
              style={{
                backgroundColor: "#FBF7F1",
              }}
            >
              <Ionicons name="color-palette" size={32} color="#CE9664" />
            </View>
            <Text className="text-lg font-SomarMedium text-gray-800 text-center">
              {t("choose_appearance")}
            </Text>
            <Text className="text-sm font-SomarRegular text-gray-500 text-center mt-1">
              {t("select_your_preferred_theme")}
            </Text>
          </View>

          {/* Dropdown */}
          <View className="mb-6">
            <Text className="font-SomarMedium text-gray-700 mb-2">
              {t("appearance")}
            </Text>
            <TouchableOpacity
              onPress={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-50 rounded-xl px-4 py-3 font-SomarRegular text-gray-800 border border-gray-200 flex-row justify-between items-center"
            >
              <Ionicons
                name={dropdownOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color="#9CA3AF"
              />
              <Text className="font-SomarRegular text-gray-800">
                {getThemeLabel(selectedTheme) || t("choose")}
              </Text>
            </TouchableOpacity>

            {/* Dropdown Options */}
            {dropdownOpen && (
              <View className="bg-white border border-gray-200 rounded-xl mt-1 shadow-sm">
                {themeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => {
                      setSelectedTheme(option.label);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <Text className="font-SomarRegular text-gray-800">
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Buttons */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-secondary rounded-xl py-3"
            >
              <Text className="text-center font-SomarMedium text-white">
                {t("confirm")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 rounded-xl py-3"
              style={{
                borderColor: "#CE9664",
                borderWidth: 1,
              }}
            >
              <Text className="text-center font-SomarMedium text-gray-700">
                {t("cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
