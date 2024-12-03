import React from "react";

const VideoSimpleMinder = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <iframe
        width="700"
        height="365"
        src="https://www.youtube.com/embed/I_gjZUL5gRM?si=47FfmqzWxmTs1Y_r"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoSimpleMinder;
