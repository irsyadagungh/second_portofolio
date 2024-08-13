"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Effect to track window size and determine if it is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const transitionVariants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
    open: {
      clipPath: "circle(150% at 100% 0%)",
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <header
      className={`z-50 text-white w-full ${
        isOpen ? "bg-[#27272a]" : "backdrop-blur-xl"
      } fixed top-0`}
    >
      <nav className={`flex p-4 px-12 justify-between container items-center`}>
        <h1>Logo</h1>
        <motion.div
          initial={isMobile ? "closed" : ""}
          animate={isMobile && isOpen ? "open" : "closed"}
          variants={isMobile ? transitionVariants : {}}
          className={`absolute bg-[#27272a] backdrop-blur-md h-screen top-12 w-screen right-0 gap-6 flex flex-col py-16 items-start p-6 text-white
            md:h-fit md:relative md:flex md:w-fit md:bg-transparent md:top-0 md:flex-row md:justify-between md:p-0 ${
              isMobile ? "" : "clip-auto"
            }`}
        >
          {isMobile && (
            <h1
              className={`md:hidden text-3xl font-bold w-full after:w-full after:h-[1px] after:bg-white after:inline-block`}
            >
              Navigation
            </h1>
          )}

          <ul
            className={`text-2xl gap-10 w-full h-full flex flex-col
            md:flex-row md:text-base md:flex md:gap-6`}
          >
            <li>
              <Link href="/" onClick={() => {
                if (isMobile == true) {
                  setIsOpen(!isOpen)
                }
              }}>Home</Link>
            </li>
            <li>
              <Link href="/projects" onClick={() => {
                if (isMobile == true) {
                  setIsOpen(!isOpen)
                }
              }}>Projects</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </motion.div>

        {isMobile && (
          <div
            onClick={() => {
              if (isMobile == true) {
                setIsOpen(!isOpen)
              }
            }}
            className={`md:hidden flex flex-col justify-between w-[1.2rem] h-[1rem]`}
          >
            <span className={`w-full h-[1px] bg-white`} />
            <span className={`w-full h-[1px] bg-white`} />
            <span className={`w-full h-[1px] bg-white`} />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
