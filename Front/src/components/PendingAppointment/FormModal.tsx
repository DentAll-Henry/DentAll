import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import axiosInstance from "@/utils/axiosInstance";

type CloseFunction = () => void;

const FormModal = ({ isOpen, onClose, patientId }: { isOpen: boolean; onClose: CloseFunction; patientId: string }) => {
    const [formData, setFormData] = useState({
      service: '',
      patient: patientId,
      description: '',
    });
    const [dentalServices, setDentalServices] = useState([])
  
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      console.log(`${name}: ${value}`)
      console.log(formData)
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      console.log('Form data:', formData);
      const response = await axiosInstance.post('/appointments/pending_appointment', formData)
      console.log(response.data)
      onClose(); // Cerrar el modal después de enviar el formulario
    };

    useEffect(() => {
      const getDentalServices = async () => {
        const response = await axiosInstance.get('/dental-serv?page=1&limit=100');
        setDentalServices(response.data.services)
      }

      getDentalServices();
    }, [])
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="bg-gray-900 rounded-lg p-6 text-white space-y-4">
          <h2 className="text-center">Nueva orden</h2>
          <form onSubmit={handleSubmit} className="rounded-lg p-6 space-y-4">
            <div className="flex flex-col">
              <label>Tipo de servicio:</label>
              <select
                name="service"
                className="text-black"
                onChange={handleInputChange}
                required
                value={formData.service}
              >
                <option disabled={true}>Seleccione el servicio...</option>
                  {
                    dentalServices.map((ds:any) => {
                      return(
                        <option key={ds.id} value={ds.id}>{ds.name}</option>
                      )
                    })
                  }
              </select>
            </div>
            <div className="flex flex-col">
              <label> Descripción:</label>
              <textarea
                className="text-black"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              className="rounded block px-4 py-2 text-sm text-white w-full text-left bg-greenD-500 cursor-pointer"
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