import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mock search result data - replace with your actual data structure
const mockSearchResults = [
  {
    id: 1,
    title: "الجامع لما صح في السنن والمسانيد والجوامع",
    author: "محمد بحيص سليمان",
    type: "كتاب",
    image: "https://via.placeholder.com/60x80/FFA500/FFFFFF?text=كتاب",
  },
  {
    id: 2,
    title: "إنتسام",
    author: "كاتب",
    type: "كاتب",
    image: "https://via.placeholder.com/60x60/4285F4/FFFFFF?text=إنتسام",
    isRound: true,
  },
  {
    id: 3,
    title: "الجامع لما صح في السنن والمسانيد والجوامع",
    author: "محمد بحيص سليمان",
    type: "كتاب",
    image: "https://via.placeholder.com/60x80/FFA500/FFFFFF?text=كتاب",
  },
  {
    id: 4,
    title: "عيسان",
    author: "ناشر",
    type: "ناشر",
    image: "https://via.placeholder.com/60x60/4285F4/FFFFFF?text=عيسان",
    isRound: true,
  },
  {
    id: 5,
    title: "الجامع لما صح في السنن والمسانيد والجوامع",
    author: "محمد بحيص سليمان",
    type: "كتاب",
    image: "https://via.placeholder.com/60x80/FFA500/FFFFFF?text=كتاب",
  },
  {
    id: 6,
    title: "توفيق",
    author: "قارئ",
    type: "قارئ",
    image: "https://via.placeholder.com/60x60/4285F4/FFFFFF?text=توفيق",
    isRound: true,
  },
];

export default function Search() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const [searchResults, setSearchResults] = useState([]);

  // Get search parameters from route
  const searchQuery = params.q as string;
  const selectedState = params.state as string;
  const selectedEducationLevel = params.educationLevel as string;
  const selectedLanguage = params.language as string;
  const selectedType = params.type as string;

  useEffect(() => {
    // Perform search based on parameters
    console.log("searchQuery", searchQuery);
    if (searchQuery) {
      performSearch();
    }
  }, [
    searchQuery,
    selectedState,
    selectedEducationLevel,
    selectedLanguage,
    selectedType,
  ]);

  const performSearch = async () => {
    // Simulate API call
    setTimeout(() => {
      // Here you would call your actual search API
      // For now, we're using mock data
      setSearchResults(mockSearchResults);
    }, 1000);
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
          router.push(`/authors/${item.id}`);
        } else if (item.type === "ناشر") {
          router.push(`/publishers/${item.id}`);
        } else if (item.type === "قارئ") {
          router.push(`/user/${item.id}`);
        }
      }}
    >
      {/* Item Image */}
      <Image
        source={{ uri: item.image }}
        className={item.isRound ? "rounded-full mr-4" : "rounded-lg mr-4"}
        style={{ width: 60, height: item.isRound ? 60 : 80 }}
        resizeMode="cover"
      />

      {/* Item Details */}
      <View className="flex-1">
        <Text className="text-lg font-SomarBold text-gray-800 mb-1">
          {item.title}
        </Text>
        <Text className="text-sm font-SomarMedium text-gray-600">
          {item.author}
        </Text>
        <Text className="text-xs font-SomarRegular text-primary mt-1">
          {item.type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      <Header title={t("search_results")} />

      {/* Search Summary */}
      {searchQuery && (
        <View className="px-5 py-3 bg-white border-b border-gray-100">
          <Text className="text-sm font-SomarMedium text-gray-600 text-right">
            {t("search_results_for")}: "{searchQuery}"
          </Text>
          <Text className="text-xs font-SomarRegular text-gray-500 text-right mt-1">
            {t("found_results", { count: searchResults.length })}
          </Text>
        </View>
      )}

      {/* Filter Panel */}

      {searchResults.length > 0 ? (
        <View className="justify-center items-center px-4">
          {searchResults.map(renderSearchResult)}
        </View>
      ) : (
        <SearchForm performSearch={performSearch} />
      )}
    </SafeAreaView>
  );
}
