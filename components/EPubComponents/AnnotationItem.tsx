import { Annotation } from "@epubjs-react-native/core";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  annotation: Annotation;
  onPressAnnotation: (annotation: Annotation) => void;
  onRemoveAnnotation: (annotation: Annotation) => void;
}

function AnnotationItem({
  annotation,
  onPressAnnotation,
  onRemoveAnnotation,
}: Props) {
  return (
    <BottomSheetView
      key={annotation.cfiRange}
      className="flex-row items-center justify-between my-1"
    >
      <View className="flex-row items-center">
        <View
          className="w-7 h-7 rounded-full mr-2 border border-white"
          style={{ backgroundColor: annotation.styles?.color }}
        />

        <TouchableOpacity onPress={() => onPressAnnotation(annotation)}>
          {annotation.type === "highlight" && (
            <Text className="font-semibold ml-1 text-black">
              {annotation.cfiRange}
            </Text>
          )}

          {annotation.type !== "highlight" && (
            <Text className="font-semibold ml-1 text-black">
              {annotation.data?.observation}
            </Text>
          )}

          <Text
            className="italic flex-wrap max-w-xs text-black"
            numberOfLines={2}
          >
            &quot;{annotation.cfiRangeText}&quot;
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => onRemoveAnnotation(annotation)}>
        <Ionicons name="trash-outline" color="#EF4444" size={20} />
      </TouchableOpacity>
    </BottomSheetView>
  );
}

// Styles replaced with Tailwind classes

export default AnnotationItem;
