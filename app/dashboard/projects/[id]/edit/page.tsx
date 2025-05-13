import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { redirect } from "next/navigation"
import { ProjectForm } from "@/components/project-form"

export default async function EditProjectPage({
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

  // Fetch project details
  const { data: project } = await supabase.from("projects").select("*").eq("id", params.id).single()

  if (!project) {
    redirect("/dashboard/projects")
  }

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Edit Project" text="Update your project details." />

      <div className="max-w-2xl">
        <ProjectForm userId={session.user.id} project={project} />
      </div>
    </div>
  )
}
