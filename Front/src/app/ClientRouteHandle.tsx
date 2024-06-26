"use client";

import { usePathname } from "next/navigation";
import DefaultLayout from "./Defaultlayout";
import PageLayout from "@/app/page/PageLayout";
import "@/app/globals.css";

export default function ClientRouteHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPageLayout = pathname.startsWith("/page"); // Ajusta este criterio según tus rutas

  return isPageLayout ? (
    <PageLayout>{children}</PageLayout>
  ) : (
    <DefaultLayout>{children}</DefaultLayout>
  );
}
