import LandingPage from "@/components/LandingPage/LandingPage"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

export default function Home() {
  return (
    <div>
      <a href="/api/auth/login">Login</a>
      <LandingPage />
    </div>
  )
}
