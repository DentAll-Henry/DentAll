import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="text-white">
      <div className="w-full border-t border-gray-400 shadow-sm"></div>
      <div className="bg-[#1D1D1D] flex justify-between items-center p-12">
        <div>
          <Image
            src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720194389/Logo-DentAll_qh1uqi.webp"
            alt="Logo.svg"
            width={200}
            height={50}
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">CONTACTO</h1>
          <Link
            className="hover:text-greenD-500"
            href="mailto:dentallabgotvv@gmail.com"
          >
            <p>dentallabgotvv@gmail.com</p>
          </Link>
          <Link className="hover:text-greenD-500" href="#">
            <p>+51 9128273890</p>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">HORARIOS</h1>
          <p>Lunes - Viernes: 9:00 - 18:00</p>
          <p>Sábado: 9:00 - 14:00</p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">EMPRESA</h1>
          <Link className="hover:text-greenD-500" href="/about">
            <p>Sobre Nosotros</p>
          </Link>
          <Link className="hover:text-greenD-500" href="/services">
            <p>Nuestros Servicios</p>
          </Link>
        </div>

        <div className="flex gap-4">
          <Link href="#" className="transition-all  hover:scale-110">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201233/WhatsApp_w3qogu.svg"
              alt="Whatsapp"
              width={30}
              height={30}
              priority
            />
          </Link>

          <Link className="transition-all  hover:scale-110" href="#">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201266/Facebook_hd5g54.svg"
              alt="Facebook"
              width={30}
              height={30}
              priority
            />
          </Link>

          <Link href="#" className="transition-all  hover:scale-110">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201282/LinkedIn_i5rnli.svg"
              alt="LinkedIn"
              width={30}
              height={30}
              priority
            />
          </Link>

          <Link href="#" className="transition-all  hover:scale-110">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201280/Instagram_qys7th.svg"
              alt="Instagram"
              width={30}
              height={30}
              priority
            />
          </Link>
        </div>
      </div>

      <div className="text-center  bg-[#404040] p-4">
        Copyright &copy; DentAll - 2024 - Todos los derechos reservados.
      </div>
    </div>
  );
};

export default Footer;
