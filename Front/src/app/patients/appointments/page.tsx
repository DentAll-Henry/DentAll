import RenderCitas from "@/components/Appointments/RenderCitas"
import NavDash from "@/components/NavBar/navDash";


const page = () => {
  return (
   
      <div className = "w-[80%] h-screen bg-darkD-600 text-white ml-[20%] relative" >
            <NavDash />  
            <RenderCitas />
    </div>
  );
}

export default page

