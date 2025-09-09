

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
    childNames: string[];
}

const RoleCard: React.FC<{
  role: UserRole;
  onClick: () => void;
}> = ({ role, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-neutral-medium/20 p-8 flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-transform duration-300 h-48"
    >
      <h3 className="text-2xl font-bold text-neutral-dark">{role}</h3>
    </div>
  );
};

const SignUpForm: React.FC<{
    onSubmit: (formData: SignUpFormData) => void;
    onClose: () => void;
}> = ({ onSubmit, onClose }) => {
    const [parentName, setParentName] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [childName, setChildName] = useState('');
    const [childNames, setChildNames] = useState<string[]>([]);

    const handleAddChild = () => {
        if (childName.trim()) {
            setChildNames([...childNames, childName.trim()]);
            setChildName('');
        }
    };

    const handleRemoveChild = (index: number) => {
        setChildNames(childNames.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (childNames.length === 0) {
            alert("Please add at least one child.");
            return;
        }
        onSubmit({ parentName, parentEmail, childNames });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-bold text-neutral-dark">Your Full Name</label>
                <input type="text" name="parentName" value={parentName} onChange={e => setParentName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-medium/30 rounded-md shadow-sm placeholder-neutral-medium focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
             <div>
                <label className="block text-sm font-bold text-neutral-dark">Your Email</label>
                <input type="email" name="parentEmail" value={parentEmail} onChange={e => setParentEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-medium/30 rounded-md shadow-sm placeholder-neutral-medium focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div>
                 <label className="block text-sm font-bold text-neutral-dark">Child's Full Name</label>
                 <div className="mt-1 flex rounded-md shadow-sm">
                    <input type="text" value={childName} onChange={e => setChildName(e.target.value)} className="flex-1 block w-full min-w-0 rounded-none rounded-l-md px-3 py-2 border-neutral-medium/30 focus:ring-primary focus:border-primary" />
                    <button type="button" onClick={handleAddChild} className="inline-flex items-center px-3 py-2 border border-l-0 border-neutral-medium/30 bg-background text-neutral-medium rounded-r-md hover:bg-neutral-medium/20">-&gt; Add</button>
                 </div>
            </div>
            {childNames.length > 0 && (
                <div className="border border-neutral-medium/20 rounded-md p-3 bg-background">
                    <h4 className="text-sm font-bold text-neutral-dark mb-2">Children to enroll:</h4>
                    <ul className="space-y-2">
                        {childNames.map((name, index) => (
                            <li key={index} className="flex justify-between items-center text-sm bg-white p-2 rounded shadow-sm border border-neutral-medium/10">
                                <span>{name}</span>
                                <button type="button" onClick={() => handleRemoveChild(index)} className="text-red-500 hover:text-red-700 font-bold">X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="pt-4 flex justify-end space-x-3">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-bold text-neutral-dark bg-white border border-neutral-medium/30 rounded-md shadow-sm hover:bg-background focus:outline-none">Cancel</button>
             <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/90 focus:outline-none">Create Account</button>
            </div>
        </form>
    );
};


const Login: React.FC<LoginProps> = ({ onLogin, onSignUp }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display text-primary">Welcome to the Mathitude Portal</h1>
        <p className="text-xl text-neutral-medium mt-4">Please select your role to continue</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <RoleCard role={UserRole.Parent} onClick={() => onLogin(UserRole.Parent)} />
        <RoleCard role={UserRole.Student} onClick={() => onLogin(UserRole.Student)} />
      </div>
       <div className="mt-12 text-center space-y-4">
        <p className="text-neutral-medium">
            Don't have an account?{' '}
            <button onClick={() => setIsSignUpOpen(true)} className="font-bold text-primary hover:underline focus:outline-none">
                Sign Up
            </button>
        </p>
        <button
          onClick={() => onLogin(UserRole.Tutor)}
          className="text-sm text-neutral-medium hover:text-primary hover:underline focus:outline-none"
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