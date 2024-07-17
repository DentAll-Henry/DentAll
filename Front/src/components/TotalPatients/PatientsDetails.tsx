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
}

const PatientsDetails = ({
  patientId,
  tag,
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

  // Log history to verify URLs

  const openLoadClick = () => {
    setOpen(false);
    setOpenLoad(!openLoad);
  };

  const handleClick = () => {
    const fetchHistory = async () => {
      if (patient?.person.email) {
        const response = await getImages(`DentAll/${IsEmail}/${folder}`);
        console.log(response);
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
    console.log("Uploading image...");

    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("path", `DentAll/${IsEmail}/${folder}`);
      try {
        console.log("Uploading image 2...");

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
            customClass: {
              confirmButton:
                "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
            },
          });
        }
      } catch (error: any) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
          },
        });
      }
    }
  };
  return (
    <div className="relative bg-white text-red-800 flex flex-col justify-center align-middle ">
      <div className="">
        <button onClick={handleClick}>Ver {`${tag}`}</button>
        <button onClick={openLoadClick}>Subir {`${tag}`}</button>
        <button onClick={close}>X</button>
      </div>
      {open && (
        <div className="flex flex-col">
          <h2>{`${tag}`}</h2>
          {history.length === 0 ? (
            <p>No hay {`${tag}`}</p>
          ) : (
            history.map((h, index) => <img key={index} src={h} />)
          )}
        </div>
      )}
      {openLoad && (
        <div className="flex flex-col">
          <label htmlFor="profileImage" className="cursor-pointer">
            <h2>Subir {`${tag}`}</h2>
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
  );
};

export default PatientsDetails;
