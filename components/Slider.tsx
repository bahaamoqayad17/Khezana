import { Slider } from "@/store/models.type";
import { useEffect, useRef, useState } from "react";
import {
  AppState,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function SliderCarousel({ sliders }) {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setIsActive(nextAppState === "active");
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isActive && sliders?.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          let nextIndex = prevIndex + 1;
          if (nextIndex >= sliders?.length) {
            nextIndex = 0;
          }
          scrollViewRef.current?.scrollTo({
            x: nextIndex * screenWidth * 0.9,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, sliders?.length]);

  console.log(sliders);

  return (
    <View style={styles.card}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{ height: 200 }}
      >
        {sliders?.map((item: Slider) => (
          <View key={item?.id} style={styles.slide}>
            <ImageBackground
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}${item?.image}`,
              }}
              style={styles.imageBackground}
              imageStyle={styles.image}
            ></ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    margin: 20,
    marginHorizontal: 0,
    backgroundColor: "#fff",
    padding: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  slide: {
    width: screenWidth * 0.9,
    height: 180,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  image: {
    borderRadius: 12,
    objectFit: "contain",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 15,
  },
  customButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#E2D784F9",
  },
});
