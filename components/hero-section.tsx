import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Manage tasks and collaborate with your team
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              TaskMaster helps you organize your work, collaborate with your team, and get more done. Track tasks,
              manage projects, and meet deadlines with ease.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="TaskMaster Dashboard"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
