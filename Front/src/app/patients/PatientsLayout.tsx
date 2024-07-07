import SideNav from "@/components/NavBar/sideNavBar";

const PatientsLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    {
      href: "/patients",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201273/home_gfeqo8.svg",
      alt: "Home",
      text: "Inicio",
    },
    {
      href: "/patients/appointments",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201245/citas1_fhc7so.svg",
      alt: "Citas",
      text: "Mis citas",
    },
    {
      href: "/patients/appointments",
      src: "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201326/recetass_si2se4.svg",
      alt: "Recetas médicas",
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
      <body className="bg-darkD-600">
        <div className="flex ">
          <SideNav navItems={navItems} styles={styles} />
          {children}
        </div>
      </body>
    </html>
  );
};

export default PatientsLayout;
