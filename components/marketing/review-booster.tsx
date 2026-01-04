"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MessageSquare,
  Clock,
  Settings2,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface ReviewBoosterConfig {
  enabled: boolean;
  delayHours: number;
  platform: "google" | "facebook" | "internal";
  limitPerCustomer: boolean;
  minRatingForPublic: number;
}

export function ReviewBooster() {
  const [config, setConfig] = useState<ReviewBoosterConfig>({
    enabled: true,
    delayHours: 24,
    platform: "google",
    limitPerCustomer: true,
    minRatingForPublic: 4,
  });

  const [stats] = useState({
    sentThisMonth: 45,
    responseRate: 32,
    averageRating: 4.7,
    totalReviews: 128,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            Review Booster
          </h2>
          <p className="text-muted-foreground">
            Automated review requests based on Tekmetric's proven system
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="enabled" className="text-sm font-medium">
            {config.enabled ? "Active" : "Paused"}
          </Label>
          <Switch
            id="enabled"
            checked={config.enabled}
            onCheckedChange={(v) => setConfig({ ...config, enabled: v })}
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.sentThisMonth}</p>
                <p className="text-xs text-muted-foreground">Sent This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.responseRate}%</p>
                <p className="text-xs text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.averageRating}</p>
                <p className="text-xs text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalReviews}</p>
                <p className="text-xs text-muted-foreground">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Review Request Settings
          </CardTitle>
          <CardDescription>
            Configure when and how review requests are sent to customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Send Request After
              </Label>
              <Select
                value={config.delayHours.toString()}
                onValueChange={(v) => setConfig({ ...config, delayHours: Number(v) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="24">24 hours (recommended)</SelectItem>
                  <SelectItem value="48">48 hours</SelectItem>
                  <SelectItem value="72">72 hours</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Time after work order completion
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Review Platform
              </Label>
              <Select
                value={config.platform}
                onValueChange={(v: "google" | "facebook" | "internal") =>
                  setConfig({ ...config, platform: v })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Reviews</SelectItem>
                  <SelectItem value="facebook">Facebook Reviews</SelectItem>
                  <SelectItem value="internal">Internal Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Smart Routing */}
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Smart Review Routing
            </h4>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    Negative Feedback Protection
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 mt-1">
                    Customers rating below {config.minRatingForPublic} stars will be routed to
                    private feedback instead of public review platforms.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <Label className="cursor-pointer">Limit to 1 review per customer</Label>
                <Switch
                  checked={config.limitPerCustomer}
                  onCheckedChange={(v) => setConfig({ ...config, limitPerCustomer: v })}
                />
              </div>

              <div className="space-y-2">
                <Label>Minimum rating for public review</Label>
                <Select
                  value={config.minRatingForPublic.toString()}
                  onValueChange={(v) => setConfig({ ...config, minRatingForPublic: Number(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="4">4+ stars (recommended)</SelectItem>
                    <SelectItem value="5">5 stars only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* SMS Preview */}
          <div className="space-y-2 pt-4 border-t">
            <Label>SMS Message Preview</Label>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-sm">
              <p>
                "Thanks for choosing MASS Workshop, <strong>{"{customer_name}"}</strong>! How was
                your experience? We'd love your feedback: <span className="text-blue-600 underline">{"{review_link}"}</span>"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
