import React, { useEffect, useState } from 'react';
import { useApp, APP_VIEW_LABELS } from '../../context/AppContext';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

export const PageBackBar: React.FC = () => {
  const { activeTab, setActiveTab, goBack, canGoBack, previousTabTitle } = useApp();
  const [showFloatingBack, setShowFloatingBack] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowFloatingBack(true);
      } else {
        setShowFloatingBack(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTitle = APP_VIEW_LABELS[activeTab] || activeTab;

  return (
    <>
      {/* 1. Main In-Page Navigation Bar with Prominent Back Arrow */}
      <nav
        aria-label="Navigation de retour et fil d'Ariane"
        className="w-full bg-white/95 border-b border-slate-200/90 shadow-2xs backdrop-blur-xs py-2 sm:py-2.5 px-3 sm:px-6 lg:px-8 transition-all"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Back Arrow Button */}
          <button
            onClick={goBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100/90 hover:bg-amber-400 hover:text-slate-950 border border-slate-200 hover:border-amber-400 shadow-2xs transition-all active:scale-95 group shrink-0"
            title={previousTabTitle ? `Revenir à : ${previousTabTitle}` : 'Revenir en arrière'}
            aria-label="Revenir à la page précédente"
          >
            <div className="w-5 h-5 rounded-lg bg-amber-400 group-hover:bg-slate-950 text-slate-950 group-hover:text-amber-400 flex items-center justify-center shrink-0 transition-colors shadow-2xs">
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-heading font-extrabold whitespace-nowrap">
              <span className="hidden xs:inline">Revenir en arrière</span>
              <span className="xs:hidden">Retour</span>
            </span>
            {previousTabTitle && (
              <span className="hidden lg:inline text-[11px] font-medium text-slate-500 group-hover:text-slate-900 border-l border-slate-300 pl-2 max-w-[200px] truncate">
                vers {previousTabTitle}
              </span>
            )}
          </button>

          {/* Breadcrumbs & Home Navigation */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
            <button
              onClick={() => setActiveTab('accueil')}
              className={`flex items-center gap-1 font-semibold hover:text-amber-600 transition-colors shrink-0 ${
                activeTab === 'accueil' ? 'text-amber-600 font-bold' : 'text-slate-600'
              }`}
              title="Aller à la page d'accueil"
            >
              <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="hidden sm:inline">Accueil</span>
            </button>

            {activeTab !== 'accueil' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-bold text-slate-900 truncate max-w-[130px] xs:max-w-[200px] sm:max-w-[320px] md:max-w-none">
                  {currentTitle}
                </span>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Floating Quick Back Arrow Button (Appears when scrolled down on any page) */}
      {showFloatingBack && (
        <button
          onClick={goBack}
          className="fixed bottom-20 left-4 sm:left-6 z-40 bg-slate-950/95 hover:bg-amber-400 text-white hover:text-slate-950 border border-slate-800 hover:border-amber-400 shadow-2xl px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 text-xs font-bold transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 active:scale-95 group backdrop-blur-sm"
          title={previousTabTitle ? `Revenir à : ${previousTabTitle}` : 'Revenir en arrière'}
          aria-label="Revenir en arrière"
        >
          <div className="w-4 h-4 rounded-full bg-amber-400 group-hover:bg-slate-950 text-slate-950 group-hover:text-amber-400 flex items-center justify-center shrink-0 transition-colors">
            <ArrowLeft className="w-2.5 h-2.5 stroke-[3] group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="whitespace-nowrap font-heading font-extrabold">
            <span className="hidden xs:inline">Revenir en arrière</span>
            <span className="xs:hidden">Retour</span>
          </span>
        </button>
      )}
    </>
  );
};
