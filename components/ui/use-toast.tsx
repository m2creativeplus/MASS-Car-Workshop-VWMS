"use client"

import { toast as sonnerToast } from "sonner"

// Provides a shadcn-like useToast interface on top of Sonner
export function useToast() {
  const toast = (props: {
    title?: string
    description?: string
    variant?: "default" | "destructive"
  }) => {
    if (props.variant === "destructive") {
      sonnerToast.error(props.title, { description: props.description })
    } else {
      sonnerToast.success(props.title, { description: props.description })
    }
  }

  return { toast }
}
