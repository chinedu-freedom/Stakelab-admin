'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { Search, Monitor, Copy } from 'lucide-react';
import { toast } from 'sonner';

const mockWithdrawalsList = [
  {
    id: '62',
    gateway: 'USDT (TRC20)',
    trx: 'C1LGJ3FDH3AV',
    date: '2025-08-01 01:44 PM',
    relativeTime: '1 year ago',
    userName: 'amir ghaffari',
    userHandle: '@amirking',
    userId: '1460',
    amount: '₮700.00',
    charge: '₮15.00',
    total: '₮685.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '685.00 USD',
    status: 'Pending',
  },
  {
    id: '61',
    gateway: 'USDT (TRC20)',
    trx: '5LKBC5Z74O9',
    date: '2025-07-25 02:51 PM',
    relativeTime: '1 year ago',
    userName: 'JADIEL DE SOUZA',
    userHandle: '@master',
    userId: '1459',
    amount: '₮100.00',
    charge: '₮0.01',
    total: '₮99.99',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '99.99 USD',
    status: 'Pending',
  },
  {
    id: '60',
    gateway: 'USDT (TRC20)',
    trx: 'DD24J2DNB3EY',
    date: '2025-04-05 05:49 AM',
    relativeTime: '1 year ago',
    userName: 'hossein rastegar',
    userHandle: '@hoseinras',
    userId: '1458',
    amount: '₮200.00',
    charge: '₮0.02',
    total: '₮199.98',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '199.98 USD',
    status: 'Pending',
  },
  {
    id: '59',
    gateway: 'USDT (TRC20)',
    trx: 'FMNRBRMRHLXT',
    date: '2025-03-01 04:15 AM',
    relativeTime: '1 year ago',
    userName: 'hossein rastegar',
    userHandle: '@hoseinras',
    userId: '1458',
    amount: '₮1,000.00',
    charge: '₮0.10',
    total: '₮999.90',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '999.90 USD',
    status: 'Pending',
  },
  {
    id: '58',
    gateway: 'USDT (TRC20)',
    trx: 'COV13HWRD3KN',
    date: '2025-03-01 03:35 AM',
    relativeTime: '1 year ago',
    userName: 'hossein rastegar',
    userHandle: '@hoseinras',
    userId: '1458',
    amount: '₮700.00',
    charge: '₮15.00',
    total: '₮685.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '685.00 USD',
    status: 'Pending',
  },
  {
    id: '57',
    gateway: 'USDT (TRC20)',
    trx: 'MYR68P8DNK3',
    date: '2025-03-01 03:30 AM',
    relativeTime: '1 year ago',
    userName: 'hossein rastegar',
    userHandle: '@hoseinras',
    userId: '1458',
    amount: '₮1,000.00',
    charge: '₮0.10',
    total: '₮999.90',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '999.90 USD',
    status: 'Pending',
  },
  {
    id: '56',
    gateway: 'USDT (TRC20)',
    trx: 'ZSCRUOIFQXXY',
    date: '2024-12-10 04:56 AM',
    relativeTime: '1 year ago',
    userName: 'user 88',
    userHandle: '@username88',
    userId: '1457',
    amount: '₮2.00',
    charge: '₮0.00',
    total: '₮2.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '2.00 USD',
    status: 'Pending',
  },
  {
    id: '55',
    gateway: 'USDT (TRC20)',
    trx: 'PKJCS44O56TD',
    date: '2024-12-08 08:06 PM',
    relativeTime: '1 year ago',
    userName: 'baba Name',
    userHandle: '@username',
    userId: '1456',
    amount: '₮500.00',
    charge: '₮11.00',
    total: '₮489.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '489.00 USD',
    status: 'Pending',
  },
  {
    id: '54',
    gateway: 'USDT (TRC20)',
    trx: 'TJYJV8BYN6XA',
    date: '2024-11-04 07:03 AM',
    relativeTime: '1 year ago',
    userName: 'baba Name',
    userHandle: '@username',
    userId: '1456',
    amount: '₮2.00',
    charge: '₮1.04',
    total: '₮0.96',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '0.96 USD',
    status: 'Pending',
  },
  {
    id: '53',
    gateway: 'USDT (TRC20)',
    trx: 'APPROVED9981',
    date: '2024-10-12 11:20 AM',
    relativeTime: '1 year ago',
    userName: 'Daniel Swags',
    userHandle: '@furqanmehar',
    userId: '1459',
    amount: '₮500.00',
    charge: '₮10.00',
    total: '₮490.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '490.00 USD',
    status: 'Approved',
  },
  {
    id: '52',
    gateway: 'USDT (TRC20)',
    trx: 'APPROVED9982',
    date: '2024-09-05 09:14 AM',
    relativeTime: '1 year ago',
    userName: 'Simon Smith',
    userHandle: '@Uarmadale',
    userId: '1452',
    amount: '₮1,200.00',
    charge: '₮20.00',
    total: '₮1,180.00',
    conversion: '₮1.00 = 1.00 USD',
    usdTotal: '1,180.00 USD',
    status: 'Approved',
  },
  {
    id: '51',
    gateway: 'USDT (TRC20)',
    trx: 'REJECTED9983',
    date: '2024-08-20 02:45 PM',
    walletAddress: 'TQy9P2k9k9HXCy4DmaAbX5fhgqytvn30',
  },
];

