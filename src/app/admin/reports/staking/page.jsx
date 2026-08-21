'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { ChevronDown } from 'lucide-react';

const mockStakingLogsList = [
  {
    id: '1',
    user: 'baba Name',
    username: '@username',
    plan: 'Silver',
    amount: '1,000.00 USDT',
    interest: '15.00 %',
    totalReturn: '1,150.00 USDT',
    startDate: '31 March, 2026',
    startRelative: '4 months ago',
    matureDate: '30 April, 2026',
    status: 'Mature',
  },
  {
    id: '2',
    user: 'Test test',
    username: '@testingmailinator',
    plan: 'Silver',
    amount: '500.00 USDT',
    interest: '30.00 %',
    totalReturn: '650.00 USDT',
    startDate: '29 January, 2026',
    startRelative: '6 months ago',
    matureDate: '28 February, 2026',
    status: 'Mature',
  },
  {
    id: '3',
    user: 'JADIEL DE SOUZA',
    username: '@master',
    plan: 'Silver',
    amount: '500.00 USDT',
    interest: '15.00 %',
    totalReturn: '575.00 USDT',
    startDate: '15 December, 2025',
    startRelative: '8 months ago',
    matureDate: '14 January, 2026',
    status: 'Mature',
  },
  {
    id: '4',
    user: 'baba Name',
    username: '@username',
    plan: 'Silver',
    amount: '1,000.00 USDT',
    interest: '30.00 %',
    totalReturn: '1,300.00 USDT',
    startDate: '19 October, 2025',
    startRelative: '10 months ago',
    matureDate: '18 November, 2025',
    status: 'Mature',
  },
  {
    id: '5',
    user: 'JADIEL DE SOUZA',
    username: '@master',
    plan: 'Silver',
    amount: '100.00 USDT',
    interest: '15.00 %',
    totalReturn: '115.00 USDT',
    startDate: '25 July, 2025',
    startRelative: '1 year ago',
    matureDate: '24 August, 2025',
    status: 'Mature',
  },
  {
    id: '6',
    user: 'baba Name',
    username: '@username',
    plan: 'Golden',
    amount: '2,000.00 USDT',
    interest: '20.00 %',
    totalReturn: '2,400.00 USDT',
    startDate: '28 June, 2025',
    startRelative: '1 year ago',
    matureDate: '26 September, 2025',
    status: 'Mature',
  },
];

export default function AdminStakingHistoryPage() {
  const [username, setUsername] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Any');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Real-time Instant Filtering (NO Blue Filter Button)
  const filteredLogs = mockStakingLogsList.filter((log) => {
    if (username.trim()) {
      const q = username.toLowerCase();
      if (!log.user.toLowerCase().includes(q) && !log.username.toLowerCase().includes(q)) {
        return false;
      }
    }

    if (selectedPlan !== 'Any' && log.plan !== selectedPlan) return false;
    if (selectedStatus !== 'All' && log.status !== selectedStatus) return false;

    return true;
  });

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Staking Logs
        </h1>

        {/* Filter Controls (Instant Real-time Filtering, NO Blue Button) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Username Input */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Search..."
                className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              />
            </div>

            {/* Plan Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Plan
              </label>
              <div className="relative">
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3.5 pr-8 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-sans"
                >
                  <option value="Any">Any</option>
                  <option value="Silver">Silver</option>
                  <option value="Golden">Golden</option>
                  <option value="Platinum">Platinum</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Status
              </label>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3.5 pr-8 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-sans"
                >
                  <option value="All">All</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                  <option value="Mature">Mature</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Date
              </label>
              <input
                type="text"
                placeholder="Start date – End date"
                className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Staking Logs Table Container (Matching Exact Reference Screenshot 1) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Vibrant Indigo Table Header */}
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Plan</th>
                  <th className="py-3.5 px-6">Interest</th>
                  <th className="py-3.5 px-6">Total Return</th>
                  <th className="py-3.5 px-6">Start Date</th>
                  <th className="py-3.5 px-6">Mature Date</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-sans">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                      No staking records found
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* User Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">{log.user}</div>
                        <span className="text-[#5b5bf5] font-semibold text-[11px]">
                          {log.username}
                        </span>
                      </td>

                      {/* Plan Column */}
                      <td className="py-4 px-6 font-bold text-slate-800">{log.plan}</td>

                      {/* Interest Column */}
                      <td className="py-4 px-6">
                        <div className="font-mono text-slate-800">{log.amount}</div>
                        <div className="font-bold text-emerald-600 text-[11px]">{log.interest}</div>
                      </td>

                      {/* Total Return Column */}
                      <td className="py-4 px-6 font-bold text-slate-900 font-righteous">
                        {log.totalReturn}
                      </td>

                      {/* Start Date Column */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{log.startDate}</div>
                        <div className="text-[11px] text-slate-400">{log.startRelative}</div>
                      </td>

                      {/* Mature Date Column */}
                      <td className="py-4 px-6 font-medium text-slate-800">
                        {log.matureDate}
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-3.5 py-1 rounded-full text-[11px] font-bold border inline-block ${
                            log.status === 'Mature'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-300'
                              : log.status === 'Running'
                              ? 'bg-amber-50 text-amber-500 border-amber-300'
                              : 'bg-indigo-50 text-indigo-600 border-indigo-300'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Universal Pagination Utility Footer */}
          <Pagination
            currentPage={1}
            totalPages={3}
            totalResults={42}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
