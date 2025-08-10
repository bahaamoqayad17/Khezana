import ListenedIcon from "@/icons/Listened";
import PagesIcon from "@/icons/Pages";
import { Book } from "@/store/models.type";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BookComponentProps {
  book: Book;
}

export default function BookComponent({ book }: BookComponentProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      className="rounded-xl p-4 flex-row gap-2 mb-4"
      onPress={() => router.push(`/books/${book.id}`)}
      style={{
        borderWidth: 1,
        borderColor: "#E7E7E7",
      }}
    >
      {/* Book Cover */}
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${book.image}`,
        }}
        className="rounded-lg"
        style={{ width: 80, height: 100 }}
        resizeMode="cover"
      />

      {/* Book Information */}
      <View className="flex-1 justify-between">
        {/* Book Title */}
        <Text className="text-lg font-SomarRegular text-secondary mb-2 leading-6">
          {book.title}
        </Text>

        {/* Author */}
        <Text className="text-sm text-secondary font-SomarMedium mb-3">
          {t("author")}: {book.author}
        </Text>

        {/* Book Stats */}
        <View className="flex-row gap-2 items-center">
          {/* Minutes (estimated reading time) */}
          <View className="flex-row items-center gap-1">
            <ListenedIcon />
            <Text className="text-xs text-secondary font-SomarMedium">
              {Math.ceil(book.pages * 2)} {t("minute")}
            </Text>
          </View>
          {/* Pages */}
          <View className="flex-row items-center gap-1">
            <PagesIcon />
            <Text className="text-xs text-secondary font-SomarMedium">
              {book.pages} {t("page")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