export default function AdminWithdrawalsFilteredPage({
  title = 'Pending Withdrawals',
  statusFilter = 'Pending',
}) {
  const [searchUser, setSearchUser] = useState('');
  const [dateRange, setDateRange] = useState('');

  const handleCopyWallet = (address) => {
    navigator.clipboard.writeText(address);
    toast.success('Wallet address copied to clipboard!');
  };

  const filteredWithdrawals = mockWithdrawalsList.filter((w) => {
    if (statusFilter !== 'All' && w.status !== statusFilter) return false;
    if (searchUser.trim()) {
      const q = searchUser.toLowerCase();
      return (
        w.userName.toLowerCase().includes(q) ||
        w.userHandle.toLowerCase().includes(q) ||
        w.trx.toLowerCase().includes(q) ||
        (w.walletAddress && w.walletAddress.toLowerCase().includes(q))
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

          {/* Top Search Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
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

        {/* Withdrawals Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Gateway | Transaction</th>
                  <th className="py-3.5 px-6">Initiated</th>
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Wallet Address</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredWithdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                      No withdrawals found in this category
                    </td>
                  </tr>
                ) : (
                  filteredWithdrawals.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Gateway | Transaction Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#5b5bf5]">{w.gateway}</div>
                        <div className="font-mono text-slate-500 text-[11px]">{w.trx}</div>
                      </td>

                      {/* Initiated Column */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{w.date}</div>
                        <div className="text-[11px] text-slate-400">{w.relativeTime}</div>
                      </td>

                      {/* User Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">{w.userName}</div>
                        <Link
                          href={`/admin/users/detail/${w.userId}`}
                          className="text-[#5b5bf5] font-semibold hover:underline text-[11px]"
                        >
                          {w.userHandle}
                        </Link>
                      </td>

                      {/* Wallet Address Column with Copy Button (Matching Reference Image) */}
                      <td className="py-4 px-6 font-mono text-xs font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[160px]" title={w.walletAddress}>
                            {w.walletAddress || 'TGUhk5hnggpnm9HXCy4DmaAbX5fhgqytvn'}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyWallet(w.walletAddress || 'TGUhk5hnggpnm9HXCy4DmaAbX5fhgqytvn')
                            }
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                            title="Copy Wallet Address"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Amount Column */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-700">
                          {w.amount} - <span className="text-red-500 font-bold">{w.charge}</span>
                        </div>
                        <div className="font-bold text-slate-900 font-righteous">{w.total}</div>
                      </td>

                      {/* Conversion Column */}
                      <td className="py-4 px-6">
                        <div className="text-slate-500 font-mono text-[11px]">{w.conversion}</div>
                        <div className="font-bold text-slate-800 font-mono">{w.usdTotal}</div>
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-3.5 py-1 rounded-full text-[11px] font-bold border inline-block ${
                            w.status === 'Pending'
                              ? 'bg-amber-50 text-amber-500 border-amber-200'
                              : w.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : 'bg-red-50 text-red-600 border-red-200'
                          }`}
                        >
                          {w.status}
                        </span>
                      </td>

                      {/* Action Column */}
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/admin/withdraw/details/${w.id}`}
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

          {/* Pagination Utility Footer */}
          <Pagination
            currentPage={1}
            totalPages={2}
            totalResults={14}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
