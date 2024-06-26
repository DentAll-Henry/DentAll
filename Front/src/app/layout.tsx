import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footers/Footer";
import Navbar from "@/components/NavBar/navBar";



export const metadata: Metadata = {
  title: "DentAll",
  description:
    "Una plataforma para hacer la vida de los odontólogos y pacientes mas sencilla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        {children}
      <Footer />
      </body>
    </html>
  );
}
