import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Offline from "./Offline";

type Props = {
  children: React.ReactNode;
};

export default function ConnectionGuard({ children }: Props) {
  const [ready, setReady] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setIsOnline(true);
      setReady(true);
      return;
    }

    const sub = NetInfo.addEventListener((state: NetInfoState) => {
      const online = !!state.isConnected && !!state.isInternetReachable;
      setIsOnline(online);
      setReady(true);
    });

    NetInfo.fetch().then((state) => {
      const online = !!state.isConnected && !!state.isInternetReachable;
      setIsOnline(online);
      setReady(true);
    });

    return () => {
      sub();
    };
  }, [pathname]);

  if (!ready) {
    return <ActivityIndicator size="large" />;
  }

  return isOnline ? <>{children}</> : <Offline />;
}
