"use client";

import { usePathname } from "next/navigation";
import DefaultLayout from "./Defaultlayout";
import PageLayout from "@/app/users/PageLayout";
import RegisterLayout from "@/app/register/RegisterLayout"; // Corrige la importación de RegisterLayout
import LoginLayout from "./login/LoginLayout";
import "@/app/globals.css";

import PatientsLayout from "./patients/PatientsLayout";
import AdminLayout from "./admin/AdminLayout";
import ProfessionalLayout from "./professional/ProfessionalLayout";
import AdministrativeLayout from "./administrative/AdministrativeLayout";

export default function ClientRouteHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPageLayout = pathname?.startsWith("/users");
  const isRegisterLayout = pathname?.startsWith("/register");
  const isLoginLayout = pathname?.startsWith("/login");
  const isPatientsLayout = pathname?.startsWith("/patients");
  const isAdminLayout = pathname?.startsWith("/admin");
  const isProfessionalLayout = pathname?.startsWith("/professional");
  const isAdministrativeLayout = pathname?.startsWith("/administrative");

  if (isPatientsLayout) {
    return <PatientsLayout>{children}</PatientsLayout>;
  }
  if (isAdministrativeLayout) {
    return <AdministrativeLayout>{children}</AdministrativeLayout>;
  }
  if (isAdminLayout) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  if (isProfessionalLayout) {
    return <ProfessionalLayout>{children}</ProfessionalLayout>;
  }
  if (isPageLayout) {
    return <PageLayout>{children}</PageLayout>;
  }
  if (isRegisterLayout) {
    return <RegisterLayout>{children}</RegisterLayout>;
  }
  if (isLoginLayout) {
    return <LoginLayout>{children}</LoginLayout>;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}
