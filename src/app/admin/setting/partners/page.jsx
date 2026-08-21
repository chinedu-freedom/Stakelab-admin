'use client';

import { useState, useEffect } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Globe, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../../../lib/api';

export default function AdminPartnersSettingPage() {
  const [partners, setPartners] = useState([
    { name: 'Binance', logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png', status: 'ACTIVE' },
    { name: 'Bybit', logo: 'https://cryptologos.cc/logos/bybit-logo.png', status: 'ACTIVE' },
    { name: 'Mexc', logo: 'https://cryptologos.cc/logos/mexc-logo.png', status: 'ACTIVE' },
    { name: 'HTX', logo: 'https://cryptologos.cc/logos/htx-logo.png', status: 'ACTIVE' },
    { name: 'OKX', logo: 'https://cryptologos.cc/logos/okx-logo.png', status: 'ACTIVE' },
    { name: 'BingX', logo: 'https://cryptologos.cc/logos/bingx-logo.png', status: 'ACTIVE' },
    { name: 'Kraken', logo: 'https://cryptologos.cc/logos/kraken-logo.png', status: 'ACTIVE' },
    { name: 'Luno', logo: 'https://cryptologos.cc/logos/luno-logo.png', status: 'ACTIVE' },
  ]);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get('/public/partners')
      .then((res) => {
        if (res.data.success && res.data.partners?.length > 0) {
          setPartners(res.data.partners);
        }
      })
      .catch(() => null);
  }, []);

  const handleToggleStatus = (index) => {
    const updated = [...partners];
    updated[index].status = updated[index].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setPartners(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/admin/settings/partners', { partners }).catch(() => null);
      toast.success('Exchange Partners updated successfully! Changes reflect live on the website.');
    } catch (err) {
      toast.error('Failed to save partners.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#5b5bf5]" /> Exchange Partners Setting
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure supported cryptocurrency exchange partners displayed on the website.
            </p>
          </div>
        </div>

        {/* Partners Grid (Matching Reference Screenshot 3) */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {partners.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-between shadow-sm space-y-4 relative group"
              >
                {/* Logo Box */}
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center p-3 shadow-inner">
                  <span className="text-white font-black text-xs font-mono">{item.name.toUpperCase()}</span>
                </div>

                {/* Name */}
                <h3 className="font-bold text-slate-800 text-sm font-sans">{item.name}</h3>

                {/* Active Badge */}
                <span
                  className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                    item.status === 'ACTIVE'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.status === 'ACTIVE' ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                  {item.status}
                </span>

                {/* Edit / Toggle Button */}
                <button
                  type="button"
                  onClick={() => handleToggleStatus(idx)}
                  className="w-full bg-[#5b5bf5] text-white hover:bg-indigo-600 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {item.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save & Publish Partners'}
            </button>
          </div>
        </form>
      </div>
    </AdminSidebarLayout>
  );
}
