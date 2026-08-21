'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Send, PhoneCall, Users, MessageSquare, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

import { useEffect } from 'react';
import api from '../../../../lib/api';

export default function AdminContactSupportLinksPage() {
  const [telegramSupport, setTelegramSupport] = useState('https://t.me/stakelab_official_support');
  const [whatsappSupport, setWhatsappSupport] = useState('https://wa.me/1234567890');
  const [telegramChannel, setTelegramChannel] = useState('https://t.me/stakelab_community_channel');
  const [telegramGroup, setTelegramGroup] = useState('https://t.me/stakelab_group_chat');
  const [whatsappGroupModal, setWhatsappGroupModal] = useState('https://chat.whatsapp.com/stakelab_vip_group');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get('/public/contact-links')
      .then((res) => {
        if (res.data.success && res.data.contactLinks) {
          const links = res.data.contactLinks;
          if (links.telegramSupport) setTelegramSupport(links.telegramSupport);
          if (links.whatsappSupport) setWhatsappSupport(links.whatsappSupport);
          if (links.telegramChannel) setTelegramChannel(links.telegramChannel);
          if (links.telegramGroup) setTelegramGroup(links.telegramGroup);
          if (links.whatsappGroupModal) setWhatsappGroupModal(links.whatsappGroupModal);
        }
      })
      .catch(() => null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/admin/settings/contact-links', {
        telegramSupport,
        whatsappSupport,
        telegramChannel,
        telegramGroup,
        whatsappGroupModal,
      });
      toast.success('Contact & WhatsApp support links updated successfully! Changes reflect live for all users.');
    } catch (err) {
      toast.error('Failed to update support links.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Contact & Support Links
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Telegram Support */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  Telegram Support Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={telegramSupport}
                    onChange={(e) => setTelegramSupport(e.target.value)}
                    placeholder="https://t.me/..."
                    className="w-full h-11 bg-white border border-slate-200 rounded-lg pl-3.5 pr-10 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
                  />
                  <Send className="w-4 h-4 text-sky-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* WhatsApp Support */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  WhatsApp Support Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={whatsappSupport}
                    onChange={(e) => setWhatsappSupport(e.target.value)}
                    placeholder="https://wa.me/..."
                    className="w-full h-11 bg-white border border-slate-200 rounded-lg pl-3.5 pr-10 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
                  />
                  <PhoneCall className="w-4 h-4 text-emerald-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Telegram Community Channel */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  Telegram Community Channel
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={telegramChannel}
                    onChange={(e) => setTelegramChannel(e.target.value)}
                    placeholder="https://t.me/..."
                    className="w-full h-11 bg-white border border-slate-200 rounded-lg pl-3.5 pr-10 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
                  />
                  <Users className="w-4 h-4 text-sky-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Telegram Group Chat */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  Telegram Group Chat
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={telegramGroup}
                    onChange={(e) => setTelegramGroup(e.target.value)}
                    placeholder="https://t.me/..."
                    className="w-full h-11 bg-white border border-slate-200 rounded-lg pl-3.5 pr-10 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
                  />
                  <MessageSquare className="w-4 h-4 text-sky-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* WhatsApp Group Link (Popup Modal) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
                  WhatsApp Group Link (Popup Modal)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={whatsappGroupModal}
                    onChange={(e) => setWhatsappGroupModal(e.target.value)}
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full h-11 bg-white border border-slate-200 rounded-lg pl-3.5 pr-10 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans shadow-sm"
                  />
                  <ExternalLink className="w-4 h-4 text-emerald-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
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
