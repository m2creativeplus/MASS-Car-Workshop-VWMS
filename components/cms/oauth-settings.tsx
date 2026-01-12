"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface OAuthProvider {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
}

const defaultProviders: OAuthProvider[] = [
  {
    id: "google",
    name: "Google",
    icon: "🔵",
    enabled: false,
    clientId: "",
    clientSecret: "",
    redirectUrl: "https://your-domain.com/login/google/callback",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "🔷",
    enabled: false,
    clientId: "",
    clientSecret: "",
    redirectUrl: "https://your-domain.com/login/facebook/callback",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: "💬",
    enabled: false,
    clientId: "",
    clientSecret: "",
    redirectUrl: "",
  },
];

export function OAuthSettings() {
  const [providers, setProviders] = useState<OAuthProvider[]>(defaultProviders);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Convex queries/mutations
  const savedSettings = useQuery(api.settings.getSettingsByCategory, { category: "oauth" });
  const updateSettings = useMutation(api.settings.upsertSettings);

  useEffect(() => {
    if (savedSettings) {
      setProviders((prev) =>
        prev.map((provider) => {
          const saved = savedSettings.find((s: { key: string }) => s.key === provider.id);
          if (saved && saved.value) {
            return { ...provider, ...saved.value };
          }
          return provider;
        })
      );
    }
  }, [savedSettings]);

  const handleToggle = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleChange = (providerId: string, field: keyof OAuthProvider, value: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = async (providerId: string) => {
    setSavingId(providerId);
    try {
      const provider = providers.find((p) => p.id === providerId);
      if (!provider) return;

      await updateSettings({
        key: providerId,
        value: {
          enabled: provider.enabled,
          clientId: provider.clientId,
          clientSecret: provider.clientSecret,
          redirectUrl: provider.redirectUrl,
        },
        category: "oauth",
      });
      toast.success(`${provider.name} settings saved`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save settings");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <div key={provider.id} className="settings-card">
          <div className="settings-header">
            <span>{provider.name} Login Configuration</span>
            <div className="flex items-center gap-3">
              <button
                className={`settings-toggle ${provider.enabled ? "active" : ""}`}
                onClick={() => handleToggle(provider.id)}
                aria-label={`Toggle ${provider.name}`}
              />
              <span className="text-sm">{provider.enabled ? "ON" : "OFF"}</span>
            </div>
          </div>

          <div className="settings-body">
            <div className="settings-grid">
              {/* Client ID */}
              <div className="settings-field">
                <label className="settings-label settings-label-required">
                  {provider.name} Client ID
                </label>
                <input
                  type="text"
                  className="settings-input"
                  placeholder={`${provider.id}_client_id`}
                  value={provider.clientId}
                  onChange={(e) => handleChange(provider.id, "clientId", e.target.value)}
                />
              </div>

              {/* Client Secret */}
              <div className="settings-field">
                <label className="settings-label settings-label-required">
                  {provider.name} Client Secret ID
                </label>
                <input
                  type="password"
                  className="settings-input"
                  placeholder={`${provider.id}_client_secret`}
                  value={provider.clientSecret}
                  onChange={(e) => handleChange(provider.id, "clientSecret", e.target.value)}
                />
              </div>

              {/* Redirect URL */}
              {provider.id !== "whatsapp" && (
                <div className="settings-field col-span-2">
                  <label className="settings-label settings-label-required">
                    {provider.name} Redirect URL
                  </label>
                  <input
                    type="text"
                    className="settings-input"
                    placeholder={`https://your-domain.com/login/${provider.id}/callback`}
                    value={provider.redirectUrl}
                    onChange={(e) => handleChange(provider.id, "redirectUrl", e.target.value)}
                  />
                  <p className="settings-info">
                    Add this URL to your {provider.name} OAuth app settings
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="settings-footer">
            <button
              className="settings-btn settings-btn-primary"
              onClick={() => handleSave(provider.id)}
              disabled={savingId === provider.id}
            >
              {savingId === provider.id ? (
                <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              ) : null}
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
