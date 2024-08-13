"use client";
import { useEffect, useState } from "react";
import { storage, firestore } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function Admin() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState([""]);
  const [img, setImg] = useState("");
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
      tech,
      img,
    };
    console.log("Project Data:", projectData);
    // Tambahkan logika untuk menyimpan data project

    try{
        const docRef = await addDoc(collection(firestore, "projects"), projectData);
        console.log("Doc Id", docRef.id)
    } catch (error) {
        console.log("Error adding document:", error);
    }
  };

  return (
    <section className="container pt-16 flex flex-col w-full items-center h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">Add Project</h1>
      <div className="w-full md:w-1/2 bg-gray-800 p-8 rounded-lg shadow-lg">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
            placeholder="Type"
            type="text"
            onChange={(e) => setType(e.target.value)}
            value={type}
            className="bg-gray-700 border-b-2 border-gray-500 text-white p-2 rounded"
            />
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-gray-700 border-b-2 border-gray-500 text-white p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="bg-gray-700 border-b-2 border-gray-500 text-white p-2 rounded"
          />
          <div className="flex flex-col gap-4">
            {tech.map((techItem, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Technology"
                  onChange={(e) => handleTechChange(idx, e)}
                  value={techItem}
                  className="bg-gray-700 border-b-2 border-gray-500 text-white p-2 rounded flex-1"
                />
                {idx !== 0 ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteTech(idx)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
          <input
            type="file"
            onChange={handleImageChange}
            className="bg-gray-700 border-b-2 border-gray-500 text-white p-2 rounded"
          />
          <button
            type="button"
            onClick={handleUpload}
            className="bg-blue-500 text-white py-3 px-6 rounded-md mt-4 hover:bg-blue-600"
          >
            Upload Image
          </button>
          <input
            type="text"
            placeholder="Image URL"
            onChange={(e) => setImg(e.target.value)}
            value={img}
            className="bg-gray-700 border-b-2 border-gray-500 text-white p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-3 px-6 rounded-md mt-4 hover:bg-green-600"
          >
            Add Project
          </button>
        </form>
      </div>
    </section>
  );
}
