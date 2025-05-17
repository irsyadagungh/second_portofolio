interface WorkExperienceModel {
    id: String | null;
    company: String | null;
    location: String | null;
    role: String | null;
    startDate: String | null;
    endDate: String | null;
    responsibilities: String[];
    link: String | null;
}