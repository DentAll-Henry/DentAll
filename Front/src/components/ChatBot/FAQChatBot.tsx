"use client"
import { useEffect, useState } from "react"
import { Webchat, WebchatProvider, useClient } from "@botpress/webchat"
import { buildTheme } from "@botpress/webchat-generator"
import "./style.css"
import { enviroment } from "@/utils/config"

const clientId = enviroment.botpressClient

const { style, theme } = buildTheme({
  themeName: "dusk",
  themeColor: "#00CE90",
})

export const FAQChatBot = () => {
  const [isClient, setIsClient] = useState(false)
  const client = useClient({
    clientId,
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <WebchatProvider
      client={client}
      theme={theme}
      configuration={{
        botName: "Dientín",
        botAvatar:
          "https://res.cloudinary.com/ddpohfyur/image/upload/v1720649005/Logo_DentAll_con_borde_fmpp5r.png",
        composerPlaceholder: "Empieza a chatear con Dientín",
      }}
    >
      <style>{style}</style>
      <Webchat />
    </WebchatProvider>
  )
}

