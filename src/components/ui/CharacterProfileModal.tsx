import React from 'react';
import { X, ShieldCheck, FileDown, MapPin, Sparkles } from 'lucide-react';
import { personalProfile } from '../../data/profile';

interface CharacterProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartIgnition: () => void;
}

export const CharacterProfileModal: React.FC<CharacterProfileModalProps> = ({
  isOpen,
  onClose,
  onStartIgnition
}) => {
  if (!isOpen) return null;

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

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
          {/* Authentic Photograph Pedestal */}
          <div className="relative shrink-0">
            <div className="w-36 h-44 sm:w-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-sky-500/40 shadow-2xl shadow-sky-500/20 relative group">
              <img
                src="/utkarsh_arora.jpeg"
                alt="Utkarsh Arora"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-sky-300 font-bold px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-sky-500/30">
                <span className="flex items-center space-x-1">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>VERIFIED</span>
                </span>
                <span>BIOMETRIC</span>
              </div>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1">
              <span>Scene 02 // Central Grand Plaza</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {personalProfile.name}
            </h2>
            <div className="text-sm font-semibold text-sky-400 mb-2">
              {personalProfile.title} • {personalProfile.subTitle}
            </div>

            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start space-x-1.5 mb-3">
              <MapPin size={13} className="text-emerald-400" />
              <span>{personalProfile.location}</span>
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {personalProfile.summary}
            </p>

            <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-slate-400 font-mono">
              <strong className="text-slate-200 block mb-0.5">Avatar Aesthetic:</strong>
              Charcoal-grey tailored suit, crisp white formal shirt, black spectacles, natural stance beside bespoke supercar.
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onStartIgnition();
            }}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/25 transition"
          >
            <Sparkles size={14} />
            <span>Ignite Supercar (Scene 03)</span>
          </button>

          <div className="flex items-center space-x-2">
            <a
              href="/Utkarsh_Arora_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md transition"
            >
              <FileDown size={14} />
              <span>Resume PDF</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
