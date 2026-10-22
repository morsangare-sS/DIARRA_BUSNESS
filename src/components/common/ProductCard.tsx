import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, FileText, Check, Plus, Eye, Scale, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    setActiveTab,
    formatPrice,
    setSpecModalProduct,
    comparisonList,
    toggleCompare,
    openDiscussionModal
  } = useApp();

  const [imgError, setImgError] = useState(false);
  const isCompared = comparisonList.some((p) => p.id === product.id);

  const handleAction = () => {
    if (product.estSurDevis) {
      setActiveTab('devis');
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-md transition-all duration-200">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.imagePrincipale}
            alt={product.nom}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
            <span className="text-3xl mb-1">⚡</span>
            <span className="text-xs font-medium text-slate-700 text-center">{product.nom}</span>
          </div>
        )}

        {/* Quick View Spec Button overlay */}
        <button
          onClick={() => setSpecModalProduct(product)}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-700 hover:text-slate-950 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100"
          title="Consulter la fiche technique"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Compare quick toggle */}
        <button
          onClick={() => toggleCompare(product)}
          className={`absolute bottom-2.5 right-2.5 px-2 py-1 rounded text-[11px] font-medium backdrop-blur-sm transition-all flex items-center gap-1 ${
            isCompared
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'bg-white/90 text-slate-700 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100'
          }`}
          title="Comparer cet équipement"
        >
          <Scale className="w-3 h-3" />
          <span>{isCompared ? 'Comparé' : 'Comparer'}</span>
        </button>
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-600">
              {product.reference}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="truncate">{product.sousCategorie}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSpecModalProduct(product)}
            className="font-heading font-semibold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-amber-600 cursor-pointer transition-colors"
          >
            {product.nom}
          </h3>

          {/* Key Specs snippet (unboxed text) */}
          <div className="mt-2 text-xs text-slate-600 space-y-0.5">
            {product.specs.specsKitsStockage?.puissancePanneaux && (
              <p className="truncate">
                <span className="text-slate-400">Panneaux :</span> {product.specs.specsKitsStockage.puissancePanneaux}
              </p>
            )}
            {product.specs.specsKitsStockage?.puissanceOnduleur && (
              <p className="truncate">
                <span className="text-slate-400">Onduleur :</span> {product.specs.specsKitsStockage.puissanceOnduleur}
              </p>
            )}
            {product.specs.specsKitsStockage?.capaciteBatterie && (
              <p className="truncate">
                <span className="text-slate-400">Batterie :</span> <strong className="text-emerald-700 font-mono">{product.specs.specsKitsStockage.capaciteBatterie}</strong>
              </p>
            )}
            {product.specs.puissance && !product.specs.specsKitsStockage?.puissanceOnduleur && (
              <p className="truncate">
                <span className="text-slate-400">Puissance :</span> {product.specs.puissance}
              </p>
            )}
            {product.specs.debitMax && (
              <p className="truncate">
                <span className="text-slate-400">Débit max :</span> {product.specs.debitMax}
              </p>
            )}
            {product.specs.fluxLumineux && (
              <p className="truncate">
                <span className="text-slate-400">Flux :</span> {product.specs.fluxLumineux}
              </p>
            )}
            {product.specs.batterieCapacite && !product.specs.specsKitsStockage?.capaciteBatterie && (
              <p className="truncate">
                <span className="text-slate-400">Batterie :</span> {product.specs.batterieCapacite}
              </p>
            )}
            {product.specs.tensionFonctionnement && (
              <p className="truncate">
                <span className="text-slate-400">Tension :</span> {product.specs.tensionFonctionnement}
              </p>
            )}
            <p className="truncate text-slate-500">
              <span className="text-slate-400">Garantie :</span> {product.specs.garantie}
            </p>
          </div>
        </div>

        {/* Pricing & Stock Status */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-baseline justify-between gap-2">
          <div>
            {product.estSurDevis ? (
              <div>
                <span className="text-xs font-semibold text-amber-700 block">Sur devis technique</span>
                <span className="text-[10px] text-slate-400 block">Étude personnalisée</span>
              </div>
            ) : (
              <div>
                <span className="font-mono tabular-nums font-extrabold text-slate-900 text-base sm:text-lg">
                  {formatPrice(product.prixFCFA)}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {product.stockDisponible > 0 ? `En stock (${product.stockDisponible})` : 'Sur commande'}
                </span>
              </div>
            )}
          </div>

          <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
            {product.reference}
          </span>
        </div>

        {/* Action Buttons: Responsive vertical layout ensuring zero overflow on desktop & mobile */}
        <div className="mt-2.5 flex flex-col gap-1.5 w-full min-w-0">
          {/* Bouton Ajouter au panier / Devis */}
          <button
            onClick={handleAction}
            className={`w-full py-2 px-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-95 text-center ${
              product.estSurDevis
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-amber-400 text-slate-950 hover:bg-amber-500'
            }`}
            title={product.estSurDevis ? 'Demander un devis' : 'Ajouter cet équipement au panier'}
          >
            {product.estSurDevis ? (
              <>
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Demander un devis</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Ajouter au panier</span>
              </>
            )}
          </button>

          {/* Bouton Discuter (Direct Chat Client <-> Administration) */}
          <button
            onClick={() => openDiscussionModal(product)}
            className="w-full py-1.5 px-2.5 text-xs font-bold rounded-lg border border-amber-500/60 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-950 flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-95 group text-center"
            title="Discuter en direct avec l'administration à propos de ce matériel"
            aria-label="Discuter de ce produit avec l'administration"
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform shrink-0" />
            <span className="truncate">Discuter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
