import NavDash from "@/components/NavBar/navDash";
import VideoPlayer from "@/components/Video/Video";

const page: React.FC = () => {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%]">
      <NavDash />
      <h1 className="mt-24">Mi reproductor de video</h1>
      <div className="w-[80%] bg- m-auto bg-darkD-500">
        <div className="p-8">
          <VideoPlayer
            src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720191340/-c598-455d-af3c-ae7342691c4b_lntmww.mp4"
            type="video/mp4"
            controls
            autoPlay
            loop
            muted
          />
        </div>
        <h2>Como cepillarse los dientes</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 p-8">
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <VideoPlayer
              src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720190304/video_Recomendaciones_0_eb62cw.mp4"
              type="video/mp4"
              controls
              autoPlay
              loop
              muted
            />
          </div>
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <VideoPlayer
              src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720191340/-c598-455d-af3c-ae7342691c4b_lntmww.mp4"
              type="video/mp4"
              controls
              autoPlay
              loop
              muted
            />
          </div>
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <VideoPlayer
              src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720191575/-2760-4c41-a5d0-50059eb56156_qnljux.mp4"
              type="video/mp4"
              controls
              autoPlay
              loop
              muted
            />
          </div>
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <VideoPlayer
              src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720191340/-c598-455d-af3c-ae7342691c4b_lntmww.mp4"
              type="video/mp4"
              controls
              autoPlay
              loop
              muted
            />
          </div>
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <VideoPlayer
              src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720191575/-2760-4c41-a5d0-50059eb56156_qnljux.mp4"
              type="video/mp4"
              controls
              autoPlay
              loop
              muted
            />
          </div>
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <VideoPlayer
              src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720191340/-c598-455d-af3c-ae7342691c4b_lntmww.mp4"
              type="video/mp4"
              controls
              autoPlay
              loop
              muted
            />
          </div>
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
      </div>
    </div>
  );
};

export default page;