import AuthGuard from "@/components/AuthGuard";
import BookComponent from "@/components/Book";
import Header from "@/components/Header";
import BookSkeleton from "@/components/skeletons/BookSkeleton";
import { userBooks } from "@/store/CartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Books() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { books, loading } = useAppSelector((state) => state.cart);
  const [activeTab, setActiveTab] = useState<"read" | "unread">("read");
  useEffect(() => {
    if (books.length === 0) {
      dispatch(userBooks());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Header title={t("my_books")} />
        <BookSkeleton count={5} />
      </>
    );
  }

  return (
    <AuthGuard>
      <SafeAreaView>
        <Header title={t("my_books")} />

        <View className="px-4 mb-4">
          <View className="flex-row justify-center">
            {/* General Categories Tab */}
            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("read")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "read" ? "text-primary" : "text-secondary"
                }`}
              >
                {t("have_read")}
              </Text>
              {/* Active Tab Underline */}
              {activeTab === "read" && (
                <View className="active-tab-underline" />
              )}
            </TouchableOpacity>

            {/* Educational Categories Tab */}
            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("unread")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "unread" ? "text-primary" : "text-secondary"
                }`}
              >
                {t("unread")}
              </Text>
              {/* Active Tab Underline */}
              {activeTab === "unread" && (
                <View className="active-tab-underline" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {books.map((item: any, index: number) => (
            <View key={index} className="mx-4">
              <BookComponent book={item} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </AuthGuard>
  );
}
