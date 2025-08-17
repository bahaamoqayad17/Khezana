import {
  SearchResult as SearchResultType,
  useReader,
} from "@epubjs-react-native/core";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SearchResult from "./SearchResult";

// Custom debounce implementation
const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

interface Props {
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

// دالة لإزالة التشكيل من النص العربي
const removeArabicDiacritics = (text: string): string => {
  return text.replace(/[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED]/g, "");
};

// دالة لإزالة التشكيل من النص العربي - utility function for Arabic text processing

export const SearchList = forwardRef<Ref, Props>(({ onClose }, ref) => {
  const {
    searchResults,
    goToLocation,
    search,
    clearSearchResults,
    isSearching,
    addAnnotation,
    removeAnnotationByCfi,
    theme,
  } = useReader();

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<SearchResultType[]>([]);
  const [page, setPage] = useState(1);

  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const debouncedSearch = debounce((term: string) => {
    const normalizedSearchTerm = removeArabicDiacritics(term);
    search(normalizedSearchTerm, 1, 20);
  }, 300);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term); // حفظ النص المدخل الأصلي
      clearSearchResults();
      setData([]);
      setPage(1);
      debouncedSearch(term);
    },
    [clearSearchResults, debouncedSearch]
  );

  const renderItem = useCallback(
    ({ item }: { item: SearchResultType }) => (
      <SearchResult
        searchTerm={searchTerm}
        searchResult={item}
        onPress={(searchResult) => {
          goToLocation(searchResult.cfi);
          addAnnotation("highlight", searchResult.cfi);
          setTimeout(() => {
            removeAnnotationByCfi(searchResult.cfi);
          }, 3000);
          clearSearchResults();
          setPage(1);
          setData([]);
          onClose();
        }}
      />
    ),
    [
      addAnnotation,
      clearSearchResults,
      goToLocation,
      onClose,
      removeAnnotationByCfi,
      searchTerm,
    ]
  );

  const header = useCallback(
    () => (
      <View>
        <View className="w-full flex-row justify-between items-center my-2">
          <Text
            className="text-gray-400 font-bold"
            style={{ fontFamily: "Cairo-Bold" }}
          >
            نتائج البحث
          </Text>
        </View>

        <View className="w-full">
          <BottomSheetTextInput
            inputMode="search"
            returnKeyType="search"
            returnKeyLabel="Search"
            autoCorrect={false}
            autoCapitalize="none"
            defaultValue={searchTerm}
            className="w-full rounded-lg text-base leading-5 p-2 bg-gray-200 text-black"
            style={{ fontFamily: "Cairo-Regular" }}
            placeholder="ادخل كلمات البحث"
            placeholderTextColor={"#000"}
            onSubmitEditing={(event) => {
              handleSearch(event.nativeEvent.text);
            }}
          />
        </View>

        {isSearching && (
          <View className="w-full flex-row justify-between items-center my-2">
            <Text className="text-black" style={{ fontFamily: "Cairo-Medium" }}>
              نتائج البحث...
            </Text>
          </View>
        )}
      </View>
    ),
    [isSearching, searchTerm, handleSearch]
  );

  const footer = useCallback(
    () => (
      <View className="w-full flex-row justify-between items-center my-2">
        {isSearching && (
          <View className="flex-row items-center">
            <ActivityIndicator animating />
            <Text
              className="ml-1 text-black"
              style={{ fontFamily: "Cairo-Medium" }}
            >
              جلب النتائج...
            </Text>
          </View>
        )}

        {data.length > 0 &&
          data.length === searchResults.totalResults &&
          !isSearching && (
            <Text className="text-black" style={{ fontFamily: "Cairo-Medium" }}>
              لا توجد نتائج أخرى في الوقت الحالي...
            </Text>
          )}
      </View>
    ),
    [data.length, isSearching, searchResults.totalResults]
  );

  const empty = useCallback(
    () => (
      <View className="w-full flex-row justify-between items-center my-2">
        <Text className="text-gray-400" style={{ fontFamily: "Cairo-Medium" }}>
          لا نتائج...
        </Text>
      </View>
    ),
    []
  );

  const handleClose = useCallback(() => {
    clearSearchResults();
    setPage(1);
    setData([]);
  }, [clearSearchResults]);

  const fetchMoreData = useCallback(() => {
    if (searchResults.results.length > 0 && !isSearching) {
      search(searchTerm, page + 1, 20);
      setPage(page + 1);
    }
  }, [isSearching, page, search, searchResults.results.length, searchTerm]);

  useEffect(() => {
    if (searchResults.results.length > 0) {
      setData((oldState) => [...oldState, ...searchResults.results]);
    }
  }, [searchResults]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{ width: "100%", flex: 1, paddingHorizontal: 20 }}
        backgroundStyle={{ backgroundColor: theme.body.background }}
        onDismiss={handleClose}
      >
        <BottomSheetFlatList<SearchResultType>
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.cfi.concat(index.toString())}
          renderItem={renderItem}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          ListEmptyComponent={empty}
          style={{ width: "100%" }}
          maxToRenderPerBatch={20}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

SearchList.displayName = "SearchList";

// Styles replaced with Tailwind classes
