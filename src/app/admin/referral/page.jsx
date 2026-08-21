'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../components/AdminSidebarLayout';
import { ToggleLeft, ToggleRight, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminManageReferralPage() {
  // Deposit Commission State
  const [depositEnabled, setDepositEnabled] = useState(true);
  const [depositActiveLevels, setDepositActiveLevels] = useState([
    { level: 1, percent: '10.00%' },
    { level: 2, percent: '5.00%' },
    { level: 3, percent: '3.00%' },
    { level: 4, percent: '2.00%' },
    { level: 5, percent: '1.00%' },
  ]);
  const [depositNumLevels, setDepositNumLevels] = useState('');
  const [depositGeneratedRows, setDepositGeneratedRows] = useState([]);

  // Staking Commission State
  const [stakingEnabled, setStakingEnabled] = useState(true);
  const [stakingActiveLevels, setStakingActiveLevels] = useState([
    { level: 1, percent: '5.00%' },
    { level: 2, percent: '3.00%' },
    { level: 3, percent: '1.00%' },
  ]);
  const [stakingNumLevels, setStakingNumLevels] = useState('');
  const [stakingGeneratedRows, setStakingGeneratedRows] = useState([]);

  // Generate Deposit Commission Rows
  const handleGenerateDeposit = (e) => {
    e.preventDefault();
    const count = parseInt(depositNumLevels);
    if (!count || count <= 0) {
      toast.error('Please enter a valid number of levels.');
      return;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      level: i + 1,
      percent: '',
    }));
    setDepositGeneratedRows(rows);
    toast.success(`Generated ${count} levels for Referral Commission.`);
  };

  // Delete Deposit Row
  const handleDeleteDepositRow = (id) => {
    setDepositGeneratedRows(depositGeneratedRows.filter((r) => r.id !== id));
  };

  // Submit Referral Commission
  const handleSubmitDeposit = (e) => {
    e.preventDefault();
    if (depositGeneratedRows.length === 0) return;
    const newActive = depositGeneratedRows.map((r) => ({
      level: r.level,
      percent: r.percent ? `${parseFloat(r.percent).toFixed(2)}%` : '0.00%',
    }));
    setDepositActiveLevels(newActive);
    setDepositGeneratedRows([]);
    setDepositNumLevels('');
    toast.success('Referral commission settings updated successfully!');
  };

  // Generate Staking Commission Rows
  const handleGenerateStaking = (e) => {
    e.preventDefault();
    const count = parseInt(stakingNumLevels);
    if (!count || count <= 0) {
      toast.error('Please enter a valid number of levels.');
      return;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      level: i + 1,
      percent: '',
    }));
    setStakingGeneratedRows(rows);
    toast.success(`Generated ${count} levels for Staking Commission.`);
  };

  // Delete Staking Row
  const handleDeleteStakingRow = (id) => {
    setStakingGeneratedRows(stakingGeneratedRows.filter((r) => r.id !== id));
  };

  // Submit Staking Commission
  const handleSubmitStaking = (e) => {
    e.preventDefault();
    if (stakingGeneratedRows.length === 0) return;
    const newActive = stakingGeneratedRows.map((r) => ({
      level: r.level,
      percent: r.percent ? `${parseFloat(r.percent).toFixed(2)}%` : '0.00%',
    }));
    setStakingActiveLevels(newActive);
    setStakingGeneratedRows([]);
    setStakingNumLevels('');
    toast.success('Staking commission settings updated successfully!');
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Manage Referral
        </h1>

        {/* 2-Card Side-by-Side Grid (Matching Reference Screenshot 1 & 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Card 1: Referral Commission */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header Banner */}
            <div className="bg-[#5b5bf5] text-white p-4 px-6 flex justify-between items-center">
              <h2 className="text-sm font-bold font-sans tracking-wide">
                Referral Commission
              </h2>
              <button
                type="button"
                onClick={() => {
                  const nextState = !depositEnabled;
                  setDepositEnabled(nextState);
                  if (nextState) {
                    toast.success('Referral commission changed successfully');
                  } else {
                    toast.success('Referral commission changed successfully');
                  }
                }}
                className={`px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  depositEnabled
                    ? 'bg-[#22c55e] hover:bg-emerald-600 text-white'
                    : 'bg-[#dc2626] hover:bg-red-700 text-white'
                }`}
              >
                {depositEnabled ? (
                  <>
                    <ToggleRight className="w-4 h-4" /> Enable Now
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" /> Disable Now
                  </>
                )}
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Active Levels List Table */}
              <div className="divide-y divide-slate-100 text-xs font-sans">
                {depositActiveLevels.map((lvl) => (
                  <div key={lvl.level} className="py-3 flex justify-between items-center">
                    <span className="font-bold text-slate-700">Level {lvl.level}</span>
                    <span className="font-bold text-slate-900 font-righteous">{lvl.percent}</span>
                  </div>
                ))}
              </div>

              {/* Update Setting Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="shrink-0 mx-4 text-xs font-semibold text-slate-500 font-sans">
                  Update Setting
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Generator Input Form */}
              <form onSubmit={handleGenerateDeposit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                    Number of Level
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-indigo-500 shadow-sm">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={depositNumLevels}
                      onChange={(e) => setDepositNumLevels(e.target.value)}
                      placeholder="Type a number & hit ENTER ↵"
                      className="w-full h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 placeholder-slate-400 font-sans"
                    />
                    <button
                      type="submit"
                      className="h-11 bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold px-5 text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </form>

              {/* Generated Input Rows (Matching Screenshot 2) */}
              {depositGeneratedRows.length > 0 && (
                <form onSubmit={handleSubmitDeposit} className="space-y-4 pt-2">
                  <p className="text-xs text-red-500 font-semibold font-sans">
                    The Old setting will be removed after generating new
                  </p>

                  <div className="space-y-3">
                    {depositGeneratedRows.map((row, idx) => (
                      <div
                        key={row.id}
                        className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500"
                      >
                        <div className="h-11 bg-slate-100 border-r border-slate-200 px-4 text-xs font-bold text-slate-600 flex items-center shrink-0 min-w-[80px]">
                          Level {row.level}
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={row.percent}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDepositGeneratedRows(
                              depositGeneratedRows.map((r) =>
                                r.id === row.id ? { ...r, percent: val } : r
                              )
                            );
                          }}
                          placeholder="Commission Percentage"
                          className="w-full h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 font-sans placeholder-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteDepositRow(row.id)}
                          className="h-11 bg-red-600 hover:bg-red-700 text-white px-3.5 flex items-center justify-center shrink-0 transition-all cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Card 2: Staking Commission */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header Banner */}
            <div className="bg-[#5b5bf5] text-white p-4 px-6 flex justify-between items-center">
              <h2 className="text-sm font-bold font-sans tracking-wide">
                Staking Commission
              </h2>
              <button
                type="button"
                onClick={() => {
                  const nextState = !stakingEnabled;
                  setStakingEnabled(nextState);
                  if (nextState) {
                    toast.success('Staking commission changed successfully');
                  } else {
                    toast.success('Staking commission changed successfully');
                  }
                }}
                className={`px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  stakingEnabled
                    ? 'bg-[#22c55e] hover:bg-emerald-600 text-white'
                    : 'bg-[#dc2626] hover:bg-red-700 text-white'
                }`}
              >
                {stakingEnabled ? (
                  <>
                    <ToggleRight className="w-4 h-4" /> Enable Now
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" /> Disable Now
                  </>
                )}
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-indigo-50/70 border border-indigo-100 p-3 rounded-lg text-[11px] text-indigo-900 leading-relaxed font-sans font-medium">
                💡 Staking commission is granted directly to the user when they buy/stake a plan, calculated based on their plan investment amount.
              </div>

              {/* Active Levels List Table */}
              <div className="divide-y divide-slate-100 text-xs font-sans">
                {stakingActiveLevels.map((lvl) => (
                  <div key={lvl.level} className="py-3 flex justify-between items-center">
                    <span className="font-bold text-slate-700">Level {lvl.level}</span>
                    <span className="font-bold text-slate-900 font-righteous">{lvl.percent}</span>
                  </div>
                ))}
              </div>

              {/* Update Setting Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="shrink-0 mx-4 text-xs font-semibold text-slate-500 font-sans">
                  Update Setting
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Generator Input Form */}
              <form onSubmit={handleGenerateStaking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                    Number of Level
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-indigo-500 shadow-sm">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={stakingNumLevels}
                      onChange={(e) => setStakingNumLevels(e.target.value)}
                      placeholder="Type a number & hit ENTER ↵"
                      className="w-full h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 placeholder-slate-400 font-sans"
                    />
                    <button
                      type="submit"
                      className="h-11 bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold px-5 text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </form>

              {/* Generated Input Rows (Matching Screenshot 2) */}
              {stakingGeneratedRows.length > 0 && (
                <form onSubmit={handleSubmitStaking} className="space-y-4 pt-2">
                  <p className="text-xs text-red-500 font-semibold font-sans">
                    The Old setting will be removed after generating new
                  </p>

                  <div className="space-y-3">
                    {stakingGeneratedRows.map((row) => (
                      <div
                        key={row.id}
                        className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500"
                      >
                        <div className="h-11 bg-slate-100 border-r border-slate-200 px-4 text-xs font-bold text-slate-600 flex items-center shrink-0 min-w-[80px]">
                          Level {row.level}
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={row.percent}
                          onChange={(e) => {
                            const val = e.target.value;
                            setStakingGeneratedRows(
                              stakingGeneratedRows.map((r) =>
                                r.id === row.id ? { ...r, percent: val } : r
                              )
                            );
                          }}
                          placeholder="Commission Percentage"
                          className="w-full h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 font-sans placeholder-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteStakingRow(row.id)}
                          className="h-11 bg-red-600 hover:bg-red-700 text-white px-3.5 flex items-center justify-center shrink-0 transition-all cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
