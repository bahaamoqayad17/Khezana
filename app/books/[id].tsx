import { fetchBook } from "@/store/BookSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function BookDetails() {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { book, loading } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && id !== "undefined") {
      dispatch(fetchBook(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>{book?.title || "Book not found"}</Text>
    </View>
  );
}
