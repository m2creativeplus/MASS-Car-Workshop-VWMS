import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Essential",
      price: "$299",
      description: "Perfect for small dealerships getting started with professional imagery.",
      features: [
        "Vehicle Exterior Images",
        "Vehicle Interior Images", 
        "License Plate Masking",
        "Guided App Access",
        "Web Console Access",
        "Standard API Access"
      ],
      missing: [
        "Standard 360 View",
        "Background Replacement",
        "Marketing Banners",
        "Video Templates"
      ]
    },
    {
      name: "Growth",
      price: "$499",
      popular: true,
      description: "For scaling dealerships that need video and 360° spins.",
      features: [
        "Everything in Essential",
        "Standard 360 View",
        "Background Replacement", 
        "Interactive Hotspots",
        "Video Templates for Website",
        "Promotional Banners",
        "Window Stickers",
        "Website Integration"
      ],
      missing: [
         "Performance Analytics",
         "4K Video Support"
      ]
    },
    {
      name: "Comprehensive",
      price: "$699",
      description: "The complete suite for high-volume automotive retailers.",
      features: [
        "Everything in Growth",
        "Performance Analytics",
        "Hypersmooth Stabilization",
        "HD/4K Support",
        "Reel Format Templates",
        "Priority Support",
        "Custom SLAs"
      ],
      missing: []
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the plan that fits your inventory size. No hidden fees.
        </p>
      </div>

      <div className="container pb-32">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-xl ${plan.popular ? 'ring-2 ring-blue-600 scale-105 z-10' : 'border border-slate-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-sm font-medium text-slate-500">/month</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
                {plan.missing.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 opacity-50">
                    <XCircle className="h-5 w-5 text-slate-300 shrink-0" />
                    <span className="text-sm text-slate-500">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className={`w-full h-12 font-bold ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                Get {plan.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-600">
            Looking for an Enterprise solution? <Link href="/contact" className="text-blue-600 font-bold hover:underline">Contact Sales</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
