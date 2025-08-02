import EditIcon from "@/icons/Edit";
import { User } from "@/store/models.type";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface UserDataProps {
  user?: User;
  onEditField?: (field: string) => void;
  onEditAvatar?: () => void;
}

export default function UserData({
  user = {
    name: "moahmmed srour",
    email: "m.reyad.st@gmail.com",
    gender: "ذكر",
    state: "فلسطين",
    phone: "+970567668383",
    birth_date: "2024-03-08",
  } as User,
  onEditField,
  onEditAvatar,
}: UserDataProps) {
  const { t } = useTranslation();

  const profileFields = [
    {
      id: "name",
      label: t("name"),
      value: user.name,
      hasEdit: true,
    },
    {
      id: "email",
      label: t("email"),
      value: user.email,
      hasEdit: true,
    },
    {
      id: "gender",
      label: t("gender"),
      value: user.gender || t("male"),
      hasEdit: true,
    },
    {
      id: "state",
      label: t("choose_state"),
      value: user.state || "فلسطين",
      hasEdit: true,
    },
    {
      id: "phone",
      label: t("phone_number"),
      value: user.phone || "+970567668383",
      hasEdit: true,
    },
    {
      id: "birth_date",
      label: t("birth_date"),
      value: user.birth_date || "2024-03-08",
      hasEdit: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-forward" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">
          {t("personal_information")}
        </Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Profile Avatar Section */}
        <View className="bg-white rounded-2xl p-6 mb-6 items-center">
          <View className="relative">
            <View className="w-20 h-20 rounded-full bg-gray-200 border-4 border-white shadow-sm overflow-hidden">
              {user.profile_image ? (
                <Image
                  source={{ uri: user.profile_image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-gray-300 items-center justify-center">
                  <Ionicons name="person" size={40} color="#9CA3AF" />
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={onEditAvatar}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full items-center justify-center border-2 border-white"
            >
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Information Fields */}
        <View className="space-y-4">
          {profileFields.map((field) => (
            <View key={field.id} className="bg-white rounded-2xl p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-1">
                    {field.label}
                  </Text>
                  <Text className="text-gray-800 text-base font-medium">
                    {field.value}
                  </Text>
                </View>
                {field.hasEdit && (
                  <TouchableOpacity
                    onPress={() => onEditField?.(field.id)}
                    className="p-2 ml-2"
                  >
                    <EditIcon />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
