import SideNav from "@/components/NavBar/sideNavBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    {
      href: "/admin",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201273/home_gfeqo8.svg",
      alt: "Home",
      text: "Inicio",
    },
    {
      href: "/admin",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201273/home_gfeqo8.svg",
      alt: "Home",
      text: "Inicio",
    },
    {
      href: "/admin",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201273/home_gfeqo8.svg",
      alt: "veremos",
      text: "Inicio",
    },
    {
      href: "#",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg",
      alt: "Citas",
      text: "Veremos",
    },
    // más items...
  ];

  const styles = {
    container: "bg-greenD-700",
    nav: "",
    navItem: "",
    navItemHover: "hover:bg-greenD-500",
    navItemText: "",
    navItemTextHover: "group-hover:text-black",
  };

  return (
    <html lang="en">
      <body>
        <div className="flex ">
       
          <SideNav  navItems={navItems} styles={styles} />
          {children}
        </div>
      </body>
    </html>
  );
};

export default AdminLayout;
