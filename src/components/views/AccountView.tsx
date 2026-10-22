import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, QuoteRequest, ClientDiscussion } from '../../types';
import {
  User,
  ShoppingBag,
  FileText,
  Clock,
  CheckCircle,
  Truck,
  Printer,
  ChevronRight,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  LogOut,
  MessageCircle,
  Send,
  Reply,
  Sparkles,
  ExternalLink,
  Package,
  Plus,
  ArrowRight,
  ArrowDown,
  CheckCheck,
  AlertCircle
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    orders,
    clientOrders,
    quotes,
    formatPrice,
    setActiveTab,
    isAdminAuthenticated,
    adminUser,
    logoutAdmin,
    currentClient,
    openAuthModal,
    logoutClient,
    discussions,
    clientDiscussions,
    sendMessageAsClient,
    markDiscussionAsReadByClient,
    openDiscussionModal,
    openWhatsAppChat,
    setSpecModalProduct,
    products
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'commandes' | 'messages' | 'devis'>('commandes');
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<string | null>(null);
  const [clientReplyText, setClientReplyText] = useState('');
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopicSubject, setNewTopicSubject] = useState('Question générale sur mes équipements');
  const [newTopicMessage, setNewTopicMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  // Auto-select first discussion if none selected
  useEffect(() => {
    if (clientDiscussions.length > 0 && !selectedDiscussionId) {
      setSelectedDiscussionId(clientDiscussions[0].id);
    }
  }, [clientDiscussions.length, selectedDiscussionId]);

  // When switching to messages or selecting a discussion, mark as read by client (only when needed)
  useEffect(() => {
    if (activeTabSub === 'messages' && selectedDiscussionId) {
      markDiscussionAsReadByClient(selectedDiscussionId);
    }
  }, [activeTabSub, selectedDiscussionId, markDiscussionAsReadByClient]);

  // Safe internal scroll to bottom (does NOT scroll whole page!)
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  const handleChatScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setShowScrollBottomBtn(distanceFromBottom > 100);
    }
  };

  // Safe scroll on active discussion switch
  useEffect(() => {
    if (activeTabSub === 'messages' && selectedDiscussionId) {
      const timer = setTimeout(() => scrollToBottom('auto'), 60);
      return () => clearTimeout(timer);
    }
  }, [activeTabSub, selectedDiscussionId]);

  // Unread messages count for client
  const unreadAdminCount = clientDiscussions.reduce(
    (acc, d) => acc + (d.nbNonLusClient || 0),
    0
  );

  // If Admin is connected: STRICTLY BLOCK ACCESS TO CLIENT ACCOUNT
  if (isAdminAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">
          Accès Restreint : Session Administrateur Active
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Vous êtes actuellement connecté avec le compte d'administration (<strong>{adminUser?.name || 'Administrateur'}</strong>). Pour garantir la stricte étanchéité des rôles et la confidentialité des clients, un administrateur ne peut pas accéder aux espaces clients individuels.
        </p>
        <div className="p-4 bg-slate-100 rounded-xl max-w-md mx-auto text-xs text-slate-600 border border-slate-200">
          Pour superviser et traiter l'ensemble des commandes, clients, stocks et devis, rendez-vous sur le Tableau de Bord Admin.
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('admin')}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            Aller au Tableau de Bord Admin
          </button>
          <button
            onClick={() => {
              logoutAdmin();
              setActiveTab('accueil');
            }}
            className="px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-all"
          >
            Déconnexion de la session Admin
          </button>
        </div>
      </div>
    );
  }

  // If not logged in as a client
  if (!currentClient) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">
          Connexion à votre Espace Client
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Veuillez vous connecter à votre compte client ou créer un profil pour consulter l'historique de vos commandes, le suivi de livraison et échanger directement avec l'administration.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            Se Connecter
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
          >
            Créer un Compte Client
          </button>
        </div>
      </div>
    );
  }

  const displayedOrders = clientOrders;
  const activeDiscussion = clientDiscussions.find((d) => d.id === selectedDiscussionId) || clientDiscussions[0];

  const getStatusBadge = (status: Order['statutCommande']) => {
    switch (status) {
      case 'confirmee':
        return <span className="font-mono text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Confirmée</span>;
      case 'en_preparation':
        return <span className="font-mono text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">En préparation</span>;
      case 'expediee':
        return <span className="font-mono text-[11px] text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">Expédiée</span>;
      case 'livree':
        return <span className="font-mono text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">Livrée</span>;
      case 'annulee':
        return <span className="font-mono text-[11px] text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Annulée</span>;
      default:
        return <span className="font-mono text-[11px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">En attente</span>;
    }
  };

  const getQuoteStatusBadge = (status: QuoteRequest['statut']) => {
    switch (status) {
      case 'devis_transmis':
        return <span className="font-mono text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Devis chiffré disponible</span>;
      case 'en_etude':
        return <span className="font-mono text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">En étude d'ingénierie</span>;
      case 'accepte':
        return <span className="font-mono text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">Validé & Gagné</span>;
      default:
        return <span className="font-mono text-[11px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">Dossier reçu</span>;
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientReplyText.trim() || !activeDiscussion) return;

    sendMessageAsClient(
      currentClient.id,
      clientReplyText.trim(),
      undefined,
      activeDiscussion.pageSource || 'Mon Compte & Suivi',
      activeDiscussion.id
    );

    setClientReplyText('');
    markDiscussionAsReadByClient(activeDiscussion.id);
    setTimeout(() => scrollToBottom('smooth'), 50);
  };

  const handleStartNewTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicMessage.trim()) return;

    const newDiscId = `disc-${Date.now()}`;
    sendMessageAsClient(
      currentClient.id,
      `[${newTopicSubject}] : ${newTopicMessage.trim()}`,
      undefined,
      `Espace Mon Compte - ${newTopicSubject}`,
      newDiscId
    );

    setNewTopicMessage('');
    setShowNewTopicForm(false);
    setSelectedDiscussionId(newDiscId);
    setActiveTabSub('messages');
  };

  const quickReplySuggestions = [
    'Merci beaucoup pour ces précisions, c’est bien noté.',
    'Quel est le délai de livraison exact à mon adresse ?',
    'Pouvez-vous me préparer et transmettre la facture proforma ?',
    'Je confirme mon accord pour commander ce matériel.',
    'Avez-vous besoin d’une visite technique sur site ?'
  ];

  const handleOpenDiscussionForOrder = (order: Order) => {
    // Check if an existing discussion already references this order
    const existing = clientDiscussions.find(
      (d) =>
        d.pageSource?.includes(order.numeroCommande) ||
        (order.numeroSuivi && d.pageSource?.includes(order.numeroSuivi)) ||
        d.messages.some((m) => m.texte.includes(order.numeroCommande))
    );

    if (existing) {
      setSelectedDiscussionId(existing.id);
      setActiveTabSub('messages');
      markDiscussionAsReadByClient(existing.id);
    } else {
      // Create or start a topic for this order
      const newDiscId = `disc-ord-${Date.now()}`;
      const intro = `Bonjour l'équipe DIARRA ENERGIE, je souhaite obtenir des informations sur le suivi de ma commande ${order.numeroCommande} (Suivi : ${order.numeroSuivi || 'en cours d’attribution'}).`;
      sendMessageAsClient(
        currentClient.id,
        intro,
        undefined,
        `Suivi Commande ${order.numeroCommande} (Bordereau ${order.numeroSuivi || 'En attente'})`,
        newDiscId
      );
      setSelectedDiscussionId(newDiscId);
      setActiveTabSub('messages');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
            Espace Client DIARRA ENERGIE
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Mon Compte & Suivi des Commandes
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Consultez en temps réel l'avancement de vos commandes, les réponses de l'administration et répondez directement à vos conseillers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => {
              setActiveTabSub('messages');
              setShowNewTopicForm(true);
            }}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Chat En Ligne</span>
          </button>
          <button
            onClick={() =>
              openWhatsAppChat(
                undefined,
                `Bonjour DIARRA ENERGIE, je suis le client ${currentClient.nomComplet} (Tél: ${currentClient.telephone || ''}) et je souhaite échanger avec un conseiller technique.`
              )
            }
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            title="Discuter directement sur WhatsApp"
          >
            <span>💬 WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveTab('devis')}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
          >
            Nouveau devis technique
          </button>
          <button
            onClick={logoutClient}
            className="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            title="Se déconnecter de votre compte client"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTabSub('commandes')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
            activeTabSub === 'commandes'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Mes Commandes & Suivis ({displayedOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTabSub('messages')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-colors relative ${
            activeTabSub === 'messages'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Échanges & Réponses de l'Admin ({clientDiscussions.length})</span>
          {unreadAdminCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-emerald-500 text-white font-bold text-[10px] rounded-full animate-pulse">
              {unreadAdminCount} nouvelle(s)
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTabSub('devis')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
            activeTabSub === 'devis'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Mes Dossiers de Devis ({quotes.length})</span>
        </button>
      </div>

      {/* 1. Orders & Tracking Tab */}
      {activeTabSub === 'commandes' && (
        <div className="space-y-6">
          {displayedOrders.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
              {displayedOrders.map((order) => {
                // Find any discussion matching this order
                const matchingDisc = clientDiscussions.find(
                  (d) =>
                    d.pageSource?.includes(order.numeroCommande) ||
                    (order.numeroSuivi && d.pageSource?.includes(order.numeroSuivi)) ||
                    d.messages.some((m) => m.texte.includes(order.numeroCommande))
                );

                const hasAdminReply = matchingDisc?.messages.some((m) => m.sender === 'admin');
                const lastMsg = matchingDisc?.messages[matchingDisc.messages.length - 1];

                return (
                  <div key={order.id} className="p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-slate-900">
                            {order.numeroCommande}
                          </span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-xs text-slate-500">{order.dateCreation}</span>
                        </div>
                        <span className="text-xs text-slate-600 block mt-0.5">
                          Client : {order.client.nomComplet} ({order.client.ville}, {order.client.pays})
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div>{getStatusBadge(order.statutCommande)}</div>
                        <span className="font-mono text-base font-bold text-slate-900">
                          {formatPrice(order.totalFCFA)}
                        </span>
                      </div>
                    </div>

                    {/* Items preview & Tracking info */}
                    <div className="bg-slate-50 p-3.5 rounded-lg text-xs space-y-2 border border-slate-100">
                      <div className="space-y-1">
                        {order.articles.map((art, idx) => (
                          <div key={idx} className="flex justify-between text-slate-700">
                            <span>{art.quantite}x {art.nom} ({art.reference})</span>
                            <span className="font-mono font-medium">{formatPrice(art.totalLigneFCFA)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                          <span className="text-slate-600">Bordereau transporteur / Suivi :</span>
                          {order.numeroSuivi ? (
                            <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {order.numeroSuivi}
                            </span>
                          ) : (
                            <span className="text-slate-500 italic">En attente d'attribution</span>
                          )}
                        </div>

                        {/* Interactive Discussion button for order */}
                        <button
                          onClick={() => handleOpenDiscussionForOrder(order)}
                          className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
                          <span>
                            {matchingDisc ? "Voir l'échange & Répondre" : "Contacter l'Admin pour ce colis"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* If Admin replied on this order, show preview banner */}
                    {matchingDisc && hasAdminReply && lastMsg && (
                      <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-start gap-2 text-emerald-950">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-emerald-800">
                              Dernière réponse de l'Administration ({lastMsg.date}) :
                            </span>
                            <p className="text-emerald-900 italic mt-0.5 line-clamp-1">
                              « {lastMsg.texte} »
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedDiscussionId(matchingDisc.id);
                            setActiveTabSub('messages');
                            markDiscussionAsReadByClient(matchingDisc.id);
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded shadow-xs whitespace-nowrap self-start sm:self-auto flex items-center gap-1"
                        >
                          <Reply className="w-3 h-3" />
                          <span>Répondre à l'Admin</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500 text-xs space-y-3">
              <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto" />
              <p>Vous n'avez pas encore passé de commande.</p>
              <button
                onClick={() => setActiveTab('boutique')}
                className="font-semibold text-amber-600 hover:underline"
              >
                Accéder à la boutique
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Messages & Admin Replies Tab (Core Feature) */}
      {activeTabSub === 'messages' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-5 sm:p-6 shadow-md border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Dialogue Direct &amp; Suivi Client · Administration
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                Mes Échanges & Réponses de l'Administration
              </h2>
              <p className="text-xs text-slate-300 max-w-xl">
                Consultez ci-dessous les réponses techniques et commerciales transmises par l'administration DIARRA ENERGIE. Vous pouvez poursuivre la discussion et envoyer vos réponses à tout moment.
              </p>
            </div>

            <button
              onClick={() => setShowNewTopicForm(!showNewTopicForm)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>{showNewTopicForm ? 'Fermer le formulaire' : 'Nouvelle question'}</span>
            </button>
          </div>

          {/* Optional: Start New Question / Topic Form */}
          {showNewTopicForm && (
            <form
              onSubmit={handleStartNewTopic}
              className="bg-white rounded-xl border-2 border-amber-400 p-5 space-y-4 shadow-sm animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-amber-600" />
                  <span>Poser une nouvelle question à l'administration</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowNewTopicForm(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Annuler
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Objet ou Sujet de la demande :
                  </label>
                  <select
                    value={newTopicSubject}
                    onChange={(e) => setNewTopicSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="Question générale sur mes équipements">Question générale sur mes équipements</option>
                    <option value="Suivi de livraison et expédition">Suivi de livraison et expédition de colis</option>
                    <option value="Demande d'assistance technique ou dimensionnement">Demande d'assistance technique ou dimensionnement</option>
                    <option value="Facturation et moyen de paiement">Facturation et moyen de paiement</option>
                    <option value="Service après-vente et garantie">Service après-vente et garantie constructeur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Votre message à l'administration :
                </label>
                <textarea
                  rows={3}
                  required
                  value={newTopicMessage}
                  onChange={(e) => setNewTopicMessage(e.target.value)}
                  placeholder="Expliquez clairement votre besoin, question technique ou référence de commande..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTopicForm(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmettre ma question</span>
                </button>
              </div>
            </form>
          )}

          {/* Main Discussion Layout */}
          {clientDiscussions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: List of Discussions */}
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                  <span>Mes conversations ({clientDiscussions.length})</span>
                  {unreadAdminCount > 0 && (
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      {unreadAdminCount} non lu(s)
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {clientDiscussions.map((disc) => {
                    const isSelected = disc.id === (activeDiscussion?.id || clientDiscussions[0].id);
                    const lastMsg = disc.messages[disc.messages.length - 1];
                    const isAdminLast = lastMsg?.sender === 'admin';

                    return (
                      <button
                        key={disc.id}
                        onClick={() => {
                          setSelectedDiscussionId(disc.id);
                          markDiscussionAsReadByClient(disc.id);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs space-y-2 ${
                          isSelected
                            ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-heading font-bold text-slate-900 truncate">
                            {disc.produitReference?.nom || disc.pageSource || 'Échange DIARRA ENERGIE'}
                          </span>
                          <span className="text-[10px] text-slate-500 shrink-0">
                            {disc.dateDernierMessage ? disc.dateDernierMessage.slice(5, 16) : ''}
                          </span>
                        </div>

                        <p className="text-slate-600 line-clamp-2 text-[11px] leading-relaxed">
                          {isAdminLast ? (
                            <strong className="text-emerald-700 font-semibold">Admin : </strong>
                          ) : (
                            <span className="text-slate-500">Vous : </span>
                          )}
                          {disc.dernierMessage}
                        </p>

                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                              isAdminLast
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {isAdminLast ? (
                              <>
                                <CheckCheck className="w-3 h-3 text-emerald-600" />
                                <span>Réponse Admin</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span>Attente réponse</span>
                              </>
                            )}
                          </span>

                          {disc.nbNonLusClient > 0 && (
                            <span className="px-1.5 py-0.2 bg-emerald-500 text-white font-bold rounded-full">
                              Nouveau
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Conversation & Reply Form */}
              {activeDiscussion && (
                <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-xs">
                  {/* Conversation Header */}
                  <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900">
                          {activeDiscussion.produitReference?.nom || activeDiscussion.pageSource || "Discussion avec l'Administration"}
                        </h3>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Conseiller DIARRA ENERGIE</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Contexte : <span className="font-medium text-slate-700">{activeDiscussion.pageSource || "Espace Client"}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => {
                          const prod = activeDiscussion.produitReference;
                          openWhatsAppChat(
                            prod
                              ? ({
                                  id: prod.id,
                                  nom: prod.nom,
                                  reference: prod.reference || '',
                                  prixFCFA: prod.prixFCFA || 0,
                                  imagePrincipale: prod.image || ''
                                } as any)
                              : undefined,
                            `Bonjour DIARRA ENERGIE, je suis ${currentClient.nomComplet}. Je fais suite à notre échange concernant ${activeDiscussion.produitReference?.nom || activeDiscussion.pageSource || 'ma demande'}.`
                          );
                        }}
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                        title="Basculer cette discussion sur WhatsApp"
                      >
                        <span>💬 Continuer sur WhatsApp</span>
                      </button>

                      {/* If product attached */}
                      {activeDiscussion.produitReference && (
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                          {activeDiscussion.produitReference.image && (
                            <img
                              src={activeDiscussion.produitReference.image}
                              alt=""
                              className="w-8 h-8 rounded object-cover border border-slate-200"
                            />
                          )}
                          <div className="text-[11px]">
                            <span className="font-bold text-slate-900 block truncate max-w-[150px]">
                              {activeDiscussion.produitReference.nom}
                            </span>
                            {activeDiscussion.produitReference.prixFCFA && (
                              <span className="font-mono text-amber-700 font-semibold">
                                {formatPrice(activeDiscussion.produitReference.prixFCFA)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Stream */}
                  <div className="relative">
                    <div
                      ref={chatContainerRef}
                      onScroll={handleChatScroll}
                      className="p-4 sm:p-6 space-y-4 h-[440px] sm:h-[480px] overflow-y-auto overscroll-contain bg-slate-50/50"
                    >
                      {activeDiscussion.messages.map((msg) => {
                        const isAdmin = msg.sender === 'admin';

                        return (
                          <div
                            key={msg.id}
                            className={`flex gap-3 ${isAdmin ? 'justify-start' : 'justify-end'}`}
                          >
                            {/* Admin avatar */}
                            {isAdmin && (
                              <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-amber-500/40">
                                <ShieldCheck className="w-4 h-4 text-amber-400" />
                              </div>
                            )}

                            <div
                              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs space-y-2 shadow-xs ${
                                isAdmin
                                  ? 'bg-white border-2 border-emerald-400 text-slate-900 rounded-tl-xs'
                                  : 'bg-slate-900 text-white rounded-tr-xs'
                              }`}
                            >
                              {/* Sender Info & Role */}
                              <div className="flex items-center justify-between gap-2 border-b pb-1.5 text-[11px]">
                                <span className={`font-bold flex items-center gap-1 ${isAdmin ? 'text-emerald-800' : 'text-amber-400'}`}>
                                  {isAdmin ? (
                                    <>
                                      <span>{msg.senderName || 'Service Client DIARRA ENERGIE (Admin)'}</span>
                                      <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase">
                                        Officiel
                                      </span>
                                    </>
                                  ) : (
                                    <span>Vous ({currentClient.prenom})</span>
                                  )}
                                </span>
                                <span className={`text-[10px] ${isAdmin ? 'text-slate-400' : 'text-slate-400'}`}>
                                  {msg.date}
                                </span>
                              </div>

                              {/* Message Content */}
                              <p className="leading-relaxed whitespace-pre-wrap font-normal text-xs">
                                {msg.texte}
                              </p>
                            </div>

                            {/* Client avatar */}
                            {!isAdmin && (
                              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                                <User className="w-4 h-4 text-slate-950" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {showScrollBottomBtn && (
                      <button
                        type="button"
                        onClick={() => scrollToBottom('smooth')}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-all z-10 border border-slate-700 animate-in fade-in"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
                        <span>Derniers messages</span>
                      </button>
                    )}
                  </div>

                  {/* Quick Suggestions Chips */}
                  <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Suggestions rapides :
                    </span>
                    {quickReplySuggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setClientReplyText(sug)}
                        className="px-2.5 py-1 bg-white hover:bg-amber-50 hover:border-amber-400 text-slate-700 rounded-full border border-slate-200 transition-colors text-[10px]"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>

                  {/* Interactive Client Reply Form */}
                  <form
                    onSubmit={handleSendReply}
                    className="p-4 bg-white border-t border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Reply className="w-3.5 h-3.5 text-amber-600" />
                        <span>Votre réponse à l'Administration :</span>
                      </label>
                      <span className="text-[10px] text-slate-400">
                        Réponse directe instantanée
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        required
                        value={clientReplyText}
                        onChange={(e) => setClientReplyText(e.target.value)}
                        placeholder="Écrivez votre réponse ici à l'administration..."
                        className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden resize-none"
                      />
                      <button
                        type="submit"
                        disabled={!clientReplyText.trim()}
                        className="px-5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex flex-col items-center justify-center gap-1 shrink-0"
                      >
                        <Send className="w-4 h-4 text-slate-950" />
                        <span className="hidden sm:inline">Envoyer</span>
                      </button>
                    </div>

                    <div className="text-[10px] text-slate-500 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <CheckCheck className="w-3 h-3 text-emerald-600" />
                        Votre réponse s'affichera immédiatement sur la console de l'Administrateur
                      </span>
                      <span>DIARRA ENERGIE Service Support</span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500 text-xs space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Aucun échange en cours avec l'administration
              </h3>
              <p className="max-w-md mx-auto text-slate-600 leading-relaxed">
                Vous avez une question sur vos devis, un suivi de colis ou le fonctionnement d'un panneau solaire ou onduleur ? Nos conseillers sont à votre écoute.
              </p>
              <button
                onClick={() => setShowNewTopicForm(true)}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>Poser une première question à l'Administration</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Quotes Tab */}
      {activeTabSub === 'devis' && (
        <div className="space-y-6">
          {quotes.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
              {quotes.map((q) => (
                <div key={q.id} className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-amber-600">
                          {q.numeroDevis}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{q.dateCreation}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-sm text-slate-900 mt-1">
                        {q.projet.intitule}
                      </h3>
                      <span className="text-xs text-slate-500">
                        Lieu du projet : {q.demandeur.villeProjet} ({q.demandeur.paysProjet})
                      </span>
                    </div>

                    <div className="text-right">
                      {getQuoteStatusBadge(q.statut)}
                      {q.estimationEstimeeFCFA && (
                        <span className="font-mono text-sm font-bold text-slate-900 block mt-1">
                          Estimation : {formatPrice(q.estimationEstimeeFCFA)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-2 border border-slate-100">
                    <p>
                      <strong>Description du besoin :</strong> {q.projet.descriptionBesoin}
                    </p>
                    {q.reponseCommerciale && (
                      <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Réponse du Bureau d'Études DIARRA ENERGIE :</span>
                        </div>
                        <p>{q.reponseCommerciale}</p>
                      </div>
                    )}
                  </div>

                  {/* Action button to discuss quote */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        const newDiscId = `disc-quote-${q.id}`;
                        sendMessageAsClient(
                          currentClient.id,
                          `Bonjour, je souhaite échanger au sujet de mon dossier de devis ${q.numeroDevis} (${q.projet.intitule}).`,
                          undefined,
                          `Dossier Devis ${q.numeroDevis}`,
                          newDiscId
                        );
                        setSelectedDiscussionId(newDiscId);
                        setActiveTabSub('messages');
                      }}
                      className="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Échanger avec l'administration sur ce devis</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500 text-xs space-y-3">
              <FileText className="w-8 h-8 text-slate-300 mx-auto" />
              <p>Aucune demande de devis enregistrée.</p>
              <button
                onClick={() => setActiveTab('devis')}
                className="font-semibold text-amber-600 hover:underline"
              >
                Créer une première demande
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
