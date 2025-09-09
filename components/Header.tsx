
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
    <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-neutral-medium/20">
      <h1 className="text-2xl font-bold text-neutral-dark">
        Welcome, <span className="text-primary">{user.name}</span>
      </h1>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-background"
        >
          <span className="font-bold text-neutral-dark">{user.name}</span>
          <ChevronDownIcon />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-neutral-medium/20">
            <button
              onClick={onLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-neutral-dark hover:bg-background"
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