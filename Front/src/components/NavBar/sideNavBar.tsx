import Link from "next/link";
import Image from "next/image";


export default function SideNav() {
  return (
    <div className="h-screen w-[22%] bg-darkD-500 text-white">
      <div className="p-4">
        <Image
          src="/images/Logo.svg"
          alt="Logo.svg"
          width={200}
          height={50}
          priority
        />
      </div>
      <nav className="mt-5">
        <ul>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-gray-700 group">
            <Link className="flex gap-4" href="/">
              <Image
                className="icon group-hover:fill-current group-hover:text-yellow-500"
                src="/images/home.svg"
                width={24}
                height={24}
                alt=""
              />
              <p className="group-hover:text-yellow-500">Inicio</p>
            </Link>
          </li>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-gray-700">
            <Link className="flex gap-4" href="/">
              <Image src="/images/citas.svg" width={24} height={24} alt="" />
              <p>Mis citas</p>
            </Link>
          </li>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-gray-700">
            <Link className="flex gap-4" href="/">
              <Image src="/images/recetas.svg" width={24} height={24} alt="" />
              <p>Recetas medicas</p>
            </Link>
          </li>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-gray-700">
            <Link className="flex gap-4" href="/">
              <Image src="/images/user.svg" width={24} height={24} alt="" />
              <p>Cerrar sesión</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// <div className=" bg-black ">
//     <Link
//       className="mb-2 flex h-20 items-end justify-start rounded-md bg-greenD-800 p-4 md:h-40"
//       href="/"
//     >
//       <div className="w-32  md:w-40">
//         <Image
//           src="/images/Logo.svg"
//           width={350}
//           height={200}
//           alt="Logo.svg"
//         />
//       </div>
//     </Link>

//     <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
//       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         <PowerIcon className="w-6" />
//         <div className="hidden md:block">Inicio</div>
//       </button>
//       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         <PowerIcon className="w-6" />
//         <div className="hidden md:block">Sign Out</div>
//       </button>
//       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         <PowerIcon className="w-6" />
//         <div className="hidden md:block">Sign Out</div>
//       </button>
//       <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
//       <form>
//         <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//           <PowerIcon className="w-6" />
//           <div className="hidden md:block">Cerrar Sesión</div>
//         </button>
//       </form>
//     </div>
