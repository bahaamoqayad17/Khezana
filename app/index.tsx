import OnBoarding1 from "@/components/onboarding/OnBoarding-1";
import OnBoarding2 from "@/components/onboarding/OnBoarding-2";
import OnBoarding3 from "@/components/onboarding/OnBoarding-3";
import OnBoarding4 from "@/components/onboarding/OnBoarding-4";
import OnBoarding5 from "@/components/onboarding/OnBoarding-5";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const skipToEnd = () => {
    setStep(5); // Skip to the last step or navigate to main app
  };

  const steps = [
    <OnBoarding1 key="onboarding1" />,
    <OnBoarding2 key="onboarding2" />,
    <OnBoarding3 key="onboarding3" />,
    <OnBoarding4 key="onboarding4" />,
    <OnBoarding5 key="onboarding5" />,
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white py-5">
        {/* Skip button - only show on first 4 steps */}
        {/* {step < 5 && ( */}
        <View className="max-w-20">
          <TouchableOpacity className="skip-button" onPress={skipToEnd}>
            <Text className="font-SomarRegular text-primary">{t("skip")}</Text>
          </TouchableOpacity>
        </View>
        {/* )} */}

        {/* Main content */}
        <View className="flex-1 px-10 justify-center">{steps[step - 1]}</View>

        {step < 5 && (
          <TouchableOpacity
            className="arrow-button"
            onPress={nextStep}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-forward" size={32} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
