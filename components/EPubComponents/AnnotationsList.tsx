import { Annotation, useReader } from "@epubjs-react-native/core";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AnnotationForm from "./AnnotationForm";
import AnnotationItem from "./AnnotationItem";

type Selection = {
  cfiRange: string;
  text: string;
};

interface Props {
  selection: Selection | null;
  selectedAnnotation?: Annotation;
  annotations: Annotation[];
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

export const AnnotationsList = forwardRef<Ref, Props>(
  ({ selection, selectedAnnotation, annotations, onClose }, ref) => {
    const { theme, removeAnnotation, goToLocation } = useReader();

    const snapPoints = React.useMemo(() => ["50%", "75%", "100%"], []);

    const renderItem = React.useCallback(
      ({ item }: { item: Annotation }) => (
        <AnnotationItem
          annotation={item}
          onPressAnnotation={(annotation) => {
            goToLocation(annotation.cfiRange);
            onClose();
          }}
          onRemoveAnnotation={(annotation) => {
            /**
             * Required for the "add note" scenario, as an "underline" and "mark" type annotation is created in it and both work as one...
             */
            if (annotation.data?.key) {
              const withMarkAnnotations = annotations.filter(
                ({ data }) => data.key === annotation.data.key
              );

              withMarkAnnotations.forEach((_annotation) =>
                removeAnnotation(_annotation)
              );
            } else {
              removeAnnotation(annotation);
            }
            onClose();
          }}
        />
      ),
      [annotations, goToLocation, onClose, removeAnnotation]
    );

    const header = React.useCallback(
      () => (
        <View style={{ backgroundColor: theme.body.background }}>
          <View className="w-full flex-row justify-between items-center mt-2">
            <Text
              className="text-black font-bold"
              style={{ fontFamily: "Cairo-Bold" }}
            >
              التعليقات التوضيحية
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text className="text-black">اغلاق</Text>
            </TouchableOpacity>
          </View>

          {(selection || selectedAnnotation) && (
            <AnnotationForm
              annotation={selectedAnnotation}
              selection={selection}
              onClose={onClose}
            />
          )}
        </View>
      ),
      [onClose, selectedAnnotation, selection, theme.body.background]
    );

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: theme.body.background,
          }}
          handleStyle={{ backgroundColor: theme.body.background }}
          backgroundStyle={{ backgroundColor: theme.body.background }}
          onDismiss={onClose}
        >
          <BottomSheetFlatList<Annotation>
            data={annotations.filter(
              (annotation) =>
                !annotation?.data?.isTemp && annotation.type !== "mark"
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.cfiRange}
            renderItem={renderItem}
            ListHeaderComponent={header}
            style={{ width: "100%" }}
            maxToRenderPerBatch={20}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

AnnotationsList.displayName = "AnnotationsList";

// Styles replaced with Tailwind classes
