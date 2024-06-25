import React from "react";
import Image from "next/image";

const Register = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col items-center bg-gray-900 text-white p-8">
        <h2 className="text-[#ECEDF6] font-maven-pro text-[34px] font-semibold leading-normal mb-4">
          Bienvenido a Dentall
        </h2>
        <div className="w-full max-w-[80%] flex flex-col gap-4">
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              NOMBRE Y APELLIDO
            </label>
            <input
              className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
              placeholder="Placeholder"
            />
          </div>
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              DNI
            </label>
            <input
              className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
              placeholder="Placeholder"
            />
          </div>
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              DIRECCIÓN
            </label>
            <input
              className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
              placeholder="Placeholder"
            />
          </div>
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              TELÉFONO
            </label>
            <input
              className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
              placeholder="Placeholder"
            />
          </div>
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              CORREO ELECTRÓNICO
            </label>
            <input
              className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
              placeholder="Placeholder"
            />
          </div>
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              CONTRASEÑA
            </label>
            <input
              type="password"
              className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
              placeholder="Placeholder"
            />
          </div>
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              CONFIRMAR CONTRASEÑA
            </label>
            <input
              type="password"
              className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
              placeholder="Placeholder"
            />
          </div>
        </div>
        <div className="w-full max-w-[80%] mt-4">
          <button className="w-full py-2 bg-green-500 text-white rounded-md">
            Crear cuenta
          </button>
        </div>
      </div>
      <div className="w-1/2 h-full relative">
        <Image
          src="/images/ImgReg.svg"
          alt="Register Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Register;
