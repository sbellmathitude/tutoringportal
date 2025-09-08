import React from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const RoleCard: React.FC<{
  role: UserRole;
  onClick: () => void;
}> = ({ role, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-transform duration-300 h-48"
    >
      <h3 className="text-2xl font-bold text-neutral-dark">{role}</h3>
    </div>
  );
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-orange-100 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-neutral-dark">Welcome to the Mathitude Portal</h1>
        <p className="text-xl text-gray-600 mt-4">Please select your role to continue</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <RoleCard role={UserRole.Parent} onClick={() => onLogin(UserRole.Parent)} />
        <RoleCard role={UserRole.Student} onClick={() => onLogin(UserRole.Student)} />
      </div>
       <div className="mt-12 text-center">
        <button
          onClick={() => onLogin(UserRole.Tutor)}
          className="text-sm text-gray-600 hover:text-brand-primary hover:underline focus:outline-none"
        >
          Mathitude staff, log in here.
        </button>
      </div>
    </div>
  );
};

export default Login;