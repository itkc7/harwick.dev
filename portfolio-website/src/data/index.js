export const letters = [
  { char: "H" },
  { char: "e" },
  { char: "l" },
  { char: "l" },
  { char: "o" },
  { char: "!" },
];

import "react-tooltip/dist/react-tooltip.css";

export const professionTexts = ["a Front End", "a Back End", "a Full Stack"];

export const socialIcons = [
  { icon: "bx bxl-instagram", link: "https://www.instagram.com/khar7/" },
  {
    icon: "bx bxl-linkedin",
    link: "https://www.linkedin.com/in/kyle-harwick/",
  },
  { icon: "bx bxl-github", link: "https://github.com/itkc7" },
  { icon: "bx bxl-discord-alt", link: "https://discordapp.com/users/itkc" },
];

export const aboutText = `Hi! I'm Kyle Harwick, a recent University of Pittsburgh undergraduate with a bachelor's in science in Digital Narrative and Interactive Design (DNID), with a minor in Japanese Studies. DNID combines the narrative, world-building, creative elements of the English department with the coding, technical, software parts of the School of Computing and Informatics to allow for a better understanding of the intricacies of interactivity and narrative by implementing these in embedded computational systems. My interests focus on UX/UI and web development, and I have experience in frontend, backend, and overall full stack development. I am proficient in HTML, CSS, JavaScript, Python, React, React Native, Next.js, and Java, and I am always looking for opportunities to learn new and exciting programming languages. In my free time I enjoy playing video games, watching and playing soccer, listening to music, reading and traveling. Please take a look at my site and feel free to reach out on LinkedIn, Discord, or even shoot me an email!`;

export const skillCards = [
  {
    icons: {
      primary: "bx bxl-java",
      secondary: "bx bxl-javascript",
      third: "bx bxs-group",
      fourth: "bx bx-library",
    },
    title: "Grass Gurus Lead Web Developer",
    description:
      "I recently had the privilege to become the lead and sole developer for a local company's business. Built with React, I had to for the first time effectively communicate with a client in order to achieve a final product. ",
    projectCount: 1,
    hoverPosition: {
      large: "bottom",
      small: "bottom",
    },
    links: [
      {
        url: "https://grassgurus.info",
        icon: "bx bx-link"
      }
    ],
  },
  {
    icons: {
      primary: "bx bxl-typescript",
      secondary: "bx bxl-figma",
      third: "bx bxs-data",
      fourth: "bx bxl-react",
    },
    title: "ProdUSE",
    description:
      "ProdUSE is a virtual fridge made in React Native that my senior capstone team and I tested through Expo GO. Users can log items in their 'fridge' which is then stored in a database (SQL) and keep better track of their items.",
    projectCount: 1,
    hoverPosition: {
      large: "bottom",
      small: "bottom",
    },
    links: [
      {
        url: "https://github.com/e-brent/ProdUSE",
        icon: "bx bxl-github",
      },
    ],
  },
  {
    icons: {
      primary: "bx bxl-flask",
      secondary: "bx bxl-python",
      third: "bx bx-translate",
      fourth: "bx bxl-docker",
    },
    title: "Communication Breakdown",
    description:
      "Communication Breakdown is a Japanese-English translation and linguistic breakdown webapp built with Python and Flask. The translation was originally handled through DeepLX API, and I had been hosting this site through Render and had to have a container for this API open at all times. However, this API has deprecated, so I will be rebuilding this project in the near future in a much more robust manner. The linguistic breakdown logic is handlded mainly by SpaCy NLP. Linked is my original Communication Repo, the Render build, and the newer in-progress repo.",
    projectCount: 3,
    hoverPosition: {
      large: "bottom",
      small: "bottom",
    },
    links: [
      {
        url: "https://github.com/itkc7/Communication-Breakdown",
        icon: "bx bxl-github",
      },
      {
        url: "https://communication-breakdown.onrender.com/",
        icon: "bx bx-link",
      },
      {
        url: "https://github.com/itkc7/Communication-Breakdown-V2",
        icon: "bx bxl-github",
      },
    ],
  },
  {
    icons: {
      primary: "bx bxl-react",
      secondary: "bx bxl-tailwind-css",
      third: "bx bxl-netlify",
      fourth: "bx bx-lock-alt",
    },
    title: "harwick.dev",
    description:
      "Obviously I had to include this site as a project. This site was built with Vite and Tailwind CSS and hosted on Netlify, and includes LastFM API to handle the music display. This project was extremely useful in many ways, such as teaching myself Vite and Tailwind, as well as adding something else to my portfolio and having a central place to have my projects displayed.",
    projectCount: 1,
    hoverPosition: {
      large: "top",
      small: "bottom",
    },
    links: [
      {
        url: "https://github.com/itkc7/harwick.dev",
        icon: "bx bxl-github",
      },
    ],
  },
  {
    icons: {
      primary: "bx bxl-python",
      secondary: "bx bxs-timer",
      third: "bx bx-award",
      fourth: "bx bx-brain",
    },
    title: "Machine Learning EKG Prediction Hackathon Winner",
    description:
      "This is a machine learning Python algorithm that can predict irregular EKGs and predict when they are wrong. Our project used an RNN model, LTSM (long term short memory). We won first prize for our category, Women's Health.",
    projectCount: 1,
    hoverPosition: {
      large: "top",
      small: "bottom",
    },
    links: [
      {
        url: "https://devpost.com/software/detecting-ekg-irregularities-with-machine-learning",
        icon: "bx bx-link",
      },
    ],
  },
  {
    icons: {
      primary: "bx bxs-file",
      secondary: "",
    },
    title: "Check out my Resume!",
    description: "",
    projectCount: 0,
    hoverPosition: {
      large: "top",
      small: "bottom",
    },
    links: [],
    isResume: true,
  },
];

