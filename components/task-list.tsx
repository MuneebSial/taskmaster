import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  due_date: string
  project_id: string
  projects?: {
    name: string
  }
}

export function TaskList({ tasks }: { tasks: Task[] }) {
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

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No tasks found</h3>
        <p className="text-muted-foreground mt-1">Create your first task to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
            <div className="flex gap-2">
              <Badge className={getStatusColor(task.status)}>{task.status.replace("_", " ").toUpperCase()}</Badge>
              <Badge className={getPriorityColor(task.priority)}>{task.priority.toUpperCase()}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {task.description || "No description provided"}
            </p>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Project: {task.projects?.name || "None"}</span>
              {task.due_date && <span>Due: {formatDate(task.due_date)}</span>}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/dashboard/tasks/${task.id}`} className="ml-auto">
              <Button variant="ghost" size="sm">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
