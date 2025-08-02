import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface EditStateModalProps {
  visible: boolean;
  currentState: string;
  onClose: () => void;
  onSave: (newState: string) => void;
}

export default function EditStateModal({
  visible,
  currentState,
  onClose,
  onSave,
}: EditStateModalProps) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState(currentState);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const stateOptions = [
    { value: "palestine", label: "فلسطين" },
    { value: "jordan", label: "الأردن" },
    { value: "egypt", label: "مصر" },
    { value: "syria", label: "سوريا" },
    { value: "lebanon", label: "لبنان" },
    { value: "iraq", label: "العراق" },
    { value: "saudi", label: "السعودية" },
    { value: "uae", label: "الإمارات" },
    { value: "kuwait", label: "الكويت" },
    { value: "qatar", label: "قطر" },
  ];

  const handleSave = () => {
    onSave(selectedState);
    onClose();
  };

  const getStateLabel = (value: string) => {
    const option = stateOptions.find(
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
            <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="location" size={24} color="#F97316" />
            </View>
            <Text className="text-lg font-SomarMedium text-gray-800 text-center">
              {t("edit_state_title")}
            </Text>
            <Text className="text-sm font-SomarRegular text-gray-500 text-center mt-1">
              {t("edit_state_subtitle")}
            </Text>
          </View>

          {/* Dropdown */}
          <View className="mb-6">
            <Text className="text-right font-SomarMedium text-gray-700 mb-2">
              {t("choose_state")}
            </Text>
            <TouchableOpacity
              onPress={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 flex-row justify-between items-center"
            >
              <Ionicons
                name={dropdownOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color="#9CA3AF"
              />
              <Text className="font-SomarRegular text-gray-800">
                {getStateLabel(selectedState) || t("choose")}
              </Text>
            </TouchableOpacity>

            {/* Dropdown Options */}
            {dropdownOpen && (
              <View className="bg-white border border-gray-200 rounded-xl mt-1 shadow-sm max-h-48">
                {stateOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => {
                      setSelectedState(option.label);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <Text className="text-right font-SomarRegular text-gray-800">
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-100 rounded-xl py-3 mr-2"
            >
              <Text className="text-center font-SomarMedium text-gray-700">
                {t("cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-orange-500 rounded-xl py-3 ml-2"
            >
              <Text className="text-center font-SomarMedium text-white">
                {t("confirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
