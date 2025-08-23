import SendIcon from "@/icons/Send";
import SupportIcon from "@/icons/Support";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

export default function TechnicalSupport() {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً هل اللغة التي ترغب في الاستمرار بها؟",
      isUser: false,
      timestamp: "السبت الساعة 01:00 صباحاً",
    },
    {
      id: "2",
      text: "العربية",
      isUser: true,
      timestamp: "السبت الساعة 01:01 صباحاً",
      status: "read",
    },
    {
      id: "3",
      text: "تشرفت بالتحدث معك، ما اسمك؟",
      isUser: false,
      timestamp: "السبت الساعة 01:03 صباحاً",
    },
    {
      id: "4",
      text: "إنتسار",
      isUser: true,
      timestamp: "السبت الساعة 01:01 صباحاً",
      status: "read",
    },
    {
      id: "5",
      text: "مرحباً إنتسار! شكراً لتواصلك معنا، كيف يمكننا مساعدتك؟",
      isUser: false,
      timestamp: "السبت الساعة 01:03 صباحاً",
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date().toLocaleString("ar-SA"),
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View
        className="flex-row items-center px-5"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#E7E7E7",
          paddingBottom: "5%",
          paddingTop: "14%",
        }}
      >
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <View className="items-center justify-center">
              <SupportIcon />
            </View>
            <View>
              <Text className="font-SomarBold text-gray-800">
                {t("technical_support") || "الدعم الفني"}
              </Text>
              <Text
                className="text-xs font-SomarRegular"
                style={{ color: "#7A7A7A" }}
              >
                {t("how_can_we_help") || "كيف يمكننا مساعدتك؟"}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="close" size={24} color="#65382C" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-4 py-4">
        {messages.map((msg) => (
          <View key={msg.id} className="mb-4">
            {msg.isUser ? (
              // User message (right side)
              <View className="items-end">
                <View className="bg-secondary rounded-2xl rounded-tr-md px-4 py-3 max-w-xs">
                  <Text className="font-SomarMedium text-white">
                    {msg.text}
                  </Text>
                </View>
              </View>
            ) : (
              // Support message (left side)
              <View className="items-start">
                <View
                  className="rounded-2xl rounded-tl-md px-4 py-3 max-w-xs"
                  style={{ backgroundColor: "#FBF7F1", borderRadius: 10 }}
                >
                  <Text className="font-SomarRegular text-gray-800">
                    {msg.text}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          className="flex-row items-center gap-3 mx-4 mb-4"
          style={{
            backgroundColor: "#FFFBFB",
            borderWidth: 1,
            borderColor: "#888888",
            borderRadius: 10,
          }}
        >
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder={t("write_your_message")}
              className="flex-1 font-SomarRegular text-gray-800 text-right"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlign="right"
            />
            <TouchableOpacity className="">
              <SendIcon />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
