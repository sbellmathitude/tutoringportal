

import React, { useState } from 'react';
import { UserRole } from '../types';
import Modal from '../components/Modal';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onSignUp: (formData: SignUpFormData) => void;
}

export interface SignUpFormData {
    parentName: string;
    parentEmail: string;
    childName: string;
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

const SignUpForm: React.FC<{
    onSubmit: (formData: SignUpFormData) => void;
    onClose: () => void;
}> = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState<SignUpFormData>({
        parentName: '',
        parentEmail: '',
        childName: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Your Full Name</label>
                <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Your Email</label>
                <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Child's Full Name</label>
                <input type="text" name="childName" value={formData.childName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
            <div className="pt-4 flex justify-end space-x-3">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">Cancel</button>
             <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none">Create Account</button>
        </div>
        </form>
    );
};


const Login: React.FC<LoginProps> = ({ onLogin, onSignUp }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-orange-100 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-neutral-dark">Welcome to the Mathitude Portal</h1>
        <p className="text-xl text-gray-600 mt-4">Please select your role to continue</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <RoleCard role={UserRole.Parent} onClick={() => onLogin(UserRole.Parent)} />
        <RoleCard role={UserRole.Student} onClick={() => onLogin(UserRole.Student)} />
      </div>
       <div className="mt-12 text-center space-y-4">
        <p className="text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => setIsSignUpOpen(true)} className="font-semibold text-brand-primary hover:underline focus:outline-none">
                Sign Up
            </button>
        </p>
        <button
          onClick={() => onLogin(UserRole.Tutor)}
          className="text-sm text-gray-600 hover:text-brand-primary hover:underline focus:outline-none"
        >
          Mathitude staff, log in here.
        </button>
      </div>
    </div>
    <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} title="Create Parent Account">
        <SignUpForm 
            onClose={() => setIsSignUpOpen(false)}
            onSubmit={onSignUp}
        />
    </Modal>
    </>
  );
};

export default Login;