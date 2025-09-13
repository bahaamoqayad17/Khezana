import { addPost } from "@/store/BlogSlice";
import { useAppDispatch } from "@/store/hooks";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { launchImageLibraryAsync } from "expo-image-picker";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

export default function TextEditor() {
  const richText = useRef<RichEditor | null>(null);
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSelectImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      showErrorToast({
        duration: 3000,
        title: t("please_enter_title"),
      });
      return;
    }

    setIsPublishing(true);

    try {
      richText.current?.getContentHtml().then(async (content) => {
        if (!content.trim()) {
          showErrorToast({
            duration: 3000,
            title: t("please_enter_content"),
          });
          setIsPublishing(false);
          return;
        }

        // Prepare image data for FormData if image is selected
        let imageData = null;
        if (selectedImage) {
          const fileName = selectedImage.split("/").pop() || "image.jpg";
          const fileType = "image/jpeg";

          imageData = {
            uri: selectedImage,
            type: fileType,
            name: fileName,
          } as any;
        }

        await dispatch(
          addPost({
            title: title.trim(),
            body: content,
            image: imageData,
          })
        );

        // Reset form
        setTitle("");
        setSelectedImage(null);
        richText.current?.setContentHTML("");

        showSuccessToast({
          duration: 3000,
          title: t("post_published_successfully"),
        });
      });
    } catch {
      showErrorToast({
        duration: 3000,
        title: t("failed_to_publish_post"),
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <View className="mx-4 mb-10">
      {/* Title Input */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={t("post_title")}
        placeholderTextColor="#9CA3AF"
        className="bg-gray-50 rounded-xl px-4 py-3 font-SomarRegular text-gray-800 border border-gray-200 mb-4"
        style={{
          fontSize: 16,
        }}
      />

      {/* Image Selection and Display */}
      <View className="mb-4">
        {selectedImage ? (
          <View className="relative">
            <Image
              source={{ uri: selectedImage }}
              className="rounded-xl"
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 items-center justify-center"
            >
              <Text className="text-white font-SomarBold text-lg">×</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleSelectImage}
            className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 items-center justify-center"
          >
            <Text className="font-SomarMedium text-gray-600 text-center">
              {t("add_image_to_post")}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Toolbar at the Top */}
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertLink,
        ]}
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      {/* Editor */}
      <RichEditor
        ref={richText}
        placeholder={t("write_your_post")}
        style={{
          borderRadius: 10,
          minHeight: 100,
        }}
      />

      {/* Action Buttons */}
      <View className="flex-row gap-2 mt-4">
        <TouchableOpacity
          onPress={handleSelectImage}
          className="bg-gray-100 p-3 rounded-lg flex-1 items-center"
        >
          <Text className="text-gray-700 font-SomarMedium">
            {selectedImage ? t("change_image") : t("add_image")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-secondary p-3 rounded-lg flex-1 items-center"
          onPress={handlePublish}
          disabled={isPublishing}
        >
          <Text className="text-white font-SomarBold">
            {isPublishing ? t("publishing") : t("publish")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
