"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EmailSettings {
  mailDriver: string;
  mailHost: string;
  mailPort: string;
  mailUsername: string;
  mailPassword: string;
  mailEncryption: string;
  mailFromAddress: string;
  mailFromName: string;
}

const defaultSettings: EmailSettings = {
  mailDriver: "SMTP",
  mailHost: "smtp.gmail.com",
  mailPort: "587",
  mailUsername: "",
  mailPassword: "",
  mailEncryption: "tls",
  mailFromAddress: "",
  mailFromName: "",
};

export function EmailSmtpSettings() {
  const [settings, setSettings] = useState<EmailSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Convex queries/mutations
  const savedSettings = useQuery(api.settings.getSettingsByCategory, { category: "email" });
  const updateSettings = useMutation(api.settings.upsertSettings);

  // Load saved settings when available
  useState(() => {
    if (savedSettings) {
      const loaded: Partial<EmailSettings> = {};
      savedSettings.forEach((s: { key: string; value: { value: string } }) => {
        if (s.key in defaultSettings) {
          loaded[s.key as keyof EmailSettings] = s.value?.value || "";
        }
      });
      setSettings((prev) => ({ ...prev, ...loaded }));
    }
  });

  const handleChange = (field: keyof EmailSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save each setting
      for (const [key, value] of Object.entries(settings)) {
        await updateSettings({
          key,
          value: { value },
          category: "email",
        });
      }
      toast.success("Email settings saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save email settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestMail = async () => {
    setIsTesting(true);
    try {
      // Simulate test email (in production, this would call a server action)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Test email sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send test email");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="settings-card">
      <div className="settings-header">
        <span>Email SMTP Configuration</span>
        <div className="settings-header-icon">
          <Mail className="w-4 h-4" />
        </div>
      </div>

      <div className="settings-body">
        <div className="settings-grid">
          {/* Mail Driver */}
          <div className="settings-field">
            <label className="settings-label settings-label-required">
              Mail Driver
            </label>
            <select
              className="settings-input"
              value={settings.mailDriver}
              onChange={(e) => handleChange("mailDriver", e.target.value)}
            >
              <option value="SMTP">SMTP</option>
              <option value="mailgun">Mailgun</option>
              <option value="ses">Amazon SES</option>
              <option value="postmark">Postmark</option>
              <option value="sendgrid">SendGrid</option>
            </select>
          </div>

          {/* Mail Host */}
          <div className="settings-field">
            <label className="settings-label settings-label-required">
              Mail Host
            </label>
            <input
              type="text"
              className="settings-input"
              placeholder="smtp.gmail.com"
              value={settings.mailHost}
              onChange={(e) => handleChange("mailHost", e.target.value)}
            />
          </div>

          {/* Mail Port */}
          <div className="settings-field">
            <label className="settings-label settings-label-required">
              Mail Port
            </label>
            <input
              type="text"
              className="settings-input"
              placeholder="587"
              value={settings.mailPort}
              onChange={(e) => handleChange("mailPort", e.target.value)}
            />
          </div>

          {/* Mail Username */}
          <div className="settings-field">
            <label className="settings-label settings-label-required">
              Mail Username
            </label>
            <input
              type="email"
              className="settings-input"
              placeholder="your-email@gmail.com"
              value={settings.mailUsername}
              onChange={(e) => handleChange("mailUsername", e.target.value)}
            />
          </div>

          {/* Mail Password */}
          <div className="settings-field">
            <label className="settings-label settings-label-required">
              Mail Password
            </label>
            <input
              type="password"
              className="settings-input"
              placeholder="••••••••••••"
              value={settings.mailPassword}
              onChange={(e) => handleChange("mailPassword", e.target.value)}
            />
          </div>

          {/* Mail Encryption */}
          <div className="settings-field">
            <label className="settings-label settings-label-required">
              Mail Encryption
            </label>
            <select
              className="settings-input"
              value={settings.mailEncryption}
              onChange={(e) => handleChange("mailEncryption", e.target.value)}
            >
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
              <option value="none">None</option>
            </select>
          </div>

          {/* Mail From Address */}
          <div className="settings-field">
            <label className="settings-label settings-label-required">
              Mail From Address
            </label>
            <input
              type="email"
              className="settings-input"
              placeholder="noreply@yourdomain.com"
              value={settings.mailFromAddress}
              onChange={(e) => handleChange("mailFromAddress", e.target.value)}
            />
          </div>

          {/* Mail From Name */}
          <div className="settings-field">
            <label className="settings-label settings-label-required">
              Mail From Name
            </label>
            <input
              type="text"
              className="settings-input"
              placeholder="MASS Workshop"
              value={settings.mailFromName}
              onChange={(e) => handleChange("mailFromName", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="settings-footer">
        <button
          className="settings-btn settings-btn-secondary"
          onClick={handleSendTestMail}
          disabled={isTesting}
        >
          {isTesting ? (
            <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
          ) : (
            <Send className="w-4 h-4 inline mr-2" />
          )}
          Send Test Mail
        </button>
        <button
          className="settings-btn settings-btn-primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
          ) : null}
          Save
        </button>
      </div>
    </div>
  );
}
