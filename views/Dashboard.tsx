

import React from 'react';
import { User, UserRole, Student } from '../types';
import { SESSION_NOTES, TRANSACTIONS, SCHEDULE_EVENTS } from '../constants';
import DashboardCard from '../components/DashboardCard';
import { CalendarIcon, BillingIcon, NotesIcon, UsersIcon } from '../components/icons/IconComponents';

interface DashboardProps {
  user: User;
  students: Student[];
}

const TutorDashboard: React.FC<{students: Student[]}> = ({ students }) => {
    const nextSession = SCHEDULE_EVENTS.sort((a,b) => a.day.localeCompare(b.day))[0];
    const recentTransaction = TRANSACTIONS.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Upcoming Session" icon={<CalendarIcon />}>
                <p className="text-neutral-medium"><strong>Student:</strong> {nextSession.studentName}</p>
                <p className="text-neutral-medium"><strong>Time:</strong> {nextSession.day}, {nextSession.time}</p>
                <button className="mt-4 text-sm text-primary font-bold hover:underline">View Full Schedule</button>
            </DashboardCard>
            <DashboardCard title="Total Students" icon={<UsersIcon />}>
                <p className="text-5xl font-bold text-neutral-dark">{students.length}</p>
                <p className="text-neutral-medium">Actively enrolled</p>
            </DashboardCard>
            <DashboardCard title="Recent Transaction" icon={<BillingIcon />}>
                 <p className="text-neutral-medium"><strong>Amount:</strong> ${recentTransaction.amount.toFixed(2)}</p>
                <p className="text-neutral-medium"><strong>Status:</strong> <span className="font-bold text-green-600">{recentTransaction.status}</span></p>
                 <button className="mt-4 text-sm text-primary font-bold hover:underline">View All Transactions</button>
            </DashboardCard>
        </div>
    );
};

const ParentDashboard: React.FC<{ user: User }> = ({ user }) => {
    const childIds = user.studentIds || [];
    const childNotes = SESSION_NOTES.filter(note => childIds.includes(note.studentId));
    const recentNote = childNotes[0];
    
    const studentTransactions = TRANSACTIONS.filter(t => childIds.includes(t.studentId));
    const lastPayment = studentTransactions.find(t => t.status === 'Paid');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Most Recent Session Note" icon={<NotesIcon />}>
                {recentNote ? (
                    <>
                        <p className="text-neutral-medium"><strong>Date:</strong> {recentNote.date}</p>
                        <p className="text-neutral-medium mt-2 line-clamp-2"><strong>Notes:</strong> {recentNote.notes}</p>
                        <button className="mt-4 text-sm text-primary font-bold hover:underline">View All Notes</button>
                    </>
                ) : <p>No session notes available for your children.</p>}
            </DashboardCard>
            <DashboardCard title="Last Payment" icon={<BillingIcon />}>
                {lastPayment ? (
                    <>
                        <p className="text-neutral-medium"><strong>Amount:</strong> ${lastPayment.amount.toFixed(2)}</p>
                        <p className="text-neutral-medium"><strong>Date:</strong> {lastPayment.date}</p>
                        <button className="mt-4 text-sm text-primary font-bold hover:underline">View Billing History</button>
                    </>
                ) : <p>No payment history.</p>}
            </DashboardCard>
        </div>
    );
};

const StudentDashboard: React.FC<{ user: User }> = ({ user }) => {
    const myNotes = SESSION_NOTES.filter(note => note.studentId === user.studentId);
    const recentNote = myNotes[0];
     const nextSession = SCHEDULE_EVENTS.find(e => e.studentName.includes(user.name.split(' ')[0]));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Most Recent Session Note" icon={<NotesIcon />}>
                {recentNote ? (
                    <>
                        <p className="text-neutral-medium"><strong>Date:</strong> {recentNote.date}</p>
                        <p className="text-neutral-medium mt-2 line-clamp-2"><strong>Notes:</strong> {recentNote.notes}</p>
                        <button className="mt-4 text-sm text-primary font-bold hover:underline">View All Notes</button>
                    </>
                ) : <p>No session notes available.</p>}
            </DashboardCard>
            <DashboardCard title="Your Next Session" icon={<CalendarIcon />}>
                {nextSession ? (
                    <>
                       {/* FIX: Removed reference to non-existent 'subject' property. */}
                       <p className="text-neutral-medium"><strong>Time:</strong> {nextSession.day}, {nextSession.time}</p>
                    </>
                ) : <p>No upcoming sessions scheduled.</p>}
            </DashboardCard>
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ user, students }) => {
  const renderDashboard = () => {
    switch (user.role) {
      case UserRole.Tutor:
        return <TutorDashboard students={students} />;
      case UserRole.Parent:
        return <ParentDashboard user={user} />;
      case UserRole.Student:
        return <StudentDashboard user={user} />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-neutral-dark mb-6">Dashboard</h2>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;