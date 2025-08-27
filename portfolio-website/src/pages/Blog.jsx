import { Link } from "react-router-dom";
import ToggleVideoPlayer from "../components/ToggleVideoPlayer";

export default function Blog() {
  return (
    <div className="p-8 max-w-2xl mx-auto relative">
      {/* Minimal top-left Home link */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-sm text-gray-600 dark:text-gray-300 hover:underline"
      >
        ← Home
      </Link>

      {/* Blog content */}
      <h1 className="pb-8 text-center text-2xl font-bold">
        Onomichi 08/11/2025
      </h1>
      <ToggleVideoPlayer
        video1="/videos/onomichi_music.mp4"
        video2="/videos/Onomichi_natural.mp4"
      />
    </div>
  );
}
