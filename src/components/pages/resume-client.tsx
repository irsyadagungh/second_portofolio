"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SparklesText from "../magicui/sparkles-text";
import Head from "next/head";

import WorkExperiences from "../section/workExperiences";
import ProjectExperiences from "../section/projectExperiences";
import { ProjectExperienceModel } from "../../utils/project-experience";

export default function ResumeClient() {
    const [activeSection, setActiveSection] = useState("education");
    const [isMobile, setIsMobile] = useState(false);
    const lineRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const line = lineRef.current;
        const buttonHeight = 40; // Tinggi setiap tombol

        let newTop = 0;
        switch (activeSection) {
            case "education":
                newTop = 0;
                break;
            case "work":
                newTop = buttonHeight;
                break;
            case "projects":
                newTop = buttonHeight * 2;
                break;
            default:
                newTop = 0;
                break;
        }

        if (line) {
            line.style.transform = `translateY(${newTop}px)`;
        }
    }, [activeSection]);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Check on mount
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const line = lineRef.current;
        const buttonHeight = 40; // Tinggi setiap tombol

        let newTop = 0;
        switch (activeSection) {
            case "education":
                newTop = 0;
                break;
            case "work":
                newTop = buttonHeight;
                break;
            case "projects":
                newTop = buttonHeight * 2;
                break;
            default:
                newTop = 0;
                break;
        }

        if (line) {
            line.style.transform = `translateY(${newTop}px)`;
        }
    }, [activeSection]);

    return (
        <section className={`relative w-full flex flex-col justify-center min-h-screen h-fit bg-darkPrimary`}>
            <Head>
                <title>Resume</title>
            </Head>
            <div className={`w-full h-24 py-24 flex justify-center items-center`}>
                <SparklesText text={`Resume`} className={`text-white`} />
            </div>
            <div
                className={`container w-full h-fit py-6 flex md:px-32 gap-6 md:gap-0 flex-wrap`}
            >
                <div className={`w-full md:w-1/5 h-full flex md:flex-col py-6 relative`}>
                    <div
                        ref={lineRef}
                        className={`hidden md:block absolute left-0 w-[2px] h-[40px] bg-primary transition-transform duration-300 ease-out z-10`}
                    />
                    <div
                        className={`hidden md:block absolute left-0 w-[2px] h-[120px] bg-primary bg-opacity-20 transition-transform duration-300 ease-out z-10`}
                    />
                    <button
                        onClick={() => setActiveSection("education")}
                        className={`${activeSection === "education"
                            ? "bg-primary bg-opacity-15 text-primary"
                            : "bg-transparent text-white"
                            } relative rounded-md md:rounded-none md:text-start px-4 py-2 w-full hover:text-primary z-20`}
                    >
                        <span className="relative z-30">Education</span>
                    </button>
                    <button
                        onClick={() => setActiveSection("work")}
                        className={`${activeSection === "work"
                            ? "bg-primary bg-opacity-15 text-primary"
                            : "bg-transparent text-white"
                            } relative rounded-md md:rounded-none md:text-start px-4 py-2 w-full hover:text-primary z-20`}
                    >
                        <span className="relative z-30">Work Experience</span>
                    </button>
                    <button
                        onClick={() => setActiveSection("projects")}
                        className={`${activeSection === "projects"
                            ? "bg-primary bg-opacity-15 text-primary"
                            : "bg-transparent text-white"
                            } relative rounded-md md:rounded-none md:text-start px-4 py-2 w-full hover:text-primary z-20`}
                    >
                        <span className="relative z-30">Project Experience</span>
                    </button>
                </div>
                <div
                    className={`relative overflow-hidden w-full md:w-4/5 h-96 inline-flex`}
                >
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{
                            x: activeSection === "education" ? 0 : isMobile ? -700 : -900,
                        }}
                        className={`absolute w-full text-secondary-100 md:p-6`}
                    >
                        <div
                            className={`relative before:content-[''] before:absolute before:left-1 before:top-0 before:bottom-0 before:w-[1.5px] before:bg-primary before:bg-opacity-40`}
                        >
                            <h1
                                className={`flex items-center text-xl gap-4 before:w-[10px] before:h-[10px] before:rounded-full before:bg-primary`}
                            >
                                Telkom University
                            </h1>
                            <div className={`pl-7`}>
                                <div className={`flex justify-between`}>
                                    <p className={`text-sm opacity-50 italic`}>
                                        Diploma Application Software Engineering, GPA: 3.84
                                    </p>
                                    <p className={`text-sm opacity-50 italic`}>2022 - 2025</p>
                                </div>
                                <ul className={`text-sm mt-4 flex flex-col gap-2 opacity-70`}>
                                    <li className={`list-disc`}>
                                        Produced 2 website projects, T-Zens and Schedulify using
                                        laravel, Produced 3 mobile application project, T-Zens and
                                        MyEducation using Flutter and article application using
                                        jetpack compose
                                    </li>
                                    <li className={`list-disc`}>
                                        Participated in the Telkom University GDSC organization and
                                        learned about website development using ReactJs and Firebase
                                    </li>
                                    <li className={`list-disc`}>
                                        Participated in a study group at the Chevalier Lab in the
                                        UI/UX division
                                    </li>
                                    <li className={`list-disc`}>
                                        Became teaching assistant twice, Database Teaching assistant
                                        and Design Teaching Assistant
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: isMobile ? -100 : -900 }}
                        animate={{
                            x:
                                activeSection === "work"
                                    ? 0
                                    : activeSection === "projects"
                                        ? isMobile
                                            ? -600
                                            : -1000
                                        : isMobile
                                            ? 700
                                            : 1000,
                        }}
                        className={`absolute w-full h-full md:p-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent`}
                    >
                        <WorkExperiences onEditWork={function (project: ProjectExperienceModel): void {
                            throw new Error("Function not implemented.");
                        }} isEdit={function (isEdit: boolean): void {
                            throw new Error("Function not implemented.");
                        }} />
                    </motion.div>
                    <motion.div
                        initial={{ x: isMobile ? 1200 : -1600 }}
                        animate={{
                            x: activeSection === "projects" ? 0 : isMobile ? 1200 : 1600,
                        }}
                        className={`absolute text-white w-full h-full md:p-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent`}
                    >
                        <ProjectExperiences onEditProject={function (project: ProjectExperienceModel): void {
                            throw new Error("Function not implemented.");
                        }} isEdit={function (isEdit: boolean): void {
                            throw new Error("Function not implemented.");
                        }} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
