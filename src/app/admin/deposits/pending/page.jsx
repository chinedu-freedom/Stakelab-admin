'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { Search, Monitor } from 'lucide-react';
import api from '../../../../lib/api';

export default function AdminDepositsFilteredPage({
  title = 'Pending Deposits',
  statusFilter = 'Pending',
}) {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState('');
  const [dateRange, setDateRange] = useState('');

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/deposits');
      if (res.data.success) {
        setDeposits(res.data.deposits || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin deposits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const filteredDeposits = deposits.filter((d) => {
    if (statusFilter !== 'All') {
      const matchStatus = statusFilter.toUpperCase();
      if (d.status !== matchStatus) return false;
    }
    if (searchUser.trim()) {
      const q = searchUser.toLowerCase();
      const userName = d.user?.full_name || '';
      const userHandle = d.user?.username || '';
      const trx = d.payment_id || d.id || '';
      return (
        userName.toLowerCase().includes(q) ||
        userHandle.toLowerCase().includes(q) ||
        trx.toLowerCase().includes(q)
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
                  filteredDeposits.map((d) => {
                    const gatewayName = d.gateway_code || d.payment_method || 'USDT (TRC20)';
                    const refId = d.payment_id || d.id.substring(0, 10).toUpperCase();
                    const depDate = d.created_at ? new Date(d.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently';
                    const userName = d.user?.full_name || d.user?.username || 'User';
                    const userHandle = d.user?.username ? `@${d.user.username}` : '';
                    const numAmt = parseFloat(d.amount || 0);
                    const numCharge = parseFloat(d.charge || 0);
                    const numTotal = numAmt + numCharge;
                    const statusText = d.status ? d.status.charAt(0) + d.status.slice(1).toLowerCase() : 'Pending';

                    return (
                      <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Gateway | Transaction Column */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-[#5b5bf5]">{gatewayName}</div>
                          <div className="font-mono text-slate-500 text-[11px]">{refId}</div>
                        </td>

                        {/* Initiated Column */}
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-800">{depDate}</div>
                        </td>

                        {/* User Column */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-800">{userName}</div>
                          <Link
                            href={`/admin/users/detail/${d.user_id}`}
                            className="text-[#5b5bf5] font-semibold hover:underline text-[11px]"
                          >
                            {userHandle}
                          </Link>
                        </td>

                        {/* Amount Column */}
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-700">
                            ${numAmt.toFixed(2)} + <span className="text-red-500 font-bold">${numCharge.toFixed(2)}</span>
                          </div>
                          <div className="font-bold text-slate-900 font-righteous">${numTotal.toFixed(2)}</div>
                        </td>

                        {/* Conversion Column */}
                        <td className="py-4 px-6">
                          <div className="text-slate-500 font-mono text-[11px]">$1.00 = 1.00 USD</div>
                          <div className="font-bold text-slate-800 font-mono">{numTotal.toFixed(2)} USD</div>
                        </td>

                        {/* Status Column */}
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`px-3.5 py-1 rounded-full text-[11px] font-bold border inline-block ${
                              d.status === 'PENDING'
                                ? 'bg-amber-50 text-amber-500 border-amber-200'
                                : d.status === 'APPROVED'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-red-50 text-red-600 border-red-200'
                            }`}
                          >
                            {statusText}
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Utility Footer */}
          <Pagination
            currentPage={1}
            totalPages={Math.max(1, Math.ceil(filteredDeposits.length / 15))}
            totalResults={filteredDeposits.length}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
