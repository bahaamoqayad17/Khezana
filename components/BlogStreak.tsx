import LikedIcon from "@/icons/Liked";
import SteakBlog1 from "@/icons/SteakBlog1";
import SteakBlog2 from "@/icons/SteakBlog2";
import SteakBlog3 from "@/icons/SteakBlog3";
import SteakBlog4 from "@/icons/SteakBlog4";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function BlogStreak() {
  const { t } = useTranslation();

  // Mock data for forum achievements
  const achievements = [
    {
      title: t("forum_engagement"),
      user: t("basem_amin"),
      count: 20468,
      type: "posts",
      icon: <SteakBlog1 />,
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
    },
    {
      title: t("forum_likes"),
      user: t("basem_amin"),
      count: 2046,
      type: "likes",
      icon: <SteakBlog2 />,
      bgColor: "bg-red-50",
      iconBg: "bg-red-500",
    },
    {
      title: t("active_members"),
      user: t("basem_amin"),
      count: 5056,
      type: "members",
      icon: <SteakBlog3 />,
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-500",
    },
    {
      title: t("golden_articles"),
      user: t("basem_amin"),
      count: 1054,
      type: "articles",
      icon: <SteakBlog4 />,
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500",
    },
  ];

  const electronicComments = [
    { user: t("basem_amin"), count: 254 },
    { user: t("basem_amin"), count: 254 },
    { user: t("basem_amin"), count: 254 },
    { user: t("basem_amin"), count: 254 },
    { user: t("basem_amin"), count: 254 },
    { user: t("basem_amin"), count: 254 },
  ];

  const AchievementCard = ({ achievement }: { achievement: any }) => (
    <View className="w-[48%] bg-white rounded-xl p-4 shadow-sm mb-3">
      <View className="flex-row items-center justify-between mb-3">
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: achievement.color + "20" }}
        >
          <Text className="text-xl">{achievement.icon}</Text>
        </View>
        <Text className="text-2xl font-SomarBlack">{achievement.count}</Text>
      </View>
      <Text className="text-lg font-SomarBold text-gray-700 mb-1">
        {achievement.title}
      </Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 px-6">
      {/* Achievement Cards - 2x2 Grid */}
      <View className="mb-6 mt-4">
        <View className="flex-row flex-wrap gap-3 justify-between">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
            />
          ))}
        </View>
      </View>

      {/* Electronic Comments Section */}
      <View className="mb-6">
        <Text className="text-lg font-SomarBold text-gray-800 mb-4">
          {t("most_liked_articles")}
        </Text>

        <View className="gap-4">
          {electronicComments.map((comment, index) => (
            <View
              key={index}
              className="bg-white rounded-xl p-6 relative overflow-hidden"
              style={{
                borderLeftWidth: 5,
                borderLeftColor: "#FFD700",
                elevation: 1,
              }}
            >
              {/* Main Content */}
              <View className="flex-row items-center">
                {/* Position Badge - Top Right */}
                <View
                  className="rounded-full items-center justify-center"
                  style={{ width: 32, height: 32 }}
                >
                  <Text
                    className="font-SomarBold text-lg"
                    style={{ color: "#888888" }}
                  >
                    {index + 1}
                  </Text>
                </View>
                {/* Left Side - Avatar */}
                <View className="mr-4">
                  <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center">
                    <Text className="text-white font-SomarBold text-xl">ا</Text>
                  </View>
                </View>

                {/* Center - User Info */}
                <View className="flex-1 flex-row items-center justify-between gap-2">
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-lg font-SomarBold text-gray-800">
                        ابتسام عيسى الشندويلي
                      </Text>
                    </View>

                    {/* Description */}
                    <Text className="text-sm font-SomarRegular text-gray-600 mb-3">
                      نصائح لتحسين مهارات القراءة السريعة
                    </Text>
                  </View>

                  {/* Stats Row */}
                  <View
                    className="flex-row items-center gap-4"
                    style={{
                      backgroundColor: "#F5ECDF",
                      borderRadius: 10,
                      padding: 4,
                      paddingHorizontal: 8,
                    }}
                  >
                    <View className="flex-row items-center gap-2">
                      <LikedIcon />
                      <Text className="text-lg font-SomarBold text-blue-500">
                        {comment.count}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
