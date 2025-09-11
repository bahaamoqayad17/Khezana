import PlainTitle from "@/components/PlainTitle";
import axios from "@/utils/axios";
import { showInfoToast, showSuccessToast } from "@/utils/toast";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    type: "other", // Default value
    title: "",
    desc: "",
  });

  const handleSubmit = async () => {
    try {
      await axios.post(`/contact-us`, {
        full_name: form.name,
        email: form.email,
        address: form.address,
        type: form.type,
        title: form.title,
        desc: form.desc,
      });

      setForm({
        name: "",
        email: "",
        address: "",
        type: "other",
        title: "",
        desc: "",
      });

      if (form.type === "suggest") {
        showInfoToast({
          duration: 3000,
          title: t("suggest_book_success"),
        });
      }

      if (form.type === "other") {
        showSuccessToast({
          duration: 3000,
          title: t("contact_us_success"),
        });
      }

      if (form.type === "report") {
        showInfoToast({
          duration: 3000,
          title: t("report_success"),
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PlainTitle title={t("contact_us")} />

      <ScrollView className="flex-1">
        {/* Contact Info Section */}
        <View className="px-6 py-4">
          <View
            className="p-6 mb-6"
            style={{
              backgroundColor: "#FBF7F1",
              borderColor: "#E7E7E7",
              borderWidth: 1,
              elevation: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              borderRadius: 16,
            }}
          >
            {/* Phone */}
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center mr-4">
                <Ionicons name="call" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-lg text-gray-600 font-SomarMedium mb-1"
                  style={{
                    color: "#888888",
                  }}
                >
                  {t("phone")}
                </Text>
                <Text className="text-base font-SomarMedium text-gray-800">
                  +970567865508
                </Text>
              </View>
            </View>

            {/* Email */}
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center mr-4">
                <Ionicons name="mail" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-lg text-gray-600 font-SomarMedium mb-1"
                  style={{
                    color: "#888888",
                  }}
                >
                  {t("email")}
                </Text>
                <Text className="text-base font-SomarMedium text-gray-800">
                  m.reyad.s@gmail.com
                </Text>
              </View>
            </View>

            {/* Address */}
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center mr-4">
                <Ionicons name="location" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-lg text-gray-600 font-SomarMedium mb-1"
                  style={{
                    color: "#888888",
                  }}
                >
                  {t("address")}
                </Text>
                <Text className="text-base font-SomarMedium text-gray-800">
                  {t("algeria")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Form Section */}
        <View className="px-6">
          {/* Type Selection */}
          <View className="mb-4">
            <Text
              className="text-base font-SomarBold mb-2"
              style={{
                color: "#767676",
              }}
            >
              {t("type")}
            </Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-lg border ${
                  form.type === "other"
                    ? "bg-secondary border-secondary"
                    : "bg-white border-gray-300"
                }`}
                onPress={() => setForm({ ...form, type: "other" })}
              >
                <Text
                  className={`text-center font-SomarMedium ${
                    form.type === "other" ? "text-white" : "text-gray-700"
                  }`}
                >
                  {t("contact_us")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-lg border ${
                  form.type === "suggest"
                    ? "bg-secondary border-secondary"
                    : "bg-white border-gray-300"
                }`}
                onPress={() => setForm({ ...form, type: "suggest" })}
              >
                <Text
                  className={`text-center font-SomarMedium ${
                    form.type === "suggest" ? "text-white" : "text-gray-700"
                  }`}
                >
                  {t("suggest_book")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-lg border ${
                  form.type === "report"
                    ? "bg-secondary border-secondary"
                    : "bg-white border-gray-300"
                }`}
                onPress={() => setForm({ ...form, type: "report" })}
              >
                <Text
                  className={`text-center font-SomarMedium ${
                    form.type === "report" ? "text-white" : "text-gray-700"
                  }`}
                >
                  {t("report")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {form.type === "other" && (
            <>
              {/* Full Name */}
              <View className="mb-4">
                <Text
                  className="text-base font-SomarBold mb-2"
                  style={{
                    color: "#767676",
                  }}
                >
                  {t("full_name")}
                </Text>
                <TextInput
                  className="rounded-lg px-4 py-3 font-SomarMedium"
                  placeholder={t("enter_full_name")}
                  placeholderTextColor="#9CA3AF"
                  style={{
                    borderColor: "#E7E7E7",
                    borderWidth: 1,
                    backgroundColor: "#FFFBFB",
                  }}
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  textAlign="right"
                />
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text
                  className="text-base font-SomarBold mb-2"
                  style={{
                    color: "#767676",
                  }}
                >
                  {t("email")}
                </Text>
                <TextInput
                  className="rounded-lg px-4 py-3 font-SomarMedium"
                  placeholder={t("enter_email")}
                  placeholderTextColor="#9CA3AF"
                  style={{
                    borderColor: "#E7E7E7",
                    borderWidth: 1,
                    backgroundColor: "#FFFBFB",
                  }}
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  keyboardType="email-address"
                  textAlign="right"
                />
              </View>

              {/* Address */}
              <View className="mb-4">
                <Text
                  className="text-base font-SomarBold mb-2"
                  style={{
                    color: "#767676",
                  }}
                >
                  {t("address")}
                </Text>
                <TextInput
                  className="rounded-lg px-4 py-3 font-SomarMedium"
                  placeholder={t("enter_address")}
                  placeholderTextColor="#9CA3AF"
                  value={form.address}
                  style={{
                    borderColor: "#E7E7E7",
                    borderWidth: 1,
                    backgroundColor: "#FFFBFB",
                  }}
                  onChangeText={(text) => setForm({ ...form, address: text })}
                  textAlign="right"
                />
              </View>
            </>
          )}

          {/* Subject */}
          <View className="mb-4">
            <Text
              className="text-base font-SomarBold mb-2"
              style={{
                color: "#767676",
              }}
            >
              {form.type === "suggest" ? t("book_name") : t("subject")}
            </Text>
            <TextInput
              className="rounded-lg px-4 py-3 font-SomarMedium"
              placeholder={
                form.type === "suggest"
                  ? t("enter_book_name")
                  : t("enter_subject")
              }
              placeholderTextColor="#9CA3AF"
              value={form.title}
              style={{
                borderColor: "#E7E7E7",
                borderWidth: 1,
                backgroundColor: "#FFFBFB",
              }}
              onChangeText={(text) => setForm({ ...form, title: text })}
              textAlign="right"
            />
          </View>

          {/* Message */}
          <View className="mb-6">
            <Text
              className="text-base font-SomarBold mb-2"
              style={{
                color: "#767676",
              }}
            >
              {form.type === "suggest" ? t("author_name") : t("message")}
            </Text>
            <TextInput
              className="rounded-lg px-4 py-3 font-SomarMedium"
              placeholder={
                form.type === "suggest"
                  ? t("enter_author_name")
                  : t("enter_message")
              }
              placeholderTextColor="#9CA3AF"
              value={form.desc}
              style={{
                borderColor: "#E7E7E7",
                borderWidth: 1,
                minHeight: 100,
                backgroundColor: "#FFFBFB",
              }}
              onChangeText={(text) => setForm({ ...form, desc: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              textAlign="right"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="rounded-lg py-4 mb-8"
            style={{ backgroundColor: "#D4A574" }}
            onPress={handleSubmit}
          >
            <Text className="text-white font-SomarBold text-center text-lg">
              {t("send")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
