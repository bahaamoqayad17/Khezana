import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const Switch = ({
  onValueChange,
}: {
  onValueChange: (color: string) => void;
}) => {
  const colors = ["white", "black", "#fff2e4"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const toggleColor = (color: string) => {
    setSelectedColor(color);
    onValueChange(color);
  };

  return (
    <View className="flex-row w-11/12 items-center justify-around self-center my-2">
      {colors.map((color, index) => {
        const isSelected = color === selectedColor;
        return (
          <TouchableOpacity
            key={index}
            className={`w-10 h-10 rounded-full border ${
              isSelected
                ? "border-orange-400 border-2"
                : "border-gray-300 border"
            }`}
            style={{ backgroundColor: color }}
            onPress={() => toggleColor(color)}
          />
        );
      })}
    </View>
  );
};

// Styles replaced with Tailwind classes

export default Switch;
