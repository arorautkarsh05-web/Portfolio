import React from 'react';
import { X, Calendar, AlertTriangle, Building2, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { internshipExperiences } from '../../data/experience';

interface ExperienceDistrictViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceDistrictView: React.FC<ExperienceDistrictViewProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0d0f1a] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1">
            <span>District 08 // Experience District</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Professional Internships & Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-world data science, full-stack engineering, and analytical internships.
          </p>
        </div>

        {/* Prominent Verification Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start space-x-3 text-xs leading-relaxed">
          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-amber-300 mb-1">
              Data Integrity & Calendar Verification Flag
            </strong>
            <p className="text-amber-200/90">
              In accordance with strict portfolio integrity guidelines, internship dates are presented exactly as documented in Utkarsh Arora's source resume without silent modification. Note that <strong>Auspify Technologies</strong> (3 Oct – 3 Nov) and <strong>HashBit Innovations</strong> (10 Jun – 14 Aug) specify calendar day spans without an explicit year, and HashBit's window overlaps with <strong>DataX Web Solutions</strong> (16 Jun – 15 Jul 2026). Displayed faithfully pending formal calendar confirmation.
            </p>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-[2px] before:bg-white/10">
          {internshipExperiences.map((exp, idx) => (
            <div key={exp.id} className="relative pl-10">
              {/* Timeline Node */}
              <div className="absolute left-2.5 -translate-x-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-[#0d0f1a] shadow-md shadow-sky-500/50" />

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center space-x-2">
                    <Building2 size={16} className="text-sky-400" />
                    <h3 className="font-bold text-base text-white">{exp.role}</h3>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-mono font-medium">
                    <Calendar size={13} />
                    <span>{exp.dates}</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-sky-300 mb-3">
                  {exp.company}
                </div>

                {/* Specific Flag Pill */}
                {exp.flagNotice && (
                  <div className="mb-3 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/20 text-[11px] text-amber-300/90 font-mono flex items-center space-x-1.5">
                    <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                    <span>{exp.flagNotice}</span>
                  </div>
                )}

                {/* Highlights */}
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
                      <ChevronRight size={13} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-black/40 border border-white/10 text-slate-300"
                    >
                      {t}
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
            Close Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
