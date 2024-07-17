import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div className="flex-grow mt-24">
        <div className="flex flex-col gap-4 text-orange-300 justify-end p-4 ">
          <Link
            className="bg-[#222222] border rounded-md px-3 py-1 text-white hover:bg-[#454545]"
            href="/admin/users/patients"
          >
            pacientes
          </Link>
          <Link
            className="bg-[#222222] border rounded-md px-3 py-1 text-white hover:bg-[#454545]"
            href="/admin/users/dentists"
          >
            dentistas
          </Link>
        </div>
      </div>
    </>
  );
}
