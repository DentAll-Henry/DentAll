// import React, { useState, useEffect } from "react";
// import Skeleton from "./Skeleton";

// const VideoGrid = () => {
//   const [loading, setLoading] = useState(true);
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     // Simular una llamada a la API para obtener videos
//     setTimeout(() => {
//       setVideos([
//         { id: 1, thumbnail: "/path/to/thumbnail1.jpg", title: "Video 1" },
//         { id: 2, thumbnail: "/path/to/thumbnail2.jpg", title: "Video 2" },
//         // más videos...
//       ]);
//       setLoading(false);
//     }, 2000); // Simula 2 segundos de carga
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {loading
//         ? Array(8)
//             .fill()
//             .map((_, i) => <Skeleton key={i} />) // Muestra 8 skeletons mientras carga
//         : videos.map((video) => (
//             <div key={video.id} className="rounded-lg overflow-hidden">
//               <img
//                 src={video.thumbnail}
//                 alt={video.title}
//                 className="w-full h-48 object-cover"
//               />
//               <h2 className="mt-2 text-gray-800">{video.title}</h2>
//             </div>
//           ))}
//     </div>
//   );
// };

// export default VideoGrid;
