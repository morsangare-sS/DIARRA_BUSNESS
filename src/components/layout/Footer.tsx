import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_CONTACTS } from '../../data/mockData';
import { Mail, Phone, MapPin, Shield, Zap, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Regional Commitment & Value Proposition Strip */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-300">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Matériel Certifié & Garanti</p>
                <p className="text-xs text-slate-400 mt-1">Normes IEC, CE, TÜV. Garanties directes usine de 2 à 25 ans.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Bureau d'Études Dédié</p>
                <p className="text-xs text-slate-400 mt-1">Dimensionnement solaire & hydraulique certifié avant chaque projet.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Paiements Locaux Sécurisés</p>
                <p className="text-xs text-slate-400 mt-1">Wave, Orange Money, Moov, MTN MoMo, Carte Bancaire & Virements.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Présence Régionale Active</p>
                <p className="text-xs text-slate-400 mt-1">Équipes de pose & SAV au Sénégal, au Bénin et au Togo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links - Structure (18 rubriques) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Identity & Regional Hubs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg">
                ⚡
              </div>
              <span className="font-heading font-extrabold text-white text-base tracking-tight">
                DIARRA ENERGIE & BUSINESS
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Maître d'œuvre et fournisseur d'équipements solaires, éclairage public photovoltaïque et électrique, systèmes de pompage pour forages et kits d'autonomie énergétique en Afrique de l'Ouest.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+221 77 114 95 39 (Dakar) · +229 97 00 00 00 (Cotonou)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contact@diarraenergie.com</span>
              </div>
            </div>

            {/* Mobile Money & Payment Method Badges (Visual Logos) */}
            <div className="pt-3">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-2.5 flex items-center gap-1.5">
                <span>Paiements acceptés en ligne</span>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800/80">100% Sécurisé</span>
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Wave Logo */}
                <div className="flex items-center gap-1.5 bg-[#1dc3eb]/15 hover:bg-[#1dc3eb]/25 border border-[#1dc3eb]/40 px-2 py-1 rounded-lg transition-colors group cursor-default" title="Paiement instantané Wave Sénégal & UEMOA sans frais">
                  <img
                    src="/assets/aistudio/image_0375626b.png"
                    alt="Wave"
                    className="w-4 h-4 rounded-xs object-cover shrink-0 shadow-2xs"
                  />
                  <span className="text-xs font-bold text-[#38d8ff] tracking-tight">Wave</span>
                </div>

                {/* Orange Money Logo */}
                <div className="flex items-center gap-1.5 bg-[#ff6600]/15 hover:bg-[#ff6600]/25 border border-[#ff6600]/40 px-2 py-1 rounded-lg transition-colors group cursor-default" title="Orange Money Sénégal, Bénin, Côte d'Ivoire, Mali">
                  <img
                    src="/assets/aistudio/image_f207f722.png"
                    alt="Orange Money"
                    className="w-4 h-4 rounded-xs object-contain bg-white p-0.5 shrink-0 shadow-2xs"
                  />
                  <span className="text-xs font-bold text-[#ff8533] tracking-tight">Orange Money</span>
                </div>

                {/* Free Money Logo */}
                <div className="flex items-center gap-1.5 bg-[#e21422]/15 hover:bg-[#e21422]/25 border border-[#e21422]/40 px-2.5 py-1.5 rounded-lg transition-colors group cursor-default" title="Free Money Sénégal">
                  <div className="w-4 h-4 rounded bg-[#e21422] flex items-center justify-center font-black text-[8px] italic text-white shrink-0 leading-none">
                    free
                  </div>
                  <span className="text-xs font-bold text-[#ff5260] tracking-tight">Free Money</span>
                </div>

                {/* Moov Money Logo */}
                <div className="flex items-center gap-1.5 bg-[#005ca9]/15 hover:bg-[#005ca9]/25 border border-[#005ca9]/40 px-2.5 py-1.5 rounded-lg transition-colors group cursor-default" title="Moov Money Bénin & Togo">
                  <div className="w-4 h-4 rounded bg-gradient-to-tr from-[#005ca9] to-[#f37021] flex items-center justify-center font-bold text-[8px] text-white shrink-0 leading-none">
                    M
                  </div>
                  <span className="text-xs font-bold text-[#62b4ff] tracking-tight">Moov Money</span>
                </div>

                {/* MTN MoMo Logo */}
                <div className="flex items-center gap-1.5 bg-[#ffcc00]/15 hover:bg-[#ffcc00]/25 border border-[#ffcc00]/40 px-2.5 py-1.5 rounded-lg transition-colors group cursor-default" title="MTN Mobile Money">
                  <div className="w-4 h-4 rounded-full bg-[#ffcc00] flex items-center justify-center font-black text-[8px] text-slate-950 shrink-0 leading-none">
                    M
                  </div>
                  <span className="text-xs font-bold text-[#ffe066] tracking-tight">MTN MoMo</span>
                </div>

                {/* Visa & Mastercard */}
                <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-2.5 py-1.5 rounded-lg cursor-default" title="Cartes Bancaires Visa & Mastercard 3D Secure">
                  {/* Visa */}
                  <span className="font-black italic text-xs tracking-tighter text-sky-400">VISA</span>
                  <span className="text-slate-600">|</span>
                  {/* Mastercard Circles */}
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] opacity-90" />
                  </div>
                </div>

                {/* Virement Bancaire */}
                <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 px-2.5 py-1.5 rounded-lg text-slate-300 text-xs font-medium cursor-default" title="Virement bancaire professionnel CBAO, BICIS, BOA, SGBS">
                  <span className="text-amber-400 font-bold">🏦</span>
                  <span>Virement Bancaire</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions Énergétiques (Rubriques 3, 4, 5, 6, 7) */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-xs uppercase tracking-wider">Nos Solutions</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('eclairage-solaire')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  3. Éclairage public solaire
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('eclairage-electrique')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  4. Éclairage public électrique & LED
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pompage-solaire')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  5. Pompes solaires & Forages
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('kits-solaires')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  6. Kits solaires & Autonomie
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('composants-solaires')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  7. Panneaux, batteries & onduleurs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Métiers & Projets (Rubriques 8, 9, 10, 11, 12) */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-xs uppercase tracking-wider">Expertise & E-Commerce</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  8. Nos services d'ingénierie
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('realisations')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  9. Nos réalisations & références
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('boutique')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-400 font-medium"
                >
                  10. Boutique en ligne
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('devis')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-400 font-medium"
                >
                  11. Demande de devis technique
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('actualites')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  12. Actualités et conseils
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Espace Client & Cadre Légal (Rubriques 13, 14, 15, 16, 17, 18) */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-xs uppercase tracking-wider">Espace Client & Légal</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  13. Contact & Nos Agences
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('compte')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  14. Mon compte & Suivi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('panier')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  15. Panier et commande
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('cgv')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  16. Conditions Générales de Vente
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('confidentialite')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  17. Politique de confidentialité
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('livraison')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  18. Politique de livraison et retour
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Espace de Connexion Administration - Affiché STRICTEMENT et UNIQUEMENT sur la page À Propos de Nous */}
        {activeTab === 'a-propos' && (
          <div className="mt-10 pt-6 border-t border-slate-900 animate-in fade-in duration-300">
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                  <ShieldCheck className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Accès Direction & Équipe Technique</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-white">
                    Connexion Espace d'Administration
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5 max-w-xl">
                    Connexion sécurisée pour la gestion globale de la plateforme DIARRA ENERGIE : validation des devis, suivi des commandes, catalogue et stocks.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('admin')}
                className="w-full sm:w-auto px-5 py-3 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
              >
                <Lock className="w-4 h-4 text-slate-950" />
                <span>Connexion Espace Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 DIARRA ENERGIE & BUSINESS. Tous droits réservés. Registre OHADA.
          </div>
          <div className="flex items-center gap-4">
            {activeTab === 'a-propos' && (
              <>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1.5"
                  title="Accéder à l'espace d'administration"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Connexion Administration</span>
                </button>
                <span aria-hidden="true" className="text-slate-700">·</span>
              </>
            )}
            <span>Sénégal</span>
            <span aria-hidden="true">·</span>
            <span>Bénin</span>
            <span aria-hidden="true">·</span>
            <span>Togo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
