
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, UserRole, Transaction } from '../types';
import { TRANSACTIONS } from '../constants';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import DashboardCard from '../components/DashboardCard';
import { ExternalLinkIcon, BillingIcon } from '../components/icons/IconComponents';

interface BillingProps {
  user: User;
  users: { [key: string]: User };
}

const StripeForm: React.FC<{onClose: () => void}> = ({ onClose }) => (
    <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input type="text" placeholder="**** **** **** 4242" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input type="text" placeholder="MM / YY" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">CVC</label>
                    <input type="text" placeholder="123" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                </div>
            </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">Cancel</button>
             <button type="submit" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none">Save Payment Method</button>
        </div>
    </form>
);


const ParentBilling: React.FC<{ user: User }> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userTransactions = TRANSACTIONS.filter(t => t.parentId === user.id);

  const columns = [
    { header: 'Date', accessor: (row: Transaction) => row.date },
    { header: 'Description', accessor: (row: Transaction) => row.description },
    { header: 'Amount', accessor: (row: Transaction) => `$${row.amount.toFixed(2)}` },
    {
      header: 'Status',
      accessor: (row: Transaction) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === 'Paid' ? 'bg-green-100 text-green-800' :
            row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <DashboardCard title="Saved Payment Method" icon={<BillingIcon />}>
              <p className="text-gray-600">Visa ending in 4242</p>
              <p className="text-gray-500 text-sm">Expires 12/2026</p>
              <button onClick={() => setIsModalOpen(true)} className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none">
                  Update Method
              </button>
          </DashboardCard>
          <div className="lg:col-span-2">
            <DashboardCard title="Outstanding Balance" icon={<BillingIcon />}>
                <p className="text-5xl font-bold text-neutral-dark">$75.00</p>
                <p className="text-gray-500">Due by 2024-08-15</p>
                <button className="mt-4 w-full lg:w-auto px-4 py-2 text-sm font-medium text-white bg-brand-secondary border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none">
                    Pay Now
                </button>
            </DashboardCard>
          </div>
      </div>
      <DataTable title="Payment History" columns={columns} data={userTransactions} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Update Payment Method">
        <p className="text-gray-600 mb-4">Your payment information is securely handled by Stripe.</p>
        <StripeForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
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