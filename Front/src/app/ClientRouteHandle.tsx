"use client";

import { usePathname } from "next/navigation";
import DefaultLayout from "./Defaultlayout";
import PageLayout from "@/app/page/PageLayout";
import RegisterLayout from "@/app/register/RegisterLayout"; // Corrige la importación de RegisterLayout
import LoginLayout from "./login/LoginLayout";
import "@/app/globals.css";

export default function ClientRouteHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPageLayout = pathname.startsWith("/page");
  const isRegisterLayout = pathname.startsWith("/register");
  const isLoginLayout = pathname.startsWith("/login");

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
