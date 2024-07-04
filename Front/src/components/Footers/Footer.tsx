
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="text-white">
      <div className="bg-[#1D1D1D] flex justify-between items-center p-12">
        <div>
          <Image
            src="/images/Logo.svg"
            alt="Logo.svg"
            width={200}
            height={50}
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">CONTACTO</h1>
          <Link className="hover:text-greenD-500" href="#">
            <p>dentall@gmail.com</p>
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
          <Link className="hover:text-greenD-500" href="#">
            <p>Nuestros Servicios</p>
          </Link>
        </div>

        <div className="flex gap-4">
          <Link href="#">
            <Image
              src="/images/WhatsApp.svg"
              alt="Logo.svg"
              width={30}
              height={30}
              priority
            />
          </Link>

          <Link href="#">
            <Image
              src="/images/facebook.svg"
              alt="Logo.svg"
              width={30}
              height={30}
              priority
            />
          </Link>

          <Link href="#">
            <Image
              src="/images/LinkedIn.svg"
              alt="Logo.svg"
              width={30}
              height={30}
              priority
            />
          </Link>

          <Link href="#">
            <Image
              src="/images/Instagram.svg"
              alt="Logo.svg"
              width={30}
              height={30}
              priority
            />
          </Link>
        </div>
      </div>

      <div className="text-center  bg-[#404040] p-4">
        &copy;DentAll 2024 Todos los derechos reservados
      </div>
    </div>
  );
};

export default Footer;
