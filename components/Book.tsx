import DeleteCartIcon from "@/icons/DeleteCart";
import GiftIcon from "@/icons/Gift";
import InCartIcon from "@/icons/InCart";
import ListenedIcon from "@/icons/Listened";
import PagesIcon from "@/icons/Pages";
import { removeFromCart } from "@/store/CartSlice";
import { useAppDispatch } from "@/store/hooks";
import { Book } from "@/store/models.type";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import GiftBookModal from "./modals/GiftBookModal";

export default function BookComponent({ book }: { book: Book }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [showGiftModal, setShowGiftModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleGift = async (email: string, message: string) => {
    console.log(
      "Gifting book:",
      book.book_title,
      "to:",
      email,
      "message:",
      message
    );
    // TODO: Implement actual gift API call
    // You can add your gift API logic here
  };

  return (
    <TouchableOpacity
      className="rounded-xl p-4 flex-row gap-2 mb-4"
      onPress={() => router.push(`/books/${book.book_id}`)}
      style={{
        borderWidth: 1,
        borderColor: "#F5ECDF",
      }}
    >
      {/* Book Cover */}
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${book.book_cover_image}`,
        }}
        className="rounded-lg"
        style={{ width: 80, height: 100 }}
        resizeMode="cover"
      />

      {/* Book Information */}
      <View className="flex-1 justify-between">
        {/* Book Title */}
        <Text className="text-lg font-SomarRegular text-secondary mb-2 leading-6">
          {book.book_title}
        </Text>

        {/* Author */}
        <Text className="text-sm text-secondary font-SomarMedium mb-3">
          {t("author")}: {book.author?.author_name || "Unknown"}
        </Text>

        {/* Book Stats */}
        <View className="flex-row items-center justify-between">
          {/* Minutes (estimated reading time) */}
          <View className="flex-row items-center gap-1">
            <View className="flex-row items-center gap-1">
              <ListenedIcon />
              <Text className="text-xs text-secondary font-SomarMedium">
                {Math.ceil(book.book_page_count * 2)} {t("minute")}
              </Text>
            </View>
            {/* Pages */}
            <View className="flex-row items-center gap-1">
              <PagesIcon />
              <Text className="text-xs text-secondary font-SomarMedium">
                {book.book_page_count} {t("page")}
              </Text>
            </View>
          </View>

          {pathname === "/books" && (
            <TouchableOpacity onPress={() => setShowGiftModal(true)}>
              <GiftIcon />
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-row items-center justify-between">
          {pathname === "/cart" && (
            <Text className="text-xl text-primary font-SomarMedium">
              {book.book_price} {t("dzd")}
            </Text>
          )}
        </View>
      </View>

      {/* show delete and in cart icons when the page is cart */}
      {pathname === "/cart" && (
        <View className="items-center justify-between">
          <TouchableOpacity
            onPress={() => dispatch(removeFromCart(book.book_id))}
            className="flex-row items-center gap-2"
          >
            <DeleteCartIcon />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <InCartIcon />
          </View>
        </View>
      )}

      {/* Gift Modal */}
      <GiftBookModal
        visible={showGiftModal}
        onClose={() => setShowGiftModal(false)}
        book={book}
        onGift={handleGift}
      />
    </TouchableOpacity>
  );
}
