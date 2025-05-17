import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import firestore from "../../app/firebase";


type Props = {
    onEditWork: (work: WorkExperienceModel) => void;
    isEdit: (isEdit: boolean) => void;
}

export default function WorkExperiences({ onEditWork, isEdit }: Props) {

    const pathname = usePathname();

    const [item, setItem] = useState<WorkExperienceModel[]>([]);



    useEffect(() => {
        try {

            const ref = collection(firestore, "workExperience");
            const q = query(ref, orderBy("startDate", "desc"));
            const fetchData = async () => {
                onSnapshot(q, (document) => {
                    // console.log("Document Data:", document.docs.map((doc) => doc.data()));
                    setItem(
                        document.docs.map((doc) => {
                            const data = doc.data() as WorkExperienceModel;
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

    const onEditworkEcperienceHandler = (work: WorkExperienceModel) => {
        console.log("Edit work experience with ID:", work);
        onEditWork(work);
        isEdit(true);
    }

    return (
        <div className={`flex flex-col  text-secondary-100 gap-6 relative before:content-[''] before:absolute before:left-1 before:top-0 before:bottom-0 before:w-[1.5px] before:bg-primary before:bg-opacity-40`}>
            {item.map((work, index) => (
                <div key={work.id?.toString() ?? index}>
                    <div className="flex justify-between items-center" key={index}>
                        <h1
                            className={`flex items-center text-xl gap-4 before:w-[10px] before:h-[10px] before:rounded-full before:bg-primary`}
                        >
                            <span className={`flex gap-1 items-center`}>
                                {work.role}
                                <span className={`text-primary relative`}>
                                    @
                                    <a
                                        href={work.link!.toString()}
                                        target={work.link ? "_blank" : ""}
                                        className={`relative before:absolute before:left-0 before:bottom-0 before:w-0 hover:before:w-full before:transition-all duration-800 before:h-[1px] before:bg-primary`}
                                    >
                                        {work.company}
                                    </a>
                                </span>
                            </span>
                        </h1>
                        {pathname === "/admin/dashboard" && (
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-primary hover:bg-darkPrimary duration-300" onClick={() => onEditworkEcperienceHandler(work)}>
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
                            <p>
                                {work.location}
                            </p>
                            <p className={`text-sm opacity-50 italic`}>
                                {work.startDate} - {work.endDate}
                            </p>
                        </div>
                        <ul
                            key={index}
                            className={`text-sm mt-4 flex flex-col gap-2 opacity-70`}
                        >
                            {work.responsibilities.map((resp) => (
                                <li
                                    key={resp.toString()}
                                    className={`list-disc`}>{resp}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}