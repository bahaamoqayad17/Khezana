import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#22C55E",
        backgroundColor: "#F0FDF4",
        borderRadius: 12,
        marginHorizontal: 16,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#15803D",
        fontFamily: "SomarBold",
        textAlign: "right",
      }}
      text2Style={{
        fontSize: 14,
        color: "#16A34A",
        fontFamily: "SomarRegular",
        textAlign: "right",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#EF4444",
        backgroundColor: "#FEF2F2",
        borderRadius: 12,
        marginHorizontal: 16,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#DC2626",
        fontFamily: "SomarBold",
        textAlign: "right",
      }}
      text2Style={{
        fontSize: 14,
        color: "#EF4444",
        fontFamily: "SomarRegular",
        textAlign: "right",
      }}
    />
  ),
  /*
    Info type using BaseToast
  */
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#3B82F6",
        backgroundColor: "#EFF6FF",
        borderRadius: 12,
        marginHorizontal: 16,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#1E40AF",
        fontFamily: "SomarBold",
        textAlign: "right",
      }}
      text2Style={{
        fontSize: 14,
        color: "#1E40AF",
        fontFamily: "SomarRegular",
        textAlign: "right",
      }}
    />
  ),
};
