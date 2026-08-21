'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogoFaviconPage() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      toast.success('New logo file selected.');
    }
  };

  const handleFaviconUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaviconPreview(url);
      toast.success('New favicon file selected.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Logo & Favicon updated successfully!');
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Logo & Favicon
        </h1>

        {/* Top Informational Alert Box (Matching Reference Screenshot) */}
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

        {/* Upload Container Grid (Matching Reference Screenshot) */}
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
                      {/* StakeLab Custom Logo SVG (Matching Screenshot) */}
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path
                          d="M12 36C18 36 22 32 22 26C22 20 16 18 10 16C4 14 2 10 2 6C2 2 6 0 12 0"
                          stroke="url(#logo_grad)"
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
                          <linearGradient id="logo_grad" x1="0" y1="0" x2="48" y2="48">
                            <stop stopColor="#F97316" />
                            <stop offset="1" stopColor="#EF4444" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="text-4xl font-extrabold tracking-tight font-sans text-[#EF4444]">
                        Lab
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
                    <div className="flex items-center justify-center">
                      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
                        <path
                          d="M12 36C18 36 22 32 22 26C22 20 16 18 10 16C4 14 2 10 2 6C2 2 6 0 12 0"
                          stroke="url(#fav_grad)"
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
                          <linearGradient id="fav_grad" x1="0" y1="0" x2="48" y2="48">
                            <stop stopColor="#F97316" />
                            <stop offset="1" stopColor="#EF4444" />
                          </linearGradient>
                        </defs>
                      </svg>
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
                className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs tracking-wider transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
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
