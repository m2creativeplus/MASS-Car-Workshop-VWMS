"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Contact Support</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Send us a message and we'll reply shortly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Type your message here..." className="min-h-[100px]" />
            </div>
            <Button className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">+252 63 4000000</p>
              <p className="text-sm text-muted-foreground">Mon-Sat, 8am - 6pm</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">support@mass-vwms.com</p>
              <p className="text-sm text-muted-foreground">24/7 Response</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
