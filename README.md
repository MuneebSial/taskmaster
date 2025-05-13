# TaskMaster - Collaborative Task Management Application

![TaskMaster Logo](./public/taskmaster-logo.png)

TaskMaster is a modern, collaborative task management application built with Next.js and Supabase. It helps teams organize work, track progress, and meet deadlines efficiently.

## 📋 Table of Contents

- [Use Case](#-use-case)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Use Case

TaskMaster addresses the challenges of modern team collaboration and task management:

- **Problem**: Teams struggle with task organization, progress tracking, and maintaining clear communication across projects.
- **Solution**: TaskMaster provides a centralized platform where teams can create, assign, and track tasks in real-time, organize work into projects, and maintain clear visibility of progress.

**Target Users**:
- Small to medium-sized teams
- Project managers
- Freelancers managing multiple clients
- Remote teams needing asynchronous collaboration tools

## ✨ Features

- **User Authentication**
  - Secure email/password authentication
  - User profile management with avatar uploads
  - Protected routes and session management

- **Task Management**
  - Create, edit, and delete tasks
  - Set priorities (low, medium, high)
  - Track status (to-do, in progress, completed)
  - Set due dates and descriptions
  - Filter tasks by various criteria

- **Project Organization**
  - Group tasks into projects
  - Track project status and progress
  - View all tasks within a project
  - Project descriptions and metadata

- **Dashboard & Analytics**
  - Overview of task status distribution
  - Recent tasks and projects
  - Quick access to important information

- **Responsive Design**
  - Works seamlessly on desktop, tablet, and mobile devices
  - Adaptive layout for different screen sizes

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **React Hook Form** - Form validation and handling
- **Lucide Icons** - Beautiful, consistent icons

### Backend
- **Supabase** - Open-source Firebase alternative
  - **Supabase Auth** - Authentication and user management
  - **Supabase Database** - PostgreSQL database with RLS
  - **Supabase Storage** - File storage for avatars
  - **Supabase Realtime** - Real-time data updates

### DevOps
- **Vercel** - Deployment and hosting
- **GitHub** - Version control

## 🏗 Architecture

TaskMaster follows a modern architecture leveraging Next.js App Router and Supabase:

### Design Patterns

1. **Server Components & Client Components**
   - Server components for data fetching and initial rendering
   - Client components for interactive elements
   - Clear separation with "use client" directive

2. **Repository Pattern**
   - Supabase client abstracts database operations
   - Centralized data access through service functions

3. **Context Provider Pattern**
   - SupabaseProvider for authentication state
   - Theme provider for dark/light mode

4. **Row Level Security (RLS)**
   - Database-level security policies
   - Users can only access their own data
   - Fine-grained access control

### Data Flow

\`\`\`
User Interaction → Client Component → Server Action → Supabase → Database
                                     ↓
                 UI Update ← State Update ← Response
\`\`\`

### Security

- JWT-based authentication
- PostgreSQL Row Level Security
- Environment variable protection
- CSRF protection via Next.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Setup Instructions

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/taskmaster.git
cd taskmaster
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
\`\`\`

3. **Set up Supabase**

- Create a new Supabase project at [supabase.com](https://supabase.com)
- Run the SQL from `supabase/schema.sql` in the SQL Editor
- Create a `.env.local` file with your Supabase credentials:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

4. **Run the development server**

\`\`\`bash
npm run dev
\`\`\`

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Ftaskmaster)

## 📁 Project Structure

\`\`\`
taskmaster/
├── app/                  # Next.js App Router
│   ├── auth/             # Authentication routes
│   ├── dashboard/        # Dashboard and app features
│   ├── profile/          # User profile management
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── ui/               # UI components (shadcn)
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions
│   ├── supabase-server.ts # Server-side Supabase client
│   └── utils.ts          # Helper functions
├── public/               # Static assets
├── supabase/             # Supabase configuration
│   └── schema.sql        # Database schema
├── middleware.ts         # Next.js middleware for auth
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript configuration
\`\`\`

## 📸 Screenshots

![Dashboard](./public/screenshots/dashboard.png)
*Dashboard with task overview and statistics*

![Task Management](./public/screenshots/tasks.png)
*Task management interface with filtering*

![Project Details](./public/screenshots/project-detail.png)
*Project details with associated tasks*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by [Your Name](https://github.com/yourusername)
