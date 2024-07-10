import { getPatientId } from '@/helpers/patients.helper';
import { userSession } from '@/types';
import React, { useEffect, useState } from 'react'

const DetailsId = ({params}:{params:{patientId:string}})=> {
    
    const [userData,setUserData] = useState<userSession>();

    useEffect(() => {

        if(typeof window !== 'undefined' && window.localStorage){
          const userData= localStorage.getItem('userSession')
          setUserData(JSON.parse(userData!));
        }
    
        const fetchData = async () => {
          const patient= await getPatientId(params.patientId);
          setUserData(patient);
        }
        fetchData();
      },[])
  return (
    <div className = "w-[80%] h-screen bg-darkD-600 text-white ml-[20%] relative" >
            soy el paciente id 
    </div>
  )
}

export default DetailsId
