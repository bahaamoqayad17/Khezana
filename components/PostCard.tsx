import CommentIcon from "@/icons/Comment";
import LikeIcon from "@/icons/Like";
import SharePostIcon from "@/icons/SharePost";
import { fetchPostComments } from "@/store/BlogSlice";
import { useAppDispatch } from "@/store/hooks";
import { Post } from "@/store/models.type";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CommentModal from "./CommentModal";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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
        <View className="w-10 h-10 rounded-full bg-purple-500 items-center justify-center mr-3">
          {post.user.profile_image ? (
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}${post.user.profile_image}`,
              }}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <Text className="text-white font-medium text-sm">
              {post.user.name.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>

        <View className="flex-1">
          <Text className={`font-medium text-gray-900 text-md font-SomarBold`}>
            {post.user.name}
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
        {post.title && (
          <Text className={`font-semibold text-gray-900 text-base mb-2`}>
            {post.title}
          </Text>
        )}
        <Text className={`text-gray-700 text-sm leading-5`}>{post.body}</Text>
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
            {post.likes_count}
          </Text>
          <LikeIcon />
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-row items-center gap-2`}
          onPress={() => {
            dispatch(fetchPostComments(post.id));
            setCommentModalVisible(true);
          }}
        >
          <Text className="text-gray font-SomarRegular text-md">
            {post.comments_count}
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
      />
    </View>
  );
}
