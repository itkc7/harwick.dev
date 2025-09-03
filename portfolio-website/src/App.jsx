import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import CurrentlyPlaying from "./components/CurrentlyPlaying";
import { ThemeProvider } from "./context/ThemeContext";
import Blog from "./pages/Blog";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-900 text-red-500 dark:text-red-500
      transition-colors duration-500"
    >
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <>
          <Hero />
          <Services />
          <CurrentlyPlaying />
          <Contact />
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
