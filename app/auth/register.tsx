import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

import { FieldWrap, Input, Validation } from "@/components/form";
import OAuth from "@/components/OAuth";
import LockIcon from "@/icons/Lock";
import MailIcon from "@/icons/Mail";
import NameIcon from "@/icons/Name";
import axios from "@/utils/axios";
import getPushToken from "@/utils/PushToken";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("name_required"),
  email: Yup.string().email("email_invalid").required("email_required"),
  password: Yup.string().min(6, "password_min").required("password_required"),
  confirmPassword: Yup.string()
    .required("confirm_password_required")
    .oneOf([Yup.ref("password")], "passwords_must_match"),
});

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values: RegisterFormValues) => {
    const expo_push_token = await getPushToken();
    setIsLoading(true);
    try {
      const response = await axios.post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        expo_push_token,
      });

      await AsyncStorage.setItem("token", response.data.access_token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      showSuccessToast({
        title: t("register_success"),
        duration: 3000,
      });

      setTimeout(() => {
        router.replace("/interests");
      }, 1000);
    } catch (error) {
      showErrorToast({
        title: t("register_error"),
        duration: 3000,
      });

      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="max-w-24">
            <TouchableOpacity
              className="skip-button continue-externally"
              onPress={() => router.replace("/(tabs)")}
            >
              <Text className="font-SomarRegular text-primary">
                {t("continue_as_guest")}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 justify-center px-10 pt-8">
            {/* Continue Externally Button */}

            {/* Title */}
            <View className="items-center">
              <Text className="text-4xl font-SomarBold text-primary text-center">
                {t("register")}
              </Text>
            </View>

            {/* Register Form */}
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="space-y-6 mt-10">
                  {/* Name Field */}
                  <View className="mt-4">
                    <FieldWrap
                      firstSuffix={<NameIcon />}
                      isValid={!errors.name}
                      isTouched={touched.name}
                      className=""
                      invalidFeedback={errors.name ? t(errors.name) : undefined}
                    >
                      <Input
                        name="name"
                        value={values.name}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        placeholder={t("name")}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoComplete="name"
                      />
                    </FieldWrap>
                    <Validation
                      isValid={!errors.name}
                      isTouched={touched.name}
                      invalidFeedback={errors.name ? t(errors.name) : undefined}
                    >
                      {errors.name && touched.name ? t(errors.name) : ""}
                    </Validation>
                  </View>
                  <View className="mt-4">
                    <FieldWrap
                      firstSuffix={<MailIcon />}
                      isValid={!errors.email}
                      isTouched={touched.email}
                      className=""
                      invalidFeedback={
                        errors.email ? t(errors.email) : undefined
                      }
                    >
                      <Input
                        name="email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        placeholder={t("email")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                    </FieldWrap>
                    <Validation
                      isValid={!errors.email}
                      isTouched={touched.email}
                      invalidFeedback={
                        errors.email ? t(errors.email) : undefined
                      }
                    >
                      {errors.email && touched.email ? t(errors.email) : ""}
                    </Validation>
                  </View>

                  {/* Password Field */}
                  <View className="mt-4">
                    <FieldWrap
                      firstSuffix={<LockIcon />}
                      lastSuffix={
                        <TouchableOpacity
                          onPress={() => setShowPassword(!showPassword)}
                          className="p-1"
                        >
                          <Ionicons
                            name={
                              showPassword ? "eye-off-outline" : "eye-outline"
                            }
                            size={20}
                            color="#888888"
                          />
                        </TouchableOpacity>
                      }
                      isValid={!errors.password}
                      isTouched={touched.password}
                      invalidFeedback={
                        errors.password ? t(errors.password) : undefined
                      }
                    >
                      <Input
                        name="password"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        placeholder={t("password")}
                        secureTextEntry={!showPassword}
                      />
                    </FieldWrap>
                    <Validation
                      isValid={!errors.password}
                      isTouched={touched.password}
                      invalidFeedback={
                        errors.password ? t(errors.password) : undefined
                      }
                    >
                      {errors.password && touched.password
                        ? t(errors.password)
                        : ""}
                    </Validation>
                  </View>

                  {/* Confirm Password Field */}
                  <View className="mt-4">
                    <FieldWrap
                      firstSuffix={<LockIcon />}
                      lastSuffix={
                        <TouchableOpacity
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="p-1"
                        >
                          <Ionicons
                            name={
                              showConfirmPassword
                                ? "eye-off-outline"
                                : "eye-outline"
                            }
                            size={20}
                            color="#888888"
                          />
                        </TouchableOpacity>
                      }
                      isValid={!errors.confirmPassword}
                      isTouched={touched.confirmPassword}
                      invalidFeedback={
                        errors.confirmPassword
                          ? t(errors.confirmPassword)
                          : undefined
                      }
                    >
                      <Input
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        placeholder={t("confirm_password")}
                        secureTextEntry={!showConfirmPassword}
                      />
                    </FieldWrap>
                    <Validation
                      isValid={!errors.confirmPassword}
                      isTouched={touched.confirmPassword}
                      invalidFeedback={
                        errors.confirmPassword
                          ? t(errors.confirmPassword)
                          : undefined
                      }
                    >
                      {errors.confirmPassword && touched.confirmPassword
                        ? t(errors.confirmPassword)
                        : ""}
                    </Validation>
                  </View>

                  {/* Register Button */}
                  <View className="mt-10">
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className="bg-secondary rounded-xl p-4 w-full"
                      disabled={isLoading}
                    >
                      <Text className="text-white font-SomarBlack text-center">
                        {isLoading ? t("loading") : t("register")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>

            {/* Register Link */}
            <View
              className="flex-row justify-center items-center"
              style={{ marginTop: 16 }}
            >
              <Text className="font-SomarRegular text-center text-secondary">
                {t("already_have_account")}
                {"   "}
              </Text>
              <TouchableOpacity onPress={() => router.replace("/auth/login")}>
                <Text className="text-primary font-SomarBlack text-center">
                  {t("login")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Or Divider */}
            <View
              className="flex-row items-center justify-around"
              style={{ marginTop: 16 }}
            >
              <View className="or-line"></View>
              <Text className="text-primary font-SomarBold text-center">
                {t("or")}
              </Text>
              <View className="or-line"></View>
            </View>

            {/* Social Login */}
            <View className="items-center mb-8">
              <OAuth />
            </View>
          </View>

          <View
            className="justify-center items-center"
            style={{ bottom: "4%" }}
          >
            <Text className="text-secondary font-SomarRegular text-sm">
              من خلال تحديد إنشاء حساب أدناه ، أوافق على
            </Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="text-primary font-SomarRegular text-sm">
                شروط الخدمة وسياسة الخصوصية
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
