import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Arrow from "@/components/ui/arrow.svg";
import Circle from "@/components/ui/circle";
import SplitText from "@/components/ui/split-text";

import Reacts from "@/../public/icons/react.svg";
import Next from "@/../public/icons/next.svg";
import Flutter from "@/../public/icons/flutter.svg";
import Tailwind from "@/../public/icons/tailwind.svg";
import Firebase from "@/../public/icons/firebase.svg";
import Redux from "@/../public/icons/redux.svg";

export function Skills() {
  const containerRef = useRef(null);
  const reactRef = useRef(null);
  const nextRef = useRef(null);
  const flutterRef = useRef(null);
  const tailwindRef = useRef(null);
  const firebaseRef = useRef(null);
  const reduxRef = useRef(null);
  const skillRef = useRef(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    "React",
    "NextJs",
    "Flutter",
    "Tailwind",
    "Firebase",
    "Redux",
    "JavaScript",
    "Dart",
    "MySQL",
    "MongoDB",
    "Laravel",
  ];
  const oddSkills = skills.filter((_, index) => index % 2 !== 0);
  const evenSkills = skills.filter((_, index) => index % 2 === 0);

  useEffect(() => {
    console.log("IsInViewSkills:", isInView);
  }, [isInView])

  return (
    <>
      {/** SECTION 3 (SKILLS) */}
      <section
        className={`w-full flex flex-wrap-reverse h-fit py-16 px-6 md:px-16 lg:px-44 text-secondary-100 bg-darkPrimary`}
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 20, delay: 0.5 }}
          className="relative flex w-full md:w-1/2 items-center justify-center overflow-hidden p-6"
          ref={ref}
        >
          <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
            <div className="flex flex-row items-center justify-between">
              <Circle ref={reactRef}>
                <Reacts />
              </Circle>
              <Circle ref={flutterRef}>
                <Flutter />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={firebaseRef}>
                <Firebase />
              </Circle>
              <Circle ref={skillRef} className="size-16">
                <span className={`text-black`}>Skills</span>
              </Circle>
              <Circle ref={nextRef}>
                <Next />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={reduxRef}>
                <Redux />
              </Circle>
              <Circle ref={tailwindRef}>
                <Tailwind />
              </Circle>
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={reactRef}
            toRef={skillRef}
            curvature={-75}
            endYOffset={-10}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={nextRef}
            toRef={skillRef}
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={reduxRef}
            toRef={skillRef}
            curvature={75}
            endYOffset={10}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={flutterRef}
            toRef={skillRef}
            curvature={-75}
            endYOffset={-10}
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={firebaseRef}
            toRef={skillRef}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={tailwindRef}
            toRef={skillRef}
            curvature={75}
            endYOffset={10}
            reverse
          />
        </motion.div>

        <div className={`w-full md:w-1/2`} ref={ref}>
          {isInView ? (<motion.h1
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 20, delay: 0.5 }}
            className={`text-xl md:text-2xl font-bold text-secondary-100 flex items-center gap-4 before:w-2/3 before:h-[1px] before:bg-white before:inline-block`}
          >
            My Skills
          </motion.h1>) : (<></>)}
          <p ref={ref}>
            {isInView ? (
              <SplitText
                text={"Here's a list of technologies that I am proficient in:"}
                uniqueClassName="skills"
              />
            ) : (<></>)}
          </p>
          <div className={`flex gap-6 mt-6`}>
            <ul className={`mt-6`} ref={ref}>
              {evenSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  ref={ref}
                  initial={{ x: 50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{
                    stiffness: 20,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center hover:translate-x-1 hover:text-primary duration-300 cursor-default`}
                >
                  <Arrow /> {skill}
                </motion.li>
              ))}
            </ul>

            <ul className={`mt-6`} ref={ref}>
              {oddSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  ref={ref}
                  initial={{ x: 50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    stiffness: 20,
                    delay: index * 0.1,
                  }}
                  className={`flex items-center hover:translate-x-1 hover:text-primary duration-300 cursor-default`}
                >
                  <Arrow /> {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
