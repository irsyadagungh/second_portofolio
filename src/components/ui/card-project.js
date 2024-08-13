import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function ProjectCard({ type, title, description, tech, img, index, ref, isInView }) {

  return (
        <div
          key={index}
          className={`relative w-full p-6 flex flex-wrap items-center ${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <motion.div
          ref={ref} 
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 1}}
          className="md:w-2/3 w-full relative h-64">
            <Image
              src={img}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </motion.div>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 1 }}
            className={`md:absolute top-0 ${
              index % 2 === 0 ? "right-0 items-end" : "left-0 items-start"
            } md:w-3/5 w-full h-full bg-opacity-90 p-6 rounded-md flex flex-col justify-center  text-white`}
          >
            <div className={`flex flex-col ${index % 2 === 0 ? "items-end" : "items-start"}`}>
              <p className="text-sm text-blue-400 mb-2">{type}</p>
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <p className="text-md mb-4 bg-slate-800 p-4 rounded-md shadow-lg">
                {description}
              </p>
              <div className="flex gap-2">
                {tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
    </div>
  );
}

export default ProjectCard;
