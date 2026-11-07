import React, { useEffect, useRef, useCallback } from 'react';
import { X, ExternalLink, Shield, CheckCircle, Cpu, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { featuredProjects } from '../../data/projects';
import { ProjectLandmark } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectLandmark | null;
  onClose: () => void;
  onSelectProject?: (p: ProjectLandmark) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject
}) => {
  if (!project) return null;

  const currentIndex = featuredProjects.findIndex(p => p.id === project.id);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;
  const currentProject = featuredProjects[activeIndex];

  const touchStartX = useRef<number>(0);

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + featuredProjects.length) % featuredProjects.length;
    onSelectProject?.(featuredProjects[prevIdx]);
  }, [activeIndex, onSelectProject]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % featuredProjects.length;
    onSelectProject?.(featuredProjects[nextIdx]);
  }, [activeIndex, onSelectProject]);

  // Keyboard navigation (ArrowLeft & ArrowRight to swipe)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handlePrev(); // swiped right
      } else {
        handleNext(); // swiped left
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Header Bar with Project Selector Tabs & Close Button */}
        <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-500/30">
              Landmark {activeIndex + 1} of {featuredProjects.length}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Swipe or use ‹ › buttons
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Swipe Arrows */}
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Previous project (Left Arrow / Swipe Right)"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Next project (Right Arrow / Swipe Left)"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/30 hover:text-rose-300 text-slate-300 transition cursor-pointer ml-1"
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 4 Interactive Project Selector Chips / Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {featuredProjects.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => onSelectProject?.(p)}
                className={`px-3 py-2.5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white font-black shadow-lg scale-102'
                    : 'bg-slate-950/60 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 border-white/10'
                }`}
                style={{
                  borderColor: isActive ? p.accentColor : undefined,
                  boxShadow: isActive ? `0 0 15px ${p.accentColor}40` : undefined
                }}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                  Project 0{idx + 1}
                </div>
                <div className="text-xs font-bold truncate text-white">
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Project Category & Accent Badge */}
        <div className="flex items-center space-x-2 mb-2">
          <span
            className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md border"
            style={{
              color: currentProject.accentColor,
              borderColor: `${currentProject.accentColor}50`,
              backgroundColor: `${currentProject.accentColor}15`
            }}
          >
            {currentProject.category}
          </span>
        </div>

        {/* Project Title */}
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 text-white">
          {currentProject.title}
        </h2>

        {/* Full Description */}
        <p className="text-sm text-slate-200 leading-relaxed mb-5">
          {currentProject.fullDescription}
        </p>

        {/* Architecture Note */}
        {currentProject.architectureNote && (
          <div className="mb-6 p-4 bg-slate-950/80 rounded-2xl border border-sky-400/30 flex items-start space-x-3 text-xs text-sky-200">
            <Shield size={18} className="text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sky-300 block mb-0.5 font-bold">Architectural Source of Truth</strong>
              <span className="leading-relaxed">{currentProject.architectureNote}</span>
            </div>
          </div>
        )}

        {/* Core Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2">
            <CheckCircle size={15} className="text-emerald-400" />
            <span>Key Engineering Highlights</span>
          </h4>
          <ul className="space-y-2">
            {currentProject.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200 leading-relaxed">
                <span
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: currentProject.accentColor }}
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack Tags */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center space-x-2">
            <Cpu size={15} className="text-purple-400" />
            <span>Technology Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentProject.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-950 border border-white/15 text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Swipe Navigation & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="flex items-center space-x-1 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Prev Project</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-1 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer"
            >
              <span className="hidden sm:inline">Next Project</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <a
              href={currentProject.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-slate-200 font-bold text-xs shadow-lg transition"
            >
              <GithubIcon size={15} />
              <span>GitHub Repo</span>
            </a>

            {currentProject.liveDemoUrl && (
              <a
                href={currentProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition"
              >
                <ExternalLink size={15} />
                <span>Live Demo</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/15 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
