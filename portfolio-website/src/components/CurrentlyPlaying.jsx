import { useLastFM } from "use-last-fm";
import React from "react";
import NavigationCircles from "./NavigationCircles";

export default function CurrentlyPlaying() {
  const lastFM = useLastFM("itkc", "c9c73ee4d3a423cc8375c75f7e733ff1");

  if (lastFM.status !== "playing") {
    return <p className="text-black">Not listening to anything</p>;
  }

  return (
    <div
      id="lastfm"
      className="min-h-screen flex flex-col justify-center items-center px-4 xl:py-0 py-10 dark:text-white"
    >
      <h2 className="text-4xl font-light mb-32 xl:mt-0 mt-12 ">LastFM!</h2>
      <div
        className="w-full mx-autorelative isolate
                  lg:max-w-[80%] md:max-w-[90%] max-w-[320px]
                  flex flex-col md:flex-row md:items-start items-center
                  md:justify-start justify-center md:text-left text-center"
      >
        <h3 className="mb-3 sm:mb-2 md:hidden block w-full">Now Playing</h3>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
          <img
            src={lastFM.song.art}
            alt="Current Song Album Art"
            className="md:w-48 w-40"
          />
          <div className="md:text-left text-center">
            <h3 className="mb-3 sm:mb-2 hidden md:block">Now Playing</h3>
            <p className="mt-3 sm:mt-2">
              "{lastFM.song.name}" by {lastFM.song.artist}.
            </p>
          </div>
        </div>
      </div>
      <NavigationCircles section="lastfm" />
    </div>
  );
}
