import { useState, useEffect } from "react";
import NavigationCircles from "./NavigationCircles";

// Create a browser-compatible Last.fm client
class BrowserLastFmClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://ws.audioscrobbler.com/2.0/";
  }

  async request(method, params = {}) {
    const queryParams = new URLSearchParams({
      method,
      api_key: this.apiKey,
      format: "json",
      ...params,
    });

    const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  userGetRecentTracks(params) {
    return this.request("user.getRecentTracks", {
      user: params.user,
      limit: params.limit,
    });
  }
}

export default function CurrentlyPlaying() {
  const [recentTracks, setRecentTracks] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lastFm = new BrowserLastFmClient("c9c73ee4d3a423cc8375c75f7e733ff1");

    async function fetchData() {
      try {
        const data = await lastFm.userGetRecentTracks({
          user: "itkc",
          limit: 1,
        });

        if (data.recenttracks?.track?.length > 0) {
          const track = data.recenttracks.track[0];

          if (track["@attr"]?.nowplaying === "true") {
            setNowPlaying({
              name: track.name,
              artist: track.artist["#text"],
              art:
                track.image.find((img) => img.size === "extralarge")?.[
                  "#text"
                ] || track.image[3]?.["#text"],
            });
          } else {
            setRecentTracks({
              name: track.name,
              artist: track.artist["#text"],
              album: track.album["#text"],
              art:
                track.image.find((img) => img.size === "extralarge")?.[
                  "#text"
                ] || track.image[3]?.["#text"],
            });
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Last.fm data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div
        id="lastfm"
        className="min-h-screen flex flex-col justify-center items-center px-4 xl:py-25 py-20 dark:text-white"
      >
        <h2 className="text-4xl font-light mb-32 xl:mt-0 mt-12">Loading...</h2>
        <NavigationCircles section="lastfm" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="lastfm"
        className="min-h-screen flex flex-col justify-center items-center px-4 xl:py-25 py-20 dark:text-white"
      >
        <h2 className="text-4xl font-light mb-32 xl:mt-0 mt-12">Error</h2>
        <p className="text-red-500 mb-32">{error}</p>
        <NavigationCircles section="lastfm" />
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
        {/* Now Playing or Recent Track Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="mb-3 sm:mb-2">
            {nowPlaying ? "Now Playing" : "Recently Played"}
          </h3>
          <img
            src={
              nowPlaying
                ? nowPlaying.art
                : recentTracks?.art || "./public/images/default_album.png"
            }
            alt={nowPlaying ? "Current Song Album Art" : "Recent Album Art"}
            className="lg:w-108 md:w-64"
          />
          <p className="mt-3 sm:mt-2">
            {nowPlaying
              ? `"${nowPlaying.name}" by ${nowPlaying.artist}`
              : recentTracks
              ? `${recentTracks.name} by ${recentTracks.artist}`
              : "No recent tracks found"}
          </p>
          {recentTracks?.album && (
            <p className="text-sm opacity-75">Album: {recentTracks.album}</p>
          )}
        </div>

        {/* Weekly Chart Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="mb-3 sm:mb-2">Weekly Chart</h3>
          <img
            src="./public/images/weekly_albums.png"
            className="lg:w-108 md:w-64"
            alt="Weekly albums chart"
          />
        </div>
      </div>
      <NavigationCircles section="lastfm" />
    </div>
  );
}
