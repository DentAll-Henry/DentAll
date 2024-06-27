import Image from "next/image";
import LandingPage from "@/components/LandingPage/LandingPage";


export default function Home() {
  return (
    <div>
      <LandingPage />
      <div className="w-full border-t border-gray-400 shadow-sm"></div>
    </div>
  );
}
