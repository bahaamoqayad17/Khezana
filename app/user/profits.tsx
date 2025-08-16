import { useEffect } from "react";
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

  useEffect(() => {
    console.log("Profits");
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className={`flex-row justify-between items-center mb-5`}>
        <Text className={`text-lg font-bold text-gray-800`}>
          {t("authors_profits")}
        </Text>
        <Text className="text-lg text-gray-800">→</Text>
      </View>

      {/* Main Profits Card */}
      <View className="bg-orange-600 rounded-xl p-5 mb-5">
        <View className={`items-start`}>
          <Text className="text-3xl font-bold text-white mb-1">15000</Text>
          <Text className="text-base text-white mb-4">
            {t("total_profits")}
          </Text>
          <Text className="text-lg font-bold text-white mb-1">{maxAmount}</Text>
          <Text className="text-sm text-white mb-2">
            {t("available_balance")}
          </Text>
          <Text className="text-xs text-white/80">
            {t("last_update_today")}
          </Text>
        </View>
      </View>

      {/* Withdrawal Request Section */}
      <View className="bg-white rounded-xl p-5 mb-5">
        <Text className={`text-lg font-bold text-gray-800 mb-4`}>
          {t("new_withdrawal_request")}
        </Text>
        <Text className={`text-sm text-gray-600 mb-2`}>
          {t("withdrawal_amount")}
        </Text>

        <TextInput
          className={`border border-gray-300 rounded-lg p-3 mb-4 text-base`}
          placeholder={t("enter_amount_placeholder", { max: maxAmount })}
          placeholderTextColor="#999"
        />

        <Text className={`text-sm text-gray-600 mb-2`}>
          {t("payment_method")}
        </Text>
        <View className="flex-row justify-between items-center border border-gray-300 rounded-lg p-3 mb-4">
          <Text className="text-base text-gray-400">
            {t("select_payment_method")}
          </Text>
          <Text className="text-base text-gray-400">⌄</Text>
        </View>

        <Text className={`text-sm text-gray-600 mb-2`}>
          {t("account_number")}
        </Text>
        <TextInput
          className={`border border-gray-300 rounded-lg p-3 mb-5 text-base`}
          placeholder={t("enter_account_number")}
          placeholderTextColor="#999"
        />

        <TouchableOpacity className="bg-orange-600 rounded-lg p-4 items-center">
          <Text className="text-white text-base font-bold">
            {t("submit_withdrawal_request")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transactions History */}
      <View className="bg-white rounded-xl p-5 mb-5">
        <Text className={`text-lg font-bold text-gray-800 mb-4`}>
          {t("recent_transactions")}
        </Text>

        <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
          <View className="items-start">
            <Text className="text-base font-bold text-gray-800 mb-1">
              3500 ج
            </Text>
            <Text className="text-xs text-gray-400">2024-01-15</Text>
          </View>
          <View className={`items-start`}>
            <Text className="text-sm text-gray-800 mb-1">
              {t("bank_of_algeria")}
            </Text>
            <View className="bg-green-100 px-2 py-1 rounded">
              <Text className="text-xs text-green-600">{t("completed")}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
          <View className="items-start">
            <Text className="text-base font-bold text-gray-800 mb-1">
              3500 ج
            </Text>
            <Text className="text-xs text-gray-400">2024-01-15</Text>
          </View>
          <View className={`items-start`}>
            <Text className="text-sm text-gray-800 mb-1">
              {t("bank_of_algeria")}
            </Text>
            <View className="bg-yellow-100 px-2 py-1 rounded">
              <Text className="text-xs text-yellow-700">{t("processing")}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center py-4">
          <View className="items-start">
            <Text className="text-base font-bold text-gray-800 mb-1">
              3500 ج
            </Text>
            <Text className="text-xs text-gray-400">2024-01-15</Text>
          </View>
          <View className={`items-start`}>
            <Text className="text-sm text-gray-800 mb-1">
              {t("golden_card")}
            </Text>
            <View className="bg-green-100 px-2 py-1 rounded">
              <Text className="text-xs text-green-600">{t("completed")}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Information Section */}
      <View className="bg-white rounded-xl p-5 mb-5">
        <Text className={`text-base font-bold text-gray-800 mb-2`}>
          {t("important_info")}
        </Text>
        <Text className={`text-sm text-gray-600 leading-6`}>
          {t("withdrawal_processing_time")}
          {"\n"}
          {t("minimum_withdrawal")}
          {"\n"}
          {t("no_withdrawal_fees")}
          {"\n"}
          {t("track_request_status")}
        </Text>
      </View>
    </ScrollView>
  );
}
