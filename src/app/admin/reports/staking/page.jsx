'use client';

import { useState, useEffect } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../../components/ui/select';
import api from '../../../../lib/api';

export default function AdminStakingHistoryPage() {
  const [stakes, setStakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Any');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      const pName = s.plan?.name || '';
      if (!uName.toLowerCase().includes(q) && !uHandle.toLowerCase().includes(q) && !pName.toLowerCase().includes(q)) {
        return false;
      }
    }

    if (selectedPlan !== 'Any') {
      const planName = s.plan?.name || '';
      if (!planName.toLowerCase().includes(selectedPlan.toLowerCase())) return false;
    }

    if (selectedStatus !== 'All') {
      const st = s.status || '';
      if (st.toUpperCase() !== selectedStatus.toUpperCase()) return false;
    }

    if (startDate) {
      const itemDate = new Date(s.created_at);
      const start = new Date(startDate);
      if (itemDate < start) return false;
    }

    if (endDate) {
      const itemDate = new Date(s.created_at);
      const end = new Date(endDate + 'T23:59:59');
      if (itemDate > end) return false;
    }

    return true;
  });

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Staking History
        </h1>

        {/* Filter Bar Controls (NO Blue Filter Button, Instant Real-time Filtering) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Search Username / Plan */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                TRX / Username / Plan
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
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="h-10 bg-white border-slate-200 text-slate-800 rounded-lg text-xs font-sans font-normal">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-800 shadow-lg">
                  <SelectItem value="Any" className="text-slate-800 hover:bg-slate-100">Any</SelectItem>
                  <SelectItem value="Silver" className="text-slate-800 hover:bg-slate-100">Silver</SelectItem>
                  <SelectItem value="Golden" className="text-slate-800 hover:bg-slate-100">Golden</SelectItem>
                  <SelectItem value="Platinum" className="text-slate-800 hover:bg-slate-100">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-10 bg-white border-slate-200 text-slate-800 rounded-lg text-xs font-sans font-normal">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent searchable={false} className="bg-white border-slate-200 text-slate-800 shadow-lg">
                  <SelectItem value="All" className="text-slate-800 hover:bg-slate-100">All</SelectItem>
                  <SelectItem value="Running" className="text-slate-800 hover:bg-slate-100">Running</SelectItem>
                  <SelectItem value="Completed" className="text-slate-800 hover:bg-slate-100">Completed</SelectItem>
                  <SelectItem value="Mature" className="text-slate-800 hover:bg-slate-100">Mature</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interactive Date Range Pickers */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 font-sans">
                Date Filter
              </label>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 h-10 shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent border-0 outline-none text-xs text-slate-700 font-sans cursor-pointer w-full"
                  title="Start Date"
                />
                <span className="text-slate-400 font-bold text-xs">–</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent border-0 outline-none text-xs text-slate-700 font-sans cursor-pointer w-full"
                  title="End Date"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Staking Logs Table Container */}
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
