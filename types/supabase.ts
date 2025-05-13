export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          bio: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          updated_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          status: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status?: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          status?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          priority: string
          due_date: string | null
          project_id: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          project_id?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          project_id?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
