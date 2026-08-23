'use client';

import { useState, useEffect } from 'react';
import AdminSidebarLayout from '../../../components/AdminSidebarLayout';
import { ToggleLeft, ToggleRight, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../../lib/api';

export default function AdminManageReferralPage() {
  const [depositEnabled, setDepositEnabled] = useState(true);
  const [depositLevels, setDepositLevels] = useState([
    { level: 1, percent: '10.00' },
    { level: 2, percent: '5.00' },
    { level: 3, percent: '3.00' },
  ]);

  const [stakingEnabled, setStakingEnabled] = useState(true);
  const [stakingLevels, setStakingLevels] = useState([
    { level: 1, percent: '5.00' },
    { level: 2, percent: '3.00' },
    { level: 3, percent: '1.00' },
  ]);

  const [loading, setLoading] = useState(true);
  const [savingDeposit, setSavingDeposit] = useState(false);
  const [savingStaking, setSavingStaking] = useState(false);

  const fetchReferralSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/referral-settings');
      if (res.data && res.data.success && res.data.referralSettings) {
        const s = res.data.referralSettings;
        setDepositEnabled(Boolean(s.depositEnabled));
        setStakingEnabled(Boolean(s.stakingEnabled));

        if (Array.isArray(s.depositLevels) && s.depositLevels.length >= 3) {
          setDepositLevels(
            s.depositLevels.slice(0, 3).map((d) => ({
              level: d.level,
              percent: String(d.percent),
            }))
          );
        }
        if (Array.isArray(s.stakingLevels) && s.stakingLevels.length >= 3) {
          setStakingLevels(
            s.stakingLevels.slice(0, 3).map((st) => ({
              level: st.level,
              percent: String(st.percent),
            }))
          );
        }
      }
    } catch (err) {
      console.error('Failed to fetch referral settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralSettings();
  }, []);

  const handleSaveDepositSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingDeposit(true);
      const res = await api.post('/admin/referral-settings', {
        depositEnabled,
        depositLevels: depositLevels.map((d) => ({ level: d.level, percent: parseFloat(d.percent || 0) })),
        stakingEnabled,
        stakingLevels: stakingLevels.map((s) => ({ level: s.level, percent: parseFloat(s.percent || 0) })),
      });
      if (res.data && res.data.success) {
        toast.success('Referral deposit commission updated successfully!');
      }
    } catch (err) {
      toast.error('Failed to update referral deposit settings');
    } finally {
      setSavingDeposit(false);
    }
  };

  const handleSaveStakingSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingStaking(true);
      const res = await api.post('/admin/referral-settings', {
        depositEnabled,
        depositLevels: depositLevels.map((d) => ({ level: d.level, percent: parseFloat(d.percent || 0) })),
        stakingEnabled,
        stakingLevels: stakingLevels.map((s) => ({ level: s.level, percent: parseFloat(s.percent || 0) })),
      });
      if (res.data && res.data.success) {
        toast.success('Staking commission updated successfully!');
      }
    } catch (err) {
      toast.error('Failed to update staking referral settings');
    } finally {
      setSavingStaking(false);
    }
  };

  const handleToggleDeposit = async () => {
    const nextState = !depositEnabled;
    setDepositEnabled(nextState);
    try {
      await api.post('/admin/referral-settings', {
        depositEnabled: nextState,
        depositLevels: depositLevels.map((d) => ({ level: d.level, percent: parseFloat(d.percent || 0) })),
        stakingEnabled,
        stakingLevels: stakingLevels.map((s) => ({ level: s.level, percent: parseFloat(s.percent || 0) })),
      });
      toast.success(`Referral commission ${nextState ? 'enabled' : 'disabled'} successfully`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleToggleStaking = async () => {
    const nextState = !stakingEnabled;
    setStakingEnabled(nextState);
    try {
      await api.post('/admin/referral-settings', {
        depositEnabled,
        depositLevels: depositLevels.map((d) => ({ level: d.level, percent: parseFloat(d.percent || 0) })),
        stakingEnabled: nextState,
        stakingLevels: stakingLevels.map((s) => ({ level: s.level, percent: parseFloat(s.percent || 0) })),
      });
      toast.success(`Staking commission ${nextState ? 'enabled' : 'disabled'} successfully`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Manage Referral (3-Tier Fixed)
        </h1>

        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 font-semibold flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#5b5bf5]" /> Loading referral commission settings...
          </div>
        ) : (
          /* 2-Card Side-by-Side Grid */
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
                  onClick={handleToggleDeposit}
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

              <form onSubmit={handleSaveDepositSettings} className="p-6 space-y-6">
                <p className="text-xs text-slate-500 font-medium font-sans">
                  Configure the 3-tier commission percentages awarded for referred deposit deposits.
                </p>

                {/* 3 Fixed Level Inputs */}
                <div className="space-y-4">
                  {depositLevels.map((row, idx) => (
                    <div
                      key={row.level}
                      className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500"
                    >
                      <div className="h-11 bg-slate-100 border-r border-slate-200 px-4 text-xs font-bold text-slate-700 flex items-center shrink-0 min-w-[90px]">
                        Level {row.level}
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={row.percent}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDepositLevels(
                            depositLevels.map((d) => (d.level === row.level ? { ...d, percent: val } : d))
                          );
                        }}
                        placeholder="Commission Percentage (%)"
                        className="w-full h-11 bg-transparent border-0 outline-none px-4 text-xs font-bold text-slate-900 font-mono"
                      />
                      <div className="h-11 bg-slate-50 border-l border-slate-200 px-3 text-xs font-bold text-slate-500 flex items-center shrink-0">
                        %
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={savingDeposit}
                    className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {savingDeposit ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Referral Settings
                  </button>
                </div>
              </form>
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
                  onClick={handleToggleStaking}
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

              <form onSubmit={handleSaveStakingSettings} className="p-6 space-y-6">
                <div className="bg-indigo-50/70 border border-indigo-100 p-3 rounded-lg text-[11px] text-indigo-900 leading-relaxed font-sans font-medium">
                  💡 Staking commission is granted directly to the user when their referral stakes a plan, calculated based on the investment amount.
                </div>

                {/* 3 Fixed Level Inputs */}
                <div className="space-y-4">
                  {stakingLevels.map((row, idx) => (
                    <div
                      key={row.level}
                      className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500"
                    >
                      <div className="h-11 bg-slate-100 border-r border-slate-200 px-4 text-xs font-bold text-slate-700 flex items-center shrink-0 min-w-[90px]">
                        Level {row.level}
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={row.percent}
                        onChange={(e) => {
                          const val = e.target.value;
                          setStakingLevels(
                            stakingLevels.map((s) => (s.level === row.level ? { ...s, percent: val } : s))
                          );
                        }}
                        placeholder="Commission Percentage (%)"
                        className="w-full h-11 bg-transparent border-0 outline-none px-4 text-xs font-bold text-slate-900 font-mono"
                      />
                      <div className="h-11 bg-slate-50 border-l border-slate-200 px-3 text-xs font-bold text-slate-500 flex items-center shrink-0">
                        %
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={savingStaking}
                    className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {savingStaking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Staking Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminSidebarLayout>
  );
}
