import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProjectList } from "@/components/project-list"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function ProjectsPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user's projects
  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Projects" text="View and manage all your projects.">
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </DashboardHeader>

      <ProjectList projects={projects || []} />
    </div>
  )
}
