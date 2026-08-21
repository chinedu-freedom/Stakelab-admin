'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../../components/AdminSidebarLayout';
import { FileText, Ban, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminKycDataPage({ params }) {
  const resolvedParams = use(params);
  const [kycStatus, setKycStatus] = useState('pending');

  const handleApprove = () => {
    setKycStatus('verified');
    toast.success('KYC Application Approved Successfully!');
  };

  const handleReject = () => {
    setKycStatus('unverified');
    toast.error('KYC Application Rejected');
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header Title */}
        <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
          KYC Details
        </h1>

        {/* KYC Details Card (Exact Match to Screenshot 2) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 space-y-6">
            {/* Details Table List */}
            <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs font-sans">
              <div className="flex flex-col sm:flex-row py-3.5 px-6 bg-slate-50/50 justify-between items-start sm:items-center gap-1">
                <span className="font-semibold text-slate-600">Full Name</span>
                <span className="font-bold text-slate-800 text-sm">Hollee Townsend</span>
              </div>
              <div className="flex flex-col sm:flex-row py-3.5 px-6 justify-between items-start sm:items-center gap-1">
                <span className="font-semibold text-slate-600">NID Number</span>
                <span className="font-mono text-slate-800">465464654566</span>
              </div>
              <div className="flex flex-col sm:flex-row py-3.5 px-6 bg-slate-50/50 justify-between items-start sm:items-center gap-1">
                <span className="font-semibold text-slate-600">Gender</span>
                <span className="font-medium text-slate-800">Male</span>
              </div>
              <div className="flex flex-col sm:flex-row py-3.5 px-6 justify-between items-start sm:items-center gap-1">
                <span className="font-semibold text-slate-600">You Hobby</span>
                <span className="font-medium text-slate-800">Programming</span>
              </div>
              <div className="flex flex-col sm:flex-row py-3.5 px-6 bg-slate-50/50 justify-between items-start sm:items-center gap-1">
                <span className="font-semibold text-slate-600">NID Photo</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Viewing submitted NID Document Attachment');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" /> Attachment
                </a>
              </div>
            </div>

            {/* Action Buttons (Exact Match to Screenshot 2) */}
            <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReject}
                className="border border-red-500 text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Ban className="w-4 h-4" /> Reject
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="border border-emerald-500 text-emerald-500 hover:bg-emerald-50 px-5 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
