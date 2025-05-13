import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskList } from "@/components/task-list"
import { formatDate } from "@/lib/utils"

interface Project {
  id: string
  name: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  due_date: string
  project_id: string
  user_id: string
  created_at: string
}

export function ProjectDetail({
  project,
  tasks,
}: {
  project: Project
  tasks: Task[]
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "on_hold":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Project Details</CardTitle>
          <Badge className={getStatusColor(project.status)}>{project.status.replace("_", " ").toUpperCase()}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
            <p className="mt-1">{project.description || "No description provided"}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Created</h3>
              <p className="mt-1">{formatDate(project.created_at)}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Last Updated</h3>
              <p className="mt-1">{formatDate(project.updated_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Project Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} />
          ) : (
            <p className="text-center py-8 text-muted-foreground">No tasks found for this project.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
