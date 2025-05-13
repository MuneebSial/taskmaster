import { createServerClient } from "@/lib/supabase-server"
import { DashboardHeader } from "@/components/dashboard-header"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile-form"

export default async function ProfilePage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch profile data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  return (
    <div className="container max-w-4xl py-8">
      <DashboardHeader heading="Profile" text="Manage your account settings and profile information." />

      <div className="grid gap-8 mt-8">
        <ProfileForm profile={profile} user={session.user} />
      </div>
    </div>
  )
}
