
import React, { useState } from 'react';
import { User, UserRole } from './types';
import { USERS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import Schedule from './views/Schedule';
import Students from './views/Students';
import Billing from './views/Billing';
import SessionNotes from './views/SessionNotes';
import FileUpload from './views/FileUpload';
import Login from './views/Login';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<string>('dashboard');

  const handleLogin = (role: UserRole) => {
    setCurrentUser(USERS[role]);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderView = () => {
    if (!currentUser) return null;

    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={currentUser} />;
      case 'schedule':
        return <Schedule />;
      case 'students':
        return <Students />;
      case 'billing':
        return <Billing user={currentUser} />;
      case 'session-notes':
        return <SessionNotes user={currentUser} />;
      case 'file-upload':
        return <FileUpload />;
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-neutral-light">
      <Sidebar userRole={currentUser.role} activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-light p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
