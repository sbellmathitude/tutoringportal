
import React, { useState } from 'react';
import type { User } from '../types';
import { LogoutIcon, ChevronDownIcon } from './icons/IconComponents';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-neutral-dark">
        Welcome, <span className="text-brand-primary">{user.name}</span>
      </h1>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
        >
          <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full" />
          <span className="hidden md:inline text-gray-700">{user.name}</span>
          <ChevronDownIcon />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <button
              onClick={onLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogoutIcon />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
