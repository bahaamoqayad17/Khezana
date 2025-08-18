import PlainTitle from "@/components/PlainTitle";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profits() {
  const { t } = useTranslation();
  const maxAmount = 7506;

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mb-10">
      {/* Header */}
      <PlainTitle title={t("authors_profits")} />

      {/* Main Profits Card */}
      <View className="bg-secondary rounded-2xl p-6 mb-4 gap-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-SomarBold">{t("total_profits")}</Text>
          <Text className="text-4xl font-SomarBold text-white">15000</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-SomarBold text-white">
            {t("available_balance")}
          </Text>
          <Text className="text-2xl font-SomarBold">{maxAmount}</Text>
        </View>
      </View>

      {/* Withdrawal Request Section */}
      <View
        className="bg-white rounded-2xl p-6 mb-4"
        style={{
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <Text className="text-xl font-SomarBold text-gray-800 mb-10">
          {t("new_withdrawal_request")}
        </Text>

        {/* Amount Section */}
        <View className="mb-6">
          <Text className="font-SomarBold text-gray-800 mb-3">
            {t("withdrawal_amount")}
          </Text>
          <View className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <TextInput
              className="text-lg font-SomarRegular text-gray-600"
              placeholder="1"
              placeholderTextColor="#999"
            />
          </View>
          <Text className="text-sm font-SomarRegular text-gray-500 mt-2">
            {t("minimum_withdrawal")}
          </Text>
        </View>

        {/* Payment Method Section */}
        <View className="mb-6">
          <Text className="font-SomarBold text-gray-800 mb-3">
            {t("payment_method")}
          </Text>
          <TouchableOpacity className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex-row items-center justify-between">
            <Text className="text-lg">⌄</Text>
            <Text className="font-SomarRegular text-gray-500">
              {t("choose_payment_method")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Number Section */}
        <View className="mb-8">
          <Text className="font-SomarBold text-gray-800 mb-3">
            {t("account_number")}
          </Text>
          <View className="border border-gray-200 rounded-xl bg-gray-50">
            <TextInput
              className="text-lg font-SomarRegular text-gray-600"
              placeholder={t("enter_account_number")}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity className="bg-secondary rounded-xl p-4 items-center">
          <Text className="text-white text-lg font-SomarBold">
            {t("send_withdrawal_request")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transactions History */}
      <View
        className="bg-white rounded-2xl p-6 mb-4"
        style={{
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <Text className="text-xl font-SomarBold text-gray-800 mb-6">
          {t("recent_transactions")}
        </Text>

        {/* Transaction 1 */}
        <View className="flex-row items-center justify-between py-4">
          <View className="flex-1 items-start">
            <View
              className="px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#E8F5E8" }}
            >
              <Text
                className="text-sm font-SomarBold"
                style={{ color: "#4CAF50" }}
              >
                مكتمل
              </Text>
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-base font-SomarBold text-gray-800 mb-2">
              بنك الجزائر
            </Text>
          </View>

          <View className="flex-1">
            <Text className="text-lg font-SomarBold text-gray-800 mb-1">
              500 د.ج
            </Text>
            <Text className="text-sm font-SomarRegular text-gray-500">
              2024-01-15
            </Text>
          </View>
        </View>
      </View>

      {/* Important Information Section */}
      <View
        className="bg-white rounded-2xl p-6 mb-10"
        style={{
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <Text className="text-xl font-SomarBold text-gray-800 mb-6">
          {t("important_information")}
        </Text>

        <View className="gap-4">
          <View className="flex-row items-start gap-3">
            <Text className="text-lg font-SomarBold text-gray-800">•</Text>
            <Text className="flex-1 text-base font-SomarRegular text-gray-700 leading-6">
              {t("withdrawal_processing_time")}
            </Text>
          </View>

          <View className="flex-row items-start gap-3">
            <Text className="text-lg font-SomarBold text-gray-800">•</Text>
            <Text className="flex-1 text-base font-SomarRegular text-gray-700 leading-6">
              {t("minimum_withdrawal")}
            </Text>
          </View>

          <View className="flex-row items-start gap-3">
            <Text className="text-lg font-SomarBold text-gray-800">•</Text>
            <Text className="flex-1 text-base font-SomarRegular text-gray-700 leading-6">
              {t("no_withdrawal_fees")}
            </Text>
          </View>

          <View className="flex-row items-start gap-3">
            <Text className="text-lg font-SomarBold text-gray-800">•</Text>
            <Text className="flex-1 text-base font-SomarRegular text-gray-700 leading-6">
              {t("track_request_status")}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
