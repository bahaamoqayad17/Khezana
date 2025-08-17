import PlainTitle from "@/components/PlainTitle";
import EditEmailModal from "@/components/modals/EditEmailModal";
import EditGenderModal from "@/components/modals/EditGenderModal";
import EditNameModal from "@/components/modals/EditNameModal";
import EditPhotoModal from "@/components/modals/EditPhotoModal";
import EditStateModal from "@/components/modals/EditStateModal";
import CameraIcon from "@/icons/Camera";
import EditIcon from "@/icons/Edit";
import { useAppSelector } from "@/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { launchImageLibraryAsync } from "expo-image-picker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserProfile() {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);

  // Modal states
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  // User data state (for optimistic updates)
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || t("male"),
    country: user?.country || "فلسطين",
    profile_image: user?.profile_image || "",
  });
  const profileFields = [
    {
      id: "name",
      label: t("name"),
      value: userData.name,
      hasEdit: true,
      onEdit: () => setNameModalVisible(true),
    },
    {
      id: "email",
      label: t("email"),
      value: userData.email,
      hasEdit: true,
      onEdit: () => setEmailModalVisible(true),
    },
    {
      id: "gender",
      label: t("gender"),
      value: userData.gender,
      hasEdit: true,
      onEdit: () => setGenderModalVisible(true),
    },
    {
      id: "state",
      label: t("choose_state"),
      value: userData.country,
      hasEdit: true,
      onEdit: () => setStateModalVisible(true),
    },
  ];

  // Modal handlers
  const handleSaveName = (newName: string) => {
    setUserData((prev) => ({ ...prev, name: newName }));
    // TODO: API call to update name
    console.log("Saving new name:", newName);
  };

  const handleSaveEmail = (newEmail: string) => {
    setUserData((prev) => ({ ...prev, email: newEmail }));
    // TODO: API call to update email
    console.log("Saving new email:", newEmail);
  };

  const handleSaveGender = (newGender: string) => {
    setUserData((prev) => ({ ...prev, gender: newGender }));
    // TODO: API call to update gender
    console.log("Saving new gender:", newGender);
  };

  const handleSaveState = (newState: string) => {
    setUserData((prev) => ({ ...prev, country: newState }));
    // TODO: API call to update state
    console.log("Saving new state:", newState);
  };

  const handleSelectPhoto = async () => {
    // handleImageUpload();

    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log(uri);
      // TODO: Update user profile image

      setUserData((prev) => ({ ...prev, profile_image: uri }));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <PlainTitle title={t("personal_information")} />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Profile Avatar Section */}
        <View className="bg-lightPrimary rounded-2xl mb-6 p-4 items-center borderize">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-sm overflow-hidden">
              {user?.profile_image ? (
                <Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${user?.profile_image}`,
                  }}
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
              onPress={() => setPhotoModalVisible(true)}
              className="absolute bottom-0 -right-1 w-8 h-8 bg-orange-500 rounded-full items-center justify-center border-2 border-white"
            >
              <CameraIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Information Fields */}
        <View className="space-y-4">
          {profileFields.map((field) => (
            <View
              key={field.id}
              className="bg-lightPrimary rounded-2xl p-4 borderize mb-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-black text-xl font-SomarBold mb-1">
                    {field.label}
                  </Text>
                  <Text className="text-gray text-md font-SomarRegular">
                    {field.value}
                  </Text>
                </View>
                {field.hasEdit && (
                  <TouchableOpacity onPress={field.onEdit} className="p-2 ml-2">
                    <EditIcon />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modals */}
      <EditNameModal
        visible={nameModalVisible}
        currentName={userData.name}
        onClose={() => setNameModalVisible(false)}
        onSave={handleSaveName}
      />

      <EditEmailModal
        visible={emailModalVisible}
        currentEmail={userData.email}
        onClose={() => setEmailModalVisible(false)}
        onSave={handleSaveEmail}
      />

      <EditGenderModal
        visible={genderModalVisible}
        currentGender={userData.gender}
        onClose={() => setGenderModalVisible(false)}
        onSave={handleSaveGender}
      />

      <EditStateModal
        visible={stateModalVisible}
        currentState={userData.country}
        onClose={() => setStateModalVisible(false)}
        onSave={handleSaveState}
      />

      <EditPhotoModal
        visible={photoModalVisible}
        onClose={() => setPhotoModalVisible(false)}
        onSelectPhoto={handleSelectPhoto}
      />
    </SafeAreaView>
  );
}
