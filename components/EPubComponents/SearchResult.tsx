import { SearchResult as SearchResultType } from "@epubjs-react-native/core";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  searchTerm: string;
  searchResult: SearchResultType;
  onPress: (searchResult: SearchResultType) => void;
}

function SearchResult({ searchTerm, searchResult, onPress }: Props) {
  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = searchResult.excerpt.split(regex);
  return (
    <TouchableOpacity
      key={searchResult.cfi}
      className="w-full flex-row justify-between items-center my-2"
      onPress={() => onPress(searchResult)}
    >
      <View className="justify-center items-center">
        <Ionicons name="bookmark" color={"#000"} size={20} />
      </View>

      <View className="flex-1 ml-3">
        <Text numberOfLines={1} className="mb-1 text-black">
          الفصل: {searchResult.section?.label}
        </Text>

        <View>
          <Text
            className="italic text-black"
            onPress={() => {
              onPress(searchResult);
            }}
          >
            &quot;
            {parts.filter(String).map((part, index) => {
              return regex.test(part) ? (
                <Text className="bg-yellow-300" key={`${index}-part-highlight`}>
                  {part}
                </Text>
              ) : (
                <Text key={`${index}-part`} className="text-black">
                  {part}
                </Text>
              );
            })}
            &quot;
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Styles replaced with Tailwind classes

export default SearchResult;
