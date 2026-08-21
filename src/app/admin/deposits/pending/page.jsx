'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { Search, Monitor } from 'lucide-react';

const mockDepositsList = [
  {
    id: '1',
    gateway: 'Bank Transfer',
    trx: 'MSB2A9NMSU8E',
    date: '2026-07-06 08:37 AM',
    relativeTime: '1 month ago',
    userName: 'Simon Smith',
    userHandle: '@Uarmadale',
    userId: '1452',
    amount: '₮1,000.00',
    charge: '₮11.00',
    total: '₮1,011.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '1,011.00 USD',
    status: 'Pending',
  },
  {
    id: '2',
    gateway: 'Bank Transfer',
    trx: '3CAF550O62AS',
    date: '2026-05-16 03:17 AM',
    relativeTime: '3 months ago',
    userName: 'manan aamna',
    userHandle: '@hhhhdwdd',
    userId: '1451',
    amount: '₮111.00',
    charge: '₮2.11',
    total: '₮113.11',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '113.11 USD',
    status: 'Pending',
  },
  {
    id: '3',
    gateway: 'Bank Transfer',
    trx: 'BAEOKCIOXDN',
    date: '2026-01-03 03:43 AM',
    relativeTime: '7 months ago',
    userName: 'jhon doe',
    userHandle: '@bofoder',
    userId: '1450',
    amount: '₮100.00',
    charge: '₮2.00',
    total: '₮102.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '102.00 USD',
    status: 'Pending',
  },
  {
    id: '4',
    gateway: 'Bank Transfer',
    trx: 'M3AJ24OIY5WS',
    date: '2025-12-14 03:50 PM',
    relativeTime: '8 months ago',
    userName: 'waheed aslam',
    userHandle: '@waheed820',
    userId: '1449',
    amount: '₮100.00',
    charge: '₮2.00',
    total: '₮102.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '102.00 USD',
    status: 'Pending',
  },
  {
    id: '5',
    gateway: 'Bank Transfer',
    trx: 'FCHBVDM3H7LM',
    date: '2025-10-24 03:56 PM',
    relativeTime: '9 months ago',
    userName: 'Rhea Cunanan',
    userHandle: '@Ecaguiloa',
    userId: '1448',
    amount: '₮200.00',
    charge: '₮3.00',
    total: '₮203.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '203.00 USD',
    status: 'Pending',
  },
  {
    id: '6',
    gateway: 'Bank Transfer',
    trx: 'UANYSJ8GLWS6',
    date: '2025-10-19 05:18 PM',
    relativeTime: '10 months ago',
    userName: 'azeert azerty',
    userHandle: '@Azerty',
    userId: '1447',
    amount: '₮500.00',
    charge: '₮6.00',
    total: '₮506.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '506.00 USD',
    status: 'Pending',
  },
  {
    id: '7',
    gateway: 'Bank Transfer',
    trx: '9T8ZTQNWVHJF',
    date: '2025-10-12 07:35 AM',
    relativeTime: '10 months ago',
    userName: 'azeert azerty',
    userHandle: '@Azerty',
    userId: '1447',
    amount: '₮500.00',
    charge: '₮6.00',
    total: '₮506.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '506.00 USD',
    status: 'Pending',
  },
  {
    id: '8',
    gateway: 'Bank Transfer',
    trx: '5LCY4SHDFKH2',
    date: '2025-07-21 05:31 AM',
    relativeTime: '1 year ago',
    userName: 'Dansou Landry',
    userHandle: '@fecaguia',
    userId: '1446',
    amount: '₮800.00',
    charge: '₮9.00',
    total: '₮809.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '809.00 USD',
    status: 'Pending',
  },
  {
    id: '9',
    gateway: 'Bank Transfer',
    trx: '3ADLCE8YASD4',
    date: '2025-06-12 07:27 PM',
    relativeTime: '1 year ago',
    userName: 'baba Name',
    userHandle: '@username',
    userId: '1445',
    amount: '₮200.00',
    charge: '₮3.00',
    total: '₮203.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '203.00 USD',
    status: 'Pending',
  },
];

export default function AdminDepositsFilteredPage({
  title = 'Pending Deposits',
  statusFilter = 'Pending',
}) {
  const [searchUser, setSearchUser] = useState('');
  const [dateRange, setDateRange] = useState('');

  const filteredDeposits = mockDepositsList.filter((d) => {
    if (statusFilter !== 'All' && d.status !== statusFilter) return false;
    if (searchUser.trim()) {
      const q = searchUser.toLowerCase();
      return (
        d.userName.toLowerCase().includes(q) ||
        d.userHandle.toLowerCase().includes(q) ||
        d.trx.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            {title}
          </h1>

          {/* Top Search Controls (2 Search Input Groups - Matching Screenshot) */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Box 1: Username / Email */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Username / Email"
                className="w-44 h-10 bg-transparent border-0 outline-none px-3.5 text-xs text-slate-800 font-sans"
              />
              <button className="h-10 bg-[#5b5bf5] hover:bg-indigo-600 text-white px-3 flex items-center justify-center shrink-0 cursor-pointer">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Search Box 2: Start Date - End Date */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="Start Date – End Date"
                className="w-44 h-10 bg-transparent border-0 outline-none px-3.5 text-[11px] text-slate-800 font-sans"
              />
              <button className="h-10 bg-[#5b5bf5] hover:bg-indigo-600 text-white px-3 flex items-center justify-center shrink-0 cursor-pointer">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Deposits Table Container (Matching Exact Reference Screenshot) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Vibrant Indigo Table Header */}
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Gateway | Transaction</th>
                  <th className="py-3.5 px-6">Initiated</th>
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Conversion</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredDeposits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                      No deposits found in this category
                    </td>
                  </tr>
                ) : (
                  filteredDeposits.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Gateway | Transaction Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#5b5bf5]">{d.gateway}</div>
                        <div className="font-mono text-slate-500 text-[11px]">{d.trx}</div>
                      </td>

                      {/* Initiated Column */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{d.date}</div>
                        <div className="text-[11px] text-slate-400">{d.relativeTime}</div>
                      </td>

                      {/* User Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">{d.userName}</div>
                        <Link
                          href={`/admin/users/detail/${d.userId}`}
                          className="text-[#5b5bf5] font-semibold hover:underline text-[11px]"
                        >
                          {d.userHandle}
                        </Link>
                      </td>

                      {/* Amount Column */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-700">
                          {d.amount} + <span className="text-red-500 font-bold">{d.charge}</span>
                        </div>
                        <div className="font-bold text-slate-900 font-righteous">{d.total}</div>
                      </td>

                      {/* Conversion Column */}
                      <td className="py-4 px-6">
                        <div className="text-slate-500 font-mono text-[11px]">{d.conversion}</div>
                        <div className="font-bold text-slate-800 font-mono">{d.usdTotal}</div>
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-3.5 py-1 rounded-full text-[11px] font-bold border inline-block ${
                            d.status === 'Pending'
                              ? 'bg-amber-50 text-amber-500 border-amber-200'
                              : d.status === 'Approved' || d.status === 'Successful'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : 'bg-red-50 text-red-600 border-red-200'
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>

                      {/* Action Column */}
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/admin/deposit/details/${d.id}`}
                          className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <Monitor className="w-3.5 h-3.5" /> Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Utility Footer (Exact Match to Screenshot 2) */}
          <Pagination
            currentPage={1}
            totalPages={4}
            totalResults={48}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
