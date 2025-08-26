import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import TextEditor from "@/components/form/TextEditor";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import { fetchPosts } from "@/store/BlogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Community() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title={t("community")} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <TextEditor />

        {loading && (
          <View className="py-2">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </View>
        )}

        {error && (
          <View className="flex-1 justify-center items-center py-8">
            <Text className="text-red-500 text-center mx-4">{error}</Text>
          </View>
        )}

        {!loading && !error && posts.length === 0 && (
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-500 text-lg">
              {t("no_posts", "No posts available")}
            </Text>
          </View>
        )}

        {!loading && !error && posts.length > 0 && (
          <View className="py-2 mt-10">
            {posts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
