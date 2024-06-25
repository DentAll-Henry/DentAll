import React from "react";
import Image from "next/image";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-full max-w-[1440px] h-full max-h-[1024px]">
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
            <div className="w-full max-w-[100%] mt-2 flex justify-end">
              <a href="#" className="text-[#00CE90] font-mulish text-[15px]">
                Olvidé mi contraseña
              </a>
            </div>
          </div>
          <div className="w-full max-w-[80%] mt-4 flex justify-center">
            <button className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] rounded-[1px] bg-[#00CE90]">
              <span className="text-[#030423] font-maven-pro text-[16px] font-semibold leading-normal">
                Crear cuenta
              </span>
            </button>
          </div>
          <div className="w-full max-w-[80%] text-[#00CE90] mt-8 flex flex-col items-center space-y-4">
            <a href="#">O registrate con:</a>
            <div className="flex space-x-4">
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <Image
                  src="/images/RS1.svg"
                  alt="Register Image"
                  layout="fill"
                />
              </div>
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <Image
                  src="/images/RS2.svg"
                  alt="Register Image"
                  layout="fill"
                />
              </div>
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <Image
                  src="/images/RS3.svg"
                  alt="Register Image"
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full relative">
          <Image
            src="/images/ImgReg.svg"
            alt="Register Image"
            layout="fill"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
