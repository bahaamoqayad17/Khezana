import CommentIcon from "@/icons/Comment";
import LikeIcon from "@/icons/Like";
import SendIcon from "@/icons/Send";
import SingleQuoteIcon from "@/icons/SingleQuotes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PostQuote() {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    console.log("newComment", newComment);
  };

  return (
    <View className="flex-row items-center mt-4">
      <View
        className="flex-1 bg-white p-4"
        style={{
          elevation: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#F5F1EC",
            borderRadius: 10,
            borderStyle: "solid",
            borderLeftWidth: 4,
            borderLeftColor: "#65382c",
          }}
        >
          <View className="flex-row gap-2 p-4">
            <SingleQuoteIcon />

            <Text
              className="text-lg font-SomarBlack text-gray-800 leading-7"
              style={{
                width: "90%",
              }}
            >
              الحب هو الجسر بين روحين، الطريق الذي يقود القلب إلى القلب. عندما
              نحب حقاً، نتعلم أن نرى الجمال في كل شيء، حتى في الألم.
            </Text>
          </View>

          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-2">
              <SingleQuoteIcon />

              <Text className="text-sm font-SomarMedium text-gray-800 leading-7">
                {t("quote")}
              </Text>
            </View>

            <Text className="text-sm font-SomarMedium text-gray-800 leading-7">
              قواعد العشق الأربعون - أليف شافاق
            </Text>
          </View>
        </View>

        {/* Simple Review Card */}
        <View
          className="bg-white rounded-xl p-4 mt-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {/* User Info and Rating */}
          <View className="items-center mb-4 flex-row">
            <View
              className="rounded-full mr-3 items-center justify-center"
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#6366F1",
              }}
            >
              <Text className="text-white font-SomarBold text-lg">E</Text>
            </View>

            <View className="flex-1 gap-2">
              <View className="flex-row items-center">
                <Text className="text-base font-SomarBold text-gray-800">
                  إبتسام
                </Text>
              </View>
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= 5 ? "star" : "star-outline"}
                    size={16}
                    color={star <= 5 ? "#FFD700" : "#E0E0E0"}
                  />
                ))}
              </View>

              {/* Review Text */}
              <View
                style={{
                  width: "90%",
                }}
              >
                <Text className="text-gray-700 font-SomarMedium leading-6 mb-4">
                  تطبيق ممتاز يحتوي على مكتبة ضخمة من الكتب باللغة العربية
                  والإنجليزية، وسهول الاستخدام جداً أعجبني خيار القراءة بدون
                  إنترنت أنصح به بشدة لكل محبي القراءة
                </Text>
              </View>

              <View className="flex-row items-center gap-4">
                <TouchableOpacity className="flex-row items-center gap-1">
                  <Text className="text-xs text-gray-500">12</Text>
                  <LikeIcon />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center gap-1">
                  <Text className="text-xs text-gray-500">12</Text>
                  <CommentIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Comment Input */}
          <View>
            <View className="flex-row items-center">
              <View
                className="flex-1 flex-row items-center py-2 px-2"
                style={{
                  borderWidth: 1,
                  borderColor: "#E7E7E7",
                  backgroundColor: "#F9FAFB",
                  borderRadius: 10,
                }}
              >
                <TextInput
                  value={newComment}
                  onChangeText={setNewComment}
                  placeholder={t("add_comment", "Add a comment...")}
                  multiline
                  className="flex-1 text-sm max-h-24 font-SomarMedium"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className={`ml-2 px-3 py-1 rounded-full ${
                    newComment.trim() ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <SendIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
