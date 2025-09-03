import { Link } from "react-router-dom";
import ToggleVideoPlayer from "../components/ToggleVideoPlayer";
import { useTheme } from "../context/ThemeContext";
import BlogDisplay from "../components/BlogDisplay"

export default function Blog() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* This div ensures the content stays centered but the background covers the whole screen */}
      <div className="p-8 max-w-2xl mx-auto relative">
        {/* Minimal top-left Home link */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-sm text-gray-600 dark:text-gray-300 hover:underline"
        >
          ← Home
        </Link>

        {/* Dark mode toggle - positioned similarly to Navbar */}
        <div className="absolute top-4 right-4">
          <i
            className={`${
              darkMode ? "bx bx-sun" : "bx bx-moon"
            } text-2xl dark:text-gray-200 text-gray-600 cursor-pointer`}
            onClick={toggleDarkMode}
          ></i>
        </div>

        {/* Blog content */}
        <h1 className="pt-12 pb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Onomichi 08/11/2025
        </h1>
        <ToggleVideoPlayer
          video1="/videos/onomichi_music.mp4"
          video2="/videos/Onomichi_natural.mp4"
        />

        <BlogDisplay/>
        
        {/* <div className="mt-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Blog Post Title
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is a sample blog post content. When dark mode is enabled, this
            text should change color appropriately.
          </p>
        </div> */}
      </div>
    </div>
  );
}
