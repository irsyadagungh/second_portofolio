import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { db } from "@/../../src/app/firebase";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  deleteDoc,
  limit,
  query,
} from "firebase/firestore";
import ProjectCard from "@/components/ui/card-project";
import ShimmerButton from "@/components/magicui/shimmer-button";

export function Projects({ onTotalProjectsChange }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  //total projects
  const [totalProjects, setTotalProjects] = useState(0);
  const [projects, setProjects] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      const reff = collection(db, "projects");
      const queries = query(reff, limit(3));
      const fetchData = async () => {
        onSnapshot(queries, (document) => {
          console.log(
            "Document Data:",
            document.docs.map((doc) => doc.data())
          );
          setProjects(
            document.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      };
      fetchData();
    } catch (error) {
      console.log("Error ", error);
      setIsError(true);
    }

    const handleTotalProject = async () => {
      const reff = collection(db, "projects");
      const querySnapshot = await getDocs(reff);
      const total = querySnapshot.size;
      setTotalProjects(total);

      if (onTotalProjectsChange) {
        onTotalProjectsChange(total); // Send the total to the parent
      }

      return totalProjects;
    };
    handleTotalProject();
  }, [onTotalProjectsChange]);

  return (
    <>
      {/** SECTION 4 (PROJECTS) */}
      <section
        className={`relative overflow-x-hidden w-full py-16 h-fit flex flex-wrap px-6 md:px-16 lg:px-44 text-secondary-100 bg-darkPrimary`}
      >
        <div className={`relative w-full h-fit`} ref={ref}>
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 20, delay: 0.5 }}
            className={`text-xl md:text-2xl font-bold text-secondary-100 flex items-center gap-4 after:w-2/3 after:h-[1px] after:bg-white after:inline-block`}
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 20, delay: 0.5 }}
            className={`text-secondary-100 mt-6`}
          >
            Here are some of the projects that I have worked on:
          </motion.p>

          <div className={`w-full flex flex-col justify-center`}>
            {isError ? (
              <>
                <h1>Error fetching projects</h1>
              </>
            ) : (
              projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  img={project.img}
                  type={project.type}
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  index={index}
                  ref={ref}
                  isInView={isInView}
                />
              ))
            )}
          </div>
        </div>
        {/** BUTTON MORE PROJECT */}
        <div className={`w-full flex justify-center`}>
          <ShimmerButton>
            <span>View More Projects</span>
          </ShimmerButton>
        </div>
      </section>
    </>
  );
}
