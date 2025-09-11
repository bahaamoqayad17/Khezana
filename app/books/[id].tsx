import BookPageSkeleton from "@/components/skeletons/BookPageSkeleton";
import AddReviewIcon from "@/icons/AddReview";
import AuthorIcon from "@/icons/Author";
import CategoryIcon from "@/icons/Category";
import ListenIcon from "@/icons/Listen";
import PublisherIcon from "@/icons/Publisher";
import ReadIcon from "@/icons/Read";
import ReviewIcon from "@/icons/Review";
import SaveIcon from "@/icons/Save";
import ShareIcon from "@/icons/Share";
import { fetchBook } from "@/store/BookSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookDetails() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { book, loading } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"reviews" | "about">("about");
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [id, dispatch]);

  if (loading) {
    return <BookPageSkeleton />;
  }

  if (!book) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-lg font-SomarBold text-gray-600">
          {t("book_not_found")}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View
        className={`flex-row items-center justify-between gap-2 px-5 pt-20 pb-10`}
      >
        {/* Title Text */}

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={26} color="#65382C" />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <Text className={`text-lg font-SomarBold text-primary text-center`}>
            {book.book_title}
          </Text>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity onPress={() => {}}>
            <ShareIcon />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <SaveIcon isSaved={true} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Book Cover and Info */}
        <View className="px-4 pb-10">
          <View
            className="items-center justify-center relative"
            style={{ height: 250 }}
          >
            {/* Background Image */}
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${book.book_cover_image}`,
              }}
              className="absolute inset-0 w-full h-full rounded-lg"
              style={{ width: "100%", height: "100%", opacity: 0.1 }}
              resizeMode="cover"
            />

            {/* Foreground Content */}
            <View className="relative z-10 items-center justify-center">
              <Image
                source={{
                  uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${book.book_cover_image}`,
                }}
                className="rounded-lg shadow-lg"
                style={{ width: 150, height: 200 }}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Title and Stats Section */}
          <View className="items-center mt-10">
            <Text className="text-lg font-SomarBold text-primary mb-6 text-center">
              {book.book_title}
            </Text>

            {/* Book Stats */}
            <View className="flex-row justify-between w-full px-4">
              <View className="items-center">
                <Text className="text-sm text-primary font-SomarRegular">
                  {t("rating")}
                </Text>
                <View className="flex-row items-center">
                  <ReviewIcon />
                  <Text className="text-lg font-SomarRegular text-gray-200">
                    {book.rating}
                  </Text>
                </View>
              </View>

              <View className="items-center">
                <Text className="text-sm text-primary font-SomarRegular">
                  {t("language")}
                </Text>
                <Text className="text-lg font-SomarRegular text-gray-200">
                  {book.book_language}
                </Text>
              </View>

              <View className="items-center">
                <Text className="text-sm text-primary font-SomarRegular">
                  {t("pages")}
                </Text>
                <Text className="text-lg font-SomarRegular text-gray-200">
                  {book.book_page_count}
                </Text>
              </View>

              <View className="items-center">
                <Text className="text-sm text-primary font-SomarRegular">
                  {t("number_of_reads")}
                </Text>
                <Text className="text-lg font-SomarRegular text-gray-200">
                  {book.reads_count}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="px-4 mb-4">
          <View className="flex-row justify-center">
            {/* General Categories Tab */}
            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("about")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "about" ? "text-primary" : "text-secondary"
                }`}
              >
                {t("about_book")}
              </Text>
              {/* Active Tab Underline */}
              {activeTab === "about" && (
                <View className="active-tab-underline" />
              )}
            </TouchableOpacity>

            {/* Educational Categories Tab */}
            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("reviews")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "reviews" ? "text-primary" : "text-secondary"
                }`}
              >
                {t("reviews")}
              </Text>
              {/* Active Tab Underline */}
              {activeTab === "reviews" && (
                <View className="active-tab-underline" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        {activeTab === "reviews" ? (
          <View className="mx-4">
            {/* Overall Rating */}
            <View className="rounded-xl p-4 mb-4 flex-row items-center justify-between gap-2">
              <Text className="text-sm font-SomarMedium text-gray-600">
                {t("reviews")}
              </Text>
              <View className="items-center">
                <Text className="text-3xl font-SomarBold text-gray-800 mb-1">
                  {book.rating}
                </Text>
                <View className="bg-orange-100 px-3 py-1 rounded-full mb-2">
                  <Text className="text-orange-600 text-sm font-SomarMedium">
                    {t("rating")} +{book.number_of_ratings}
                  </Text>
                </View>
              </View>
            </View>

            {/* Reviews List */}
            <View className="space-y-4">
              {/* Add Comment Section */}
              <View className="bg-white rounded-xl p-4 mb-4 flex-row gap-2">
                {/* User Header with Stars */}

                {/* Input Section */}
                <View className="items-center justify-center gap-2">
                  <TouchableOpacity className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center">
                    <Text className="text-white font-SomarBold text-sm">
                      أنت
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <Text className="font-SomarBold text-gray-800 text-right mr-3">
                        محمد
                      </Text>
                    </View>
                    <View className="flex-row">
                      {[...Array(5)].map((_, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => setUserRating(i + 1)}
                        >
                          <Ionicons
                            name="star"
                            size={16}
                            color={i < userRating ? "#F4A261" : "#E5E5E5"}
                            style={{ marginLeft: 2 }}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <TextInput
                    placeholder={t("add_comment")}
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 rounded-lg p-4 pr-16 font-SomarMedium relative flex-1"
                    multiline
                    numberOfLines={5}
                    textAlign="right"
                    style={{
                      borderColor: "#E5E5E5",
                      borderWidth: 1,
                      minHeight: 80,
                    }}
                  />
                  <TouchableOpacity
                    className="absolute bottom-4 right-4"
                    style={{
                      right: 10,
                      bottom: 10,
                    }}
                    onPress={() => {
                      console.log("add review");
                    }}
                  >
                    <AddReviewIcon />
                  </TouchableOpacity>
                </View>
              </View>

              {book?.reviews?.map((review, index) => (
                <View key={index} className="bg-white rounded-xl p-4">
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-center">
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center mr-3`}
                      >
                        <Text className={`font-SomarBold`}>{review.user}</Text>
                      </View>
                      <Text className="font-SomarBold text-gray-800">
                        {review.user}
                      </Text>
                    </View>
                    <View className="flex-row">
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={14}
                          color={i < review.rating ? "#F4A261" : "#E5E5E5"}
                        />
                      ))}
                    </View>
                  </View>
                  {review.comment ? (
                    <Text className="text-gray-600 text-sm leading-6">
                      {review.comment}
                    </Text>
                  ) : (
                    <View className="bg-gray-50 rounded-lg p-3 mb-2">
                      <Text className="text-gray-400 text-sm">
                        {t("write_your_message")}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View className="mx-4">
            {/* About Book Cards */}

            <View
              className="bg-white rounded-xl p-4 mb-4 m-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 5, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
                borderWidth: 1,
                borderColor: "#e7e7e7",
              }}
            >
              <View className="flex-row justify-around mb-4 gap-2">
                {/* Author Card */}

                {/* Publisher Card */}
                <TouchableOpacity
                  className="book-details-card"
                  onPress={() =>
                    router.push(`/user/${book.publisher?.user_id}`)
                  }
                >
                  <View className="w-12 h-12 bg-amber-600 rounded-xl items-center justify-center mb-3">
                    <PublisherIcon />
                  </View>
                  <Text className="text-sm font-SomarBold text-amber-800 mb-1">
                    {t("publisher")}
                  </Text>
                  <Text className="text-xs font-SomarMedium text-amber-700 text-center">
                    {book.publisher?.publisher_name}
                  </Text>
                </TouchableOpacity>

                {/* Category Card */}
                <TouchableOpacity
                  className="book-details-card"
                  onPress={() =>
                    router.push(
                      `/books_category?id=${book.category?.category_id}&name=${book.category?.category_name}`
                    )
                  }
                >
                  <View className="w-12 h-12 bg-amber-600 rounded-xl items-center justify-center mb-3">
                    <CategoryIcon />
                  </View>
                  <Text className="text-sm font-SomarBold text-amber-800 mb-1">
                    {t("category")}
                  </Text>
                  <Text className="text-xs font-SomarMedium text-amber-700 text-center">
                    {book.category?.category_name}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="book-details-card"
                  onPress={() => router.push(`/user/${book.author?.user_id}`)}
                >
                  <View className="w-12 h-12 bg-amber-800 rounded-full items-center justify-center mb-3">
                    <AuthorIcon />
                  </View>
                  <Text className="text-sm font-SomarBold text-amber-800 mb-1">
                    {t("author_name")}
                  </Text>
                  <Text className="text-xs font-SomarMedium text-amber-700 text-center">
                    {book.author?.author_name}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="">
                <Text className="text-gray-600 font-SomarBold leading-7">
                  {book.book_description}
                </Text>
              </View>
            </View>

            {/* Book Description */}

            {/* Related Books */}
            <View className="bg-white rounded-xl p-4 mb-4">
              <Text className="text-lg font-SomarBold text-gray-800 mb-3">
                {t("related_books")}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {book?.related_books?.map((relatedBook) => (
                  <TouchableOpacity
                    key={relatedBook.book_id}
                    className="mr-4 items-center"
                    style={{ width: 100 }}
                  >
                    <Image
                      source={{
                        uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${relatedBook.book_cover_image}`,
                      }}
                      className="rounded-lg"
                      style={{ width: 80, height: 120 }}
                      resizeMode="cover"
                    />
                    <Text className="text-sm font-SomarMedium text-gray-700 mt-2 text-center">
                      {relatedBook.book_title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Bottom Action Buttons */}
        <View className="bg-white px-4 py-3 mb-10">
          <View className="flex-row gap-2">
            <TouchableOpacity className="flex-1 flex-row gap-2 justify-center bg-secondary py-3 rounded-lg items-center">
              <Text className="text-white font-SomarBold">{t("read")}</Text>
              <ReadIcon />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row gap-2 justify-center bg-primary py-3 rounded-lg items-center">
              <Text className="text-white font-SomarBold">{t("listen")}</Text>
              <ListenIcon />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
