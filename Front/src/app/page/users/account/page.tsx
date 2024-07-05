import Account from '@/components/Account/Account'
import NavDash from '@/components/NavBar/navDash';


const page = () => {
  return (
    <div className="w-[80%] h-screen text-white ml-[20%] relative">
      <NavDash />
      <Account />
    </div>
  );
}

export default page
