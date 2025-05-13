import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: string
  created_at: string
}

export function ProjectList({ projects }: { projects: Project[] }) {
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

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No projects found</h3>
        <p className="text-muted-foreground mt-1">Create your first project to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
            <Badge className={getStatusColor(project.status)}>{project.status.replace("_", " ").toUpperCase()}</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description || "No description provided"}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Created: {formatDate(project.created_at)}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/dashboard/projects/${project.id}`} className="ml-auto">
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
