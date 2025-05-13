import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { redirect } from "next/navigation"
import { ProjectForm } from "@/components/project-form"

export default async function NewProjectPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Create New Project" text="Add a new project to organize your tasks." />

      <div className="max-w-2xl">
        <ProjectForm userId={session.user.id} />
      </div>
    </div>
  )
}
