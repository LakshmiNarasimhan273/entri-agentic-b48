import { useEffect, useState } from "react";

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/tasks";

//   GET
const getTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
    setLoading(false);
}

// POST
const addTask = async (task) => {
    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(task)
    });
    const newTask = await response.json();

    setTasks((previousTasks) => [
        ...previousTasks, newTask
    ]);
}

const updateTask = async (id, updatedTask) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedTask)
    });
    const newTask = await response.json();
    setTasks((previousTasks) => previousTasks.map((data) =>
        data.id === id ? newTask : data
    ));
};

// DELETE
const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    setTasks((previousTasks) => 
    previousTasks.filter(data => data.id !== id));
};

useEffect(() => {
    getTasks();
}, []);

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask
  };
}

export default useTasks;
