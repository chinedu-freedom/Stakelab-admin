'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../components/AdminSidebarLayout';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import api from '../../../lib/api';
import {
  Users,
  UserCheck,
  Mail,
  Smartphone,
  ChevronRight,
  HandCoins,
  Loader2,
  XCircle,
  Percent,
  Wallet,
  Wrench,
  Calendar,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState({
    totalUsers: 1445,
    activeUsers: 1434,
    emailUnverified: 11,
    mobileUnverified: 1,
    totalDeposited: 144775.0,
    todaysDeposit: 4250.0,
    pendingDeposits: 48,
    rejectedDeposits: 1,
    depositCharge: 1489.75,
    depositChargeCount: 124,
    totalWithdrawn: 3560.0,
    pendingWithdrawals: 14,
    rejectedWithdrawals: 1,
    withdrawalCharge: 33.41,
  });

  useEffect(() => {
    api.get('/admin/stats').then((res) => {
      if (res.data.success && res.data.stats) {
        setStats((prev) => ({ ...prev, ...res.data.stats }));
      }
    }).catch(() => null);
  }, []);

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            Dashboard
          </h1>

          <button className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-3.5 py-1.5 rounded-md text-xs font-bold font-sans transition-all flex items-center gap-1.5 shadow-sm">
            <Wrench className="w-3.5 h-3.5" /> Cron Setup
          </button>
        </div>

        {/* Top 4 Stat Cards Row (Matching Image 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Users */}
          <Link
            href="/admin/users"
            className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-indigo-500 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">Total Users</div>
                <div className="text-xl font-bold text-slate-800 mt-0.5">
                  {stats.totalUsers}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Card 2: Active Users */}
          <Link
            href="/admin/users/active"
            className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">Active Users</div>
                <div className="text-xl font-bold text-slate-800 mt-0.5">
                  {stats.activeUsers}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Card 3: Email Unverified Users */}
          <Link
            href="/admin/users/email-unverified"
            className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-red-500 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">Email Unverified Users</div>
                <div className="text-xl font-bold text-slate-800 mt-0.5">
                  {stats.emailUnverified}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Card 4: Mobile Unverified Users */}
          <Link
            href="/admin/users/mobile-unverified"
            className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-sky-500 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">Mobile Unverified Users</div>
                <div className="text-xl font-bold text-slate-800 mt-0.5">
                  1
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Card 5: KYC Unverified Users */}
          <Link
            href="/admin/users/kyc-unverified"
            className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-amber-500 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">KYC Unverified Users</div>
                <div className="text-xl font-bold text-slate-800 mt-0.5">
                  14
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Middle 2 Large Cards (Deposits Summary & Withdrawals Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Box: Deposits Summary */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800 font-sans">
              Deposits
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total Deposited */}
              <Link
                href="/admin/deposits"
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-100/80 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <HandCoins className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      ₮{stats.totalDeposited.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-400">Total Deposited</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Today's Deposit */}
              <Link
                href="/admin/deposits"
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-100/80 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      ₮{stats.todaysDeposit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-400">Today's Deposit</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Pending Deposits */}
              <Link
                href="/admin/deposits/pending"
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-100/80 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{stats.pendingDeposits}</div>
                    <div className="text-[11px] text-slate-400">Pending Deposits</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Rejected Deposits */}
              <Link
                href="/admin/deposits/rejected"
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-100/80 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{stats.rejectedDeposits}</div>
                    <div className="text-[11px] text-slate-400">Rejected Deposits</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Deposited Charge */}
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      ₮{stats.depositCharge.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-400">Deposit Charge</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Deposit Charge Count */}
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{stats.depositChargeCount}</div>
                    <div className="text-[11px] text-slate-400">Deposit Charge Count</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Right Box: Withdrawals Summary */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800 font-sans">
              Withdrawals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/admin/withdrawals"
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-100/80 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      ₮{stats.totalWithdrawn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-400">Total Withdrawn</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/withdrawals/pending"
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-100/80 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{stats.pendingWithdrawals}</div>
                    <div className="text-[11px] text-slate-400">Pending Withdrawals</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/withdrawals/rejected"
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-100/80 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{stats.rejectedWithdrawals}</div>
                    <div className="text-[11px] text-slate-400">Rejected Withdrawals</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      ₮{stats.withdrawalCharge.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-400">Withdrawal Charge</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Reports Row (Deposit & Withdraw Report + Transactions Report) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deposit & Withdraw Report */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 font-sans">
                Deposit & Withdraw Report
              </h3>
              <div className="flex items-center space-x-1 bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-md cursor-pointer">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>August 7, 2026 – August 21, 2026</span>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-48 w-full flex items-end justify-between pt-6 px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                <defs>
                  <linearGradient id="depGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5b5bf5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#5b5bf5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,120 Q50,90 100,100 T200,40 T300,70 T400,20 L400,150 L0,150 Z"
                  fill="url(#depGrad)"
                />
                <path
                  d="M0,120 Q50,90 100,100 T200,40 T300,70 T400,20"
                  fill="none"
                  stroke="#5b5bf5"
                  strokeWidth="3"
                />
                <path
                  d="M0,140 Q50,130 100,120 T200,110 T300,100 T400,90"
                  fill="none"
                  stroke="#ff5252"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
            <div className="flex justify-center space-x-6 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" /> Deposits
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Withdrawals
              </span>
            </div>
          </div>

          {/* Transactions Report */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 font-sans">
                Transactions Report
              </h3>
              <div className="flex items-center space-x-1 bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-md cursor-pointer">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>August 7, 2026 – August 21, 2026</span>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="h-48 w-full flex items-end justify-between gap-3 pt-6 px-4">
              {[40, 65, 30, 85, 95, 60, 75, 50, 90, 100].map((val, idx) => (
                <div key={idx} className="flex-1 bg-slate-100 rounded-t h-full flex items-end">
                  <div
                    style={{ height: `${val}%` }}
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t hover:opacity-80 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 font-mono">
              <span>Aug 7</span>
              <span>Aug 11</span>
              <span>Aug 16</span>
              <span>Aug 21</span>
            </div>
          </div>
        </div>

        {/* Bottom 3 Doughnut / Pie Charts Row (Login By Browser, Login By OS, Login By Country - Image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Login By Browser (Last 30 days) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-center">
            <h3 className="text-xs font-bold text-slate-700 font-sans text-left">
              Login By Browser (Last 30 days)
            </h3>
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#5b5bf5"
                  strokeWidth="6"
                  strokeDasharray="76, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ff5252"
                  strokeWidth="6"
                  strokeDasharray="24, 100"
                  strokeDashoffset="-76"
                />
              </svg>
            </div>
            <div className="flex justify-center space-x-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5b5bf5]" /> Chrome (76%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5252]" /> Safari (24%)
              </span>
            </div>
          </div>

          {/* Login By OS (Last 30 days) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-center">
            <h3 className="text-xs font-bold text-slate-700 font-sans text-left">
              Login By OS (Last 30 days)
            </h3>
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ffb020"
                  strokeWidth="6"
                  strokeDasharray="48, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ff5252"
                  strokeWidth="6"
                  strokeDasharray="28, 100"
                  strokeDashoffset="-48"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#5b5bf5"
                  strokeWidth="6"
                  strokeDasharray="24, 100"
                  strokeDashoffset="-76"
                />
              </svg>
            </div>
            <div className="flex justify-center space-x-3 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb020]" /> Windows (48%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5252]" /> Android (28%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5b5bf5]" /> iOS (24%)
              </span>
            </div>
          </div>

          {/* Login By Country (Last 30 days) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-center">
            <h3 className="text-xs font-bold text-slate-700 font-sans text-left">
              Login By Country (Last 30 days)
            </h3>
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ff5252"
                  strokeWidth="6"
                  strokeDasharray="100, 100"
                />
              </svg>
            </div>
            <div className="flex justify-center text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5252]" /> United States (100%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
