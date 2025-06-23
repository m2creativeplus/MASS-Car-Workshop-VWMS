"use client"

import { ChevronLeft, ChevronRight, Home, LayoutDashboard, ListChecks, Settings, User, Car } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { UserMenu } from "./user-menu"

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation()

  const sidebarItems = [
    {
      path: "/",
      icon: Home,
      label: "Home",
    },
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      path: "/vehicles",
      icon: Car,
      label: "Vehicles",
    },
    {
      path: "/tasks",
      icon: ListChecks,
      label: "Tasks",
    },
    {
      path: "/settings",
      icon: Settings,
      label: "Settings",
    },
    {
      path: "/profile",
      icon: User,
      label: "Profile",
    },
  ]

  return (
    <div className="flex h-screen flex-col border-r">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">MASS Workshop</h1>
            <p className="text-xs text-gray-500">Vehicle Management</p>
          </div>
        </div>
        <UserMenu />
      </div>
      <div className="flex-1 overflow-auto py-2 text-sm">
        {sidebarItems.map((item) => {
          const isActive = item.path === location.pathname

          return (
            <Link
              to={item.path}
              key={item.path}
              className={cn(
                "flex items-center gap-2 rounded-md p-2 hover:bg-gray-100",
                isActive ? "bg-gray-100 font-semibold" : "font-normal",
                isCollapsed && "justify-center",
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <div>{item.label}</div>}
            </Link>
          )
        })}
      </div>
      <div className="p-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-8 w-full items-center justify-center rounded-md border bg-secondary"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
    </div>
  )
}
