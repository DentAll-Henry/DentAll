import NavDash from "@/components/NavBar/navDash"
import PatientsList from "@/components/PatientsList/PatientsList"

function page() {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%] ">
        <NavDash />
        
        <div className="m-8 p-4 mt-24">
          <h1 className="text-2xl my-4">Lista de Pacientes</h1>
            <PatientsList/>
            
        </div>

      <div className="m-8 p-4 mt-24">
        <PatientsList />
      </div>
    </div>
  )
}

export default page

