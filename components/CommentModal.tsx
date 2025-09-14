import CloseIcon from "@/icons/Close";
import SendIcon from "@/icons/Send";
import { addComment } from "@/store/BlogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  postId: number;
}

export default function CommentModal({
  visible,
  onClose,
  postId,
}: CommentModalProps) {
  const { t } = useTranslation();
  const { comments } = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState("");
  const translateY = useRef(new Animated.Value(0)).current;

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ postId: postId, body: newComment }));

      setNewComment("");
    }
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT * 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      translateY.setValue(0);
      onClose();
    });
  };

  // Pan responder for swipe down gesture
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return (
        gestureState.dy > 5 &&
        Math.abs(gestureState.dx) < Math.abs(gestureState.dy)
      );
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      const { dy, vy } = gestureState;

      // Close modal if swiped down significantly or with fast velocity
      if (dy > 100 || vy > 0.5) {
        closeModal();
      } else {
        // Return to original position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {}, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-end bg-black/50"
        onPress={closeModal}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={{
              height: SCREEN_HEIGHT * 0.5,
              transform: [{ translateY }],
            }}
            className="bg-white rounded-t-3xl"
            {...panResponder.panHandlers}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1"
            >
              {/* Header */}
              <TouchableOpacity className="self-end p-4" onPress={closeModal}>
                <CloseIcon />
              </TouchableOpacity>
              <View className="flex-row items-center justify-between border-b border-gray-200"></View>

              {/* Comments List */}
              <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingVertical: 16 }}
              >
                {comments.length === 0 ? (
                  <View className="flex-1 justify-center items-center py-12">
                    <Text className="text-gray-500 text-center font-SomarRegular">
                      {t(
                        "no_comments",
                        "No comments yet. Be the first to comment!"
                      )}
                    </Text>
                  </View>
                ) : (
                  <>
                    {comments.map((comment, index) => (
                      <View
                        key={comment.id}
                        className={`flex-row items-center p-4 gap-2 rounded-lg ${index === comments.length - 1 ? "mb-4" : "mb-6"}`}
                        style={{
                          backgroundColor: "#FBF7F1",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            router.push(`/user/${comment.user.user_id}`)
                          }
                          className="w-8 h-8 rounded-full bg-purple-500 items-center justify-center"
                        >
                          {comment.user.user_image_url ? (
                            <Image
                              source={{
                                uri: comment.user.user_image_url?.startsWith(
                                  "http"
                                )
                                  ? comment.user.user_image_url
                                  : `${process.env.EXPO_PUBLIC_API_URL}storage/${comment.user.user_image_url}`,
                              }}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <Text className="text-white font-medium text-xs">
                              {comment.user.user_name.charAt(0).toUpperCase()}
                            </Text>
                          )}
                        </TouchableOpacity>

                        <View className="flex-1">
                          <View className="bg-gray-100 rounded-lg p-3">
                            <Text className="font-SomarBold text-gray-900 text-lg mb-1">
                              {comment.user.user_name}
                            </Text>
                            <Text className="text-gray-700 font-SomarRegular text-sm leading-5">
                              {comment.body}
                            </Text>
                          </View>
                        </View>

                        <View className="self-start">
                          <Text className="text-gray-500 font-SomarRegular text-xs">
                            {comment.created_at}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </>
                )}
              </ScrollView>

              {/* Comment Input */}
              <View className="p-4 border-t border-gray-200 bg-white">
                <View className="flex-row items-center">
                  <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
                    <TextInput
                      value={newComment}
                      onChangeText={setNewComment}
                      placeholder={t("add_comment", "Add a comment...")}
                      multiline
                      className="flex-1 text-sm max-h-24 font-SomarBold"
                      placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity
                      onPress={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className={`py-1 rounded-full`}
                    >
                      <SendIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
