"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, CheckSquare, FolderKanban, Settings } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
