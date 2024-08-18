"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { motion, LayoutGroup } from "framer-motion";

import Image from "next/image";
import { MagicCard } from "@/components/magicui/magic-card";
import SparklesText from "@/components/magicui/sparkles-text";

import Github from "@/../public/icons/github.svg";
import Web from "@/../public/icons/web.svg";
import Mobile from "@/../public/icons/mobile.svg";
import OpenInNewWindow from "@/../public/icons/openInNewWindow.svg";

import { projectModel } from "@/utils/project-model";

export default function Projects() {
  const [projects, setProjects] = useState([projectModel]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(firestore, "projects");
      const projectsSnapshot = await getDocs(projectsCollection);
      const projectsList = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsList);
    };
    fetchProjects();
  }, []);

  const selectedProjectData = projects.find(
    (project) => project.id === selectedProject
  );

  const handleTypeProject = (type) => {
    switch (type) {
      case "Website":
        return <Web className={`fill-current w-5 h-5`} />;
      case "Mobile App":
        return <Mobile className={`fill-current w-5 h-5`} />;
      default:
    }
  };

  const handleLinkDeploy = (link) => {
    if(link != "" || link != null){
      return <OpenInNewWindow className={`fill-current w-5 h-5`} />;
    } else if(link == "" || link == null){
      return <></>;
    }
  };

  const handleMouseDown = (e) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
    setIsScrolling(false);
  };

  const handleMouseUp = (e, projectId) => {
    const deltaX = Math.abs(e.clientX - startPosition.x);
    const deltaY = Math.abs(e.clientY - startPosition.y);

    if (deltaX < 5 && deltaY < 5 && !isScrolling) {
      setSelectedProject(projectId);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-24 py-24 flex justify-center items-center bg-gray-950"
      >
        <SparklesText
          className="text-5xl font-bold text-white"
          text="Projects"
          colors={{
            first: "#0369a1",
            second: "#6C03A1",
          }}
        />
      </motion.div>
      <section
        className="bg-gray-950 w-screen h-fit px-12 py-6  grid grid-cols-1 gap-6
    md:grid-cols-2 md:px-16
    lg:grid-cols-4 lg:px-24"
      >
        <LayoutGroup>
          {projects.map((project) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={project.id}
              layoutId={project.id}
              className="relative w-full h-fit group"
              onMouseDown={handleMouseDown}
              onMouseUp={(e) => handleMouseUp(e, project.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <MagicCard
                className="flex h-fit flex-col p-4 bg-[#232323]"
                gradientColor="#3A3A3A"
              >
                <div className="flex flex-col justify-between gap-6">
                  <div className={`overflow-hidden rounded-lg`}>
                    <Image
                      src={project.img}
                      alt={project.title}
                      className="h-44 object-cover  group-hover:scale-105 duration-300"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="flex justify-between items-center h-fit">
                    <span className="text-primary  text-sm cursor-default">
                      {handleTypeProject(project.type)}
                    </span>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(project.githubLink, "_blank");
                      }}
                      className="text-primary cursor-pointer text-sm flex gap-4 items-center"
                    >
                      <Github className={`fill-current w-5 h-5`} />
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white text-xl font-bold">
                      {project.title}
                    </h2>
                    <p className="text-white font-light text-sm overflow-hidden max-h-10">
                      {project.description}
                    </p>
                  </div>
                  <div
                    className="flex gap-2 overflow-x-auto scrollbar-thin"
                    onScroll={() => setIsScrolling(true)}
                  >
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-primary border-[1px] border-primary py-1 px-2 rounded-md  text-xs cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}

          {selectedProject && (
            <motion.div
              layoutId={selectedProject}
              className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen overflow-hidden bg-black bg-opacity-50 backdrop-blur-lg z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <MagicCard
                className="md:w-2/3 md:h-fit md:max-h-3/4 lg:max-h-1/2 p-10 pb-16 md:p-3 bg-[#232323] overflow-y-scroll md:overflow-y-hidden"
                secondDivClassName={`w-full flex flex-col md:flex-row gap-4`}
                gradientColor="#3A3A3A"
              >
                <div
                  className={`w-full h-fit md:h-full md:w-1/2 flex flex-col gap-6`}
                >
                  <Image
                    src={selectedProjectData.img}
                    alt={selectedProjectData.title}
                    className="object-cover rounded-md w-full md:h-72"
                    width={500}
                    height={500}
                  />
                  <div className={`w-full flex justify-between`}>
                    <span className="text-primary text-sm cursor-default">
                      <span className={`flex gap-4 items-center`}>
                        {selectedProjectData.type}{" "}
                        {handleTypeProject(selectedProjectData.type)}
                      </span>
                    </span>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(selectedProjectData.githubLink, "_blank");
                      }}
                      className="text-primary cursor-pointer text-sm"
                    >
                      <Github className={`fill-current w-5 h-5`} />
                    </span>
                  </div>
                  <div className={`w-full flex justify-between items-center`}>
                    <h1 className="text-white text-2xl font-bold">
                      {selectedProjectData.title}
                    </h1>
                    <p className="text-primary text-sm">
                      {selectedProjectData.position}
                    </p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto scrollbar-thin">
                    {selectedProjectData.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-primary border-[1px] border-primary py-1 flex items-center px-2 rounded-md text-xs cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-6 w-full md:w-1/2">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-xl text-primary">Description</h1>
                    <p className="text-white font-light">
                      {selectedProjectData.description}
                    </p>
                  </div>
                  <div className={`flex flex-col gap-4`}>
                    <h1 className="text-xl text-primary">My Tasks</h1>
                    <ul className="text-white list-disc pl-6">
                      {selectedProjectData.tasks.map((task, idx) => (
                        <li key={idx} className="text-white font-light">
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`w-full p-6 flex justify-end`}>
                    <button
                      className={`text-white border border-red-400 rounded-md px-2 py-1 hover:bg-red-400 duration-300`}
                      onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          )}
        </LayoutGroup>
      </section>
    </>
  );
}
