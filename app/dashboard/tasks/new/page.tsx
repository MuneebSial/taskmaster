import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { redirect } from "next/navigation"
import { TaskForm } from "@/components/task-form"

export default async function NewTaskPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch projects for the form
  const { data: projects } = await supabase.from("projects").select("id, name").order("name", { ascending: true })

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Create New Task" text="Add a new task to your list." />

      <div className="max-w-2xl">
        <TaskForm projects={projects || []} userId={session.user.id} />
      </div>
    </div>
  )
}
