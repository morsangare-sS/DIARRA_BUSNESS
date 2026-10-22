import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TargetCountry } from '../../types';
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Building,
  CheckCircle2,
  X,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';

export const ClientAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    loginClient,
    registerClient,
    currentClient,
    selectedCountry,
    isAdminAuthenticated,
    setActiveTab,
    loginWithGoogle,
    loginWithFacebook,
    activeDiscussionProduct,
    isDiscussionPending
  } = useApp();

  const [authTab, setAuthTab] = useState<'login' | 'register'>(authModalMode);

  // Sync with authModalMode when modal opens
  useEffect(() => {
    setAuthTab(authModalMode);
  }, [authModalMode, isAuthModalOpen]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginRememberMe, setLoginRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ville, setVille] = useState('Dakar');
  const [pays, setPays] = useState<TargetCountry>(selectedCountry || 'Sénégal');
  const [adresse, setAdresse] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerRememberMe, setRegisterRememberMe] = useState(true);
  const [typeClient, setTypeClient] = useState<'particulier' | 'entreprise' | 'collectivite'>('particulier');
  const [raisonSociale, setRaisonSociale] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Preload saved email from localStorage if available
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('deb_saved_client_email');
      if (savedEmail && !loginEmail) {
        setLoginEmail(savedEmail);
      }
    } catch {}
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError("L'adresse email est obligatoire.");
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Le mot de passe est obligatoire pour sécuriser votre compte.');
      return;
    }

    const success = loginClient(loginEmail, loginPassword, loginRememberMe);
    if (!success) {
      setLoginError("Identifiants incorrects. Vérifiez votre adresse email et votre mot de passe.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!nom.trim() || !prenom.trim() || !email.trim() || !telephone.trim() || !ville.trim()) {
      setRegisterError('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }

    if (!motDePasse || motDePasse.trim().length < 4) {
      setRegisterError('Le mot de passe est obligatoire (minimum 4 caractères).');
      return;
    }

    try {
      registerClient({
        nom,
        prenom,
        email,
        telephone,
        ville,
        pays,
        adresse,
        motDePasse: motDePasse.trim(),
        typeClient,
        raisonSociale: typeClient === 'entreprise' ? raisonSociale : undefined,
        rememberMe: registerRememberMe
      });
    } catch (err: any) {
      setRegisterError(err?.message || "Erreur lors de la création du compte client.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wide uppercase mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Boutique en Ligne DIARRA ENERGIE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Espace Compte Client & Panier Sécurisé
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Chaque client dispose de son propre compte, de son adresse e-mail, de son mot de passe et de son panier personnel sécurisé.
          </p>
        </div>

        {/* Context notice if opening from "Discuter" */}
        {(activeDiscussionProduct || isDiscussionPending) && !currentClient && (
          <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/25 to-amber-500/15 border-b border-amber-300 p-4 flex items-center gap-3.5 text-xs text-amber-950 animate-in fade-in duration-200">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
              💬
            </div>
            <div>
              <span className="font-extrabold text-slate-950 block text-sm">
                Discussion Directe avec l'Administration
              </span>
              <span className="text-[11px] text-slate-700 block mt-0.5">
                {activeDiscussionProduct ? (
                  <>Connectez-vous pour échanger directement avec notre équipe technique sur : <strong>{activeDiscussionProduct.nom}</strong></>
                ) : (
                  <>Connectez-vous pour poser vos questions, demander conseil et échanger en direct avec l'administration.</>
                )}
              </span>
              <span className="text-[10px] text-amber-900 font-semibold block mt-1">
                Connexion rapide via <strong>Google</strong>, <strong>Facebook</strong> ou <strong>Email et mot de passe</strong>.
              </span>
            </div>
          </div>
        )}

        {/* Status notice if already logged in */}
        {currentClient && (
          <div className="bg-amber-50 border-b border-amber-200 p-3.5 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Actuellement connecté : <strong>{currentClient.prenom} {currentClient.nom}</strong> ({currentClient.email})
              </span>
            </div>
            <button
              onClick={() => closeAuthModal()}
              className="text-amber-800 font-bold hover:underline cursor-pointer"
            >
              Fermer
            </button>
          </div>
        )}

        {isAdminAuthenticated ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Session Administrateur Active
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Vous êtes actuellement connecté en tant qu'administrateur. Pour des raisons strictes de sécurité et d'étanchéité des rôles, un administrateur ne peut pas accéder aux comptes clients.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  closeAuthModal();
                  setActiveTab('admin');
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Aller au Panneau Admin
              </button>
              <button
                onClick={closeAuthModal}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tab switcher */}
            <div className="grid grid-cols-2 border-b border-slate-200 text-xs font-bold">
              <button
                onClick={() => {
                  setAuthTab('login');
                  setLoginError('');
                }}
                className={`py-3.5 text-center transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
                  authTab === 'login'
                    ? 'border-amber-500 text-slate-900 bg-amber-50/40 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Se Connecter</span>
              </button>
              <button
                onClick={() => {
                  setAuthTab('register');
                  setRegisterError('');
                }}
                className={`py-3.5 text-center transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
                  authTab === 'register'
                    ? 'border-amber-500 text-slate-900 bg-amber-50/40 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Créer un Compte Client</span>
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Social Connect Options (Google & Facebook in 1-Click with direct authentication) */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
                  Connexion Rapide en 1 Clic
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => loginWithGoogle('morsangare@gmail.com', 'Mor Sangaré', true)}
                    className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-2xs transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
                    title="Se connecter avec votre compte Google (ouvre la fenêtre d'authentification)"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continuer avec Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => loginWithFacebook('mariama.sarr@facebook.com', 'Mariama Sarr', true)}
                    className="w-full py-2.5 px-3 bg-[#1877F2] hover:bg-[#166fe5] active:bg-[#125ec4] text-white rounded-xl text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
                    title="Se connecter avec votre compte Facebook (ouvre la fenêtre d'authentification)"
                  >
                    <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Continuer avec Facebook</span>
                  </button>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="grow border-t border-slate-200"></div>
                  <span className="shrink mx-3 text-[10px] text-slate-400 font-semibold uppercase">ou avec email et mot de passe</span>
                  <div className="grow border-t border-slate-200"></div>
                </div>
              </div>

              {/* TAB 1: SE CONNECTER */}
              {authTab === 'login' && (
                <div className="space-y-4">
                  {loginError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Adresse Email Client *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="votre.email@domaine.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                          aria-label={showLoginPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        >
                          {showLoginPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* "Se souvenir de moi" Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
                        <input
                          type="checkbox"
                          checked={loginRememberMe}
                          onChange={(e) => setLoginRememberMe(e.target.checked)}
                          className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                        />
                        <span className="font-medium">Se souvenir de moi pour mes prochaines visites</span>
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Se Connecter à mon Espace Client</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-2 text-center text-xs text-slate-500">
                      <span>Pas encore de compte ? </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('register');
                          setLoginError('');
                        }}
                        className="text-amber-700 font-bold hover:underline cursor-pointer"
                      >
                        Créer un compte client
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: CRÉER UN COMPTE CLIENT */}
              {authTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {registerError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{registerError}</span>
                    </div>
                  )}

                  <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Compte client individuel :</strong> Chaque client possède sa propre adresse email, son mot de passe obligatoire et son panier personnel isolé.
                  </div>

                  {/* Type de client */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Type de Client
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTypeClient('particulier')}
                        className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                          typeClient === 'particulier'
                            ? 'bg-slate-900 text-white border-slate-900 font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Particulier
                      </button>
                      <button
                        type="button"
                        onClick={() => setTypeClient('entreprise')}
                        className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                          typeClient === 'entreprise'
                            ? 'bg-slate-900 text-white border-slate-900 font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Entreprise / PME
                      </button>
                      <button
                        type="button"
                        onClick={() => setTypeClient('collectivite')}
                        className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                          typeClient === 'collectivite'
                            ? 'bg-slate-900 text-white border-slate-900 font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Collectivité
                      </button>
                    </div>
                  </div>

                  {typeClient === 'entreprise' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Raison Sociale / Nom Entreprise
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Ex: Sahel Agro BTP SARL"
                          value={raisonSociale}
                          onChange={(e) => setRaisonSociale(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Prénom & Nom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Mor"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nom de Famille *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Sangaré"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Ville & Pays */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ville de résidence *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          placeholder="Ex: Dakar, Thiès, Saint-Louis..."
                          value={ville}
                          onChange={(e) => setVille(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Pays
                      </label>
                      <select
                        value={pays}
                        onChange={(e) => setPays(e.target.value as TargetCountry)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Sénégal">🇸🇳 Sénégal</option>
                        <option value="Bénin">🇧🇯 Bénin</option>
                        <option value="Togo">🇹🇬 Togo</option>
                        <option value="Sous-Région">🌍 Autre pays sous-région</option>
                      </select>
                    </div>
                  </div>

                  {/* Email & Téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Adresse Email Individuelle *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          required
                          placeholder="votre.email@domaine.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Numéro de Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          required
                          placeholder="+221 77 123 45 67"
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Adresse de livraison */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Adresse de livraison / Quartier
                    </label>
                    <input
                      type="text"
                      placeholder="Quartier, Rue, N° de villa ou repère"
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Mot de passe obligatoire */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Définir un Mot de passe Obligatoire *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        required
                        minLength={4}
                        placeholder="Au moins 4 caractères"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                        aria-label={showRegisterPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Ce mot de passe protégera votre espace client personnel et votre historique.
                    </span>
                  </div>

                  {/* "Se souvenir de moi" Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={registerRememberMe}
                        onChange={(e) => setRegisterRememberMe(e.target.checked)}
                        className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                      />
                      <span className="font-medium">Se souvenir de moi pour mes prochaines visites</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Créer mon Compte et Activer mon Panier Personnel</span>
                  </button>

                  <div className="pt-2 text-center text-xs text-slate-500">
                    <span>Déjà inscrit ? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthTab('login');
                        setRegisterError('');
                      }}
                      className="text-amber-700 font-bold hover:underline cursor-pointer"
                    >
                      Se connecter avec son mot de passe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
