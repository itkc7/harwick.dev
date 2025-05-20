import React, { useEffect, useState} from "react";
import Navbar from "./Navbar";
import NavigationCircles from "./NavigationCircles";
import {
  letters,
  professionTexts,
  aboutText,
  socialIcons,
} from "../data/index";
import { useTheme } from "../context/ThemeContext";


const Hero = () => {
  const [hoveredLetter, setHoveredLetter] = useState(null);
  const [currentText, setCurrentText] = useState(professionTexts[0]);
  const [fade, setFade] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [backgroundImageOpacity, setImageOpacity] = useState(0.2);
  const [activeAnimations, setActiveAnimations] = useState({});
  const { darkMode } = useTheme();
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % professionTexts.length;
        setCurrentText(professionTexts[currentIndex]);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleLetterHover = (index) => {
    // Don't start new animation if any letters are currently animating
    if (Object.values(activeAnimations).some(Boolean)) return;

    setHoveredLetter(index);

    // Create wave effect
    const newActiveAnimations = {};
    const delayBetweenLetters = 80; // ms between each letter's animation

    // Mark the hovered letter as active immediately
    newActiveAnimations[index] = true;

    // Animate letters to the left
    for (let i = index - 1; i >= 0; i--) {
      const delay = (index - i) * delayBetweenLetters;
      setTimeout(() => {
        setActiveAnimations((prev) => ({ ...prev, [i]: true }));
        setTimeout(() => {
          setActiveAnimations((prev) => ({ ...prev, [i]: false }));
        }, 600); // Animation duration
      }, delay);
    }

    // Animate letters to the right
    for (let i = index + 1; i < letters.length; i++) {
      const delay = (i - index) * delayBetweenLetters;
      setTimeout(() => {
        setActiveAnimations((prev) => ({ ...prev, [i]: true }));
        setTimeout(() => {
          setActiveAnimations((prev) => ({ ...prev, [i]: false }));
        }, 600); // Animation duration
      }, delay);
    }

    // Clear hovered letter animation after wave completes
    const totalDuration =
      Math.max(
        index * delayBetweenLetters,
        (letters.length - 1 - index) * delayBetweenLetters
      ) + 600;

    setTimeout(() => {
      setActiveAnimations((prev) => ({ ...prev, [index]: false }));
      setHoveredLetter(null);
    }, totalDuration);

    setActiveAnimations(newActiveAnimations);
  };

  return (
    <div
      id="home"
      className="w-full h-screen flex flex-col justify-center items-center isolate
    relative z-10"
    >
      <Navbar />
      <div
        className="flex flex-col md:items-center items-start xl:gap-y-10
          gap-y-3 xl:mb-15 md:mb-20 mb-0 "
      >
        <h1
          className=" flex flex-col xl:space-y-8 md:space-y-4 sm:space-y-2
          xl:text-6xl md:text-4xl sm:text-3xl md:font-normal font-bolder mt-8 md:mt-0"
        >
          <span className="flex mx-auto md:mx-0  xl:text-6xl ">
            {letters.map((letter, index) => (
              <span
                key={index}
                onMouseEnter={() => handleLetterHover(index)}
                onMouseLeave={() => {}}
                className={`transition-all duration-200 ${
                  activeAnimations[index] || hoveredLetter === index
                    ? "animate-letter-bounce cursor-grab"
                    : "cursor-grab"
                }`}
              >
                {"  "}
                {letter.char}
              </span>
            ))}
          </span>
          <span
            className="xl:text-6xl md:text-4xl text-2xl tracking-wider
          xl:py-4 py-2 overflow-hidden text-center"
          >
            I'm{" "}
            <span
              className={`inline-block xl:w-[380px] md:w-[240px] w-[160px]
                      lg:ml-6 ml-2 font-extrabold transition-opacity duration-500
                      ease-out text-red-500 dark:text-white ${
                        fade ? "opacity-100" : "opacity-0"
                      }`}
            >
              {currentText}
            </span>{" "}
            <span className="ml-5 ">Web Developer</span>
          </span>
        </h1>
        <button
          className="xl:w-[400px] md:w-[300px] w-[270px] bg-gray-900 dark:bg-gray-200 md:py-1 py-0 md:px-4 
        px-2 xl:text-2xl md:text-xl text-base text-white dark:text-gray-900 tracking-widest rounded-r-4xl flex justify-between
        items-center hover:cursor-pointer md:mr-auto md:mx-0 mx-auto transition-colors duration-500"
          onClick={() => setIsTextVisible(!isTextVisible)}
          onMouseEnter={() => setImageOpacity(0.4)}
          onMouseLeave={() => setImageOpacity(0.2)}
        >
          {isTextVisible ? "Hide My Story" : "Read My Story"}
          <i
            className={`bx ${isTextVisible ? "bx-book-alt" : "bx-book-open"}`}
          ></i>
        </button>
        <div
          className="flex md:gap-12 gap-2 mr-auto absolute md:relative left-4 md:left-auto
        top-20 md:top-auto flex-col md:flex-row"
        >
          {socialIcons.map((social, index) => (
            <a
              href={social.link}
              target="_blank"
              key={index}
              className="xl:text-3xl md:text-2xl text-red-500 dark:text-red-500 dark:hover:text-white hover:text-gray-900
                      transition-colors duration-500"
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
        <div className="lg:w-600px md:w-[500px] w-[350px] absolute left-1/2 -translate-x-1/2 -z-10">
          <img
            src={`${
              darkMode ? "/images/dark-icon.png" : "/images/main-icon.png"
            }`}
            alt=">h"
            className="w-full relative -top-30 transition-opacity duration-300"
            style={{ opacity: backgroundImageOpacity }}
          />
          <span
            className="xl:text-xs md:text-[10px] text-[8px] font-bold
                  tracking-wide absolute -top-5 xl:right-15 lg:right-26
                  md:right-16 right-10 rotate-[3.5deg] animate-bounce"
          >
            {/* insert bouncing text if needed */}
          </span>

          <div
            className={`xl:h-[350px]  md:h-[300px] h-[300px] px-3 xl:text-lg md:text-base text-xs relative -top-35
                  font-light text-gray-900 dark:text-gray-200 text-justify tracking-wide overflow-y-auto transform origin-top custom-scrollbar ${
                    isTextVisible ? "scale-y-100" : "scale-y-0"
                  } transition-transform duration-300`}
          >
            <p
              className="xl:py-3 py-1 px-1 [&::first-letter]:text-[30px] [&::first-letter]
            :ml-5 [&::first-letter]:text-red-500 dark:[&::first-letter]:text-red-500"
            >
              {aboutText}
            </p>
          </div>
        </div>
      </div>
      <NavigationCircles section="home" />
    </div>
  );
};

export default Hero;
