import React from "react";
import NavigationCircles from "./NavigationCircles";

const ContactSuccess = () => {
  return (
    <div
      id="contact"
      className="h-screen flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl font-light md:mb-32 mb-24 dark:text-white">
        Thanks for reaching out!
      </h2>

      <div className="md:w-[500px] w-[330px] text-center">
        <p className="text-lg mb-8 dark:text-white">
          Your message has been sent successfully. I'll get back to you soon!
        </p>
      </div>
      <NavigationCircles section="contact" />
    </div>
  );
};

export default ContactSuccess;
