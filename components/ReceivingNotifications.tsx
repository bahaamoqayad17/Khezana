import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function ReceivingNotifications() {
  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
      //   notificationListener.current &&
      //     Notifications.removeNotificationSubscription(
      //       notificationListener.current
      //     );
      //   responseListener.current &&
      //     Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <View></View>;
}
