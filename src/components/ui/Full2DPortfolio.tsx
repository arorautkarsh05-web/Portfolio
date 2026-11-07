import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  FileDown,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalProfile } from '../../data/profile';
import { skillsData } from '../../data/skills';
import { featuredProjects } from '../../data/projects';
import { internshipExperiences } from '../../data/experience';
import { certificationsData } from '../../data/achievements';

interface Full2DPortfolioProps {
  onReturnTo3D: () => void;
}

export const Full2DPortfolio: React.FC<Full2DPortfolioProps> = ({ onReturnTo3D }) => {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSkills = skillsData.filter(
    cat => selectedCategory === 'all' || cat.id === selectedCategory
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Banner Returning to 3D */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/15 px-4 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-white tracking-wider text-sm bg-gradient-to-r from-amber-400 to-sky-400 bg-clip-text text-transparent">
            UTKARSH CITY // EXECUTIVE 2D PORTFOLIO
          </span>
        </div>
        <button
          onClick={onReturnTo3D}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition cursor-pointer"
        >
          <Sparkles size={14} />
          <span>Enter 3D Golden-Hour Metropolis</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-700/70 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Authentic Photograph */}
            <div className="relative shrink-0">
              <div className="w-40 h-48 sm:w-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-sky-400/40 shadow-2xl shadow-sky-500/20">
                <img
                  src="/utkarsh_arora.jpeg"
                  alt="Utkarsh Arora"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30">
                  Verified Reference Photo
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 mb-3">
                <span>{personalProfile.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
                {personalProfile.name}
              </h1>

              <p className="text-base sm:text-lg font-semibold text-sky-400 mb-3">
                {personalProfile.title} • {personalProfile.subTitle}
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-2 text-xs text-slate-400 mb-5">
                <MapPin size={14} className="text-emerald-400" />
                <span>{personalProfile.location}</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-2xl">
                {personalProfile.summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="/Utkarsh_Arora_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition"
                >
                  <FileDown size={15} />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
                </button>

                <a
                  href={personalProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={16} />
                </a>

                <a
                  href={personalProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
                  title="GitHub"
                >
                  <GithubIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            EDUCATION BOULEVARD SECTION
            ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
            <span>District 04</span>
            <span className="text-slate-600">•</span>
            <span>Education Boulevard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Academic Background
          </h2>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/85 border border-slate-700/60 shadow-lg flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                Undergraduate Degree
              </span>
              <h3 className="text-xl font-bold text-white mt-2">
                {personalProfile.education.degree} in {personalProfile.education.field}
              </h3>
              <p className="text-sm font-semibold text-slate-300 mt-1">
                {personalProfile.education.college}
              </p>
              <p className="text-xs text-amber-400 font-mono mt-2 flex items-center space-x-1.5">
                <Calendar size={13} />
                <span>Expected Graduation: {personalProfile.education.expectedGraduation}</span>
              </p>

              <div className="mt-5">
                <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-semibold">
                  Relevant Coursework
                </span>
                <div className="flex flex-wrap gap-2">
                  {personalProfile.education.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs bg-black/40 border border-white/10 text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:text-right shrink-0">
              <div className="text-4xl font-black text-amber-400 font-mono">
                {personalProfile.education.cgpa}
              </div>
              <span className="text-xs uppercase font-mono text-slate-400 font-medium">
                Academic CGPA
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================
            TECHNICAL SKILLS DISTRICT
            ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
            <span>District 05</span>
            <span className="text-slate-600">•</span>
            <span>Technology Tower</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Technical Skills & Architectures
          </h2>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
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
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-black font-bold'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat.name.split('&')[0].trim()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map(cat => (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-slate-900/85 border border-slate-700/60 shadow-lg hover:border-sky-400/50 transition"
              >
                <h3 className="font-bold text-base text-sky-400 mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/40 border border-white/10 text-slate-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            FEATURED PROJECTS BOULEVARD
            ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            <span>District 06</span>
            <span className="text-slate-600">•</span>
            <span>Projects Boulevard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Featured Architectural Landmarks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map(project => (
              <div
                key={project.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/70 shadow-xl hover:border-amber-400/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                      style={{
                        color: project.accentColor,
                        borderColor: `${project.accentColor}40`,
                        backgroundColor: `${project.accentColor}15`
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {project.fullDescription}
                  </p>

                  {project.architectureNote && (
                    <div className="mb-4 p-3 rounded-xl bg-slate-900/80 border border-sky-500/20 text-[11px] text-sky-200">
                      <strong className="block text-sky-300 font-semibold mb-0.5">Architecture:</strong>
                      {project.architectureNote}
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-2">
                      Highlights
                    </h4>
                    <ul className="space-y-1.5">
                      {project.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-300 flex items-start space-x-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: project.accentColor }}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 border border-white/10 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white text-black hover:bg-slate-200 font-bold text-xs transition"
                    >
                      <GithubIcon size={14} />
                      <span>Repository</span>
                    </a>
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            EXPERIENCE DISTRICT
            ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            <span>District 08</span>
            <span className="text-slate-600">•</span>
            <span>Experience District</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Internship Timeline
          </h2>

          {/* Verification Flag Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start space-x-3 text-xs leading-relaxed">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold text-amber-300 mb-0.5">
                Calendar Verification Flag:
              </strong>
              Dates reflect the exact text in the primary resume. Auspify Technologies (3 Oct – 3 Nov) and HashBit Innovations (10 Jun – 14 Aug) specify month/day intervals without an explicit calendar year, and HashBit overlaps with DataX Web Solutions (16 Jun – 15 Jul 2026). Displayed faithfully pending formal calendar confirmation.
            </div>
          </div>

          <div className="space-y-4">
            {internshipExperiences.map(exp => (
              <div
                key={exp.id}
                className="p-6 rounded-2xl bg-slate-900/85 border border-slate-700/60 shadow-lg hover:border-sky-400/50 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="font-bold text-base text-white">{exp.role}</h3>
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-mono font-medium">
                    <Calendar size={13} />
                    <span>{exp.dates}</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-sky-400 mb-3">
                  {exp.company}
                </div>

                <ul className="space-y-1.5 mb-4">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="text-xs text-slate-300 flex items-start space-x-2">
                      <span className="text-sky-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 border border-white/10 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            ACHIEVEMENTS PLAZA
            ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            <span>District 07</span>
            <span className="text-slate-600">•</span>
            <span>Achievements Plaza</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Verified Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificationsData.map(cert => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-slate-900/85 border border-slate-700/60 shadow-lg hover:border-amber-400/50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {cert.badgeCategory}
                  </span>
                  <div className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
                    <ShieldCheck size={14} />
                    <span>Verified</span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-white mb-1">{cert.title}</h3>
                <div className="text-xs font-semibold text-sky-400 mb-2">{cert.issuer}</div>
                {cert.credentialNote && (
                  <p className="text-xs text-slate-300 mb-3">{cert.credentialNote}</p>
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
            ))}
          </div>
        </section>

        {/* ========================================================
            CONTACT GARAGE
            ======================================================== */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-t from-white/[0.05] to-transparent border border-white/10 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20">
            <span>District 09 // Contact Garage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Connect
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Whether for Data Analyst internships, full-stack collaboration, or exploratory projects, reach out directly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${personalProfile.email}`}
              className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-600/30 transition"
            >
              <Mail size={16} />
              <span>Email: {personalProfile.email}</span>
            </a>

            <a
              href="/Utkarsh_Arora_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition"
            >
              <FileDown size={16} />
              <span>Download Resume</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
