"use client";
import React, { useState, useEffect } from "react";
import { Webchat, WebchatProvider, useClient } from "@botpress/webchat";
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

  const toggleChat = () => {
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
            width: "250px",
            height: "300px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <button
            onClick={toggleChat}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              zIndex: 1001,
            }}
          >
            &times;
          </button>
          <WebchatProvider
            client={client}
            theme={theme}
            configuration={{
              botName: "Dientín",
              botAvatar:
                "https://res.cloudinary.com/ddpohfyur/image/upload/v1720812990/Dientin_niogsu.png",
              composerPlaceholder: "Empieza a chatear con Dientín",
            }}
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
