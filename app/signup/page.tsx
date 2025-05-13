import { AuthForm } from "@/components/auth-form"
import { createServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function SignupPage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container flex flex-col items-center justify-center flex-1 w-full px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center mb-8 text-xl font-bold gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-primary"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          TaskMaster
        </Link>
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter your email below to create your account</p>
          </div>
          <AuthForm type="signup" />
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
