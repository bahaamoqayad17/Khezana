import AuthGuard from "@/components/AuthGuard";
import React from "react";
import { Text, View } from "react-native";

export default function Books() {
  return (
    <AuthGuard>
      <View>
        <Text>Books</Text>
      </View>
    </AuthGuard>
  );
}
