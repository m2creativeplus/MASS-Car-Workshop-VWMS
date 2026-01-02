import { OrganizationProvider } from "@/components/providers/organization-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OrganizationProvider>
      {children}
    </OrganizationProvider>
  )
}
