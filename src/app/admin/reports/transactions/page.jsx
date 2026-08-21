'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { ChevronDown } from 'lucide-react';

const mockTransactionLogsList = [
  {
    id: '1',
    user: 'baba Name',
    username: '@username',
    trx: '3A72IJMTKJDT',
    date: '2026-08-08 05:05 PM',
    relativeTime: '1 week ago',
    amount: '+ 1,000.00 USDT',
    amountType: 'positive',
    postBalance: '6,407.56 USDT',
    details: '1,000.00 USDT added for wallet deposit',
    type: 'Plus',
    remark: 'Deposit',
  },
  {
    id: '2',
    user: 'baba Name',
    username: '@username',
    trx: '3A72IJMTKJDT',
    date: '2026-08-08 05:05 PM',
    relativeTime: '1 week ago',
    amount: '- 15.00 USDT',
    amountType: 'negative',
    postBalance: '6,392.56 USDT',
    details: '15.00 USDT fee deducted for transaction',
    type: 'Minus',
    remark: 'Balance subtract',
  },
  {
    id: '3',
    user: 'Test test',
    username: '@testingmailinator',
    trx: 'VHGTF2VU8Z4V',
    date: '2026-07-09 02:29 PM',
    relativeTime: '1 month ago',
    amount: '+ 40.00 USDT',
    amountType: 'positive',
    postBalance: '540.10 USDT',
    details: '40.00 USDT profit claimed from stake plan',
    type: 'Plus',
    remark: 'Profit Claim',
  },
  {
    id: '4',
    user: 'Test test',
    username: '@testingmailinator',
    trx: 'VHGTF2VU8Z4V',
    date: '2026-07-09 02:29 PM',
    relativeTime: '1 month ago',
    amount: '- 70.00 USDT',
    amountType: 'negative',
    postBalance: '470.10 USDT',
    details: '70.00 USDT staked into Silver plan',
    type: 'Minus',
    remark: 'Staking',
  },
  {
    id: '5',
    user: 'Rahul Chauhan',
    username: '@rahulchauhan',
    trx: 'NM7ZMPOCP6FO',
    date: '2026-06-12 01:46 AM',
    relativeTime: '2 months ago',
    amount: '- 10.00 USDT',
    amountType: 'negative',
    postBalance: '17,092.00 USDT',
    details: '10.00 USDT deducted for withdrawal request',
    type: 'Minus',
    remark: 'Withdrawal',
  },
  {
    id: '6',
    user: 'Rahul Chauhan',
    username: '@rahulchauhan',
    trx: 'NM7ZMPOCP6FO',
    date: '2026-06-12 01:46 AM',
    relativeTime: '2 months ago',
    amount: '+ 100.00 USDT',
    amountType: 'positive',
    postBalance: '17,192.00 USDT',
    details: '100.00 USDT added by admin balance credit',
    type: 'Plus',
    remark: 'Balance add',
  },
  {
    id: '7',
    user: 'baba Name',
    username: '@username',
    trx: 'OUARG4QLYK8U',
    date: '2026-05-07 01:41 PM',
    relativeTime: '3 months ago',
    amount: '- 1.00 USDT',
    amountType: 'negative',
    postBalance: '5,407.56 USDT',
    details: '1.00 USDT deducted for admin charge',
    type: 'Minus',
    remark: 'Balance subtract',
  },
  {
    id: '8',
    user: 'Test test',
    username: '@testingmailinator',
    trx: '72RUS43CISSH',
    date: '2026-01-16 06:56 AM',
    relativeTime: '7 months ago',
    amount: '+ 500.00 USDT',
    amountType: 'positive',
    postBalance: '500.10 USDT',
    details: '500.00 USDT added for stake maturity payout',
    type: 'Plus',
    remark: 'Profit Claim',
  },
  {
    id: '9',
    user: 'Test test',
    username: '@testingmailinator',
    trx: '1D3U5ZTRVJMX',
    date: '2026-01-16 06:56 AM',
    relativeTime: '7 months ago',
    amount: '- 99.00 USDT',
    amountType: 'negative',
    postBalance: '0.10 USDT',
    details: '99.00 USDT deducted for plan subscription',
    type: 'Minus',
    remark: 'Staking',
  },
];

