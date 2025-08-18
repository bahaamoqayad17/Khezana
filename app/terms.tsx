import PlainTitle from "@/components/PlainTitle";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PlainTitle title={t("terms_of_use")} />

      <ScrollView className="flex-1 px-6 py-4">
        {/* Introduction Section */}
        <View
          className="mb-6"
          style={{
            backgroundColor: "#FBF7F1",
            padding: 10,
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text className="text-lg font-SomarBold text-primary mb-3 leading-7">
            {t("introduction_title")}
          </Text>
          <Text
            className="text-base font-SomarMedium text-gray-700 leading-7 mb-4"
            style={{ color: "#767676" }}
          >
            {t("introduction_text")}
          </Text>
        </View>

        {/* Account Acceptance Section */}
        <View
          className="mb-6"
          style={{
            backgroundColor: "#FBF7F1",
            padding: 10,
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text className="text-lg font-SomarBold text-primary mb-3 leading-7">
            {t("account_acceptance_title")}
          </Text>
          <Text
            className="text-base font-SomarMedium text-gray-700 leading-7 mb-4"
            style={{ color: "#767676" }}
          >
            {t("account_acceptance_text")}
          </Text>
        </View>

        {/* Use of Application Section */}
        <View
          className="mb-6"
          style={{
            backgroundColor: "#FBF7F1",
            padding: 10,
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text className="text-lg font-SomarBold text-primary mb-3 leading-7">
            {t("app_usage_title")}
          </Text>
          <Text
            className="text-base font-SomarMedium text-gray-700 leading-7 mb-4"
            style={{ color: "#767676" }}
          >
            {t("app_usage_text")}
          </Text>
        </View>

        {/* Content Section */}
        <View
          className="mb-6"
          style={{
            backgroundColor: "#FBF7F1",
            padding: 10,
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text className="text-lg font-SomarBold text-primary mb-3 leading-7">
            {t("content_title")}
          </Text>
          <Text
            className="text-base font-SomarMedium text-gray-700 leading-7 mb-4"
            style={{ color: "#767676" }}
          >
            {t("content_text")}
          </Text>
        </View>

        {/* Privacy and Data Protection Section */}
        <View
          className="mb-6"
          style={{
            backgroundColor: "#FBF7F1",
            padding: 10,
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text className="text-lg font-SomarBold text-primary mb-3 leading-7">
            {t("privacy_data_title")}
          </Text>
          <Text
            className="text-base font-SomarMedium text-gray-700 leading-7 mb-4"
            style={{ color: "#767676" }}
          >
            {t("privacy_data_text")}
          </Text>
        </View>

        {/* Updates and Modifications Section */}
        <View
          className="mb-6"
          style={{
            backgroundColor: "#FBF7F1",
            padding: 10,
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text className="text-lg font-SomarBold text-primary mb-3 leading-7">
            {t("updates_modifications_title")}
          </Text>
          <Text
            className="text-base font-SomarMedium text-gray-700 leading-7 mb-4"
            style={{ color: "#767676" }}
          >
            {t("updates_modifications_text")}
          </Text>
        </View>

        {/* Error Requests Section */}
        <View
          className="mb-6"
          style={{
            backgroundColor: "#FBF7F1",
            padding: 10,
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text className="text-lg font-SomarBold text-primary mb-3 leading-7">
            {t("error_requests_title")}
          </Text>
          <Text
            className="text-base font-SomarMedium text-gray-700 leading-7 mb-4"
            style={{ color: "#767676" }}
          >
            {t("error_requests_text")}
          </Text>
        </View>

        {/* Last Updated */}
        <View
          className="mt-8 mb-4 p-4"
          style={{
            borderTopColor: "#E7E7E7",
            borderTopWidth: 1,
          }}
        >
          <Text
            className="text-sm font-SomarBold text-gray-500 text-center"
            style={{ color: "#767676" }}
          >
            {t("last_updated")} 2025
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
