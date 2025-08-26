import PublicPublisherProfile from "@/components/profiles/PublicPublisherProfile";
import PublicUserProfile from "@/components/profiles/PublicUserProfile";
import SelfUserProfile from "@/components/profiles/SelfUserProfile";
import UserProfileSkeleton from "@/components/skeletons/UserProfileSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { User } from "@/store/models.type";
import { fetchUserProfile } from "@/store/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";

export default function UserDetails() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const id = params.id as string;
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile(Number(id)));
    const fetchCurrentUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    };
    fetchCurrentUser();
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

      {user.author || user.publisher ? (
        <>
          {currentUser?.user_id === user.user_id ? null : (
            <PublicPublisherProfile user={user} />
          )}
        </>
      ) : (
        <>
          {currentUser?.user_id === user.user_id ? (
            <SelfUserProfile user={user} />
          ) : (
            <PublicUserProfile user={user} />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
