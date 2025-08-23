import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { ReactNode, useEffect, useState } from "react";
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
          router.replace("/auth/login");
          return;
        }

        const decoded: DecodedToken = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp < now) {
          await AsyncStorage.removeItem("token");
          setIsAuthorized(false);
          router.replace("/auth/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthorized(false);
        router.replace("/auth/login");
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  return !isAuthorized ? <>{children}</> : <UnAuthorized />;
}
