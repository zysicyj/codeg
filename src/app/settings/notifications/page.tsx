import { NotificationSettings } from "@/components/settings/notification-settings"
import { NotificationSettingsProvider } from "@/contexts/notification-settings-context"

export default function SettingsNotificationsPage() {
  return (
    <NotificationSettingsProvider>
      <NotificationSettings />
    </NotificationSettingsProvider>
  )
}
