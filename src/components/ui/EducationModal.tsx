import React from 'react';
import { X, Calendar, BookOpen, Check } from 'lucide-react';
import { personalProfile } from '../../data/profile';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EducationModal: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { education } = personalProfile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-1">
            <span>District 04 // Education Boulevard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Academic Foundation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineering rigour and analytical problem-solving foundation.
          </p>
        </div>

        {/* Academic Card */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Undergraduate Degree
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {education.degree} in {education.field}
              </h3>
              <p className="text-sm font-semibold text-slate-300 mt-0.5">
                {education.college}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-amber-400 font-mono">
                {education.cgpa}
              </div>
              <span className="text-[10px] uppercase font-mono text-slate-400 font-medium">
                Academic CGPA
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono mb-4">
            <Calendar size={13} className="text-amber-400" />
            <span>Expected Graduation: {education.expectedGraduation}</span>
          </div>

          {/* Coursework */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-2">
              <BookOpen size={14} className="text-sky-400" />
              <span>Core Relevant Coursework</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {education.coursework.map((course, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 flex items-center space-x-2"
                >
                  <Check size={12} className="text-emerald-400 shrink-0" />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition"
          >
            Close Academic Overview
          </button>
        </div>
      </div>
    </div>
  );
};

