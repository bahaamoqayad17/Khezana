import { FieldWrap, Input } from "@/components/form";
import Dropdown from "@/components/form/Dropdown";
import CartIcon from "@/icons/Cart";
import CategoriesIcon from "@/icons/Categories";
import FilterIcon from "@/icons/Filter";
import NotificationIcon from "@/icons/Notification";
import SearchIcon from "@/icons/Search";
import SubscriptionIcon from "@/icons/Subscription";
import { searchBooks } from "@/store/BookSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Search() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { home } = useAppSelector((state) => state.books);
  // Get search state from Redux
  const { searchResults, searchLoading, searchError } = useAppSelector(
    (state) => state.books
  );
  const [searchQuery, setSearchQuery] = useState({
    query: "",
    category_ids: 0,
  });

  const performSearch = useCallback(
    async (searchQuery: { query: string; category_ids: number }) => {
      try {
        await dispatch(
          searchBooks({
            query: searchQuery.query,
            category_ids: searchQuery.category_ids,
          })
        );
      } catch (error) {
        console.error("Search error:", error);
      }
    },
    [dispatch]
  );

  const getCategoryNameById = (categoryId: string) => {
    const category = home.categories.find(
      (cat) => cat.category_id.toString() === categoryId
    );
    return category ? category.category_name : "";
  };

  const renderSearchResult = (item: any) => (
    <TouchableOpacity
      key={item.id}
      className="flex-row items-center p-4 border-b border-gray-100"
      onPress={() => {
        // Navigate to specific item based on type
        if (item.type === "كتاب") {
          router.push(`/books/${item.id}`);
        } else if (item.type === "كاتب") {
          router.push(`/user/${item.id}`);
        } else if (item.type === "ناشر") {
          router.push(`/user/${item.id}`);
        } else if (item.type === "قارئ") {
          router.push(`/user/${item.id}`);
        }
      }}
    >
      {/* Item Image */}
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${item.image}`,
        }}
        className={item.isRound ? "rounded-full mr-4" : "rounded-lg mr-4"}
        style={{ width: 60, height: item.isRound ? 60 : 80 }}
        resizeMode="cover"
      />

      {/* Item Details */}
      <View className="flex-1 gap-2">
        <Text className="text-lg font-SomarBold text-primary">
          {item.title}
        </Text>
        <Text className="text-sm font-SomarMedium text-primary">
          {item.details}
        </Text>
        <Text
          className="text-xs font-SomarRegular text-primary mt-1 rounded-lg px-2 py-1"
          style={{ backgroundColor: "#F5ECDF", width: "15%" }}
        >
          {item.type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="px-5 pt-20 pb-10">
        {/* Top Row - Title and Icons */}
        <View className="flex-row items-center justify-between mb-4">
          {/* Notification Icon */}
          <TouchableOpacity
            // onPress={() => router.push("/epub-reader")}
            onPress={() => router.push("/subscriptions")}
            className="p-2"
          >
            <View className="flex-row items-center gap-2">
              <SubscriptionIcon />
              <Text className="text-md font-SomarBold text-tertiary">
                {t("subscriptions")}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-xl font-SomarBold text-black text-center flex-1">
            {t("search_results")}
          </Text>

          {/* Shopping Cart Icon */}
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={() => router.push("/(tabs)/cart")}>
              <CartIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <NotificationIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <FieldWrap
          firstSuffix={
            <TouchableOpacity onPress={() => {}}>
              <FilterIcon />
            </TouchableOpacity>
          }
          lastSuffix={
            <TouchableOpacity onPress={() => performSearch(searchQuery)}>
              <SearchIcon />
            </TouchableOpacity>
          }
        >
          <Input
            name="search"
            value={searchQuery.query}
            onChangeText={(text) =>
              setSearchQuery({ ...searchQuery, query: text })
            }
            placeholder={t("search_placeholder")}
            onSubmitEditing={() => performSearch(searchQuery)}
            returnKeyType="search"
          />
        </FieldWrap>
      </View>

      <ScrollView className="flex-1 px-5">
        {/* Category Dropdown */}
        <Dropdown
          label={t("category")}
          placeholder={t("category")}
          options={home.categories.map((category) => ({
            label: category.category_name,
            value: category.category_id.toString(),
          }))}
          value={getCategoryNameById(searchQuery.category_ids.toString())}
          onSelect={(value) => {
            setSearchQuery({ ...searchQuery, category_ids: parseInt(value) });
          }}
          icon={<CategoriesIcon color={null} />}
        />

        {/* Error State */}
        {searchError && (
          <View className="justify-center items-center mt-8 px-5">
            <Text className="text-red-500 text-center font-SomarMedium">
              {t("search_error")}: {searchError}
            </Text>
            <TouchableOpacity
              onPress={() => performSearch(searchQuery)}
              className="mt-4 px-6 py-3 bg-secondary rounded-lg"
            >
              <Text className="text-white font-SomarMedium">
                {t("try_again")}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading State */}
        {searchLoading && (
          <View className="justify-center items-center mt-8">
            <ActivityIndicator size="large" color="#65382C" />
            <Text className="text-gray-600 mt-4 font-SomarMedium">
              {t("searching")}...
            </Text>
          </View>
        )}

        {/* Search Results */}
        {!searchLoading && !searchError && searchResults?.length > 0 && (
          <View className="mt-4">{searchResults.map(renderSearchResult)}</View>
        )}

        {/* No Results Message */}
        {!searchLoading && !searchError && searchResults?.length === 0 && (
          <View className="justify-center items-center mt-8 px-5">
            <Text className="text-gray-500 text-center font-SomarMedium mb-4">
              {t("no_results_found")}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
