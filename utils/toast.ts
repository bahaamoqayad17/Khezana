import { I18nManager } from "react-native";
import Toast from "react-native-toast-message";
// check the device direction from i18nManager
const direction = I18nManager.isRTL ? "rtl" : "ltr";
console.log(direction);

export interface ToastOptions {
  title?: string;
  duration?: number;
}

export const showSuccessToast = ({ title, duration = 4000 }: ToastOptions) => {
  console.log(direction);

  Toast.show({
    type: "success",
    text1: title || "نجح",
    visibilityTime: duration,
    autoHide: true,
    topOffset: 60,
    text1Style: {
      textAlign: direction === "rtl" ? "left" : "left",
      backgroundColor: "green",
    },
  });
};

export const showErrorToast = ({ title, duration = 4000 }: ToastOptions) => {
  Toast.show({
    type: "error",
    text1: title || "خطأ",
    visibilityTime: duration,
    autoHide: true,
    topOffset: 60,
    text1Style: {
      textAlign: direction === "rtl" ? "right" : "left",
      backgroundColor: "red",
    },
  });
};

export const showInfoToast = ({ title, duration = 4000 }: ToastOptions) => {
  Toast.show({
    type: "info",
    text1: title,
    visibilityTime: duration,
    autoHide: true,
    topOffset: 60,
    text1Style: {
      textAlign: direction === "rtl" ? "right" : "left",
      backgroundColor: "blue",
    },
  });
};

export const hideToast = () => {
  Toast.hide();
};
