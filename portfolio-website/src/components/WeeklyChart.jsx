import React, { useEffect, useState } from "react";

const WeeklyChart = () => {
  const [weeklyChart, setWeeklyChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const USER = "itkc"; // your Last.fm username
  const API_KEY = "c9c73ee4d3a423cc8375c75f7e733ff1";
  const URL = `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${USER}&api_key=${API_KEY}&format=json`;

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        const albums = data.weeklyalbumchart.album.slice(0, 9); // top 9
        setWeeklyChart(albums);
      } catch (err) {
        console.error("Failed to fetch weekly chart:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChart();
  }, []);

  if (isLoading) {
    return (
      <p className="text-white mt-6 text-center">Loading weekly chart...</p>
    );
  }

  return (
    <div className="mt-12 w-full max-w-5xl mx-auto px-4">
      <h3 className="text-3xl font-light mb-6 text-center text-white">
        Weekly Album Chart
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {weeklyChart.map((album, idx) => {
          // Try to find the biggest available image
          const imageSizes = ["extralarge", "large", "medium"];
          const validImage = imageSizes
            .map(
              (size) => album.image?.find((img) => img.size === size)?.["#text"]
            )
            .find((src) => src && src.trim() !== "");

          const albumUrl = `https://www.last.fm/music/${encodeURIComponent(
            album.artist["#text"]
          )}/${encodeURIComponent(album.name)}`;

          return (
            <a
              key={idx}
              href={albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center bg-gray-800 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={validImage || "https://placehold.co/174x174?text=No+Art"}
                alt={`${album.name} Album Art`}
                className="w-44 h-44 object-cover rounded mb-3"
              />
              <p className="text-white font-medium">{album.name}</p>
              <p className="text-gray-300 text-sm mt-1">
                {album.artist["#text"]}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyChart;
