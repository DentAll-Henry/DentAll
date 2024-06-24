import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { maven, mulish } from '@/app/fonts';

const Footer = () => {
  return (
    <div className="text-white">
      <div className="bg-gray-800 flex justify-between items-center p-4">
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
          <h1 className={`${mulish.className} text-2xl`}>CONTACTO</h1>
          <Link href="#">
            <p>dentall@gmail.com</p>
          </Link>
          <Link href="#">
            <p>+51 9128273890</p>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">HORARIOS</h1>
          <p>Lunes - Viernes: 9:00 - 18:00</p>
          <p>Sábado: 9:00 - 14:00</p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">EMPRESA</h1>
          <Link href="#">
            <p>Sobre Nosotros</p>
          </Link>
          <Link href="/about">
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

      <div className="text-center  bg-zinc-700 p-4">
        &copy;Dentall 2024 Todos los derechos reservados
      </div>
    </div>
  );
}

export default Footer
