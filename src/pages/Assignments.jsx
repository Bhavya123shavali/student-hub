import { useState } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [task, setTask] = useState("");

  const addAssignment = () => {
    if (task.trim()) {
      setAssignments([...assignments, task]);
      setTask("");
    }
  };

  const deleteAssignment = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Assignments</h2>
      <div className="mt-4 flex space-x-2">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add assignment..." 
          className="border p-2 w-full"
        />
        <button onClick={addAssignment} className="bg-blue-600 text-white p-2 rounded">Add</button>
      </div>
      <ul className="mt-4">
        {assignments.map((item, index) => (
          <li key={index} className="flex justify-between bg-gray-100 p-2 mt-2">
            {item}
            <button onClick={() => deleteAssignment(index)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;
