import Account from '@/components/Account/Account'
import NavDash from '@/components/NavBar/navDash';
import Payments from '@/components/Payments/Payments';


const page = () => {
  return (
    <div className="w-[80%] h-screen text-white ml-[20%] relative">
      <NavDash />
      <Account />
      <div className="m-8">

      
      </div>
    </div>
  );
}

export default page
