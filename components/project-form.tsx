"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  description: string
  status: string
}

export function ProjectForm({
  userId,
  project,
}: {
  userId: string
  project?: Project
}) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(project?.name || "")
  const [description, setDescription] = useState(project?.description || "")
  const [status, setStatus] = useState(project?.status || "active")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (project) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            name,
            description,
            status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", project.id)

        if (error) throw error

        toast({
          title: "Project updated",
          description: "Your project has been updated successfully.",
        })
      } else {
        // Create new project
        const { error } = await supabase.from("projects").insert({
          name,
          description,
          status,
          user_id: userId,
        })

        if (error) throw error

        toast({
          title: "Project created",
          description: "Your new project has been created successfully.",
        })
      }

      router.refresh()
      router.push("/dashboard/projects")
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
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe your project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
