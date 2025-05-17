"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

import Instagram from "../../public/icons/instagram.svg";
import LinkedIn from "../../public/icons/linkedin.svg";
import Github from "../../public/icons/github.svg";

import { Hero } from "../components/section/hero-section";
import { About } from "../components/section/about-section";
import { Skills } from "../components/section/skills-section";
import { Projects } from "../components/section/project-section";
import { collection, getDocs } from "firebase/firestore";
import firestore from "./firebase";



export default function Home() {

    const containerRef = useRef<HTMLDivElement>(null);
    const reactRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const flutterRef = useRef<HTMLDivElement>(null);
    const tailwindRef = useRef<HTMLDivElement>(null);
    const firebaseRef = useRef<HTMLDivElement>(null);
    const reduxRef = useRef<HTMLDivElement>(null);
    const skillRef = useRef<HTMLDivElement>(null);


  const ref = useRef(null);
  const [totalProjects, setTotalProjects] = useState(0);

  // const handleTotalProjects = (total: number) => {
  //   setTotalProjects(total);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const reff = collection(firestore, "projects");
      const querySnapshot = await getDocs(reff);
      const total = querySnapshot.docs.length;
      setTotalProjects(total);
    };
    fetchData();
  }, [totalProjects]);

  const socialMedia = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/irsyadagungh/",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/irsyadagungh/",
      icon: LinkedIn,
    },
    {
      name: "Github",
      link: "https://github.com/irsyadagungh",
      icon: Github,
    },
  ];

  return (
    <>
      {/** SOCIAL MEDIA ICONS */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 20 }}
        viewport={{ once: true }}
        className={`hidden md:block text-white fixed z-20 md:top-1/2 lg:bottom-0 lg:top-auto md:left-4 lg:left-12`}
      >
        <ul
          className={`lg:after:bg-white lg:after:w-[1px] lg:after:opacity-50 lg:after:h-44 lg:after:inline-block flex flex-col justify-center items-center`}
        >
          {socialMedia.map((social, index) => (
            <li key={index} className={`mb-6`}>
              <a href={social.link} target="_blank" rel="noreferrer">
                <social.icon
                  className={`w-6 h-6 text-current fill-secondary-100 hover:-translate-y-1 hover:opacity-100 opacity-50 hover:fill-primary duration-300`}
                />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      {/** CONTACT INFO */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.5 }}
        transition={{ type: "spring", stiffness: 20 }}
        className={`hidden lg:block text-secondary-100 fixed z-20 bottom-0 -right-6 opacity-50`}
      >
        <ul
          className={`lg:after:bg-white lg:after:w-[1px] lg:after:opacity-80 lg:after:h-32 lg:after:inline-block flex flex-col justify-center items-center`}
        >
          <li className={`rotate-90 mb-24 text-xs`}>irsyadagung08@gmail.com</li>
        </ul>
      </motion.div>

      {/** SECTION 1 (HERO) */}
      <Hero totalProjects={totalProjects} />

      {/** SECTION 2 (ABOUT) */}
      <About />

      {/** SECTION 3 (SKILLS) */}
      <Skills
      ref={ref}
      containerRef={containerRef}
      reactRef={reactRef}
      nextRef={nextRef}
      flutterRef={flutterRef}
      tailwindRef={tailwindRef}
      firebaseRef={firebaseRef}
      reduxRef={reduxRef}
      skillRef={skillRef}
      />

      {/** SECTION 4 (PROJECTS) */}
      <Projects />
    </>
  );
}
