import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { TaskList } from "@/components/task-list"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { TaskFilter } from "@/components/task-filter"

export default async function TasksPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user's tasks
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*, projects(name)")
    .eq("user_id", session.user.id)
    .order("due_date", { ascending: true })

  // Fetch projects for filter
  const { data: projects } = await supabase.from("projects").select("id, name").order("name", { ascending: true })

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Tasks" text="View and manage all your tasks.">
        <Link href="/dashboard/tasks/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </Link>
      </DashboardHeader>

      <TaskFilter projects={projects || []} />

      <TaskList tasks={tasks || []} />
    </div>
  )
}
