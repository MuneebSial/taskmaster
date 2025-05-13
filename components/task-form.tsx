"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Project {
  id: string
  name: string
}

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  due_date: string | null
  project_id: string | null
}

export function TaskForm({
  projects,
  userId,
  task,
}: {
  projects: Project[]
  userId: string
  task?: Task
}) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const defaultProjectId = searchParams.get("project") || task?.project_id || ""

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(task?.title || "")
  const [description, setDescription] = useState(task?.description || "")
  const [status, setStatus] = useState(task?.status || "todo")
  const [priority, setPriority] = useState(task?.priority || "medium")
  const [dueDate, setDueDate] = useState(task?.due_date || "")
  const [projectId, setProjectId] = useState(defaultProjectId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (task) {
        // Update existing task
        const { error } = await supabase
          .from("tasks")
          .update({
            title,
            description,
            status,
            priority,
            due_date: dueDate || null,
            project_id: projectId || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", task.id)

        if (error) throw error

        toast({
          title: "Task updated",
          description: "Your task has been updated successfully.",
        })
      } else {
        // Create new task
        const { error } = await supabase.from("tasks").insert({
          title,
          description,
          status,
          priority,
          due_date: dueDate || null,
          project_id: projectId || null,
          user_id: userId,
        })

        if (error) throw error

        toast({
          title: "Task created",
          description: "Your new task has been created successfully.",
        })
      }

      router.refresh()
      router.push("/dashboard/tasks")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe your task"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select value={projectId} onValueChange={(value) => setProjectId(value)}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_project">No Project</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
