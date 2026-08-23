'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminSidebarLayout from '../../../../../components/AdminSidebarLayout';
import { Undo2, Plus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../../../../lib/api';

export default function AdminEditPlanPage({ params }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : (params || {});
  const router = useRouter();
  const planId = resolvedParams?.id;

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('30');
  const [segments, setSegments] = useState([
    { id: '1', minAmount: '10', maxAmount: '100', interest: '1.5' },
  ]);
  const [isFixedDeposit, setIsFixedDeposit] = useState(true);
  const [capitalReturn, setCapitalReturn] = useState(true);
  const [isCompounding, setIsCompounding] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanData = async () => {
      if (!planId) return;
      try {
        setLoading(true);
        const res = await api.get('/staking/plans');
        if (res.data?.success && Array.isArray(res.data.plans)) {
          const target = res.data.plans.find((p) => p.id === planId);
          if (target) {
            setName(target.title || '');
            setDuration(target.duration_days?.toString() || '30');
            setCapitalReturn(target.capital_return !== false);
            setSegments([
              {
                id: '1',
                minAmount: target.min_amount?.toString() || '10',
                maxAmount: target.max_amount?.toString() || '5000',
                interest: target.daily_return_percent?.toString() || '1.5',
              },
            ]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch plan details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanData();
  }, [planId]);

  const handleAddSegment = () => {
    setSegments([
      ...segments,
      { id: Date.now().toString(), minAmount: '', maxAmount: '', interest: '' },
    ]);
  };

  const handleRemoveSegment = (index) => {
    if (segments.length === 1) {
      toast.error('At least one stake segment is required.');
      return;
    }
    setSegments(segments.filter((_, idx) => idx !== index));
  };

  const handleSegmentChange = (index, field, value) => {
    const updated = [...segments];
    updated[index][field] = value;
    setSegments(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !duration) {
      toast.error('Plan Name and Duration are required.');
      return;
    }

    const minAmt = parseFloat(segments[0]?.minAmount || 10);
    const maxAmt = parseFloat(segments[segments.length - 1]?.maxAmount || 5000);
    const dailyReturn = parseFloat(segments[0]?.interest || 1.5);

    setSubmitting(true);
    try {
      await api.put(`/admin/staking-plans/${planId}`, {
        title: name,
        min_amount: minAmt,
        max_amount: maxAmt,
        daily_return_percent: dailyReturn,
        duration_days: parseInt(duration),
        capital_return: capitalReturn,
      });
      toast.success(`Plan "${name}" updated successfully!`);
      router.push('/admin/staking-plans');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update Staking Plan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            Edit Plan
          </h1>

          {/* Back Button */}
          <Link
            href="/admin/staking-plans"
            className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-4 py-1.5 rounded-md text-xs font-bold font-sans transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Undo2 className="w-4 h-4 text-indigo-600" /> Back
          </Link>
        </div>

        {/* Form Card Container (Matching Exact Reference Screenshot) */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Plan name"
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-slate-800 text-xs font-sans placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                />
              </div>

              {/* Duration Input Group with Days Badge */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-2">
                  Duration <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                  <input
                    type="number"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration in days"
                    className="w-full h-11 bg-transparent border-0 outline-none px-4 text-slate-800 text-xs font-sans placeholder-slate-400"
                  />
                  <div className="h-11 bg-slate-100 border-l border-slate-200 px-4 text-xs font-bold text-slate-600 flex items-center shrink-0 select-none">
                    Days
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Configuration Toggles Grid */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 font-sans mb-3">
                Plan Rules & Payout Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {/* 1. Fixed Deposit Switch */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 font-sans">
                    Fixed Deposit Lockup
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFixedDeposit(!isFixedDeposit)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isFixedDeposit
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isFixedDeposit ? 'Fixed Deposit: YES' : 'Flexible: NO'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {isFixedDeposit
                      ? 'Capital is locked until maturity.'
                      : 'Capital can be withdrawn anytime.'}
                  </p>
                </div>

                {/* 2. Capital Return Switch */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 font-sans">
                    Capital Return at Maturity
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCapitalReturn(!capitalReturn)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        capitalReturn
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-red-500 text-white shadow-sm'
                      }`}
                    >
                      {capitalReturn ? 'Capital Return: YES (PV + Profit)' : 'Capital Return: NO (Profit Only)'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {capitalReturn
                      ? 'Principal + Profit paid at maturity.'
                      : 'Principal consumed; Profit only.'}
                  </p>
                </div>

                {/* 3. Compounding Switch */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 font-sans">
                    Daily Compounding Yield
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCompounding(!isCompounding)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCompounding
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isCompounding ? 'Compounding: YES FV = PV(1+r)ⁿ' : 'Simple Yield: NO'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {isCompounding
                      ? 'Daily profit compounds automatically.'
                      : 'Simple daily interest rate.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Stake Segments Section Header */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-700 font-sans">
                  Stake Segments
                </h3>

                {/* + Add Segment Button (Vibrant Indigo / Blue Pill Button) */}
                <button
                  type="button"
                  onClick={handleAddSegment}
                  className="bg-[#5b5bf5] hover:bg-indigo-600 text-white px-3.5 py-1.5 rounded text-xs font-bold font-sans flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Segment
                </button>
              </div>

              {/* Dynamic Stake Segment Input Bar Rows (Exact Match to Screenshot) */}
              <div className="space-y-3">
                {segments.map((seg, idx) => (
                  <div
                    key={seg.id}
                    className="flex flex-col md:flex-row items-stretch border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-indigo-500 transition-all"
                  >
                    {/* Min amount input */}
                    <input
                      type="number"
                      value={seg.minAmount}
                      onChange={(e) => handleSegmentChange(idx, 'minAmount', e.target.value)}
                      placeholder="Min amount"
                      className="flex-1 h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 placeholder-slate-400 font-sans border-b md:border-b-0 md:border-r border-slate-200"
                    />

                    {/* Max amount input */}
                    <input
                      type="number"
                      value={seg.maxAmount}
                      onChange={(e) => handleSegmentChange(idx, 'maxAmount', e.target.value)}
                      placeholder="Max amount"
                      className="flex-1 h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 placeholder-slate-400 font-sans"
                    />

                    {/* USDT Suffix Badge */}
                    <div className="h-11 bg-slate-100 border-l border-slate-200 px-5 text-xs font-bold text-slate-600 flex items-center shrink-0 select-none">
                      USDT
                    </div>

                    {/* Interest in % input */}
                    <input
                      type="text"
                      value={seg.interest}
                      onChange={(e) => handleSegmentChange(idx, 'interest', e.target.value)}
                      placeholder="Interest in %"
                      className="flex-1 h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 placeholder-slate-400 font-sans border-t md:border-t-0 md:border-l border-slate-200"
                    />

                    {/* % Suffix Badge */}
                    <div className="h-11 bg-slate-100 border-l border-slate-200 px-4 text-xs font-bold text-slate-600 flex items-center shrink-0 select-none">
                      %
                    </div>

                    {/* Red Square Delete Button (X) */}
                    <button
                      type="button"
                      onClick={() => handleRemoveSegment(idx)}
                      className="h-11 w-11 bg-[#ff0044] hover:bg-[#e0003c] text-white flex items-center justify-center shrink-0 transition-all cursor-pointer"
                      title="Remove Segment"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Full-width Vibrant Indigo Submit Button (Matching Exact Screenshot) */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
