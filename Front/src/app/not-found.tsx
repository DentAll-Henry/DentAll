import Link from "next/link";
import Image from "next/image";
import React from "react";


const NotFoundPage = () => {
  return (
    <div className="min-h-screen text-white flex flex-col justify-center items-center text-center p-4">
      <div className="flex">
        <Image
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721069004/Dientin_404_cnlpwk.png"
          alt="Logo"
          width={300}
          height={50}
        />
      </div>
      <h1 className="text-4xl font-bold  mt-4">
        Ups! Lo siento no encontré lo que buscabas...
      </h1>
      <p className="text-gray-600 mt-2">
        Aqui esta el boton para que vuelvas al inicio
      </p>
      <Link href="/">
        <p className="mt-4 inline-block bg-greenD-500 text-black px-6 py-3 rounded font-bold shadow hover:bg-greenD-400 transition duration-300">
          Volver al Inicio
        </p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
