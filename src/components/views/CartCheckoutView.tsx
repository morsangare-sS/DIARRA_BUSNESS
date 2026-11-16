import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TargetCountry, DeliveryMethod, PaymentMethod, Order, SENEGAL_REGIONS } from '../../types';
import { DELIVERY_ZONES } from '../../data/mockData';
import { BankCard3D } from '../common/BankCard3D';
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  MapPin,
  FileCheck,
  ArrowLeft,
  User,
  Lock,
  Sparkles,
  Printer,
  Download,
  FileDown,
  Copy,
  AlertTriangle,
  Receipt,
  Check,
  Smartphone,
  Bell,
  Send,
  RefreshCw,
  ShieldAlert,
  Key
} from 'lucide-react';

export const CartCheckoutView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotalFCFA,
    formatPrice,
    selectedCountry,
    createOrder,
    setActiveTab,
    currentClient,
    isClientAuthenticated,
    openAuthModal,
    isAdminAuthenticated,
    adminUser,
    notifyAdminPaymentIntent,
    notifyAdminNewPayment,
    showToast
  } = useApp();

  const [step, setStep] = useState<'panier' | 'coordonnees' | 'paiement' | 'confirmation'>('panier');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Customer Coordinates
  const [nomComplet, setNomComplet] = useState('');
  const [raisonSociale, setRaisonSociale] = useState('');
  const [typeClient, setTypeClient] = useState<'particulier' | 'entreprise' | 'collectivite'>('entreprise');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [pays, setPays] = useState<TargetCountry>(selectedCountry);
  const [ville, setVille] = useState('Dakar');
  const [adresseLivraison, setAdresseLivraison] = useState('');
  const [instructionsLivraison, setInstructionsLivraison] = useState('');
  const [numeroFiscal, setNumeroFiscal] = useState('');

  // Champ de livraison obligatoire : "Oui" ou "Non"
  const [souhaiteLivraison, setSouhaiteLivraison] = useState<'oui' | 'non'>('oui');

  // Sync customer coordinates when currentClient changes
  React.useEffect(() => {
    if (currentClient) {
      const fullName = `${currentClient.prenom} ${currentClient.nom}`;
      setNomComplet(fullName);
      setEmail(currentClient.email);
      setTelephone(currentClient.telephone);
      setPaytechPhone((prev) => prev || currentClient.telephone);
      setVille(currentClient.ville);
      setPays(currentClient.pays);
      if (currentClient.adresse) setAdresseLivraison(currentClient.adresse);
      if (currentClient.raisonSociale) setRaisonSociale(currentClient.raisonSociale);
      if (currentClient.typeClient) setTypeClient(currentClient.typeClient);
    }
  }, [currentClient]);

  // Delivery & PayTech Payment State
  const [methodeLivraison, setMethodeLivraison] = useState<DeliveryMethod>('livraison_urbaine');
  const [moyenPaiement, setMoyenPaiement] = useState<PaymentMethod>('paytech');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  type PaytechChannel = 'Wave' | 'Orange Money' | 'Free Money' | 'Carte Bancaire';
  const [paytechChannel, setPaytechChannel] = useState<PaytechChannel>('Wave');
  const [paytechPhone, setPaytechPhone] = useState('');
  const [paytechSession, setPaytechSession] = useState<{
    mode: 'live' | 'sandbox';
    token: string;
    ref_command: string;
    redirect_url?: string | null;
    amount: number;
    currency: string;
  } | null>(null);
  const [isInitiatingPaytech, setIsInitiatingPaytech] = useState(false);

  // Payment Verification & Admin Alert States
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verifiedTransactionRef, setVerifiedTransactionRef] = useState('');
  const [verifiedSenderPhone, setVerifiedSenderPhone] = useState('');
  const [verifiedChannelName, setVerifiedChannelName] = useState('PayTech (Wave / OM / CB)');
  const [smsAlertDispatched, setSmsAlertDispatched] = useState<{
    destinataire: string;
    date: string;
    texte: string;
  } | null>(null);

  React.useEffect(() => {
    if (telephone && !paytechPhone) {
      setPaytechPhone(telephone);
    }
  }, [telephone, paytechPhone]);

  // Delivery cost calculation (0 FCFA if no delivery or agency pickup)
  const isSenegal = pays === 'Sénégal' || SENEGAL_REGIONS.includes(pays as any);
  const currentZone = isSenegal ? DELIVERY_ZONES[0] : (DELIVERY_ZONES.find((z) => z.pays === pays) || DELIVERY_ZONES[0]);
  const calculateShipping = (): number => {
    if (cart.length === 0) return 0;
    if (souhaiteLivraison === 'non' || methodeLivraison === 'retrait_agence') return 0;

    // Check if bulky (mâts or stations)
    const hasBulky = cart.some(
      (item) => item.product.sousCategorie.includes('Mâts') || item.product.prixFCFA > 2000000
    );

    if (methodeLivraison === 'fret_lourd_mats') {
      return hasBulky ? 45000 : 25000;
    }

    if (methodeLivraison === 'transporteur_interurbain') {
      return currentZone.fraisBaseFCFA * 2;
    }

    // Default urbaine
    return currentZone.fraisBaseFCFA;
  };

  const fraisLivraison = calculateShipping();
  const subtotalWithDiscount = cartTotalFCFA * (1 - discountPercent / 100);
  const totalGeneral = subtotalWithDiscount + fraisLivraison;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SOLAR2026') {
      setDiscountPercent(5);
      showToast('Code promotionnel SOLAR2026 appliqué : -5% accordés !');
    } else {
      showToast('Code promotionnel invalide ou expiré.');
    }
  };

  // Validation unique et centralisée pour passer à l'étape paiement
  const validateCoordinatesForPayment = (): boolean => {
    if (isAdminAuthenticated) {
      showToast("Action réservée aux clients : Vous êtes connecté en tant qu'Administrateur. Déconnectez-vous d'abord de l'administration.");
      return false;
    }

    if (!isClientAuthenticated || !currentClient) {
      showToast('Veuillez créer un compte client ou vous connecter pour poursuivre votre commande.');
      openAuthModal('register');
      return false;
    }

    if (!nomComplet.trim() || !telephone.trim()) {
      showToast('Veuillez renseigner votre Nom et Prénom ainsi que votre Numéro de Téléphone.');
      setStep('coordonnees');
      return false;
    }

    // Si le client a choisi Oui pour la livraison, l'adresse précise est obligatoire.
    if (souhaiteLivraison === 'oui' && !adresseLivraison.trim()) {
      showToast('Veuillez renseigner l’adresse précise de livraison ou le lieu du chantier.');
      setStep('coordonnees');
      return false;
    }

    return true;
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const handleDownloadTicketFile = () => {
    if (!confirmedOrder) return;
    const ticketNum = `TC-${confirmedOrder.numeroCommande.replace('DEB-CMD-', '')}`;
    const dateFormatted = new Date(confirmedOrder.dateCreation).toLocaleString('fr-FR');
    const articlesLines = confirmedOrder.articles
      .map(
        (a) =>
          `* ${a.nom} (Réf: ${a.reference})\n  Quantité : ${a.quantite}x | P.U. : ${formatPrice(a.prixUnitaireFCFA)} | Total : ${formatPrice(a.totalLigneFCFA)}`
      )
      .join('\n\n');

    const content = `========================================================================
                      DIARRA ENERGIE & BUSINESS
              Solutions Solaires & Matériels Électriques
          Siège : Route de la VDN, Immeuble Solaire R+3, Dakar
            Tél : +221 77 114 95 39 | contact@diarraenergie.com
            NINEA : 00984512  |  RCCM : SN.DKR.2024.B.18942
========================================================================
                  TICKET DE CAISSE & REÇU DE PAIEMENT
========================================================================
Ticket N°           : ${ticketNum}
Numéro de Commande  : ${confirmedOrder.numeroCommande}
Date d'émission     : ${dateFormatted}
Caisse              : Passerelle Officielle PayTech API Sénégal
Statut Transaction  : RÉGLÉ ET CONFIRMÉ (100%)
Moyen de Règlement  : ${confirmedOrder.moyenPaiement === 'paytech' ? `PAYTECH (${verifiedChannelName})` : confirmedOrder.moyenPaiement.toUpperCase().replace('_', ' ')}
${confirmedOrder.referenceTransactionMobileMoney ? `Réf Transaction     : ${confirmedOrder.referenceTransactionMobileMoney}\n` : ''}${confirmedOrder.telephonePaiement ? `Tél / Émetteur      : ${confirmedOrder.telephonePaiement}\n` : ''}------------------------------------------------------------------------
DONNÉES DU CLIENT :
Nom & Prénom        : ${confirmedOrder.client.nomComplet}
Téléphone           : ${confirmedOrder.client.telephone}
${confirmedOrder.client.email ? `Email               : ${confirmedOrder.client.email}\n` : ''}Mode de réception   : ${
      confirmedOrder.methodeLivraison === 'retrait_agence'
        ? 'Retrait direct en agence (Dépôt DIARRA Dakar - Gratuit)'
        : `Livraison à : ${confirmedOrder.client.adresseLivraison}, ${confirmedOrder.client.ville} (${confirmedOrder.client.pays})`
    }
------------------------------------------------------------------------
DÉTAIL DES MATÉRIELS ACHETÉS :
${articlesLines}
------------------------------------------------------------------------
Sous-total articles : ${formatPrice(confirmedOrder.sousTotalFCFA)}
Frais de livraison  : ${
      confirmedOrder.fraisLivraisonFCFA === 0
        ? '0 FCFA (Retrait agence gratuit)'
        : formatPrice(confirmedOrder.fraisLivraisonFCFA)
    }
TOTAL GÉNÉRAL RÉGLÉ : ${formatPrice(confirmedOrder.totalFCFA)}
========================================================================
GARANTIES & CONDITIONS :
- Matériels solaires garantis de 2 à 5 ans selon les spécifications.
- Ce ticket de caisse certifie l'encaissement PayTech et tient lieu de
  justificatif comptable et de bon d'enlèvement / livraison.
- Service technique & SAV : +221 77 114 95 39
========================================================================
        Merci de votre confiance en DIARRA ENERGIE & BUSINESS !
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ticket_Caisse_DIARRA_${confirmedOrder.numeroCommande}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sendPaymentIntentAlertToAdmin = (channelLabel?: string) => {
    const clientLabel = nomComplet || currentClient?.nomComplet || 'Client Boutique';
    const clientPhone = telephone || currentClient?.telephone || '+221 77 114 95 39';
    const articlesList = cart.map((i) => `${i.quantity}x ${i.product.nom}`).join(', ');
    const usedChannel = channelLabel || `PayTech (${paytechChannel})`;

    const smsMessage = `[ALERTE ACHAT DIARRA ENERGIE] Le client ${clientLabel} (${clientPhone}, ${ville}) souhaite régler ses achats (${formatPrice(totalGeneral)}) via ${usedChannel}. Articles : ${articlesList.slice(0, 120)}.`;

    notifyAdminPaymentIntent({
      clientNom: clientLabel,
      clientTelephone: clientPhone,
      clientEmail: email || currentClient?.email,
      clientVille: ville || currentClient?.ville || 'Dakar',
      clientPays: pays || 'Sénégal',
      moyenPaiement: 'paytech',
      montantFCFA: totalGeneral,
      articlesResume: articlesList,
      articlesCount: cart.length,
      smsEnvoye: true,
      smsDestinataire: '+221 77 114 95 39 (Direction Générale & Caisse)',
      smsContenu: smsMessage
    });
  };

  const finalizeVerifiedPaytech = (refCode: string, channelLabel: string, senderPhone: string) => {
    setIsPaymentVerified(true);
    setVerifiedTransactionRef(refCode);
    setVerifiedChannelName(channelLabel);
    setVerifiedSenderPhone(senderPhone);
    setMoyenPaiement('paytech');

    const clientLabel = nomComplet || currentClient?.nomComplet || 'Client Boutique';
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const smsText = `[ALERTE PAYTECH DIARRA ENERGIE] Nouveau paiement PayTech (${channelLabel}) confirmé : ${totalGeneral.toLocaleString('fr-FR')} FCFA de ${clientLabel} (${senderPhone}). Réf Tx: ${refCode}. Reçu officiel débloqué.`;

    const smsLog = {
      destinataire: '+221 77 114 95 39 (Direction Générale & Caisse Centrale)',
      date: nowStr,
      texte: smsText
    };
    setSmsAlertDispatched(smsLog);

    notifyAdminNewPayment({
      orderId: `ord-pending-${Date.now()}`,
      numeroCommande: `DEB-CMD-2026-${Date.now().toString().slice(-4)}`,
      clientNom: clientLabel,
      clientTelephone: senderPhone,
      clientEmail: email || currentClient?.email,
      moyenPaiement: 'paytech',
      montantFCFA: totalGeneral,
      referenceTransaction: refCode,
      smsEnvoye: true,
      smsDestinataire: smsLog.destinataire,
      smsContenu: smsText
    });

    showToast(`Paiement PayTech (${channelLabel}) confirmé ! Direction alertée en ligne & par SMS (+221 77 114 95 39).`);
  };

  // Handle return redirect query parameters from PayTech (?paytech_status=success&ref=...)
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ptStatus = params.get('paytech_status');
      const ptRef = params.get('ref');
      if (!ptStatus || !ptRef) return;

      const draftRaw = sessionStorage.getItem('deb_paytech_pending_draft');
      if (draftRaw) {
        const draft = JSON.parse(draftRaw);
        if (draft.nomComplet) setNomComplet(draft.nomComplet);
        if (draft.telephone) setTelephone(draft.telephone);
        if (draft.ville) setVille(draft.ville);
        if (draft.adresseLivraison) setAdresseLivraison(draft.adresseLivraison);
        if (draft.paytechChannel) setPaytechChannel(draft.paytechChannel);
      }

      if (ptStatus === 'success') {
        setStep('paiement');
        fetch(`/api/paytech/status/${encodeURIComponent(ptRef)}`)
          .then((r) => r.json())
          .then((data) => {
            if (data?.ok && data.transaction?.status === 'completed') {
              finalizeVerifiedPaytech(
                data.transaction.transaction_id || ptRef,
                data.transaction.payment_method || paytechChannel,
                data.transaction.payer_phone || telephone || '+221 77 114 95 39'
              );
              sessionStorage.removeItem('deb_paytech_pending_draft');
            }
          })
          .catch(() => {});
      } else if (ptStatus === 'cancel') {
        setStep('paiement');
        setVerificationError('Paiement PayTech annulé. Vous pouvez relancer la transaction ci-dessous.');
      }

      window.history.replaceState({}, document.title, window.location.pathname);
    } catch {
      // ignore
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestPaytechSession = async () => {
    setVerificationError(null);
    setIsInitiatingPaytech(true);
    try {
      const refCommand = `DEB-PT-${Date.now().toString().slice(-6)}`;
      const itemSummary = cart.length === 1
        ? cart[0].product.nom
        : `${cart[0]?.product.nom || 'Équipement Solaire'} (+${cart.length - 1} autre(s))`;

      try {
        sessionStorage.setItem('deb_paytech_pending_draft', JSON.stringify({
          nomComplet,
          telephone,
          ville,
          adresseLivraison,
          paytechChannel
        }));
      } catch {
        // ignore storage restrictions
      }

      const response = await fetch('/api/paytech/request-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_name: itemSummary,
          item_price: Math.round(totalGeneral),
          currency: 'XOF',
          ref_command: refCommand,
          command_name: `Commande DIARRA ENERGIE (${cart.length} article(s)) - ${nomComplet || 'Client'}`,
          channel: paytechChannel,
          baseUrl: window.location.origin,
          client: {
            nomComplet: nomComplet || currentClient?.nomComplet,
            email: email || currentClient?.email,
            telephone: paytechPhone || telephone || currentClient?.telephone,
            ville
          }
        })
      });

      const data = await response.json();
      if (!response.ok || !data?.ok) {
        setVerificationError(data?.error || "Impossible d'initialiser la session PayTech.");
        return;
      }

      setPaytechSession({
        mode: data.mode,
        token: data.token,
        ref_command: data.ref_command,
        redirect_url: data.redirect_url,
        amount: data.amount,
        currency: data.currency || 'XOF'
      });

      sendPaymentIntentAlertToAdmin(`PayTech — ${paytechChannel}`);
      showToast('Session PayTech sécurisée initialisée ! Finalisez le paiement pour débloquer votre reçu.');
    } catch {
      setVerificationError('Erreur réseau lors de la connexion au serveur PayTech.');
    } finally {
      setIsInitiatingPaytech(false);
    }
  };

  const handleConfirmPaytechSandbox = async () => {
    if (!paytechSession) return;
    setVerificationError(null);
    const activePhone = paytechPhone.trim() || telephone.trim();
    if (!activePhone) {
      setVerificationError('Veuillez saisir votre numéro de téléphone mobile ou contact pour PayTech.');
      return;
    }

    setIsVerifyingPayment(true);
    try {
      const response = await fetch('/api/paytech/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref_command: paytechSession.ref_command,
          token: paytechSession.token,
          channel: paytechChannel,
          payer_phone: activePhone
        })
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        setVerificationError(data?.error || 'La validation PayTech a échoué.');
        return;
      }

      finalizeVerifiedPaytech(
        data.transaction_id || data.ref_command,
        data.payment_method || paytechChannel,
        data.payer_phone || activePhone
      );
      sessionStorage.removeItem('deb_paytech_pending_draft');
    } catch {
      setVerificationError('Erreur réseau lors de la confirmation PayTech.');
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  const handleCheckLivePaytechStatus = async () => {
    if (!paytechSession) return;
    setVerificationError(null);
    setIsVerifyingPayment(true);
    try {
      const response = await fetch(`/api/paytech/status/${encodeURIComponent(paytechSession.ref_command)}`);
      const data = await response.json();
      if (data?.ok && data.transaction?.status === 'completed') {
        finalizeVerifiedPaytech(
          data.transaction.transaction_id || paytechSession.ref_command,
          data.transaction.payment_method || paytechChannel,
          data.transaction.payer_phone || paytechPhone || telephone || '+221 77 114 95 39'
        );
      } else {
        setVerificationError("Paiement encore en attente sur PayTech. Complétez le règlement sur la page PayTech puis vérifiez à nouveau.");
      }
    } catch {
      setVerificationError('Impossible de vérifier le statut PayTech pour le moment.');
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  const handleConfirmOrder = () => {
    if (!currentClient || !validateCoordinatesForPayment()) {
      return;
    }

    // STRICT PAYMENT SECURITY: Cannot validate order nor get receipt without verified payment!
    if (!isPaymentVerified) {
      const msg = "SÉCURITÉ STRICTE : Vous ne pouvez pas valider votre commande ni obtenir votre reçu de caisse tant que votre paiement n'a pas été vérifié et confirmé ci-dessus.";
      setVerificationError(msg);
      showToast(msg);
      return;
    }

    const effectiveDeliveryMethod = souhaiteLivraison === 'non' ? 'retrait_agence' : methodeLivraison;
    const effectiveDeliveryAddress = souhaiteLivraison === 'non'
      ? (adresseLivraison.trim() || 'Retrait direct en agence DIARRA (Siège Dakar)')
      : adresseLivraison.trim();

    const nowIso = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newOrder = createOrder({
      clientId: currentClient.id,
      client: {
        clientId: currentClient.id,
        nom: currentClient.nom,
        prenom: currentClient.prenom,
        nomComplet: nomComplet || `${currentClient.prenom} ${currentClient.nom}`,
        raisonSociale: raisonSociale || undefined,
        typeClient,
        email: email || currentClient.email,
        telephone: telephone || currentClient.telephone,
        numeroWhatsapp: whatsapp || telephone || currentClient.telephone,
        pays,
        ville: ville || currentClient.ville,
        adresseLivraison: effectiveDeliveryAddress,
        instructionsLivraison: instructionsLivraison || undefined,
        numeroFiscal: numeroFiscal || undefined
      },
      articles: cart.map((item) => ({
        productId: item.product.id,
        reference: item.product.reference,
        nom: item.product.nom,
        prixUnitaireFCFA: item.product.prixFCFA,
        quantite: item.quantity,
        totalLigneFCFA: item.product.prixFCFA * item.quantity
      })),
      sousTotalFCFA: subtotalWithDiscount,
      fraisLivraisonFCFA: fraisLivraison,
      totalFCFA: totalGeneral,
      methodeLivraison: effectiveDeliveryMethod,
      moyenPaiement,
      statutPaiement: 'paye',
      referenceTransactionMobileMoney: verifiedTransactionRef,
      telephonePaiement: verifiedSenderPhone,
      smsAlerteEnvoye: true,
      smsAlerteDetails: smsAlertDispatched ? {
        destinataire: smsAlertDispatched.destinataire,
        dateEnvoi: smsAlertDispatched.date,
        texte: smsAlertDispatched.texte,
        statut: 'delivre'
      } : {
        destinataire: '+221 77 114 95 39 (Direction & Caisse)',
        dateEnvoi: nowIso,
        texte: `Paiement ${moyenPaiement} validé pour ${formatPrice(totalGeneral)}`,
        statut: 'delivre'
      },
      datePaiementEffectif: nowIso
    });

    setConfirmedOrder(newOrder);
    setStep('confirmation');
  };

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-600">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-slate-900">
          Votre panier d'achat est vide
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Découvrez nos lampadaires solaires, pompes de forage et kits solaires complets disponibles en stock immédiat.
        </p>
        <button
          onClick={() => setActiveTab('boutique')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          Découvrir les équipements
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          {step === 'confirmation' ? 'Confirmation de votre Commande' : 'Panier & Tunnel de Commande Sécurisé'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Zone de livraison : {pays} · Transactions protégées conformes OHADA
        </p>

        {step !== 'confirmation' && (
          <div className="flex items-center gap-3 sm:gap-6 mt-6 text-xs font-semibold">
            <button
              onClick={() => setStep('panier')}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step === 'panier'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">1</span>
              <span>Panier</span>
            </button>

            <button
              onClick={() => setStep('coordonnees')}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step === 'coordonnees'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">2</span>
              <span>Coordonnées & Livraison</span>
            </button>

            <button
              onClick={() => {
                if (validateCoordinatesForPayment()) {
                  setStep('paiement');
                }
              }}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step === 'paiement'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">3</span>
              <span>Moyen de Paiement</span>
            </button>
          </div>
        )}
      </div>

      {/* Client Identity & Cart Banner */}
      {isAdminAuthenticated ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs text-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-lg shrink-0">
              <ShieldCheck className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm sm:text-base text-white">
                  Session Administrateur Active ({adminUser?.name || 'Direction'})
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Accès Restreint
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Vous consultez le catalogue en tant qu'administrateur. La validation et la gestion des commandes s'effectuent depuis votre tableau de bord.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('admin')}
            className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            Aller au Tableau de Bord Admin
          </button>
        </div>
      ) : currentClient ? (
        <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shrink-0">
              <User className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-heading font-extrabold text-sm sm:text-base text-slate-900">
                  Panier Personnel de {currentClient.prenom} {currentClient.nom}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Compte Client Actif
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                📍 <strong>{currentClient.ville} ({currentClient.pays})</strong> · Tél : <strong>{currentClient.telephone}</strong> · Mail : <strong>{currentClient.email}</strong>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                🔒 <strong>Panier Privé & Sécurisé :</strong> Vos commandes sont strictement confidentielles. L'équipe DIARRA supervise la logistique et l'expédition de votre commande.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shrink-0">
              <Lock className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-sm sm:text-base text-slate-900 block">
                Authentification requise pour commander sur la boutique en ligne
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Chaque client dispose d'un compte personnel (Nom, Prénom, Ville, Mail, Téléphone) pour valider sa commande et suivre l'expédition de ses matériels.
              </p>
            </div>
          </div>

          <button
            onClick={() => openAuthModal('register')}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            Créer un compte ou Se connecter
          </button>
        </div>
      )}

      {/* Step 1: Panier */}
      {step === 'panier' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Table */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900">
                Produits sélectionnés ({cart.length})
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vider le panier</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={item.product.imagePrincipale}
                        alt={item.product.nom}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (item.product.imagePrincipale && !target.src.includes('fallbacked')) {
                            const filename = item.product.imagePrincipale.split('/').pop();
                            if (filename) {
                              target.src = `./images/${filename}?fallbacked=1`;
                            }
                          }
                        }}
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 block">
                        {item.product.reference}
                      </span>
                      <h3 className="font-heading font-semibold text-xs sm:text-sm text-slate-900 max-w-sm">
                        {item.product.nom}
                      </h3>
                      <span className="font-mono text-xs text-slate-600 block mt-1">
                        {formatPrice(item.product.prixFCFA)} / unité
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded-l-lg text-xs"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-mono text-xs font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded-r-lg text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono tabular-nums font-bold text-sm text-slate-900 block">
                        {formatPrice(item.product.prixFCFA * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[11px] text-rose-600 hover:underline mt-0.5"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Strip */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600">Vous disposez d'un code promotionnel ou partenaire ?</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Code promo (ex: SOLAR2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="p-2 border border-slate-300 rounded-lg bg-white focus:outline-none uppercase text-xs"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Récapitulatif de la Commande
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total articles :</span>
                <span className="font-mono text-slate-900">{formatPrice(cartTotalFCFA)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Remise partenaire ({discountPercent}%) :</span>
                  <span className="font-mono">-{formatPrice(cartTotalFCFA * (discountPercent / 100))}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Frais de livraison ({souhaiteLivraison === 'non' ? 'Retrait agence' : pays}) :</span>
                <span className="font-mono text-slate-900">
                  {souhaiteLivraison === 'non' ? (
                    <span className="text-emerald-700 font-bold">0 FCFA (Gratuit)</span>
                  ) : (
                    formatPrice(fraisLivraison)
                  )}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-sm">Total Estimé :</span>
              <span className="font-mono text-xl font-extrabold text-slate-900">
                {formatPrice(totalGeneral)}
              </span>
            </div>

            <button
              onClick={() => setStep('coordonnees')}
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Continuer vers la livraison</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Coordonnées & Livraison */}
      {step === 'coordonnees' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <h2 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Informations de Livraison & Facturation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Type de client *</label>
                <select
                  value={typeClient}
                  onChange={(e) => setTypeClient(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="entreprise">Entreprise / Société / BTP</option>
                  <option value="collectivite">Collectivité Territoriale / Mairie</option>
                  <option value="particulier">Particulier</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Nom et Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Cheikh Tidiane Gueye"
                  value={nomComplet}
                  onChange={(e) => setNomComplet(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Raison Sociale</label>
                <input
                  type="text"
                  placeholder="Ex: Sahel Ingénierie SARL"
                  value={raisonSociale}
                  onChange={(e) => setRaisonSociale(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Numéro Fiscal (NINEA / IFU / RCCM)</label>
                <input
                  type="text"
                  placeholder="Pour émission facture normalisée"
                  value={numeroFiscal}
                  onChange={(e) => setNumeroFiscal(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Téléphone de livraison *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: +221 77 114 95 39"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700 block">Adresse E-mail</label>
                  <span className="text-[10px] text-slate-400 font-normal">Facultatif</span>
                </div>
                <input
                  type="email"
                  placeholder="Ex: c.gueye@saheling.sn (optionnel)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Champ Obligatoire : Souhaitez-vous une livraison ? (Oui / Non) */}
            <div className="p-4 sm:p-5 bg-amber-50/40 border-2 border-amber-300/80 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Souhaitez-vous une livraison ? *</span>
                </label>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-amber-200 text-amber-950 rounded-full w-fit">
                  Champ obligatoire
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Précisez si vous souhaitez vous faire livrer vos équipements sur chantier/domicile ou les retirer gratuitement en agence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Option 1 : OUI */}
                <div
                  onClick={() => {
                    setSouhaiteLivraison('oui');
                    if (methodeLivraison === 'retrait_agence') {
                      setMethodeLivraison('livraison_urbaine');
                    }
                  }}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    souhaiteLivraison === 'oui'
                      ? 'border-amber-500 bg-white shadow-xs ring-2 ring-amber-400/20'
                      : 'border-slate-200 bg-white/70 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    id="livraison_oui"
                    name="choix_livraison_obligatoire"
                    checked={souhaiteLivraison === 'oui'}
                    onChange={() => {
                      setSouhaiteLivraison('oui');
                      if (methodeLivraison === 'retrait_agence') {
                        setMethodeLivraison('livraison_urbaine');
                      }
                    }}
                    className="mt-0.5 w-4 h-4 text-amber-500 focus:ring-amber-400"
                  />
                  <div>
                    <label htmlFor="livraison_oui" className="font-bold text-xs text-slate-900 block cursor-pointer">
                      Oui, je souhaite une livraison
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Livraison urbaine locale, transporteur régional ou fret lourd vers votre adresse.
                    </p>
                  </div>
                </div>

                {/* Option 2 : NON */}
                <div
                  onClick={() => {
                    setSouhaiteLivraison('non');
                    setMethodeLivraison('retrait_agence');
                  }}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    souhaiteLivraison === 'non'
                      ? 'border-emerald-500 bg-white shadow-xs ring-2 ring-emerald-400/20'
                      : 'border-slate-200 bg-white/70 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    id="livraison_non"
                    name="choix_livraison_obligatoire"
                    checked={souhaiteLivraison === 'non'}
                    onChange={() => {
                      setSouhaiteLivraison('non');
                      setMethodeLivraison('retrait_agence');
                    }}
                    className="mt-0.5 w-4 h-4 text-emerald-600 focus:ring-emerald-400"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="livraison_non" className="font-bold text-xs text-slate-900 block cursor-pointer">
                        Non, je retire en agence
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Gratuit
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Enlèvement direct sans aucun frais au dépôt central DIARRA ENERGIE (Dakar).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditionnel : Si OUI, affichage de Destination géographique & Mode de livraison et Mode de transport */}
            {souhaiteLivraison === 'oui' ? (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <span className="font-bold text-xs text-slate-900 block">
                  Destination géographique & Mode de livraison
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-medium text-slate-700 block mb-1">Pays / Région de livraison *</label>
                    <select
                      value={pays}
                      onChange={(e) => {
                        const val = e.target.value as TargetCountry;
                        setPays(val);
                        if (SENEGAL_REGIONS.includes(val as any)) {
                          setVille(val);
                        }
                      }}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="Sénégal" className="font-bold text-amber-800">
                        🇸🇳 Sénégal (Pays d'origine - Siège)
                      </option>

                      <optgroup label="── 14 Régions du Sénégal ──">
                        {SENEGAL_REGIONS.map((region) => (
                          <option key={region} value={region}>
                            🇸🇳 Sénégal — Région de {region}
                          </option>
                        ))}
                      </optgroup>

                      <optgroup label="── Autres Pays d'Intervention ──">
                        <option value="Bénin">🇧🇯 Bénin</option>
                        <option value="Togo">🇹🇬 Togo</option>
                        <option value="Sous-Région">🌍 Autre pays de la Sous-Région</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-slate-700 block mb-1">Ville de livraison *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Dakar, Thiès, Cotonou, Lomé..."
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1 text-xs">
                    Adresse précise de livraison ou chantier *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Quartier, rue, repère connu, code porte..."
                    value={adresseLivraison}
                    onChange={(e) => setAdresseLivraison(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                {/* Delivery Methods Selection : Mode de transport */}
                <div className="space-y-2 pt-2 text-xs">
                  <label className="font-medium text-slate-700 block">Mode de transport :</label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setMethodeLivraison('livraison_urbaine')}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        methodeLivraison === 'livraison_urbaine'
                          ? 'border-amber-500 bg-amber-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-900">
                        <span>Livraison Urbaine Locale</span>
                        <span className="font-mono">{formatPrice(currentZone.fraisBaseFCFA)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Délai : 24h à 48h ouvrées</p>
                    </div>

                    <div
                      onClick={() => setMethodeLivraison('transporteur_interurbain')}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        methodeLivraison === 'transporteur_interurbain'
                          ? 'border-amber-500 bg-amber-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-900">
                        <span>Transporteur Régional</span>
                        <span className="font-mono">{formatPrice(currentZone.fraisBaseFCFA * 2)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Vers l'intérieur du pays (48h-72h)</p>
                    </div>

                    <div
                      onClick={() => setMethodeLivraison('fret_lourd_mats')}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        methodeLivraison === 'fret_lourd_mats'
                          ? 'border-amber-500 bg-amber-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-900">
                        <span>Fret Spécial Mâts & Équipements Lourds</span>
                        <span className="font-mono">{formatPrice(45000)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Camion grue et manutention chantier</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-950 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Retrait direct en Agence DIARRA (Dakar / Siège) — Aucun frais de livraison (0 FCFA)</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  Vous avez choisi le retrait direct en agence. Dès validation de votre commande, nos techniciens préparent vos équipements pour un enlèvement immédiat à notre dépôt central (Dakar).
                </p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep('panier')}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour au panier</span>
              </button>

              <button
                onClick={() => {
                  if (validateCoordinatesForPayment()) {
                    setStep('paiement');
                    sendPaymentIntentAlertToAdmin();
                  }
                }}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>Passer au paiement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs space-y-3">
            <span className="font-bold text-slate-900 block text-sm">Récapitulatif</span>
            <div className="flex justify-between text-slate-600">
              <span>Produits ({cart.length}) :</span>
              <span className="font-mono text-slate-900">{formatPrice(subtotalWithDiscount)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Livraison ({pays}) :</span>
              <span className="font-mono text-slate-900">{formatPrice(fraisLivraison)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
              <span>Total :</span>
              <span className="font-mono">{formatPrice(totalGeneral)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Paiement Sécurisé via PayTech API */}
      {step === 'paiement' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Paiement Sécurisé via PayTech API Sénégal</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Passerelle unifiée : Wave, Orange Money, Free Money et Cartes Bancaires Visa/Mastercard.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-bold w-fit">
                <Lock className="w-3.5 h-3.5" />
                <span>SSL / PayTech Verified</span>
              </span>
            </div>

            <div className="p-4 bg-amber-50/80 border-2 border-amber-300 rounded-xl flex items-start gap-3 text-xs text-amber-950">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-xs uppercase tracking-wide block text-amber-900">
                  🔒 Protocole de Sécurité Financière PayTech — DIARRA ENERGIE
                </span>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  <strong>La commande ne peut être validée et aucun reçu officiel ne peut être généré</strong> tant que la passerelle PayTech n'a pas confirmé votre règlement. Dès la confirmation PayTech, la direction est immédiatement alertée en ligne et par SMS (+221 77 114 95 39).
                </p>
              </div>
            </div>

            {/* Sélection du canal PayTech */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                1. Choisissez votre moyen de paiement sur PayTech :
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setPaytechChannel('Wave');
                    if (isPaymentVerified) setIsPaymentVerified(false);
                    setPaytechSession(null);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    paytechChannel === 'Wave'
                      ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-400/40 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sky-950">
                    <div className="flex items-center gap-2.5">
                      <img src="/assets/aistudio/image_0375626b.png" alt="Wave" className="w-7 h-7 rounded-lg object-cover border border-sky-300" />
                      <span>Wave via PayTech</span>
                    </div>
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">Instantané</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">Validation directe par notification Wave Sénégal.</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaytechChannel('Orange Money');
                    if (isPaymentVerified) setIsPaymentVerified(false);
                    setPaytechSession(null);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    paytechChannel === 'Orange Money'
                      ? 'border-orange-500 bg-orange-50/70 ring-2 ring-orange-400/40 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-orange-950">
                    <div className="flex items-center gap-2.5">
                      <img src="/assets/aistudio/image_f207f722.png" alt="Orange Money" className="w-7 h-7 rounded-lg object-contain bg-white p-1 border border-orange-200" />
                      <span>Orange Money via PayTech</span>
                    </div>
                    <span className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded font-bold">Sénégal</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">Paiement sécurisé Orange Money / Max it.</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaytechChannel('Free Money');
                    if (isPaymentVerified) setIsPaymentVerified(false);
                    setPaytechSession(null);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    paytechChannel === 'Free Money'
                      ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-400/40 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-rose-950">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#e21422] flex items-center justify-center font-black italic text-[10px] text-white">free</div>
                      <span>Free Money (Yas)</span>
                    </div>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">Mobile</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">Règlement Mobile Money via passerelle PayTech.</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaytechChannel('Carte Bancaire');
                    if (isPaymentVerified) setIsPaymentVerified(false);
                    setPaytechSession(null);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    paytechChannel === 'Carte Bancaire'
                      ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-800/30 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-950">
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-6 h-6 text-slate-800" />
                      <span>Carte Bancaire (Visa / Mastercard)</span>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">3D Secure</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">Cartes Visa, Mastercard et GIM-UEMOA via PayTech.</p>
                </button>
              </div>
            </div>

            {/* Interface Transaction PayTech */}
            <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="font-heading font-extrabold text-sm text-slate-900 block">
                    2. Tunnel Officiel PayTech — Canal : {paytechChannel}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Montant total de la transaction : <strong className="text-slate-900 font-mono">{formatPrice(totalGeneral)}</strong>
                  </span>
                </div>
                {paytechSession && (
                  <span className="text-[11px] font-mono bg-white border border-slate-300 px-2.5 py-1 rounded-lg text-slate-700">
                    Réf : <strong>{paytechSession.ref_command}</strong>
                  </span>
                )}
              </div>

              {!paytechSession ? (
                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1 text-xs">
                      Numéro de téléphone du payeur ({paytechChannel}) *
                    </label>
                    <input
                      type="tel"
                      value={paytechPhone}
                      onChange={(e) => setPaytechPhone(e.target.value)}
                      placeholder="Ex: +221 77 114 95 39"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleRequestPaytechSession}
                    disabled={isInitiatingPaytech}
                    className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    {isInitiatingPaytech ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Connexion à l'API PayTech en cours...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Initialiser le Paiement Sécurisé PayTech ({formatPrice(totalGeneral)})</span>
                      </>
                    )}
                  </button>
                </div>
              ) : isPaymentVerified ? (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-xl space-y-2 text-emerald-950">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-emerald-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Paiement PayTech ({verifiedChannelName}) Confirmé à 100%</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Référence Transaction PayTech : <strong className="font-mono">{verifiedTransactionRef}</strong> · Émetteur : <strong className="font-mono">{verifiedSenderPhone}</strong>.<br />
                    La direction a été notifiée instantanément en ligne et par SMS (+221 77 114 95 39). Vous pouvez maintenant valider votre commande ci-dessous pour générer votre reçu officiel.
                  </p>
                </div>
              ) : paytechSession.mode === 'live' && paytechSession.redirect_url ? (
                <div className="p-4 bg-white border border-emerald-300 rounded-xl space-y-3">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Votre session de paiement PayTech est prête (Jeton : <span className="font-mono font-bold">{paytechSession.token.slice(0, 14)}...</span>). Cliquez ci-dessous pour régler sur le portail sécurisé PayTech.sn, puis cliquez sur « Vérifier la confirmation ».
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={paytechSession.redirect_url}
                      target="_top"
                      className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 text-center shadow-xs"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Payer Maintenant sur PayTech.sn</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCheckLivePaytechStatus}
                      disabled={isVerifyingPayment}
                      className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${isVerifyingPayment ? 'animate-spin' : ''}`} />
                      <span>Vérifier la confirmation</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white border border-emerald-300 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-900">
                      Session API PayTech Prête ({paytechChannel})
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      Environnement Test API
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Confirmez votre numéro mobile ({paytechChannel}) ci-dessous et cliquez sur « Confirmer le Règlement via PayTech » pour exécuter la transaction sur notre serveur API.
                  </p>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1 text-xs">
                      Numéro de téléphone du payeur *
                    </label>
                    <input
                      type="tel"
                      value={paytechPhone}
                      onChange={(e) => setPaytechPhone(e.target.value)}
                      placeholder="Ex: +221 77 114 95 39"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmPaytechSandbox}
                    disabled={isVerifyingPayment}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
                  >
                    {isVerifyingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Traitement API PayTech en cours...</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Confirmer le Règlement via PayTech ({formatPrice(totalGeneral)})</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {verificationError && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{verificationError}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Total net à régler :</span>
              <span className="font-mono text-xl font-black text-slate-900">
                {formatPrice(totalGeneral)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => setStep('coordonnees')}
                className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Modifier les coordonnées</span>
              </button>

              {/* STRICT SECURITY: Button is LOCKED until isPaymentVerified is true */}
              {!isPaymentVerified ? (
                <div className="flex flex-col items-center sm:items-end gap-1 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      const msg = "Paiement PayTech non confirmé : Veuillez initialiser et confirmer votre paiement PayTech ci-dessus pour déverrouiller la validation de commande et votre reçu officiel.";
                      setVerificationError(msg);
                      showToast(msg);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-500 font-bold text-xs rounded-xl shadow-none flex items-center justify-center gap-2 border border-slate-300 cursor-not-allowed transition-colors"
                  >
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span>Paiement PayTech Requis — Validation & Reçu Verrouillés</span>
                  </button>
                  <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sécurité : Aucun reçu officiel ne peut être émis sans encaissement PayTech vérifié.</span>
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center sm:items-end gap-1 w-full sm:w-auto">
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full sm:w-auto px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 animate-pulse"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Valider Définitivement ma Commande & Obtenir mon Reçu Officiel</span>
                  </button>
                  <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Paiement PayTech certifié — Direction DIARRA alertée en ligne et par SMS.</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 text-xs">
            <span className="font-bold text-slate-900 block text-sm">Garanties de Paiement</span>
            <p className="text-slate-600 leading-relaxed">
              Toutes les transactions sont strictement sécurisées. Aucune coordonnée bancaire sensible n'est conservée. Les règlements sont protégés par protocoles cryptés SSL / 3D-Secure.
            </p>
            <div className="space-y-1 pt-2 border-t border-slate-200 text-slate-500">
              <p>Mode choisi : <strong>{souhaiteLivraison === 'non' ? 'Retrait direct en agence (0 FCFA)' : 'Livraison à domicile / chantier'}</strong></p>
              <p>Destinataire : <strong>{nomComplet || 'En attente'}</strong></p>
              {souhaiteLivraison === 'oui' ? (
                <p>Destination : <strong>{adresseLivraison ? `${adresseLivraison}, ${ville} (${pays})` : `${ville} (${pays})`}</strong></p>
              ) : (
                <p>Lieu d'enlèvement : <strong>Agence DIARRA (Siège Dakar)</strong></p>
              )}
              <p>Téléphone : <strong>{telephone || 'En attente'}</strong></p>
              {email && <p>E-mail : <strong>{email}</strong></p>}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation & Ticket de Caisse Téléchargeable */}
      {step === 'confirmation' && confirmedOrder && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* CSS d'impression dédié au Ticket de Caisse */}
          <style>{`
            @media print {
              body * {
                visibility: hidden !important;
              }
              #ticket-de-caisse, #ticket-de-caisse * {
                visibility: visible !important;
              }
              #ticket-de-caisse {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 24px !important;
                border: 2px dashed #334155 !important;
                box-shadow: none !important;
                background: white !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}</style>

          {/* Bandeau de succès en haut (masqué à l'impression) */}
          <div className="no-print bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900">
                Commande & Paiement Enregistrés avec Succès !
              </h2>
              <p className="text-xs text-slate-500">
                Votre transaction est confirmée et sécurisée. Votre ticket de caisse officiel a été généré ci-dessous.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrintTicket}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95"
                title="Imprimer ou enregistrer le ticket au format PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer / Télécharger en PDF</span>
              </button>

              <button
                onClick={handleDownloadTicketFile}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95"
                title="Télécharger le ticket de caisse au format texte"
              >
                <FileDown className="w-4 h-4" />
                <span>Télécharger le Ticket (.txt)</span>
              </button>

              <button
                onClick={() => setActiveTab('compte')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
              >
                Suivre dans Mon Compte
              </button>
            </div>
          </div>

          {/* TICKET DE CAISSE OFFICIEL (Format Reçu Professionnel) */}
          <div
            id="ticket-de-caisse"
            className="bg-white p-6 sm:p-10 rounded-2xl border-2 border-dashed border-slate-300 shadow-md space-y-6 font-mono text-slate-900 relative"
          >
            {/* Header Ticket */}
            <div className="text-center space-y-1.5 border-b-2 border-dashed border-slate-300 pb-5">
              <div className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <h3 className="font-heading font-black text-xl tracking-tight text-slate-950">
                  DIARRA ENERGIE & BUSINESS
                </h3>
              </div>
              <p className="text-[11px] text-slate-600 uppercase tracking-widest font-semibold">
                Solutions Solaires & Matériels Électriques
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                Km 4,5 Boulevard du Centenaire de la Commune de Dakar, Sénégal<br />
                Tél : +221 77 114 95 39 · E-mail : contact@diarra-energie.sn<br />
                NINEA : 00984512 · RCCM : SN.DKR.2024.B.18942
              </p>

              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                  TICKET DE CAISSE & REÇU DE PAIEMENT
                </span>
              </div>
            </div>

            {/* Métadonnées Ticket */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-b border-dashed border-slate-200 pb-4">
              <div className="space-y-1">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase">N° Ticket de Caisse : </span>
                  <strong className="text-amber-700 font-bold block sm:inline">
                    TC-{confirmedOrder.numeroCommande.replace('DEB-CMD-', '')}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase">N° Commande : </span>
                  <strong className="text-slate-900">{confirmedOrder.numeroCommande}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase">Date & Heure : </span>
                  <span>{new Date(confirmedOrder.dateCreation).toLocaleString('fr-FR')}</span>
                </div>
              </div>

              <div className="space-y-1 sm:text-right">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase">Statut : </span>
                  <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded uppercase">
                    RÉGLÉ ET CONFIRMÉ (100%)
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-slate-500 text-[10px] uppercase">Moyen de Règlement : </span>
                  {confirmedOrder.moyenPaiement === 'paytech' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PAYTECH ({verifiedChannelName.toUpperCase()})</span>
                    </span>
                  ) : confirmedOrder.moyenPaiement === 'wave' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-sky-800">
                      <img src="/assets/aistudio/image_0375626b.png" alt="Wave" className="w-3.5 h-3.5 rounded-xs object-cover" />
                      <span>WAVE MOBILE MONEY</span>
                    </span>
                  ) : confirmedOrder.moyenPaiement === 'orange_money' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-orange-800">
                      <img src="/assets/aistudio/image_f207f722.png" alt="Orange Money" className="w-3.5 h-3.5 rounded-xs object-contain bg-white" />
                      <span>ORANGE MONEY</span>
                    </span>
                  ) : (
                    <strong className="text-slate-900">{confirmedOrder.moyenPaiement.toUpperCase().replace('_', ' ')}</strong>
                  )}
                </div>
                {confirmedOrder.referenceTransactionMobileMoney && (
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">Réf Transaction Bancaire/Mobile : </span>
                    <strong className="text-emerald-700 font-bold font-mono block sm:inline">
                      {confirmedOrder.referenceTransactionMobileMoney}
                    </strong>
                  </div>
                )}
                {confirmedOrder.telephonePaiement && (
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">Mobile Émetteur : </span>
                    <strong className="text-slate-900 font-mono">{confirmedOrder.telephonePaiement}</strong>
                  </div>
                )}
                <div className="pt-1">
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold block sm:inline-block">
                    ✓ Alerte Direction transmise : SMS envoyé au +221 77 114 95 39
                  </span>
                </div>
              </div>
            </div>

            {/* Coordonnées Client & Livraison */}
            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1 border border-slate-200">
              <div className="flex justify-between items-start">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Client Acheteur :</span>
                <span className="font-bold text-slate-900">{confirmedOrder.client.nomComplet}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-500 text-[10px] uppercase">Téléphone :</span>
                <span className="font-semibold text-slate-800">{confirmedOrder.client.telephone}</span>
              </div>
              {confirmedOrder.client.email && (
                <div className="flex justify-between items-start">
                  <span className="text-slate-500 text-[10px] uppercase">E-mail :</span>
                  <span className="text-slate-800">{confirmedOrder.client.email}</span>
                </div>
              )}
              <div className="flex justify-between items-start pt-1 border-t border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase">Mode d'enlèvement :</span>
                <span className="font-bold text-slate-900 text-right">
                  {confirmedOrder.methodeLivraison === 'retrait_agence'
                    ? '📦 Retrait direct en Agence DIARRA (Siège Dakar - Gratuit)'
                    : `🚚 Livraison : ${confirmedOrder.client.adresseLivraison}, ${confirmedOrder.client.ville} (${confirmedOrder.client.pays})`}
                </span>
              </div>
            </div>

            {/* Table des Produits / Matériels commandés */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold uppercase text-slate-500 border-b border-slate-300 pb-1">
                <span>Désignation des Matériels</span>
                <span className="text-right">Montant (FCFA)</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {confirmedOrder.articles.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block leading-tight">{item.nom}</span>
                      <span className="text-[10px] text-slate-500 block">
                        Réf : {item.reference} · Qté : <strong>{item.quantite}x</strong> · P.U. : {formatPrice(item.prixUnitaireFCFA)}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 shrink-0 text-sm">
                      {formatPrice(item.totalLigneFCFA)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Décompte Financier */}
            <div className="border-t-2 border-dashed border-slate-300 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total articles :</span>
                <span className="font-mono text-slate-900">{formatPrice(confirmedOrder.sousTotalFCFA)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Frais de livraison :</span>
                <span className="font-mono text-slate-900">
                  {confirmedOrder.fraisLivraisonFCFA === 0 ? (
                    <span className="text-emerald-700 font-bold">0 FCFA (Gratuit)</span>
                  ) : (
                    formatPrice(confirmedOrder.fraisLivraisonFCFA)
                  )}
                </span>
              </div>

              <div className="pt-2 border-t-2 border-slate-900 flex justify-between items-baseline font-bold text-slate-950 text-base sm:text-lg">
                <span className="uppercase tracking-tight">TOTAL RÉGLÉ (TTC) :</span>
                <span className="font-mono font-black text-xl text-amber-600">
                  {formatPrice(confirmedOrder.totalFCFA)}
                </span>
              </div>
            </div>

            {/* Pied de Ticket & Mentions Légales */}
            <div className="border-t border-dashed border-slate-300 pt-4 text-center space-y-2 text-[10px] text-slate-500">
              {/* Simulation Code Barre Visuel */}
              <div className="py-1">
                <div className="inline-flex items-center gap-0.5 bg-slate-900 px-4 py-2 rounded text-white font-mono text-[9px] tracking-widest">
                  ||||| | |||| || ||||| ||| |||| | ||||| | |||| {confirmedOrder.numeroCommande}
                </div>
              </div>

              <p className="leading-relaxed">
                Ce ticket de caisse constitue votre justificatif de paiement et votre bon d'enlèvement officiel.<br />
                Garantie constructeur de 2 à 5 ans selon les spécifications des matériels.<br />
                En cas de question ou de suivi SAV, contactez notre service client au <strong>+221 77 114 95 39</strong>.
              </p>

              <p className="font-bold text-slate-800 text-[11px] pt-1 uppercase tracking-wider">
                *** Merci de votre confiance en DIARRA ENERGIE & BUSINESS ! ***
              </p>
            </div>
          </div>

          {/* Boutons retour sous le ticket (masqués à l'impression) */}
          <div className="no-print pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActiveTab('compte')}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors text-center"
            >
              Consulter l'historique dans Mon Compte
            </button>
            <button
              onClick={() => setActiveTab('boutique')}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors text-center"
            >
              Continuer mes achats sur la boutique
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
