import { useLastFM } from "use-last-fm";



export default function CurrentlyPlaying() {
  const lastFM = useLastFM("itkc", "c9c73ee4d3a423cc8375c75f7e733ff1");

  if (lastFM.status !== "playing") {
    return <p className="text-white">Not listening to anything</p>;
  }

  return (
    <p>
      Listening to {lastFM.song.name} by {lastFM.song.artist}
      <img src={lastFM.song.art} alt="Current Song Album Art" />
    </p>
  );
};
