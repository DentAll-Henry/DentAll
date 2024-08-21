import { useState } from "react";
import Modal from "../Modal/Modal";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

type CloseFunction = () => void;

const RestorePasswordModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: CloseFunction;
}) => {
  const [emailInfo, setEmailInfo] = useState({
    email: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEmailInfo({
      email: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axiosInstance.post(
      '/auth/request-restore-password',
      emailInfo,
    );
    onClose();
    await Swal.fire({
      title: "¡Solicitud creada!",
      text: "Revise su buzón de correo electrónico",
      icon: "warning",
      confirmButtonText: "Aceptar",
      background: "#1D1D1D", // Cambia este valor al color de fondo que prefieras
      customClass: {
        confirmButton:
          "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
        title: "text-greenD-500", // Cambia el color del texto del título
        popup: "text-white", // Cambia el color del texto del contenido
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#1A2228] rounded-lg p-6 text-white space-y-4">
        <h2 className="text-center text-xl font-semibold">Restaurar contraseña</h2>
        <form onSubmit={handleSubmit} className="rounded-lg p-6 space-y-4 flex flex-col justify-center items-center">
          <div className="flex flex-col w-[80%]">
            <label> Correo electrónico:</label>
            <input
              type="text"
              id="email"
              className="text-black rounded"
              name="email"
              placeholder="example@mail.com"
              value={emailInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className="rounded block px-4 py-2 text-l w-fit text-center text-black bg-greenD-500 cursor-pointer"
            type="submit"
          >
            Restaurar contraseña
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RestorePasswordModal;
