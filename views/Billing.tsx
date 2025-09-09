

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, UserRole, Transaction, Student } from '../types';
import { TRANSACTIONS } from '../constants';
import DataTable from '../components/DataTable';
import DashboardCard from '../components/DashboardCard';
import { ExternalLinkIcon, BillingIcon } from '../components/icons/IconComponents';

interface BillingProps {
  user: User;
  students: Student[];
}

const ParentBilling: React.FC<{ user: User, students: Student[] }> = ({ user, students }) => {
  const childIds = user.studentIds || [];
  const userTransactions = TRANSACTIONS.filter(t => childIds.includes(t.studentId));
  const getStudentName = (studentId: string) => students.find(s => s.id === studentId)?.name || 'Unknown';
  
  const paymentHistory = userTransactions.filter(t => t.status === 'Paid');
  const upcomingCharges = userTransactions.filter(t => t.status === 'Pending' || t.status === 'Overdue');

  const historyColumns = [
    { header: 'Date', accessor: (row: Transaction) => row.date },
    { header: 'Student', accessor: (row: Transaction) => getStudentName(row.studentId) },
    { header: 'Description', accessor: (row: Transaction) => row.description },
    { header: 'Amount', accessor: (row: Transaction) => `$${row.amount.toFixed(2)}` },
    {
      header: 'Status',
      accessor: (row: Transaction) => (
        <span className="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-primary/10 text-primary">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Manage Payment Method" icon={<BillingIcon />}>
            <p className="text-neutral-medium mb-4">Securely save your credit card information with Stripe. Your payment method will be used for automatic billing of future charges.</p>
            <div id="stripe-form-embed" className="bg-background p-4 rounded-md border border-neutral-medium/20">
                {/* 
                    This is the designated area for your Stripe payment form embed.
                    You can inject your HTML form or use Stripe Elements here.
                */}
                <p className="text-sm text-neutral-medium text-center">Stripe payment form will be embedded here.</p>
            </div>
        </DashboardCard>
        <DashboardCard title="Upcoming Charges" icon={<BillingIcon />}>
            {upcomingCharges.length > 0 ? (
                <ul className="space-y-3">
                    {upcomingCharges.map(charge => (
                        <li key={charge.id} className="flex justify-between items-center p-3 bg-background rounded-md">
                            <div>
                                <p className="font-bold text-neutral-dark">{charge.description}</p>
                                <p className="text-sm text-neutral-medium">For: {getStudentName(charge.studentId)}</p>
                                <p className="text-sm text-neutral-medium">Due: {charge.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-neutral-dark">${charge.amount.toFixed(2)}</p>
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                                    charge.status === 'Pending' ? 'bg-neutral-medium/20 text-neutral-dark' : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {charge.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-neutral-medium">No upcoming charges.</p>
            )}
        </DashboardCard>
      </div>
      <DataTable title="Payment History" columns={historyColumns} data={paymentHistory} />
    </div>
  );
};

const TutorBilling: React.FC<{ students: Student[] }> = ({ students }) => {
    const getStudentName = (studentId: string) => students.find(s => s.id === studentId)?.name || 'Unknown';
    const transactionData = TRANSACTIONS.reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString('default', { month: 'short' });
        if(t.status === 'Paid') {
            const entry = acc.find(item => item.month === month);
            if (entry) {
                entry.revenue += t.amount;
            } else {
                acc.push({ month, revenue: t.amount });
            }
        }
        return acc;
    }, [] as {month: string, revenue: number}[]).reverse();


    const columns = [
        { header: 'Date', accessor: (row: Transaction) => row.date },
        { header: 'Student', accessor: (row: Transaction) => getStudentName(row.studentId) },
        { header: 'Amount', accessor: (row: Transaction) => `$${row.amount.toFixed(2)}` },
        { header: 'Status', accessor: (row: Transaction) => row.status },
        {
          header: 'Stripe Link',
          accessor: (row: Transaction) => (
            <a href={row.stripeUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
              View on Stripe
              <ExternalLinkIcon />
            </a>
          ),
        },
    ];

    return (
        <div className="space-y-6">
            <DashboardCard title="Revenue Analysis" icon={<BillingIcon />}>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transactionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#7030A0" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardCard>
            <DataTable title="All Transactions" columns={columns} data={TRANSACTIONS} />
        </div>
    );
};


const Billing: React.FC<BillingProps> = ({ user, students }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-neutral-dark mb-6">Billing & Payments</h2>
      {user.role === UserRole.Tutor ? <TutorBilling students={students}/> : <ParentBilling user={user} students={students} />}
    </div>
  );
};

export default Billing;