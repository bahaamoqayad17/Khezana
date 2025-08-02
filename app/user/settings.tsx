import PlainTitle from "@/components/PlainTitle";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";
import LanguageModal from "@/components/modals/LanguageModal";
import PaymentModal from "@/components/modals/PaymentModal";
import ThemeModal from "@/components/modals/ThemeModal";
import EditIcon from "@/icons/Edit";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserSettings() {
  const { t } = useTranslation();

  // Modal states
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

  // Settings data state
  const [settingsData, setSettingsData] = useState({
    language: "العربية",
    theme: "الألوان الداكنة",
    paymentInfo: "**** **** **** 4854",
  });

  const settingsFields = [
    {
      id: "language",
      label: t("choose_preferred_language"),
      value: settingsData.language,
      hasEdit: true,
      onEdit: () => setLanguageModalVisible(true),
    },
    {
      id: "theme",
      label: t("choose_appearance"),
      value: settingsData.theme,
      hasEdit: true,
      onEdit: () => setThemeModalVisible(true),
    },
    {
      id: "payment",
      label: t("payment_information"),
      value: settingsData.paymentInfo,
      hasEdit: true,
      onEdit: () => setPaymentModalVisible(true),
    },
  ];

  // Modal handlers
  const handleSaveLanguage = (newLanguage: string) => {
    setSettingsData((prev) => ({ ...prev, language: newLanguage }));
    console.log("Saving new language:", newLanguage);
  };

  const handleSaveTheme = (newTheme: string) => {
    setSettingsData((prev) => ({ ...prev, theme: newTheme }));
    console.log("Saving new theme:", newTheme);
  };

  const handleSavePayment = (newPaymentInfo: string) => {
    setSettingsData((prev) => ({ ...prev, paymentInfo: newPaymentInfo }));
    console.log("Saving new payment info:", newPaymentInfo);
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account...");
    // TODO: API call to delete account
  };

  return (
    <SafeAreaView className="flex-1">
      <PlainTitle title={t("settings")} />

      <ScrollView className="flex-1 px-4 py-6">
        {/* Settings Fields */}
        <View className="space-y-4 mb-8">
          {settingsFields.map((field) => (
            <View
              key={field.id}
              className="bg-lightPrimary rounded-2xl p-4 borderize mb-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-black text-xl font-SomarBold mb-1">
                    {field.label}
                  </Text>
                  <Text className="text-gray text-md font-SomarRegular">
                    {field.value}
                  </Text>
                </View>
                {field.hasEdit && (
                  <TouchableOpacity onPress={field.onEdit} className="p-2 ml-2">
                    <EditIcon />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Delete Account Button */}
        <TouchableOpacity
          onPress={() => setDeleteAccountModalVisible(true)}
          className="bg-red-500 rounded-2xl p-4 items-center"
        >
          <Text className="text-white font-SomarBold text-lg">
            {t("delete_account")}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <LanguageModal
        visible={languageModalVisible}
        currentLanguage={settingsData.language}
        onClose={() => setLanguageModalVisible(false)}
        onSave={handleSaveLanguage}
      />

      <ThemeModal
        visible={themeModalVisible}
        currentTheme={settingsData.theme}
        onClose={() => setThemeModalVisible(false)}
        onSave={handleSaveTheme}
      />

      <PaymentModal
        visible={paymentModalVisible}
        currentPaymentInfo={settingsData.paymentInfo}
        onClose={() => setPaymentModalVisible(false)}
        onSave={handleSavePayment}
      />

      <DeleteAccountModal
        visible={deleteAccountModalVisible}
        onClose={() => setDeleteAccountModalVisible(false)}
        onConfirm={handleDeleteAccount}
      />
    </SafeAreaView>
  );
}
