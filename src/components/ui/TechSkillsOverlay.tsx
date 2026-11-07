import React, { useState } from 'react';
import { X, Search, Code2, Database, BarChart3, Layers, Wrench, Binary, PieChart, Check } from 'lucide-react';
import { skillsData } from '../../data/skills';

interface TechSkillsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechSkillsOverlay: React.FC<TechSkillsOverlayProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const iconMap: { [key: string]: React.ReactNode } = {
    BarChart3: <BarChart3 size={16} />,
    Code2: <Code2 size={16} />,
    Binary: <Binary size={16} />,
    Database: <Database size={16} />,
    PieChart: <PieChart size={16} />,
    Layers: <Layers size={16} />,
    Wrench: <Wrench size={16} />
  };

  const filteredCategories = skillsData.filter(cat => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(query) ||
      cat.skills.some(s => s.name.toLowerCase().includes(query))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0d0f1a] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
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
            <span>District 05 // Technology Tower</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Technical Skills & Architectures
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organized architectural capabilities spanning Data Analytics, Core Programming, Business Intelligence, Databases, and Full-Stack Engineering.
          </p>
        </div>

        {/* Category Filter Chips & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-sky-500 text-black font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              All Zones
            </button>
            {skillsData.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center space-x-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-black font-bold'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <span>{cat.name.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Python, SQL)..."
              className="w-full sm:w-60 pl-8 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map(cat => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-1">
                  {iconMap[cat.iconName]}
                  <span>{cat.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-4">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 flex items-center space-x-1.5 text-xs text-slate-200"
                    >
                      <Check size={12} className="text-sky-400" />
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 px-1 py-0.2 bg-white/5 rounded">
                        {skill.level}
                      </span>
                    </div>
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
            Close Skills Window
          </button>
        </div>
      </div>
    </div>
  );
};
