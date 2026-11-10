import { useState, useEffect } from "react";
import { FaFileAlt, FaFileImage, FaFilePdf, FaTrash, FaEye } from "react-icons/fa";

const Notes = () => {
  const [files, setFiles] = useState([]);

  // Load files from localStorage on mount
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("savedNotes")) || [];
    setFiles(savedFiles);
  }, []);

  // Save files to localStorage whenever files change
  useEffect(() => {
    localStorage.setItem("savedNotes", JSON.stringify(files));
  }, [files]);

  // Convert file to Base64 and store
  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);

    const filePromises = uploadedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve({
            name: file.name,
            type: file.type,
            data: reader.result, // Store Base64 string
          });
        };
      });
    });

    const newFiles = await Promise.all(filePromises);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const deleteFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (file) => {
    if (file.name.endsWith(".pdf")) return <FaFilePdf className="text-red-500 text-xl" />;
    if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) return <FaFileImage className="text-blue-400 text-xl" />;
    return <FaFileAlt className="text-gray-500 text-xl" />;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
        📂 Study Notes Upload (Persistent)
      </h2>

      {/* File Upload Section */}
      <div className="bg-white/90 dark:bg-gray-800/90 p-4 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 backdrop-blur-md">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
        />
      </div>

      {/* Display Uploaded Files */}
      {files.length > 0 ? (
        <ul className="mt-6 space-y-4 w-full max-w-lg">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 transition-all hover:scale-105">
              <div className="flex items-center space-x-3">
                {getFileIcon(file)}
                <span className="text-gray-800 dark:text-gray-300 truncate">{file.name}</span>
              </div>
              <div className="space-x-3 flex">
                <a
                  href={file.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-3 py-1 rounded flex items-center space-x-1 transition-all hover:bg-green-600"
                >
                  <FaEye /> <span>View</span>
                </a>
                <button
                  onClick={() => deleteFile(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center space-x-1 transition-all hover:bg-red-600"
                >
                  <FaTrash /> <span>Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-gray-500 dark:text-gray-400">No study notes uploaded yet.</p>
      )}
    </div>
  );
};

export default Notes;
