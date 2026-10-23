import React, { useState, useRef, useEffect } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { TargetCountry, SENEGAL_REGIONS } from '../../types';
import {
  ShoppingCart,
  ShoppingBag,
  FileText,
  Menu,
  X,
  ChevronDown,
  Globe,
  ShieldCheck,
  Lock,
  PhoneCall,
  Search,
  Scale,
  User,
  LogOut,
  Sun,
  Droplet,
  BatteryCharging,
  Layers,
  Award,
  BookOpen,
  ArrowRight,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    selectedCountry,
    setSelectedCountry,
    currency,
    setCurrency,
    comparisonList,
    quotes,
    isAdminAuthenticated,
    currentClient,
    logoutClient,
    openAuthModal,
    openSunLuminModal,
    clientDiscussions
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rubriquesDropdownOpen, setRubriquesDropdownOpen] = useState(false);
  const rubriquesRef = useRef<HTMLDivElement>(null);

  // Close rubriques dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rubriquesRef.current && !rubriquesRef.current.contains(event.target as Node)) {
        setRubriquesDropdownOpen(false);
      }
    };
    if (rubriquesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [rubriquesDropdownOpen]);

  // World language translator state (Google Translate integration)
  const [selectedLang, setSelectedLang] = useState<string>(() => {
    try {
      const match = document.cookie.match(/googtrans=\/fr\/([a-zA-Z\-]+)/);
      if (match && match[1]) return match[1];
      return localStorage.getItem('deb_selected_lang') || 'fr';
    } catch {
      return 'fr';
    }
  });

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);
    try {
      localStorage.setItem('deb_selected_lang', langCode);
      const domain = window.location.hostname;
      document.cookie = `googtrans=/fr/${langCode}; path=/;`;
      if (domain) {
        document.cookie = `googtrans=/fr/${langCode}; domain=${domain}; path=/;`;
      }
      const googleCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (googleCombo) {
        googleCombo.value = langCode;
        googleCombo.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.warn('Language change error', e);
    }
  };

  const pendingQuotesCount = quotes.filter((q) => q.statut === 'recu' || q.statut === 'en_etude').length;
  const unreadAdminCount = clientDiscussions.reduce((sum, d) => sum + (d.nbNonLusClient || 0), 0);

  return (
    <>
      {/* 1. Top Banner: Brand Info, Currency (FCFA), World Language Translation, Client Account & Admin Access */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 w-full max-w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-1 sm:py-1.5 flex items-center justify-between gap-1 overflow-hidden">
          {/* Brand quick info */}
          <div className="flex items-center gap-1.5 shrink min-w-0 overflow-hidden">
            <span className="text-amber-400 font-bold tracking-tight whitespace-nowrap text-[10px] sm:text-xs">
              <span className="hidden xs:inline">⚡ DIARRA ENERGIE</span>
              <span className="xs:hidden">⚡ DEB</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">&amp; BUSINESS</span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden lg:inline">Sénégal · Bénin · Togo · Afrique de l'Ouest</span>
          </div>

          {/* Right controls: FCFA, Traduction Toutes Langues, Compte Client, Compte Admin */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs shrink-0 max-w-full">
            {/* Currency Selector (FCFA / EUR / USD) */}
            <div className="flex items-center bg-slate-800/90 px-1 sm:px-2 py-0.5 sm:py-1 rounded border border-slate-700 shrink-0">
              <select
                aria-label="Sélectionner la devise"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer text-[10px] sm:text-xs"
              >
                <option value="XOF" className="bg-slate-900 text-white">FCFA</option>
                <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
                <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
              </select>
            </div>

            {/* World Language Translator (Toutes les langues du monde) */}
            <div
              className="flex items-center bg-slate-800/90 px-1 sm:px-1.5 py-0.5 sm:py-1 rounded border border-slate-700 gap-0.5 sm:gap-1 text-[10px] sm:text-xs shrink-0"
              title="Traduction en temps réel dans toutes les langues du monde"
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <select
                aria-label="Traduire dans toutes les langues du monde"
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer text-[10px] sm:text-xs w-[38px] xs:w-[48px] sm:w-auto"
              >
                <optgroup label="Afrique & Sous-région" className="bg-slate-900 text-amber-400 font-bold">
                  <option value="fr" className="bg-slate-900 text-white">🇫🇷 Français (Défaut)</option>
                  <option value="wo" className="bg-slate-900 text-white">🇸🇳 Wolof</option>
                  <option value="bm" className="bg-slate-900 text-white">🇲🇱 Bambara</option>
                  <option value="ha" className="bg-slate-900 text-white">🇳🇬 Hausa (Haoussa)</option>
                  <option value="yo" className="bg-slate-900 text-white">🇳🇬 Yorùbá</option>
                  <option value="sw" className="bg-slate-900 text-white">🇰🇪 Kiswahili</option>
                  <option value="ar" className="bg-slate-900 text-white">🇸🇦 العربية (Arabe)</option>
                </optgroup>
                <optgroup label="Toutes les Langues du Monde" className="bg-slate-900 text-amber-400 font-bold">
                  <option value="en" className="bg-slate-900 text-white">🇬🇧 English</option>
                  <option value="es" className="bg-slate-900 text-white">🇪🇸 Español</option>
                  <option value="pt" className="bg-slate-900 text-white">🇵🇹 Português</option>
                  <option value="zh-CN" className="bg-slate-900 text-white">🇨🇳 中文 (Chinois)</option>
                  <option value="de" className="bg-slate-900 text-white">🇩🇪 Deutsch</option>
                  <option value="it" className="bg-slate-900 text-white">🇮🇹 Italiano</option>
                  <option value="ru" className="bg-slate-900 text-white">🇷🇺 Русский</option>
                  <option value="tr" className="bg-slate-900 text-white">🇹🇷 Türkçe</option>
                  <option value="ja" className="bg-slate-900 text-white">🇯🇵 日本語</option>
                  <option value="ko" className="bg-slate-900 text-white">🇰🇷 한국어</option>
                  <option value="hi" className="bg-slate-900 text-white">🇮🇳 हिन्दी</option>
                  <option value="nl" className="bg-slate-900 text-white">🇳🇱 Nederlands</option>
                  <option value="pl" className="bg-slate-900 text-white">🇵🇱 Polski</option>
                  <option value="sv" className="bg-slate-900 text-white">🇸🇪 Svenska</option>
                  <option value="vi" className="bg-slate-900 text-white">🇻🇳 Tiếng Việt</option>
                  <option value="th" className="bg-slate-900 text-white">🇹🇭 ไทย</option>
                  <option value="id" className="bg-slate-900 text-white">🇮🇩 Bahasa Indonesia</option>
                  <option value="ms" className="bg-slate-900 text-white">🇲🇾 Melayu</option>
                  <option value="fa" className="bg-slate-900 text-white">🇮🇷 فارسی</option>
                  <option value="ur" className="bg-slate-900 text-white">🇵🇰 اردو</option>
                  <option value="el" className="bg-slate-900 text-white">🇬🇷 Ελληνικά</option>
                  <option value="he" className="bg-slate-900 text-white">🇮🇱 עברית</option>
                  <option value="uk" className="bg-slate-900 text-white">🇺🇦 Українська</option>
                  <option value="ro" className="bg-slate-900 text-white">🇷🇴 Română</option>
                  <option value="cs" className="bg-slate-900 text-white">🇨🇿 Čeština</option>
                  <option value="hu" className="bg-slate-900 text-white">🇭🇺 Magyar</option>
                </optgroup>
              </select>
            </div>

            {/* Client Account: Visible on all mobile & desktop screens */}
            <div className="flex items-center shrink-0">
              {isAdminAuthenticated ? (
                <div className="flex items-center gap-1 bg-emerald-950/90 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-emerald-500/40 text-[10px] sm:text-xs text-emerald-300 font-semibold">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  <span className="hidden xs:inline">Admin Connecté</span>
                  <span className="xs:hidden">Admin</span>
                </div>
              ) : currentClient ? (
                <div className="flex items-center gap-0.5 bg-slate-800/90 hover:bg-slate-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded border border-amber-500/40 text-[10px] sm:text-xs">
                  <button
                    onClick={() => setActiveTab('compte')}
                    className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors font-medium text-left truncate max-w-[55px] xs:max-w-[85px] sm:max-w-[140px]"
                    title={`Espace Client : ${currentClient.nomComplet} (${currentClient.ville})`}
                  >
                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                    <span className="font-semibold truncate">
                      {currentClient.prenom}
                    </span>
                    {unreadAdminCount > 0 && (
                      <span
                        className="px-1 py-0.2 bg-emerald-500 text-white font-extrabold text-[8px] sm:text-[9px] rounded-full animate-pulse shrink-0 ml-0.5"
                        title={`${unreadAdminCount} réponse(s) de l'administration`}
                      >
                        {unreadAdminCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={logoutClient}
                    className="p-0.5 text-slate-400 hover:text-rose-400 transition-colors ml-0.5"
                    title="Déconnexion de votre compte client"
                  >
                    <LogOut className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-amber-500/30 text-[10px] sm:text-xs font-semibold transition-colors"
                  title="Se connecter ou créer un compte client"
                >
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="hidden xs:inline">Espace Client</span>
                  <span className="xs:hidden">Client</span>
                </button>
              )}
            </div>

            {/* Admin quick toggle */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-0.5 sm:gap-1 transition-colors border-l border-slate-700 pl-1.5 sm:pl-2.5 py-0.5 text-[10px] sm:text-xs shrink-0 ${
                activeTab === 'admin'
                  ? 'text-amber-400 font-bold'
                  : isAdminAuthenticated
                  ? 'text-emerald-400 hover:text-emerald-300 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title={isAdminAuthenticated ? "Espace d'Administration (Connecté)" : "Connexion Espace d'Administration"}
            >
              {isAdminAuthenticated ? (
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Lock className="w-3 h-3 text-amber-400 shrink-0" />
              )}
              <span className="font-semibold text-slate-200">Admin</span>
              {isAdminAuthenticated && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              )}
              {pendingQuotesCount > 0 && (
                <span className="bg-amber-400 text-slate-950 font-bold px-1 rounded-xs text-[9px] sm:text-[10px]">
                  {pendingQuotesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Header: Brand, Navigation links (Desktop), and Actions */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full max-w-full">
        <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-1.5 sm:gap-4 lg:gap-8 h-15 sm:h-20">
            
            {/* Zone 1: Mobile/Tablet Burger + Brand Wordmark */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink min-w-0">
              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Ouvrir le menu de navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />}
              </button>

              {/* Brand Logo & Wordmark (Scale cleanly on all phones: iPhone, Samsung, Nokia, Tablets & PC) */}
              <button
                onClick={() => setActiveTab('accueil')}
                className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 text-left group shrink-0"
              >
                <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-extrabold text-sm xs:text-base sm:text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  ⚡
                </div>
                <div className="min-w-0">
                  <span className="font-heading font-extrabold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl tracking-tight text-slate-900 whitespace-nowrap block leading-tight">
                    DIARRA ENERGIE
                  </span>
                  <span className="text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-[10px] uppercase font-bold tracking-widest text-amber-600 block -mt-0.5 sm:-mt-1">
                    & BUSINESS
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links for Computers & Tablets (>= 1024px) in Exact Requested Order */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-5 text-xs xl:text-[13px] 2xl:text-sm font-semibold text-slate-700 shrink min-w-0">
              <button
                onClick={() => setActiveTab('boutique')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1.5 px-1 ${
                  activeTab === 'boutique' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : ''
                }`}
              >
                Boutique en Ligne
              </button>

              <button
                onClick={() => setActiveTab('eclairage-solaire')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1.5 px-1 ${
                  activeTab === 'eclairage-solaire' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : ''
                }`}
              >
                Éclairage Solaire
              </button>

              <button
                onClick={() => setActiveTab('pompage-solaire')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1.5 px-1 ${
                  activeTab === 'pompage-solaire' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : ''
                }`}
              >
                Pompes & Forages
              </button>

              <button
                onClick={() => setActiveTab('kits-solaires')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1.5 px-1 ${
                  activeTab === 'kits-solaires' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : ''
                }`}
              >
                Kits & Stockage
              </button>

              <button
                onClick={() => setActiveTab('realisations')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1.5 px-1 ${
                  activeTab === 'realisations' ? 'text-amber-600 font-bold border-b-2 border-amber-500' : ''
                }`}
              >
                Nos Réalisations
              </button>

              {/* Toutes les Rubriques Dropdown */}
              <div className="relative" ref={rubriquesRef}>
                <button
                  type="button"
                  onClick={() => setRubriquesDropdownOpen(!rubriquesDropdownOpen)}
                  className={`flex items-center gap-1 transition-colors whitespace-nowrap py-1.5 px-2.5 rounded-lg font-semibold cursor-pointer ${
                    rubriquesDropdownOpen ? 'bg-slate-100 text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-expanded={rubriquesDropdownOpen}
                >
                  <span>Toutes les Rubriques</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      rubriquesDropdownOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {rubriquesDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-h-[calc(100vh-110px)] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-[70] text-xs animate-in fade-in slide-in-from-top-1 duration-150 divide-y divide-slate-100 ring-1 ring-black/5">
                    <div className="pb-2 space-y-0.5">
                      <div className="px-3.5 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                        Équipements & Solutions
                      </div>
                      <button
                        type="button"
                        onClick={() => { setActiveTab('eclairage-electrique'); setRubriquesDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-2 hover:bg-amber-50 hover:text-amber-900 text-slate-800 font-medium flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>Éclairage Public Électrique & LED</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                      <button
                        type="button"
                        onClick={() => { setActiveTab('composants-solaires'); setRubriquesDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-2 hover:bg-amber-50 hover:text-amber-900 text-slate-800 font-medium flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>Panneaux, Batteries & Onduleurs</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                      <button
                        type="button"
                        onClick={() => { setActiveTab('services'); setRubriquesDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-2 hover:bg-amber-50 hover:text-amber-900 text-slate-800 font-medium flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>Nos Services & Maintenance</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>

                    <div className="py-2 space-y-0.5">
                      <div className="px-3.5 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                        Informations & Entreprise
                      </div>
                      <button
                        type="button"
                        onClick={() => { setActiveTab('a-propos'); setRubriquesDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-800 font-medium transition-colors cursor-pointer"
                      >
                        À Propos de Nous
                      </button>
                      <button
                        type="button"
                        onClick={() => { setActiveTab('actualites'); setRubriquesDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-800 font-medium transition-colors cursor-pointer"
                      >
                        Actualités & Conseils Solaires
                      </button>
                      <button
                        type="button"
                        onClick={() => { setActiveTab('contact'); setRubriquesDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-800 font-medium transition-colors cursor-pointer"
                      >
                        Contact & Agences Régionales
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (isAdminAuthenticated) {
                            setActiveTab('admin');
                          } else {
                            setActiveTab('compte');
                          }
                          setRubriquesDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-800 font-medium flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>{isAdminAuthenticated ? "Espace Admin (Gestion Commandes)" : "Mon Compte & Suivi Commandes"}</span>
                        {!isAdminAuthenticated && unreadAdminCount > 0 && (
                          <span className="px-1.5 py-0.5 bg-emerald-500 text-white font-extrabold text-[10px] rounded-full">
                            {unreadAdminCount}
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="pt-2">
                      {/* Official SunLumin Catalog Public Link */}
                      <button
                        type="button"
                        onClick={() => { openSunLuminModal(); setRubriquesDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-2.5 bg-gradient-to-r from-amber-50 to-amber-100/70 hover:from-amber-100 hover:to-amber-200/80 text-amber-950 font-bold flex items-center justify-between rounded-xl transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5">
                          <Sun className="w-4 h-4 text-amber-600" />
                          <span>Solutions SunLumin 2026 (Officiel)</span>
                        </div>
                        <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded shadow-2xs">PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: Cart & Demander un Devis (Right aligned across all devices) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Compare Tray Icon */}
              {comparisonList.length > 0 && (
                <button
                  onClick={() => setActiveTab('boutique')}
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
                  title="Comparer les équipements"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden lg:inline">Comparer</span>
                  <span className="font-bold">({comparisonList.length})</span>
                </button>
              )}

              {/* Shopping Cart (Chariot) Button with Counter */}
              <button
                onClick={() => setActiveTab('panier')}
                className="relative p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Voir le panier (Chariot)"
                title="Mon Panier"
              >
                <ShoppingCart className="w-5 h-5 sm:w-5 sm:h-5 text-slate-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Action Button: Demander un Devis */}
              <button
                onClick={() => setActiveTab('devis')}
                className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 rounded-xl shadow-xs transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 shrink-0"
              >
                <FileText className="w-4 h-4 text-slate-950 shrink-0" />
                <span className="hidden xs:inline">Demander un Devis</span>
                <span className="xs:hidden">Devis</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Responsive Sub-Navigation Category Strip (Mobile & Tablet Instant Access: iPhones, Samsung, Nokia, iPad) */}
        <div className="lg:hidden bg-slate-50 border-t border-slate-200/80 px-2 sm:px-4 py-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full max-w-full">
          <div className="flex items-center gap-1.5 sm:gap-2 w-max text-xs font-semibold text-slate-700">
            <button
              onClick={() => setActiveTab('boutique')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'boutique'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              Boutique en Ligne
            </button>

            <button
              onClick={() => setActiveTab('eclairage-solaire')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'eclairage-solaire'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              Éclairage Solaire
            </button>

            <button
              onClick={() => setActiveTab('pompage-solaire')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'pompage-solaire'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              Pompes & Forages
            </button>

            <button
              onClick={() => setActiveTab('kits-solaires')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'kits-solaires'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              Kits & Stockage
            </button>

            <button
              onClick={() => setActiveTab('realisations')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'realisations'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              Nos Réalisations
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-slate-900 text-amber-300 hover:bg-slate-800 font-bold flex items-center gap-1"
            >
              <span>Toutes les Rubriques</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={openSunLuminModal}
              className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 flex items-center gap-1"
            >
              <Sun className="w-3 h-3 text-amber-700" />
              <span>Doc SunLumin</span>
            </button>
          </div>
        </div>

        {/* 4. Complete Mobile/Tablet Slide-over Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-8 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Navigation DIARRA ENERGIE
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official SunLumin Catalog Banner inside Drawer */}
            <div
              onClick={() => { openSunLuminModal(); setMobileMenuOpen(false); }}
              className="p-3.5 bg-gradient-to-r from-slate-950 to-amber-950 text-white rounded-xl cursor-pointer flex items-center justify-between border border-amber-500/30 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Sun className="w-4 h-4 text-slate-950" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xs text-white block">
                    Catalogue Technique SunLumin 2026
                  </span>
                  <span className="text-[10px] text-amber-300/90 block">
                    22 pages de solutions d'éclairage solaire et IoT
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </div>

            {/* Core 6 Rubriques in exact specified order */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Rubriques Principales
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => { setActiveTab('boutique'); setMobileMenuOpen(false); }}
                  className={`p-3 text-left rounded-xl font-bold flex items-center justify-between transition-colors ${
                    activeTab === 'boutique' ? 'bg-amber-400 text-slate-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingCart className="w-4 h-4 text-amber-600" />
                    <span>Boutique en Ligne</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => { setActiveTab('eclairage-solaire'); setMobileMenuOpen(false); }}
                  className={`p-3 text-left rounded-xl font-bold flex items-center justify-between transition-colors ${
                    activeTab === 'eclairage-solaire' ? 'bg-amber-400 text-slate-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>Éclairage Solaire</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => { setActiveTab('pompage-solaire'); setMobileMenuOpen(false); }}
                  className={`p-3 text-left rounded-xl font-bold flex items-center justify-between transition-colors ${
                    activeTab === 'pompage-solaire' ? 'bg-amber-400 text-slate-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Droplet className="w-4 h-4 text-sky-600" />
                    <span>Pompes & Forages</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => { setActiveTab('kits-solaires'); setMobileMenuOpen(false); }}
                  className={`p-3 text-left rounded-xl font-bold flex items-center justify-between transition-colors ${
                    activeTab === 'kits-solaires' ? 'bg-amber-400 text-slate-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BatteryCharging className="w-4 h-4 text-emerald-600" />
                    <span>Kits & Stockage</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => { setActiveTab('realisations'); setMobileMenuOpen(false); }}
                  className={`p-3 text-left rounded-xl font-bold flex items-center justify-between transition-colors ${
                    activeTab === 'realisations' ? 'bg-amber-400 text-slate-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Nos Réalisations</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }}
                  className={`p-3 text-left rounded-xl font-bold flex items-center justify-between transition-colors ${
                    activeTab === 'accueil' ? 'bg-amber-400 text-slate-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>⚡</span>
                    <span>Page d'Accueil</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Toutes les autres rubriques */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Toutes les Autres Rubriques & Services
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => { setActiveTab('eclairage-electrique'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium"
                >
                  Éclairage Électrique
                </button>
                <button
                  onClick={() => { setActiveTab('composants-solaires'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium"
                >
                  Panneaux & Onduleurs
                </button>
                <button
                  onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium"
                >
                  Services & Pose
                </button>
                <button
                  onClick={() => { setActiveTab('a-propos'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium"
                >
                  À Propos de Nous
                </button>
                <button
                  onClick={() => { setActiveTab('actualites'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium"
                >
                  Actualités & Blog
                </button>
                <button
                  onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium"
                >
                  Contact & Agences
                </button>
              </div>
            </div>

            {/* Actions & WhatsApp Support in Drawer */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <button
                onClick={() => { setActiveTab('devis'); setMobileMenuOpen(false); }}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>Demander un Devis Technique</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="https://wa.me/221771149539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Espace Admin</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </header>
    </>
  );
};
