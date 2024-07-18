import { getImages, uploadImage } from "@/helpers/files.helper";
import { getPatientId } from "@/helpers/patients.helper";
import React, { useEffect, useState } from "react";
import { PatientId } from "../../types/index";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

interface PatientsDetailsProps {
  patientId: string;
  tag: string;
  folder: string;
  title: string;
}

const PatientsDetails = ({
  patientId,
  tag,
  title,
  folder,
  close,
}: PatientsDetailsProps & { close: () => void }) => {
  const [open, setOpen] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [patient, setPatient] = useState<PatientId>();
  const [IsEmail, setIsEmail] = useState<string>();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      const paciente = await getPatientId(patientId);
      setPatient(paciente);
    };
    fetchPatient();
  }, [patientId]);

  useEffect(() => {
    const parsePatientMail = () => {
      if (patient?.person.email) {
        let partPath = patient.person.email.split("");
        const index1: number = partPath.indexOf("@");
        partPath[index1] = "-";
        partPath = partPath.map((c) => {
          if (c === ".") return "-";
          else return c;
        });
        const partPath2 = partPath.join("");
        setIsEmail(partPath2);
      }
    };
    parsePatientMail();
  });

  const openLoadClick = () => {
    setOpen(false);
    setOpenLoad(!openLoad);
  };

  const handleClick = () => {
    const fetchHistory = async () => {
      if (patient?.person.email) {
        const response = await getImages(`DentAll/${IsEmail}/${folder}`);
        setHistory(response.data);
      }
    };
    fetchHistory();
    setOpenLoad(false);
    setOpen(!open);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    folder: string
  ) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("path", `DentAll/${IsEmail}/${folder}`);
      try {
        const upload = await axiosInstance.post("/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (upload.data) {
          Swal.fire({
            title: "¡Excelente!",
            text: `${tag} subido correctamente.`,
            icon: "success",
            confirmButtonText: "Aceptar",
            background: "#1D1D1D",
            customClass: {
              confirmButton:
                "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
              title: "text-greenD-500",
              popup: "text-white",
            },
          });
        }
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "Aceptar",
          background: "#1D1D1D",
          customClass: {
            confirmButton:
              "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
            title: "text-red-500",
            popup: "text-white",
          },
        });
      }
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-[#1A2228] text-white flex flex-col justify-center align-middle w-11/12 md:w-3/4 lg:w-1/2 p-4 rounded-lg shadow-lg">
        <button
          onClick={close}
          className="absolute top-2 right-4 text-white" // Añadido mt-4 y mr-4
        >
          X
        </button>
        <div className="mb-4">
          <h2 className="text-center text-xl font-semibold">Nueva orden</h2>
        </div>
        <div className="flex justify-around mb-4 items-center text-center space-x-2">
          <button
            onClick={handleClick}
            className="bg-[#00CE90] text-white px-4 py-2 rounded"
          >
            Ver {`${tag}`}
          </button>
          <button
            onClick={openLoadClick}
            className="bg-[#00CE90] text-white px-4 py-2 rounded flex items-center"
          >
            Subir {`${tag}`}
          </button>
        </div>
        {open && (
          <div className="flex flex-col">
            <h2 className="text-lg font-bold mb-2">{`${title}`}</h2>
            {history.length === 0 ? (
              <p>No hay {`${tag}`}</p>
            ) : (
              history.map((h, index) => (
                <img key={index} src={h} className="mb-2 max-h-96" />
              ))
            )}
          </div>
        )}
        {openLoad && (
          <div className="flex flex-col">
            <label htmlFor="profileImage" className="cursor-pointer">
              <div className="flex flex-row">
                <img
                  src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721251199/imagen_para_cargar_b40pek.png"
                  alt="Subir"
                  className="mr-2 h-6 w-6"
                />
                <p className="text-lg font-bold mb-2">Subir {`${tag}`}</p>
              </div>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleImageUpload(event, folder)}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsDetails;
