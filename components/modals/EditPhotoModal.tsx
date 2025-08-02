import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface EditPhotoModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPhoto: () => void;
}

export default function EditPhotoModal({
  visible,
  onClose,
  onSelectPhoto,
}: EditPhotoModalProps) {
  const { t } = useTranslation();

  const handleSelectPhoto = () => {
    onSelectPhoto();
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
            <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="camera" size={24} color="#F97316" />
            </View>
            <Text className="text-lg font-SomarMedium text-gray-800 text-center">
              {t("edit_photo_title")}
            </Text>
            <Text className="text-sm font-SomarRegular text-gray-500 text-center mt-1">
              {t("edit_photo_subtitle")}
            </Text>
          </View>

          {/* Photo Upload Area */}
          <View className="mb-6">
            <TouchableOpacity
              onPress={handleSelectPhoto}
              className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 items-center justify-center"
            >
              <View className="w-16 h-16 bg-gray-200 rounded-xl items-center justify-center mb-3">
                <Ionicons name="image-outline" size={32} color="#9CA3AF" />
              </View>
              <Text className="font-SomarMedium text-gray-600 text-center">
                {t("add_your_photo")}
              </Text>
            </TouchableOpacity>
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
              onPress={handleSelectPhoto}
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
