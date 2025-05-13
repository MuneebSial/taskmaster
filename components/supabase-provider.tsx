"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const SupabaseContext = createContext(null)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return <SupabaseContext.Provider value={null}>{children}</SupabaseContext.Provider>
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}
