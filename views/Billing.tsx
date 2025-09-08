

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, UserRole, Transaction } from '../types';
import { TRANSACTIONS } from '../constants';
import DataTable from '../components/DataTable';
import DashboardCard from '../components/DashboardCard';
import { ExternalLinkIcon, BillingIcon } from '../components/icons/IconComponents';

interface BillingProps {
  user: User;
  users: { [key: string]: User };
}

const ParentBilling: React.FC<{ user: User }> = ({ user }) => {
  const userTransactions = TRANSACTIONS.filter(t => t.parentId === user.id);
  const paymentHistory = userTransactions.filter(t => t.status === 'Paid');
  const upcomingCharges = userTransactions.filter(t => t.status === 'Pending' || t.status === 'Overdue');

  const historyColumns = [
    { header: 'Date', accessor: (row: Transaction) => row.date },
    { header: 'Description', accessor: (row: Transaction) => row.description },
    { header: 'Amount', accessor: (row: Transaction) => `$${row.amount.toFixed(2)}` },
    {
      header: 'Status',
      accessor: (row: Transaction) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Manage Payment Method" icon={<BillingIcon />}>
            <p className="text-gray-600 mb-4">Securely save your credit card information with Stripe. Your payment method will be used for automatic billing of future charges.</p>
            <div id="stripe-form-embed" className="bg-neutral-light p-4 rounded-md border">
                {/* 
                    This is the designated area for your Stripe payment form embed.
                    You can inject your HTML form or use Stripe Elements here.
                */}
                <p className="text-sm text-gray-500 text-center">Stripe payment form will be embedded here.</p>
            </div>
        </DashboardCard>
        <DashboardCard title="Upcoming Charges" icon={<BillingIcon />}>
            {upcomingCharges.length > 0 ? (
                <ul className="space-y-3">
                    {upcomingCharges.map(charge => (
                        <li key={charge.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div>
                                <p className="font-semibold text-neutral-dark">{charge.description}</p>
                                <p className="text-sm text-gray-500">Due: {charge.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-neutral-dark">${charge.amount.toFixed(2)}</p>
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    charge.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {charge.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No upcoming charges.</p>
            )}
        </DashboardCard>
      </div>
      <DataTable title="Payment History" columns={historyColumns} data={paymentHistory} />
    </div>
  );
};

const TutorBilling: React.FC<{ users: { [key: string]: User } }> = ({ users }) => {
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
        { header: 'Payer', accessor: (row: Transaction) => users[row.parentId]?.name || 'Unknown User' },
        { header: 'Amount', accessor: (row: Transaction) => `$${row.amount.toFixed(2)}` },
        { header: 'Status', accessor: (row: Transaction) => row.status },
        {
          header: 'Stripe Link',
          accessor: (row: Transaction) => (
            <a href={row.stripeUrl} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline font-semibold">
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
                        <Bar dataKey="revenue" fill="#4F46E5" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardCard>
            <DataTable title="All Transactions" columns={columns} data={TRANSACTIONS} />
        </div>
    );
};


const Billing: React.FC<BillingProps> = ({ user, users }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-neutral-dark mb-6">Billing & Payments</h2>
      {user.role === UserRole.Tutor ? <TutorBilling users={users}/> : <ParentBilling user={user} />}
    </div>
  );
};

export default Billing;