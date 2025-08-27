import React, { useState } from "react";
import Navbar from "./Navbar";
import NavigationCircles from "./NavigationCircles";
import AnimatedContent from "./AnimatedContent";
import { professionTexts, aboutText, socialIcons } from "../data/index";
import { useTheme } from "../context/ThemeContext";
import TextType from "./TextType";
import ShinyText from './ShinyText';

const Hero = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [backgroundImageOpacity, setImageOpacity] = useState(0.2);
  const { darkMode } = useTheme();

  return (
    <div
      id="home"
      className="w-full h-screen flex flex-col justify-center items-center isolate
    relative mb-20 md:mb-50 z-10"
    >
      <Navbar />
      <div
        className="flex flex-col md:items-center items-start xl:gap-y-10
          gap-y-3 xl:mb-15 md:mb-20 mb-0"
      >
        <h1
          className="flex flex-col xl:space-y-8 md:space-y-4 sm:space-y-2
          xl:text-6xl md:text-4xl sm:text-3xl md:font-normal font-bolder mt-8 md:mt-0
          items-center w-full"
        >
          {/* Combined AnimatedContent */}
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            initialOpacity={0}
            animateOpacity={true}
            scale={1.1}
            threshold={0.2}
            delay={0.3}
            playOnce={true}
          >
            {/* First line: Hello */}
            <div className="flex justify-center w-full mb-4">Hello!</div>

            {/* Second line: I'm a Web Dev with typing effect */}
            <div className="flex justify-center items-baseline px-4 w-full relative">
              {/* Hidden placeholder for consistent spacing */}
              <div className="opacity-0 xl:text-6xl md:text-4xl text-2xl tracking-wider xl:py-4 py-2">
                I'm a Full Stack Web Developer
              </div>

              {/* Visible animated text */}
              <div className="absolute inset-0 flex justify-center items-center w-full">
                <div className="flex items-baseline whitespace-nowrap">
                  <span className="xl:text-6xl md:text-4xl text-2xl tracking-wider xl:py-4 py-2">
                    I'm{" "}
                  </span>

                  <div className="inline-block mx-2">
                    <TextType
                      text={professionTexts}
                      typingSpeed={80}
                      deleteSpeed={50}
                      pauseDuration={2500}
                      showCursor={true}
                      cursorCharacter="_"
                      className="xl:text-6xl md:text-4xl text-2xl font-extrabold text-red-500 dark:text-white"
                      initialDelay={1200} // match fade-in duration
                    />
                  </div>

                  <span className="xl:text-6xl md:text-4xl text-2xl tracking-wider xl:py-4 py-2">
                    Web Developer
                  </span>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </h1>

        {/* About Me button */}
        <div className="w-full flex justify-center mt-4 md:ml-8">
          <button
            className="xl:w-[400px] md:w-[300px] w-[270px] bg-gray-900 dark:bg-gray-200 md:py-1 py-0 md:px-4 
            px-2 xl:text-2xl md:text-xl text-base text-white dark:text-gray-900 tracking-widest rounded-r-4xl flex justify-between
            items-center hover:cursor-pointer transition-colors duration-500"
            onClick={() => setIsTextVisible(!isTextVisible)}
            onMouseEnter={() => setImageOpacity(0.4)}
            onMouseLeave={() => setImageOpacity(0.2)}
          >
            {isTextVisible ? "Hide About Me" : "About Me"}
            <i
              className={`bx ${isTextVisible ? "bx-book-alt" : "bx-book-open"}`}
            ></i>
          </button>
        </div>

        {/* Social media icons */}
        <div className="flex md:gap-12 gap-2 mt-4 md:ml-8 flex-col md:flex-row">
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
            className="w-full relative lg:-top-20 2xl:-top-30 transition-opacity duration-300"
            style={{ opacity: backgroundImageOpacity }}
          />

          <div
            className={`h-[250px] md:h-[300px] xl:h-[350px] px-3 xl:text-lg md:text-base text-xs relative -top-35
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
