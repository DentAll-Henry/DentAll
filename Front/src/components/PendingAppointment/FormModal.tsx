import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import axiosInstance from "@/utils/axiosInstance";
import { ErrorMessage } from "formik";
import Select from "react-select";
import { Service } from "@/types";
import Swal from "sweetalert2";

type CloseFunction = () => void;

const FormModal = ({
  isOpen,
  onClose,
  patientId,
}: {
  isOpen: boolean;
  onClose: CloseFunction;
  patientId: string;
}) => {
  const [formData, setFormData] = useState({
    service: "",
    patient: patientId,
    description: "",
  });
  const [dentalServices, setDentalServices] = useState([]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axiosInstance.post(
      "/appointments/pending_appointment",
      formData
    );
    onClose();
    await Swal.fire({
      title: "¡Excelente!",
      text: "Nueva orden creada.",
      icon: "success",
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

  useEffect(() => {
    const getDentalServices = async () => {
      const response = await axiosInstance.get("/dental-serv?page=1&limit=100");
      const servicesActive = response.data.services.filter((s: Service) => s.isActive)
      setDentalServices(servicesActive);
    };
    getDentalServices();
  }, []);

  const customStyles = {
    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      border: "2px solid #00CE90",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #00CE90" : null,
      "&:hover": {
        borderColor: "#00CE90",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#00CE90",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "8px",
      border: "1px solid #00CE90",
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#777" : "white",
      color: state.isSelected ? "black" : "#00CE90",
      "&:hover": {
        backgroundColor: "#00CE90",
        color: "white",
      },
    }),
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#1A2228] rounded-lg p-6 text-white space-y-4">
        <h2 className="text-center text-xl font-semibold">Nueva orden</h2>
        <form onSubmit={handleSubmit} className="rounded-lg p-6 space-y-4">
          {/* <div className="flex flex-col">
              <label>Tipo de servicio:</label>
              <select
                name="service"
                className="text-black"
                onChange={handleInputChange}
                required
                value={formData.service}
              >
                <option disabled={true}>Seleccione el servicio...</option>
                {dentalServices.map((ds: any) => {
                  return (
                    <option key={ds.id} value={ds.id}>
                      {ds.name}
                    </option>
                  );
                })}
              </select>
            </div> */}
          <div className="mb-4">
            <label htmlFor="service">Servicio</label>
            <Select
              classNamePrefix="my-custom-select"
              styles={customStyles}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                colors: {
                  ...theme.colors,
                  primary25: "#00CE90",
                  primary: "#00CE90",
                },
              })}
              name="service"
              placeholder="Seleccione el servicio"
              onChange={(option) => {
                option && setFormData({ ...formData, service: option.value });
              }}
              //   option &&

              options={dentalServices.map((service: Service) => {
                return { label: service.name, value: service.id };
              })}
            />
          </div>
          <div className="flex flex-col ">
            <label> Descripción:</label>
            <textarea
              className="text-black rounded"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className="rounded block px-4 py-2 text-xl w-full text-center text-black bg-greenD-500 cursor-pointer"
            type="submit"
          >
            Crear
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormModal;
