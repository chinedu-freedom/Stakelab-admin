'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminSidebarLayout from '../../../../../components/AdminSidebarLayout';
import Pagination from '../../../../../components/Pagination';

const mockLoginsList = [
  {
    id: '1',
    name: 'Chinedu Afamefuna',
    username: '@Sparko',
    loginAt: '2026-08-21 11:32 AM',
    relativeTime: '1 hour ago',
    ip: '2605:59c0:e85:6410:39bc:7a9c:149e:b399',
    location: '',
    browserOs: 'Chrome | Windows 10',
  },
  {
    id: '2',
    name: 'Chinedu Afamefuna',
    username: '@Sparko',
    loginAt: '2026-08-21 09:39 AM',
    relativeTime: '3 hours ago',
    ip: '102.90.81.60',
    location: '',
    browserOs: 'Chrome | Windows 10',
  },
  {
    id: '3',
    name: 'web serv',
    username: '@webservice',
    loginAt: '2026-08-11 10:44 AM',
    relativeTime: '1 week ago',
    ip: '105.127.15.90',
    location: '',
    browserOs: 'Handheld Browser | iPhone',
  },
  {
    id: '4',
    name: 'Esmaeil Jonas',
    username: '@DaneshsabzIran',
    loginAt: '2026-08-09 05:17 AM',
    relativeTime: '1 week ago',
    ip: '185.23.237.37',
    location: '',
    browserOs: 'Handheld Browser | Android',
  },
  {
    id: '5',
    name: 'Unknown Unk',
    username: '@unknown',
    loginAt: '2026-08-05 02:19 AM',
    relativeTime: '2 weeks ago',
    ip: '2402:3a80:d13:b469::80c9:4f0e',
    location: '',
    browserOs: 'Handheld Browser | Android',
  },
  {
    id: '6',
    name: 'Luis orellana',
    username: '@properito',
    loginAt: '2026-08-01 06:57 PM',
    relativeTime: '2 weeks ago',
    ip: '186.12.190.106',
    location: '',
    browserOs: 'Chrome | Windows 10',
  },
  {
    id: '7',
    name: 'Simon Smith',
    username: '@Uarmadale',
    loginAt: '2026-07-06 08:32 AM',
    relativeTime: '1 month ago',
    ip: '2001:8004:1106:9a68:ddcd:5180:6411:771a',
    location: '',
    browserOs: 'Handheld Browser | Android',
  },
  {
    id: '8',
    name: 'Md Rakib Abujar',
    username: '@md111111',
    loginAt: '2026-07-04 08:06 PM',
    relativeTime: '1 month ago',
    ip: '118.179.56.137',
    location: '',
    browserOs: 'Handheld Browser | Android',
  },
  {
    id: '9',
    name: 'Md Rakib Abujar',
    username: '@md111111',
    loginAt: '2026-07-04 12:29 PM',
    relativeTime: '1 month ago',
    ip: '202.86.220.249',
    location: '',
    browserOs: 'Handheld Browser | Android',
  },
];

function UserLoginHistoryContent() {
  const searchParams = useSearchParams();
  const userQuery = searchParams.get('search') || '';

  const [search, setSearch] = useState(userQuery);
  const [dateRange, setDateRange] = useState('');

  // Real-time Instant Filtering on every change (NO Blue Filter Button)
  const filteredLogins = mockLoginsList.filter((log) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        log.name.toLowerCase().includes(q) ||
        log.username.toLowerCase().includes(q) ||
        log.ip.toLowerCase().includes(q)
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
            User Login History
          </h1>

          {/* Top Search Controls (Instant Real-time Filtering, NO Blue Button - Matching Screenshot 2) */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Username Input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Username..."
              className="w-48 sm:w-56 h-10 bg-white border border-slate-200 rounded-lg px-3.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
            />

            {/* Date Input */}
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              placeholder="Start Date – End Date"
              className="w-48 sm:w-56 h-10 bg-white border border-slate-200 rounded-lg px-3.5 text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
            />
          </div>
        </div>

        {/* User Login History Table Container (Matching Exact Reference Screenshot 2) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Vibrant Indigo Table Header */}
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Login at</th>
                  <th className="py-3.5 px-6 text-center">IP</th>
                  <th className="py-3.5 px-6 text-center">Location</th>
                  <th className="py-3.5 px-6 text-right">Browser | OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-sans">
                {filteredLogins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-semibold">
                      No login records found
                    </td>
                  </tr>
                ) : (
                  filteredLogins.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* User Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">{log.name}</div>
                        <span className="text-[#5b5bf5] font-semibold text-[11px]">
                          {log.username}
                        </span>
                      </td>

                      {/* Login at Column */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{log.loginAt}</div>
                        <div className="text-[11px] text-slate-400">{log.relativeTime}</div>
                      </td>

                      {/* IP Column (Bold Blue IP Text) */}
                      <td className="py-4 px-6 text-center font-bold text-[#5b5bf5] font-mono">
                        {log.ip}
                      </td>

                      {/* Location Column */}
                      <td className="py-4 px-6 text-center text-slate-500 font-medium">
                        {log.location || '-'}
                      </td>

                      {/* Browser | OS Column */}
                      <td className="py-4 px-6 text-right font-medium text-slate-600">
                        {log.browserOs}
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
            totalPages={6}
            totalResults={84}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}

export default function UserLoginHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f3f5f9] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      }
    >
      <UserLoginHistoryContent />
    </Suspense>
  );
}
