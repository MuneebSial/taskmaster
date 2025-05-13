import { CheckCircle2, Clock, Users, FileText, Bell, Zap } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Task Management",
      description: "Create, organize, and track your tasks with ease. Set priorities, due dates, and categories.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share projects with team members, assign tasks, and work together seamlessly.",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Track time spent on tasks and projects to improve productivity and billing.",
    },
    {
      icon: FileText,
      title: "File Attachments",
      description: "Attach files to tasks and projects for easy reference and collaboration.",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Stay updated with real-time notifications for task assignments and updates.",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "See changes instantly as they happen with real-time database updates.",
    },
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Powerful Features for Productive Teams</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            TaskMaster provides all the tools you need to stay organized, collaborate effectively, and get more done.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-4 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
