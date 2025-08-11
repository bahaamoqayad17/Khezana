import CategoriesIcon from "@/icons/Categories";
import GlobalIcon from "@/icons/Global";
import LevelIcon from "@/icons/Level";
import NoteIcon from "@/icons/Note";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import Dropdown from "./form/Dropdown";

export default function SearchForm({
  performSearch,
}: {
  performSearch: () => void;
}) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState("");
  const [selectedEducationLevel, setSelectedEducationLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Sample data - replace with your actual data
  const states = [
    "الجزائر",
    "وهران",
    "قسنطينة",
    "عنابة",
    "باتنة",
    "سطيف",
    "سيدي بلعباس",
    "بسكرة",
    "تلمسان",
    "بجاية",
  ];

  const educationLevels = [
    t("primary_middle_secondary"),
    "جامعي",
    "ماجستير",
    "دكتوراه",
  ];

  const languages = [
    t("arabic_english_technology"),
    "العربية",
    "الإنجليزية",
    "الفرنسية",
    "التكنولوجيا",
  ];

  const types = [
    t("summaries_reviews_notes"),
    "ملخصات",
    "مراجعات",
    "ملاحظات",
    "كتب إلكترونية",
  ];

  return (
    <View className="px-5 py-4">
      {/* State Dropdown */}
      <Dropdown
        label={t("state")}
        placeholder={t("state")}
        options={states}
        value={selectedState}
        onSelect={setSelectedState}
        icon={<GlobalIcon />}
      />

      {/* Education Level Dropdown */}
      <Dropdown
        label={t("education_level")}
        placeholder={t("primary_middle_secondary")}
        options={educationLevels}
        value={selectedEducationLevel}
        onSelect={setSelectedEducationLevel}
        icon={<LevelIcon />}
      />

      {/* Language Dropdown */}
      <Dropdown
        label={t("language")}
        placeholder={t("arabic_english_technology")}
        options={languages}
        value={selectedLanguage}
        onSelect={setSelectedLanguage}
        icon={<CategoriesIcon color={null} />}
      />

      {/* Type Dropdown */}
      <Dropdown
        label={t("type")}
        placeholder={t("summaries_reviews_notes")}
        options={types}
        value={selectedType}
        onSelect={setSelectedType}
        icon={<NoteIcon />}
      />

      {/* Filter Actions */}
      <View className="flex-row justify-between px-5 py-4 gap-2">
        <TouchableOpacity
          onPress={() => {
            // Clear all filters and refresh search
            router.setParams({
              state: "",
              educationLevel: "",
              language: "",
              type: "",
            });
          }}
          className="flex-1 py-3 rounded-lg border border-gray-200"
        >
          <Text className="text-center text-gray-600 font-SomarMedium">
            {t("clear_filters")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // Apply filters and close panel
            performSearch();
          }}
          className="flex-1 py-3 rounded-lg bg-secondary"
        >
          <Text className="text-center text-white font-SomarMedium">
            {t("apply_filters")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
