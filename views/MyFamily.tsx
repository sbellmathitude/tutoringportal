
import React, { useState } from 'react';
import { User, Student } from '../types';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import { UsersIcon } from '../components/icons/IconComponents';

interface MyFamilyProps {
  user: User;
  users: { [key: string]: User };
  students: Student[];
  onAddParent: (parentName: string, parentEmail: string) => void;
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
                <label className="block text-sm font-bold text-neutral-dark">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-medium/30 rounded-md shadow-sm placeholder-neutral-medium focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
             <div>
                <label className="block text-sm font-bold text-neutral-dark">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-medium/30 rounded-md shadow-sm placeholder-neutral-medium focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <p className="text-xs text-neutral-medium">This will simulate sending an invitation to the new parent to join your family's account.</p>
            <div className="pt-4 flex justify-end space-x-3">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-bold text-neutral-dark bg-white border border-neutral-medium/30 rounded-md shadow-sm hover:bg-background focus:outline-none">Cancel</button>
             <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/90 focus:outline-none">Add Parent</button>
            </div>
        </form>
    );
}

const MyFamily: React.FC<MyFamilyProps> = ({ user, users, students, onAddParent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const parentStudentIds = user.studentIds || [];
  const childsInFamily = students.filter(s => parentStudentIds.includes(s.id));
  
  const otherParentIds = students
    .filter(s => parentStudentIds.includes(s.id))
    .flatMap(s => s.parentIds)
    .filter(pid => pid !== user.id);
    
  const otherParents = [...new Set(otherParentIds)].map(pid => users[pid]).filter(Boolean);


  const handleAddParent = (name: string, email: string) => {
    onAddParent(name, email);
    setIsModalOpen(false);
  }

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-neutral-dark mb-6">My Family</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            <div className="space-y-6">
                <DashboardCard title="Your Profile" icon={<UsersIcon />}>
                    <div>
                        <p className="text-lg font-bold text-neutral-dark">{user.name}</p>
                        <p className="text-neutral-medium">{user.email}</p>
                    </div>
                </DashboardCard>
                
                <DashboardCard title="Linked Parents & Guardians" icon={<UsersIcon />}>
                    <div className="space-y-3">
                        {otherParents.length > 0 ? (
                            otherParents.map(parent => (
                                <div key={parent.id} className="p-2 bg-background rounded-md">
                                    <p className="font-bold text-neutral-dark">{parent.name}</p>
                                    <p className="text-sm text-neutral-medium">{parent.email}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-neutral-medium">No other parents are linked to this account.</p>
                        )}
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="mt-4 text-sm w-full px-4 py-2 font-bold text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/90 focus:outline-none">
                        + Add another Parent/Guardian
                    </button>
                </DashboardCard>
            </div>

            <DashboardCard title="Your Children" icon={<UsersIcon />}>
                <ul className="space-y-3">
                    {childsInFamily.map(child => (
                        <li key={child.id} className="p-3 bg-primary/5 rounded-md">
                            <p className="font-bold text-neutral-dark">{child.name}</p>
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