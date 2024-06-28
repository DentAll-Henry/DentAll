
import SideNav from "@/components/NavBar/sideNavBar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-darkD-600">
        <div className="flex ">
          <SideNav />
          {children}
        </div>
      </body>
    </html>
  );
}
// className = "flex h-screen flex-col md:flex-row md:overflow-hidden";
// className = "w-full flex-none md:w-64";
// className = "flex-grow";