export default function AdminTransactionLogsPage({ userId = null }) {
  const [trxUsername, setTrxUsername] = useState('');
  const [type, setType] = useState('All');
  const [remark, setRemark] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');

  // Real-time Instant Filtering on every change (No Blue Filter Button needed!)
  const filteredTransactions = mockTransactionLogsList.filter((trx) => {
    // Filter by TRX / Username
    if (trxUsername.trim()) {
      const q = trxUsername.toLowerCase();
      if (!trx.user.toLowerCase().includes(q) && !trx.username.toLowerCase().includes(q) && !trx.trx.toLowerCase().includes(q)) {
        return false;
      }
    }

    // Filter by Type
    if (type === 'Plus' && trx.type !== 'Plus') return false;
    if (type === 'Minus' && trx.type !== 'Minus') return false;

    // Filter by Remark
    if (remark !== 'All' && trx.remark !== remark) return false;

    return true;
  });

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Transaction Logs
        </h1>

        {/* Filter Bar Controls (NO Blue Filter Button, NO Currency Filter, Instant Real-Time Filtering!) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* TRX / Username Search Input */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                TRX/Username
              </label>
              <input
                type="text"
                value={trxUsername}
                onChange={(e) => setTrxUsername(e.target.value)}
                placeholder="Search..."
                className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              />
            </div>

            {/* Type Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Type
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3.5 pr-8 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-sans"
                >
                  <option value="All">All</option>
                  <option value="Plus">Plus (+)</option>
                  <option value="Minus">Minus (-)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Remark Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Remark
              </label>
              <div className="relative">
                <select
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3.5 pr-8 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-sans"
                >
                  <option value="All">All</option>
                  <option value="Balance add">Balance add</option>
                  <option value="Balance subtract">Balance subtract</option>
                  <option value="Deposit">Deposit</option>
                  <option value="Withdrawal">Withdrawal</option>
                  <option value="Staking">Staking</option>
                  <option value="Profit Claim">Profit Claim</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date Range Dropdown Filter (Matching Screenshot 4) */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Date
              </label>
              <div className="relative">
                <select
                  value={selectedDateFilter}
                  onChange={(e) => setSelectedDateFilter(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3.5 pr-8 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-sans"
                >
                  <option value="All">Start Date - End Date</option>
                  <option value="Today">Today</option>
                  <option value="Yesterday">Yesterday</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 15 Days">Last 15 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="Last 6 Months">Last 6 Months</option>
                  <option value="This Year">This Year</option>
                  <option value="Custom Range">Custom Range</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Vibrant Purple Table Header */}
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">TRX</th>
                  <th className="py-3.5 px-6">Transacted</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Post Balance</th>
                  <th className="py-3.5 px-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-sans">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                      Data not found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* User Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">{trx.user}</div>
                        <span className="text-[#5b5bf5] font-semibold text-[11px]">
                          {trx.username}
                        </span>
                      </td>

                      {/* TRX Column */}
                      <td className="py-4 px-6 font-mono font-bold text-slate-700">
                        {trx.trx}
                      </td>

                      {/* Transacted Column */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{trx.date}</div>
                        <div className="text-[11px] text-slate-400">{trx.relativeTime}</div>
                      </td>

                      {/* Amount Column (Strictly USDT, Green for +, Red for -) */}
                      <td className="py-4 px-6 font-bold font-righteous">
                        <span className={trx.amountType === 'positive' ? 'text-emerald-600' : 'text-red-500'}>
                          {trx.amount}
                        </span>
                      </td>

                      {/* Post Balance Column (USDT Only) */}
                      <td className="py-4 px-6 font-semibold text-slate-800 font-mono">
                        {trx.postBalance}
                      </td>

                      {/* Details Column */}
                      <td className="py-4 px-6 text-right text-slate-500 font-medium">
                        {trx.details}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Universal Pagination Utility Footer (Matching Screenshot 5) */}
          <Pagination
            currentPage={1}
            totalPages={62}
            totalResults={918}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
