import LockIcon from "@/icons/Lock";
import MailIcon from "@/icons/Mail";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { FieldWrap, Input, Label, Validation } from "./index";

const FormExample = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Simple validation logic
  const isEmailValid = email.includes("@") && email.length > 3;
  const isPasswordValid = password.length >= 6;

  const emailError =
    emailTouched && !isEmailValid
      ? "Please enter a valid email address"
      : undefined;
  const passwordError =
    passwordTouched && !isPasswordValid
      ? "Password must be at least 6 characters"
      : undefined;

  return (
    <View className="p-4 space-y-4">
      {/* Split Design Email Field */}
      <View>
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <FieldWrap
          firstSuffix={<MailIcon />}
          isValid={isEmailValid}
          isTouched={emailTouched}
          invalidFeedback={emailError}
        >
          <Input
            name="email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => setEmailTouched(true)}
            placeholder="البريد الإلكتروني"
            keyboardType="email-address"
            autoCapitalize="none"
            className="text-right"
          />
        </FieldWrap>
        <Validation
          isValid={isEmailValid}
          isTouched={emailTouched}
          invalidFeedback={emailError}
        >
          {emailError || ""}
        </Validation>
      </View>

      {/* Split Design Password Field */}
      <View>
        <Label htmlFor="password">كلمة السر</Label>
        <FieldWrap
          firstSuffix={<LockIcon />}
          lastSuffix={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#888888"
              />
            </TouchableOpacity>
          }
          isValid={isPasswordValid}
          isTouched={passwordTouched}
          invalidFeedback={passwordError}
        >
          <Input
            name="password"
            value={password}
            onChangeText={setPassword}
            onBlur={() => setPasswordTouched(true)}
            placeholder="كلمة السر"
            secureTextEntry={!showPassword}
            className="text-right"
          />
        </FieldWrap>
        <Validation
          isValid={isPasswordValid}
          isTouched={passwordTouched}
          invalidFeedback={passwordError}
        >
          {passwordError || ""}
        </Validation>
      </View>

      {/* Regular Input Example (without split design) */}
      <View>
        <Label htmlFor="search">Search (Regular Input)</Label>
        <Input
          name="search"
          placeholder="Search without split design..."
          dimension="lg"
        />
      </View>

      {/* Split Design with Custom Icons */}
      <View>
        <Label htmlFor="phone">Phone Number</Label>
        <FieldWrap
          firstSuffix={
            <Ionicons name="call-outline" size={20} color="#888888" />
          }
          isValid={true}
          isTouched={false}
          invalidFeedback={undefined}
        >
          <Input
            name="phone"
            placeholder="رقم الهاتف"
            keyboardType="phone-pad"
            className="text-right"
          />
        </FieldWrap>
      </View>
    </View>
  );
};

export default FormExample;
