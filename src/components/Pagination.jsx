'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 4,
  totalResults = 48,
  pageSize = 15,
  onPageChange = () => {},
}) {
  const startResult = Math.min((currentPage - 1) * pageSize + 1, totalResults);
  const endResult = Math.min(currentPage * pageSize, totalResults);

  return (
    <div className="bg-white px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans">
      {/* Showing X to Y of Z results */}
      <div className="text-slate-500">
        Showing <span className="font-bold text-slate-800">{startResult}</span> to{' '}
        <span className="font-bold text-slate-800">{endResult}</span> of{' '}
        <span className="font-bold text-slate-800">{totalResults}</span> results
      </div>

      {/* Pagination Page Number Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded border border-slate-200 text-slate-500 hover:border-slate-300 flex items-center justify-center text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Number Buttons */}
        {totalPages <= 7 ? (
          Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                currentPage === pageNum
                  ? 'bg-[#5b5bf5] text-white shadow-md shadow-indigo-500/30 font-bold'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {pageNum}
            </button>
          ))
        ) : (
          <>
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === pageNum
                    ? 'bg-[#5b5bf5] text-white shadow-md shadow-indigo-500/30 font-bold'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <span className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold">
              ...
            </span>
            {[totalPages - 1, totalPages].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === pageNum
                    ? 'bg-[#5b5bf5] text-white shadow-md shadow-indigo-500/30 font-bold'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded border border-slate-200 text-slate-500 hover:border-slate-300 flex items-center justify-center text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
