import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface PopupModalProps {
  content: any;
  visible: boolean;
  onClose: () => void;
}

export default function PopupModal({
  visible,
  content,
  onClose,
}: PopupModalProps) {
  const { t } = useTranslation();

  if (!content) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="bg-white rounded-3xl p-8 w-full max-w-sm">
          {/* Popup Image */}
          {content.image && (
            <View className="items-center mb-6">
              <Image
                source={{
                  uri: content.image.startsWith("http")
                    ? content.image
                    : `${process.env.EXPO_PUBLIC_API_URL}storage/${content.image}`,
                }}
                className="rounded-xl"
                style={{ width: "100%", height: 200 }}
                resizeMode="cover"
              />
            </View>
          )}

          {/* Star Icon and Dashed Lines (if no image) */}
          {!content.image && (
            <View className="items-center mb-6">
              <View className="relative mb-4">
                {/* Dashed Lines */}
                <View className="absolute -left-8 top-0">
                  <View className="w-2 h-1 bg-amber-600 rounded-full mb-1" />
                  <View className="w-3 h-1 bg-amber-600 rounded-full mb-1" />
                  <View className="w-4 h-1 bg-amber-600 rounded-full" />
                </View>

                {/* Star Icon */}
                <View className="w-16 h-16 bg-amber-100 rounded-full items-center justify-center">
                  <Ionicons name="star" size={32} color="#D97706" />
                </View>
              </View>
            </View>
          )}

          {/* Main Text */}
          <Text className="text-2xl font-SomarBold text-black text-center mb-2">
            {content.title || t("join_over_million_readers")}
          </Text>

          {/* Description */}
          <Text className="text-base font-SomarRegular text-gray-600 text-center mb-6">
            {content.description || t("create_free_account_khezana")}
          </Text>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 rounded-xl py-4"
              style={{
                borderColor: "#D97706",
                borderWidth: 1,
              }}
            >
              <Text className="text-center font-SomarBold text-amber-700 text-lg">
                {t("cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (content.action_type === "book") {
                  router.push(`/books/${content.action_value}`);
                } else if (content.action_type === "author") {
                  router.push(`/user/${content.action_value}`);
                } else if (content.action_type === "publisher") {
                  router.push(`/user/${content.action_value}`);
                } else if (content.action_type === "user") {
                  router.push(`/user/${content.action_value}`);
                } else {
                  router.push("/auth/register");
                }
              }}
              className="flex-1 bg-amber-600 rounded-xl py-4"
            >
              <Text className="text-center font-SomarBold text-white text-lg">
                {content.action_type === "book"
                  ? t("view_book")
                  : content.action_type === "author"
                    ? t("view_author")
                    : content.action_type === "publisher"
                      ? t("view_publisher")
                      : content.action_type === "user"
                        ? t("view_user")
                        : t("create_account")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
