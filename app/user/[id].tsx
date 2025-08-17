import PublicUserProfile from "@/components/profiles/PublicUserProfile";
import UserProfileSkeleton from "@/components/skeletons/UserProfileSkeleton";
import { fetchUserProfile } from "@/store/UserSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";

export default function UserDetails() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile(Number(5)));
    // dispatch(fetchUserProfile(Number(id)));
  }, [id, dispatch]);

  if (loading) {
    return <UserProfileSkeleton />;
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-lg font-SomarBold text-gray-600">
          {t("user_not_found")}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white pb-10">
      {/* Header */}

      <PublicUserProfile user={user} />

      {/* {user.type === "user" && <SelfUserProfile user={user} />}

      {(user.type === "publisher" || user.type === "author") && (
        <PublicPublisherProfile user={user} />
      )} */}
    </SafeAreaView>
  );
}
