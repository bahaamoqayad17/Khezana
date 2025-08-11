import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import CartIcon from "@/icons/Cart";
import FilterIcon from "@/icons/Filter";
import NotificationIcon from "@/icons/Notification";
import SearchIcon from "@/icons/Search";
import SubscriptionIcon from "@/icons/Subscription";
import { router } from "expo-router";
import { FieldWrap, Input } from "./form";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");

  const handleCartPress = () => {
    console.log("Cart pressed");
  };

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    console.log("Search:", text);
  };

  const handleFilterPress = () => {
    // Navigate to search page with current search query
    router.push({
      pathname: "/search",
      params: {
        q: searchValue,
      },
    });
  };

  const handleSearchSubmit = () => {
    // Navigate to search page when user submits search
    if (searchValue.trim()) {
      router.push({
        pathname: "/search",
        params: {
          q: searchValue.trim(),
        },
      });
    }
  };

  return (
    <View className="px-5 pt-20 pb-10">
      {/* Top Row - Title and Icons */}
      <View className="flex-row items-center justify-between mb-4">
        {/* Notification Icon */}
        <TouchableOpacity
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
          {title}
        </Text>

        {/* Shopping Cart Icon */}
        <TouchableOpacity onPress={handleCartPress} className="p-2">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={handleCartPress}>
              <CartIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <NotificationIcon />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <FieldWrap
        firstSuffix={
          <TouchableOpacity onPress={handleFilterPress}>
            <FilterIcon />
          </TouchableOpacity>
        }
        lastSuffix={
          <TouchableOpacity onPress={handleSearchSubmit}>
            <SearchIcon />
          </TouchableOpacity>
        }
      >
        <Input
          name="search"
          value={searchValue}
          onChangeText={handleSearchChange}
          placeholder={t("search_placeholder")}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
      </FieldWrap>
    </View>
  );
};

export default Header;
