import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  MessageCircle,
  ShieldCheck,
  User,
  Clock,
  Sparkles,
  ShoppingBag,
  Package,
  CheckCheck
} from 'lucide-react';

export const ProductDiscussionModal: React.FC = () => {
  const {
    isDiscussionModalOpen,
    closeDiscussionModal,
    activeDiscussionProduct,
    currentClient,
    discussions,
    sendMessageAsClient,
    formatPrice,
    activeTab,
    setActiveTab,
    openWhatsAppChat
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  // Find existing discussion for current client
  const clientDiscussion = currentClient
    ? discussions.find(
        (d) =>
          d.clientId === currentClient.id ||
          (d.clientEmail && d.clientEmail.toLowerCase() === currentClient.email.toLowerCase())
      )
    : null;

  const messages = clientDiscussion ? clientDiscussion.messages : [];

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  useEffect(() => {
    if (isDiscussionModalOpen) {
      if (messages.length > prevCountRef.current) {
        scrollToBottom('smooth');
      } else {
        const timer = setTimeout(() => scrollToBottom('auto'), 50);
        return () => clearTimeout(timer);
      }
      prevCountRef.current = messages.length;
    }
  }, [isDiscussionModalOpen, messages.length]);

  if (!isDiscussionModalOpen || !currentClient) return null;

  const product = activeDiscussionProduct || (clientDiscussion?.produitReference ? {
    id: clientDiscussion.produitReference.id,
    nom: clientDiscussion.produitReference.nom,
    reference: clientDiscussion.produitReference.reference || '',
    prixFCFA: clientDiscussion.produitReference.prixFCFA || 0,
    imagePrincipale: clientDiscussion.produitReference.image || ''
  } : null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    sendMessageAsClient(
      currentClient.id,
      messageText,
      activeDiscussionProduct || undefined,
      `Page ${activeTab}`
    );
    setMessageText('');
    setTimeout(() => scrollToBottom('smooth'), 50);
  };

  const quickQuestions = [
    'Est-ce que cet équipement est disponible en stock à Dakar ?',
    'Quel est le délai de livraison dans ma ville ou région ?',
    'Proposez-vous le service de pose et de raccordement technique ?',
    'Puis-je bénéficier d’un tarif remisé pour une commande quantitative ?'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <MessageCircle className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-white">
                  Discussion avec l'Administration
                </h3>
                <span className="flex items-center gap-1 bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  En ligne
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Client : <strong>{currentClient.nomComplet}</strong> ({currentClient.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                const prod = activeDiscussionProduct || (clientDiscussion?.produitReference ? {
                  id: clientDiscussion.produitReference.id,
                  nom: clientDiscussion.produitReference.nom,
                  reference: clientDiscussion.produitReference.reference || '',
                  prixFCFA: clientDiscussion.produitReference.prixFCFA || 0,
                  imagePrincipale: clientDiscussion.produitReference.image || ''
                } as any : undefined);
                openWhatsAppChat(prod);
              }}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1 shrink-0"
              title="Passer sur WhatsApp avec un conseiller"
            >
              <span>💬 WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => {
                closeDiscussionModal();
                setActiveTab('compte');
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-[11px] rounded-lg transition-colors"
              title="Consulter l'historique complet dans Mon Compte & Suivi"
            >
              <User className="w-3 h-3" />
              <span>Mon Compte</span>
            </button>

            <button
              onClick={closeDiscussionModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Fermer la discussion"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Attached Product Context Banner */}
        {product && (
          <div className="bg-amber-50/90 border-b border-amber-200/80 p-3 sm:p-3.5 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {product.imagePrincipale ? (
                <img
                  src={product.imagePrincipale}
                  alt={product.nom}
                  className="w-12 h-12 rounded-lg object-cover border border-amber-200 bg-white shrink-0"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (product.imagePrincipale && !target.src.includes('fallbacked')) {
                      const filename = product.imagePrincipale.split('/').pop();
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
                <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  Matériel concerné par votre demande
                </div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                  {product.nom}
                </h4>
                {product.prixFCFA ? (
                  <span className="font-mono font-bold text-xs text-amber-900">
                    {formatPrice(product.prixFCFA)}
                  </span>
                ) : null}
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantie usine</span>
            </span>
          </div>
        )}

        {/* Message Feed Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 bg-slate-50 min-h-[260px] max-h-[50vh]">
          {messages.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-2xs">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-800">
                Démarrer une conversation directe
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Posez vos questions techniques, demandez des disponibilités ou négociez directement avec l'équipe de direction et nos ingénieurs solaires.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isClient = msg.sender === 'client';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isClient ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    {isClient ? (
                      <>
                        <span className="font-semibold text-slate-700">Vous ({msg.senderName})</span>
                        <User className="w-3 h-3 text-slate-400" />
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-bold text-emerald-800">Direction DIARRA ENERGIE</span>
                      </>
                    )}
                    <span className="text-[10px] text-slate-400">· {msg.date}</span>
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      isClient
                        ? 'bg-slate-900 text-white rounded-tr-none'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none font-medium'
                    }`}
                  >
                    {msg.texte}
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center gap-1 px-1">
                    {isClient && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Suggested Questions */}
        <div className="bg-slate-100 border-t border-slate-200 px-3 sm:px-4 py-2 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1.5 w-max">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Questions rapides :</span>
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessageText(q)}
                className="text-[11px] bg-white hover:bg-amber-100 active:bg-amber-200 text-slate-700 hover:text-amber-950 border border-slate-200 rounded-lg px-2.5 py-1 whitespace-nowrap transition-colors font-medium shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              required
              placeholder="Écrivez votre message à l'administration..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-2xs shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Envoyer</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5 text-center">
            Les messages sont transmis instantanément sur le tableau de bord de l'administrateur DIARRA ENERGIE.
          </p>
        </form>

      </div>
    </div>
  );
};
