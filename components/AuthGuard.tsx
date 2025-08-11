import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import UnAuthorized from "./UnAuthorized";

type Props = {
  children: ReactNode;
};

type DecodedToken = {
  exp: number;
};

export default function AuthGuard({ children }: Props) {
  const [checking, setChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setIsAuthorized(false);
          return;
        }

        const decoded: DecodedToken = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
          await AsyncStorage.removeItem("token");
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthorized(false);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthorized ? <>{children}</> : <UnAuthorized />;
}
