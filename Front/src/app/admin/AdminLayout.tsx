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
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201242/citas_bpks2p.svg",
      alt: "Pacientes",
      text: "Pacientes",
    },
    {
      href: "/admin",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720362622/Property_Simple_Type_circle-information_oofcv6.svg",
      alt: "Contenido",
      text: "Contenido",
    },
    {
      href: "#",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg",
      alt: "Citas",
      text: "Recetas médicas",
    },
    // más items...
  ];

  const styles = {
    container: "bg-darkD-500",
    nav: "",
    navItem: "",
    navItemHover: "hover:bg-zinc-600",
    navItemText: "",
    navItemTextHover: "group-hover:text-greenD-500",
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
