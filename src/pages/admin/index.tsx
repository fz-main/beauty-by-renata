import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const AdminPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('admin_logged_in') === 'true'
  );
  return loggedIn ? <AdminDashboard onLogout={() => { localStorage.removeItem('admin_logged_in'); setLoggedIn(false); }} /> : <AdminLogin onLogin={() => setLoggedIn(true)} />;
};
