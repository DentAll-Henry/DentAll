import { VideoPlayerProps } from "@/types";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  type,
  controls = true,
  loop = false,
  muted = false,
}) => {
  return (
    <video
      controls={controls}
      loop={loop}
      muted={muted}
      style={{ width: "100%", height: "auto" }}
    >
      <source src={src} type={type} />
      Tu navegador no soporta el elemento de video.
    </video>
  );
};

export default VideoPlayer;
