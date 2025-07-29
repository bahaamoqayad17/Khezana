import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

export default function TimeFormater({ timestamp }: { timestamp: string }) {
  const { t } = useTranslation();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return `${t("since")} ${diffInMinutes} ${t("minutes")}`;
    } else if (diffInHours < 24) {
      return `${t("since")} ${diffInHours} ${t("hours")}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${t("since")} ${diffInDays} ${t("days")}`;
    }
  };
  return <Text className="font-SomarRegular">{formatDate(timestamp)}</Text>;
}
