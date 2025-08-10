import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function AuthorDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Author Details</Text>
    </View>
  );
}
