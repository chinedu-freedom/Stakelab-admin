'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard,
  DollarSign,
  Coins,
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  Headphones,
  LifeBuoy,
  FileText,
  Share2,
  Settings,
  MoreHorizontal,
  FileCheck,
  Search,
  Globe,
  Bell,
  Wrench,
  UserCheck,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

export default function AdminSidebarLayout({ children }) {
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Currency', path: '/admin/currency', icon: DollarSign },
    { label: 'Staking Plan', path: '/admin/staking-plans', icon: Coins },
    {
      label: 'Manage Users',
      icon: Users,
      badge: '!',
      matchPath: '/admin/users',
      submenu: [
        { label: 'Active Users', path: '/admin/users/active' },
        { label: 'Banned Users', path: '/admin/users/banned' },
        { label: 'Email Unverified', path: '/admin/users/email-unverified', countBadge: '11' },
        { label: 'Mobile Unverified', path: '/admin/users/mobile-unverified', countBadge: '1' },
        { label: 'KYC Unverified', path: '/admin/users/kyc-unverified', countBadge: '14' },
        { label: 'KYC Pending', path: '/admin/users/kyc-pending', countBadge: '2' },
        { label: 'With Balance', path: '/admin/users/with-balance' },
        { label: 'All Users', path: '/admin/users' },
        { label: 'Send Notification', path: '/admin/users/send-notification' },
      ],
    },
    {
      label: 'Deposits',
      icon: ArrowDownLeft,
      badge: '!',
      matchPath: '/admin/deposit',
      submenu: [
        { label: 'Pending Deposits', path: '/admin/deposits/pending', countBadge: '48' },
        { label: 'Approved Deposits', path: '/admin/deposits/approved' },
        { label: 'Successful Deposits', path: '/admin/deposits/successful' },
        { label: 'Rejected Deposits', path: '/admin/deposits/rejected' },
        { label: 'Initiated Deposits', path: '/admin/deposits/initiated' },
        { label: 'All Deposits', path: '/admin/deposits' },
      ],
    },
    {
      label: 'Withdrawals',
      icon: ArrowUpRight,
      badge: '!',
      matchPath: '/admin/withdraw',
      submenu: [
        { label: 'Pending Withdrawals', path: '/admin/withdrawals/pending', countBadge: '14' },
        { label: 'Approved Withdrawals', path: '/admin/withdrawals/approved' },
        { label: 'Rejected Withdrawals', path: '/admin/withdrawals/rejected' },
        { label: 'All Withdrawals', path: '/admin/withdrawals' },
      ],
    },
    {
      label: 'Support Ticket',
      icon: LifeBuoy,
      badge: '!',
      matchPath: '/admin/ticket',
      submenu: [
        { label: 'Pending Ticket', path: '/admin/tickets/pending', countBadge: '23' },
        { label: 'Closed Ticket', path: '/admin/tickets/closed' },
        { label: 'Answered Ticket', path: '/admin/tickets/answered' },
        { label: 'All Ticket', path: '/admin/tickets' },
      ],
    },
    {
      label: 'Report',
      icon: FileText,
      matchPath: '/admin/report',
      submenu: [
        { label: 'Transaction History', path: '/admin/reports/transactions' },
        { label: 'Staking History', path: '/admin/reports/staking' },
        { label: 'Login History', path: '/admin/reports/logins' },
      ],
    },
    { label: 'Manage Referral', path: '/admin/referral', icon: Share2 },
    { label: 'System Setting', path: '/admin/settings', icon: Settings },
    {
      label: 'Extra',
      icon: MoreHorizontal,
      submenu: [
        { label: 'Spin Wheel', path: '/admin/extra/spin' },
        { label: 'Daily Check-in', path: '/admin/extra/daily-checkin' },
        { label: 'Tasks & Rewards', path: '/admin/extra/tasks' },
        { label: 'Gift Bonus', path: '/admin/extra/gift-bonus' },
        { label: 'Application System', path: '/admin/extra/system' },
        { label: 'Clear Cache', path: '/admin/extra/cache' },
      ],
    },
    { label: 'Report & Request', path: '/admin/requests', icon: FileCheck },
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#f3f5f9] text-slate-800 font-sans flex flex-col">
      {/* Top Header Navbar */}
      <header className="h-16 bg-[#091630] text-white shrink-0 z-40 px-4 sm:px-6 flex items-center justify-between shadow-md">
        {/* Left Side: Mobile Menu Button & Search Bar */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md focus:outline-none"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Search Box */}
          <div className="relative hidden sm:block w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search here.."
              className="w-full bg-[#122347] border border-[#1e3463] rounded-md pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Right Side: Header Quick Icons & Admin User Profile */}
        <div className="flex items-center space-x-4">
          {/* Header Action Icons */}
          <button className="text-slate-300 hover:text-white transition-colors" title="Language / Globe">
            <Globe className="w-4 h-4" />
          </button>

          <button className="relative text-slate-300 hover:text-white transition-colors" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#ff0044] text-white text-[9px] font-bold px-1 py-0.2 rounded-full">
              9+
            </span>
          </button>

          <button className="text-slate-300 hover:text-white transition-colors" title="Tools">
            <Wrench className="w-4 h-4" />
          </button>

          {/* Admin Profile Pill Dropdown */}
          <div
            onClick={logout}
            className="flex items-center space-x-2 bg-[#122347] hover:bg-[#1a305e] px-3 py-1.5 rounded-full border border-[#1e3463] cursor-pointer transition-all"
            title="Click to Log Out"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white">admin</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </header>

      {/* Main Split Layout: Left Sidebar & Content Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Drawer */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#091630] border-r border-[#142343] text-slate-300 transform transition-transform duration-300 ease-in-out flex flex-col justify-between h-full overflow-y-auto no-scrollbar shrink-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div>
            {/* Top Sidebar Brand Logo */}
            <div className="h-16 px-6 flex items-center border-b border-[#142343]">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-gradient-to-r from-[#ff0044] to-[#fe780b] flex items-center justify-center font-righteous text-white font-bold text-lg shadow-md">
                  S
                </div>
                <span className="text-xl font-extrabold text-white font-righteous tracking-wide">
                  Stake<span className="text-gradient-stakelab">Lab</span>
                </span>
              </Link>
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                const hasSubmenu = Boolean(item.submenu);
                const isSubOpen = openSubmenu === item.label;

                if (hasSubmenu) {
                  return (
                    <div key={item.label} className="space-y-1">
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                          pathname.startsWith(item.path || '')
                            ? 'text-white bg-[#122347]'
                            : 'text-slate-300 hover:text-white hover:bg-[#122347]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="w-5 h-5 rounded-md bg-[#ffaa00] text-slate-900 font-black text-[11px] flex items-center justify-center shadow-sm ml-auto">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ml-2 ${
                            isSubOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Submenu Dropdown Items */}
                      {isSubOpen && (
                        <div className="pl-6 pr-2 space-y-1 py-1">
                          {item.submenu.map((sub) => {
                            const isSubActive = pathname === sub.path;
                            return (
                              <Link
                                key={sub.path}
                                href={sub.path}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between py-2 px-3.5 rounded-lg text-xs font-medium transition-all ${
                                  isSubActive
                                    ? 'bg-[#5b5bf5] text-white font-bold shadow-md'
                                    : 'text-slate-400 hover:text-white hover:bg-[#122347]'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                                  <span>{sub.label}</span>
                                </div>
                                {sub.countBadge && (
                                  <span className="bg-[#38bdf8] text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                                    {sub.countBadge}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all ${
                      isActive
                        ? 'bg-[#5b5bf5] text-white shadow-md font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-[#122347]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Footer Label */}
          <div className="p-4 border-t border-[#142343] text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              STAKELAB V2.0.1
            </span>
          </div>
        </aside>

        {/* Backdrop overlay for mobile drawer */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 bg-[#f3f5f9] p-4 sm:p-6 lg:p-8 h-full overflow-y-auto no-scrollbar text-slate-800">
          {children}
        </main>
      </div>
    </div>
  );
}
