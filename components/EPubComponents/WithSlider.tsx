import { useReader } from "@epubjs-react-native/core";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Custom debounce hook implementation
const useDebounceCallback = (
  callback: (value: number) => void,
  delay: number
) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  return React.useCallback(
    (value: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(value), delay);
    },
    [callback, delay]
  );
};

export function Footer() {
  const { theme, totalLocations, injectJavascript, currentLocation } =
    useReader();
  const debounced = useDebounceCallback((percentage: number) => {
    injectJavascript(`
      try {
        const cfi = book.locations.cfiFromPercentage(${percentage} / 100);
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "onCfiFromPercentage", cfi })); true
      } catch (error) {
        alert(error?.message);
      }
    `);
  }, 1000);

  const currentPercentage = (currentLocation?.start.percentage || 0) * 100;

  return (
    <GestureHandlerRootView>
      <View
        className="px-3 justify-center"
        style={{ backgroundColor: theme.body.background }}
      >
        <Text
          className="text-right mb-2 font-bold text-sm"
          style={{ fontFamily: "Cairo-Bold" }}
        >
          النسبة الحالية: {currentPercentage.toFixed(0)}%
        </Text>

        <View className="flex-row justify-between items-center">
          <Text className="text-sm">0%</Text>

          {/* Simple slider replacement */}
          <View className="flex-1 mx-4 h-10 justify-center">
            <View className="h-2 bg-gray-300 rounded-full">
              <View
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${currentPercentage}%` }}
              />
            </View>
            <TouchableOpacity
              className="absolute w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-md"
              style={{
                left: `${Math.max(0, Math.min(95, currentPercentage - 2))}%`,
                top: -8,
              }}
              disabled={totalLocations === 0}
              onPress={() => {
                // Simple tap to seek - you can enhance this with gesture handling
                debounced(currentPercentage);
              }}
            />
          </View>

          <Text className="text-sm">100%</Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

// Styles replaced with Tailwind classes
