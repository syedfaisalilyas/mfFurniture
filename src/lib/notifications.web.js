// Web stub — push notifications are not supported in browsers.
// Metro automatically picks this file over notifications.js on web builds.

export async function registerForPushNotificationsAsync() {
  return null;
}

export function addNotificationListener(_handler) {
  return { remove: () => {} };
}

export function addResponseListener(_handler) {
  return { remove: () => {} };
}
