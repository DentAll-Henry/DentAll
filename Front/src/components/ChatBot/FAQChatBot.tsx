"use client"
import { Webchat, WebchatProvider, useClient } from "@botpress/webchat"

import "./style.css"
import { theme } from "./theme"
import { enviroment } from "@/utils/config"

const clientId = enviroment.botpressClient

export const FAQChatBot = () => {
  const client = useClient({ clientId })

  return (
    <WebchatProvider client={client} theme={theme}>
      <Webchat />
    </WebchatProvider>
  )
}

