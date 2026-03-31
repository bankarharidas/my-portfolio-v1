import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCode,
  FaHtml5,
  FaCss3Alt,
  FaJava,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiTailwindcss,
  SiJavascript,
  SiCplusplus,
  SiSpringboot,
  SiPostman,
  SiGooglecloud,
} from "react-icons/si";

export const personalInfo = {
  name: "Haridas Bankar",
  title: "Full Stack Developer",
  email: "bankarhari02@gmail.com",
  linkedin: "https://linkedin.com/in/bankarharidas",
  github: "https://github.com/bankarharidas",
  resumeLink: `${import.meta.env.BASE_URL}Haridas_Bankar_Resume.pdf`,
  bio: "Innovative Full Stack Developer passionate about creating seamless and impactful web solutions. With a strong foundation in Computer Science and hands-on experience in modern web technologies, I thrive in collaborative environments and love tackling new challenges.",
  shortBio: "I build things for the web.",
};

export const education = [
  {
    institution: "Savitribai Fule Pune University",
    degree: "Bachelor of Engineering in Computer Science",
    duration: "Aug 2022 – Present",
    score: "CGPA: 7.20/10",
  },
  {
    institution: "VidyaNiketan School, Pune",
    degree: "Class 12th SSC",
    duration: "April 2021 - May 2022",
    score: "74.5%",
  },
  {
    institution: "VidyaNiketan School, Pune",
    degree: "Class 10th CBSE",
    duration: "April 2019 - May 2020",
    score: "85.80%",
  },
];

export const projects = [
  {
    title: "AyurTrace",
    tech: ["Hyperledger Fabric", "IoT", "React.js", "Smart Contracts"],
    description: [
      <>
        <span className="text-accent-1 font-semibold">
          1st Place Winner SIH 2025 Round 1
        </span>
        .
      </>,
      <>
        Directed a{" "}
        <span className="text-text-primary font-medium">
          blockchain-based supply chain
        </span>{" "}
        web application for Ayurvedic herb traceability.
      </>,
      <>
        Implemented{" "}
        <span className="text-text-primary font-medium">
          immutable on-chain tracking
        </span>{" "}
        with QR verification, ensuring{" "}
        <span className="text-accent-1 font-semibold">
          100% supply chain transparency
        </span>
        .
      </>,
    ],
    date: "Aug 2025 – Sep 2025",
    githubLink: "https://github.com/bankarharidas",
    liveLink: "https://plugin-bankar.vercel.app/", // Added Live Link
    category: "Blockchain",
    icon: <FaDatabase size={24} className="text-accent-1" />,
    image: "/AyurTrace.png",
  },
  {
    title: "MaViK-39",
    tech: ["RAG", "IoT", "React.js", "TensorFlow", "Cloud"],
    description: [
      <>
        <span className="text-accent-1 font-semibold">
          National Finalist SIH 2025
        </span>
        .
      </>,
      <>
        Delivered an{" "}
        <span className="text-text-primary font-medium">
          IoT-enabled lab management
        </span>{" "}
        web application, decreasing equipment downtime by{" "}
        <span className="text-accent-1 font-semibold">25%</span>.
      </>,
      <>
        Integrated{" "}
        <span className="text-text-primary font-medium">
          biometric authentication
        </span>
        , voice interface, and{" "}
        <span className="text-text-primary font-medium">
          RAG-powered AI chatbot
        </span>
        , improving operational efficiency by{" "}
        <span className="text-accent-1 font-semibold">40%</span>.
      </>,
    ],
    date: "Nov 2025 – Dec 2025",
    githubLink: "https://github.com/bankarharidas",
    liveLink: "https://plugin-bankar.vercel.app/", // Added Live Link
    category: "IoT & AI",
    icon: <FaCode size={24} className="text-accent-1" />,
    image: "/MaViK-39.jpeg",
  },
  {
    title: "DevLink",
    tech: ["React JS", "Node.js", "Express.js", "MongoDB"],
    description: [
      <>
        Designed and developed a{" "}
        <span className="text-text-primary font-medium">
          full-stack developer community platform
        </span>{" "}
        enabling users to create profiles, share projects, and collaborate.
      </>,
      <>
        Owned the system end-to-end by implementing{" "}
        <span className="text-text-primary font-medium">
          frontend architecture
        </span>
        , <span className="text-text-primary font-medium">backend APIs</span>,
        and{" "}
        <span className="text-text-primary font-medium">
          secure authentication
        </span>
        .
      </>,
    ],
    date: "June 2025 – July 2025",
    githubLink: "https://github.com/bankarharidas",
    liveLink: "https://plugin-bankar.vercel.app/", // Added Live Link
    category: "Full Stack",
    icon: <FaReact size={24} className="text-accent-1" />,
    image: "/DevLink.png",
  },
  {
    title: "Apna College Web Dev",
    tech: ["HTML5", "CSS3", "JavaScript", "React JS"],
    description: [
      <>
        A comprehensive{" "}
        <span className="text-text-primary font-medium">
          web development learning repository
        </span>{" "}
        covering projects and exercises from the Apna College curriculum.
      </>,
      <>
        Built{" "}
        <span className="text-text-primary font-medium">
          multiple hands-on projects
        </span>{" "}
        spanning HTML, CSS, JavaScript, and React to solidify core frontend fundamentals.
      </>,
      <>
        Demonstrates{" "}
        <span className="text-accent-1 font-semibold">
          progressive skill growth
        </span>{" "}
        through structured, project-based learning.
      </>,
    ],
    date: "Sep 2025",
    githubLink: "https://github.com/bankarharidas/apna-college-web-dev",
    liveLink: "https://github.com/bankarharidas/apna-college-web-dev",
    category: "Web Dev",
    icon: <FaHtml5 size={24} className="text-accent-1" />,
    image: null,
  },
  {
    title: "Handwritten Digit Recognition AI",
    tech: ["Python", "Flask", "Scikit-Learn", "MNIST", "HTML5 Canvas"],
    description: [
      <>
        Built a{" "}
        <span className="text-text-primary font-medium">
          full-stack AI web application
        </span>{" "}
        that recognises handwritten digits (0–9) drawn on an HTML5 canvas in real time.
      </>,
      <>
        Trained an{" "}
        <span className="text-accent-1 font-semibold">MLP Classifier</span>{" "}
        on the MNIST dataset with custom image pre-processing (cropping, centering, blurring) to boost accuracy.
      </>,
      <>
        Served predictions via a{" "}
        <span className="text-text-primary font-medium">Flask REST API</span>{" "}
        with live visual feedback of the processed input.
      </>,
    ],
    date: "Feb 2026",
    githubLink: "https://github.com/bankarharidas/Handwritten-Digit-Recognition-AI",
    liveLink: "https://github.com/bankarharidas/Handwritten-Digit-Recognition-AI",
    category: "AI / ML",
    icon: <FaCode size={24} className="text-accent-1" />,
    image: null,
  },
  {
    title: "YT Download",
    tech: ["Python", "yt-dlp", "Flask", "HTML5", "CSS3"],
    description: [
      <>
        Developed a{" "}
        <span className="text-text-primary font-medium">
          YouTube video downloader web app
        </span>{" "}
        that lets users paste a URL and download videos in their preferred quality.
      </>,
      <>
        Powered by{" "}
        <span className="text-accent-1 font-semibold">yt-dlp</span> under the hood with a clean{" "}
        <span className="text-text-primary font-medium">Flask backend</span>{" "}
        handling download requests and file streaming.
      </>,
      <>
        Features a{" "}
        <span className="text-text-primary font-medium">
          simple, responsive UI
        </span>{" "}
        for a frictionless download experience.
      </>,
    ],
    date: "2025",
    githubLink: "https://github.com/bankarharidas/Yt-dowload",
    liveLink: "https://github.com/bankarharidas/Yt-dowload",
    category: "Tool",
    icon: <FaNodeJs size={24} className="text-accent-1" />,
    image: null,
  },
];

