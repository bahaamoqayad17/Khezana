import { Book } from "@/store/models.type";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export default function BookHome({ book }: { book: Book }) {
  return (
    <View className="w-[160px] bg-white rounded-xl shadow-md overflow-hidden p-2 mt-10">
      {/* Book Image */}
      <Image
        source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${book.image}` }}
        className="w-full h-40 rounded-md"
        resizeMode="cover"
      />

      {/* Book Info */}
      <View className="mt-2">
        <Text
          numberOfLines={1}
          className="text-sm text-gray-700 font-bold mb-1"
        >
          {book.title}
        </Text>

        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-bold text-black">{book.price} دج</Text>
          <FontAwesome name="lock" size={18} color="#999" />
        </View>
      </View>
    </View>
  );
}
