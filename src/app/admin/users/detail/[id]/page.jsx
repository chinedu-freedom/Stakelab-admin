'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../../components/AdminSidebarLayout';
import {
  Wallet,
  Landmark,
  ArrowLeftRight,
  Layers,
  PlusCircle,
  MinusCircle,
  List,
  Ban,
  LogIn,
  Banknote,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { countries } from '../../../../../lib/countries';

export default function AdminUserDetailPage({ params }) {
  const resolvedParams = use(params);
  const userId = resolvedParams?.id || '1460';

  const [userData, setUserData] = useState({
    firstName: 'Chinedu',
    lastName: 'Afamefuna',
    username: 'Sparko',
    email: '[Email is protected for the demo]',
    dialCode: '+93',
    mobile: '8158051119',
    address: 'Edem Nru',
    city: 'Enugu',
    state: 'Enugu State',
    zipCode: '410002',
    country: 'Afghanistan',
    mainBalance: '₮0.00',
    walletBalanceUsdt: '₮0.00',
    deposits: '₮0.00',
    withdrawals: '₮0.00',
    transactions: '0',
    stakings: '0',
    emailVerified: true,
    mobileVerified: true,
    twoFaEnabled: false,
    kycVerified: true,
    banned: false,
  });

  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [balanceAction, setBalanceAction] = useState('add'); // 'add' | 'subtract'
  const [walletType, setWalletType] = useState('Main Balance');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [banModalOpen, setBanModalOpen] = useState(false);
  const [banReason, setBanReason] = useState('');

  // Reset Login Password Modal State
  const [resetLoginModalOpen, setResetLoginModalOpen] = useState(false);
  const [newLoginPass, setNewLoginPass] = useState('');
  const [confirmLoginPass, setConfirmLoginPass] = useState('');

  // Reset Withdrawal Password Modal State
  const [resetWithdrawalModalOpen, setResetWithdrawalModalOpen] = useState(false);
  const [newWithdrawalPass, setNewWithdrawalPass] = useState('');
  const [confirmWithdrawalPass, setConfirmWithdrawalPass] = useState('');

  // KYC Modal State
  const [kycModalOpen, setKycModalOpen] = useState(false);

  const handleResetLoginPasswordSubmit = (e) => {
    e.preventDefault();
    if (!newLoginPass || newLoginPass.length < 6) {
      toast.error('New login password must be at least 6 characters.');
      return;
    }
    if (newLoginPass !== confirmLoginPass) {
      toast.error('Passwords do not match.');
      return;
    }
    toast.success(`Login password for @${userData.username} has been reset successfully!`);
    setResetLoginModalOpen(false);
    setNewLoginPass('');
    setConfirmLoginPass('');
  };

  const handleResetWithdrawalPasswordSubmit = (e) => {
    e.preventDefault();
    if (!newWithdrawalPass || newWithdrawalPass.length < 4) {
      toast.error('New withdrawal PIN/password must be at least 4 digits/characters.');
      return;
    }
    if (newWithdrawalPass !== confirmWithdrawalPass) {
      toast.error('Withdrawal passwords do not match.');
      return;
    }
    toast.success(`Withdrawal PIN/password for @${userData.username} has been reset successfully!`);
    setResetWithdrawalModalOpen(false);
    setNewWithdrawalPass('');
    setConfirmWithdrawalPass('');
  };

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSelectCountry = (c) => {
    setUserData({
      ...userData,
      country: c.name,
      dialCode: c.dialCode,
    });
    setCountryDropdownOpen(false);
    setCountrySearch('');
  };

  const handleOpenBalanceModal = (actionType) => {
    setBalanceAction(actionType);
    setWalletType('Main Balance');
    setAmount('');
    setRemark('');
    setBalanceModalOpen(true);
  };

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please provide a positive amount.');
      return;
    }
    if (!remark) {
      toast.error('Remark is required.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const val = parseFloat(amount).toFixed(2);
      if (balanceAction === 'add') {
        toast.success(`Successfully added ₮${val} to ${userData.firstName}'s balance!`);
      } else {
        toast.success(`Successfully subtracted ₮${val} from ${userData.firstName}'s balance!`);
      }
      setSubmitting(false);
      setBalanceModalOpen(false);
    }, 600);
  };

  const handleBanSubmit = (e) => {
    e.preventDefault();
    if (!banReason) {
      toast.error('Ban reason is required.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setUserData({ ...userData, banned: true });
      toast.warning(`User ${userData.username} has been banned.`);
      setSubmitting(false);
      setBanModalOpen(false);
    }, 600);
  };

  const handleLoginAsUser = () => {
    toast.success(`Logging in as ${userData.username}... Opening User Dashboard.`);
    if (typeof window !== 'undefined') {
      localStorage.setItem('stakelab_token', 'impersonated_token_' + userId);
      const userPortalUrl = window.location.origin.includes('3001')
        ? 'http://localhost:3000/dashboard'
        : '/dashboard';
      window.open(userPortalUrl, '_blank');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast.success('User information updated successfully!');
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            User Detail - {userData.username}
          </h1>

          {/* Login as User Button */}
          <button
            type="button"
            onClick={handleLoginAsUser}
            className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-4 py-1.5 rounded-md text-xs font-bold font-sans transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-indigo-600" /> Login as User
          </button>
        </div>

        {/* Top 6 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Main Balance */}
          <Link
            href={`/admin/report/transaction/${userId}`}
            className="bg-[#3b5998] hover:bg-[#324b82] text-white p-5 rounded-xl shadow-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium opacity-90">Main Balance</div>
              <div className="text-xl font-bold font-righteous mt-1">
                {userData.mainBalance}
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Banknote className="w-5 h-5 text-white" />
            </div>
          </Link>

          {/* Card 2: Wallet Balance in USDT */}
          <Link
            href={`/admin/report/transaction/${userId}`}
            className="bg-[#0c1c38] hover:bg-[#12274d] text-white p-5 rounded-xl shadow-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium opacity-90">Wallet Balance in USDT</div>
              <div className="text-xl font-bold font-righteous mt-1">
                {userData.walletBalanceUsdt}
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Banknote className="w-5 h-5 text-white" />
            </div>
          </Link>

          {/* Card 3: Deposits */}
          <Link
            href={`/admin/deposits?user=${userId}`}
            className="bg-[#10b981] hover:bg-[#0ea5e9] text-white p-5 rounded-xl shadow-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium opacity-90">Deposits</div>
              <div className="text-xl font-bold font-righteous mt-1">
                {userData.deposits}
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </Link>

          {/* Card 4: Withdrawals */}
          <Link
            href={`/admin/withdrawals?user=${userId}`}
            className="bg-[#00695c] hover:bg-[#00574d] text-white p-5 rounded-xl shadow-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium opacity-90">Withdrawals</div>
              <div className="text-xl font-bold font-righteous mt-1">
                {userData.withdrawals}
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
          </Link>

          {/* Card 5: Transactions */}
          <Link
            href={`/admin/report/transaction/${userId}`}
            className="bg-[#6a1b9a] hover:bg-[#5c1688] text-white p-5 rounded-xl shadow-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium opacity-90">Transactions</div>
              <div className="text-xl font-bold font-righteous mt-1">
                {userData.transactions}
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>
          </Link>

          {/* Card 6: Stakings */}
          <Link
            href={`/admin/reports/staking?user=${userId}`}
            className="bg-[#e65100] hover:bg-[#cf4900] text-white p-5 rounded-xl shadow-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div>
              <div className="text-xs font-medium opacity-90">Stakings</div>
              <div className="text-xl font-bold font-righteous mt-1">
                {userData.stakings}
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
          </Link>
        </div>

        {/* Middle Action Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Button 1: + Balance */}
          <button
            type="button"
            onClick={() => handleOpenBalanceModal('add')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Balance
          </button>

          {/* Button 2: - Balance */}
          <button
            type="button"
            onClick={() => handleOpenBalanceModal('subtract')}
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-3 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <MinusCircle className="w-4 h-4" /> Balance
          </button>

          {/* Button 3: Reset Login Password */}
          <button
            type="button"
            onClick={() => setResetLoginModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-3 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Key className="w-4 h-4" /> Reset Login Pass
          </button>

          {/* Button 4: Reset Withdrawal Password */}
          <button
            type="button"
            onClick={() => setResetWithdrawalModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Lock className="w-4 h-4" /> Reset Withdraw Pass
          </button>

          {/* Button 5: Logins */}
          <Link
            href={`/admin/report/login/history?search=${userData.username}`}
            className="bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold text-xs py-3 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
          >
            <List className="w-4 h-4" /> Logins
          </Link>

          {/* Button 6: Ban User */}
          <button
            type="button"
            onClick={() => setBanModalOpen(true)}
            className={`font-bold text-xs py-3 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer text-white ${
              userData.banned
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#ffb020] hover:bg-amber-500'
            }`}
          >
            <Ban className="w-4 h-4" /> {userData.banned ? 'Unban User' : 'Ban User'}
          </button>
        </div>

        {/* Information Form Card Container */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 font-sans">
              Information of {userData.firstName} {userData.lastName}
            </h2>
            {/* Last Login & IP Address Security Badge */}
            <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-lg px-3.5 py-1.5 text-xs font-sans">
              <span className="font-semibold text-slate-600">Last Login:</span>
              <span className="font-bold text-slate-800 font-mono">21-Aug-2026 11:32 AM</span>
              <span className="text-indigo-300">|</span>
              <span className="font-semibold text-slate-600">IP:</span>
              <span className="font-bold text-[#5b5bf5] font-mono">102.90.81.60</span>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Row 2: Email & Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-indigo-500">
                  <div className="h-11 bg-slate-100 border-r border-slate-200 px-3.5 text-xs font-bold text-slate-600 flex items-center shrink-0">
                    {userData.dialCode}
                  </div>
                  <input
                    type="text"
                    required
                    value={userData.mobile}
                    onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                    className="w-full h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                Address
              </label>
              <input
                type="text"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Row 4: City, State, Zip/Postal, Country (4 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={userData.city}
                  onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  value={userData.state}
                  onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Zip/Postal
                </label>
                <input
                  type="text"
                  value={userData.zipCode}
                  onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Country Searchable Dropdown */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Country <span className="text-red-500">*</span>
                </label>

                {/* Dropdown Trigger Box */}
                <div
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans flex items-center justify-between cursor-pointer focus:ring-1 focus:ring-indigo-500 shadow-sm"
                >
                  <span className="font-semibold">{userData.country || 'Select Country'}</span>
                  {countryDropdownOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                {/* Searchable Dropdown Popover Box (Matching Exact Reference Screenshot) */}
                {countryDropdownOpen && (
                  <div className="absolute left-0 bottom-full mb-1 w-full bg-white border border-[#5b5bf5] rounded-xl shadow-2xl z-50 p-2 font-sans space-y-2 animate-in fade-in zoom-in-95 duration-150">
                    {/* Top Search Input Field */}
                    <input
                      type="text"
                      autoFocus
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder=""
                      className="w-full h-9 bg-white border border-slate-200 rounded-lg px-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />

                    {/* Scrollable Country List */}
                    <div className="max-h-48 overflow-y-auto no-scrollbar border-t border-slate-100 divide-y divide-slate-100 text-xs">
                      {filteredCountries.length === 0 ? (
                        <div className="p-3 text-center text-slate-400">No country found</div>
                      ) : (
                        filteredCountries.map((c) => (
                          <div
                            key={c.name}
                            onClick={() => handleSelectCountry(c)}
                            className={`px-3 py-2.5 hover:bg-slate-100 cursor-pointer font-medium transition-colors ${
                              userData.country === c.name
                                ? 'bg-slate-100 font-bold text-slate-900'
                                : 'text-slate-700'
                            }`}
                          >
                            {c.name}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Row 5: Verification Toggles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              {/* Email Verification */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Email Verification
                </label>
                <button
                  type="button"
                  onClick={() => setUserData({ ...userData, emailVerified: !userData.emailVerified })}
                  className={`w-full h-11 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-sm relative flex items-center justify-between px-2 overflow-hidden ${
                    userData.emailVerified ? 'bg-[#22c55e] hover:bg-[#16a34a]' : 'bg-[#ef4444] hover:bg-[#dc2626]'
                  }`}
                >
                  {!userData.emailVerified && (
                    <span className="w-2.5 h-7 rounded bg-[#061127] shadow-inner shrink-0" />
                  )}
                  <span className="flex-1 text-center font-bold text-white tracking-wide">
                    {userData.emailVerified ? 'Verified' : 'Unverified'}
                  </span>
                  {userData.emailVerified && (
                    <span className="w-2.5 h-7 rounded bg-[#061127] shadow-inner shrink-0" />
                  )}
                </button>
              </div>

              {/* Mobile Verification (Restored per Screenshot 3) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Mobile Verification
                </label>
                <button
                  type="button"
                  onClick={() => setUserData({ ...userData, mobileVerified: !userData.mobileVerified })}
                  className={`w-full h-11 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-sm relative flex items-center justify-between px-2 overflow-hidden ${
                    userData.mobileVerified ? 'bg-[#22c55e] hover:bg-[#16a34a]' : 'bg-[#ef4444] hover:bg-[#dc2626]'
                  }`}
                >
                  {!userData.mobileVerified && (
                    <span className="w-2.5 h-7 rounded bg-[#061127] shadow-inner shrink-0" />
                  )}
                  <span className="flex-1 text-center font-bold text-white tracking-wide">
                    {userData.mobileVerified ? 'Verified' : 'Unverified'}
                  </span>
                  {userData.mobileVerified && (
                    <span className="w-2.5 h-7 rounded bg-[#061127] shadow-inner shrink-0" />
                  )}
                </button>
              </div>

              {/* 2FA Verification */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  2FA Verification
                </label>
                <button
                  type="button"
                  onClick={() => setUserData({ ...userData, twoFaEnabled: !userData.twoFaEnabled })}
                  className={`w-full h-11 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-sm relative flex items-center justify-between px-2 overflow-hidden ${
                    userData.twoFaEnabled ? 'bg-[#22c55e] hover:bg-[#16a34a]' : 'bg-[#ef4444] hover:bg-[#dc2626]'
                  }`}
                >
                  {!userData.twoFaEnabled && (
                    <span className="w-2.5 h-7 rounded bg-[#061127] shadow-inner shrink-0" />
                  )}
                  <span className="flex-1 text-center font-bold text-white tracking-wide">
                    {userData.twoFaEnabled ? 'Enable' : 'Disable'}
                  </span>
                  {userData.twoFaEnabled && (
                    <span className="w-2.5 h-7 rounded bg-[#061127] shadow-inner shrink-0" />
                  )}
                </button>
              </div>

              {/* KYC Button (Matching Screenshot 3) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 font-sans">
                    KYC
                  </label>
                  <button
                    type="button"
                    onClick={() => setKycModalOpen(true)}
                    className="text-[11px] font-bold text-[#5b5bf5] hover:underline cursor-pointer"
                  >
                    KYC Data
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const nextStatus =
                      userData.kycStatus === 'verified'
                        ? 'unverified'
                        : userData.kycStatus === 'unverified'
                        ? 'pending'
                        : 'verified';
                    setUserData({ ...userData, kycStatus: nextStatus });
                    toast.info(`KYC status set to ${nextStatus.toUpperCase()}`);
                  }}
                  className={`w-full h-11 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-sm relative flex items-center justify-between px-2 overflow-hidden ${
                    userData.kycStatus === 'verified'
                      ? 'bg-[#22c55e] hover:bg-[#16a34a]'
                      : userData.kycStatus === 'pending'
                      ? 'bg-[#ffb020] hover:bg-amber-500'
                      : 'bg-[#ef4444] hover:bg-[#dc2626]'
                  }`}
                >
                  <span className="flex-1 text-center font-bold text-white tracking-wide uppercase">
                    {userData.kycStatus || 'Unverified'}
                  </span>
                </button>
              </div>
            </div>

            {/* Row 6: Full-width Vibrant Indigo Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Reset Login Password Modal */}
        {resetLoginModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  Reset Login Password
                </h3>
                <button
                  onClick={() => setResetLoginModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Set a new login password for @{userData.username}.
              </p>

              <form onSubmit={handleResetLoginPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                    New Login Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={newLoginPass}
                    onChange={(e) => setNewLoginPass(e.target.value)}
                    placeholder="Enter new password..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 h-11 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                    Confirm Login Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmLoginPass}
                    onChange={(e) => setConfirmLoginPass(e.target.value)}
                    placeholder="Confirm new password..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 h-11 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reset Withdrawal Password Modal */}
        {resetWithdrawalModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  Reset Withdrawal PIN / Password
                </h3>
                <button
                  onClick={() => setResetWithdrawalModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Set a new security withdrawal PIN/password for @{userData.username}.
              </p>

              <form onSubmit={handleResetWithdrawalPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                    New Withdrawal PIN/Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={newWithdrawalPass}
                    onChange={(e) => setNewWithdrawalPass(e.target.value)}
                    placeholder="Enter new PIN/password..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 h-11 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                    Confirm Withdrawal PIN/Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmWithdrawalPass}
                    onChange={(e) => setConfirmWithdrawalPass(e.target.value)}
                    placeholder="Confirm new PIN/password..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 h-11 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Balance / Subtract Balance Modal (Matching Exact Reference Screenshot 1 & 2) */}
        {balanceModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  {balanceAction === 'add' ? 'Add Balance' : 'Subtract Balance'}
                </h3>
                <button
                  onClick={() => setBalanceModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleBalanceSubmit} className="space-y-4">
                {/* Wallet Select Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                    Wallet
                  </label>
                  <select
                    value={walletType}
                    onChange={(e) => setWalletType(e.target.value)}
                    className="w-full h-11 bg-white border border-slate-200 rounded-lg px-3.5 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Main Balance">Main Balance (Available Wallet Balance)</option>
                    <option value="Staked Balance">Staked Balance (Active Staking Portfolio)</option>
                    <option value="Referral Earnings Balance">Referral Earnings Balance (Commission Wallet)</option>
                    <option value="Total Earned Profit Balance">Total Earned Profit Balance (Yield Earnings)</option>
                  </select>
                </div>

                {/* Amount Input Group with USDT Badge */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-indigo-500">
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Please provide positive amount"
                      className="w-full h-11 bg-transparent border-0 outline-none px-4 text-xs text-slate-800 font-sans placeholder-slate-400"
                    />
                    <div className="h-11 bg-slate-100 border-l border-slate-200 px-4 text-xs font-bold text-slate-600 flex items-center shrink-0 select-none">
                      USDT
                    </div>
                  </div>
                </div>

                {/* Remark Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                    Remark <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Provide reason for balance adjustment..."
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-sans placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Admin Security Password Field */}
                <div>
                  <label className="block text-xs font-bold text-amber-700 font-sans mb-1.5 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-600" /> Admin Security Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password to confirm..."
                    className="w-full h-11 bg-white border border-amber-300 rounded-lg px-3.5 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Submit Button (Vibrant Indigo Button) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {submitting ? 'Verifying & Submitting...' : 'Confirm Balance Adjustment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ban User Modal (Matching Exact Reference Screenshot 4) */}
        {banModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  Ban User
                </h3>
                <button
                  onClick={() => setBanModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                If you ban this user he/she won't able to access his/her dashboard.
              </p>

              <form onSubmit={handleBanSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    placeholder=""
                    className="w-full bg-white border border-slate-200 rounded-lg p-3.5 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* KYC Document Review Modal */}
        {kycModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
              <div className="bg-[#5b5bf5] text-white p-4 px-6 flex justify-between items-center">
                <h3 className="font-bold text-sm font-sans tracking-wide">
                  KYC Documents - {userData.username}
                </h3>
                <button
                  type="button"
                  onClick={() => setKycModalOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4 text-xs font-sans text-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 text-[11px] block">Document Type</span>
                    <span className="font-bold text-slate-800">National ID Card / Passport</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 text-[11px] block">KYC Status</span>
                    <span
                      className={`font-bold uppercase ${
                        userData.kycStatus === 'verified'
                          ? 'text-emerald-600'
                          : userData.kycStatus === 'pending'
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {userData.kycStatus || 'Unverified'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-bold text-slate-800 block">Submitted Verification Attachments</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-center space-y-1">
                      <div className="text-[10px] font-semibold text-slate-500">ID Front View</div>
                      <div className="text-indigo-600 font-bold underline text-[11px] cursor-pointer hover:text-indigo-800">
                        View Attachment 📷
                      </div>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-center space-y-1">
                      <div className="text-[10px] font-semibold text-slate-500">ID Back View</div>
                      <div className="text-indigo-600 font-bold underline text-[11px] cursor-pointer hover:text-indigo-800">
                        View Attachment 📷
                      </div>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-center space-y-1">
                      <div className="text-[10px] font-semibold text-slate-500">Selfie Holding ID</div>
                      <div className="text-indigo-600 font-bold underline text-[11px] cursor-pointer hover:text-indigo-800">
                        View Attachment 📸
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setUserData({ ...userData, kycStatus: 'verified' });
                      setKycModalOpen(false);
                      toast.success(`KYC Approved for ${userData.username}!`);
                    }}
                    className="flex-1 bg-[#22c55e] hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    Approve KYC
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserData({ ...userData, kycStatus: 'unverified' });
                      setKycModalOpen(false);
                      toast.error(`KYC Rejected for ${userData.username}.`);
                    }}
                    className="flex-1 bg-[#dc2626] hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    Reject KYC
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminSidebarLayout>
  );
}
