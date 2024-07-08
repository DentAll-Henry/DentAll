import { ServicesForPatient } from "@/components/services/ServicesForPatient";

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

      <ServicesForPatient />
    </div>
  );
};

export default page;
