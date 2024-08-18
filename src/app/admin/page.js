"use client";
import { useEffect, useState } from "react";
import { storage, firestore } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function Admin() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkDeploy, setLinkDeploy] = useState("");
  const [position, setPosition] = useState("");
  const [tasks, setTasks] = useState([""]);
  const [tech, setTech] = useState([""]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log("API KEY", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  }, []);

  const handleTechChange = (index, event) => {
    const newTech = [...tech];
    newTech[index] = event.target.value;
    setTech(newTech);
  };

  const handleAddTech = (event) => {
    event.preventDefault();
    setTech([...tech, ""]);
  };

  const handleDeleteTech = (index) => {
    const newTech = tech.filter((_, idx) => idx !== index);
    setTech(newTech);
  };

  const handleTaskChange = (index, event) => {
    const newTasks = [...tasks];
    newTasks[index] = event.target.value;
    setTasks(newTasks);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    setTasks([...tasks, ""]);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImg(url);
          console.log("Image uploaded and available at:", url);
        });
      });
    } else {
      console.log("No image selected");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const projectData = {
      type,
      title,
      description,
      img,
      githubLink,
      linkDeploy,
      position,
      tasks,
      tech,
    };
    console.log("Project Data:", projectData);

    try {
      const docRef = await addDoc(
        collection(firestore, "projects"),
        projectData
      );
      console.log("Document ID:", docRef.id);
    } catch (error) {
      console.log("Error adding document:", error);
    }
  };

  return (
    <section className="container pt-16 flex flex-col items-center h-full min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Add Project</h1>
      <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-800 p-8 rounded-lg shadow-lg">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-sm font-semibold">
              Project Type
            </label>
            <select
              id="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500"
            >
              <option value="" disabled>
                Select Project Type
              </option>
              <option value="Website">Website</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Desktop App">Desktop App</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-semibold">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Project Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-semibold">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Project Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500 h-24"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="position" className="text-sm font-semibold">
              Position
            </label>
            <input
              id="position"
              type="text"
              placeholder="Your Position"
              onChange={(e) => setPosition(e.target.value)}
              value={position}
              className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tasks" className="text-sm font-semibold">
              Tasks
            </label>
            {tasks.map((taskItem, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`Task ${idx + 1}`}
                  onChange={(e) => handleTaskChange(idx, e)}
                  value={taskItem}
                  className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500 flex-1"
                />
                {idx !== 0 ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddTask}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tech" className="text-sm font-semibold">
              Technologies
            </label>
            {tech.map((techItem, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`Technology ${idx + 1}`}
                  onChange={(e) => handleTechChange(idx, e)}
                  value={techItem}
                  className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500 flex-1"
                />
                {idx !== 0 ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteTech(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="fileUpload" className="text-sm font-semibold">
              Project Image
            </label>
            <input
              id="fileUpload"
              type="file"
              onChange={handleImageChange}
              className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded"
            />
            <button
              type="button"
              onClick={handleUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md mt-4"
            >
              Upload Image
            </button>
            <input
              type="text"
              placeholder="Image URL"
              onChange={(e) => setImg(e.target.value)}
              value={img}
              className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="githubLink" className="text-sm font-semibold">
              GitHub Link
            </label>
            <input
              id="githubLink"
              type="text"
              placeholder="GitHub Repository URL"
              onChange={(e) => setGithubLink(e.target.value)}
              value={githubLink}
              className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="linkDeploy" className="text-sm font-semibold">
              Deployment Link
            </label>
            <input
              id="linkDeploy"
              type="text"
              placeholder="Deployment URL"
              onChange={(e) => setLinkDeploy(e.target.value)}
              value={linkDeploy}
              className="bg-gray-700 border-b-2 border-gray-500 text-white p-3 rounded focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md mt-6"
          >
            Add Project
          </button>
        </form>
      </div>
    </section>
  );
}
