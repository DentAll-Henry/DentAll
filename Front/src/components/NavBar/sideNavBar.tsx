"use client";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { enviroment } from "@/utils/config";
import dynamic from "next/dynamic";

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
    headerText: string;
  };
  headerText: string;
}

const DynamicFAQChatBot = dynamic(
  () => import("@/components/ChatBot/FAQChatBot"),
  {
    ssr: false,
  }
);

const SideNav = ({ navItems, styles, headerText }: SideNavProps) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userSession");

    const clientId = encodeURIComponent(enviroment.auth0.clientId + "");
    const domain = encodeURIComponent(enviroment.auth0.domain + "");
    const returnTo = encodeURIComponent(window.location.origin);

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

    const url = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}/api/auth/logout`;
    console.log(url);

    router.push(url);
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
            <button
              onClick={handleLogout}
              className={`${styles.navItemText} ${styles.navItemTextHover} flex gap-4`}
            >
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720362437/Property_Power_bmot88.svg"
                width={24}
                height={24}
                alt="Cerrar sesión"
              />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 right-0 mb-4 mr-4 ">
        <DynamicFAQChatBot />
      </div>
    </div>
  );
};

export default SideNav;
