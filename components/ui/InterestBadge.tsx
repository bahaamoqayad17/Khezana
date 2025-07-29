import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface InterestBadgeProps extends TouchableOpacityProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  selectedColor?: string;
  unselectedColor?: string;
}

const InterestBadge: React.FC<InterestBadgeProps> = ({
  label,
  isSelected,
  onToggle,
  size = "md",
  selectedColor = "bg-secondary border-secondary",
  unselectedColor = "bg-white border-gray-300",
  className = "",
  ...props
}) => {
  // Size variants
  const sizeVariants = {
    sm: "px-3 py-2 rounded-2xl border",
    md: "px-4 py-3 rounded-2xl border",
    lg: "px-5 py-4 rounded-2xl border",
  };

  const textSizeVariants = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`${sizeVariants[size]} ${
        isSelected ? selectedColor : unselectedColor
      } ${className}`}
      activeOpacity={0.7}
      {...props}
    >
      <Text
        className={`font-SomarRegular ${textSizeVariants[size]} ${
          isSelected ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default InterestBadge;
