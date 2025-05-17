// LayoutAdmin.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "../../../components/ui/sidebar";
import ProjectsList from "../../../components/screen/project-list";
import WorkExperiences from "../../../components/section/workExperiences";
import ProjectExperiences from "../../../components/section/projectExperiences";
import { TbPlus } from "react-icons/tb";

import Modal from "../../../components/ui/modal-popup";
import AddProjectForm from "../../../components/form/add-project-form";
import AddProjectExperienceForm from "../../../components/form/add-project-experience-form";
import AddWorkExperienceForm from "../../../components/form/add-work-experience-form";

import { ProjectModel } from "../../../utils/project-model";
import { ProjectExperienceModel } from "../../../utils/project-experience";



export default function LayoutAdmin() {
  const [activeMenu, setActiveMenu] = useState("project");

  const [popUpProject, setPopUpProject] = useState(false);
  const [popUpWork, setPopUpWork] = useState(false);
  const [popUpProjectExp, setPopUpProjectExp] = useState(false);

  const [isEditProject, setIsEditProject] = useState(false);
  const [isEditProjectExperience, setIsEditProjectExperience] = useState(false);
  const [isEditWorkExperience, setIsEditWorkExperience] = useState(false);

  const [project, setProject] = useState<ProjectModel | null>(null);
  const [projectExperience, setProjectExperience] = useState<ProjectExperienceModel | null>(null);
  const [workExperience, setWorkExperience] = useState<WorkExperienceModel | null>(null);


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

  const handleEditProjectExperience = (projectExperience: ProjectExperienceModel) => {
    // Logic to handle editing a project experience
    console.log("Edit project experience with ID:", projectExperience);
    setProjectExperience(projectExperience);
    setPopUpProjectExp(true);
    setIsEditProjectExperience(true);
  }

  const handleEditWork = (workExperience: WorkExperienceModel) => {
    // Logic to handle editing a work experience
    console.log("Edit work experience with ID:", workExperience);
    setWorkExperience(workExperience);
    setPopUpWork(true);
    setIsEditWorkExperience(true);
  }

  return (
    <div className="flex relative flex-row h-screen bg-gradient-to-b from-black via-black to-darkPrimary">
      <Sidebar onSelectMenu={setActiveMenu} />

      <main className="w-10/12 h-full overflow-y-auto p-8 flex flex-col gap-4">
        {activeMenu === "project" && <ProjectsList onEditProject={handleEditProject} isEdit={handleEdit} />}
        {activeMenu === "work" && <WorkExperiences onEditWork={handleEditWork} isEdit={handleEdit} />}
        {activeMenu === "projectExp" && <ProjectExperiences onEditProject={handleEditProjectExperience} isEdit={handleEdit} />}
      </main>

      <button
        onClick={
          activeMenu === "project" || isEditProject
            ? () => setPopUpProject(true)
            : activeMenu === "work"
              ? () => setPopUpWork(true)
              : () => setPopUpProjectExp(true)
        }
        className="absolute bottom-10 right-10 text-darkPrimary text-3xl bg-primary rounded-xl p-2 shadow-lg hover:-translate-y-1 transition duration-300">
        <TbPlus />
      </button>

      {/* Pop Up Project */}
      {popUpProject && (
        <Modal isOpen={popUpProject} onClose={() => {
          if (isEditProject == true) {
            setProject(null);
            setIsEditProject(false);
          }
          setPopUpProject(false)
        }}>
          <AddProjectForm isEdit={isEditProject} project={project} onSuccess={() => setPopUpProject(false)} />
        </Modal>
      )}

      {/* Pop Up Work */}
      {popUpWork && (
        <Modal isOpen={popUpWork} onClose={() => {
          if (isEditWorkExperience == true) {
            setWorkExperience(null);
            setIsEditWorkExperience(false);
          }
          setPopUpWork(false)
        }}>
          <AddWorkExperienceForm isEdit={isEditWorkExperience} workExperience={workExperience} onSuccess={() => {
            setPopUpWork(false)
            setWorkExperience(null)
          }} />
        </Modal>
      )}

      {/* Pop Up Project Experience */}
      {popUpProjectExp && (
        <Modal isOpen={popUpProjectExp} onClose={() => {
          if (isEditProject == true) {
            setProjectExperience(null);
            setIsEditProjectExperience(false);
          }
          setPopUpProjectExp(false)
        }}>
          <AddProjectExperienceForm isEdit={isEditProjectExperience} projectExperience={projectExperience} onSuccess={() => {
            setPopUpProjectExp(false)
            setProjectExperience(null)
          }} />
        </Modal>
      )}

      {/* Pop Up Work Experience */}
    </div>
  );
}
