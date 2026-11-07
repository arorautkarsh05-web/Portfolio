import React, { useState } from 'react';
import { X, Mail, MapPin, Copy, Check, FileDown, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalProfile } from '../../data/profile';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0d0f1a] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
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
            <span>District 09 // Contact Garage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Connect with Utkarsh
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Open to Data Analyst roles, collaborations, and data-driven projects.
          </p>
        </div>

        {/* Channels */}
        <div className="space-y-3 mb-6">
          {/* Email Card with Copy & Mailto */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Direct Email</span>
                <a
                  href={`mailto:${personalProfile.email}`}
                  className="text-sm font-bold text-white hover:text-sky-300 transition truncate block"
                >
                  {personalProfile.email}
                </a>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition shrink-0"
              title="Copy email to clipboard"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>

          {/* LinkedIn */}
          <a
            href={personalProfile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 flex items-center justify-between gap-3 transition group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <LinkedinIcon size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">LinkedIn Profile</span>
                <span className="text-sm font-bold text-white group-hover:text-blue-300 transition">
                  linkedin.com/in/utkarsh-arora
                </span>
              </div>
            </div>
            <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition" />
          </a>

          {/* GitHub */}
          <a
            href={personalProfile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 flex items-center justify-between gap-3 transition group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <GithubIcon size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">GitHub Repositories</span>
                <span className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                  github.com/arorautkarsh05-web
                </span>
              </div>
            </div>
            <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition" />
          </a>

          {/* Location */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Location</span>
              <span className="text-sm font-bold text-white">{personalProfile.location}</span>
            </div>
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/Utkarsh_Arora_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-600/20 transition"
          >
            <FileDown size={18} />
            <span>Download Official Resume (PDF)</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
