import { Lusitana, Montserrat, Maven_Pro, Mulish } from "next/font/google";

export const montserrat = Montserrat({ subsets: ["latin"] });

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const maven = Maven_Pro();

export const mulish = Mulish();
