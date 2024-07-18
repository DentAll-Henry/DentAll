import Account from "@/components/Account/Account";
import EditProfile from "@/components/EditProfile/EditProfile";
import NavDash from "@/components/NavBar/navDash";
import Payments from "@/components/Payments/Payments";

const page = () => {
  return (
    <div className=" h-screen text-white  relative">
      {/* <NavDash /> */}
      <Account />
    </div>
  );
};

export default page;
