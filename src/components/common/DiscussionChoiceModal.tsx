import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Package
} from 'lucide-react';

export const DiscussionChoiceModal: React.FC = () => {
  const {
    isDiscussionChoiceOpen,
    closeDiscussionChoice,
    activeDiscussionProduct,
    openOnlineChatModal,
    openWhatsAppChat,
    selectedCountry,
    formatPrice
  } = useApp();

  if (!isDiscussionChoiceOpen) return null;

  const phoneNumbers: Record<string, string> = {
    'Sénégal': '+221 77 114 95 39',
    'Bénin': '+229 97 00 00 00',
    'Togo': '+228 90 00 00 00',
    'Sous-Région': '+221 77 114 95 39'
  };

  const currentDisplayPhone = phoneNumbers[selectedCountry] || '+221 77 114 95 39';

  const handleChooseWhatsApp = () => {
    openWhatsAppChat(activeDiscussionProduct || undefined);
    closeDiscussionChoice();
  };

  const handleChooseOnline = () => {
    openOnlineChatModal(activeDiscussionProduct || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <MessageCircle className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-white">
                Contacter l'Administration & Support
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                DIARRA ENERGIE & BUSINESS · {selectedCountry}
              </p>
            </div>
          </div>

          <button
            onClick={closeDiscussionChoice}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Attached Product Context (if opened from product card or tech sheet) */}
        {activeDiscussionProduct && (
          <div className="bg-amber-50/90 border-b border-amber-200 p-3 sm:p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {activeDiscussionProduct.imagePrincipale ? (
                <img
                  src={activeDiscussionProduct.imagePrincipale}
                  alt={activeDiscussionProduct.nom}
                  className="w-12 h-12 rounded-lg object-cover border border-amber-200 bg-white shrink-0"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (activeDiscussionProduct.imagePrincipale && !target.src.includes('fallbacked')) {
                      const filename = activeDiscussionProduct.imagePrincipale.split('/').pop();
                      if (filename) {
                        target.src = `./images/${filename}?fallbacked=1`;
                      }
                    }
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center font-bold shrink-0">
                  <Package className="w-6 h-6" />
                </div>
              )}
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  Équipement sélectionné
                </span>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                  {activeDiscussionProduct.nom}
                </h4>
                {activeDiscussionProduct.prixFCFA ? (
                  <span className="font-mono font-bold text-xs text-amber-900">
                    {formatPrice(activeDiscussionProduct.prixFCFA)}
                  </span>
                ) : null}
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantie</span>
            </span>
          </div>
        )}

        {/* Modal Body: Two Choice Options */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-900">
              Comment souhaitez-vous échanger avec nos conseillers ?
            </h4>
            <p className="text-xs text-slate-500">
              Sélectionnez le canal de communication le plus adapté à votre besoin :
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {/* Option 1: WhatsApp */}
            <button
              onClick={handleChooseWhatsApp}
              className="w-full text-left p-4 rounded-xl border-2 border-emerald-500 hover:border-emerald-600 bg-emerald-50/40 hover:bg-emerald-50 transition-all flex items-center justify-between gap-3 group shadow-xs hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  💬
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-sm text-slate-900 group-hover:text-emerald-800">
                      Discuter par WhatsApp
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                      Recommandé mobile
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Échange direct et instantané avec un ingénieur technico-commercial. Idéal pour envoyer des photos de votre toiture ou de votre forage.
                  </p>
                  <div className="text-[11px] font-mono font-bold text-emerald-700 flex items-center gap-1.5 pt-0.5">
                    <span>Ligne directe : {currentDisplayPhone}</span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white border border-emerald-300 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            {/* Option 2: En Ligne (Chat DIARRA ENERGIE) */}
            <button
              onClick={handleChooseOnline}
              className="w-full text-left p-4 rounded-xl border-2 border-slate-900 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/50 transition-all flex items-center justify-between gap-3 group shadow-xs hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-sm text-slate-900 group-hover:text-amber-900">
                      Discuter en Ligne (Espace Client)
                    </span>
                    <span className="bg-slate-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Chat Web Officiel
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dialogue sécurisé direct avec l'administration. Vos questions et les réponses officielles sont archivées dans votre compte pour votre suivi.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Support en ligne actif · Réponse rapide</span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-700 shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Reassurance footer note */}
          <div className="pt-2 text-center border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Service technique disponible du Lundi au Samedi de 08h à 19h</span>
          </div>
        </div>
      </div>
    </div>
  );
};
