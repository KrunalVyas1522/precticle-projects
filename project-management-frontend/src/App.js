import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';

const App = () => {
  return (
    <Provider store={store}>
      {/* <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/projects/:id" component={ProjectDetails} />
        </Switch>
      </Router> */}
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      {/* <Route path="/tasks/:id" element={<TaskDetails />} /> */}
    </Routes>

    </Provider>
  );
};

export default App;
