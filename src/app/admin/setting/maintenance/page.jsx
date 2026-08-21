'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Upload, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMaintenanceModePage() {
  // Enabled = Normal Site Running (Green), Disabled = Maintenance Mode Active (Red)
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false); // false = Enable (Normal), true = Disabled (Maintenance Active)
  const [imagePreview, setImagePreview] = useState('/images/maintenance.svg');
  const [headline, setHeadline] = useState('THE SITE IS UNDER MAINTENANCE');
  const [descriptionText, setDescriptionText] = useState(
    "We're just tuning up a few things. We apologize for the inconvenience but Front is currently undergoing planned maintenance.\nThanks for your patience."
  );

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      toast.success('Maintenance illustration uploaded.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: When Maintenance Mode is ACTIVATED (Disabled status), image and text MUST be present!
    if (isMaintenanceActive) {
      if (!headline.trim() || !descriptionText.trim()) {
        toast.error('Description text and heading are required when maintenance mode is active.');
        return;
      }
      if (!imagePreview) {
        toast.error('Maintenance illustration image is required when maintenance mode is active.');
        return;
      }
    }

    toast.success('Maintenance mode settings updated successfully!');
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Maintenance Mode
        </h1>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Status Toggle Switch Bar (Matching Reference Screenshots 1 & 2) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 font-sans">
              Status
            </label>
            <button
              type="button"
              onClick={() => setIsMaintenanceActive(!isMaintenanceActive)}
              className={`w-64 h-11 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center cursor-pointer ${
                !isMaintenanceActive
                  ? 'bg-[#22c55e] hover:bg-emerald-600 text-white'
                  : 'bg-[#ef4444] hover:bg-red-600 text-white'
              }`}
            >
              {!isMaintenanceActive ? 'Enable' : 'Disabled'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left Column: Image Upload Area (Matching Screenshot 1 & 2) */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 font-sans">
                  Image
                </label>
                <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-4 min-h-[260px]">
                  {/* SVG Illustration / Uploaded Image */}
                  <div className="w-full max-w-md h-56 flex flex-col items-center justify-center text-center">
                    <svg
                      className="w-full h-full text-indigo-500 max-h-48"
                      viewBox="0 0 400 240"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="400" height="240" rx="12" fill="#F3F4F6" />
                      <path d="M120 180 L180 80 L240 180 Z" fill="#3B82F6" opacity="0.8" />
                      <circle cx="280" cy="120" r="30" fill="#6366F1" opacity="0.7" />
                      <rect x="60" y="140" width="280" height="12" rx="6" fill="#10B981" />
                      <path d="M150 120 L210 120 L210 160 L150 160 Z" fill="#F59E0B" />
                    </svg>
                  </div>

                  {/* Round Upload Floating Button */}
                  <label className="absolute right-4 bottom-4 bg-[#5b5bf5] hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-105">
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold mt-2 font-sans">
                  Supported Files: <span className="font-bold text-slate-700">.png, .jpg, .jpeg</span>. Image will be resized into <span className="font-bold text-slate-700">660x325px</span>
                </p>
              </div>

              {/* Right Column: Description Rich Text Editor (Matching Screenshot 1 & 2) */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 font-sans">
                  Description
                </label>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {/* Rich Text Toolbar */}
                  <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold">
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-xs">
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-xs">
                      <Underline className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-xs">
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-xs">
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-xs">
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-xs">
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Editor Content Area */}
                  <div className="p-4 space-y-3 min-h-[220px]">
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="Maintenance Headline..."
                      className="w-full text-center font-bold text-red-600 text-sm focus:outline-none font-sans"
                    />
                    <textarea
                      rows={6}
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                      placeholder="Maintenance Description..."
                      className="w-full text-center text-xs text-slate-600 leading-relaxed focus:outline-none font-sans resize-none"
                    ></textarea>
                  </div>
                </div>
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
