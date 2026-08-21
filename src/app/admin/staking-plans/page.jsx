'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../components/AdminSidebarLayout';
import { Plus, Edit, EyeOff, CheckCircle2, BarChart2, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminStakingPlansPage() {
  const [plans, setPlans] = useState([
    {
      id: '1',
      name: 'Silver',
      duration: '30 Days',
      days: 30,
      status: 'Active',
      segments: [
        { range: '10.00 USDT – 100.00 USDT', rate: '15.00%' },
        { range: '101.00 USDT – 250.00 USDT', rate: '30.00%' },
        { range: '251.00 USDT – 500.00 USDT', rate: '50.00%' },
      ],
    },
    {
      id: '2',
      name: 'Golden',
      duration: '90 Days',
      days: 90,
      status: 'Active',
      segments: [
        { range: '100.00 USDT – 500.00 USDT', rate: '20.00%' },
        { range: '501.00 USDT – 1000.00 USDT', rate: '40.00%' },
        { range: '1001.00 USDT – 5000.00 USDT', rate: '65.00%' },
      ],
    },
    {
      id: '3',
      name: 'Platinum',
      duration: '180 Days',
      days: 180,
      status: 'Active',
      segments: [
        { range: '500.00 USDT – 2000.00 USDT', rate: '30.00%' },
        { range: '2001.00 USDT – 5000.00 USDT', rate: '55.00%' },
        { range: '5001.00 USDT – 20000.00 USDT', rate: '85.00%' },
      ],
    },
  ]);

  const [segmentModalOpen, setSegmentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenSegmentModal = (plan) => {
    setSelectedPlan(plan);
    setSegmentModalOpen(true);
  };

  const handleToggleStatus = (id) => {
    setPlans(
      plans.map((p) => {
        if (p.id === id) {
          const nextStatus =
            p.status === 'Active'
              ? 'Coming Soon'
              : p.status === 'Coming Soon'
              ? 'Unavailable'
              : 'Active';
          toast.success(
            `Plan "${p.name}" status updated to ${nextStatus}. Existing investor profits continue normally!`
          );
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            Plan
          </h1>

          {/* + Add New Button */}
          <Link
            href="/admin/plan/manage"
            className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-xs font-bold font-sans transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-indigo-600" /> Add New
          </Link>
        </div>

        {/* Staking Plans Table Container (Matching Exact Reference Screenshot) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Vibrant Indigo / Purple Table Header */}
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Name</th>
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
                            : plan.status === 'Coming Soon'
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-300'
                        }`}
                      >
                        {plan.status}
                      </span>
                    </td>

                    {/* Action Column (3 Outline Buttons) */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* Edit Button */}
                        <Link
                          href={`/admin/plan/manage/${plan.id}`}
                          className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Link>

                        {/* Status Cycle Button */}
                        <button
                          onClick={() => handleToggleStatus(plan.id)}
                          className={`border px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            plan.status === 'Active'
                              ? 'border-amber-500 text-amber-600 hover:bg-amber-50'
                              : plan.status === 'Coming Soon'
                              ? 'border-slate-400 text-slate-600 hover:bg-slate-50'
                              : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {plan.status === 'Active' ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Set Coming Soon
                            </>
                          ) : plan.status === 'Coming Soon' ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Set Unavailable
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Make Active
                            </>
                          )}
                        </button>

                        {/* Segment Button */}
                        <button
                          onClick={() => handleOpenSegmentModal(plan)}
                          className="border border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <BarChart2 className="w-3.5 h-3.5" /> Segment
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staking Segment Popup Modal (Matching Exact Reference Screenshot) */}
        {segmentModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
              {/* Modal Header Bar */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  Staking Segment
                </h3>
                <button
                  onClick={() => setSegmentModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Segment Table */}
              <div className="p-6">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                      <th className="py-2.5 px-2">Range</th>
                      <th className="py-2.5 px-2 text-right">Interest Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedPlan?.segments?.map((seg, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 px-2 font-bold text-slate-800">
                          {seg.range}
                        </td>
                        <td className="py-3 px-2 font-bold text-slate-600 text-right">
                          {seg.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminSidebarLayout>
  );
}
