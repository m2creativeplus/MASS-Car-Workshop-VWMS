import { ConvexClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const client = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL || "https://artful-jaguar-416.convex.cloud");

const articles = [
  {
    title: "Getting Started with MASS Car Workshop",
    category: "Getting Started",
    section: "Onboarding",
    url: "https://support.tekmetric.com/hc/en-us/categories/360001936551-Getting-Started",
    content: {
      text: "Welcome to MASS Car Workshop management. This guide covers the basics of setting up your workshop, registering your first customer, and opening a work order.",
      html: "<h1>Getting Started</h1><p>Welcome to <strong>MASS Car Workshop</strong>. Follow these steps to begin:</p><ol><li>Configure your branding in Settings.</li><li>Register your customers and vehicles.</li><li>Create your first inspection report.</li></ol>",
      images: [],
      links: [],
    },
    scrapedAt: new Date().toISOString(),
    orgId: "demo-org-1",
  },
  {
    title: "Understanding Digital Vehicle Inspections (DVI)",
    category: "Training & Education",
    section: "Inspections",
    url: "https://support.tekmetric.com/hc/en-us/categories/360001936571-Training-Education",
    content: {
      text: "DVI is a powerful tool to build trust with customers by providing photo-backed inspection reports.",
      html: "<h1>DVI Training</h1><p>Use our mobile-first inspection wizard to capture defects and fuel levels instantly.</p>",
      images: [],
      links: [],
    },
    scrapedAt: new Date().toISOString(),
    orgId: "demo-org-1",
  },
];

async function seed() {
  console.log("🌱 Seeding Knowledge Base...");
  for (const article of articles) {
    await client.mutation(api.knowledgeBase.addArticle, article);
    console.log(`✅ Added: ${article.title}`);
  }
}

seed().catch(console.error);
