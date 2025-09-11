import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

interface EditYoutubeModalProps {
  visible: boolean;
  currentYoutube: string;
  onClose: () => void;
  onSave: (newYoutube: string) => void;
}

export default function EditYoutubeModal({
  visible,
  currentYoutube,
  onClose,
  onSave,
}: EditYoutubeModalProps) {
  const { t } = useTranslation();
  const [youtube, setYoutube] = useState(currentYoutube);

  const handleSave = () => {
    onSave(youtube);
    onClose();
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
              className="w-12 h-12 rounded-full items-center justify-center mb-4"
              style={{
                backgroundColor: "#FBF7F1",
              }}
            >
              <Ionicons name="logo-youtube" size={24} color="#FF0000" />
            </View>
            <Text className="text-lg font-SomarMedium text-gray-800 text-center">
              {t("edit_youtube_title")}
            </Text>
            <Text className="text-sm font-SomarRegular text-gray-500 text-center mt-1">
              {t("edit_youtube_subtitle")}
            </Text>
          </View>

          {/* Input Field */}
          <View className="mb-6">
            <Text className="font-SomarMedium text-gray-700 mb-2">
              {t("youtube")}
            </Text>
            <TextInput
              value={youtube}
              onChangeText={setYoutube}
              className="bg-gray-50 rounded-xl px-4 py-3 font-SomarRegular text-gray-800 border border-gray-200"
              placeholder={t("enter_youtube_url")}
              placeholderTextColor="#9CA3AF"
              keyboardType="url"
              autoCapitalize="none"
            />
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
