'use client';

import { useState, useEffect } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { ChevronDown } from 'lucide-react';
import api from '../../../../lib/api';

export default function AdminStakingHistoryPage() {
  const [stakes, setStakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Any');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const fetchStakes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/staking-history');
      if (res.data && res.data.success) {
        setStakes(res.data.stakes || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin staking history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStakes();
  }, []);

  // Real-time Instant Filtering
  const filteredStakes = stakes.filter((s) => {
    if (username.trim()) {
      const q = username.toLowerCase();
      const uName = s.user?.full_name || '';
      const uHandle = s.user?.username || '';
      if (!uName.toLowerCase().includes(q) && !uHandle.toLowerCase().includes(q)) {
        return false;
      }
    }

    if (selectedPlan !== 'Any') {
      const planName = s.plan?.name || '';
      if (planName.toLowerCase() !== selectedPlan.toLowerCase()) return false;
    }

    if (selectedStatus !== 'All') {
      const statusText = s.status || '';
      if (statusText.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    }

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
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                      Loading staking records...
                    </td>
                  </tr>
                ) : filteredStakes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                      No staking records found
                    </td>
                  </tr>
                ) : (
                  filteredStakes.map((log) => {
                    const uName = log.user?.full_name || log.user?.username || 'User';
                    const uHandle = log.user?.username ? `@${log.user.username}` : '';
                    const planName = log.plan?.name || 'Staking Plan';
                    const amt = parseFloat(log.amount || 0);
                    const intRate = parseFloat(log.interest_rate || 0);
                    const totalRet = parseFloat(log.total_return || amt * (1 + intRate / 100));
                    const startDateStr = log.created_at ? new Date(log.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently';
                    const endDateStr = log.end_date ? new Date(log.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Pending';

                    return (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* User Column */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-800">{uName}</div>
                          <span className="text-[#5b5bf5] font-semibold text-[11px]">
                            {uHandle}
                          </span>
                        </td>

                        {/* Plan Column */}
                        <td className="py-4 px-6 font-bold text-slate-800">{planName}</td>

                        {/* Interest Column */}
                        <td className="py-4 px-6">
                          <div className="font-mono text-slate-800">${amt.toFixed(2)} USDT</div>
                          <div className="font-bold text-emerald-600 text-[11px]">{intRate.toFixed(2)}%</div>
                        </td>

                        {/* Total Return Column */}
                        <td className="py-4 px-6 font-bold text-slate-900 font-righteous">
                          ${totalRet.toFixed(2)} USDT
                        </td>

                        {/* Start Date Column */}
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-800">{startDateStr}</div>
                        </td>

                        {/* Mature Date Column */}
                        <td className="py-4 px-6 font-medium text-slate-800">
                          {endDateStr}
                        </td>

                        {/* Status Column */}
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`px-3.5 py-1 rounded-full text-[11px] font-bold border inline-block ${
                              log.status === 'COMPLETED' || log.status === 'Mature'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-300'
                                : log.status === 'ACTIVE' || log.status === 'Running'
                                ? 'bg-amber-50 text-amber-500 border-amber-300'
                                : 'bg-indigo-50 text-indigo-600 border-indigo-300'
                            }`}
                          >
                            {log.status}
                          </span>
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
            totalPages={Math.max(1, Math.ceil(filteredStakes.length / 15))}
            totalResults={filteredStakes.length}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
