"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { format } from "date-fns";
import Modal from "../Modal/Modal"; // Asegúrate de tener un componente Modal
import PaymentDetail from "./PaymentDetail";

type Payment = {
  id: string;
  date: Date;
  payment_id: number;
  payment_status: string;
  dentalServ: DentalServ;
  appointment: Appointment;
};

type DentalServ = {
  id: string;
  name: string;
  price: string;
  description: string;
  img: string;
  isActive: boolean;
};

type Appointment = {
  id: string;
  date_time: Date;
  description: string;
};

const PaymentsHistory = () => {
  const [patientId, setPatientId] = useState();
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);

      const getPatient = async () => {
        const response = await axiosInstance.get(
          `/patients/person/${parsedUser.userData.id}`
        );
        if (response.data !== null) {
          setPatientId(response.data.id);
        }
      };

      getPatient();
    }
  }, []);

  useEffect(() => {
    if (patientId) {
      axiosInstance
        .get(`/payments/payments_by_patient/${patientId}`)
        .then((response) => {
          setPayments(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [patientId]);

  const openModalWithPaymentDetail = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  return (
    <div className="flex gap-4 m-8 flex-wrap">
      {payments &&
        payments.map((payment: Payment) => (
          <div
            key={payment.id}
            onClick={() => openModalWithPaymentDetail(payment)}
            className="flex cursor-pointer"
          >
            <div className="flex-col bg-greenD-500 bg-opacity-5 w-[200px] h-[150px] rounded-md flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <p className="text-[#60D66A] select-none">{payment.dentalServ.name}</p>
              {payment.dentalServ.img && (
                <Image
                  className="group-hover:fill-current text-white"
                  src={payment.dentalServ.img}
                  width={35}
                  height={35}
                  alt={payment.dentalServ.name}
                />
              )}
              <p className="text-[#60D66A]">${payment.dentalServ.price}</p>
              <p className="text-[#60D66A]">
                {format(payment.date, "dd/MM/yyyy")}
              </p>
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201228/Vector_b9qqdm.svg"
                width={35}
                height={35}
                alt="Pagos"
              />
            </div>
          </div>
        ))}
      {selectedPayment && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          

          <PaymentDetail payment_id={selectedPayment.id} />
         
        </Modal>
      )}
    </div>
  );
};

export default PaymentsHistory;
