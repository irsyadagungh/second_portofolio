
import { Metadata } from "next";
import ResumeClient from "../../components/pages/resume-client";

export const metadata: Metadata = {
  title: "Portofolio - Resume",
  description: "Irsyad Agung Hidayatullah - Resume",
  keywords: "Irsyad Agungh, Resume, Web Developer, Software Engineer",
  authors: [{ name: "Irsyad Agungh", url: "https://irsyadagungh.com" }],
};

export default function Resume() {
  return(
    <ResumeClient />
  )
}
