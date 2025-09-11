import React from "react";
import { BarLoader } from "react-spinners";

const Loader = ({
  isLoading = true,
  color = "#F44336",
  size = 150,
  cssOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  },
}) => {
  return (
    <div
      className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 grid place-items-center transition-opacity duration-1000 ease-in-out ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <BarLoader
        color={color}
        loading={isLoading}
        cssOverride={cssOverride}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
