import SideNav from "@/components/NavBar/sideNavBar";

const AdministrativeLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    {
      href: "/administrative",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201273/home_gfeqo8.svg",
      alt: "Home",
      text: "Inicio",
    },
    // {
    //   href: "/administrative/patients",
    //   src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201242/citas_bpks2p.svg",
    //   alt: "Pacientes",
    //   text: "Pacientes",
    // },
    // {
    //   href: "/administrative",
    //   src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720362622/Property_Simple_Type_circle-information_oofcv6.svg",
    //   alt: "Contenido",
    //   text: "Contenido",
    // },
    // {
    //   href: "#",
    //   src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg",
    //   alt: "Citas",
    //   text: "Recetas médicas",
    // },
    // // más items...
  ];

  const styles = {
    container: "bg-darkD-500",
    nav: "",
    navItem: "",
    navItemHover: "hover:bg-zinc-600",
    navItemText: "",
    navItemTextHover: "group-hover:text-greenD-500",
    headerText: "text-red-500 text-start ml-8",
  };

  return (
    <html lang="en">
      <body className="bg-darkD-600">
        <div className="flex ">
          <SideNav navItems={navItems} styles={styles} headerText="Administrativo" />
          {children}
        </div>
      </body>
    </html>
  );
};

export default AdministrativeLayout;
