// // Front/src/app/appointment/callback.tsx
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { getToken } from "@/utils/authConfig";

// const Callback = () => {
//   const router = useRouter();
//   const { code } = router.query;

//   useEffect(() => {
//     if (code) {
//       getToken(code as string).then(() => {
//         router.push("/appointment");
//       });
//     }
//   }, [code]);

//   return <div>Loading...</div>;
// };

// export default Callback;
