"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Profile {
  id: string
  full_name: string
  username: string
  avatar_url: string
  bio: string
  updated_at: string
}

export function ProfileForm({
  profile,
  user,
}: {
  profile: Profile | null
  user: User
}) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [username, setUsername] = useState(profile?.username || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0])
      // Create a preview URL
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let newAvatarUrl = avatarUrl

      // Upload new avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop()
        const filePath = `avatars/${user.id}.${fileExt}`

        // Upload the file to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true })

        if (uploadError) throw uploadError

        // Get the public URL
        const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath)

        newAvatarUrl = publicUrlData.publicUrl
      }

      // Update profile in the database
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullName,
        username,
        avatar_url: newAvatarUrl,
        bio,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details and profile picture.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={fullName} />
              <AvatarFallback>
                {fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() ||
                  user.email?.charAt(0).toUpperCase() ||
                  "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Label htmlFor="avatar">Profile Picture</Label>
              <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email || ""} disabled className="bg-muted" />
            <p className="text-sm text-muted-foreground">Your email cannot be changed.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell us a little about yourself"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
