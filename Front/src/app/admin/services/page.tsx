import NavDash from "@/components/NavBar/navDash";
import Services from "@/components/services/services";

const page = () => {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%] ">
      <NavDash />
      <div className="mt-[10%]">
        <Services />
      </div>
    </div>
  );
};

export default page;
