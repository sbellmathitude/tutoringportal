import React from 'react';
import { UserRole } from '../types';
import { HomeIcon, CalendarIcon, BillingIcon, UsersIcon, NotesIcon, UploadIcon } from './icons/IconComponents';

interface SidebarProps {
  userRole: UserRole;
  activeView: string;
  setActiveView: (view: string) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-md cursor-pointer transition-colors ${
      isActive
        ? 'bg-primary text-white'
        : 'text-neutral-dark hover:bg-primary/10 hover:text-primary'
    }`}
  >
    {icon}
    <span className="ml-3 font-bold">{label}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ userRole, activeView, setActiveView }) => {
  const getNavItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    ];
    
    switch (userRole) {
      case UserRole.Tutor:
        return [
          ...commonItems,
          { id: 'schedule', label: 'Schedule', icon: <CalendarIcon /> },
          { id: 'students', label: 'Students (CRM)', icon: <UsersIcon /> },
          { id: 'billing', label: 'Transactions', icon: <BillingIcon /> },
          { id: 'session-notes', label: 'Session Notes', icon: <NotesIcon /> },
        ];
      case UserRole.Parent:
        return [
          ...commonItems,
          { id: 'billing', label: 'Billing', icon: <BillingIcon /> },
          { id: 'session-notes', label: 'Session Notes', icon: <NotesIcon /> },
          { id: 'file-upload', label: 'Upload Files', icon: <UploadIcon /> },
        ];
      case UserRole.Student:
        return [
          ...commonItems,
          { id: 'session-notes', label: 'Session Notes', icon: <NotesIcon /> },
          { id: 'file-upload', label: 'Upload Files', icon: <UploadIcon /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white shadow-lg h-screen flex flex-col p-4 border-r border-neutral-medium/20">
      <div className="text-3xl font-display text-primary p-3 mb-6">
        Mathitude
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeView === item.id}
              onClick={() => setActiveView(item.id)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;