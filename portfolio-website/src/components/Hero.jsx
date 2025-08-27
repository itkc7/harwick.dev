import React, { useState } from "react";
import Navbar from "./Navbar";
import NavigationCircles from "./NavigationCircles";
import AnimatedContent from "./AnimatedContent";
import { professionTexts, aboutText, socialIcons } from "../data/index";
import { useTheme } from "../context/ThemeContext";
import TextType from "./TextType";

const Hero = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [backgroundImageOpacity, setImageOpacity] = useState(0.2);
  const { darkMode } = useTheme();

  return (
    <div
      id="home"
      className="w-full min-h-screen flex flex-col justify-center items-center isolate relative pb-20 z-10"
    >
      <Navbar />
      <div className="flex flex-col md:items-center items-start xl:gap-y-10 gap-y-6 xl:mb-15 md:mb-20 mb-0 mt-10">
        <h1 className="flex flex-col xl:space-y-8 md:space-y-4 sm:space-y-2 xl:text-6xl md:text-4xl sm:text-3xl md:font-normal font-bolder mt-8 md:mt-0 items-center w-full">
          {/* First line: Hello - Fades in first */}
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
            <div className="flex justify-center w-full mb-4">Hello!</div>
          </AnimatedContent>

          {/* Second line: I'm a Web Dev with typing effect - Fades in after Hello */}
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            initialOpacity={0}
            animateOpacity={true}
            scale={1.1}
            threshold={0.2}
            delay={1}
            playOnce={true}
          >
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
                      pauseDuration={2000}
                      showCursor={true}
                      cursorCharacter="_"
                      className="xl:text-6xl md:text-4xl text-2xl font-extrabold text-red-500 dark:text-white"
                      initialDelay={2000}
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

        {/* Social media icons */}
        <div className="flex md:gap-12 gap-6 mt-4 md:ml-8 flex-col md:flex-row justify-center w-full">
          {socialIcons.map((social, index) => (
            <a
              href={social.link}
              target="_blank"
              key={index}
              className="xl:text-3xl md:text-2xl text-red-500 dark:text-red-500 dark:hover:text-white hover:text-gray-900 transition-colors duration-500"
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        {/* About Me button */}
        <div className="w-full flex justify-center mt-4 md:ml-8 relative z-20">
          <button
            className="xl:w-[400px] md:w-[300px] w-[270px] bg-gray-900 dark:bg-gray-200 md:py-3 py-2 md:px-4 
            px-2 xl:text-2xl md:text-xl text-base text-white dark:text-gray-900 tracking-widest rounded-r-4xl flex justify-between
            items-center hover:cursor-pointer transition-colors duration-500 shadow-lg hover:shadow-xl"
            onClick={() => setIsTextVisible(!isTextVisible)}
            onMouseEnter={() => setImageOpacity(0.4)}
            onMouseLeave={() => setImageOpacity(0.2)}
          >
            {isTextVisible ? "Hide About Me" : "About Me"}
            <i
              className={`bx ${
                isTextVisible ? "bx-chevron-up" : "bx-chevron-down"
              } text-xl`}
            ></i>
          </button>
        </div>

        {/* About Me content */}
        <div className="w-full flex justify-center relative">
          <div
            className={`xl:w-[600px] md:w-[500px] w-[350px] transition-all duration-500 ease-in-out overflow-auto ${
              isTextVisible ? "max-h-[500px] mt-6" : "max-h-0"
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <p className="xl:text-lg md:text-base text-sm text-gray-900 dark:text-gray-200 text-justify leading-relaxed [&::first-letter]:text-3xl [&::first-letter]:font-bold [&::first-letter]:text-red-500 dark:[&::first-letter]:text-red-500 [&::first-letter]:mr-1 [&::first-letter]:float-left">
                {aboutText}
              </p>
            </div>
          </div>
        </div>

        {/* Background image */}
        <div className="lg:w-600px md:w-[500px] w-[350px] absolute left-1/2 -translate-x-1/2 -z-10 mt-12">
          <img
            src={`${
              darkMode ? "/images/dark-icon.png" : "/images/main-icon.png"
            }`}
            alt="Decorative background"
            className="w-full relative lg:-top-20 2xl:-top-30 transition-opacity duration-300"
            style={{ opacity: backgroundImageOpacity }}
          />
        </div>
      </div>
      <NavigationCircles section="home" />
    </div>
  );
};

export default Hero;
