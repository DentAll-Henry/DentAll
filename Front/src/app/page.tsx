import Image from "next/image";
import Footer from "../components/Footers/Footer";
import Navbar from "@/components/NavBar/navBar";
import LandingPage from "@/components/LandingPage/LandingPage";

export default function Home() {
  return (
    <div>
      <Navbar />
      <LandingPage/>
      <Footer />
    </div>
  );
}
