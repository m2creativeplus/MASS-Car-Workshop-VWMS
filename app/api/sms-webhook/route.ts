import { NextRequest, NextResponse } from "next/server";
import { AUTOMATION_TRIGGERS, ReminderPayload } from "@/lib/sms-automation";

/**
 * SMS Webhook API Route
 * 
 * Receives automation triggers and sends SMS
 * Used by n8n workflows and internal triggers
 * 
 * Source: M2 Dev Library - automation/tools.json
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...payload } = body as { type: keyof typeof AUTOMATION_TRIGGERS } & ReminderPayload;

    // Validate required fields
    if (!type) {
      return NextResponse.json(
        { error: "Missing 'type' field" },
        { status: 400 }
      );
    }

    if (!payload.phone || !payload.customerName) {
      return NextResponse.json(
        { error: "Missing required fields: phone, customerName" },
        { status: 400 }
      );
    }

    // Get the trigger function
    const trigger = AUTOMATION_TRIGGERS[type];
    if (!trigger) {
      return NextResponse.json(
        { error: `Unknown trigger type: ${type}` },
        { status: 400 }
      );
    }

    // Execute the automation
    await trigger(payload);

    return NextResponse.json({
      success: true,
      type,
      recipient: payload.phone,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("SMS webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

// GET for health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "sms-automation",
    triggers: Object.keys(AUTOMATION_TRIGGERS),
  });
}
