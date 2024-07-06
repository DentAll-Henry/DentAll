import SideNav from "@/components/NavBar/sideNavBar";

const ProfessionalLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    {
      href: "/dashboard3/home",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201273/home_gfeqo8.svg",
      alt: "Home",
      text: "Inicio",
    },
    {
      href: "/dashboard3/appointments",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg",
      alt: "Citas",
      text: "Mis citas",
    },
    {
      href: "/dashboard3/appointments",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg",
      alt: "Citas",
      text: "Mis citas",
    },
    {
      href: "/dashboard3/appointments",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg",
      alt: "Citas",
      text: "Mis citas",
    },
    // más items...
  ];

  const styles = {
    container: "bg-blue-400",
    nav: "",
    navItem: "",
    navItemHover: "hover:bg-blue-500",
    navItemText: "",
    navItemTextHover: "group-hover:text-black",
  };

  return (
    <html lang="en">
      <body >
        <div className="flex ">
          <SideNav navItems={navItems} styles={styles} />
          {children}
        </div>
      </body>
    </html>
  );
};

export default ProfessionalLayout;
