
import React from 'react';
import DataTable from '../components/DataTable';
import type { Student } from '../types';
import { ExternalLinkIcon } from '../components/icons/IconComponents';

interface StudentsProps {
    students: Student[];
}

const Students: React.FC<StudentsProps> = ({ students }) => {
  const columns = [
    {
      header: 'Name',
      accessor: (row: Student) => <span className="font-medium text-neutral-dark">{row.name}</span>,
    },
    {
      header: 'Subject',
      accessor: (row: Student) => row.subject,
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
          className="text-brand-primary hover:underline font-semibold"
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