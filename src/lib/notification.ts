import { getTransport, isDesktop } from "./transport"

export interface NotificationOptions {
  sound?: boolean
}

export async function sendSystemNotification(
  title: string,
  body: string,
  _options: NotificationOptions = {}
): Promise<void> {
  void _options // reserved for future sound extension
  if (isDesktop()) {
    await getTransport().call("send_notification", { title, body })
  } else {
    // Web fallback: Browser Notification API
    if (Notification.permission === "granted") {
      new Notification(title, { body })
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        new Notification(title, { body })
      }
    }
  }
}
