import React from 'react';
import { X, ExternalLink, Shield, CheckCircle, Cpu } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { ProjectLandmark } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectLandmark | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

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

        {/* Category & Badge */}
        <div className="flex items-center space-x-2 mb-2">
          <span
            className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border"
            style={{
              color: project.accentColor,
              borderColor: `${project.accentColor}40`,
              backgroundColor: `${project.accentColor}15`
            }}
          >
            {project.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">Landmark Dossier</span>
        </div>

        {/* Project Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          {project.title}
        </h2>

        {/* Full Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {project.fullDescription}
        </p>

        {/* Architecture Note if available */}
        {project.architectureNote && (
          <div className="mb-6 p-3.5 bg-slate-900/80 rounded-2xl border border-sky-500/25 flex items-start space-x-3 text-xs text-sky-200">
            <Shield size={16} className="text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sky-300 block mb-0.5 font-semibold">Architectural Source of Truth</strong>
              <span>{project.architectureNote}</span>
            </div>
          </div>
        )}

        {/* Core Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2">
            <CheckCircle size={14} className="text-emerald-400" />
            <span>Key Engineering Highlights</span>
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 leading-relaxed">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack Tags */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center space-x-2">
            <Cpu size={14} className="text-purple-400" />
            <span>Technology Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-slate-200 font-bold text-xs shadow-lg transition"
          >
            <GithubIcon size={15} />
            <span>View Source on GitHub</span>
          </a>

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition"
            >
              <ExternalLink size={15} />
              <span>Verified Live Demo</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition ml-auto"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
