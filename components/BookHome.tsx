import InCartIcon from "@/icons/InCart";
import { Book } from "@/store/models.type";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function BookHome({ book }: { book: Book }) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={() => router.push(`/books/${book.id}`)}>
      <View
        className="bg-white rounded-xl shadow-md overflow-hidden p-4 mt-10"
        style={{ width: 185 }}
      >
        {/* Book Image */}
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${book.cover_image}`,
          }}
          className="w-full rounded-md"
          style={{ height: 200 }}
          resizeMode="cover"
        />

        {/* Book Info */}
        <View className="mt-4">
          <Text className="text-sm text-secondary font-SomarBold mb-1">
            {book.title}
          </Text>

          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-sm font-SomarBold text-primary">
              {book.price} {t("dzd")}
            </Text>
            <InCartIcon />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
