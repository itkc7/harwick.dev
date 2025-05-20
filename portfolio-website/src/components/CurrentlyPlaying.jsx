import { useState, useEffect } from "react";
import NavigationCircles from "./NavigationCircles";
import { LastFmIcon } from "hugeicons-react";
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

  userGetTopAlbums(params) {
    return this.request("user.getTopAlbums", {
      user: params.user,
      period: params.period || "7day", // weekly by default
      limit: params.limit || 9, // 3x3 grid needs 9 albums
    });
  }
}

export default function CurrentlyPlaying() {
  const [recentTracks, setRecentTracks] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [weeklyAlbums, setWeeklyAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lastFm = new BrowserLastFmClient("c9c73ee4d3a423cc8375c75f7e733ff1");

    async function fetchData() {
      try {
        // Fetch recent/now playing track
        const recentTracksData = await lastFm.userGetRecentTracks({
          user: "itkc",
          limit: 1,
        });

        if (recentTracksData.recenttracks?.track?.length > 0) {
          const track = recentTracksData.recenttracks.track[0];

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

        // Fetch weekly top albums
        const weeklyAlbumsData = await lastFm.userGetTopAlbums({
          user: "itkc",
          period: "7day",
          limit: 9,
        });

        if (weeklyAlbumsData.topalbums?.album) {
          setWeeklyAlbums(
            weeklyAlbumsData.topalbums.album.map((album) => ({
              name: album.name,
              artist: album.artist.name,
              art:
                album.image.find((img) => img.size === "extralarge")?.[
                  "#text"
                ] || album.image[3]?.["#text"],
              playCount: album.playcount,
            }))
          );
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
      className="min-h-screen flex flex-col justify-center items-center px-4 xl:py-45 py-40 dark:text-white"
    >
      <h2 className="text-4xl font-light mb-8 xl:mt-0 mt-12">LastFM!</h2>
      <a href="https://www.last.fm/user/itkc" target="_blank">
        <div className="text-[#F44336] dark:text-[#F44336] dark:hover:text-white hover:text-[#212121] transition-colors duration-500 cursor-pointer inline-flex">
          <LastFmIcon size={48} />
        </div>
      </a>

      <div
        className="w-full mx-auto relative isolate
                  lg:max-w-[80%] md:max-w-[90%] max-w-[320px]
                  flex flex-col md:flex-row md:items-start items-center
                  md:justify-between justify-center md:text-left text-center gap-10"
      >
        {/* Now Playing or Recent Track Section */}
        <div className="flex flex-col items-center md:items-start gap-4 xl:ml-30">
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
        <div className="flex flex-col items-center md:items-start gap-4 xl:mr-30">
          <h3 className="mb-3 sm:mb-2">Weekly Chart</h3>
          <div className="grid grid-cols-3 gap-2">
            {weeklyAlbums.length > 0 ? (
              weeklyAlbums.map((album, index) => (
                <div key={index} className="relative group">
                  <img
                    src={album.art || "./public/images/default_album.png"}
                    alt={`${album.name} by ${album.artist}`}
                    className="lg:w-36 md:w-21 lg:h-35 md:h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer flex flex-col justify-center items-center p-1 text-xs text-center">
                    <p className="font-semibold">{album.name}</p>
                    <p>{album.artist}</p>
                    <p>{album.playCount} plays</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No weekly album data available</p>
            )}
          </div>
        </div>
      </div>
      <NavigationCircles section="lastfm" />
    </div>
  );
}