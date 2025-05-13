import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { redirect } from "next/navigation"
import { ProjectDetail } from "@/components/project-detail"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Pencil, Plus } from "lucide-react"

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch project details
  const { data: project } = await supabase.from("projects").select("*").eq("id", params.id).single()

  if (!project) {
    redirect("/dashboard/projects")
  }

  // Fetch tasks for this project
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", params.id)
    .order("due_date", { ascending: true })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <DashboardHeader heading={project.name} text={project.description || "No description provided"} />
        <div className="flex items-center gap-2">
          <Link href="/dashboard/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link href={`/dashboard/projects/${params.id}/edit`}>
            <Button size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <ProjectDetail project={project} tasks={tasks || []} />

      <div className="flex justify-end">
        <Link href={`/dashboard/tasks/new?project=${params.id}`}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Task to Project
          </Button>
        </Link>
      </div>
    </div>
  )
}
