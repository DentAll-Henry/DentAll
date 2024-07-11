import Image from "next/image";

const page = () => {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%] ">
      <div className="m-8 bg-darkD-500 p-4 mt-24">
        <h2 className="text-2xl font-bold">Datos de pago</h2>
        <p>Administra y busca tus pagos.</p>
        <div>
          <p className="font-bold">Nombres:</p>
          <p className="font-bold">Metodo de pago:</p>
        </div>
      </div>

      <div className=" mt-12 m-8 text-xl">
        <h2 className="font-bold">Historial de pagos</h2>
      </div>

      <div className="flex">
        <div className="p-8">
          <div className="flex-col bg-greenD-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <p className="text-[#60D66A]">Implante dental</p>
            <p className="text-[#60D66A]">$100</p>
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201228/Vector_b9qqdm.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
          </div>
        </div>
        <div className="p-8">
          <div className="flex-col bg-greenD-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <p className="text-[#60D66A]">Implante dental</p>
            <p className="text-[#60D66A]">$100</p>
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201228/Vector_b9qqdm.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
          </div>
        </div>
        <div className="p-8">
          <div className="flex-col bg-greenD-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <p className="text-[#60D66A]">Implante dental</p>
            <p className="text-[#60D66A]">$100</p>
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201228/Vector_b9qqdm.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
          </div>
        </div>
        <div className="p-8">
          <div className="flex-col bg-greenD-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <p className="text-[#60D66A]">Implante dental</p>
            <p className="text-[#60D66A]">$100</p>
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201228/Vector_b9qqdm.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
