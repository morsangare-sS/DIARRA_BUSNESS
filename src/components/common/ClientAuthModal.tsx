import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SENEGAL_REGIONS, TargetCountry } from '../../types';
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
  Sparkles
} from 'lucide-react';

export const ClientAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    loginClient,
    registerClient,
    clients,
    currentClient,
    switchClient,
    selectedCountry
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(authModalMode);

  // Sync with authModalMode when modal opens
  React.useEffect(() => {
    setActiveTab(authModalMode);
  }, [authModalMode, isAuthModalOpen]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ville, setVille] = useState('Dakar');
  const [pays, setPays] = useState<TargetCountry>(selectedCountry || 'Sénégal');
  const [adresse, setAdresse] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [typeClient, setTypeClient] = useState<'particulier' | 'entreprise' | 'collectivite'>('particulier');
  const [raisonSociale, setRaisonSociale] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    loginClient(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !prenom.trim() || !email.trim() || !telephone.trim() || !ville.trim()) {
      return;
    }

    registerClient({
      nom,
      prenom,
      email,
      telephone,
      ville,
      pays,
      adresse,
      motDePasse: motDePasse || 'client123',
      typeClient,
      raisonSociale: typeClient === 'entreprise' ? raisonSociale : undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
            Pour garantir la confidentialité de vos achats, chaque client dispose de son propre panier personnel et de son historique de commande privé.
          </p>
        </div>

        {/* Status notice if already logged in */}
        {currentClient && (
          <div className="bg-amber-50 border-b border-amber-200 p-3.5 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Actuellement connecté : <strong>{currentClient.prenom} {currentClient.nom}</strong> ({currentClient.ville})
              </span>
            </div>
            <button
              onClick={() => closeAuthModal()}
              className="text-amber-800 font-bold hover:underline"
            >
              Fermer
            </button>
          </div>
        )}

        {/* Tab switcher */}
        <div className="grid grid-cols-2 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('login')}
            className={`py-3.5 text-center transition-all flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'login'
                ? 'border-amber-500 text-slate-900 bg-amber-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Se Connecter</span>
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`py-3.5 text-center transition-all flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'register'
                ? 'border-amber-500 text-slate-900 bg-amber-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Créer un Compte Client</span>
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* TAB 1: SE CONNECTER */}
          {activeTab === 'login' && (
            <div className="space-y-6">
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
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Connexion à mon Panier & Compte</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* DEMO / QUICK TEST ACCOUNTS (ARTICLE 14 & TEST ISOLATION) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Test Rapide d'Isolation : Basculer entre Clients</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Cliquez ci-dessous pour tester en 1 clic que <strong>le Client A ne voit pas ce que le Client B achète</strong>, et que chacun a son propre panier indépendant :
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {clients.map((c, idx) => {
                    const isCurrent = currentClient?.id === c.id;
                    const letter = idx === 0 ? 'A' : idx === 1 ? 'B' : 'C';
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          switchClient(c.id);
                          closeAuthModal();
                        }}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                          isCurrent
                            ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-[11px] text-amber-700">Client {letter}</span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Actif
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-slate-900 truncate">
                          {c.prenom} {c.nom}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          📍 {c.ville} ({c.pays})
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
                          {c.email}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CRÉER UN COMPTE CLIENT */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Création immédiate de votre compte client :</strong> Vos coordonnées (Nom, Prénom, Ville, Mail, Téléphone) seront automatiquement associées à vos commandes et transmises à l'administrateur pour la préparation logistique.
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
                    className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
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
                    className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
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
                    className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
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
                    placeholder="Ex: Ibrahima"
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
                    placeholder="Ex: Ndiaye"
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
                    Adresse Mail (Email) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="ibrahima.ndiaye@gmail.com"
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

              {/* Mot de passe */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Définir un Mot de passe *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="Au moins 6 caractères"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-4"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Créer mon Compte et Activer mon Panier Personnel</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
