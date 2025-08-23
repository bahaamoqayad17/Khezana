import AuthGuard from "@/components/AuthGuard";
import BookComponent from "@/components/Book";
import Header from "@/components/Header";
import BookSkeleton from "@/components/skeletons/BookSkeleton";
import { fetchCart } from "@/store/CartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Cart() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (cart.userCart.length === 0) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Header title={t("cart")} />
        <View className="mx-4">
          <BookSkeleton count={5} />
        </View>
      </>
    );
  }

  return (
    <AuthGuard>
      <SafeAreaView>
        <Header title={t("cart")} />
        {cart.userCart.map((item: any, index: number) => (
          <View key={index} className="mx-4">
            <BookComponent
              book={{
                id: item.id,
                title: item.book_title,
                rating: item.book_rating,
                number_of_ratings: item.book_number_of_ratings,
                image: item.book_image_url,
                price: item.book_price,
                description: item.book_description,
                pages: item.book_number_pages,
                author: item.author_id,
              }}
            />
          </View>
        ))}

        <View className="mt-8 mx-4">
          <TouchableOpacity
            onPress={() => {}}
            className="bg-secondary rounded-xl p-4 w-full mt-10"
            disabled={loading}
          >
            <Text className="text-white font-SomarBlack text-center">
              {t("buy_now")} {cart.sumPrice} {t("dzd")} ({cart.bookCount}
              {t("book")})
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
}
