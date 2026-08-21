'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { Search, Monitor, UserCheck } from 'lucide-react';

const mockUsersList = [
  {
    id: '1460',
    name: 'Cfg Cfg',
    username: '@fajavidi',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'DZ',
    joinedAt: '2022-03-17 03:09 AM',
    relativeTime: '4 years ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    mobileVerified: true,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '44',
    name: 'Agent One',
    username: '@agentone',
    email: '[Email is protected for the demo]',
    mobile: '+93 132456',
    country: 'AF',
    joinedAt: '2024-03-11 03:16 AM',
    relativeTime: '2 years ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    mobileVerified: false,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '1459',
    name: 'Test User',
    username: '@testuser5568',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'AF',
    joinedAt: '2021-05-12 05:27 AM',
    relativeTime: '5 years ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '1458',
    name: 'Mosta Project 3',
    username: '@mostasproject3',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'BD',
    joinedAt: '2021-06-10 08:38 AM',
    relativeTime: '5 years ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '1457',
    name: 'Mosta Project 2',
    username: '@mostasproject2',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'BD',
    joinedAt: '2021-06-10 05:35 AM',
    relativeTime: '5 years ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '1456',
    name: 'Mosta fizz',
    username: '@mostasproject',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'BD',
    joinedAt: '2021-06-10 05:31 AM',
    relativeTime: '5 years ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '1455',
    name: 'My Name',
    username: '@myname5587',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'AI',
    joinedAt: '2021-06-09 06:15 AM',
    relativeTime: '5 years ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    kycStatus: 'pending',
    hasBalance: false,
  },
  {
    id: '1454',
    name: 'Test Name',
    username: '@testuser',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'AU',
    joinedAt: '2021-05-19 05:47 AM',
    relativeTime: '5 years ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    kycStatus: 'pending',
    hasBalance: false,
  },
  {
    id: '1453',
    name: 'Yyyy Yyyyy',
    username: '@username6',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'AD',
    joinedAt: '2021-05-10 06:27 AM',
    relativeTime: '5 years ago',
    balance: '₮8,810.00',
    status: 'active',
    emailVerified: true,
    kycStatus: 'unverified',
    hasBalance: true,
  },
  {
    id: '1457',
    name: 'Bitcoin Bitcoin',
    username: '@btcuser',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'US',
    joinedAt: '2026-08-09 05:15 AM',
    relativeTime: '1 week ago',
    balance: '₮0.00',
    status: 'banned',
    emailVerified: false,
    mobileVerified: false,
    kycStatus: 'pending',
    hasBalance: false,
  },
  {
    id: '1456',
    name: 'Unknown Unk',
    username: '@unknown',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'AF',
    joinedAt: '2026-08-05 02:19 AM',
    relativeTime: '2 weeks ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: false,
    mobileVerified: false,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '1455',
    name: 'Hüseyin ? ince',
    username: '@huseyin',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'TR',
    joinedAt: '2026-08-04 01:13 PM',
    relativeTime: '2 weeks ago',
    balance: '₮2,400.00',
    status: 'active',
    emailVerified: false,
    mobileVerified: true,
    kycStatus: 'pending',
    hasBalance: true,
  },
  {
    id: '1454',
    name: 'Luis orellana',
    username: '@properito',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'AR',
    joinedAt: '2026-08-01 08:57 PM',
    relativeTime: '2 weeks ago',
    balance: '₮0.00',
    status: 'active',
    emailVerified: true,
    mobileVerified: true,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '1453',
    name: 'Proline Mail',
    username: '@proline',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'CA',
    joinedAt: '2026-07-14 12:10 AM',
    relativeTime: '1 month ago',
    balance: '₮0.00',
    status: 'banned',
    emailVerified: false,
    mobileVerified: false,
    kycStatus: 'unverified',
    hasBalance: false,
  },
  {
    id: '1452',
    name: 'Simon Smith',
    username: '@Uarmadale',
    email: '[Email is protected for the demo]',
    mobile: '[Mobile is protected for the demo]',
    country: 'AU',
    joinedAt: '2026-07-06 08:32 AM',
    relativeTime: '1 month ago',
    balance: '₮80.00',
    status: 'active',
    emailVerified: true,
    mobileVerified: true,
    kycStatus: 'verified',
    hasBalance: true,
  },
];

export default function AdminUsersFilteredPage({ title = 'Active Users', filterType = 'active' }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsersList.filter((u) => {
    // Apply Category Filter
    if (filterType === 'active' && u.status !== 'active') return false;
    if (filterType === 'banned' && u.status !== 'banned') return false;
    if (filterType === 'email-unverified' && u.emailVerified !== false) return false;
    if (filterType === 'mobile-unverified' && u.mobileVerified !== false) return false;
    if (filterType === 'kyc-unverified' && u.kycStatus !== 'unverified') return false;
    if (filterType === 'kyc-pending' && u.kycStatus !== 'pending') return false;
    if (filterType === 'with-balance' && !u.hasBalance) return false;

    // Apply Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            {title}
          </h1>

          {/* Search Bar Input Group */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Username / Email"
              className="w-48 sm:w-64 h-10 bg-transparent border-0 outline-none px-3.5 text-xs text-slate-800 placeholder-slate-400 font-sans"
            />
            <button className="h-10 bg-[#5b5bf5] hover:bg-indigo-600 text-white px-3.5 flex items-center justify-center shrink-0 transition-all cursor-pointer">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Users Table Container (Matching Exact Reference Screenshot) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Vibrant Indigo Table Header */}
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Email-Mobile</th>
                  <th className="py-3.5 px-6 text-center">Country</th>
                  <th className="py-3.5 px-6">Joined At</th>
                  <th className="py-3.5 px-6">Balance</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                      No users found in this category
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* User Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">{u.name}</div>
                        <Link
                          href={`/admin/users/detail/${u.id}`}
                          className="text-[#5b5bf5] font-semibold hover:underline text-[11px]"
                        >
                          {u.username}
                        </Link>
                      </td>

                      {/* Email-Mobile Column */}
                      <td className="py-4 px-6">
                        <div className="text-slate-500 font-sans">{u.email}</div>
                        <div className="text-slate-400 font-sans text-[11px]">{u.mobile}</div>
                      </td>

                      {/* Country Column */}
                      <td className="py-4 px-6 text-center font-bold text-slate-700">
                        {u.country || '-'}
                      </td>

                      {/* Joined At Column */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{u.joinedAt}</div>
                        <div className="text-[11px] text-slate-400">{u.relativeTime}</div>
                      </td>

                      {/* Balance Column */}
                      <td className="py-4 px-6 font-bold text-slate-800 font-righteous">
                        {u.balance}
                      </td>

                      {/* Action Column */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/users/detail/${u.id}`}
                            className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                          >
                            <Monitor className="w-3.5 h-3.5" /> Details
                          </Link>
                          {(filterType === 'kyc-pending' || filterType === 'kyc-unverified' || u.kycStatus === 'pending') && (
                            <Link
                              href={`/admin/users/kyc-data/${u.id}`}
                              className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <UserCheck className="w-3.5 h-3.5" /> KYC Data
                            </Link>
                          )}
                        </div>
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
            totalPages={4}
            totalResults={filteredUsers.length}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
