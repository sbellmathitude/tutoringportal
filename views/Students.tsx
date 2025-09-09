

import React from 'react';
import DataTable from '../components/DataTable';
import type { Student, User } from '../types';
import { ExternalLinkIcon } from '../components/icons/IconComponents';

interface StudentsProps {
    students: Student[];
    users: { [key: string]: User };
}

const Students: React.FC<StudentsProps> = ({ students, users }) => {
  const getParentNames = (student: Student): string => {
    if (!student.parentIds || student.parentIds.length === 0) return 'N/A';
    return student.parentIds.map(pid => users[pid]?.name || 'Unknown').join(', ');
  };

  const columns = [
    {
      header: 'Name',
      accessor: (row: Student) => <span className="font-bold text-neutral-dark">{row.name}</span>,
    },
    {
      header: 'Parents',
      accessor: (row: Student) => getParentNames(row),
    },
    {
      header: 'Last Session',
      accessor: (row: Student) => row.lastSession,
    },
    {
      header: 'CRM Link',
      accessor: (row: Student) => (
        <a 
          href={row.googleSheetUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline font-bold"
        >
          View Record
          <ExternalLinkIcon />
        </a>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-neutral-dark mb-6">Student Management (CRM)</h2>
      <DataTable title="All Students" columns={columns} data={students} />
    </div>
  );
};

export default Students;