import {
  Section as SectionType,
  Toc,
  useReader,
} from "@epubjs-react-native/core";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Section from "./Section";

interface Props {
  onPressSection: (section: SectionType) => void;
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

export const TableOfContents = forwardRef<Ref, Props>(
  ({ onPressSection, onClose }, ref) => {
    const { toc, section, theme } = useReader();

    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<Toc>(toc);

    const snapPoints = React.useMemo(() => ["50%", "90%"], []);

    const renderItem = React.useCallback(
      ({ item }: { item: SectionType }) => (
        <Section
          searchTerm={searchTerm}
          isCurrentSection={section?.id === item?.id}
          section={item}
          onPress={(_section) => {
            onPressSection(_section);
          }}
        />
      ),
      [onPressSection, searchTerm, section?.id]
    );

    const header = React.useCallback(
      () => (
        <View style={{ backgroundColor: theme.body.background }}>
          <View className="w-full flex-row justify-between items-center mt-2">
            <Text
              className="text-black font-bold"
              style={{ fontFamily: "Cairo-Bold" }}
            >
              المحتويات
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text className="text-black">اغلاق</Text>
            </TouchableOpacity>
          </View>

          <View className="w-full">
            <BottomSheetTextInput
              inputMode="search"
              returnKeyType="search"
              returnKeyLabel="Search"
              autoCorrect={false}
              autoCapitalize="none"
              defaultValue={searchTerm}
              className="w-full rounded-lg text-base leading-5 p-2 bg-gray-200"
              style={{ fontFamily: "Cairo-Regular" }}
              placeholder="ابحث في المحتويات"
              placeholderTextColor={"#888"}
              onSubmitEditing={(event) => {
                event.persist();

                setSearchTerm(event.nativeEvent?.text);
                setData(
                  toc.filter((elem) =>
                    new RegExp(event.nativeEvent?.text, "gi").test(elem?.label)
                  )
                );
              }}
            />
          </View>
        </View>
      ),
      [onClose, searchTerm, theme.body.background, toc]
    );

    React.useEffect(() => {
      setData(toc);
    }, [toc]);
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
          onDismiss={() => setSearchTerm("")}
        >
          <BottomSheetFlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
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

TableOfContents.displayName = "TableOfContents";

// Styles replaced with Tailwind classes
