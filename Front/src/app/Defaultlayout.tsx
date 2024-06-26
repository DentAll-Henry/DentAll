import "./globals.css";
import Navbar from "@/components/NavBar/navBar";
import Footer from "@/components/Footers/Footer";

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
