"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Palette, RotateCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headerColor: string;
}

const defaultColors: ThemeColors = {
  primaryColor: "#FF4D24",
  secondaryColor: "#0066FF",
  accentColor: "#10B981",
  backgroundColor: "#FFFFFF",
  textColor: "#0D0D0D",
  headerColor: "#FF4D24",
};

export function ColorPickerSettings() {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [isSaving, setIsSaving] = useState(false);

  // Convex queries/mutations
  const savedColors = useQuery(api.settings.getSettingsByCategory, { category: "theme" });
  const updateSettings = useMutation(api.settings.upsertSettings);

  useEffect(() => {
    if (savedColors && savedColors.length > 0) {
      const saved = savedColors.find((s: { key: string }) => s.key === "themeColors");
      if (saved && saved.value) {
        setColors((prev) => ({ ...prev, ...saved.value }));
      }
    }
  }, [savedColors]);

  const handleColorChange = (field: keyof ThemeColors, value: string) => {
    setColors((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setColors(defaultColors);
    toast.info("Colors reset to defaults");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings({
        key: "themeColors",
        value: colors,
        category: "theme",
      });
      
      // Apply CSS variables to document (live preview)
      document.documentElement.style.setProperty("--mass-primary", colors.primaryColor);
      document.documentElement.style.setProperty("--mass-secondary", colors.secondaryColor);
      document.documentElement.style.setProperty("--mass-accent", colors.accentColor);
      
      toast.success("Theme colors saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save colors");
    } finally {
      setIsSaving(false);
    }
  };

  const colorFields: { key: keyof ThemeColors; label: string; description: string }[] = [
    {
      key: "primaryColor",
      label: "Primary Color",
      description: "Main brand color (buttons, links, accents)",
    },
    {
      key: "secondaryColor",
      label: "Secondary Color",
      description: "Secondary actions and highlights",
    },
    {
      key: "accentColor",
      label: "Accent Color",
      description: "Success states and badges",
    },
    {
      key: "headerColor",
      label: "Header Color",
      description: "Settings and section headers",
    },
    {
      key: "backgroundColor",
      label: "Background Color",
      description: "Page and card backgrounds",
    },
    {
      key: "textColor",
      label: "Text Color",
      description: "Primary text color",
    },
  ];

  return (
    <div className="settings-card">
      <div className="settings-header">
        <span>Theme & Color Settings</span>
        <div className="settings-header-icon">
          <Palette className="w-4 h-4" />
        </div>
      </div>

      <div className="settings-body">
        {/* Live Preview */}
        <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
          <h4 className="text-sm font-medium mb-3">Live Preview</h4>
          <div className="flex flex-wrap gap-3">
            <div
              className="h-10 px-4 rounded-lg flex items-center text-white font-medium text-sm"
              style={{ backgroundColor: colors.primaryColor }}
            >
              Primary Button
            </div>
            <div
              className="h-10 px-4 rounded-lg flex items-center text-white font-medium text-sm"
              style={{ backgroundColor: colors.secondaryColor }}
            >
              Secondary
            </div>
            <div
              className="h-10 px-4 rounded-lg flex items-center text-white font-medium text-sm"
              style={{ backgroundColor: colors.accentColor }}
            >
              Success
            </div>
            <div
              className="h-10 px-4 rounded-lg flex items-center font-medium text-sm border border-gray-200"
              style={{ backgroundColor: colors.backgroundColor, color: colors.textColor }}
            >
              Text Sample
            </div>
          </div>
        </div>

        <div className="settings-divider" />

        {/* Color Pickers */}
        <div className="settings-grid">
          {colorFields.map((field) => (
            <div key={field.key} className="settings-field">
              <label className="settings-label">{field.label}</label>
              <div className="settings-color-picker">
                <div className="settings-color-swatch">
                  <input
                    type="color"
                    value={colors[field.key]}
                    onChange={(e) => handleColorChange(field.key, e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  className="settings-input flex-1"
                  value={colors[field.key]}
                  onChange={(e) => handleColorChange(field.key, e.target.value)}
                  placeholder="#000000"
                />
              </div>
              <p className="settings-info">{field.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-footer">
        <button
          className="settings-btn settings-btn-secondary"
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4 inline mr-2" />
          Reset to Defaults
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
