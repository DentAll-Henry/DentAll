// components/YouTubeVideo.js
import React from "react";

const YouTubeVideo = ( videoId: any) => {
  return (
    <div className="relative pb-9/16 h-0 overflow-hidden max-w-full bg-black">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YouTubeVideo;
