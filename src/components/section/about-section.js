import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion"; // Correct import from 'react-intersection-observer'
import Image from "next/image";
import SplitText from "../ui/split-text";
import Foto from "@/../public/images/foto.jpg";

export function About() {
  
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true });

  return (
    <>
      {/** SECTION 2 (ABOUT) */}
      <section
        className={`w-full flex flex-wrap overflow-hidden h-fit py-16 px-6 md:px-16 lg:px-44 bg-darkPrimary`}
      >
        <div className={`w-full md:w-1/2 py-4`}>
          <motion.h1
            ref={aboutRef}
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 20, delay: 0.5 }}
            className={`text-xl md:text-2xl font-bold text-secondary-100 flex items-center gap-4 after:w-2/3 after:h-[1px] after:bg-white after:inline-block`}
          >
            About Me
          </motion.h1>
          <p ref={aboutRef} className={` text-secondary-100 mt-6`}>
            {isInView ? (
              <SplitText
                text={
                  "I am a Front-End and Flutter Developer. I specialize in building responsive web and mobile applications that provide an excellent user experience. I have years of experience in developing web applications using modern technologies such as React and NextJs. I am also proficient in developing mobile applications using Flutter. I am passionate about creating beautiful and functional user interfaces that provide an excellent user experience. I am a quick learner and always eager to learn new technologies and improve my skills. I am a team player and always ready to collaborate with other developers to create amazing applications."
                }
                initialX={-50}
                initialOpacity={0}
                stagger={0.05}
                type="word"
                uniqueClassName="about"
                delay={1.5}
              />
            ) : (
              <></>
            )}
          </p>
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 20, delay: 1 }}
          className={`w-full md:w-1/2 flex items-center justify-center p-4`}
        >
          <div className={`relative m-auto group`}>
            <Image
              src={Foto}
              alt="Irsyad Agung Hidayatullah"
              className={`rounded-lg w-52 relative z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 duration-300`}
            />
            <span
              className={`absolute top-0 left-0 w-full h-full border-2 border-primary rounded-lg transform translate-x-6 translate-y-2 -z-1 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-110 duration-300`}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
