"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Project {
  id: string
  name: string
}

export function TaskFilter({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [status, setStatus] = useState(searchParams.get("status") || "all")
  const [priority, setPriority] = useState(searchParams.get("priority") || "all")
  const [project, setProject] = useState(searchParams.get("project") || "all")

  const handleFilter = () => {
    const params = new URLSearchParams()

    if (status !== "all") params.set("status", status)
    if (priority !== "all") params.set("priority", priority)
    if (project !== "all") params.set("project", project)

    router.push(`/dashboard/tasks?${params.toString()}`)
  }

  const handleReset = () => {
    setStatus("all")
    setPriority("all")
    setProject("all")
    router.push("/dashboard/tasks")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger id="project">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleFilter}>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}
