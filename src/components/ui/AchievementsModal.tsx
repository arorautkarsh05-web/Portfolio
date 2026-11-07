import React from 'react';
import { X, Award, CheckCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { certificationsData } from '../../data/achievements';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1">
            <span>District 07 // Achievements Plaza</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Verified Certifications & Credentials
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Authentic industry qualifications in Agentic AI, Data Analytics, and Foundations.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificationsData.map(cert => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {cert.badgeCategory}
                  </span>
                  <div className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
                    <ShieldCheck size={14} />
                    <span>Verified</span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-white mb-1">
                  {cert.title}
                </h3>
                <div className="text-xs font-semibold text-sky-400 mb-3">
                  {cert.issuer}
                </div>

                {cert.credentialNote && (
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {cert.credentialNote}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsCovered.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/40 border border-white/10 text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition"
          >
            Close Achievements
          </button>
        </div>
      </div>
    </div>
  );
};

