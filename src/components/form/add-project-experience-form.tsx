import { useEffect, useState } from "react";
import { ProjectExperienceModel } from "../../utils/project-experience";
import { TbPlus, TbTrash } from "react-icons/tb";
import firestore from "../../app/firebase";
import { addDoc, collection, CollectionReference, doc, updateDoc } from "firebase/firestore";

export default function AddProjectExperienceForm({
    isEdit,
    projectExperience,
    onSuccess
}: {
    isEdit: boolean;
    projectExperience: ProjectExperienceModel | null;
    onSuccess: () => void
}) {

    const [company, setCompany] = useState(projectExperience?.company?.toString() || "")
    const [role, setRole] = useState(projectExperience?.role?.toString() || "")
    const [startDate, setStartDate] = useState(projectExperience?.startDate?.toString() || "")
    const [endDate, setEndDate] = useState(projectExperience?.endDate?.toString() || "")
    const [resp, setResp] = useState(projectExperience?.responsibilities || [""]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        console.log("Project ID to edit:", projectExperience?.id);
        if (isEdit == true && projectExperience !== null) {
            setCompany(projectExperience.company?.toString() || "")
            setRole(projectExperience.role?.toString() || "")
            setStartDate(projectExperience.startDate?.toString() || "")
            setEndDate(projectExperience.endDate?.toString() || "")
            setResp(projectExperience.responsibilities)

        } else {
            setCompany("")
            setRole("")
            setStartDate("")
            setEndDate("")
            setResp([""])
        }
    }, [isEdit, projectExperience]);

    const handleRespChange = (index: number, event: string) => {
        const newResp = [...resp];
        newResp[index] = event;
        setResp(newResp);
    };

    const handleAddResp = () => {
        setResp([...resp, ""]);
    };

    const handleDeleteResp = (index: number) => {
        const newResp = resp.filter((_, idx) => idx !== index);
        setResp(newResp);
    };

    //submit dengan firestore
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Submit form");
        try {

            const formattedStartDate = new Date(startDate + "-01").toLocaleString("default", { month: "long", year: "numeric" });
            const formattedEndDate = new Date(endDate + "-01").toLocaleString("default", { month: "long", year: "numeric" });

            const docRef = await addDoc(collection(firestore, "projectExperience"), {
                company,
                role,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                responsibilities: resp
            });
            console.log("Document written with ID: ", docRef.id);
            onSuccess()
            isEdit = false
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        console.log("Document added with ID: ", projectExperience?.id);
        setIsLoading(false);
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const item = {
            company,
            role,
            startDate,
            endDate,
            resp
        }

        try {
            if (!projectExperience?.id) {
                console.error("No project ID provided for update.");
                return;
            }

            const docRef = doc(collection(firestore, "projectExperience"), projectExperience.id.toString());

            await updateDoc(docRef, item);
            console.log("Document updated with ID: ", docRef.id);
            onSuccess()
            setIsLoading(false);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <div className={`items-center justify-center flex flex-col w-full h-full bg-gray-800 rounded-lg p-16`}>
            <form onSubmit={isEdit ? handleEdit : handleSubmit} className={`flex flex-col gap-4 w-full h-full justify-center items-center`}>
                <h1>Add Project Experience</h1>
                <input
                    type="text"
                    placeholder="Company Name"
                    className="p-2 w-full rounded-lg bg-gray-700 text-white"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Role"
                    className="p-2 w-full rounded-lg bg-gray-700 text-white"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <div className={`flex w-full gap-4 justify-between`}>
                    <div className={`w-full`}>
                        <p>Start Date</p>
                        <input
                            type="month"
                            placeholder="Duration (e.g. Jan 2020 - Dec 2021)"
                            className="p-2 w-full rounded-lg bg-gray-700 text-white"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className={`w-full`}>
                        <p>End Date</p>
                        <input
                            type="month"
                            placeholder="Duration (e.g. Jan 2020 - Dec 2021)"
                            className="p-2 w-full rounded-lg bg-gray-700 text-white"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="tech" className="text-sm font-semibold">
                        Responsibilities
                    </label>
                    {resp.map((respItem, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder={`Responsibilities ${idx + 1}`}
                                onChange={(e) => handleRespChange(idx, e.target.value)}
                                value={respItem.toString()}
                                className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500 flex-1"
                            />
                            {idx !== 0 ? (
                                <button
                                    type="button"
                                    onClick={() => handleDeleteResp(idx)}
                                    className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg"
                                >
                                    <TbTrash />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleAddResp}
                                    className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg"
                                >
                                    <TbPlus />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit">
                    {
                        isLoading == true
                            ? (<p>Loading...</p>)
                            : isEdit == true
                                ? "Edit"
                                : "Submit"}</button>
            </form>
        </div>
    )

}