import "../globals.css";
import SideNav from "@/components/NavBar/sideNavBar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
        <SideNav />
      {children}
    </div>
  );
}
// className = "flex h-screen flex-col md:flex-row md:overflow-hidden";
// className = "w-full flex-none md:w-64";
// className = "flex-grow";