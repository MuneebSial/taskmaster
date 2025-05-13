import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  due_date: string
  project_id: string
  projects: {
    name: string
  }
  created_at: string
}

export function TaskDetail({ task }: { task: Task }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      case "in_progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "medium":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "high":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Task Details</CardTitle>
          <div className="flex gap-2">
            <Badge className={getStatusColor(task.status)}>{task.status.replace("_", " ").toUpperCase()}</Badge>
            <Badge className={getPriorityColor(task.priority)}>{task.priority.toUpperCase()} PRIORITY</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
            <p className="mt-1">{task.description || "No description provided"}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Project</h3>
              <p className="mt-1">{task.projects?.name || "No project"}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Due Date</h3>
              <p className="mt-1">{task.due_date ? formatDate(task.due_date) : "No due date"}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Created</h3>
              <p className="mt-1">{formatDate(task.created_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
