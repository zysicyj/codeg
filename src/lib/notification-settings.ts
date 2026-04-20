"use client"

const STORAGE_KEY = "codeg:notification-settings"

export type NotificationClickAction = "focus" | "silent"
export type NotificationTiming = "background" | "always"

export interface NotificationSettings {
  enabled: boolean
  permissionRequest: boolean
  turnComplete: boolean
  sessionComplete: boolean
  agentError: boolean
  sound: boolean
  clickAction: NotificationClickAction
  timing: NotificationTiming
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: true,
  permissionRequest: true,
  turnComplete: true,
  sessionComplete: true,
  agentError: true,
  sound: false,
  clickAction: "focus",
  timing: "background",
}

function readSettings(): NotificationSettings {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATION_SETTINGS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_NOTIFICATION_SETTINGS
    const parsed = JSON.parse(raw) as Record<string, unknown>
    return {
      enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : DEFAULT_NOTIFICATION_SETTINGS.enabled,
      permissionRequest: typeof parsed.permissionRequest === "boolean" ? parsed.permissionRequest : DEFAULT_NOTIFICATION_SETTINGS.permissionRequest,
      turnComplete: typeof parsed.turnComplete === "boolean" ? parsed.turnComplete : DEFAULT_NOTIFICATION_SETTINGS.turnComplete,
      sessionComplete: typeof parsed.sessionComplete === "boolean" ? parsed.sessionComplete : DEFAULT_NOTIFICATION_SETTINGS.sessionComplete,
      agentError: typeof parsed.agentError === "boolean" ? parsed.agentError : DEFAULT_NOTIFICATION_SETTINGS.agentError,
      sound: typeof parsed.sound === "boolean" ? parsed.sound : DEFAULT_NOTIFICATION_SETTINGS.sound,
      clickAction: (parsed.clickAction === "focus" || parsed.clickAction === "silent")
        ? parsed.clickAction
        : DEFAULT_NOTIFICATION_SETTINGS.clickAction,
      timing: (parsed.timing === "background" || parsed.timing === "always")
        ? parsed.timing
        : DEFAULT_NOTIFICATION_SETTINGS.timing,
    }
  } catch {
    return DEFAULT_NOTIFICATION_SETTINGS
  }
}

export function getNotificationSettings(): NotificationSettings {
  return readSettings()
}

export function saveNotificationSettings(
  settings: Partial<NotificationSettings>
): NotificationSettings {
  const current = readSettings()
  const next = { ...current, ...settings }
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }
  return next
}
