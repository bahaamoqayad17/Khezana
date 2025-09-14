import CommentIcon from "@/icons/Comment";
import LikeIcon from "@/icons/Like";
import SharePostIcon from "@/icons/SharePost";
import { fetchPostComments } from "@/store/BlogSlice";
import { useAppDispatch } from "@/store/hooks";
import { Post } from "@/store/models.type";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CommentModal from "./CommentModal";

export default function PostCard({ post }: { post: Post }) {
  const { t } = useTranslation();
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <View
      className="bg-white mx-4 my-2 p-4 rounded-xl shadow-sm"
      style={{
        borderColor: "#E7E7E7",
        borderWidth: 1,
      }}
    >
      {/* Header with user info */}
      <View className={`flex-row items-center mb-3`}>
        <TouchableOpacity
          onPress={() => router.push(`/user/${post.author.user_id}`)}
          className="w-10 h-10 rounded-full bg-purple-500 items-center justify-center mr-3"
        >
          {post.author.user_image_url ? (
            <Image
              source={{
                uri: post.author.user_image_url.startsWith("http")
                  ? post.author.user_image_url
                  : `${process.env.EXPO_PUBLIC_API_URL}storage/${post.author.user_image_url}`,
              }}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <Text className="text-white font-medium text-sm">
              {post.author.user_name.charAt(0).toUpperCase()}
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-1">
          <Text className={`font-medium text-gray-900 text-md font-SomarBold`}>
            {post.author.user_name}
          </Text>
          {/* <Text className={`text-gray-500 text-xs`}>
            {formatDate(post.created_at)}
          </Text> */}
        </View>

        {/* <TouchableOpacity className="p-1">
          <Text className="text-gray-400 text-lg">⋯</Text>
        </TouchableOpacity> */}
      </View>

      {/* Post content */}
      <View className="mb-4">
        {post.post_title && (
          <Text className={`font-semibold text-gray-900 text-base mb-2`}>
            {post.post_title}
          </Text>
        )}
        <Text className={`text-gray-700 text-sm leading-5`}>
          {post.post_body}
        </Text>
      </View>

      <View
        className="h-0.5 my-2 w-full"
        style={{
          backgroundColor: "#E7E7E7",
        }}
      />

      {/* Interaction buttons */}
      <View
        className={`flex-row items-center justify-between pt-3`}
        style={{ width: "50%", alignSelf: "flex-end" }}
      >
        <TouchableOpacity className={`flex-row items-center gap-2`}>
          <Text className="text-gray font-SomarRegular text-md">
            {post.post_likes_count}
          </Text>
          <LikeIcon />
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-row items-center gap-2`}
          onPress={() => {
            dispatch(fetchPostComments(post.post_id));
            setCommentModalVisible(true);
          }}
        >
          <Text className="text-gray font-SomarRegular text-md">
            {post.post_comments_count}
          </Text>
          <CommentIcon />
        </TouchableOpacity>
        <TouchableOpacity className={`flex-row items-center gap-2`}>
          <Text className="text-gray font-SomarRegular text-md">
            {t("share")}
          </Text>
          <SharePostIcon />
        </TouchableOpacity>
      </View>

      <CommentModal
        visible={commentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        postId={post.post_id}
      />
    </View>
  );
}
