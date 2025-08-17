import { Annotation, useReader } from "@epubjs-react-native/core";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  annotation?: Annotation;
  selection: { cfiRange: string; text: string } | null;
  onClose: () => void;
}

export const COLORS = ["#C20114", "#39A2AE", "#CBA135", "#23CE6B", "#090C02"];

function AnnotationForm({ annotation, selection, onClose }: Props) {
  const [observation, setObservation] = React.useState("");
  const [color, setColor] = React.useState(COLORS[0]);

  const { addAnnotation, updateAnnotation, annotations } = useReader();

  useEffect(() => {
    if (annotation) {
      setObservation(annotation.data?.observation);
      setColor(annotation.styles?.color || "");
    }

    return () => {
      setObservation("");
      setColor(COLORS[0]);
    };
  }, [annotation]);
  return (
    <View className="w-full mb-2">
      {annotation?.type !== "highlight" && (
        <BottomSheetTextInput
          value={observation}
          className="w-full h-16 mt-2 rounded-lg text-base p-2 bg-gray-200"
          style={{ fontFamily: "Cairo-Regular" }}
          multiline
          placeholder="اكتب تعليقًا هنا..."
          placeholderTextColor={"#888"}
          onChangeText={(text) => setObservation(text)}
        />
      )}

      <View className="flex-row justify-between w-full mt-2">
        <View className="flex-row self-start">
          {COLORS.map((item) => (
            <TouchableOpacity
              key={item}
              className="w-8 h-8 rounded-full mr-2 border border-black justify-center items-center"
              style={{ backgroundColor: item }}
              onPress={() => setColor(item)}
            >
              {color === item && (
                <Text className="text-white text-xs font-bold">X</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {!annotation && (
          <TouchableOpacity
            className="bg-blue-100 w-24 justify-center items-center rounded-xl py-2"
            onPress={() => {
              const key = Date.now();
              addAnnotation(
                "underline",
                selection!.cfiRange,
                { key, text: selection!.text, observation },
                { color, opacity: 0.8 }
              );
              addAnnotation("mark", selection!.cfiRange, {
                key,
                text: selection!.text,
                observation,
              });

              setObservation("");
              onClose();
            }}
          >
            <Text
              className="text-center text-gray-900 font-bold"
              style={{ fontFamily: "Cairo-Bold" }}
            >
              اضافة تعليق
            </Text>
          </TouchableOpacity>
        )}

        {annotation && (
          <TouchableOpacity
            className="bg-blue-100 w-24 justify-center items-center rounded-xl py-2"
            onPress={() => {
              /**
               * Required for the "add note" scenario, as an "underline" and "mark" type annotation is created in it and both work as one...
               */
              if (annotation.data?.key) {
                const withMarkAnnotations = annotations.filter(
                  ({ data }) => data.key === annotation.data.key
                );

                withMarkAnnotations.forEach((item) => {
                  updateAnnotation(
                    item,
                    {
                      ...item.data,
                      observation,
                    },
                    { ...item.styles, color }
                  );
                });
              } else {
                updateAnnotation(
                  annotation,
                  {
                    ...annotation.data,
                    observation,
                  },
                  { ...annotation.styles, color }
                );
              }

              onClose();
              setObservation("");
            }}
          >
            <Text
              className="text-center text-gray-900 font-bold"
              style={{ fontFamily: "Cairo-Bold" }}
            >
              تحديث التعليق
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Styles replaced with Tailwind classes

export default AnnotationForm;
