"use client";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

interface NavItem {
  href: string;
  src: string;
  alt: string;
  text: string;
}

interface SideNavProps {
  navItems: NavItem[];
  styles: {
    container: string;
    nav: string;
    navItem: string;
    navItemHover: string;
    navItemText: string;
    navItemTextHover: string;
    headerText: string; // Nueva clase de estilo para el texto del encabezado
  };
  headerText: string; // Nueva propiedad para el texto del encabezado
}

const SideNav = ({ navItems, styles, headerText }: SideNavProps) => {
  const handleLogout = () => {
    localStorage.removeItem("userSession");
    Swal.fire({
      title: "¡Excelente!",
      text: "Sesión cerrada correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton:
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
      },
    });
  };

  return (
    <div className={`h-screen w-[20%] ${styles.container} text-white fixed`}>
      <div className="py-4 ml-6 mt-3">
        <Image
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720194389/Logo-DentAll_qh1uqi.webp"
          alt="Logo DentAll"
          width={200}
          height={50}
          priority
        />
      </div>
      {/* Añadir el texto dinámico aquí */}
      <div
        className={`text-center mt-4 text-lg font-bold ${styles.headerText}`}
      >
        {headerText}
      </div>
      <nav className={`mt-5 ${styles.nav}`}>
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`py-2 px-4 m-4 rounded-xl ${styles.navItem} ${styles.navItemHover} group`}
            >
              <Link className="flex gap-4" href={item.href}>
                <Image
                  className="group-hover:fill-current text-white"
                  src={item.src}
                  width={24}
                  height={24}
                  alt={item.alt}
                />
                <p
                  className={`${styles.navItemText} ${styles.navItemTextHover}`}
                >
                  {item.text}
                </p>
              </Link>
            </li>
          ))}
          <li
            className={`py-2 px-4 m-4 rounded-xl ${styles.navItem} ${styles.navItemHover} group`}
          >
            <Link className="flex gap-4" href="/">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720362437/Property_Power_bmot88.svg"
                width={24}
                height={24}
                alt="Cerrar sesión"
              />
              <button
                onClick={handleLogout}
                className={`${styles.navItemText} ${styles.navItemTextHover}`}
              >
                Cerrar sesión
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      {/* <div className="flex items-end justify-end mt-[90%] mr-4">
        <Image
          className="group-hover:fill-current text-white"
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720203858/robot_dki1y5.webp"
          width={50}
          height={50}
          alt="Chat bot"
        />
      </div> */}
    </div>
  );
};

export default SideNav;
