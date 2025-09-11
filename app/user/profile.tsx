import AuthorProfile from "@/components/AuthorProfile";
import PlainTitle from "@/components/PlainTitle";
import PublisherProfile from "@/components/PublisherProfile";
import UserProfile from "@/components/UserProfile";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView } from "react-native";

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PlainTitle title={t("personal_information")} />

      <ScrollView className="flex-1 px-4 py-6">
        {user?.author ? (
          <AuthorProfile user={user.author} />
        ) : user?.publisher ? (
          <PublisherProfile user={user.publisher} />
        ) : (
          <UserProfile user={user} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
