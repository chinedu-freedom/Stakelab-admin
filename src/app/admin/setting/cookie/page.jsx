'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminGdprCookiePage() {
  const [isEnabled, setIsEnabled] = useState(true); // true = Enable (Green), false = Disabled (Red)
  const [shortDescription, setShortDescription] = useState(
    'We may use cookies or any other tracking technologies when you visit our website, including any other media form, mobile website, or mobile application related or connected to help customize the Site and improve your experience.'
  );

  const [fullDescription, setFullDescription] = useState(`
What information do we collect?
We gather data from you when you register on our site, submit a request, buy any services, react to an overview, or round out a structure. At the point when requesting any assistance or enrolling on our site, as suitable, you might be approached to enter your: name, email address, or telephone number. You may, nonetheless, visit our site anonymously.

How do we protect your information?
All provided delicate/credit data is sent through Stripe.
After an exchange, your private data (credit cards, social security numbers, financials, and so on) won't be put away on our workers.

Do we disclose any information to outside parties?
We don't sell, exchange, or in any case move to outside gatherings by and by recognizable data. This does exclude confided in outsiders who help us in working our site, leading our business, or adjusting you, since those gatherings consent to keep this data private. We may likewise deliver your data when we accept discharge is suitable to follow the law, implement our site strategies, or ensure our own or others' rights, property, or wellbeing.

Children's Online Privacy Protection Act Compliance
We are consistent with the prerequisites of COPPA (Children's Online Privacy Protection Act), we don't gather any data from anybody under 13 years old. Our site, items, and administrations are completely coordinated to individuals who are in any event 13 years of age or more established.

Changes to our Privacy Policy
If we decide to change our privacy policy, we will post those changes on this page.

How long we retain your information?
At the point when you register for our site, we cycle and keep your information we have about you however long you don't erase the record or withdraw yourself (subject to laws and guidelines).

What we don't do with your data
We don't and will never share, unveil, sell, or in any case give your information to different organizations for the promoting of their items or administrations.
  `.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shortDescription.trim()) {
      toast.error('Short description is required.');
      return;
    }
    toast.success('GDPR Cookie settings updated successfully!');
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          GDPR Cookie
        </h1>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Status Toggle Switch Bar (Matching Reference Screenshots 1) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 font-sans">
              Status
            </label>
            <button
              type="button"
              onClick={() => setIsEnabled(!isEnabled)}
              className={`w-64 h-11 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center cursor-pointer ${
                isEnabled
                  ? 'bg-[#22c55e] hover:bg-emerald-600 text-white'
                  : 'bg-[#ef4444] hover:bg-red-600 text-white'
              }`}
            >
              {isEnabled ? 'Enable' : 'Disabled'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Short Description Area (Matching Screenshot 1) */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2 font-sans">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              ></textarea>
            </div>

            {/* Description Rich Text Editor Area (Matching Screenshot 1, 2, 3, 4) */}
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
                <div className="p-4 min-h-[360px]">
                  <textarea
                    rows={16}
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    className="w-full text-xs text-slate-700 leading-relaxed focus:outline-none font-sans"
                  ></textarea>
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
