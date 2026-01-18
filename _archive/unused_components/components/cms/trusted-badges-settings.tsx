"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Award, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Badge {
  id: number;
  label: string;
  image: string | null;
}

const defaultBadges: Badge[] = [
  { id: 1, label: "COD Available", image: null },
  { id: 2, label: "Premium Quality", image: null },
  { id: 3, label: "24/7 Support", image: null },
  { id: 4, label: "Certified Service", image: null },
];

export function TrustedBadgesSettings() {
  const [badges, setBadges] = useState<Badge[]>(defaultBadges);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Convex queries/mutations
  const savedBadges = useQuery(api.settings.getSettingsByCategory, { category: "badges" });
  const updateSettings = useMutation(api.settings.upsertSettings);

  useEffect(() => {
    if (savedBadges && savedBadges.length > 0) {
      const saved = savedBadges.find((s: { key: string }) => s.key === "trustedBadges");
      if (saved && saved.value?.badges) {
        setBadges(saved.value.badges);
      }
    }
  }, [savedBadges]);

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to base64 for preview (in production, upload to storage)
      const reader = new FileReader();
      reader.onload = () => {
        setBadges((prev) =>
          prev.map((badge, i) =>
            i === index ? { ...badge, image: reader.result as string } : badge
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLabelChange = (index: number, label: string) => {
    setBadges((prev) =>
      prev.map((badge, i) => (i === index ? { ...badge, label } : badge))
    );
  };

  const handleRemoveImage = (index: number) => {
    setBadges((prev) =>
      prev.map((badge, i) => (i === index ? { ...badge, image: null } : badge))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings({
        key: "trustedBadges",
        value: { badges },
        category: "badges",
      });
      toast.success("Trusted badges saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save badges");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="settings-card">
      <div className="settings-header">
        <span>Trusted Badges Settings</span>
        <div className="settings-header-icon">
          <Award className="w-4 h-4" />
        </div>
      </div>

      <div className="settings-body">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={badge.id} className="settings-upload">
              <input
                type="file"
                ref={(el) => { fileInputRefs.current[index] = el; }}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(index, e)}
              />

              {/* Image Upload Box */}
              <div
                className="settings-upload-box relative"
                onClick={() => fileInputRefs.current[index]?.click()}
              >
                {badge.image ? (
                  <>
                    <img
                      src={badge.image}
                      alt={badge.label}
                      className="w-16 h-16 mx-auto object-contain"
                    />
                    <button
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <div className="py-4">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Choose File</span>
                    <span className="block text-xs text-gray-400 mt-1">No file chosen</span>
                  </div>
                )}
              </div>

              {/* Label Input */}
              <input
                type="text"
                className="settings-input text-center text-sm mt-2"
                value={badge.label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                placeholder={`Badge ${index + 1} label`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="settings-footer">
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
