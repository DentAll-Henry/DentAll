'use client'
import React, { useEffect } from "react";
import { Webchat, WebchatProvider, useClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";

import "./style.css";
import { enviroment } from "@/utils/config";

const clientId = enviroment.botpressClient;

const { style, theme } = buildTheme({
  themeName: "dusk",
  themeColor: "#00CE90",
});

const FAQChatBot: React.FC = () => {
  const client = useClient({ clientId });

  useEffect(() => {
    // Verificar si estamos en el navegador antes de interactuar con el DOM
    if (typeof document !== "undefined") {
      // Acciones que dependen de `document` aquí
      // Por ejemplo, manipulación del DOM, eventos, etc.
    }
  }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez después del montaje

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
  );
};

export default FAQChatBot;
