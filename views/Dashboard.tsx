
import React from 'react';
import { User, UserRole, SessionNote, Transaction, ScheduleEvent } from '../types';
import { SESSION_NOTES, TRANSACTIONS, SCHEDULE_EVENTS, STUDENTS } from '../constants';
import DashboardCard from '../components/DashboardCard';
import { CalendarIcon, BillingIcon, NotesIcon, UsersIcon } from '../components/icons/IconComponents';

interface DashboardProps {
  user: User;
}

const TutorDashboard: React.FC = () => {
    const nextSession = SCHEDULE_EVENTS.sort((a,b) => a.day.localeCompare(b.day))[0];
    const recentTransaction = TRANSACTIONS.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Upcoming Session" icon={<CalendarIcon />}>
                <p className="text-gray-600"><strong>Student:</strong> {nextSession.studentName}</p>
                <p className="text-gray-600"><strong>Time:</strong> {nextSession.day}, {nextSession.time}</p>
                <button className="mt-4 text-sm text-brand-primary font-semibold hover:underline">View Full Schedule</button>
            </DashboardCard>
            <DashboardCard title="Total Students" icon={<UsersIcon />}>
                <p className="text-5xl font-bold text-neutral-dark">{STUDENTS.length}</p>
                <p className="text-gray-500">Actively enrolled</p>
            </DashboardCard>
            <DashboardCard title="Recent Transaction" icon={<BillingIcon />}>
                 <p className="text-gray-600"><strong>Amount:</strong> ${recentTransaction.amount.toFixed(2)}</p>
                <p className="text-gray-600"><strong>Status:</strong> <span className="font-semibold text-green-600">{recentTransaction.status}</span></p>
                 <button className="mt-4 text-sm text-brand-primary font-semibold hover:underline">View All Transactions</button>
            </DashboardCard>
        </div>
    );
};

const ParentDashboard: React.FC<{ user: User }> = ({ user }) => {
    const childNotes = SESSION_NOTES.filter(note => note.studentId === user.childId);
    const recentNote = childNotes[0];
    const childTransactions = TRANSACTIONS.filter(t => t.parentId === user.id);
    const lastPayment = childTransactions.find(t => t.status === 'Paid');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Most Recent Session Note" icon={<NotesIcon />}>
                {recentNote ? (
                    <>
                        <p className="text-gray-600"><strong>Date:</strong> {recentNote.date}</p>
                        <p className="text-gray-600 mt-2 line-clamp-2"><strong>Notes:</strong> {recentNote.notes}</p>
                        <button className="mt-4 text-sm text-brand-primary font-semibold hover:underline">View All Notes</button>
                    </>
                ) : <p>No session notes available.</p>}
            </DashboardCard>
            <DashboardCard title="Last Payment" icon={<BillingIcon />}>
                {lastPayment ? (
                    <>
                        <p className="text-gray-600"><strong>Amount:</strong> ${lastPayment.amount.toFixed(2)}</p>
                        <p className="text-gray-600"><strong>Date:</strong> {lastPayment.date}</p>
                        <button className="mt-4 text-sm text-brand-primary font-semibold hover:underline">View Billing History</button>
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
                        <p className="text-gray-600"><strong>Date:</strong> {recentNote.date}</p>
                        <p className="text-gray-600 mt-2 line-clamp-2"><strong>Notes:</strong> {recentNote.notes}</p>
                        <button className="mt-4 text-sm text-brand-primary font-semibold hover:underline">View All Notes</button>
                    </>
                ) : <p>No session notes available.</p>}
            </DashboardCard>
            <DashboardCard title="Your Next Session" icon={<CalendarIcon />}>
                {nextSession ? (
                    <>
                       <p className="text-gray-600"><strong>Subject:</strong> {nextSession.subject}</p>
                       <p className="text-gray-600"><strong>Time:</strong> {nextSession.day}, {nextSession.time}</p>
                    </>
                ) : <p>No upcoming sessions scheduled.</p>}
            </DashboardCard>
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const renderDashboard = () => {
    switch (user.role) {
      case UserRole.Tutor:
        return <TutorDashboard />;
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
