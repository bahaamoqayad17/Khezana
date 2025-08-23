import InCartIcon from "@/icons/InCart";
import OutCartIcon from "@/icons/OutCart";
import { addToCart, removeFromCart } from "@/store/CartSlice";

import { useAppDispatch } from "@/store/hooks";
import { Book } from "@/store/models.type";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function BookHome({ book }: { book: Book }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [item, setItem] = useState<Book>(book);

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
            {item.title}
          </Text>

          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-sm font-SomarBold text-primary">
              {item.price} {t("dzd")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (item.in_cart) {
                  dispatch(removeFromCart(item.id));
                  setItem({ ...item, in_cart: false });
                } else {
                  dispatch(addToCart(item.id));
                  setItem({ ...item, in_cart: true });
                }
              }}
            >
              {item.in_cart ? <InCartIcon /> : <OutCartIcon />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
