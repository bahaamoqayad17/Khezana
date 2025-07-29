import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

export default function TextEditor() {
  const richText = useRef<RichEditor | null>(null);
  const [html, setHtml] = useState("");
  const { t } = useTranslation();
  return (
    <View className="mx-4 mb-10">
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
          backgroundColor: "#f5f5f5",
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

      {/* Publish Button */}
      <TouchableOpacity
        className="bg-secondary p-2 rounded-md mt-2"
        style={{ width: "50%", alignSelf: "flex-end" }}
        onPress={() => {
          richText.current?.getContentHtml().then((content) => {
            console.log(content);
          });
        }}
      >
        <Text className="text-white text-center font-SomarBold">
          {t("publish")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
