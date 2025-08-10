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
      icon: "💬",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
    },
    {
      title: t("forum_likes"),
      user: t("basem_amin"),
      count: 2046,
      type: "likes",
      icon: "❤️",
      bgColor: "bg-red-50",
      iconBg: "bg-red-500",
    },
    {
      title: t("active_members"),
      user: t("basem_amin"),
      count: 5056,
      type: "members",
      icon: "💰",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-500",
    },
    {
      title: t("golden_articles"),
      user: t("basem_amin"),
      count: 1054,
      type: "articles",
      icon: "📝",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500",
    },
  ];

  const electronicComments = [
    { user: t("basem_amin"), count: 254 },
    { user: t("basem_amin"), count: 254 },
    { user: t("basem_amin"), count: 254 },
  ];

  return (
    <ScrollView className="flex-1 px-6">
      {/* Achievement Cards */}
      <View className="space-y-4 mb-6">
        {achievements.map((achievement, index) => (
          <View
            key={index}
            className={`rounded-xl p-4 ${achievement.bgColor} border border-gray-200`}
          >
            <View className="flex-row items-center justify-between">
              {/* Left Section */}
              <View className="flex-row items-center flex-1">
                <View
                  className={`w-12 h-12 ${achievement.iconBg} rounded-full items-center justify-center mr-4`}
                >
                  <Text className="text-xl">{achievement.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-SomarBold text-gray-800">
                    {achievement.count}
                  </Text>
                  <Text className="text-sm font-SomarMedium text-gray-600">
                    {achievement.title}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Electronic Comments Section */}
      <View className="mb-6">
        <Text className="text-lg font-SomarBold text-gray-800 mb-4">
          {t("electronic_comments")}
        </Text>

        <View className="space-y-3">
          {electronicComments.map((comment, index) => (
            <View
              key={index}
              className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200"
            >
              <View className="flex-row items-center justify-between">
                {/* Left Section */}
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-SomarBold text-lg">ب</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-SomarBold text-gray-800">
                      {comment.user}
                    </Text>
                    <Text className="text-sm font-SomarMedium text-gray-600">
                      {t("comment_improvement_desc")}
                    </Text>
                  </View>
                </View>

                {/* Right Section - Count */}
                <View className="items-center">
                  <View className="bg-blue-500 rounded-full px-3 py-1">
                    <Text className="text-white font-SomarBold text-sm">
                      {comment.count}
                    </Text>
                  </View>
                  <Text className="text-xs font-SomarMedium text-gray-500 mt-1">
                    👍
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Navigation Placeholder */}
      <View className="h-20" />
    </ScrollView>
  );
}
