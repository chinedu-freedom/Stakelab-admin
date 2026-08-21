'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Upload, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminGeneralSettingPage() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [siteTitle, setSiteTitle] = useState('StakeLab');
  const [currency] = useState('USDT');
  const [currencySymbol] = useState('$');
  const [timezone, setTimezone] = useState('UTC');
  const [registrationBonus, setRegistrationBonus] = useState('10.00');

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      toast.success('Logo preview updated.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!siteTitle.trim()) {
      toast.error('Site Title is required.');
      return;
    }
    toast.success('General settings saved successfully!');
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          General Setting
        </h1>

        {/* Setting Form Container (Matching Reference Screenshot 1) */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Preview & Upload Section */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2 font-sans">
                Site Logo Preview
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
                <div className="h-16 px-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-sm">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="max-h-12 object-contain" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                        <path
                          d="M12 36C18 36 22 32 22 26C22 20 16 18 10 16C4 14 2 10 2 6C2 2 6 0 12 0"
                          stroke="url(#g_logo)"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M16 12L24 4M24 20L32 12M32 28L40 20"
                          stroke="#EF4444"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="g_logo" x1="0" y1="0" x2="48" y2="48">
                            <stop stopColor="#F97316" />
                            <stop offset="1" stopColor="#EF4444" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="text-2xl font-black text-[#EF4444] font-sans">StakeLab</span>
                    </div>
                  )}
                </div>

                <label className="bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm">
                  <Upload className="w-4 h-4 text-white" /> Change Logo
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Inputs Grid (Matching Screenshot 1 Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Site Title * */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  Site Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-3.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
                />
              </div>

              {/* Currency */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  Currency
                </label>
                <input
                  type="text"
                  readOnly
                  value={currency}
                  className="w-full h-11 bg-slate-100 border border-slate-200 rounded-lg px-3.5 text-xs text-slate-500 font-bold font-sans cursor-not-allowed"
                />
              </div>

              {/* Currency Symbol */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  readOnly
                  value={currencySymbol}
                  className="w-full h-11 bg-slate-100 border border-slate-200 rounded-lg px-3.5 text-xs text-slate-500 font-bold font-sans cursor-not-allowed"
                />
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  Timezone
                </label>
                <div className="relative">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full h-11 bg-white border border-slate-200 rounded-lg px-3.5 pr-8 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-sans shadow-sm"
                  >
                    <option value="UTC">UTC</option>
                    <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Registration Bonus */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  Registration Bonus (USDT)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={registrationBonus}
                    onChange={(e) => setRegistrationBonus(e.target.value)}
                    placeholder="0.00"
                    className="w-full h-11 bg-white border border-slate-200 rounded-lg pl-3.5 pr-14 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
                    USDT
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button (Full Width Indigo Button - Matching Screenshot 1) */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
