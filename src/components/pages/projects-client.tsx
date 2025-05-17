"use client";

import { useState } from "react";
import ProjectsList from "../../components/screen/project-list"
import { ProjectModel } from "../../utils/project-model";
import Head from "next/head";

export default function ProjectsClient() {

    const [isEditProject, setIsEditProject] = useState(false);
    const [project, setProject] = useState<ProjectModel | null>(null);
    const [popUpProject, setPopUpProject] = useState(false);

    const handleEditProject = (project: ProjectModel) => {
        // Logic to handle editing a project
        console.log("Edit project with ID:", project);
        setProject(project);
        setPopUpProject(true);
        setIsEditProject(true);
        console.log("isEdit", isEditProject);
    }

    const handleEdit = (isEdit: boolean) => {
        setIsEditProject(isEdit);
        console.log("isEdit", isEdit);
    }

    return (
        <>
            <Head>
                <title>Projects</title>
            </Head>
            <ProjectsList onEditProject={handleEditProject} isEdit={handleEdit} />
        </>
    )
}