"use client";

import dynamic from "next/dynamic";

const ContactModule = dynamic(() => import("@/components/contact/contact-module").then(m => m.ContactModule || m.default || m), { ssr: false });

export default function ContactPage() {
  return <ContactModule />;
}
