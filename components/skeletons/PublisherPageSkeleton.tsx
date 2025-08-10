import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const PublisherPageSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* Header Skeleton */}
      <View className="flex-row items-center justify-between gap-2 px-5 pt-20 pb-10">
        <Animated.View
          className="w-8 h-8 bg-gray-200 rounded-full"
          style={{ opacity }}
        />
        <Animated.View
          className="w-24 h-6 bg-gray-200 rounded"
          style={{ opacity }}
        />
        <Animated.View
          className="w-8 h-8 bg-gray-200 rounded-full"
          style={{ opacity }}
        />
      </View>

      {/* Publisher Profile Section */}
      <View className="px-4">
        <View className="items-center">
          {/* Publisher Image Skeleton */}
          <Animated.View
            className="bg-gray-200 rounded-full mb-4"
            style={[{ width: 120, height: 120 }, { opacity }]}
          />

          {/* Publisher Name Skeleton */}
          <Animated.View
            className="w-40 h-6 bg-gray-200 rounded mb-4"
            style={{ opacity }}
          />

          {/* Stats Row Skeleton */}
          <View className="flex-row justify-center items-center mt-4 w-full">
            <View className="items-center flex-1">
              <Animated.View
                className="w-8 h-6 bg-gray-200 rounded mb-1"
                style={{ opacity }}
              />
              <Animated.View
                className="w-12 h-4 bg-gray-200 rounded"
                style={{ opacity }}
              />
            </View>

            <Animated.View
              className="w-px h-8 bg-gray-200 mx-2"
              style={{ opacity }}
            />

            <View className="items-center flex-1">
              <Animated.View
                className="w-8 h-6 bg-gray-200 rounded mb-1"
                style={{ opacity }}
              />
              <Animated.View
                className="w-16 h-4 bg-gray-200 rounded"
                style={{ opacity }}
              />
            </View>

            <Animated.View
              className="w-px h-8 bg-gray-200 mx-2"
              style={{ opacity }}
            />

            <View className="items-center flex-1">
              <Animated.View
                className="w-8 h-6 bg-gray-200 rounded mb-1"
                style={{ opacity }}
              />
              <Animated.View
                className="w-12 h-4 bg-gray-200 rounded"
                style={{ opacity }}
              />
            </View>

            <Animated.View
              className="w-px h-8 bg-gray-200 mx-2"
              style={{ opacity }}
            />

            <View className="items-center flex-1">
              <Animated.View
                className="w-8 h-6 bg-gray-200 rounded mb-1"
                style={{ opacity }}
              />
              <Animated.View
                className="w-12 h-4 bg-gray-200 rounded"
                style={{ opacity }}
              />
            </View>
          </View>

          {/* Follow Button Skeleton */}
          <Animated.View
            className="rounded-lg mt-4 h-12"
            style={[{ width: "75%", backgroundColor: "#E0E0E0" }, { opacity }]}
          />
        </View>
      </View>

      {/* Tabs Skeleton */}
      <View className="px-4 mb-4 mt-6">
        <View className="flex-row justify-center">
          <View className="flex-1 items-center py-3">
            <Animated.View
              className="w-16 h-5 bg-gray-200 rounded"
              style={{ opacity }}
            />
          </View>
          <View className="flex-1 items-center py-3">
            <Animated.View
              className="w-20 h-5 bg-gray-200 rounded"
              style={{ opacity }}
            />
          </View>
        </View>
      </View>

      {/* Content Section Skeleton */}
      <View className="mx-4">
        {/* Brief Card Skeleton */}
        <View
          className="bg-white rounded-xl p-6 mb-4"
          style={{
            borderWidth: 1,
            borderColor: "#E7E7E7",
          }}
        >
          <Animated.View
            className="w-16 h-5 bg-gray-200 rounded mb-3"
            style={{ opacity }}
          />
          <Animated.View
            className="w-full h-4 bg-gray-200 rounded mb-2"
            style={{ opacity }}
          />
          <Animated.View
            className="w-full h-4 bg-gray-200 rounded mb-2"
            style={{ opacity }}
          />
          <Animated.View
            className="w-3/4 h-4 bg-gray-200 rounded"
            style={{ opacity }}
          />
        </View>

        {/* Books Section Title Skeleton */}
        <Animated.View
          className="w-16 h-6 bg-gray-200 rounded mb-3"
          style={{ opacity }}
        />

        {/* Books List Skeleton */}
        {[1, 2, 3].map((item) => (
          <View
            key={item}
            className="rounded-xl p-4 flex-row gap-2 mb-4"
            style={{
              borderWidth: 1,
              borderColor: "#E7E7E7",
            }}
          >
            {/* Book Cover Skeleton */}
            <Animated.View
              className="bg-gray-200 rounded-lg"
              style={[{ width: 80, height: 100 }, { opacity }]}
            />

            {/* Book Info Skeleton */}
            <View className="flex-1 justify-between">
              <Animated.View
                className="w-3/4 h-5 bg-gray-200 rounded mb-2"
                style={{ opacity }}
              />
              <Animated.View
                className="w-1/2 h-4 bg-gray-200 rounded mb-3"
                style={{ opacity }}
              />

              {/* Stats Skeleton */}
              <View className="flex-row gap-2 items-center">
                <View className="flex-row items-center gap-1">
                  <Animated.View
                    className="w-4 h-4 bg-gray-200 rounded"
                    style={{ opacity }}
                  />
                  <Animated.View
                    className="w-12 h-3 bg-gray-200 rounded"
                    style={{ opacity }}
                  />
                </View>
                <View className="flex-row items-center gap-1">
                  <Animated.View
                    className="w-4 h-4 bg-gray-200 rounded"
                    style={{ opacity }}
                  />
                  <Animated.View
                    className="w-10 h-3 bg-gray-200 rounded"
                    style={{ opacity }}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PublisherPageSkeleton;
