"use client"

import { useCallback } from "react"
import { useTranslations } from "next-intl"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useNotificationSettings } from "@/contexts/notification-settings-context"
import type { NotificationClickAction, NotificationTiming } from "@/lib/notification-settings"

function SettingsCard({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="rounded-lg border bg-card px-4 py-3">{children}</div>
}

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </div>
      {children}
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="space-y-1">{children}</div>
    </section>
  )
}

export function NotificationSettings() {
  const t = useTranslations("NotificationsSettings")
  const { settings, updateSettings } = useNotificationSettings()

  const handleToggle = useCallback(
    (key: keyof typeof settings, checked: boolean) => {
      updateSettings({ [key]: checked })
    },
    [updateSettings]
  )

  return (
    <div className="space-y-6">
      <Section title={t("desktopNotification")}>
        <SettingsCard>
          <SettingsRow
            label={t("enableDesktopNotification")}
            description={t("enableDesktopNotificationDesc")}
          >
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => handleToggle("enabled", checked)}
            />
          </SettingsRow>
        </SettingsCard>
      </Section>

      <Section title={t("notificationTypes")}>
        <SettingsCard>
          <div className="space-y-4">
            <SettingsRow label={t("permissionRequest")}>
              <Switch
                checked={settings.permissionRequest}
                disabled={!settings.enabled}
                onCheckedChange={(checked) =>
                  handleToggle("permissionRequest", checked)
                }
              />
            </SettingsRow>
            <SettingsRow label={t("turnComplete")}>
              <Switch
                checked={settings.turnComplete}
                disabled={!settings.enabled}
                onCheckedChange={(checked) =>
                  handleToggle("turnComplete", checked)
                }
              />
            </SettingsRow>
            <SettingsRow label={t("agentError")}>
              <Switch
                checked={settings.agentError}
                disabled={!settings.enabled}
                onCheckedChange={(checked) =>
                  handleToggle("agentError", checked)
                }
              />
            </SettingsRow>
          </div>
        </SettingsCard>
      </Section>

      <Section title={t("sound")}>
        <SettingsCard>
          <SettingsRow label={t("enableSound")}>
            <Switch
              checked={settings.sound}
              disabled={!settings.enabled}
              onCheckedChange={(checked) => handleToggle("sound", checked)}
            />
          </SettingsRow>
        </SettingsCard>
      </Section>

      <Section title={t("clickAction")}>
        <SettingsCard>
          <RadioGroup
            value={settings.clickAction}
            onValueChange={(v) =>
              updateSettings({ clickAction: v as NotificationClickAction })
            }
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="focus" id="click-focus" />
              <Label htmlFor="click-focus" className="text-sm font-normal">
                {t("focusAndNavigate")}
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="silent" id="click-silent" />
              <Label htmlFor="click-silent" className="text-sm font-normal">
                {t("silentOnly")}
              </Label>
            </div>
          </RadioGroup>
        </SettingsCard>
      </Section>

      <Section title={t("timing")}>
        <SettingsCard>
          <RadioGroup
            value={settings.timing}
            onValueChange={(v) =>
              updateSettings({ timing: v as NotificationTiming })
            }
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="background" id="timing-bg" />
              <Label htmlFor="timing-bg" className="text-sm font-normal">
                {t("whenBackground")}
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="always" id="timing-always" />
              <Label htmlFor="timing-always" className="text-sm font-normal">
                {t("always")}
              </Label>
            </div>
          </RadioGroup>
        </SettingsCard>
      </Section>
    </div>
  )
}
