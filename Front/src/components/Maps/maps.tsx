"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { fetchMapData } from "@/helpers/maps.helper";

const containerStyle = {
  width: "100%",
  height: "400px",
  padding: "1em",
};

const center = {
  lat: 37.7749295,
  lng: -122.4194155,
};

const MapComponent = () => {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMapData();
        setMapData(data);
        console.log("Map data:", data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    getData();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCmU4rWFvQestVgKRAaovOVkyzOlmwA6_w">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, como markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
