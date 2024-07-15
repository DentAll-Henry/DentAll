import Image from "next/image";

interface DoctorCardProps {
  name: string;
  specialty: string;
  description: string;
  imageSrc: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  description,
  imageSrc,
}) => {
  return (
    <div className="w-[280px] h-[400px] flex flex-col items-center rounded-lg shadow-lg text-center bg-[#00CE90]">
      <div className="w-[210px] h-[240px] overflow-hidden">
        <Image src={imageSrc} alt={`${name} photo`} width={200} height={200} />
      </div>
      <div className="w-full h-[240px] flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-b-lg">
        <h3 className="text-xl font-bold text-black">{name}</h3>
        <p className="text-lg text-black font-semibold">{specialty}</p>
        <p className="text-sm text-black font-medium">{description}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
