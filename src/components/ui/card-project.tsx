import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { forwardRef, useRef } from "react";
import { usePathname } from "next/navigation";
import { ShineBorder } from "../magicui/shine-border";

type ProjectCardProps = {
  type: string;
  title: string;
  description: string;
  tech: string[];
  img: string;
  index: number;
};

// Menggunakan forwardRef untuk meneruskan ref ke komponen
const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ type, title, description, tech, img, index }, ref) => {

    const pathname = usePathname();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "0px" });

    return (
      <div
        ref={containerRef}
        className={`relative w-full p-6 flex flex-wrap items-center ${
          index % 2 === 0 ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 1 }}
          className="md:w-2/3 w-full relative p-2 h-64 overflow-hidden rounded-xl"
        >
            <ShineBorder shineColor={["#A07CFE", "#FF0095FF"]} />
          
            <Image
              src={img}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl p-1"
              priority
            />
        
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 1 }}
          className={`md:absolute top-0 ${
            index % 2 === 0 ? "right-0 items-end" : "left-0 items-start"
          } md:w-3/5 w-full h-full bg-opacity-90 p-6 rounded-md flex flex-col justify-center text-white`}
        >
          <div className={`flex flex-col ${index % 2 === 0 ? "items-end" : "items-start"}`}>
            <p className="text-sm text-blue-400 mb-2">{type}</p>
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-md mb-4 bg-slate-800 p-4 rounded-md shadow-lg">
              {description}
            </p>
            <div className="flex gap-2">
              {tech.map((techItem, idx) => (
                <span key={idx} className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {techItem}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
