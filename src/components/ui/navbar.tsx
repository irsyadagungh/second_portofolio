"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import Github from "../../../public/icons/github.svg"
import Instagram from "../../../public/icons/instagram.svg"
import LinkedIn from "../../../public/icons/linkedin.svg"
import Logo from "../../../public/images/logo.png"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isActivePath, setIsActivePath] = useState("");
  const router = usePathname();

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsActivePath(router);
  }, [router]);

  const getLinkClass = (path: string) => {
    return isActivePath === path
      ? "text-primary relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:transition-all after:duration-300"
      : "text-white relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full";
  };

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
    <div
      className={`z-50 text-white w-full font-inter ${
        isOpen ? "bg-[#27272a]" : "backdrop-blur-xl"
      } fixed top-0`}
    >
      <nav className={`flex p-4 px-12 justify-between container items-center`}>
       <Image src={Logo} alt="Logo" className={`w-24 rounded-full`} />
        <motion.div
          initial={isMobile ? "closed" : ""}
          animate={isMobile && isOpen ? "open" : "closed"}
          variants={isMobile ? transitionVariants : {}}
          className={`absolute bg-[#27272a] backdrop-blur-md h-screen top-16 w-screen right-0 gap-6 flex flex-col py-16 items-start p-6 text-white
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
              <Link
                className={getLinkClass("/")}
                href="/"
                onClick={() => {
                  if (isMobile == true) {
                    setIsOpen(!isOpen);
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={getLinkClass("/projects")}
                href="/projects"
                onClick={() => {
                  if (isMobile == true) {
                    setIsOpen(!isOpen);
                  }
                }}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                className={getLinkClass("/resume")}
                href="/resume"
                onClick={() => {
                  if (isMobile == true) {
                    setIsOpen(!isOpen);
                  }
                }}
              >
                Resume
              </Link>
            </li>
            <li>
              <Link
                className={getLinkClass("/contact")}
                href="/contact"
                onClick={() => {
                  if (isMobile == true) {
                    setIsOpen(!isOpen);
                  }
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
          {isMobile && (
            <div className={`w-full h-72`}>
              <hr className={`bg-white w-full`} />
              <div className={`flex p-4 gap-4`}>
                {socialMedia.map((social) => (
                  <a key={social.name} href={social.link} >
                    <social.icon
                      className={`w-6 h-6 text-current fill-secondary-100 hover:-translate-y-1 hover:fill-primary duration-300`}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {isMobile && (
          <div
            onClick={() => {
              if (isMobile == true) {
                setIsOpen(!isOpen);
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
    </div>
  );
}

export default Navbar;
