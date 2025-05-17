import { Metadata } from "next";
import ProjectsClient from "../../components/pages/projects-client";

export const metadata: Metadata = {
  title: "Portofolio - Projects",
  description: "Irsyad Agung Hidayatullah - Projects",
  keywords: "Irsyad Agungh, Projects, Web Developer, Software Engineer",
  authors: [{ name: "Irsyad Agungh", url: "https://irsyadagungh.com" }],
};

export default function Projects() {

  return (
    <ProjectsClient />
  )
}