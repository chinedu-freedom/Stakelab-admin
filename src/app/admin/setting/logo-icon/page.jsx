'use client';

import { useState, useEffect } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Upload, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../../../lib/api';

export default function AdminLogoFaviconPage() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLogoFavicon = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/logo-favicon');
      if (res.data && res.data.success && res.data.settings) {
        if (res.data.settings.logoUrl) setLogoPreview(res.data.settings.logoUrl);
        if (res.data.settings.faviconUrl) setFaviconPreview(res.data.settings.faviconUrl);
      }
    } catch (err) {
      console.error('Failed to load Logo & Favicon:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogoFavicon();
  }, []);

  const handleLogoUpload = (e) => {
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

  const handleFaviconUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result);
        toast.success('New favicon file selected.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await api.post('/admin/logo-favicon', {
        logoUrl: logoPreview,
        faviconUrl: faviconPreview,
      });

      if (res.data && res.data.success) {
        toast.success(res.data.message || 'Logo & Favicon updated successfully!');
      }
    } catch (err) {
      toast.error('Failed to update Logo & Favicon settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Logo & Favicon
        </h1>

        {/* Top Informational Alert Box */}
        <div className="bg-[#f0f4ff] border-l-4 border-[#5b5bf5] p-4 text-xs font-sans text-indigo-900 leading-relaxed rounded-r-xl shadow-sm">
          If the logo and favicon are not changed after you update from this page, please{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast.info('Browser cache clear instructed.');
            }}
            className="text-[#5b5bf5] underline font-bold"
          >
            clear the cache
          </a>{' '}
          from your browser. As we keep the filename the same after the update, it may show the old image for the cache. Usually, it works after clear the cache but if you still see the old logo or favicon, it may be caused by server level or network level caching. Please clear them too.
        </div>

        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 font-semibold flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#5b5bf5]" /> Loading Logo & Favicon settings...
          </div>
        ) : (
          /* Upload Container Grid */
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Left Column: Logo */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2 font-sans">
                    Logo
                  </label>
                  <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-white flex items-center justify-center p-8 min-h-[220px] shadow-sm">
                    {/* Logo Preview */}
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="max-h-24 object-contain" />
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gradient-to-r from-[#ff0044] to-[#fe780b] flex items-center justify-center text-white font-righteous font-bold text-xl shadow-md">
                          E
                        </div>
                        <span className="text-3xl font-extrabold tracking-tight font-sans text-[#091630]">
                          Ever<span className="text-[#5b5bf5]">Stake</span>
                        </span>
                      </div>
                    )}

                    {/* Round Floating Upload Button */}
                    <label className="absolute right-4 bottom-4 bg-[#5b5bf5] hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-105">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mt-2 font-sans">
                    Supported Files: <span className="font-bold text-slate-700">.png, .jpg, .jpeg.</span>
                  </p>
                </div>

                {/* Right Column: Favicon */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2 font-sans">
                    Favicon
                  </label>
                  <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-white flex items-center justify-center p-8 min-h-[220px] shadow-sm">
                    {/* Favicon Preview */}
                    {faviconPreview ? (
                      <img src={faviconPreview} alt="Favicon" className="max-h-20 object-contain" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#ff0044] to-[#fe780b] flex items-center justify-center text-white font-righteous font-bold text-2xl shadow-lg">
                        E
                      </div>
                    )}

                    {/* Round Floating Upload Button */}
                    <label className="absolute right-4 bottom-4 bg-[#5b5bf5] hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-105">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleFaviconUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mt-2 font-sans">
                    Supported Files: <span className="font-bold text-slate-700">.png, .jpg, .jpeg.</span>
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs tracking-wider transition-all shadow-md shadow-indigo-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      Submit <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminSidebarLayout>
  );
}
