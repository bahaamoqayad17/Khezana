import BookHome from "@/components/BookHome";
import Header from "@/components/Header";
import SliderCarousel from "@/components/Slider";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import ViewAllIcon from "@/icons/ViewAll";
import { fetchHomePage } from "@/store/BookSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Book } from "@/store/models.type";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { home, loading, error } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchHomePage());
  }, []);

  if (loading || !home) {
    return <HomeSkeleton />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView className="flex-1 pb-10">
      <Header title="" />
      <ScrollView className="flex-1" style={{ marginHorizontal: 20 }}>
        <SliderCarousel sliders={home?.slides} />
        <View className="mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-2"
          >
            {home.categories?.map((category, index) => (
              <TouchableOpacity
                key={index}
                className="px-4 py-2 border border-primary rounded-xl mr-3"
                style={{ backgroundColor: "#FFFBFB" }}
              >
                <Text className="text-tertiary text-lg font-SomarRegular font-bold">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {home.categories_with?.map((item, index) => (
            <View key={index}>
              <View className="flex-row justify-between items-center mt-10">
                <Text className="font-SomarBold text-2xl">{item.name}</Text>
                <TouchableOpacity
                  className="flex-row items-center gap-2"
                  onPress={() => console.log("pressed")}
                >
                  <Text className="font-SomarBold text-primary">
                    {t("view_all")}
                  </Text>
                  <ViewAllIcon />
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4"
                contentContainerStyle={{
                  gap: 16,
                }}
              >
                {item.books?.map((book: Book, index: number) => (
                  <BookHome book={book} key={index} />
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
