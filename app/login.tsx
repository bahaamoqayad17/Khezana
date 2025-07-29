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

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("email_invalid").required("email_required"),
  password: Yup.string().min(6, "password_min").required("password_required"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      console.log("Login values:", values);
      router.replace("/(tabs)");
      // TODO: Implement login logic
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
    // TODO: Navigate to forgot password screen
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
                {t("login")}
              </Text>
            </View>

            {/* Login Form */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
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
                  {/* Email Field */}
                  <View className="mt-10">
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
                  <View className="mt-10">
                    <FieldWrap
                      firstSuffix={<LockIcon />}
                      lastSuffix={
                        <TouchableOpacity
                          onPress={() => setShowPassword(!showPassword)}
                          className="p-1"
                        >
                          <Ionicons
                            name={
                              !showPassword ? "eye-outline" : "eye-off-outline"
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

                  {/* Forgot Password */}
                  <View className="mt-2">
                    <TouchableOpacity onPress={() => router.replace("/")}>
                      <Text className="text-gray-600 font-SomarRegular text-sm">
                        {t("forgot_password")}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Login Button */}
                  <View className="mt-8">
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className="bg-secondary rounded-xl p-4 w-full mt-10"
                    >
                      <Text className="text-white font-SomarBlack text-center">
                        {t("login")}
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
                {t("dont_have_account")}
                {"   "}
              </Text>
              <TouchableOpacity onPress={() => router.replace("/register")}>
                <Text className="text-primary font-SomarBlack text-center">
                  {t("register")}
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

export default Login;
