'use client';

import { useState } from 'react';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import { Mail, Smartphone, Check, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import api from '../../../../lib/api';

export default function AdminSendNotificationPage() {
  const [channel, setChannel] = useState('email'); // 'email' | 'sms'
  const [beingSentTo, setBeingSentTo] = useState('All Users');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [startFormId, setStartFormId] = useState('1');
  const [perBatch, setPerBatch] = useState('100');
  const [coolingPeriod, setCoolingPeriod] = useState('2');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error('Subject and message content are required.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/admin/users/send-notification', {
        channel,
        target_users: beingSentTo,
        subject,
        message,
      });

      if (res.data.success) {
        toast.success(res.data.message || `Notification batch started via ${channel.toUpperCase()}!`);
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send notification batch');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Page Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          Notification to Verified Users
        </h1>

        {/* Channel Selection Box Tabs (Matching Reference Screenshot 1 & 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-md gap-4">
          {/* Option 1: Send Via Email */}
          <button
            type="button"
            onClick={() => setChannel('email')}
            className={`relative p-5 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
              channel === 'email'
                ? 'bg-white border-[#5b5bf5] ring-2 ring-[#5b5bf5]/20 shadow-md'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300'
            }`}
          >
            {channel === 'email' && (
              <div className="absolute top-0 right-0 bg-[#5b5bf5] text-white p-1 rounded-tr-xl rounded-bl-xl shadow-sm">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
            <Mail className={`w-6 h-6 ${channel === 'email' ? 'text-[#5b5bf5]' : 'text-slate-400'}`} />
            <span className={`text-xs font-bold font-sans ${channel === 'email' ? 'text-slate-800' : 'text-slate-500'}`}>
              Send Via Email
            </span>
          </button>

          {/* Option 2: Send Via SMS */}
          <button
            type="button"
            onClick={() => setChannel('sms')}
            className={`relative p-5 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
              channel === 'sms'
                ? 'bg-white border-[#5b5bf5] ring-2 ring-[#5b5bf5]/20 shadow-md'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300'
            }`}
          >
            {channel === 'sms' && (
              <div className="absolute top-0 right-0 bg-[#5b5bf5] text-white p-1 rounded-tr-xl rounded-bl-xl shadow-sm">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
            <Smartphone className={`w-6 h-6 ${channel === 'sms' ? 'text-[#5b5bf5]' : 'text-slate-400'}`} />
            <span className={`text-xs font-bold font-sans ${channel === 'sms' ? 'text-slate-800' : 'text-slate-500'}`}>
              Send Via SMS
            </span>
          </button>
        </div>

        {/* Main Notification Form Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Being Sent To */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                Being Sent To <span className="text-red-500">*</span>
              </label>
              <select
                value={beingSentTo}
                onChange={(e) => setBeingSentTo(e.target.value)}
                className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-sm"
              >
                <option value="All Users">All Users</option>
                <option value="Active Users">Active Users</option>
                <option value="Banned Users">Banned Users</option>
                <option value="Email Unverified">Email Unverified Users</option>
                <option value="Mobile Unverified">Mobile Unverified Users</option>
                <option value="KYC Unverified">KYC Unverified Users</option>
                <option value="KYC Pending">KYC Pending Users</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject / Title"
                className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            {/* Message with Rich Text Toolbar */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
                {/* Editor Formatting Toolbar */}
                <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-slate-600">
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700 font-bold" title="Bold">
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Italic">
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Underline">
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Strikethrough">
                    <Strikethrough className="w-3.5 h-3.5" />
                  </button>
                  <div className="h-4 w-px bg-slate-300 mx-1" />
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Align Left">
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Align Center">
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Align Right">
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="h-4 w-px bg-slate-300 mx-1" />
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Bullet List">
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Insert Link">
                    <LinkIcon className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-700" title="Insert Image">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Main Message Textarea */}
                <textarea
                  required
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your broadcast message content here..."
                  className="w-full p-4 text-xs text-slate-800 font-sans border-0 outline-none resize-none"
                />
              </div>
            </div>

            {/* Bottom 3 Inputs Grid (Start Form, Per Batch, Cooling Period) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Start Form */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Start Form <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={startFormId}
                  onChange={(e) => setStartFormId(e.target.value)}
                  placeholder="Start form user id. e.g. 1"
                  className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
                />
              </div>

              {/* Per Batch */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Per Batch <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
                  <input
                    type="number"
                    required
                    value={perBatch}
                    onChange={(e) => setPerBatch(e.target.value)}
                    placeholder="How many user"
                    className="w-full h-11 border-0 outline-none px-4 text-xs text-slate-800 font-sans"
                  />
                  <span className="bg-slate-100 border-l border-slate-200 px-4 h-11 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                    User
                  </span>
                </div>
              </div>

              {/* Cooling Period */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-sans mb-1.5">
                  Cooling Period <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
                  <input
                    type="number"
                    required
                    value={coolingPeriod}
                    onChange={(e) => setCoolingPeriod(e.target.value)}
                    placeholder="Waiting time"
                    className="w-full h-11 border-0 outline-none px-4 text-xs text-slate-800 font-sans"
                  />
                  <span className="bg-slate-100 border-l border-slate-200 px-4 h-11 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                    Seconds
                  </span>
                </div>
              </div>
            </div>

            {/* Full-width Vibrant Indigo Submit Button (Matching Screenshot 2) */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending Batch Notifications
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
