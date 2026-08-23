'use client';

import { useState, useEffect } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Upload, ChevronDown, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../../../lib/api';

export default function AdminGeneralSettingPage() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [siteTitle, setSiteTitle] = useState('EverStake');
  const [currency] = useState('USDT');
  const [currencySymbol] = useState('$');
  const [timezone, setTimezone] = useState('UTC');
  const [registrationBonus, setRegistrationBonus] = useState('10.00');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/general-setting');
      if (res.data && res.data.success && res.data.settings) {
        const s = res.data.settings;
        if (s.siteTitle) setSiteTitle(s.siteTitle);
        if (s.timezone) setTimezone(s.timezone);
        if (s.registrationBonus !== undefined) setRegistrationBonus(String(s.registrationBonus));
        if (s.logoUrl) setLogoPreview(s.logoUrl);
      }
    } catch (err) {
      console.error('Failed to load general settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        toast.success('New logo file selected.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!siteTitle.trim()) {
      toast.error('Site Title is required.');
      return;
    }

    try {
      setSaving(true);
      const res = await api.post('/admin/general-setting', {
        siteTitle,
        timezone,
        registrationBonus: parseFloat(registrationBonus || 0),
        logoUrl: logoPreview,
      });

      if (res.data && res.data.success) {
        toast.success(res.data.message || 'General settings saved successfully!');
      }
    } catch (err) {
      toast.error('Failed to save general settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          General Setting
        </h1>

        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 font-semibold flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#5b5bf5]" /> Loading settings...
          </div>
        ) : (
          /* Setting Form Container */
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
                        <div className="w-7 h-7 rounded bg-gradient-to-r from-[#ff0044] to-[#fe780b] flex items-center justify-center text-white font-righteous font-bold text-sm shadow-md">
                          E
                        </div>
                        <span className="text-xl font-extrabold text-[#091630] font-sans">
                          Ever<span className="text-[#5b5bf5]">Stake</span>
                        </span>
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

              {/* Inputs Grid */}
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

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminSidebarLayout>
  );
}
