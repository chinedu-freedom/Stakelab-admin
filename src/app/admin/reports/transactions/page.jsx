'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { ChevronDown } from 'lucide-react';
import api from '../../../../lib/api';

export default function AdminTransactionLogsPage({ userId = null }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trxUsername, setTrxUsername] = useState('');
  const [type, setType] = useState('All');
  const [remark, setRemark] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/transactions');
      if (res.data.success) {
        setTransactions(res.data.transactions || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    if (trxUsername.trim()) {
      const q = trxUsername.toLowerCase();
      const userName = t.user?.full_name || '';
      const userHandle = t.user?.username || '';
      const refId = t.id || '';
      if (!userName.toLowerCase().includes(q) && !userHandle.toLowerCase().includes(q) && !refId.toLowerCase().includes(q)) {
        return false;
      }
    }

    if (type === 'Plus' && parseFloat(t.amount || 0) < 0) return false;
    if (type === 'Minus' && parseFloat(t.amount || 0) >= 0) return false;

    if (remark !== 'All') {
      const actType = t.type || '';
      if (!actType.toLowerCase().includes(remark.toLowerCase())) return false;
    }

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
                  filteredTransactions.map((trx) => {
                    const userName = trx.user?.full_name || trx.user?.username || 'User';
                    const userHandle = trx.user?.username ? `@${trx.user.username}` : '';
                    const refCode = trx.reference_id || trx.id.substring(0, 10).toUpperCase();
                    const txDate = trx.created_at ? new Date(trx.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently';
                    const isPositive = !['WITHDRAWAL', 'ADMIN_DEBIT', 'STAKE'].includes(trx.type);
                    const formattedAmount = `${isPositive ? '+' : '-'} $${parseFloat(trx.amount || 0).toFixed(2)}`;
                    const formattedPostBal = `$${parseFloat(trx.balance_after || 0).toFixed(2)}`;

                    return (
                      <tr key={trx.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* User Column */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-800">{userName}</div>
                          <span className="text-[#5b5bf5] font-semibold text-[11px]">
                            {userHandle}
                          </span>
                        </td>

                        {/* TRX Column */}
                        <td className="py-4 px-6 font-mono font-bold text-slate-700">
                          {refCode}
                        </td>

                        {/* Transacted Column */}
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-800">{txDate}</div>
                        </td>

                        {/* Amount Column */}
                        <td className="py-4 px-6 font-bold font-righteous">
                          <span className={isPositive ? 'text-emerald-600' : 'text-red-500'}>
                            {formattedAmount}
                          </span>
                        </td>

                        {/* Post Balance Column */}
                        <td className="py-4 px-6 font-semibold text-slate-800 font-mono">
                          {formattedPostBal}
                        </td>

                        {/* Details Column */}
                        <td className="py-4 px-6 text-right text-slate-500 font-medium">
                          {trx.description || trx.type}
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
            totalPages={Math.max(1, Math.ceil(filteredTransactions.length / 15))}
            totalResults={filteredTransactions.length}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
