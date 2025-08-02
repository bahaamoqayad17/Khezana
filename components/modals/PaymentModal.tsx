import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

interface PaymentModalProps {
  visible: boolean;
  currentPaymentInfo: string;
  onClose: () => void;
  onSave: (newPaymentInfo: string) => void;
}

export default function PaymentModal({
  visible,
  currentPaymentInfo,
  onClose,
  onSave,
}: PaymentModalProps) {
  const { t } = useTranslation();
  const [paymentInfo, setPaymentInfo] = useState(currentPaymentInfo);

  const handleSave = () => {
    onSave(paymentInfo);
    onClose();
  };

  const formatCardNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D+/g, "");
    // Add spaces every 4 digits
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(" ").substr(0, 19) : cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    const formatted = formatCardNumber(text);
    setPaymentInfo(formatted);
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
              <Ionicons name="card" size={24} color="#F97316" />
            </View>
            <Text className="text-lg font-SomarMedium text-gray-800 text-center">
              {t("payment_information")}
            </Text>
            <Text className="text-sm font-SomarRegular text-gray-500 text-center mt-1">
              {t("update_your_payment_method")}
            </Text>
          </View>

          {/* Input Field */}
          <View className="mb-6">
            <Text className="text-right font-SomarMedium text-gray-700 mb-2">
              {t("card_number")}
            </Text>
            <TextInput
              value={paymentInfo}
              onChangeText={handleCardNumberChange}
              className="bg-gray-50 rounded-xl px-4 py-3 text-right font-SomarRegular text-gray-800 border border-gray-200"
              placeholder="**** **** **** ****"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              maxLength={19}
            />
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
