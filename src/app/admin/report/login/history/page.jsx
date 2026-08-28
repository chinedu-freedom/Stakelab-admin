'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminSidebarLayout from '../../../../../components/AdminSidebarLayout';
import Pagination from '../../../../../components/Pagination';
import api from '../../../../../lib/api';

function UserLoginHistoryContent() {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      if (res.data.success) {
        setUsers(res.data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch user login history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredLogins = users.filter((u) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const name = u.full_name || '';
      const uname = u.username || '';
      const uemail = u.email || '';
      const matches = name.toLowerCase().includes(q) || uname.toLowerCase().includes(q) || uemail.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (startDate) {
      const itemDate = new Date(u.last_login_at || u.created_at);
      const start = new Date(startDate);
      if (itemDate < start) return false;
    }
    if (endDate) {
      const itemDate = new Date(u.last_login_at || u.created_at);
      const end = new Date(endDate + 'T23:59:59');
      if (itemDate > end) return false;
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

          {/* Top Search Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Username Input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Username..."
              className="w-48 sm:w-56 h-10 bg-white border border-slate-200 rounded-lg px-3.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
            />

            {/* Interactive Date Pickers */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 h-10 shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
              <span className="text-[11px] font-semibold text-slate-400">Date:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs text-slate-700 font-sans cursor-pointer"
                title="Start Date"
              />
              <span className="text-slate-400 font-bold text-xs">–</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs text-slate-700 font-sans cursor-pointer"
                title="End Date"
              />
            </div>
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
                  filteredLogins.map((u) => {
                    const fullName = u.full_name || u.username || 'User';
                    const usernameStr = u.username ? `@${u.username}` : '@user';
                    const loginDate = u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently';

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* User Column */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-800">{fullName}</div>
                          <span className="text-[#5b5bf5] font-semibold text-[11px]">
                            {usernameStr}
                          </span>
                        </td>

                        {/* Login at Column */}
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-800">{loginDate}</div>
                        </td>

                        {/* IP Column */}
                        <td className="py-4 px-6 text-center font-bold text-[#5b5bf5] font-mono">
                          127.0.0.1
                        </td>

                        {/* Location Column */}
                        <td className="py-4 px-6 text-center text-slate-500 font-medium">
                          {u.country || 'Localhost'}
                        </td>

                        {/* Browser | OS Column */}
                        <td className="py-4 px-6 text-right font-medium text-slate-600">
                          Chrome | Windows 10
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Universal Pagination Utility Footer */}
          <Pagination
            currentPage={1}
            totalPages={Math.max(1, Math.ceil(filteredLogins.length / 15))}
            totalResults={filteredLogins.length}
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
