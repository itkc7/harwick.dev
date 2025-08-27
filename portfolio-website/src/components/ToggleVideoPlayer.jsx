import React, { useState } from "react";

const ToggleVideoPlayer = ({ video1, video2 }) => {
  const [selected, setSelected] = useState("v1");

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Toggle Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelected("v1")}
          className={`px-4 py-2 rounded-lg ${
            selected === "v1"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
         Music
        </button>
        <button
          onClick={() => setSelected("v2")}
          className={`px-4 py-2 rounded-lg ${
            selected === "v2"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Natural
        </button>
      </div>

      {/* Video Player */}
      <video
        key={selected} // ensures re-render when switching
        src={selected === "v1" ? video1 : video2}
        controls
        className="rounded-xl shadow-lg max-w-3xl w-2xl"
      />
    </div>
  );
};

export default ToggleVideoPlayer;
