import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects, addProject } from '../redux/projectSlice';
import axios from 'axios';
const SERVER_URL="http://localhost:3001";

const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(`${SERVER_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setProjects(response.data));
    };

    fetchProjects();
  }, [dispatch]);

  const handleAddProject = async () => {
    const newProject = { title: 'New Project', description: 'Project description' };
    const response = await axios.post(`${SERVER_URL}/api/projects`, newProject, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(addProject(response.data));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleAddProject}>Add Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <a href={`${SERVER_URL}/api//projects/${project._id}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
