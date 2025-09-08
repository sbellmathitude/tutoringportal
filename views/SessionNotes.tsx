
import React from 'react';
import { User, UserRole, SessionNote, Student } from '../types';
import { SESSION_NOTES } from '../constants';
import DataTable from '../components/DataTable';

interface SessionNotesProps {
  user: User;
  students: Student[];
}

const SessionNotes: React.FC<SessionNotesProps> = ({ user, students }) => {
  const getNotes = () => {
    switch (user.role) {
      case UserRole.Tutor:
        return SESSION_NOTES;
      case UserRole.Parent:
        return SESSION_NOTES.filter(note => note.studentId === user.childId);
      case UserRole.Student:
        return SESSION_NOTES.filter(note => note.studentId === user.studentId);
      default:
        return [];
    }
  };

  const notes = getNotes();
  const getStudentName = (studentId: string) => students.find(s => s.id === studentId)?.name || 'Unknown';

  const columns = [
    { header: 'Date', accessor: (row: SessionNote) => row.date },
    ...(user.role === UserRole.Tutor ? [{ header: 'Student', accessor: (row: SessionNote) => getStudentName(row.studentId) }] : []),
    { header: 'Subject', accessor: (row: SessionNote) => row.subject },
    { header: 'Topics Covered', accessor: (row: SessionNote) => row.topicsCovered.join(', ') },
    { header: 'Notes', accessor: (row: SessionNote) => <p className="whitespace-normal">{row.notes}</p> },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-neutral-dark mb-6">Session Notes</h2>
      <DataTable title="All Session Notes" columns={columns} data={notes} />
    </div>
  );
};

export default SessionNotes;