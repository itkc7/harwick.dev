import React from "react";
import NavigationCircles from "./NavigationCircles";

const Contact = () => {
  return (
    <div
      id="contact"
      className="h-screen flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl font-light md:mb-32 mb-24 dark:text-white">
        Connect with me!
      </h2>
      <form
        name="Contact" // Changed to match case exactly
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field" // Added honeypot for spam protection
        className="flex flex-col lg:space-y-12 space-y-8"
      >
        {/* Removed manual form-name input - Netlify will inject it automatically */}
        <input type="hidden" name="bot-field" /> {/* Honeypot field */}
        <div>
          <label className="sr-only">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="md:w-[500px] w-[330px] h-13
                pl-3 text-lg outline-0 border border-red-500 dark:border-red-500 placeholder:gray-600 dark:placeholder:red-500/50
                transition-colors duration-500"
            required
          />
        </div>
        <div>
          <label className="sr-only">Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="md:w-[500px] w-[330px] h-13
                pl-3 text-lg outline-0 border border-red-500 dark:border-red-500 placeholder:gray-600 dark:placeholder:red-500/50
                transition-colors duration-500"
            required
          />
        </div>
        <div>
          <label className="sr-only">Message</label>
          <textarea
            name="message"
            placeholder="Your Message"
            className="md:w-[500px] w-[330px] h-13 pl-3 text-lg outline-0 border border-red-500 dark:border-red-500 placeholder:gray-600 dark:placeholder:red-500/50
              min-h-[100px] max-h-[1200px] resize-y p-3 transition-colors duration-500"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="md:w-[500px] w-[330px] h-13
                pl-3 text-lg outline-0 bg-red-500 dark:bg-red-500 text-white dark:text-gray-900 uppercase font-extrabold
                cursor-pointer tracking-wide shadow-md shadow-gray-700/20 transition-colors duration-500"
          >
            Stay Connected
          </button>
        </div>
      </form>
      <NavigationCircles section="contact" />
    </div>
  );
};

export default Contact;
