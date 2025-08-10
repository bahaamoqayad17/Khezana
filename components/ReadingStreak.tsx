import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function ReadingStreak() {
  const { t } = useTranslation();

  // Mock data for reading achievements
  const stats = [
    { icon: "👥", value: "1,247", label: t("participants") },
    { icon: "📚", value: "15,382", label: t("books_read") },
    { icon: "📈", value: "98.5%", label: t("improvement_rate") },
    { icon: "📅", value: "156", label: t("consecutive_days") },
  ];

  const achievements = [
    {
      title: t("top_reader"),
      subtitle: t("advanced_level"),
      position: 1,
      user: t("mahmoud_alqasemi"),
      days: 47,
      books: 23,
      points: 1200,
      avatar: "م",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-400",
    },
    {
      title: t("exceptional_reader"),
      subtitle: t("professional_level"),
      position: 2,
      user: t("fatema_alzahra"),
      days: 42,
      books: 18,
      points: 980,
      avatar: "ف",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-400",
    },
    {
      title: t("good_reader"),
      subtitle: t("intermediate_level"),
      position: 3,
      user: t("nour_salem"),
      days: 38,
      books: 15,
      points: 850,
      avatar: "ن",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-400",
    },
    {
      title: t("good_reader"),
      subtitle: t("intermediate_level"),
      position: 4,
      user: t("tariq_hassan"),
      days: 35,
      books: 14,
      points: 780,
      avatar: "ط",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
    },
    {
      title: t("good_reader"),
      subtitle: t("intermediate_level"),
      position: 5,
      user: t("nayel_qasemi"),
      days: 32,
      books: 12,
      points: 720,
      avatar: "ن",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
    },
    {
      title: t("good_reader"),
      subtitle: t("intermediate_level"),
      position: 6,
      user: t("hadi_khalil"),
      days: 30,
      books: 11,
      points: 680,
      avatar: "ه",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
    },
  ];

  return (
    <ScrollView className="flex-1 px-6">
      {/* Statistics Cards */}
      <View className="flex-row flex-wrap justify-between mb-6">
        {stats.map((stat, index) => (
          <View
            key={index}
            className="w-[48%] bg-white rounded-xl p-4 mb-3 items-center border border-gray-200"
          >
            <Text className="text-2xl mb-2">{stat.icon}</Text>
            <Text className="text-xl font-SomarBold text-gray-800">
              {stat.value}
            </Text>
            <Text className="text-xs font-SomarMedium text-gray-600 text-center">
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Achievement Buttons */}
      <View className="flex-row justify-between mb-6">
        <View className="bg-yellow-500 rounded-lg px-4 py-2 flex-1 mr-2">
          <Text className="text-white font-SomarBold text-center text-sm">
            {t("current_level")}
          </Text>
        </View>
        <View className="bg-gray-300 rounded-lg px-4 py-2 flex-1 ml-2">
          <Text className="text-gray-700 font-SomarBold text-center text-sm">
            {t("previous_level")}
          </Text>
        </View>
      </View>

      {/* Leaderboard */}
      <View className="space-y-3">
        {achievements.map((achievement, index) => (
          <View
            key={index}
            className={`rounded-xl p-4 border-2 ${achievement.bgColor} ${achievement.borderColor}`}
          >
            <View className="flex-row items-center justify-between">
              {/* Left Section */}
              <View className="flex-row items-center flex-1">
                {/* Position Badge */}
                <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-SomarBold text-sm">
                    {achievement.position}
                  </Text>
                </View>

                {/* Avatar */}
                <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-SomarBold text-lg">
                    {achievement.avatar}
                  </Text>
                </View>

                {/* User Info */}
                <View className="flex-1">
                  <Text className="text-base font-SomarBold text-gray-800">
                    {achievement.user}
                  </Text>
                  <Text className="text-sm font-SomarMedium text-gray-600">
                    {achievement.title}
                  </Text>
                  <Text className="text-xs font-SomarMedium text-gray-500">
                    {achievement.subtitle}
                  </Text>
                </View>
              </View>

              {/* Right Section - Stats */}
              <View className="items-end">
                <Text className="text-sm font-SomarMedium text-gray-600">
                  {achievement.days} {t("day")} • {achievement.books}{" "}
                  {t("book")}
                </Text>
                <Text className="text-lg font-SomarBold text-primary">
                  {achievement.points}
                </Text>
                <Text className="text-xs font-SomarMedium text-gray-500">
                  {t("points")}
                </Text>
              </View>
            </View>

            {/* Medal for top 3 */}
            {achievement.position <= 3 && (
              <View className="absolute top-2 right-2">
                <Text className="text-lg">
                  {achievement.position === 1
                    ? "🥇"
                    : achievement.position === 2
                      ? "🥈"
                      : "🥉"}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
