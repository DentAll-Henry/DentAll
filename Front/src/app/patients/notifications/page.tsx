import NavDash from '@/components/NavBar/navDash';


const page = () => {
  return (
    <div className="w-[80%] h-screen text-white ml-[20%] relative">
      <NavDash />
      <div className="m-4 mt-24">
        <h2 className="text-[58px] text-center text-white font-bold leading-normal">
          <span className="text-[#00CE90]">Notificaciones</span> Jhon Doe
        </h2>
      </div>
    </div>
  );
}

export default page
