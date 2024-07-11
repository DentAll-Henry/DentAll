
"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image"
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type Payment = {
    id: string,
    date: Date,
    payment_id: number,
    payment_status: string,
    dentalServ: DentalServ,
    appointment: Appointment
};

type DentalServ = {
    id: string,
    name: string,
    price: string,
    description: string,
    img: string,
    isActive: boolean
}

type Appointment = {
    id: string,
    date_time: Date,
    description: string
}

type PaymentDetailProps = {
    payment_id: string
}

const PaymentDetail: React.FC<PaymentDetailProps> = ({ payment_id }) => {

    const [paymentDetail, setPaymentDetail] = useState<Payment | null>(null);


    useEffect(() => {
        const getPaymentDetail = async () => {
            if (payment_id) {
                axiosInstance
                    .get(`/payments/by_id/${payment_id}`)
                    .then((response) => {
                        if (response.data) {
                            setPaymentDetail(response.data);
                        }
                    })
                    .catch((error) => {
                        console.error("error:", error);
                    });
            }
        }

        getPaymentDetail();
    }, []);

    useEffect(() => {
        console.log("paymentDetail:", paymentDetail);
    }, [paymentDetail]);
    return (
        <div>

            {paymentDetail && (
                <div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1 bg-gray-500 rounded-[5px]">
                            <div className=" p-3 flex items-center gap-1">
                                <Image
                                    src={paymentDetail.dentalServ.img}
                                    alt="payment"
                                    width={80}
                                    height={80}
                                />
                                <p>{paymentDetail.dentalServ.name}</p>
                            </div>
                            <div className="w-[20%] p-3">
                                <p>Fecha de pago: {format(paymentDetail.date, "dd/MM/yyyy HH:mm:ss")}</p>
                            </div>
                            <div className="w-[20%] p-3">
                                <p>Id pago MercadoPago: {paymentDetail.payment_id}</p>
                            </div>
                            <div className="w-[20%] p-3">
                                <p>Estado: {paymentDetail.payment_status}</p>
                            </div>
                            <div className="w-[20%] p-3">
                                <p>Fecha de la cita: {format(paymentDetail.appointment.date_time, "dd/MM/yyyy HH:mm")}</p>
                            </div>
                            <div className="w-[20%] p-3">
                                <p>Servicio atendido: {paymentDetail.dentalServ.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentDetail;
