// Front/src/app/appointment/page.tsx
import React from "react";
import Appointment from "@/components/Appointments/Appointments";
import { getAuthUrl } from "@/utils/authConfig";

const Page = () => {
  const authUrl = getAuthUrl();

  return (
    <div>
      <a href={authUrl}>Login with Google</a>
      <Appointment />
    </div>
  );
};

export default Page;
