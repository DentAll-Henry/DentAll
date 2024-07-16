import "./globals.css";
import Navbar from "../components/NavBar/navBar";
import Footer from "../components/Footers/Footer";

import React from "react";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
