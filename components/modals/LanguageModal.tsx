import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface LanguageModalProps {
  visible: boolean;
  currentLanguage: string;
  onClose: () => void;
  onSave: (newLanguage: string) => void;
}

export default function LanguageModal({
  visible,
  currentLanguage,
  onClose,
  onSave,
}: LanguageModalProps) {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languageOptions = [
    { value: "ar", label: "العربية" },
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
  ];

  const handleSave = () => {
    onSave(selectedLanguage);
    onClose();
  };

  const getLanguageLabel = (value: string) => {
    const option = languageOptions.find(
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
              <Ionicons name="language" size={32} color="#CE9664" />
            </View>
            <Text className="text-lg font-SomarMedium text-gray-800 text-center">
              {t("choose_language")}
            </Text>
            <Text className="text-sm font-SomarRegular text-gray-500 text-center mt-1">
              {t("select_your_preferred_language")}
            </Text>
          </View>

          {/* Dropdown */}
          <View className="mb-6">
            <Text className="font-SomarMedium text-gray-700 mb-2">
              {t("language")}
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
                {getLanguageLabel(selectedLanguage) || t("choose")}
              </Text>
            </TouchableOpacity>

            {/* Dropdown Options */}
            {dropdownOpen && (
              <View className="bg-white border border-gray-200 rounded-xl mt-1 shadow-sm">
                {languageOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => {
                      setSelectedLanguage(option.label);
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
