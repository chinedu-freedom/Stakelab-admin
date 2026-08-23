'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../../components/AdminSidebarLayout';
import { ArrowLeft, Plus, X, Trash2, Reply, Paperclip, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../../../../lib/api';

export default function AdminTicketViewPage({ params }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : (params || {});
  const ticketId = resolvedParams?.id;

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [ticketStatus, setTicketStatus] = useState('OPEN');
  const [replyMessage, setReplyMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const fetchTicketDetails = async () => {
    if (!ticketId) return;
    try {
      setLoading(true);
      const res = await api.get(`/admin/tickets/${ticketId}`);
      if (res.data.success) {
        setTicket(res.data.ticket);
        setMessages(res.data.ticket.messages || []);
        setTicketStatus(res.data.ticket.status || 'OPEN');
      }
    } catch (err) {
      console.error('Failed to fetch admin ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  // Handle adding an attachment input row
  const handleAddAttachment = () => {
    if (attachments.length >= 5) {
      toast.error('Maximum 5 files can be uploaded.');
      return;
    }
    setAttachments([...attachments, { id: Date.now(), file: null }]);
  };

  // Handle removing attachment input row
  const handleRemoveAttachment = (id) => {
    setAttachments(attachments.filter((a) => a.id !== id));
  };

  // Handle file change
  const handleFileChange = (id, file) => {
    setAttachments(
      attachments.map((a) => (a.id === id ? { ...a, file } : a))
    );
  };

  // Handle Submit Reply
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      toast.error('Please enter a reply message.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post(`/admin/tickets/${ticketId}/reply`, {
        message: replyMessage,
      });

      if (res.data.success) {
        toast.success('Support ticket reply submitted successfully!');
        setReplyMessage('');
        setAttachments([]);
        setTicketStatus('REPLIED');
        fetchTicketDetails();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit reply');
    } finally {
      setSubmitting(false);
    }
  };

  // Confirm Close Ticket
  const handleConfirmCloseTicket = async () => {
    try {
      const res = await api.post(`/admin/tickets/${ticketId}/close`);
      if (res.data.success) {
        setTicketStatus('CLOSED');
        setCloseModalOpen(false);
        toast.warning('Support ticket closed successfully.');
        fetchTicketDetails();
      }
    } catch (err) {
      toast.error('Failed to close ticket');
    }
  };

  // Confirm Delete Message
  const handleConfirmDeleteMessage = () => {
    if (selectedMessageId) {
      setMessages(messages.filter((m) => m.id !== selectedMessageId));
      toast.error('Message deleted successfully.');
    }
    setDeleteModalOpen(false);
    setSelectedMessageId(null);
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            Reply Ticket
          </h1>

          <Link
            href="/admin/tickets/pending"
            className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-1.5 rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
        </div>

        {/* Main Ticket Reply Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Ticket Title & Status Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  ticketStatus === 'Open'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-300'
                    : ticketStatus === 'Answered'
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300'
                    : 'bg-red-50 text-red-600 border-red-300'
                }`}
              >
                {ticketStatus}
              </span>
              <h2 className="text-sm font-bold text-slate-800 font-sans">
                {ticket ? `[Ticket#${ticket.ticket_id || ticketId}] ${ticket.subject}` : `[Ticket#${ticketId}] Loading ticket...`}
              </h2>
            </div>

            {ticketStatus !== 'Closed' && (
              <button
                type="button"
                onClick={() => setCloseModalOpen(true)}
                className="bg-[#dc2626] hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" /> Close Ticket
              </button>
            )}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <div>
              <textarea
                rows={5}
                required
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Enter reply here"
                className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 font-sans placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Dynamic Attachment Inputs */}
            {attachments.length > 0 && (
              <div className="space-y-3">
                {attachments.map((att) => (
                  <div key={att.id} className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white max-w-md w-full shadow-sm">
                      <label className="bg-slate-100 border-r border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-200 shrink-0">
                        Choose file
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileChange(att.id, e.target.files[0])}
                        />
                      </label>
                      <span className="px-3 text-xs text-slate-500 truncate">
                        {att.file ? att.file.name : 'No file chosen'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(att.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all shrink-0 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Attachment Button & Notice */}
            <div>
              <button
                type="button"
                onClick={handleAddAttachment}
                className="bg-[#091630] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" /> Add Attachment
              </button>
              <p className="text-[11px] text-[#5b5bf5] font-semibold mt-2">
                Max 5 files can be uploaded | Maximum upload size is 256MB | Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx
              </p>
            </div>

            {/* Submit Reply Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting
                  </>
                ) : (
                  <>
                    <Reply className="w-4 h-4" /> Reply
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Interactive Messages List Card Thread */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            {messages.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-semibold">No messages in this ticket thread yet.</div>
            ) : (
              messages.map((msg) => {
                const isAdminMsg = msg.sender_type === 'ADMIN';
                const formattedDate = msg.created_at ? new Date(msg.created_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Recently';

                return (
                  <div
                    key={msg.id}
                    className={`rounded-xl p-5 border space-y-3 relative shadow-sm transition-all ${
                      isAdminMsg
                        ? 'bg-[#fdfcf5] border-amber-200/80'
                        : 'bg-white border-indigo-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-800 text-xs font-sans">
                          {msg.sender_name}
                        </span>
                        {isAdminMsg && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded ml-2 uppercase">
                            Staff Support
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {formattedDate}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                      {msg.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Close Support Ticket Confirmation Modal */}
        {closeModalOpen && (
          <div
            onClick={() => setCloseModalOpen(false)}
            className="fixed inset-0 min-h-screen w-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-auto"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 font-sans">
                  Close Support Ticket!
                </h3>
                <button
                  onClick={() => setCloseModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 font-sans">
                Are you want to close this support ticket?
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCloseModalOpen(false)}
                  className="bg-[#0c1c38] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer"
                >
                  No
                </button>

                <button
                  type="button"
                  onClick={handleConfirmCloseTicket}
                  className="bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer shadow-md"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Message Confirmation Modal */}
        {deleteModalOpen && (
          <div
            onClick={() => setDeleteModalOpen(false)}
            className="fixed inset-0 min-h-screen w-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-auto"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 font-sans">
                  Delete Reply!
                </h3>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 font-sans">
                Are you sure you want to delete this reply message?
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-[#0c1c38] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer"
                >
                  No
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDeleteMessage}
                  className="bg-[#5b5bf5] hover:bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer shadow-md"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminSidebarLayout>
  );
}