export const skills = {
  languages: [
    { name: "C/C++", icon: <SiCplusplus /> },
    { name: "Java", icon: <FaJava /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "SQL", icon: <FaDatabase /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
  ],
  frameworksAndLibraries: [
    { name: "React JS", icon: <FaReact /> },
    { name: "Node JS", icon: <FaNodeJs /> },
    { name: "Express JS", icon: <SiExpress /> },
    { name: "Springboot", icon: <SiSpringboot /> },
    { name: "React Native", icon: <FaReact /> },
  ],
  toolsAndPlatforms: [
    { name: "Git & GitHub", icon: <FaGithub /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "n8n", icon: <FaCode /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "Google Cloud", icon: <SiGooglecloud /> },
    { name: "Firebase", icon: <SiFirebase /> },
  ],
  coreCompetencies: [
    "Presentations",
    "Oratory",
    "Team Leadership",
    "Event Hosting",
    "Agile Methodologies",
    "Problem Solving",
  ],
};

export const experience = [
  {
    role: "Product Intern",
    organization: "Adobe",
    duration: "Incoming 2026",
    points: [
      "Selected as a Product Intern at Adobe.",
      "Excited to contribute to world-class digital experiences and product innovation.",
    ],
  },
  {
    role: "Web Development Intern",
    organization: "ProAzure Solution pvt.ltd (Remote)",
    duration: "June 2025 – July 2025",
    points: [
      "Developed key components for the Redknot platform, simplifying the global immigration process.",
      "Collaborated with engineering and design on front-end (React, UI/UX) and back-end services.",
      "Practiced agile methodologies and maintained high code quality through debugging, testing, and documentation.",
    ],
  },
  // {
  //   role: "Junior Partner",
  //   organization: "The Apex Circle (TAC)",
  //   duration: "Jan 2025 – Present",
  //   points: [
  //     "Participated in over 15 hackathons and technical events, collaborating with peers to build innovative solutions.",
  //     "Mentored juniors by sharing knowledge, guiding them in projects, and fostering a strong tech community.",
  //   ],
  // },
  {
    role: "Technical Executive",
    organization: "Computer Society of India, CU Student Branch",
    duration: "Nov 2024 - July 2025",
    points: [
      "Organized 5+ workshops, hackathons, and competitions to enhance student learning and engagement.",
      "Coordinated with faculty and industry experts to bring technical opportunities to students.",
    ],
  },
  // {
  //   role: "AMCAT 2nd Rank Holder",
  //   organization: "Chandigarh University",
  //   duration: "Sept 2024",
  //   points: [
  //     "Secured 2nd rank in AMCAT among 5500+ peers, showcasing strong analytical and problem-solving skills.",
  //     "Demonstrated excellence in aptitude, coding, and domain-specific assessments, outperforming competition.",
  //   ],
  // },
];

export const socialLinks = {
  linkedin: { url: personalInfo.linkedin, icon: <FaLinkedin size={24} /> },
  github: { url: personalInfo.github, icon: <FaGithub size={24} /> },
  email: {
    url: `mailto:${personalInfo.email}`,
    icon: <FaEnvelope size={24} />,
  },
};
