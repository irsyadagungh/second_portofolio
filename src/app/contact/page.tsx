import { Metadata } from "next";
import ContactClient from "../../components/pages/contact-client";

export const metadata: Metadata = {
    title: "Portofolio - Contact",
    description: "Irsyad Agung Hidayatullah - Contact",
    keywords: "Irsyad Agungh, Contact, Web Developer, Software Engineer",
    authors: [{ name: "Irsyad Agungh", url: "https://irsyadagungh.com" }],
};

export default function Contact() {
    return (
        <ContactClient />
    )
}