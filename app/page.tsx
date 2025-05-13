import { Button } from "@/components/ui/button"
import { createServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"

export default async function Home() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
          <div className="flex items-center gap-2">
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
            <span className="text-xl font-bold">TaskMaster</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container px-4 mx-auto sm:px-6">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
