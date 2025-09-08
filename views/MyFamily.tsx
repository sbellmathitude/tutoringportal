
import React, { useState } from 'react';
import { User, Student, Family } from '../types';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import { UsersIcon } from '../components/icons/IconComponents';

interface MyFamilyProps {
  user: User;
  users: { [key: string]: User };
  students: Student[];
  families: Family[];
  onAddParent: (familyId: string, parentName: string, parentEmail: string) => void;
}

const AddParentForm: React.FC<{
    onSubmit: (name: string, email: string) => void;
    onClose: () => void;
}> = ({ onSubmit, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, email);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
            <p className="text-xs text-gray-500">This will simulate sending an invitation to the new parent to join your family's account.</p>
            <div className="pt-4 flex justify-end space-x-3">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">Cancel</button>
             <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none">Add Parent</button>
            </div>
        </form>
    );
}

const MyFamily: React.FC<MyFamilyProps> = ({ user, users, students, families, onAddParent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userFamily = families.find(f => f.parentIds.includes(user.id));

  if (!userFamily) {
    return <div>Could not find family information.</div>;
  }
  
  const childsInFamily = students.filter(s => userFamily.childIds.includes(s.id));
  const parentsInFamily = userFamily.parentIds.map(pid => users[pid]).filter(Boolean);
  const otherParents = parentsInFamily.filter(p => p.id !== user.id);

  const handleAddParent = (name: string, email: string) => {
    onAddParent(userFamily.id, name, email);
    setIsModalOpen(false);
  }

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-neutral-dark mb-6">My Family</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            <div className="space-y-6">
                <DashboardCard title="Your Profile" icon={<UsersIcon />}>
                    <div className="flex items-center space-x-4">
                        <img src={user.avatarUrl} alt={user.name} className="h-16 w-16 rounded-full"/>
                        <div>
                            <p className="text-lg font-bold text-neutral-dark">{user.name}</p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                </DashboardCard>
                
                <DashboardCard title="Linked Parents & Guardians" icon={<UsersIcon />}>
                    <div className="space-y-3">
                        {otherParents.length > 0 ? (
                            otherParents.map(parent => (
                                <div key={parent.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md">
                                    <img src={parent.avatarUrl} alt={parent.name} className="h-10 w-10 rounded-full"/>
                                    <div>
                                        <p className="font-semibold text-neutral-dark">{parent.name}</p>
                                        <p className="text-sm text-gray-500">{parent.email}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No other parents are linked to this account.</p>
                        )}
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="mt-4 text-sm w-full px-4 py-2 font-medium text-white bg-brand-primary border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none">
                        + Add another Parent/Guardian
                    </button>
                </DashboardCard>
            </div>

            <DashboardCard title="Your Children" icon={<UsersIcon />}>
                <ul className="space-y-3">
                    {childsInFamily.map(child => (
                        <li key={child.id} className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-md">
                             <img src={`https://i.pravatar.cc/100?u=${child.id}`} alt={child.name} className="h-10 w-10 rounded-full"/>
                            <p className="font-semibold text-neutral-dark">{child.name}</p>
                        </li>
                    ))}
                </ul>
            </DashboardCard>
            
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Parent/Guardian">
          <AddParentForm onClose={() => setIsModalOpen(false)} onSubmit={handleAddParent}/>
      </Modal>
    </>
  );
};

export default MyFamily;
