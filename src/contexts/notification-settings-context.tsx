"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import {
  getNotificationSettings,
  saveNotificationSettings,
  type NotificationSettings,
} from "@/lib/notification-settings"

interface NotificationSettingsContextValue {
  settings: NotificationSettings
  updateSettings: (patch: Partial<NotificationSettings>) => void
}

const NotificationSettingsContext =
  createContext<NotificationSettingsContextValue | null>(null)

export function NotificationSettingsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [settings, setSettings] = useState<NotificationSettings>(
    getNotificationSettings()
  )

  useEffect(() => {
    setSettings(getNotificationSettings())
  }, [])

  const updateSettings = useCallback(
    (patch: Partial<NotificationSettings>) => {
      const next = saveNotificationSettings(patch)
      setSettings(next)
    },
    []
  )

  return (
    <NotificationSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </NotificationSettingsContext.Provider>
  )
}

export function useNotificationSettings(): NotificationSettingsContextValue {
  const ctx = useContext(NotificationSettingsContext)
  if (!ctx) {
    throw new Error(
      "useNotificationSettings must be used within NotificationSettingsProvider"
    )
  }
  return ctx
}
