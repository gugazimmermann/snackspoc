import * as Notifications from 'expo-notifications';

export default function notification(name) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Snacks!',
      body: `${name} tem promoção!`,
    },
    trigger: null,
  });
}
