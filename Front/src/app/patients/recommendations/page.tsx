import NavDash from "@/components/NavBar/navDash";

import YouTubeVideo from "@/components/Video/YouTubeVideo";

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
            <YouTubeVideo videoId="p2KiPXjVOFc" />
          </div>
          <div className="w-[50%] p-8 space-y-4">
            <div className="text-center text-xl font-bold">
              Tecnica correcta para el cepillado de dientes
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
            <YouTubeVideo videoId="EsoM0NGNuqc" />
          </div>
          <div className="w-[50%] p-4 space-y-4">
            <div className="text-center text-xl font-bold">
              Uso adecuado del hilo dental
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
            <YouTubeVideo videoId="PRceDrPaMZ8" />
          </div>
          <h2>¿Sabías que muchas bebidas pueden dañar tus dientes? </h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <YouTubeVideo videoId="g3KoKg8QznI" />
          </div>
          <h2>Que es la placa bacteriana?</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <YouTubeVideo videoId="KD_MBshYlOw" />
          </div>
          <h2>Incrustaciones dentales - Restauración dental</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <YouTubeVideo videoId="rXSYbcDbelM" />
          </div>
          <h2>Implante, Pilar y Corona</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <YouTubeVideo videoId="at5vyO-HjWM" />
          </div>
          <h2>Periodontitis - Enfermedad de las Encias</h2>
        </div>
        <div className="bg-darkD-500 p-4">
          <div className=" ">
            {" "}
            <YouTubeVideo videoId="uXeGjo54TVQ" />
          </div>
          <h2>¿Qué es Caries Dental ?</h2>
        </div>
      </div>
    </div>
  );
};

export default page;
