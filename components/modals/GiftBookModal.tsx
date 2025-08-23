import { Book } from "@/store/models.type";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface GiftBookModalProps {
  visible: boolean;
  onClose: () => void;
  book: Book;
  onGift: (email: string, message: string) => void;
}

export default function GiftBookModal({
  visible,
  onClose,
  book,
  onGift,
}: GiftBookModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGift = async () => {
    if (!email.trim()) {
      // You can add proper validation here
      return;
    }

    setLoading(true);
    try {
      await onGift(email.trim(), message.trim());
      // Reset form
      setEmail("");
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Gift error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEmail("");
    setMessage("");
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
              <Ionicons name="gift" size={24} color="#CE9664" />
            </View>
            <Text className="text-lg font-SomarMedium text-gray-800 text-center">
              {t("gift_book")}
            </Text>
            <Text className="text-sm font-SomarRegular text-gray-500 text-center mt-1">
              {t("gift_book_description")}
            </Text>
          </View>

          {/* Book Info */}
          <View className="flex-row gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${book.image}`,
              }}
              className="rounded-lg"
              style={{ width: 50, height: 65 }}
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-sm font-SomarBold text-secondary mb-1">
                {book.title}
              </Text>
              <Text className="text-xs text-gray-600 font-SomarRegular mb-2">
                {t("author")}: {book.author?.author_name || "Unknown"}
              </Text>
              <Text className="text-base font-SomarBold text-primary">
                {book.price} {t("dzd")}
              </Text>
            </View>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="font-SomarMedium text-gray-700 mb-2">
              {t("recipient_email")} *
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="bg-gray-50 rounded-xl px-4 py-3 font-SomarRegular text-gray-800 border border-gray-200"
              placeholder={t("recipient_email")}
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Message Input */}
          <View className="mb-6">
            <Text className="font-SomarMedium text-gray-700 mb-2">
              {t("personal_message")}
            </Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              className="bg-gray-50 rounded-xl px-4 py-3 font-SomarRegular text-gray-800 border border-gray-200"
              placeholder={t("write_message")}
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              style={{ minHeight: 80 }}
            />
          </View>

          {/* Buttons */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={handleGift}
              className="flex-1 bg-secondary rounded-xl py-3"
              disabled={loading || !email.trim()}
              style={{
                opacity: loading || !email.trim() ? 0.6 : 1,
              }}
            >
              <Text className="text-center font-SomarMedium text-white">
                {loading ? t("sending") : t("send_gift")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 rounded-xl py-3"
              style={{
                borderColor: "#CE9664",
                borderWidth: 1,
              }}
              disabled={loading}
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
