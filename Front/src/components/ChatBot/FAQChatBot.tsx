"use client";
import React, { useState, useEffect } from "react";
import {
  Webchat,
  WebchatProvider,
  useClient,
  useWebchatStore,
} from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import "./style.css";
import { enviroment } from "@/utils/config";
import Image from "next/image";

const clientId = enviroment.botpressClient;

const { style, theme } = buildTheme({
  themeName: "dusk",
  themeColor: "#00CE90",
});

const FAQChatBot: React.FC = () => {
  const client = useClient({ clientId });
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      // Acciones que dependen de `document` aquí
    }
  }, []);

  const toggleChat = async () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="flex items-end">¿Necesitas ayuda?</div>
        <Image
          className="group-hover:fill-current text-white cursor-pointer hover:scale-110"
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720812990/Dientin_niogsu.png"
          width={50}
          height={50}
          alt="Chat bot"
          onClick={toggleChat}
        />
      </div>
      {isChatOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "1px",
            right: "1px",
            width: "22rem",
            height: "35rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <WebchatProvider
            client={client}
            theme={{
              ...theme,
              header: {
                ...theme.header,
                content: {
                  ...theme?.header?.content,
                  actions: {
                    ...theme?.header?.content?.actions,
                    icons: {
                      ...theme?.header?.content?.actions?.icons,
                      style: {
                        ...theme?.header?.content?.actions?.icons?.style,
                        color: "#00CE90",
                      },
                    },
                  },
                },
              },
            }}
            configuration={{
              botName: "Dientín",
              botAvatar:
                "https://res.cloudinary.com/ddpohfyur/image/upload/v1720812990/Dientin_niogsu.png",
              composerPlaceholder: "Empieza a chatear con Dientín",
              botDescription:
                "Soy Dientín, tu asistente personal de DentAll. Puedes preguntarme aqui lo que necesites.",
              email: {
                title: "Email",
                link: "mailto:dentallabgotvv@gmail.com",
              },
            }}
            closeWindow={() => setIsChatOpen(!isChatOpen)}
          >
            <style>{style}</style>
            <Webchat />
          </WebchatProvider>
        </div>
      )}
    </div>
  );
};

export default FAQChatBot;
