import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProjectList } from "@/components/project-list"
import { TaskList } from "@/components/task-list"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function DashboardPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user's projects
  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  // Fetch user's tasks
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*, projects(name)")
    .eq("user_id", session.user.id)
    .order("due_date", { ascending: true })
    .limit(5)

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Dashboard" text="Welcome back! Here's an overview of your tasks and projects." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-card rounded-lg border border-border">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{tasks?.filter((task) => task.status === "todo").length || 0}</h3>
            <p className="text-sm text-muted-foreground">Tasks To Do</p>
          </div>
        </div>
        <div className="p-6 bg-card rounded-lg border border-border">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{tasks?.filter((task) => task.status === "in_progress").length || 0}</h3>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
        </div>
        <div className="p-6 bg-card rounded-lg border border-border">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{tasks?.filter((task) => task.status === "completed").length || 0}</h3>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
        <div className="p-6 bg-card rounded-lg border border-border">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{projects?.length || 0}</h3>
            <p className="text-sm text-muted-foreground">Projects</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Tasks</h2>
            <Link href="/dashboard/tasks">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <TaskList tasks={tasks || []} />
          <div className="mt-4">
            <Link href="/dashboard/tasks/new">
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add New Task
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Projects</h2>
            <Link href="/dashboard/projects">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <ProjectList projects={projects || []} />
          <div className="mt-4">
            <Link href="/dashboard/projects/new">
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
