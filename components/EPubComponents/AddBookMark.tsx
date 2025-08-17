import { Bookmark, useReader } from "@epubjs-react-native/core";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

export const BookmarksList = forwardRef<Ref, Props>(({ onClose }, ref) => {
  const {
    bookmarks,
    removeBookmark,
    removeBookmarks,
    isBookmarked,
    updateBookmark,
    goToLocation,
    currentLocation,
    theme,
  } = useReader();

  const snapPoints = React.useMemo(() => ["50%", "75%"], []);
  const [note, setNote] = useState("");
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark | null>(null);

  useEffect(() => {
    if (isBookmarked) {
      const bookmark = bookmarks.find(
        (item) =>
          item.location?.start.cfi === currentLocation?.start.cfi &&
          item.location?.end.cfi === currentLocation?.end.cfi
      );

      if (!bookmark) return;

      setCurrentBookmark(bookmark);
      setNote(bookmark.data?.note || "");
    }
  }, [
    bookmarks,
    currentLocation?.end.cfi,
    currentLocation?.start.cfi,
    isBookmarked,
  ]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={1}
        enablePanDownToClose
        snapPoints={snapPoints}
        handleStyle={{ backgroundColor: theme.body.background }}
      >
        <BottomSheetView
          className="flex-1 items-center px-5"
          style={{ backgroundColor: theme.body.background }}
        >
          <View className="w-full flex-row justify-between items-center">
            <Text
              className="text-black font-bold"
              style={{ fontFamily: "Cairo-Bold" }}
            >
              إشارات مرجعية
            </Text>

            {bookmarks.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  removeBookmarks();
                  onClose();
                }}
              >
                <Text className="text-black">مسح الكل</Text>
              </TouchableOpacity>
            )}
          </View>

          {bookmarks.length === 0 && (
            <View className="w-full flex-row justify-between items-center">
              <Text
                className="text-black"
                style={{ fontFamily: "Cairo-Regular" }}
              >
                لا الإشارات المرجعية...
              </Text>
            </View>
          )}

          {isBookmarked && (
            <View className="w-full">
              <BottomSheetTextInput
                defaultValue={note}
                className="w-full h-16 mt-2 rounded-lg text-base leading-5 p-2 bg-gray-200"
                multiline
                placeholder="Type an annotation here..."
                placeholderTextColor={"#000"}
                onChangeText={(text) => setNote(text)}
              />

              <TouchableOpacity
                className="self-end mt-2"
                onPress={() => updateBookmark(currentBookmark!.id, { note })}
              >
                <Text className="text-black">تحديث التعليق التوضيحي</Text>
              </TouchableOpacity>
            </View>
          )}

          {bookmarks.map((bookmark) => (
            <View
              key={bookmark.id}
              className="flex-row justify-between items-center my-2"
            >
              <TouchableOpacity
                className="flex-row"
                onPress={() => {
                  goToLocation(bookmark.location.start.cfi);
                  onClose();
                }}
              >
                <View className="justify-center items-center">
                  <Ionicons name="bookmark" size={20} color="#9CA3AF" />

                  <Text className="text-black text-xs -mt-3">
                    {bookmark.location.start.location}
                  </Text>
                </View>

                <View className="w-4/5 ml-2">
                  <Text numberOfLines={1} className="mb-1 text-black">
                    الفصل: {bookmark.section?.label}
                  </Text>

                  <Text numberOfLines={2} className="italic text-black">
                    &quot;{bookmark.text}&quot;
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  removeBookmark(bookmark);
                  onClose();
                }}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

BookmarksList.displayName = "BookmarksList";

// Styles replaced with Tailwind classes
