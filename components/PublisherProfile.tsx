import EditDescriptionModal from "@/components/modals/EditDescriptionModal";
import EditFacebookModal from "@/components/modals/EditFacebookModal";
import EditInstagramModal from "@/components/modals/EditInstagramModal";
import EditPhotoModal from "@/components/modals/EditPhotoModal";
import EditTelegramModal from "@/components/modals/EditTelegramModal";
import EditWhatsappModal from "@/components/modals/EditWhatsappModal";
import EditYoutubeModal from "@/components/modals/EditYoutubeModal";
import CameraIcon from "@/icons/Camera";
import EditIcon from "@/icons/Edit";
import { Publisher } from "@/store/models.type";
import axios from "@/utils/axios";
import { showSuccessToast } from "@/utils/toast";
import { Ionicons } from "@expo/vector-icons";
import { launchImageLibraryAsync } from "expo-image-picker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PublisherProfile({ user }: { user: Publisher }) {
  const { t } = useTranslation();
  // Modal states
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [facebookModalVisible, setFacebookModalVisible] = useState(false);
  const [youtubeModalVisible, setYoutubeModalVisible] = useState(false);
  const [telegramModalVisible, setTelegramModalVisible] = useState(false);
  const [whatsappModalVisible, setWhatsappModalVisible] = useState(false);
  const [instagramModalVisible, setInstagramModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  // User data state (for optimistic updates)
  const [userData, setUserData] = useState({
    name: user?.publisher_name || "",
    description: user?.publisher_description || "",
    social_links: user?.social_links || {
      publisher_facebook: "",
      publisher_youtube: "",
      publisher_telegram: "",
      publisher_whatsapp: "",
      publisher_instagram: "",
    },
    profile_image: user?.publisher_image || "",
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
      id: "description",
      label: t("description"),
      value: userData.description,
      hasEdit: true,
      onEdit: () => setDescriptionModalVisible(true),
    },
    {
      id: "social_links_facebook",
      label: t("facebook"),
      value: userData.social_links.publisher_facebook,
      hasEdit: true,
      onEdit: () => setFacebookModalVisible(true),
    },
    {
      id: "social_links_youtube",
      label: t("youtube"),
      value: userData.social_links.publisher_youtube,
      hasEdit: true,
      onEdit: () => setYoutubeModalVisible(true),
    },
    {
      id: "social_links_telegram",
      label: t("telegram"),
      value: userData.social_links.publisher_telegram,
      hasEdit: true,
      onEdit: () => setTelegramModalVisible(true),
    },
    {
      id: "social_links_whatsapp",
      label: t("whatsapp"),
      value: userData.social_links.publisher_whatsapp,
      hasEdit: true,
      onEdit: () => setWhatsappModalVisible(true),
    },
    {
      id: "social_links_instagram",
      label: t("instagram"),
      value: userData.social_links.publisher_instagram,
      hasEdit: true,
      onEdit: () => setInstagramModalVisible(true),
    },
  ];

  // Modal handlers
  const handleSaveName = (newName: string) => {
    setUserData((prev) => ({ ...prev, name: newName }));
    // TODO: API call to update name
    console.log("Saving new name:", newName);
    showSuccessToast({
      duration: 3000,
      title: t("name_updated"),
    });
  };

  const handleSaveDescription = (newDescription: string) => {
    setUserData((prev) => ({ ...prev, description: newDescription }));
    // TODO: API call to update description
    console.log("Saving new description:", newDescription);
    showSuccessToast({
      duration: 3000,
      title: t("description_updated"),
    });
  };

  const handleSaveFacebook = (newFacebook: string) => {
    setUserData((prev) => ({
      ...prev,
      social_links: { ...prev.social_links, publisher_facebook: newFacebook },
    }));
    // TODO: API call to update facebook
    console.log("Saving new social links:", {
      ...userData.social_links,
      publisher_facebook: newFacebook,
    });
    showSuccessToast({
      duration: 3000,
      title: t("facebook_updated"),
    });
  };

  const handleSaveYoutube = (newYoutube: string) => {
    setUserData((prev) => ({
      ...prev,
      social_links: { ...prev.social_links, publisher_youtube: newYoutube },
    }));
    // TODO: API call to update youtube
    console.log("Saving new social links:", {
      ...userData.social_links,
      publisher_youtube: newYoutube,
    });
    showSuccessToast({
      duration: 3000,
      title: t("youtube_updated"),
    });
  };

  const handleSaveTelegram = (newTelegram: string) => {
    setUserData((prev) => ({
      ...prev,
      social_links: { ...prev.social_links, publisher_telegram: newTelegram },
    }));
    // TODO: API call to update telegram
    console.log("Saving new social links:", {
      ...userData.social_links,
      publisher_telegram: newTelegram,
    });
    showSuccessToast({
      duration: 3000,
      title: t("telegram_updated"),
    });
  };

  const handleSaveWhatsapp = (newWhatsapp: string) => {
    setUserData((prev) => ({
      ...prev,
      social_links: { ...prev.social_links, publisher_whatsapp: newWhatsapp },
    }));
    // TODO: API call to update whatsapp
    console.log("Saving new social links:", {
      ...userData.social_links,
      publisher_whatsapp: newWhatsapp,
    });
    showSuccessToast({
      duration: 3000,
      title: t("whatsapp_updated"),
    });
  };

  const handleSaveInstagram = (newInstagram: string) => {
    setUserData((prev) => ({
      ...prev,
      social_links: { ...prev.social_links, publisher_instagram: newInstagram },
    }));
    // TODO: API call to update instagram
    console.log("Saving new social links:", {
      ...userData.social_links,
      publisher_instagram: newInstagram,
    });
    showSuccessToast({
      duration: 3000,
      title: t("instagram_updated"),
    });
  };

  const handleSelectPhoto = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop() || "image.jpg";
      const fileType = "image/jpeg";

      const formData = new FormData();

      // Create the file object properly for FormData
      const imageFile = {
        uri: uri,
        type: fileType,
        name: fileName,
      } as any;

      formData.append("profile_image", imageFile);

      await axios.post(`auth/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUserData((prev) => ({ ...prev, profile_image: uri }));
      showSuccessToast({
        duration: 3000,
        title: t("photo_updated"),
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Profile Avatar Section */}
      <View className="bg-lightPrimary rounded-2xl mb-6 p-4 items-center borderize">
        <View className="relative">
          {userData?.profile_image ? (
            <Image
              source={{
                uri: userData?.profile_image?.startsWith("http")
                  ? userData?.profile_image
                  : `${process.env.EXPO_PUBLIC_API_URL}storage/${userData?.profile_image}`,
              }}
              style={{ width: 82, height: 82, borderRadius: 50 }}
              resizeMode="cover"
              onError={(e) => console.log("image error:", e.nativeEvent.error)}
            />
          ) : (
            <View className="w-full h-full bg-gray-300 items-center justify-center">
              <Ionicons name="person" size={40} color="#9CA3AF" />
            </View>
          )}

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
            className="rounded-xl p-4 mb-4"
            style={{
              backgroundColor: "#FBF7F1",
              borderColor: "#E7E7E7",
              borderWidth: 1,
            }}
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

      <EditDescriptionModal
        visible={descriptionModalVisible}
        currentDescription={userData.description}
        onClose={() => setDescriptionModalVisible(false)}
        onSave={handleSaveDescription}
      />

      <EditFacebookModal
        visible={facebookModalVisible}
        currentFacebook={userData.social_links.publisher_facebook}
        onClose={() => setFacebookModalVisible(false)}
        onSave={handleSaveFacebook}
      />

      <EditYoutubeModal
        visible={youtubeModalVisible}
        currentYoutube={userData.social_links.publisher_youtube}
        onClose={() => setYoutubeModalVisible(false)}
        onSave={handleSaveYoutube}
      />

      <EditTelegramModal
        visible={telegramModalVisible}
        currentTelegram={userData.social_links.publisher_telegram}
        onClose={() => setTelegramModalVisible(false)}
        onSave={handleSaveTelegram}
      />

      <EditWhatsappModal
        visible={whatsappModalVisible}
        currentWhatsapp={userData.social_links.publisher_whatsapp}
        onClose={() => setWhatsappModalVisible(false)}
        onSave={handleSaveWhatsapp}
      />

      <EditInstagramModal
        visible={instagramModalVisible}
        currentInstagram={userData.social_links.publisher_instagram}
        onClose={() => setInstagramModalVisible(false)}
        onSave={handleSaveInstagram}
      />

      <EditPhotoModal
        visible={photoModalVisible}
        onClose={() => setPhotoModalVisible(false)}
        onSelectPhoto={handleSelectPhoto}
      />
    </SafeAreaView>
  );
}
