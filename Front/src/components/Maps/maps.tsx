"use client";
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { fetchMapData } from "@/helpers/maps.helper";

const containerStyle = {
  width: "100%",
  height: "400px",
  padding: "1em",
};

const center = {
  lat: -26.8377104,
  lng: -65.2075707,
};

const MapComponent = () => {
  const [mapData, setMapData] = useState([
    {
      cords: { lat: "", lng: "" },
      name: "",
      address: "",
      img: "",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMapData();
        setMapData(data);
      } catch (error) {
        
      }
    };

    getData();
  }, []);

  return (
    <div className="flex">
      <LoadScript googleMapsApiKey="AIzaSyCmU4rWFvQestVgKRAaovOVkyzOlmwA6_w">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {mapData.map((map, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(map.cords.lat),
                lng: parseFloat(map.cords.lng),
              }}
              title={map.address}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      <div className="w-full flex flex-col justify-center items-center gap-5">
        <h2 className="text-[40px] text-white font-bold leading-normal"> TE ESPERAMOS EN</h2>
 <div className="space-y-8">

  {mapData.map((map, index) => (
          
          <div key={index}>
            <p>{map.address}</p>
            <p>{map.name}</p>
          </div>
        ))}
 </div>
     
      </div>
    </div>
  );
};

export default MapComponent;
