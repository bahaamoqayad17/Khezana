import CategoriesIcon from "@/icons/Categories";
import { useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Dropdown from "./form/Dropdown";

export default function SearchForm({
  searchParams,
  onSearchInputChange,
  onCategoryChange,
  searchValue,
}: {
  searchParams?: {
    category?: string;
  };
  onSearchInputChange?: (text: string) => void;
  onCategoryChange?: (category: string) => void;
  searchValue?: string;
}) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.category || ""
  );
  const { home } = useAppSelector((state) => state.books);

  // Get category name by ID for display
  const getCategoryNameById = (categoryId: string) => {
    const category = home.categories.find(
      (cat) => cat.category_id.toString() === categoryId
    );
    return category ? category.category_name : "";
  };

  // Reset form when searchParams are empty (indicating a reset)
  useEffect(() => {
    if (!searchParams?.category) {
      setSelectedCategory("");
    }
  }, [searchParams]);

  return (
    <ScrollView className="px-5">
      {/* Category Dropdown */}
      <Dropdown
        label={t("category")}
        placeholder={t("category")}
        options={home.categories.map((category) => ({
          label: category.category_name,
          value: category.category_id.toString(),
        }))}
        value={getCategoryNameById(selectedCategory)}
        onSelect={(value) => {
          setSelectedCategory(value);
          onCategoryChange?.(value);
        }}
        icon={<CategoriesIcon color={null} />}
      />

      {/* Clear Filters Button */}
      <View className="px-5 py-4">
        <TouchableOpacity
          onPress={() => {
            router.setParams({
              q: "",
              category: "",
            });
          }}
          className="py-3 px-6 rounded-lg border border-gray-200"
        >
          <Text className="text-center text-gray-600 font-SomarMedium">
            {t("clear_filters")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
