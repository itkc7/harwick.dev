import React, { useState } from "react";
import NavigationCircles from "./NavigationCircles";
import ContactSuccess from "./Success"; // Import the success component

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch("/", {
      method: "POST",
      body: new FormData(form),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => alert(error));
  };

  if (submitted) {
    return <ContactSuccess />;
  }

  return (
    <div
      id="contact"
      className="h-screen flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl font-light md:mb-18 mb-14 dark:text-white">
        Connect with me!
      </h2>
      <a href="mailto:kyle@harwick.dev" target="_blank">
        <h1 className=" text-2xl md:mb-15 mb-10 underline text-[#F44336] dark:text-[#F44336] dark:hover:text-white hover:text-[#212121] transition-colors duration-500 inline-flex cursor-pointer">
          kyle@harwick.dev
        </h1>
      </a>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        className="flex flex-col lg:space-y-12 space-y-8"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="md:w-[500px] w-[330px] h-13 pl-3 text-lg outline-0 border text-gray-900 dark:text-white border-red-500 dark:border-red-500 placeholder:gray-600 dark:placeholder:red-500/50 transition-colors duration-500"
          required
        />

        <textarea
          name="message"
          placeholder="Name and Message!"
          className="md:w-[500px] w-[330px] h-13 pl-3 text-lg outline-0 border text-gray-900 dark:text-white border-red-500 dark:border-red-500 placeholder:gray-600 dark:placeholder:red-500/50 min-h-[100px] max-h-[1200px] resize-y p-3 transition-colors duration-500"
          required
        ></textarea>

        <input
          type="submit"
          value="Stay Connected"
          className="md:w-[500px] w-[330px] h-13 pl-3 text-lg outline-0 bg-red-500 dark:bg-red-500 text-white dark:text-gray-900 uppercase font-extrabold cursor-pointer tracking-wide shadow-md shadow-gray-700/20 dark:hover:text-white hover:text-[#212121] transition-colors duration-500"
        />
      </form>
      <NavigationCircles section="contact" />
    </div>
  );
};

export default Contact;
