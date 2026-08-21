'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import AdminSidebarLayout from '../../../../../components/AdminSidebarLayout';
import { Check, X, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminWithdrawDetailsPage({ params }) {
  const resolvedParams = use(params);
  const withdrawId = resolvedParams?.id || '62';

  const [withdrawData, setWithdrawData] = useState({
    name: 'Busisiwe Dudula',
    email: 'busisiwedudula75@gmail.com',
    method: 'USDT (TRC20)',
    walletAddress: 'TGUhk5hnggpnm9HXCy4DmaAbX5fhgqytvn',
    trxId: '98a3511e-f4e2-43f4-8c0b-40bc0ad7a6c3',
    date: '21-08-2026 13:34:46',
    amount: '$95.17',
    charge: '$5.71',
    payable: '$89.46',
    status: 'Pending',
  });

  const handleApprove = () => {
    setWithdrawData((prev) => ({ ...prev, status: 'Approved' }));
    toast.success(`Withdrawal of ${withdrawData.amount} approved successfully!`);
  };

  const handleReject = () => {
    setWithdrawData((prev) => ({ ...prev, status: 'Rejected' }));
    toast.error(`Withdrawal of ${withdrawData.amount} rejected.`);
  };

  const handleCopyWallet = (address) => {
    navigator.clipboard.writeText(address);
    toast.success('Wallet address copied to clipboard!');
  };

  return (
    <AdminSidebarLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 font-sans tracking-wide">
            Withdrawal Details (#{withdrawId})
          </h1>
        </div>

        {/* Structured Horizontal Info Card (Matching Reference Screenshot 2) */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
            {/* Column 1: User Information */}
            <div className="space-y-2">
              <div>
                <span className="text-slate-500 font-medium">Name: </span>
                <span className="font-bold text-slate-800">{withdrawData.name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Username: </span>
                <div className="font-medium text-slate-700 break-all">{withdrawData.email}</div>
              </div>
            </div>

            {/* Column 2: Method, Wallet & Transaction */}
            <div className="space-y-2">
              <div>
                <span className="text-slate-500 font-medium">Method: </span>
                <span className="font-bold text-slate-800">{withdrawData.method}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Wallet Address: </span>
                <span className="font-mono font-bold text-slate-900 break-all ml-1">
                  {withdrawData.walletAddress}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyWallet(withdrawData.walletAddress)}
                  className="inline-flex items-center ml-2 p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer align-middle"
                  title="Copy Wallet Address"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Transaction ID: </span>
                <span className="font-mono font-bold text-slate-900 break-all">{withdrawData.trxId}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Date: </span>
                <span className="text-slate-700 font-medium">{withdrawData.date}</span>
              </div>
            </div>

            {/* Column 3: Amount, Charge & Payable */}
            <div className="space-y-2">
              <div>
                <span className="text-slate-500 font-medium">Amount: </span>
                <span className="font-bold text-slate-800 font-righteous">{withdrawData.amount}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Charge: </span>
                <span className="font-bold text-red-500 font-righteous">{withdrawData.charge}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Payable: </span>
                <span className="font-bold text-slate-900 font-righteous text-sm">{withdrawData.payable}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons if Pending */}
          {withdrawData.status === 'Pending' && (
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleApprove}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Check className="w-4 h-4" /> Approve
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <X className="w-4 h-4" /> Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminSidebarLayout>
  );
}

