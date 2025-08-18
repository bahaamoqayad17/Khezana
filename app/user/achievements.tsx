import PlainTitle from "@/components/PlainTitle";
import ChainIcon from "@/icons/Chain";
import CompletedBooksIcon from "@/icons/CompletedBooks";
import ConsecutiveDaysIcon from "@/icons/ConsecutiveDays";
import FireIcon from "@/icons/Fire";
import HourlyRateIcon from "@/icons/HourlyRate";
import MonthlyReadIcon from "@/icons/MonthlyRead";
import ReadingDaysIcon from "@/icons/ReadingDays";
import ReadingHourIcon from "@/icons/ReadingHour";
import SmallFireIcon from "@/icons/SmallFire";
import StreakDaysIcon from "@/icons/StreakDays";
import WeeklyReadIcon from "@/icons/WeeklyRead";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Achievements() {
  const { t } = useTranslation();
  // Mock data for achievements
  const streakData = {
    days: 150,
    status: "consecutive",
  };

  const achievements = [
    {
      id: "reading_days",
      icon: <ChainIcon />,
      count: 206,
      title: "إجمالي أيام القراءة",
      color: "#FFB800",
    },
    {
      id: "reading_chain",
      icon: <ReadingDaysIcon />,
      count: 150,
      title: "أطول سلسلة",
      color: "#6366F1",
    },
    {
      id: "completed_books",
      icon: <CompletedBooksIcon />,
      count: 43,
      title: "كتاب مكتمل",
      subtitle: "5 هذا الشهر",
      color: "#F59E0B",
    },
    {
      id: "reading_hours",
      icon: <ReadingHourIcon />,
      count: 150,
      title: "ساعة قراءة",
      subtitle: "12 هذا الأسبوع",
      color: "#9CA3AF",
    },
    {
      id: "goal_achievement",
      icon: <StreakDaysIcon />,
      count: 43,
      title: "تحقيق الهدف",
      subtitle: "43 من 50 كتاب",
      color: "#EF4444",
    },
    {
      id: "consecutive_days",
      icon: <ConsecutiveDaysIcon />,
      count: 150,
      title: "يوم متتالي",
      subtitle: "أطول سلسلة مراجعة",
      color: "#EC4899",
    },
  ];

  const challenges = [
    {
      id: "monthly_reading",
      icon: <MonthlyReadIcon />,
      subtitle: "42 من 50 كتاب",
      progress: 84,
      color: "#FFB800",
    },
    {
      id: "weekly_challenge",
      subtitle: "3 من 4 كتب",
      icon: <WeeklyReadIcon />,
      progress: 75,
      color: "#6366F1",
    },
    {
      id: "reading_hours",
      subtitle: "16 من 20 ساعة",
      icon: <HourlyRateIcon />,
      progress: 80,
      color: "#9CA3AF",
    },
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
      {achievement.subtitle && (
        <Text className="text-sm font-SomarRegular text-secondary">
          {achievement.subtitle}
        </Text>
      )}
    </View>
  );

  const ChallengeCard = ({ challenge }: { challenge: any }) => (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center mb-3 gap-4">
        <View className="items-center justify-center">{challenge.icon}</View>
        <View className="flex-1">
          <View className="mb-3 gap-4">
            <Text className="text-base font-SomarBold text-gray-700 mb-1">
              {t(challenge.id as string)}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-500 font-SomarBold">
                {challenge.subtitle}
              </Text>
              <Text className="text-xs text-gray-500 font-SomarBold">
                {challenge.progress}% {t("completed")}
              </Text>
            </View>
          </View>
          <View className="gap-2">
            <View
              className="h-3 rounded-full overflow-hidden"
              style={{
                backgroundColor: challenge.color + "20",
              }}
            >
              <View
                className="h-full rounded-full"
                style={{
                  width: `${challenge.progress}%`,
                  backgroundColor: challenge.color,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        {/* Header */}
        <PlainTitle title={t("my_achievements")} />

        {/* Streak Card */}
        <View className="bg-secondary rounded-2xl p-8 mb-6items-center shadow-lg mb-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-4xl font-bold text-white mb-1">
              {streakData.days}
            </Text>
            <View
              className="p-4 py-2 rounded-full"
              style={{ backgroundColor: "#EAC190" }}
            >
              <FireIcon />
            </View>
          </View>

          <Text className="text-base text-white font-SomarBold mb-4">
            {t("consecutive_days")}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-lg text-white font-SomarRegular">
              {t("keep_reading")}
            </Text>
            <View
              className="text-white text-xs flex-row items-center gap-1 px-2 py-1 rounded-full"
              style={{ backgroundColor: "#EAC190" }}
            >
              <SmallFireIcon />
              <Text className="text-white font-SomarRegular">
                {t("active")}
              </Text>
            </View>
          </View>
        </View>

        {/* Achievements Section */}
        <View className="mb-6 mt-4">
          <Text className="text-xl font-SomarBold mb-4">{t("statistics")}</Text>
          <View className="flex-row flex-wrap gap-3 justify-between">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </View>
        </View>

        {/* Challenges Section */}
        <View className="mb-6">
          <Text className="text-xl font-SomarBold mb-4">{t("challenges")}</Text>
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
