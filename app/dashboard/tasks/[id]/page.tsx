import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { redirect } from "next/navigation"
import { TaskDetail } from "@/components/task-detail"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Pencil } from "lucide-react"

export default async function TaskDetailPage({
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

  // Fetch task details
  const { data: task } = await supabase.from("tasks").select("*, projects(name)").eq("id", params.id).single()

  if (!task) {
    redirect("/dashboard/tasks")
  }

  // Check if user has access to this task
  if (task.user_id !== session.user.id) {
    redirect("/dashboard/tasks")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <DashboardHeader heading={task.title} text={`Task in ${task.projects?.name || "No Project"}`} />
        <div className="flex items-center gap-2">
          <Link href="/dashboard/tasks">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link href={`/dashboard/tasks/${params.id}/edit`}>
            <Button size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <TaskDetail task={task} />
    </div>
  )
}
