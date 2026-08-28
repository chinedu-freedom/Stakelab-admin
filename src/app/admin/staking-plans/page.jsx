'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../components/AdminSidebarLayout';
import { Plus, Edit, EyeOff, CheckCircle2, BarChart2, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../../lib/api';

import ConfirmModal from '../../../components/ConfirmModal';

export default function AdminStakingPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [segmentModalOpen, setSegmentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await api.get('/staking/plans');
      if (res.data && res.data.success && Array.isArray(res.data.plans)) {
        const formatted = res.data.plans.map((p) => {
          const minAmt = parseFloat(p.min_amount || 10);
          const maxAmt = parseFloat(p.max_amount || 5000);
          const dailyRate = parseFloat(p.daily_return_percent || 1.5);
          const step = Math.round((maxAmt - minAmt) / 3) || 100;

          let planStatus = 'Active';
          const rawSt = (p.status || p.badge || '').toUpperCase();
          if (rawSt === 'UNAVAILABLE' || rawSt === 'DISABLED' || p.is_active === false) {
            planStatus = 'Unavailable';
          } else if (rawSt === 'INACTIVE') {
            planStatus = 'Inactive';
          } else {
            planStatus = 'Active';
          }

          return {
            id: p.id,
            name: p.title,
            tier: p.tier || 'Flexible Tier',
            duration: `${p.duration_days} Days`,
            days: p.duration_days,
            status: planStatus,
            segments: [
              { range: `${minAmt.toLocaleString()} USDT – ${(minAmt + step).toLocaleString()} USDT`, rate: `${dailyRate.toFixed(2)}%` },
              { range: `${(minAmt + step + 1).toLocaleString()} USDT – ${(minAmt + step * 2).toLocaleString()} USDT`, rate: `${(dailyRate * 1.5).toFixed(2)}%` },
              { range: `${(minAmt + step * 2 + 1).toLocaleString()} USDT – ${maxAmt.toLocaleString()} USDT`, rate: `${(dailyRate * 2.0).toFixed(2)}%` },
            ],
          };
        });
        setPlans(formatted);
      }
    } catch (err) {
      console.error('Failed to load admin plans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenSegmentModal = (plan) => {
    setSelectedPlan(plan);
    setSegmentModalOpen(true);
  };

  const handleToggleStatus = async (id) => {
    const target = plans.find((p) => p.id === id);
    if (!target) return;

    const nextIsActive = target.status !== 'Active';
    const nextStatusText = nextIsActive ? 'Active' : 'Unavailable';

    try {
      await api.put(`/admin/staking-plans/${id}`, { is_active: nextIsActive });
      toast.success(`Plan "${target.name}" status updated to ${nextStatusText}!`);
      setPlans(plans.map((p) => (p.id === id ? { ...p, status: nextStatusText } : p)));
    } catch (err) {
      toast.error('Failed to update plan status');
    }
  };

  const handleDeletePlan = async () => {
    if (!deleteTarget) return;
    const { id, name } = deleteTarget;
    try {
      await api.delete(`/admin/staking-plans/${id}`);
      toast.success(`Plan "${name}" deleted successfully!`);
      setPlans(plans.filter((p) => p.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete plan');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Bar */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            Plan
          </h1>

          {/* + Add New Button */}
          <Link
            href="/admin/plan/manage"
            className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-xs font-bold font-sans transition-all flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-indigo-600" /> Add New
          </Link>
        </div>

        {/* Staking Plans Table Container (Horizontally Scrollable) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left border-collapse">
              {/* Vibrant Indigo / Purple Table Header */}
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-6 text-center">Tier</th>
                  <th className="py-3.5 px-6 text-center">Duration</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Name Column with Feature Rule Badges */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{plan.name}</div>
                      <div className="flex flex-wrap gap-1.5 mt-1 text-[10px] font-bold">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                          Fixed Deposit: YES
                        </span>
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                          Capital Return: YES
                        </span>
                        <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                          Compounding: YES
                        </span>
                      </div>
                    </td>

                    {/* Tier Column */}
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                          plan.tier === 'Dynamic Tier'
                            ? 'bg-purple-100 text-purple-700 border border-purple-300'
                            : 'bg-blue-100 text-blue-700 border border-blue-300'
                        }`}
                      >
                        {plan.tier}
                      </span>
                    </td>

                    {/* Duration Column */}
                    <td className="py-4 px-6 text-center font-medium text-slate-600">
                      {plan.duration}
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${
                          plan.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-300'
                        }`}
                      >
                        {plan.status}
                      </span>
                    </td>

                    {/* Action Column (Full Suite of Action Buttons) */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2 whitespace-nowrap">
                        {/* Edit Button */}
                        <Link
                          href={`/admin/plan/manage/${plan.id}`}
                          className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Link>

                        {/* Disable / Enable Button */}
                        <button
                          onClick={() => handleToggleStatus(plan.id)}
                          className={`border px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            plan.status === 'Active'
                              ? 'border-amber-500 text-amber-600 hover:bg-amber-50'
                              : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {plan.status === 'Active' ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Disable Plan
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Enable Plan
                            </>
                          )}
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteTarget({ id: plan.id, name: plan.name })}
                          className="border border-red-500 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeletePlan}
          title="Delete Staking Plan"
          description={`Are you sure you want to delete the "${deleteTarget?.name || ''}" staking plan? This action cannot be undone.`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
          isDanger={true}
        />
      </div>
    </AdminSidebarLayout>
  );
}
