
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
