import React from "react";
import Image from "next/image";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1D1D1D]">
      <div className="flex w-full h-full">
        <div className="w-1/3 flex flex-col items-center bg-[#1D1D1D] text-white p-8">
          <h2 className="text-[#ECEDF6] font-maven-pro text-[34px] font-semibold leading-normal mb-4">
            Bienvenido a Dentall
          </h2>
          <div className="w-[80%] flex flex-col gap-4">
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
            <div className="w-full mt-2 flex justify-end">
              <a href="#" className="text-[#00CE90] font-mulish text-[15px]">
                Olvidé mi contraseña
              </a>
            </div>
          </div>
          <div className="w-full mt-4 flex justify-center">
            <button className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] rounded-[1px] bg-[#00CE90]">
              <span className="text-[#030423] font-maven-pro text-[16px] font-semibold leading-normal">
                Crear cuenta
              </span>
            </button>
          </div>
          <div className="w-full text-[#00CE90] mt-8 flex flex-col items-center space-y-4">
            <p>O registrate con:</p>
            <div className="flex space-x-4">
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <a href="#">
                  <Image
                    src="/images/RS1.svg"
                    alt="Register Image"
                    layout="fill"
                  />
                </a>
              </div>
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <a href="#">
                  <Image
                    src="/images/RS2.svg"
                    alt="Register Image"
                    layout="fill"
                  />
                </a>
              </div>
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <a href="#">
                  <Image
                    src="/images/RS3.svg"
                    alt="Register Image"
                    layout="fill"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 h-full relative">
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
