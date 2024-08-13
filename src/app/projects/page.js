'use client';

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion, LayoutGroup } from "framer-motion";
import Image from "next/image";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsCollection = collection(db, 'projects');
            const projectsSnapshot = await getDocs(projectsCollection);
            const projectsList = projectsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsList);
        };
        fetchProjects();
    }, []);

    const selectedProjectData = projects.find(project => project.id === selectedProject);

    return (
      <section className="bg-gray-950 w-screen h-screen p-24 grid grid-cols-4 gap-6">
        
      </section>
    );
}
