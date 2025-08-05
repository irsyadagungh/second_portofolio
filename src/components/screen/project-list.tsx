"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../../app/firebase";
import { motion, LayoutGroup } from "framer-motion";
import { usePathname } from "next/navigation";

import Image from "next/image";
import { MagicCard } from "../../components/magicui/magic-card";
import SparklesText from "../../components/magicui/sparkles-text";
import { TbEdit, TbTrash } from "react-icons/tb";

import Github from "../../../public/icons/github.svg";
import Web from "../../../public/icons/web.svg";
import Mobile from "../../../public/icons/mobile.svg";
import OpenInNewWindow from "../../../public/icons/openInNewWindow.svg";

import { ProjectModel } from "../../utils/project-model";
import Modal from "../ui/modal-popup";

type Props = {
  onEditProject: (project: ProjectModel) => void;
  isEdit: (isEdit: boolean) => void;
}

export default function Projects({onEditProject, isEdit}: Props) {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  function  onEditProjectHandler (project: ProjectModel)  {
    console.log("Edit project handle:", project);
    onEditProject(project);
  }

  function handleEdit(edit: boolean) {
    isEdit(edit);
    console.log("Edit project:", edit); 
  }

  function handleDelete(projectId: string) {
    // Logic to handle deleting a project
    console.log("Delete project with ID:", projectId);
    const projectRef = doc(firestore, "projects", projectId);
    deleteDoc(projectRef)
      .then(() => {
        console.log("Project deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting project: ", error);
      });
  }


  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(firestore, "projects");
      const projectsSnapshot = onSnapshot(projectsCollection, (snapshot) => {
        const projectsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "",
          description: doc.data().description || "",
          img: doc.data().img || "",
          githubLink: doc.data().githubLink || "",
          linkDeploy: doc.data().linkDeploy || "",
          type: doc.data().type || "",
          position: doc.data().position || "",
          tasks: doc.data().tasks || [],
          tech: doc.data().tech || []
        })) as ProjectModel[];

        setProjects(projectsList);
      });
      
      
    console.log("Pathname:", pathname);
    console.log("Projects:", projects);
    };

    fetchProjects();
  }, []);

  const selectedProjectData = projects.find(
    (project) => project.id === selectedProject
  );

  const handleTypeProject = (type: string) => {
    switch (type) {
      case "Website":
        return <Web className={`fill-current w-5 h-5`} />;
      case "Mobile App":
        return <Mobile className={`fill-current w-5 h-5`} />;
      default:
    }
  };

  const handleLinkDeploy = (link: string) => {
    if (link != "" || link != null) {
      return <OpenInNewWindow className={`fill-current w-5 h-5`} />;
    } else if (link == "" || link == null) {
      return <></>;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
    setIsScrolling(false);
  };

  const handleMouseUp = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    projectId: string
  ) => {
    const isIgnored = (event.target as HTMLElement).closest("[data-ignore-click]");
    if (isIgnored) return;
    const deltaX = Math.abs(event.clientX - startPosition.x);
    const deltaY = Math.abs(event.clientY - startPosition.y);

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
        className={`bg-gray-950 w-full h-auto px-12 py-6  grid grid-cols-1 gap-6
    md:grid-cols-2 md:px-16
    ${pathname == '/projects' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} lg:px-24`}
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
                      loading="lazy"
                      loader={() => project.img}
                    />
                  </div>
                  <div className="flex justify-between items-center h-fit">
                    <span className="text-primary  text-sm cursor-default">
                      {handleTypeProject(project.type)}
                    </span>
                    <span className="text-primary cursor-pointer text-sm flex gap-4 items-center">
                      <Github
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.githubLink, "_blank");
                        }}
                        className={`hover:text-darkPrimary duration-300 fill-current w-5 h-5`} />
                      {pathname == "/admin/dashboard" && (
                        <div className="flex gap-2">
                          <TbEdit data-ignore-click
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log("Edit project:", project);
                              onEditProjectHandler(project);
                            }}
                            className="hover:text-darkPrimary duration-300 w-5 h-5" />
                          <TbTrash
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleOpen();
                            }}
                            className="hover:text-darkPrimary duration-300 w-5 h-5" />
                        </div>
                      )}
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
                    src={selectedProjectData!.img}
                    alt={selectedProjectData!.title}
                    className="object-cover rounded-md w-full md:h-72"
                    width={500}
                    height={500}
                    loading="lazy"
                    loader={() => selectedProjectData!.img}
                  />
                  <div className={`w-full flex justify-between`}>
                    <span className="text-primary text-sm cursor-default">
                      <span className={`flex gap-4 items-center`}>
                        {selectedProjectData!.type}{" "}
                        {handleTypeProject(selectedProjectData!.type)}
                      </span>
                    </span>
                    <span

                      className="text-primary flex gap-2 cursor-pointer text-sm"
                    >
                      <Github
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(selectedProjectData!.githubLink, "_blank");
                        }} className={`hover:text-darkPrimary duration-300 fill-current w-5 h-5`} />
                      {pathname == "/admin/dashboard" && (
                        <div className="flex gap-2">
                          <TbEdit
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                              e.stopPropagation();
                              onEditProjectHandler(selectedProjectData!);
                              handleEdit(true);
                              console.log("Edit project:", selectedProjectData);
                            }}
                            className="hover:text-darkPrimary duration-300 w-5 h-5" />
                          <TbTrash
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="hover:text-red-950 text-red-800 duration-300 w-5 h-5" />
                        </div>
                      )}
                    </span>
                  </div>
                  <div className={`w-full flex justify-between items-center`}>
                    <h1 className="text-white text-2xl font-bold">
                      {selectedProjectData!.title}
                    </h1>
                    <p className="text-primary text-sm">
                      {selectedProjectData!.position}
                    </p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto scrollbar-thin">
                    {selectedProjectData!.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-primary border-[1px] border-primary py-1 flex items-center px-2 rounded-md text-xs cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                    
                  </div>
                  <div className={`w-full flex justify-start`}>
                    <button
                      className={`text-white border border-red-400 rounded-md px-2 py-1 hover:bg-red-400 duration-300`}
                      onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-6 w-full md:w-1/2 overflow-y-auto h-[500px]">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-xl text-primary">Description</h1>
                    <p className="text-white font-light">
                      {selectedProjectData!.description}
                    </p>
                  </div>
                  <div className={`flex flex-col gap-4`}>
                    <h1 className="text-xl text-primary">My Tasks</h1>
                    <ul className="text-white list-disc pl-6">
                      {selectedProjectData!.tasks.map((task, idx) => (
                        <li key={idx} className="text-white font-light">
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                </div>
              </MagicCard>
            </motion.div>
          )}
        </LayoutGroup>
        {/* MODAL DELETE */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-xl text-primary">Delete Project</h1>
            <p className="text-white font-light">
              Are you sure you want to delete this project?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                className={`text-white border border-red-400 rounded-md px-2 py-1 hover:bg-red-400 duration-300`}
                onClick={() => setSelectedProject(null)}
              >
                Cancel
              </button>
              <button
                className={`text-white border border-red-400 rounded-md px-2 py-1 hover:bg-red-400 duration-300`}
                onClick={() => handleDelete(selectedProject!)}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
}
