import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, Check, Copy, Wifi, RotateCcw } from 'lucide-react';

export interface BankCard3DProps {
  cardHolderName: string;
  setCardHolderName: (val: string) => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvv: string;
  setCardCvv: (val: string) => void;
  isBankTransfer?: boolean;
}

export const BankCard3D: React.FC<BankCard3DProps> = ({
  cardHolderName,
  setCardHolderName,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
  isBankTransfer = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedRib, setCopiedRib] = useState(false);

  // Auto-format card number with spaces every 4 digits
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  // Auto-format expiry date MM/AA
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  // Format CVV 3 digits
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardCvv(raw);
  };

  // Display card number on 3D card
  const getDisplayCardNumber = () => {
    if (!cardNumber || cardNumber.trim() === '') {
      return '**** **** **** 2212';
    }
    // Pad to 16 digits representation
    const digitsOnly = cardNumber.replace(/\s/g, '');
    let display = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) display += ' ';
      if (i < digitsOnly.length) {
        // Show first 4 and last 4, mask middle digits or show user input
        display += digitsOnly[i];
      } else {
        display += '•';
      }
    }
    return display;
  };

  // Detect card network
  const firstDigit = cardNumber.replace(/\D/g, '')[0];
  const isMastercard = firstDigit === '5';

  const handleCopyRib = () => {
    navigator.clipboard.writeText('SN08 SN01 2013 0300 1204 5901 0274');
    setCopiedRib(true);
    setTimeout(() => setCopiedRib(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl text-white space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md">
            <CreditCard className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h4 className="font-heading font-extrabold text-sm sm:text-base text-white">
              {isBankTransfer
                ? 'Paiement Bancaire Sécurisé — Carte & Virement B2B'
                : 'Paiement Sécurisé par Carte Bancaire Visa / Mastercard'}
            </h4>
            <p className="text-[11px] text-slate-400">
              Chiffrement bancaire 3D Secure 2.0 • Cartes Visa, Mastercard & UEMOA
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-amber-400 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Retourner la carte 3D"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'Voir le Recto' : 'Voir le Verso (CVV)'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Card Visual + Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 3D Visual Card Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center py-2">
          {/* Card Container with 3D Perspective */}
          <div
            className="w-full max-w-[340px] sm:max-w-[360px] h-[215px] sm:h-[225px] cursor-pointer group"
            style={{ perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
            title="Cliquez pour retourner la carte"
          >
            <div
              className="relative w-full h-full transition-transform duration-700 rounded-2xl shadow-2xl"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(-6deg) rotateX(4deg)',
              }}
            >
              {/* === CARD FRONT === */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-amber-500/30 text-white flex flex-col justify-between overflow-hidden shadow-2xl backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Holographic Sheen overlay */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-amber-400/20 via-sky-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Card Top: Bank Brand + Contactless */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black tracking-wider text-xs sm:text-sm bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                      DIARRA SECUREPAY
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 font-mono border border-amber-400/20">
                      UEMOA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-amber-300/80 rotate-90" />
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest">3D-SECURE</span>
                  </div>
                </div>

                {/* Chip & NFC row */}
                <div className="flex items-center gap-4 relative z-10 my-1">
                  {/* Golden EMV Chip */}
                  <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1 border border-amber-300 shadow-inner flex flex-col justify-between">
                    <div className="flex justify-between h-2 border-b border-amber-700/30">
                      <div className="w-2 border-r border-amber-700/30" />
                      <div className="w-2 border-l border-amber-700/30" />
                    </div>
                    <div className="flex justify-between h-2">
                      <div className="w-2 border-r border-amber-700/30" />
                      <div className="w-2 border-l border-amber-700/30" />
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-200/70 font-mono">EMV SMART CHIP</span>
                </div>

                {/* Card Number */}
                <div className="relative z-10 py-1">
                  <span className="text-[9px] text-slate-400 font-mono block tracking-wider uppercase">
                    Numéro de carte
                  </span>
                  <div className="font-mono text-base sm:text-lg font-bold tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {getDisplayCardNumber()}
                  </div>
                </div>

                {/* Card Bottom: Holder Name, Expiry, Logo */}
                <div className="flex items-end justify-between relative z-10 pt-1 border-t border-slate-800/80">
                  <div className="max-w-[170px] truncate">
                    <span className="text-[8px] text-slate-400 font-mono block uppercase">
                      Titulaire de la carte
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-100 truncate block">
                      {cardHolderName.trim() ? cardHolderName.toUpperCase() : 'PRENOM NOM'}
                    </span>
                  </div>

                  <div className="text-center px-2">
                    <span className="text-[8px] text-slate-400 font-mono block uppercase">
                      Expire fin
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-100">
                      {cardExpiry || '**/**'}
                    </span>
                  </div>

                  {/* Logo VISA / Mastercard */}
                  <div className="shrink-0 flex items-center gap-1">
                    {isMastercard ? (
                      <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-rose-600 opacity-90" />
                        <div className="w-5 h-5 rounded-full bg-amber-400 opacity-90" />
                      </div>
                    ) : (
                      <span className="font-serif italic font-black text-lg sm:text-xl text-white tracking-tighter drop-shadow-md">
                        VISA
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* === CARD BACK === */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700 text-white flex flex-col justify-between overflow-hidden shadow-2xl backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {/* Magnetic Stripe */}
                <div className="w-full h-10 bg-slate-950 mt-4 border-y border-slate-800 shadow-inner" />

                {/* Signature Strip & CVV Box */}
                <div className="px-5 py-2">
                  <div className="flex items-center justify-between text-[8px] text-slate-400 font-mono mb-1">
                    <span>SIGNATURE AUTORISÉE</span>
                    <span>CODE CVV / CVC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-8 bg-slate-200/90 rounded flex items-center px-3 font-serif italic text-slate-600 text-xs overflow-hidden">
                      {cardHolderName.trim() ? cardHolderName : 'Signature du titulaire'}
                    </div>
                    <div className="w-16 h-8 bg-white text-slate-950 font-mono font-black text-sm flex items-center justify-center rounded border border-slate-300 tracking-widest shadow-inner">
                      {cardCvv || '***'}
                    </div>
                  </div>
                </div>

                {/* Back Footer */}
                <div className="px-5 pb-4 text-[8px] text-slate-400 leading-tight space-y-1">
                  <p>
                    Cette carte est protégée par les protocoles bancaires SSL 256-bit et 3D Secure.
                  </p>
                  <p className="text-amber-400/90 font-mono">
                    Service Sécurité Monétique DIARRA ENERGIE • Tél: +221 77 114 95 39
                  </p>
                </div>
              </div>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5">
            <RotateCcw className="w-3 h-3 text-amber-400" />
            Cliquez sur la carte pour voir le verso et le CVV
          </span>
        </div>

        {/* Card Form Fields Column */}
        <div className="lg:col-span-7 space-y-3.5 bg-slate-800/80 p-4 sm:p-5 rounded-xl border border-slate-700">
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
              <span>Prénom et Nom sur la carte : *</span>
              <span className="text-[10px] text-amber-400 font-normal">Identique au document d'identité</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: AMADOU DIALLO"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg text-xs font-medium text-white placeholder-slate-500 uppercase focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
              <span>Numéro de carte : *</span>
              <span className="text-[10px] text-slate-400 font-mono">16 chiffres</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={19}
                placeholder="**** **** **** 2212"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg text-xs font-mono font-bold text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <div className="absolute right-3 top-2.5 flex items-center gap-1 pointer-events-none">
                <CreditCard className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Expiration (MM/AA) : *
              </label>
              <input
                type="text"
                required
                maxLength={5}
                placeholder="**/** (ex: 12/28)"
                value={cardExpiry}
                onChange={handleExpiryChange}
                onFocus={() => setIsFlipped(false)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg text-xs font-mono font-bold text-white placeholder-slate-500 focus:outline-none transition-colors text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
                <span>Code CVV : *</span>
                <span className="text-[10px] text-slate-400">3 chiffres</span>
              </label>
              <input
                type="password"
                required
                maxLength={3}
                placeholder="***"
                value={cardCvv}
                onChange={handleCvvChange}
                onFocus={() => setIsFlipped(true)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg text-xs font-mono font-bold text-white placeholder-slate-500 focus:outline-none transition-colors text-center"
              />
            </div>
          </div>

          {/* Security Trust Badges */}
          <div className="pt-2 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Cryptage SSL 256-bit</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Protocole 3D Secure 2.0</span>
            </div>
            <span className="text-slate-400">Aucune donnée bancaire stockée</span>
          </div>
        </div>
      </div>

      {/* Extra B2B Wire section if Virement Bancaire is chosen */}
      {isBankTransfer && (
        <div className="pt-4 border-t border-slate-800 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Coordonnées Bancaires Officielles DIARRA ENERGIE pour Virement B2B :
            </span>
            <button
              type="button"
              onClick={handleCopyRib}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copiedRib ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedRib ? 'RIB Copié !' : 'Copier le RIB'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Banque & Pays :</span>
              <span className="text-white font-bold">CBAO Attijariwafa (Sénégal)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Titulaire Compte :</span>
              <span className="text-white font-bold">DIARRA ENERGIE & BUSINESS SUARL</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Code BIC / SWIFT :</span>
              <span className="text-amber-400 font-bold">CBAOSNDK</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            Vous pouvez régler directement par carte d'entreprise ou émettre votre virement interbancaire en précisant votre référence de commande. La commande sera préparée dès notification du règlement.
          </p>
        </div>
      )}
    </div>
  );
};
