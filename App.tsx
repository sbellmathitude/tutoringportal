

import React, { useState } from 'react';
import { User, UserRole, Student } from './types';
import { INITIAL_USERS, INITIAL_STUDENTS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import Schedule from './views/Schedule';
import Students from './views/Students';
import Billing from './views/Billing';
import SessionNotes from './views/SessionNotes';
import FileUpload from './views/FileUpload';
import Login, { SignUpFormData } from './views/Login';

const App: React.FC = () => {
  const [users, setUsers] = useState<{ [key: string]: User }>(INITIAL_USERS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<string>('dashboard');

  const handleLogin = (role: UserRole) => {
    // In a real app, this would find the specific user. For this demo, we use the default role user.
    const userToLogin = Object.values(users).find(u => u.role === role);
    if (userToLogin) {
      setCurrentUser(userToLogin);
      setActiveView('dashboard');
    }
  };
  
  const handleSignUp = (formData: SignUpFormData) => {
    const now = Date.now();
    const newParentId = `user-${now}`;
    const newStudentIds = formData.childNames.map((_, i) => `student-${now}-${i}`);

    // Create new student objects, linked to the new parent
    const newStudents: Student[] = formData.childNames.map((name, i) => ({
        id: newStudentIds[i],
        name: name,
        parentIds: [newParentId],
        lastSession: new Date().toISOString().split('T')[0],
        googleSheetUrl: '#' // Placeholder
    }));

    // Create new parent user, linked to the new students
    const newParent: User = {
        id: newParentId,
        name: formData.parentName,
        email: formData.parentEmail,
        role: UserRole.Parent,
        avatarUrl: `https://i.pravatar.cc/100?u=${newParentId}`,
        studentIds: newStudentIds,
    };
    
    // Simulate updating the database
    setStudents(prev => [...prev, ...newStudents]);
    setUsers(prev => ({...prev, [newParentId]: newParent }));
    
    // Log the new user in
    setCurrentUser(newParent);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderView = () => {
    if (!currentUser) return null;

    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={currentUser} students={students} />;
      case 'schedule':
        return <Schedule />;
      case 'students':
        return <Students students={students} users={users} />;
      case 'billing':
        return <Billing user={currentUser} students={students} />;
      case 'session-notes':
        return <SessionNotes user={currentUser} students={students} />;
      case 'file-upload':
        return <FileUpload />;
      default:
        return <Dashboard user={currentUser} students={students} />;
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} onSignUp={handleSignUp} />;
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