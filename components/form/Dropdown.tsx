import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value?: string;
  onSelect: (value: string) => void;
  icon?: React.ReactNode;
}

export default function Dropdown({
  label,
  placeholder,
  options,
  value,
  onSelect,
  icon,
}: DropdownProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mb-4">
      {/* Label */}
      <Text className="text-base font-SomarBold text-gray-800 mb-2">
        {label}
      </Text>

      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex-row items-center justify-between"
        style={{ minHeight: 56 }}
      >
        <View className="flex-row items-center flex-1">
          {icon && <View className="mr-3">{icon}</View>}
          <Text
            className={`flex-1 font-SomarRegular ${
              value ? "text-gray-800" : "text-gray-500"
            }`}
          >
            {value || placeholder}
          </Text>
        </View>

        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isOpen && (
        <View className="bg-white border border-gray-200 rounded-xl mt-1 shadow-sm">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`p-4 ${
                index !== options.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <Text className="text-gray-800 font-SomarRegular">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
