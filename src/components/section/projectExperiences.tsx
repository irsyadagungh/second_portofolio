"use client";
import { usePathname } from "next/navigation";
import { TbEdit, TbTrash } from "react-icons/tb";
import { ProjectExperienceModel } from "../../utils/project-experience";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import firestore from "../../app/firebase";

type Props = {
    onEditProject: (project: ProjectExperienceModel) => void;
    isEdit: (isEdit: boolean) => void;
}

export default function ProjectExperiences({ onEditProject, isEdit }: Props) {

    const [item, setItem] = useState<ProjectExperienceModel[]>([]);

    useEffect(() => {
        try {

            const ref = collection(firestore, "projectExperience");
            const fetchData = async () => {
                onSnapshot(ref, (document) => {
                    // console.log("Document Data:", document.docs.map((doc) => doc.data()));
                    setItem(
                        document.docs.map((doc) => {
                            const data = doc.data() as ProjectExperienceModel;
                            return {
                                ...data, // Tidak perlu menambahkan 'id' lagi
                                id: doc.id, // Ini sudah cukup
                            };
                        })
                    );

                })
            }
            fetchData()
        } catch (error) {
            console.error("Error ", error);
        }
    })

    const onEditProjectEcperienceHandler = (project: ProjectExperienceModel) => {
        console.log("Edit project experience with ID:", project);
        onEditProject(project);
        isEdit(true);
    }

    const pathname = usePathname();

    const projectExperience = [
        {
            company: "T.Zens - Telkom University",
            location: "Bandung",
            role: "Flutter Developer",
            duration: "Feb 2024 - Jun 2024",
            responsibilities: [
                "Responsible for making pages, layouts, and widgets reusable using GetX pattern",
                "Created database No-SQL using Firebase Firestore",
                "Created feature authentication using Firebase Auth",
                "Responsible for making functionalities of features such as authentication, register events and organization, CRUD data of events and organization, history registered events, favorites event and organization each of account, registered account for each events or organization",
            ],
        },
        {
            company: "Google Developer Student Club (GDSC) - Telkom University",
            location: "Bandung",
            role: "Web Developer",
            duration: "Feb 2024 - Mar 2024",
            responsibilities: [
                "Created layout for article website using ReactJS",
                "Connected Firebase to the website for the database",
                "Created reusable component in ReactJS to improve and simplify developing by 40%-50%",
            ],
        },
        {
            company: "MyEducation - Hackfest",
            location: "Bandung",
            role: "Flutter Developer",
            duration: "Dec 2023 - Jan 2024",
            responsibilities: [
                "Responsible for making layouts, pages, and widget reusable using Flutter with GetX pattern",
                "Created authentication feature using Firebase Auth",
                "Created flowchart of the application",
                "Responsible for making database No-SQL using Firebase Firestore",
                "Created CRUD data for content of the application such as e-book, schools which need donation, page for payment gateway to give donation for school which needed",
            ],
        },
        {
            company: "Schedully - Telkom University",
            location: "Bandung",
            role: "Front-end Website Developer",
            duration: "Oct 2023 - Dec 2023",
            responsibilities: [
                "Created more than 15 layouts using HTML with TailwindCSS and Laravel",
                "Created layout template to improve and simplify developing website by 40%-60%",
                "Created more than 15 components HTML to make easier on developing",
            ],
        },
        {
            company: "T.Zens - Telkom University",
            location: "Bandung",
            role: "Full Stack Website Developer",
            duration: "Feb 2023 - Jun 2023",
            responsibilities: [
                "Implemented 15 layouts using basic HTML, CSS and Laravel framework",
                "Created database using MySQL to store data organization and webinars",
            ],
        },
        {
            company: "ORBIT - SMKN 4 Bandung",
            location: "Bandung",
            role: "Web Designer",
            duration: "Jul 2018 - Jun 2019",
            responsibilities: [
                "Designed the website development by executing front-end design and optimizing user experience",
                "Developed a dynamic portfolio website showcasing web development skills",
            ],
        },
    ];


    return (
        <div
            className={`flex flex-col  text-secondary-100 relative before:content-[''] before:absolute before:left-1 before:top-0 before:bottom-0 before:w-[1.5px] before:bg-primary before:bg-opacity-40`}
        >
            {item.map((item, index) => (
                <div key={typeof item.id === "string" || typeof item.id === "number" ? item.id : index}>
                    <div className="flex justify-between">
                        <h1 className={`flex items-center text-xl gap-4 before:w-[10px] before:h-[10px] before:rounded-full before:bg-primary`}>
                            {item.company}
                        </h1>
                        {pathname === "/admin/dashboard" && (
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-primary hover:bg-darkPrimary duration-300" onClick={() => onEditProjectEcperienceHandler(item)}>
                                    <TbEdit className="" />
                                </button>
                                <button className="p-2 rounded-lg bg-red-800 hover:bg-red-950 duration-300">
                                    <TbTrash className="" />
                                </button>

                            </div>
                        )}
                    </div>
                    <div className={`pl-7`}>
                        <div className={`flex justify-between`}>
                            <p className={`text-sm text-primary`}>
                                {item.role}
                            </p>
                            <p className={`text-sm opacity-50 italic`}>{item.startDate} - {item.endDate}</p>
                        </div>
                        <ul className={`text-sm my-4 flex flex-col gap-2 opacity-70`}>
                            {item.responsibilities.map((resp) => (
                                <li
                                    key={resp.toString()}
                                    className={`list-disc`}>{resp}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}