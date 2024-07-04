
import NavDash from "@/components/NavBar/navDash";
import VideoPlayer from "@/components/Video/Video";

const page: React.FC = () => {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%]">
      <NavDash />
      <h1 className="mt-24">Mi reproductor de video</h1>
      <div className="w-[80%] m-4 bg- m-auto">
        <VideoPlayer
          src="/images/video0.mp4"
          type="video/mp4"
          controls
          autoPlay
          loop
          muted
        />
        <h2>Como cepillarse los dientes</h2>
      </div>
      <div className="grid grid-cols-6">
        <div>
          {" "}
          <VideoPlayer
            src="/images/video1.mp4"
            type="video/mp4"
            controls
            autoPlay
            loop
            muted
          />
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div>
          {" "}
          <VideoPlayer
            src="/images/video1.mp4"
            type="video/mp4"
            controls
            autoPlay
            loop
            muted
          />
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div>
          {" "}
          <VideoPlayer
            src="/images/video1.mp4"
            type="video/mp4"
            controls
            autoPlay
            loop
            muted
          />
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div>
          {" "}
          <VideoPlayer
            src="/images/video1.mp4"
            type="video/mp4"
            controls
            autoPlay
            loop
            muted
          />
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div>
          {" "}
          <VideoPlayer
            src="/images/video1.mp4"
            type="video/mp4"
            controls
            autoPlay
            loop
            muted
          />
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        <div>
          {" "}
          <VideoPlayer
            src="/images/video1.mp4"
            type="video/mp4"
            controls
            autoPlay
            loop
            muted
          />
          <h2>¿Qué es y cuando se realiza una incrustacion dental?</h2>
        </div>
        
      </div>
    </div>
  );
};

export default page;

