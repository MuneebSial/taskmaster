import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { redirect } from "next/navigation"
import { TaskForm } from "@/components/task-form"

export default async function EditTaskPage({
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
  const { data: task } = await supabase.from("tasks").select("*").eq("id", params.id).single()

  if (!task) {
    redirect("/dashboard/tasks")
  }

  // Check if user has access to this task
  if (task.user_id !== session.user.id) {
    redirect("/dashboard/tasks")
  }

  // Fetch projects for the form
  const { data: projects } = await supabase.from("projects").select("id, name").order("name", { ascending: true })

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Edit Task" text="Update your task details." />

      <div className="max-w-2xl">
        <TaskForm projects={projects || []} userId={session.user.id} task={task} />
      </div>
    </div>
  )
}
