import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    setProjects: (state, action) => action.payload,
    addProject: (state, action) => [...state, action.payload],
    updateProject: (state, action) => 
      state.map(project => project._id === action.payload._id ? action.payload : project),
    deleteProject: (state, action) => 
      state.filter(project => project._id !== action.payload),
  },
});

export const { setProjects, addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
