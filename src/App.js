import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import UserManagement from './containers/UserManagement/UserManagement';
import CategoryManagement from './containers/CategoryManagement/CategoryManagement';
import TagManagement from './containers/TagManagement/TagManagement';
import Settings from './containers/Settings/Settings';
import EmailTemplateManagement from './containers/EmailTemplateManagement/EmailTemplateManagement';
import SystemLogs from './containers/SystemLogs/SystemLogs';
import ViewingRecordManagement from './containers/ViewingRecordManagement/ViewingRecordManagement';
import ViewingRecordDetail from './containers/ViewingRecordDetail/ViewingRecordDetail';
import ViewingStats from './containers/ViewingStats/ViewingStats';
import Login from './containers/Login/Login';
import { useAuth } from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="tags" element={<TagManagement />} />
        <Route path="settings" element={<Settings />} />
        <Route path="email-templates" element={<EmailTemplateManagement />} />
        <Route path="system-logs" element={<SystemLogs />} />
        <Route path="viewing-records" element={<ViewingRecordManagement />} />
        <Route path="viewing-records/:id" element={<ViewingRecordDetail />} />
        <Route path="viewing-stats" element={<ViewingStats />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App; 