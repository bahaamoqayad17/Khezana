import Header from "@/components/Header";
import BookSkeleton from "@/components/skeletons/BookSkeleton";
import { fetchBooksCategories } from "@/store/CategorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";

export default function BooksCategory() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { books_categories, loading } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchBooksCategories(id as string));
  }, [id]);

  if (loading) {
    return (
      <>
        <Header title={""} />
        <View className="mx-4">
          <BookSkeleton count={5} />
        </View>
      </>
    );
  }

  console.log("id", id);
  console.log(books_categories);

  return (
    <SafeAreaView>
      <Header title={""} />
      <View>
        <Text>Book Categories</Text>
      </View>
    </SafeAreaView>
  );
}
