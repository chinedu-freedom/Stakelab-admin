'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../components/AdminSidebarLayout';
import Pagination from '../../../../components/Pagination';
import { Search, Monitor } from 'lucide-react';

const mockTicketsList = [
  {
    id: '847725',
    subject: '[Ticket#847725] Hi',
    submittedBy: 'Chinedu Afamefuna',
    status: 'Customer Reply',
    priority: 'High',
    lastReply: '1 hour ago',
  },
  {
    id: '93143917',
    subject: '[Ticket#93143917] Stakelab',
    submittedBy: 'DEEPAK KHAJURIA',
    status: 'Open',
    priority: 'Medium',
    lastReply: '6 months ago',
  },
  {
    id: '22559244',
    subject: '[Ticket#22559244] I want to see staking opportun...',
    submittedBy: 'mobarok Sojib',
    status: 'Customer Reply',
    priority: 'Medium',
    lastReply: '11 months ago',
  },
  {
    id: '809549',
    subject: '[Ticket#809549] Deposit test',
    submittedBy: 'Lily Zhou',
    status: 'Open',
    priority: 'High',
    lastReply: '1 year ago',
  },
  {
    id: '650851',
    subject: '[Ticket#650851] scammer!',
    submittedBy: 'hossein rastegar',
    status: 'Open',
    priority: 'High',
    lastReply: '1 year ago',
  },
  {
    id: '580357',
    subject: '[Ticket#580357] dfgncgh',
    submittedBy: 'lion heatrs',
    status: 'Open',
    priority: 'High',
    lastReply: '1 year ago',
  },
  {
    id: '11349643',
    subject: '[Ticket#11349643] Blanditiis reprehend',
    submittedBy: 'Rinah Sims',
    status: 'Open',
    priority: 'Medium',
    lastReply: '1 year ago',
  },
  {
    id: '42338465',
    subject: '[Ticket#42338465] demo@site.com',
    submittedBy: 'demo',
    status: 'Customer Reply',
    priority: 'Medium',
    lastReply: '1 year ago',
  },
  {
    id: '05342920',
    subject: '[Ticket#05342920] 4',
    submittedBy: 'Meherab',
    status: 'Open',
    priority: 'Medium',
    lastReply: '1 year ago',
  },
  {
    id: '438007',
    subject: '[Ticket#438007] asdasd',
    submittedBy: 'asd dsa',
    status: 'Open',
    priority: 'High',
    lastReply: '2 years ago',
  },
  {
    id: '86013201',
    subject: '[Ticket#86013201] Payment gateway of the script',
    submittedBy: 'EVANS OWUSU',
    status: 'Open',
    priority: 'High',
    lastReply: '2 years ago',
  },
  {
    id: '978833',
    subject: '[Ticket#978833] Testing ticketd',
    submittedBy: 'rolax cheruiyot',
    status: 'Closed',
    priority: 'High',
    lastReply: '2 years ago',
  },
  {
    id: '488503',
    subject: "[Ticket#488503] Can't find the way to haven",
    submittedBy: 'as as',
    status: 'Closed',
    priority: 'High',
    lastReply: '2 years ago',
  },
  {
    id: '50925798',
    subject: '[Ticket#50925798] gffd',
    submittedBy: 'Adam Smith',
    status: 'Closed',
    priority: 'Medium',
    lastReply: '2 years ago',
  },
  {
    id: '89120439',
    subject: '[Ticket#89120439] gg',
    submittedBy: 'Adam Smith',
    status: 'Closed',
    priority: 'Medium',
    lastReply: '2 years ago',
  },
  {
    id: '856650',
    subject: '[Ticket#856650] asdd',
    submittedBy: 'Bill Gates',
    status: 'Answered',
    priority: 'Medium',
    lastReply: '2 years ago',
  },
  {
    id: '14493426',
    subject: '[Ticket#14493426] fkgjmf',
    submittedBy: 'gagfd',
    status: 'Answered',
    priority: 'Medium',
    lastReply: '2 years ago',
  },
  {
    id: '59186909',
    subject: '[Ticket#59186909] test',
    submittedBy: 'ash',
    status: 'Answered',
    priority: 'Medium',
    lastReply: '2 years ago',
  },
];

export default function AdminTicketsFilteredPage({
  title = 'Pending Tickets',
  statusFilter = 'Pending',
}) {
  const [search, setSearch] = useState('');

  const filteredTickets = mockTicketsList.filter((t) => {
    if (statusFilter === 'Closed' && t.status !== 'Closed') return false;
    if (statusFilter === 'Answered' && t.status !== 'Answered') return false;
    if (statusFilter === 'Pending' && t.status === 'Closed') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return t.subject.toLowerCase().includes(q) || t.submittedBy.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            {title}
          </h1>

          {/* Search Box Control */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-indigo-500">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
              className="w-56 sm:w-64 h-10 bg-transparent border-0 outline-none px-3.5 text-xs text-slate-800 font-sans"
            />
            <button className="h-10 bg-[#5b5bf5] hover:bg-indigo-600 text-white px-3.5 flex items-center justify-center shrink-0 cursor-pointer">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Tickets Table Container (Matching Exact Reference Screenshot 1) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Vibrant Indigo Table Header */}
              <thead>
                <tr className="bg-[#5b5bf5] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Subject</th>
                  <th className="py-3.5 px-6 text-center">Submitted By</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6 text-center">Priority</th>
                  <th className="py-3.5 px-6">Last Reply</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                      No tickets found in this category
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Subject Column */}
                      <td className="py-4 px-6 font-bold text-[#5b5bf5]">
                        <Link href={`/admin/ticket/view/${t.id}`} className="hover:underline">
                          {t.subject}
                        </Link>
                      </td>

                      {/* Submitted By Column */}
                      <td className="py-4 px-6 text-center font-bold text-[#5b5bf5]">
                        {t.submittedBy}
                      </td>

                      {/* Status Column (Customer Reply / Open / Answered / Closed) */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-3 py-0.5 rounded-full text-[11px] font-bold border inline-block ${
                            t.status === 'Customer Reply'
                              ? 'bg-amber-50 text-amber-500 border-amber-300'
                              : t.status === 'Open'
                              ? 'bg-emerald-50 text-emerald-500 border-emerald-300'
                              : t.status === 'Answered'
                              ? 'bg-indigo-50 text-indigo-500 border-indigo-300'
                              : 'bg-red-50 text-red-500 border-red-300'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>

                      {/* Priority Column (High / Medium / Low) */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-3 py-0.5 rounded-full text-[11px] font-bold border inline-block ${
                            t.priority === 'High'
                              ? 'text-red-500 border-red-300 bg-red-50/40'
                              : t.priority === 'Medium'
                              ? 'text-amber-500 border-amber-300 bg-amber-50/40'
                              : 'text-emerald-500 border-emerald-300 bg-emerald-50/40'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>

                      {/* Last Reply Column */}
                      <td className="py-4 px-6 text-slate-500 font-medium">{t.lastReply}</td>

                      {/* Action Column */}
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/admin/ticket/view/${t.id}`}
                          className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <Monitor className="w-3.5 h-3.5" /> Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Utility Footer */}
          <Pagination
            currentPage={1}
            totalPages={2}
            totalResults={23}
            pageSize={15}
            onPageChange={(page) => console.log('Page:', page)}
          />
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
