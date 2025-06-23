import dynamic from "next/dynamic"

const MassWorkshopSystem = dynamic(() => import("../mass-workshop-system"), { ssr: false })

export default function Page() {
  return <MassWorkshopSystem />
}
