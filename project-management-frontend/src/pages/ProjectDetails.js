import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const SERVER_URL="http://localhost:3001"

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const projectResponse = await axios.get(`${SERVER_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProject(projectResponse.data);

      const tasksResponse = await axios.get(`${SERVER_URL}/api/projects/${id}/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasksResponse.data);
    };

    fetchProjectDetails();
  }, [id]);

  const handleAddTask = async () => {
    const newTask = { description: 'New Task', status: 'pending', priority: 'medium' };
    const response = await axios.post(`${SERVER_URL}/api/projects/${id}/tasks`, newTask, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setTasks([...tasks, response.data]);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <button onClick={handleAddTask}>Add Task</button>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.description} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
