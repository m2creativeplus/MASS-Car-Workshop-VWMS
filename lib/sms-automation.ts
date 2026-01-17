/**
 * SMS Automation & Service Reminders
 * 
 * Integrates with n8n for workflow automation
 * Source: M2 Dev Library automation/tools.json
 */

export interface ReminderPayload {
  customerId: string;
  customerName: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  serviceType: string;
  dueDate: string;
  appointmentTime?: string;
}

export interface AutomationConfig {
  n8nWebhookUrl?: string;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  twilioPhoneNumber?: string;
  zaadApiKey?: string;
  edahabApiKey?: string;
}

/**
 * SMS Templates for different reminder types
 */
export const SMS_TEMPLATES = {
  serviceReminder: (data: ReminderPayload) => 
    `Salaam ${data.customerName}! Your ${data.vehicleMake} ${data.vehicleModel} is due for ${data.serviceType} on ${data.dueDate}. Book now at MASS OSS. Reply BOOK or call us.`,
  
  appointmentConfirmation: (data: ReminderPayload) =>
    `Confirmed! Your appointment for ${data.vehicleMake} ${data.vehicleModel} is set for ${data.dueDate} at ${data.appointmentTime}. See you at MASS OSS!`,
  
  appointmentReminder: (data: ReminderPayload) =>
    `Reminder: Your ${data.serviceType} appointment is tomorrow at ${data.appointmentTime}. Location: MASS Automotive, Hargeisa. Call if you need to reschedule.`,
  
  readyForPickup: (data: ReminderPayload) =>
    `Great news! Your ${data.vehicleMake} ${data.vehicleModel} is ready for pickup at MASS OSS. Please bring your receipt. Thank you!`,
  
  invoiceFollowup: (data: ReminderPayload) =>
    `Reminder: Invoice for your ${data.vehicleMake} service is pending. Please complete payment at your convenience. Call us for any questions.`,
  
  thankYou: (data: ReminderPayload) =>
    `Thank you for choosing MASS OSS for your ${data.vehicleMake} ${data.vehicleModel}! We hope to see you again. Rate us: mass-oss.com/feedback`,
};

/**
 * Send SMS via n8n webhook
 */
export async function sendSmsVianN8n(
  payload: ReminderPayload,
  templateType: keyof typeof SMS_TEMPLATES
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("n8n webhook URL not configured");
    return { success: false, error: "Webhook not configured" };
  }

  const message = SMS_TEMPLATES[templateType](payload);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "sms",
        templateType,
        phone: payload.phone,
        message,
        ...payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("SMS send error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send SMS directly via Zaad/eDahab (Somaliland)
 */
export async function sendSmsViaMobileMoney(
  phone: string,
  message: string,
  provider: "zaad" | "edahab" = "zaad"
): Promise<{ success: boolean; error?: string }> {
  const apiKey = provider === "zaad" 
    ? process.env.ZAAD_API_KEY 
    : process.env.EDAHAB_API_KEY;

  if (!apiKey) {
    return { success: false, error: `${provider} API key not configured` };
  }

  // Placeholder - implement actual API calls based on provider docs
  console.log(`Sending SMS via ${provider} to ${phone}: ${message}`);
  
  return { success: true };
}

/**
 * Schedule automated reminders based on vehicle service dates
 */
export function calculateNextReminders(
  lastServiceDate: Date,
  serviceIntervalDays: number = 90
): { reminderDate: Date; dueDate: Date }[] {
  const dueDate = new Date(lastServiceDate);
  dueDate.setDate(dueDate.getDate() + serviceIntervalDays);

  // Remind 7 days, 3 days, and 1 day before
  return [
    {
      reminderDate: new Date(dueDate.getTime() - 7 * 24 * 60 * 60 * 1000),
      dueDate,
    },
    {
      reminderDate: new Date(dueDate.getTime() - 3 * 24 * 60 * 60 * 1000),
      dueDate,
    },
    {
      reminderDate: new Date(dueDate.getTime() - 1 * 24 * 60 * 60 * 1000),
      dueDate,
    },
  ];
}

/**
 * Automation triggers for n8n workflows
 */
export const AUTOMATION_TRIGGERS = {
  // Trigger when appointment is created
  onAppointmentCreated: async (appointmentId: string, data: ReminderPayload) => {
    await sendSmsVianN8n(data, "appointmentConfirmation");
  },

  // Trigger 24h before appointment
  onAppointmentReminder: async (data: ReminderPayload) => {
    await sendSmsVianN8n(data, "appointmentReminder");
  },

  // Trigger when work order is complete
  onWorkOrderComplete: async (data: ReminderPayload) => {
    await sendSmsVianN8n(data, "readyForPickup");
  },

  // Trigger for service due reminders
  onServiceDue: async (data: ReminderPayload) => {
    await sendSmsVianN8n(data, "serviceReminder");
  },

  // Trigger after payment received
  onPaymentReceived: async (data: ReminderPayload) => {
    await sendSmsVianN8n(data, "thankYou");
  },

  // Trigger for overdue invoices
  onInvoiceOverdue: async (data: ReminderPayload) => {
    await sendSmsVianN8n(data, "invoiceFollowup");
  },
};

/**
 * n8n Workflow Templates (for import into n8n)
 */
export const N8N_WORKFLOW_TEMPLATES = {
  serviceReminder: {
    name: "MASS OSS - Service Reminder",
    trigger: "Webhook",
    nodes: ["Webhook", "Set Variables", "Twilio SMS", "Save to DB"],
    cronSchedule: "0 9 * * *", // Daily at 9 AM
  },
  appointmentConfirmation: {
    name: "MASS OSS - Appointment Confirmation",
    trigger: "Webhook",
    nodes: ["Webhook", "Format Message", "Twilio SMS", "Email (optional)"],
  },
  lowStockAlert: {
    name: "MASS OSS - Low Stock Alert",
    trigger: "Schedule",
    nodes: ["Convex Query", "Filter Low Stock", "Slack/Email Alert"],
    cronSchedule: "0 8 * * *", // Daily at 8 AM
  },
};
