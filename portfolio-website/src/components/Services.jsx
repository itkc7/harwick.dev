import React, { useState, useEffect } from "react";
import { skillCards } from "../data/index";
import NavigationCircles from "./NavigationCircles";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

//import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Services = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [isResumeVisible, setIsResumeVisible] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Create plugin instance without sidebar
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  });

  const getPositionClass = (card) => {
    const position = isLargeScreen
      ? card.hoverPosition.large
      : card.hoverPosition.small;
    return position === "bottom" ? "bottom-0" : "top-0";
  };

  const getHoverPositionClass = (card) => {
    const position = isLargeScreen
      ? card.hoverPosition.large
      : card.hoverPosition.small;
    return position === "bottom" ? "bottom-full" : "top-full";
  };

  const handleResumeClick = () => {
    setIsResumeVisible(!isResumeVisible);
  };

  return (
    <div
      id="services"
      className="min-h-screen flex flex-col justify-center items-center px-4 xl:py-12 py-8 -mt-18 md:mb-35"
    >
      <h2 className="text-4xl font-light mb-32 2xl:mt-0 md:mt-15 mt-12 dark:text-white">
        Skill-set and Projects
      </h2>
      <div
        className="w-full xl:w-[900px] lg:w-[850px] md:w-[600px] grid lg:grid-cols-3
          grid-cols-1 lg:gap-12 gap-32 lg:mb-0 mb-16"
      >
        {skillCards.map((card, index) => (
          <div
            key={index}
            className={`lg:max-w-[280px] md:max-w-[400px] max-w-[320px] 
                  w-full mx-auto rounded-sm ring-2 ring-gray-400/20 shadow-md cursor-default shadow-gray-700/20 relative isolate
                  h-[280px] md:h-[320px]
                  ${card.isResume ? "resume-card" : ""}
                  transition-all duration-300 ease-in-out
                  ${
                    card.isResume && hoveredCardIndex === index
                      ? "transform hover:scale-105 hover:shadow-lg cursor-pointer hover:shadow-red-500/20"
                      : ""
                  }
                  ${card.isResume ? "hover:ring-2 hover:ring-red-500" : ""}`}
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
            onClick={card.isResume ? handleResumeClick : undefined}
          >
            {card.isResume && hoveredCardIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white bg-red-500 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  Click to view
                </span>
              </div>
            )}
            <div className="p-3 bg-gray-300 dark:bg-gray-800 transition-colors duration-500 h-full flex flex-col">
              <div className="flex-shrink-0">
                <i
                  className={`${card.icons.primary} md:text-4xl text-3xl text-gray-900 dark:text-white transition-colors
                        duration-500`}
                ></i>
                {card.icons.secondary && (
                  <i
                    className={`${card.icons.secondary} md:text-4xl text-3xl text-gray-900 dark:text-white transition-colors
                          duration-500`}
                  ></i>
                )}
                {card.icons.third && (
                  <i
                    className={`${card.icons.third}  md:text-4xl text-3xl text-gray-900 dark:text-white transition-colors
                          duration-500`}
                  ></i>
                )}
                {card.icons.fourth && (
                  <i
                    className={`${card.icons.fourth}  md:text-4xl text-3xl text-gray-900 dark:text-white transition-colors
                          duration-500`}
                  ></i>
                )}
                <h3
                  className="md:text-2xl text-xl font-bold my-4 text-red-500 dark:text-red-500 
                        transition-colors duration-500"
                >
                  {card.title}
                </h3>
              </div>
              <p
                className="text-gray-900 dark:text-white md:text-base text-sm
                      font-light overflow-y-auto custom-scrollbar pr-2 transition-colors duration-500 flex-1 min-h-0"
              >
                {card.description}
              </p>
              <div
                className={`w-full absolute left-0 ${getPositionClass(
                  card
                )} flex flex-col gap-y-5 py-4 transition-all duration-500 -z-10
                ${
                  hoveredCardIndex === index && `${getHoverPositionClass(card)}`
                }`}
              >
                {isLargeScreen && card.hoverPosition.large === "top" && (
                  <div
                    className={`flex ${
                      card.projectCount > 1
                        ? "justify-between"
                        : "justify-center"
                    }`}
                  >
                    {card.links?.map(
                      (linkItem, index) =>
                        linkItem.url && (
                          <a
                            href={
                              linkItem.url === "#" ? undefined : linkItem.url
                            }
                            key={index}
                            target={linkItem.url === "#" ? undefined : "_blank"}
                            rel={
                              linkItem.url === "#"
                                ? undefined
                                : "noopener noreferrer"
                            }
                            onClick={(e) =>
                              linkItem.url === "#" && e.preventDefault()
                            }
                            className="text-lg bg-red-500 dark:bg-red-500
                    w-10 aspect-square grid place-items-center text-white rounded-full transition-colors hover:opacity-60 duration-500 transition-opacity"
                          >
                            <i
                              className={`${linkItem.icon} text-xl md:text-3xl`}
                            ></i>
                          </a>
                        )
                    )}
                  </div>
                )}
                <h2
                  className="text-2xl text-center text-gray-900 dark:text-white font-light 
                        tracking-white"
                >
                  {`${
                    card.projectCount > 1
                      ? "Projects"
                      : card.projectCount === 0
                      ? ""
                      : "Project"
                  }`}
                </h2>
                {(!isLargeScreen ||
                  (isLargeScreen && card.hoverPosition.large === "bottom")) && (
                  <div
                    className={`flex ${
                      card.projectCount > 1
                        ? "justify-between"
                        : "justify-center"
                    }`}
                  >
                    {card.links?.map(
                      (linkItem, index) =>
                        linkItem.url && (
                          <a
                            href={
                              linkItem.url === "#" ? undefined : linkItem.url
                            }
                            key={index}
                            target={linkItem.url === "#" ? undefined : "_blank"}
                            rel={
                              linkItem.url === "#"
                                ? undefined
                                : "noopener noreferrer"
                            }
                            onClick={(e) =>
                              linkItem.url === "#" && e.preventDefault()
                            }
                            className="text-lg bg-red-500 dark:bg-red-500
                    w-10 aspect-square grid place-items-center text-white rounded-full transition-colors hover:opacity-60 duration-500 transition-opacity"
                          >
                            <i
                              className={`${linkItem.icon} text-xl md:text-3xl`}
                            ></i>
                          </a>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Viewer for Resume */}
      <div
        className={`w-full max-w-4xl mt-30 mx-auto transition-all duration-500 ease-in-out overflow-hidden 
          ${isResumeVisible ? "max-h-[800px] py-8" : "max-h-0 py-0"}`}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {isResumeVisible && (
            <div className="h-[600px] border border-gray-300 rounded-lg shadow-lg">
              <Viewer
                fileUrl="/harwick-resume.pdf"
                plugins={[defaultLayoutPluginInstance]}
                theme={{
                  theme: "dark",
                }}
              />
            </div>
          )}
        </Worker>
      </div>

      <NavigationCircles section="services" />
    </div>
  );
};

export default Services;
