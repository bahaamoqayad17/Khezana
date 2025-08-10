import BookComponent from "@/components/Book";
import PublisherPageSkeleton from "@/components/skeletons/PublisherPageSkeleton";
import FollowIcon from "@/icons/Follow";
import InstagramIcon from "@/icons/Instagram";
import ShareIcon from "@/icons/Share";
import TelegramIcon from "@/icons/Telegram";
import UserFacebookIcon from "@/icons/UserFacebook";
import WhatsappIcon from "@/icons/Whatsapp";
import YoutubeIcon from "@/icons/Youtube";
import { fetchPublisher } from "@/store/UserSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PublisherDetails() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { publisher, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"brief" | "contact">("brief");

  useEffect(() => {
    dispatch(fetchPublisher(Number(id)));
  }, [id, dispatch]);

  if (loading) {
    return <PublisherPageSkeleton />;
  }

  if (!publisher) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-lg font-SomarBold text-gray-600">
          {t("publisher_not_found")}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white pb-10">
      {/* Header */}
      <View className="flex-row items-center justify-between gap-2 px-5 pt-20 pb-10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={26} color="#65382C" />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-SomarBold text-primary text-center">
            {t("publisher")}
          </Text>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity onPress={() => {}}>
            <ShareIcon />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Publisher Profile Section */}
        <View className="px-4">
          <View className="items-center">
            {/* Publisher Image */}
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}storage/${publisher.image}`,
              }}
              className="rounded-full shadow-lg"
              style={{ width: 120, height: 120 }}
              resizeMode="cover"
            />

            {/* Publisher Name */}
            <Text className="text-xl font-SomarBold text-primary mt-4 text-center">
              {publisher.publisher_name}
            </Text>

            {/* Publisher Stats */}
            <View className="flex-row justify-center items-center mt-4">
              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  عدد الكتب
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="vertical-line" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  عدد القراءات
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="vertical-line" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  متابعين
                </Text>
              </View>

              {/* Vertical Line */}
              <View className="vertical-line" />

              <View className="items-center flex-1">
                <Text className="text-xl font-SomarBold text-gray-800">
                  350
                </Text>
                <Text className="text-xs text-gray-600 font-SomarMedium">
                  المتابعة
                </Text>
              </View>
            </View>

            {/* Follow Button */}
            <TouchableOpacity
              className="py-3 rounded-lg mt-4 flex-row items-center justify-center gap-2"
              style={{ backgroundColor: "#D4A574", width: "75%" }}
            >
              <Text className="text-white font-SomarRegular">متابعة</Text>
              <FollowIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="px-4 mb-4 mt-4">
          <View className="flex-row justify-center">
            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("brief")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "brief" ? "text-primary" : "text-secondary"
                }`}
              >
                {t("brief")}
              </Text>
              {activeTab === "brief" && (
                <View className="active-tab-underline" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 items-center py-3 relative"
              onPress={() => setActiveTab("contact")}
            >
              <Text
                className={`text-base font-SomarBold ${
                  activeTab === "contact" ? "text-primary" : "text-secondary"
                }`}
              >
                {t("contact_us")}
              </Text>
              {activeTab === "contact" && (
                <View className="active-tab-underline" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        {activeTab === "brief" ? (
          <View className="mx-4">
            {/* Brief - Description */}
            <View
              className="bg-white rounded-xl p-6 mb-4 mt-4"
              style={{
                borderWidth: 1,
                borderColor: "#E7E7E7",
              }}
            >
              <Text className="text-lg font-SomarBold text-gray-800 mb-3">
                {t("brief")}
              </Text>
              <Text className="text-gray-600 font-SomarMedium leading-6">
                {publisher.description}
              </Text>
            </View>

            {/* Publisher Books */}
            <View className="space-y-4">
              <Text className="text-lg font-SomarBold text-gray-800 mb-3">
                {t("books")}
              </Text>
              {publisher.books && publisher.books.length > 0 ? (
                publisher.books.map((book) => (
                  <BookComponent key={book.id} book={book} />
                ))
              ) : (
                <View className="bg-white rounded-xl p-8 items-center">
                  <Text className="text-gray-500 font-SomarMedium">
                    {t("no_books_available")}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View className="mx-4">
            {/* Contact - Social Media */}
            {publisher.social_links && (
              <View
                className="bg-white rounded-xl p-4 mb-4 mt-4"
                style={{
                  borderWidth: 1,
                  borderColor: "#E7E7E7",
                }}
              >
                <View className="flex-row justify-center gap-4">
                  {publisher.social_links.facebook && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(publisher.social_links.facebook)
                      }
                      className="w-12 h-12 rounded-full items-center justify-center"
                    >
                      <UserFacebookIcon />
                    </TouchableOpacity>
                  )}
                  {publisher.social_links.instagram && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(publisher.social_links.instagram)
                      }
                      className="w-12 h-12 rounded-full items-center justify-center"
                    >
                      <InstagramIcon />
                    </TouchableOpacity>
                  )}
                  {publisher.social_links.whatsapp && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(publisher.social_links.whatsapp)
                      }
                      className="w-12 h-12 rounded-full items-center justify-center"
                    >
                      <WhatsappIcon />
                    </TouchableOpacity>
                  )}
                  {publisher.social_links.telegram && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(publisher.social_links.telegram)
                      }
                      className="w-12 h-12 rounded-full items-center justify-center"
                    >
                      <TelegramIcon />
                    </TouchableOpacity>
                  )}
                  {publisher.social_links.youtube && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(publisher.social_links.youtube)
                      }
                      className="w-12 h-12 rounded-full items-center justify-center"
                    >
                      <YoutubeIcon />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* Publisher Books in Contact Tab too */}
            <View className="space-y-4">
              <Text className="text-lg font-SomarBold text-gray-800 mb-3">
                {t("books")}
              </Text>
              {publisher.books && publisher.books.length > 0 ? (
                publisher.books.map((book) => (
                  <BookComponent key={book.id} book={book} />
                ))
              ) : (
                <View className="bg-white rounded-xl p-8 items-center">
                  <Text className="text-gray-500 font-SomarMedium">
                    {t("no_books_available")}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
