import type { Metadata } from "next";
import ClientRouteHandler from "@/app/ClientRouteHandle";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechnoVID",
  description: "Sitio de venta exclusiva de Apple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientRouteHandler>{children}</ClientRouteHandler>
      </body>
    </html>
  );
}
