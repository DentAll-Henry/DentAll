import Image from 'next/image'
import Link from 'next/link'

interface PatientCardProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  last_appointment: Date;
  photo: string;
}

const CardPatient: React.FC<PatientCardProps> = ({
  id,
  name,
  phone,
  email,
  last_appointment,
  photo,
}) => {
  return (
    <div>
      <Link href="#">
        <div className="w-full flex flex-row gap-5 ">
          <div className="w-[31%] p-3 flex flex-row gap-4">
            <Image
              src={photo}
              width={24}
              height={24}
              alt="foto de perfil"
            />
            <p>{name}</p>
          </div>

          <div className="w-[18%] p-3">
            <p>{phone}</p>
          </div>

          <div className="w-[23%] p-3">
            <p>{email}</p>
          </div>

          <div className="w-[14%] p-3">
            <p>{last_appointment.toString()}</p>
          </div>

          <div className="w-[14%] p-3 flex flex-row gap-8">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201305/PencilSimple_ugfifd.svg"
              width={24}
              height={24}
              alt="editar"
            />
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201219/Trash_e3pep7.svg"
              width={24}
              height={24}
              alt="eliminar"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardPatient
