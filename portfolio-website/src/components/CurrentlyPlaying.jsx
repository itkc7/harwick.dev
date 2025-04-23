import { useLastFM } from "use-last-fm";
import React, { useEffect, useState } from "react";
import NavigationCircles from "./NavigationCircles";

export default function CurrentlyPlaying() {
  const lastFM = useLastFM("itkc", "c9c73ee4d3a423cc8375c75f7e733ff1");
  const [chartUrl, setChartUrl] = useState("");

  useEffect(() => {
    fetch("/weekly-chart")
      .then((response) => {
        if (!response.ok) throw new Error("Chart not found");
        return response.blob();
      })
      .then((imageBlob) => {
        setChartUrl(URL.createObjectURL(imageBlob));
      })
      .catch((err) => console.error(err));
  }, []);

  if (lastFM.status !== "playing") {
    return (
      <div
        id="lastfm"
        className="min-h-screen flex flex-col justify-center items-center px-4 xl:py-0 py-10 dark:text-white"
      >
        <h2 className="text-4xl font-light mb-32 xl:-mt-80">LastFM!</h2>
      </div>
    );
  }

  return (
    <div
      id="lastfm"
      className="min-h-screen flex flex-col justify-center items-center px-4 xl:py-25 py-20 dark:text-white"
    >
      <h2 className="text-4xl font-light mb-32 xl:mt-0 mt-12">LastFM!</h2>
      <div
        className="w-full mx-auto relative isolate
                  lg:max-w-[80%] md:max-w-[90%] max-w-[320px]
                  flex flex-col md:flex-row md:items-start items-center
                  md:justify-between justify-center md:text-left text-center gap-10"
      >
        {/* Now Playing Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="mb-3 sm:mb-2">Now Playing</h3>
          <img
            src={lastFM.song.art}
            alt="Current Song Album Art"
            className="lg:w-108 md:w-64"
          />
          <p className="mt-3 sm:mt-2">
            "{lastFM.song.name}" by {lastFM.song.artist}
          </p>
        </div>

        {/* Weekly Chart Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="mb-3 sm:mb-2">Weekly Chart</h3>
          {chartUrl ? (
            <img
              src={chartUrl}
              alt="Weekly 3x3 Chart"
              className="lg:w-108 md:w-64"
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
      <NavigationCircles section="lastfm" />
    </div>
  );
}
