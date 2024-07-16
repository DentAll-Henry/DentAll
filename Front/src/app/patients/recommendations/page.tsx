import NavDash from "@/components/NavBar/navDash";
import VideoPlayer from "@/components/Video/Video";
import YouTubeVideo from "@/components/Video/youTubeVideo";

const page: React.FC = () => {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%]">
      <NavDash />
      <h2 className="text-[58px] text-center mt-[10%] font-bold leading-normal">
        Recomendaciones
      </h2>
      <div className="space-y-4">
        <div className="w-[90%] m-auto flex rounded text-black bg-greenD-500">
          <div className="p-8 w-[50%]  ">
            <h1 className="text-3xl font-bold mb-4">Mi Video de YouTube</h1>
            <YouTubeVideo videoId="https://youtu.be/p2KiPXjVOFc" />
          </div>
          <div className="w-[50%] p-8 space-y-4">
            <div className="text-center text-2xl font-bold">
              ¿Como cepillarse los dientes?
            </div>
            <ul className="list-disc list-inside">
              <li>Usa un cepillo de cerdas suaves y cambia cada 3 meses.</li>
              <li>Aplica una cantidad de pasta del tamaño de un guisante.</li>
              <li>
                Coloca el cepillo en un ángulo de 45 grados con respecto a las
                encías.
              </li>
              <li>
                Cepilla suavemente en todas las superficies de los dientes.
              </li>
              <li>Cepilla tu lengua para eliminar bacterias.</li>
              <li>
                Cepilla tus dientes por al menos 2 minutos, dos veces al día.
              </li>
              <li>Enjuaga con agua después de cepillarte.</li>
              <li>Usa hilo dental una vez al día.</li>
            </ul>
          </div>
        </div>

        <div className="w-[90%] m-auto flex rounded text-black bg-white">
          <div className="p-8 w-[50%]  ">
            <VideoPlayer
              src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720191340/-c598-455d-af3c-ae7342691c4b_lntmww.mp4"
              type="video/mp4"
              controls
              loop
              muted
            />
          </div>
          <div className="w-[50%] p-4 space-y-4">
            <div className="text-center text-2xl font-bold">
              ¿Como usar el hilo dental?
            </div>
            <ul className="list-disc list-inside">
              <li>Corta aproximadamente 45 cm de hilo dental.</li>
              <li>
                Enrolla la mayor parte del hilo alrededor de los dedos medios de
                cada mano, dejando unos 5 cm entre ellos.
              </li>
              <li>
                Usa los pulgares y los índices para sostener el hilo tenso.
              </li>
              <li>
                Desliza suavemente el hilo entre tus dientes usando un
                movimiento de zigzag. No lo fuerces.
              </li>
              <li>Cepilla tu lengua para eliminar bacterias.</li>
              <li>
                Cepilla tus dientes por al menos 2 minutos, dos veces al día.
              </li>
              <li>Enjuaga con agua después de cepillarte.</li>
              <li>Usa hilo dental una vez al día.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-12">
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <VideoPlayer
              src="https://res.cloudinary.com/ddpohfyur/video/upload/v1720190304/video_Recomendaciones_0_eb62cw.mp4"
              type="video/mp4"
              controls
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
