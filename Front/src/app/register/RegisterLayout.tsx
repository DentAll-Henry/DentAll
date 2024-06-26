import "../globals.css";
import SideNav from "@/components/NavBar/sideNavBar";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
