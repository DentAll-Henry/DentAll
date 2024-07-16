import type { Metadata } from "next";
import ClientRouteHandler from "@/app/ClientRouteHandle";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  title: "DentAll",
  description: "DentAll es una clínica dental innovadora que pone a sus pacientes en el centro de la experiencia de atención. Con un enfoque en la comodidad y la eficiencia, DentAll ha desarrollado una plataforma en línea avanzada que transforma la manera en que los pacientes interactúan con su cuidado dental."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <ClientRouteHandler>{children}</ClientRouteHandler>
        </body>
      </UserProvider>
    </html>
  );
}
