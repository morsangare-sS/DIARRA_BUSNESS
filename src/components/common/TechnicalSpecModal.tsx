import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileDown,
  ShoppingBag,
  FileText,
  Shield,
  CheckCircle,
  Share2,
  Printer,
  ChevronRight,
  Zap,
  Wrench,
  ShieldCheck,
  Tag,
  Droplet,
  Sun,
  MapPin,
  BatteryCharging,
  Cpu,
  Layers
} from 'lucide-react';

export const TechnicalSpecModal: React.FC = () => {
  const {
    specModalProduct,
    setSpecModalProduct,
    addToCart,
    setActiveTab,
    formatPrice,
    showToast
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (!specModalProduct) return null;

  const product = specModalProduct;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast(`Téléchargement de la fiche technique ${product.reference}.pdf initié`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-800">
              FICHE TECHNIQUE · {product.reference}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              DIARRA ENERGIE & BUSINESS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
              title="Imprimer la fiche technique"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadPDF}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
              title="Télécharger la fiche PDF"
            >
              <FileDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSpecModalProduct(null)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Section: Media + Commercial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.imagePrincipale}
                alt={product.nom}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                <span>{product.categorie.replace('-', ' ').toUpperCase()}</span>
                <span aria-hidden="true"> · </span>
                <span>{product.sousCategorie}</span>
              </div>

              <h2 className="font-heading font-bold text-slate-900 text-xl sm:text-2xl leading-tight">
                {product.nom}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.descriptionDetaillee}
              </p>

              {/* Price & Buying Module */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    {product.estSurDevis ? (
                      <span className="text-base font-bold text-amber-700">
                        Tarif sur devis d'ingénierie
                      </span>
                    ) : (
                      <span className="font-mono text-2xl font-extrabold text-slate-900">
                        {formatPrice(product.prixFCFA)}
                      </span>
                    )}
                    <span className="block text-xs text-slate-500 mt-0.5">
                      {product.stockDisponible > 0
                        ? `Disponible en stock (${product.stockDisponible} unités) · Expédition sous ${product.delaiLivraisonJours}j`
                        : 'Délai d’approvisionnement : 10 à 15 jours'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {!product.estSurDevis && (
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-l-lg text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 font-mono text-sm text-slate-900 font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-r-lg text-sm"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {!product.estSurDevis ? (
                    <button
                      onClick={() => {
                        addToCart(product, quantity);
                        setSpecModalProduct(null);
                      }}
                      className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au Panier</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSpecModalProduct(null);
                        setActiveTab('devis');
                      }}
                      className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Demander une Étude & Devis</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-slate-900 text-base border-b border-slate-200 pb-2">
              Caractéristiques Techniques Détaillées
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs">
              {product.specs.puissance && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Puissance nominale</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.puissance}</span>
                </div>
              )}
              {product.specs.fluxLumineux && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Flux lumineux</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.fluxLumineux}</span>
                </div>
              )}
              {product.specs.panneauSolaire && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Panneau photovoltaïque</span>
                  <span className="font-medium text-slate-900">{product.specs.panneauSolaire}</span>
                </div>
              )}
              {product.specs.batterieType && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Technologie batterie</span>
                  <span className="font-medium text-slate-900">{product.specs.batterieType}</span>
                </div>
              )}
              {product.specs.batterieCapacite && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Capacité & Tension</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.batterieCapacite}</span>
                </div>
              )}
              {product.specs.autonomie && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Autonomie en jours sans soleil</span>
                  <span className="font-medium text-slate-900">{product.specs.autonomie}</span>
                </div>
              )}
              {product.specs.debitMax && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Débit hydraulique maximum</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.debitMax}</span>
                </div>
              )}
              {product.specs.hmtMax && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Hauteur manométrique (HMT)</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.hmtMax}</span>
                </div>
              )}
              {product.specs.profondeurImmersion && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Immersion / Profondeur</span>
                  <span className="font-medium text-slate-900">{product.specs.profondeurImmersion}</span>
                </div>
              )}
              {product.specs.hauteurMat && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Hauteur de mât préconisée</span>
                  <span className="font-medium text-slate-900">{product.specs.hauteurMat}</span>
                </div>
              )}
              {product.specs.dimensions && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Dimensions (L × W × H)</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.dimensions}</span>
                </div>
              )}
              {product.specs.indiceProtection && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Indice de protection (IP/IK)</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.indiceProtection}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Garantie constructeur</span>
                <span className="font-semibold text-emerald-700">{product.specs.garantie}</span>
              </div>
            </div>
          </div>

          {/* Table of Available Variants / Models if present */}
          {product.variantesDisponibles && product.variantesDisponibles.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-slate-900 text-sm">
                  Matrice des Déclinaisons & Puissances de la Série ({product.reference})
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  {product.variantesDisponibles.length} configurations usine
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Modèle / Réf</th>
                      <th className="py-2.5 px-3">Puissance</th>
                      <th className="py-2.5 px-3">Optique / Crosse</th>
                      <th className="py-2.5 px-3">Dimensions / Mât</th>
                      <th className="py-2.5 px-3">Flux Lumineux</th>
                      <th className="py-2.5 px-3">Solaire & Batterie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {product.variantesDisponibles.map((v, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/60 transition-colors">
                        <td className="py-2 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {v.modele}
                        </td>
                        <td className="py-2 px-3 font-mono text-amber-700 font-bold whitespace-nowrap">
                          {v.puissance}
                        </td>
                        <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                          {v.lentillesOuOptique || '—'}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-600 whitespace-nowrap text-[11px]">
                          {v.dimensions || v.hauteurMat || '—'}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-700 whitespace-nowrap">
                          {v.fluxLumineux || '—'}
                        </td>
                        <td className="py-2 px-3 text-slate-600 text-[11px]">
                          {v.panneauSolaire && v.batterie
                            ? `${v.panneauSolaire} / ${v.batterie}`
                            : v.panneauSolaire || v.batterie || 'Inclus monobloc'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 1. Caractéristiques Électriques Détaillées */}
          {(product.specs.caracteristiquesElectriques || product.specs.tensionFonctionnement) && (
            <div className="space-y-3 bg-amber-50/60 p-5 rounded-xl border border-amber-200/80">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Caractéristiques Électriques & Alimentation Réseau</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {product.specs.tensionFonctionnement && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Tension de fonctionnement</span>
                    <strong className="text-slate-900 font-mono">{product.specs.tensionFonctionnement}</strong>
                  </div>
                )}
                {product.specs.caracteristiquesElectriques?.tensionAlimentation && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Tension d'alimentation AC</span>
                    <strong className="text-slate-900 font-mono">{product.specs.caracteristiquesElectriques.tensionAlimentation}</strong>
                  </div>
                )}
                {product.specs.caracteristiquesElectriques?.frequence && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Fréquence assignée</span>
                    <strong className="text-slate-900 font-mono">{product.specs.caracteristiquesElectriques.frequence}</strong>
                  </div>
                )}
                {product.specs.caracteristiquesElectriques?.facteurPuissance && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Facteur de puissance (Cos φ)</span>
                    <strong className="text-slate-900 font-mono">{product.specs.caracteristiquesElectriques.facteurPuissance}</strong>
                  </div>
                )}
                {product.specs.caracteristiquesElectriques?.protectionSurtension && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Protection surtension (SPD)</span>
                    <strong className="text-slate-900 font-mono">{product.specs.caracteristiquesElectriques.protectionSurtension}</strong>
                  </div>
                )}
                {product.specs.caracteristiquesElectriques?.classeIsolation && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Classe d'isolation électrique</span>
                    <strong className="text-slate-900">{product.specs.caracteristiquesElectriques.classeIsolation}</strong>
                  </div>
                )}
                {product.specs.caracteristiquesElectriques?.driverOuAlimentation && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 sm:col-span-2">
                    <span className="text-slate-500 block text-[11px]">Driver / Ballast électronique</span>
                    <strong className="text-slate-900">{product.specs.caracteristiquesElectriques.driverOuAlimentation}</strong>
                  </div>
                )}
                {product.specs.caracteristiquesElectriques?.distorsionHarmonique && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Distorsion harmonique totale (THD)</span>
                    <strong className="text-slate-900 font-mono">{product.specs.caracteristiquesElectriques.distorsionHarmonique}</strong>
                  </div>
                )}
                {product.specs.caracteristiquesElectriques?.rendementLumineux && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Rendement lumineux LED</span>
                    <strong className="text-slate-900 font-mono">{product.specs.caracteristiquesElectriques.rendementLumineux}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 1.bis Caractéristiques Pompage & Forage Détaillées (Article 4.4) */}
          {product.specs.specsPompage && (
            <div className="space-y-4 bg-sky-50/70 p-5 rounded-xl border border-sky-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-950 font-semibold text-sm">
                  <Droplet className="w-4 h-4 text-sky-600" />
                  <span>Caractéristiques Hydrauliques & Forage Recommandé</span>
                </div>
                <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold uppercase">
                  Spécification Eau & Forage
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {product.specs.specsPompage.debitMax && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Débit hydraulique max</span>
                    <strong className="text-slate-900 font-mono text-sm">{product.specs.specsPompage.debitMax}</strong>
                  </div>
                )}
                {product.specs.specsPompage.debitNominal && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Débit nominal au point de consigne</span>
                    <strong className="text-slate-900 font-mono">{product.specs.specsPompage.debitNominal}</strong>
                  </div>
                )}
                {product.specs.specsPompage.hauteurManometriqueTotale && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Hauteur manométrique (HMT)</span>
                    <strong className="text-slate-900 font-mono text-sm">{product.specs.specsPompage.hauteurManometriqueTotale}</strong>
                  </div>
                )}
                {product.specs.specsPompage.puissanceMoteur && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Puissance moteur pompe</span>
                    <strong className="text-slate-900 font-mono">{product.specs.specsPompage.puissanceMoteur}</strong>
                  </div>
                )}
                {product.specs.specsPompage.tensionAlimentation && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Tension d'alimentation pompe</span>
                    <strong className="text-slate-900 font-mono">{product.specs.specsPompage.tensionAlimentation}</strong>
                  </div>
                )}
                {product.specs.specsPompage.profondeurInstallationRecommandee && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Profondeur immersion conseillée</span>
                    <strong className="text-slate-900 font-mono">{product.specs.specsPompage.profondeurInstallationRecommandee}</strong>
                  </div>
                )}
                {product.specs.specsPompage.diametreForageMin && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Diamètre min forage (tubage)</span>
                    <strong className="text-slate-900">{product.specs.specsPompage.diametreForageMin}</strong>
                  </div>
                )}
                {product.specs.specsPompage.diametreRefoulement && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Raccord refoulement pompe</span>
                    <strong className="text-slate-900 font-mono">{product.specs.specsPompage.diametreRefoulement}</strong>
                  </div>
                )}
                {product.specs.specsPompage.materiauCorps && (
                  <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                    <span className="text-slate-500 block text-[11px]">Alliage & résistance corrosion</span>
                    <strong className="text-slate-900">{product.specs.specsPompage.materiauCorps}</strong>
                  </div>
                )}
              </div>

              {/* Système Photovoltaïque Compatible */}
              {product.specs.specsPompage.systemePhotovoltaiqueCompatible && (
                <div className="bg-white p-3.5 rounded-xl border border-sky-200/80 space-y-2 mt-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>Système Photovoltaïque Compatible & Variateur MPPT</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
                    <div className="p-2 bg-amber-50/50 rounded border border-amber-100">
                      <span className="text-slate-500 block">Puissance crête recommandée :</span>
                      <strong className="text-slate-900 font-mono">{product.specs.specsPompage.systemePhotovoltaiqueCompatible.puissanceCreteRecommandee}</strong>
                    </div>
                    <div className="p-2 bg-amber-50/50 rounded border border-amber-100">
                      <span className="text-slate-500 block">Modules solaires :</span>
                      <strong className="text-slate-900">{product.specs.specsPompage.systemePhotovoltaiqueCompatible.nombrePanneaux}</strong>
                    </div>
                    <div className="p-2 bg-amber-50/50 rounded border border-amber-100">
                      <span className="text-slate-500 block">Tension circuit ouvert Voc max :</span>
                      <strong className="text-slate-900 font-mono">{product.specs.specsPompage.systemePhotovoltaiqueCompatible.tensionVocMax}</strong>
                    </div>
                    <div className="p-2 bg-amber-50/50 rounded border border-amber-100">
                      <span className="text-slate-500 block">Plage de tracking MPPT :</span>
                      <strong className="text-slate-900 font-mono">{product.specs.specsPompage.systemePhotovoltaiqueCompatible.plageMppt}</strong>
                    </div>
                  </div>
                  {product.specs.specsPompage.systemePhotovoltaiqueCompatible.technologieOnduleur && (
                    <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                      <span className="font-semibold text-slate-800">Régulation MPPT : </span>
                      {product.specs.specsPompage.systemePhotovoltaiqueCompatible.technologieOnduleur}
                    </div>
                  )}
                </div>
              )}

              {/* Villages et projets d'exemples */}
              {product.specs.specsPompage.exemplesProjetsOuVillages && product.specs.specsPompage.exemplesProjetsOuVillages.length > 0 && (
                <div className="pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Exemples de forages & localités en exploitation (Sénégal & Sous-Région) :</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs.specsPompage.exemplesProjetsOuVillages.map((loc, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 bg-white border border-sky-200 text-sky-900 rounded-md font-medium shadow-2xs">
                        📍 {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 1.ter Caractéristiques Kits Solaires & Stockage d'Énergie (Article 4.3) */}
          {product.specs.specsKitsStockage && (
            <div className="space-y-4 bg-amber-50/70 p-5 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-950 font-semibold text-sm">
                  <BatteryCharging className="w-4 h-4 text-amber-600" />
                  <span>Spécifications Solaire, Onduleur & Stockage Énergétique</span>
                </div>
                <span className="text-[10px] font-mono bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-semibold uppercase">
                  Kit Solaire & Batterie
                </span>
              </div>

              {/* Grille principale des paramètres électriques */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {product.specs.specsKitsStockage.puissancePanneaux && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200/80">
                    <span className="text-slate-500 block text-[11px]">Puissance des panneaux photovoltaïques</span>
                    <strong className="text-slate-900 font-mono text-sm">{product.specs.specsKitsStockage.puissancePanneaux}</strong>
                  </div>
                )}
                {product.specs.specsKitsStockage.puissanceOnduleur && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200/80">
                    <span className="text-slate-500 block text-[11px]">Puissance de l’onduleur</span>
                    <strong className="text-slate-900 font-mono text-sm">{product.specs.specsKitsStockage.puissanceOnduleur}</strong>
                  </div>
                )}
                {product.specs.specsKitsStockage.capaciteBatterie && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200/80">
                    <span className="text-slate-500 block text-[11px]">Capacité des batteries de stockage</span>
                    <strong className="text-slate-900 font-mono text-sm text-emerald-700">{product.specs.specsKitsStockage.capaciteBatterie}</strong>
                  </div>
                )}
                {product.specs.specsKitsStockage.tensionBatteries && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200/80">
                    <span className="text-slate-500 block text-[11px]">Tension nominale des batteries</span>
                    <strong className="text-slate-900 font-mono">{product.specs.specsKitsStockage.tensionBatteries}</strong>
                  </div>
                )}
                {product.specs.specsKitsStockage.technologieBatterie && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200/80">
                    <span className="text-slate-500 block text-[11px]">Technologie & Chimie de stockage</span>
                    <strong className="text-slate-900">{product.specs.specsKitsStockage.technologieBatterie}</strong>
                  </div>
                )}
                {product.specs.specsKitsStockage.typeOnduleur && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200/80">
                    <span className="text-slate-500 block text-[11px]">Type & Technologie de l’onduleur</span>
                    <strong className="text-slate-900">{product.specs.specsKitsStockage.typeOnduleur}</strong>
                  </div>
                )}
                {product.specs.specsKitsStockage.autonomieEstimee && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200/80 col-span-1 sm:col-span-2 md:col-span-3">
                    <span className="text-slate-500 block text-[11px]">Autonomie estimée en coupure réseau</span>
                    <strong className="text-slate-900">{product.specs.specsKitsStockage.autonomieEstimee}</strong>
                  </div>
                )}
              </div>

              {/* Équipements Inclus dans le Pack */}
              {product.specs.specsKitsStockage.equipementsInclus && product.specs.specsKitsStockage.equipementsInclus.length > 0 && (
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>Équipements Inclus dans le Kit Complet :</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {product.specs.specsKitsStockage.equipementsInclus.map((eq, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-800 bg-amber-50/50 p-1.5 rounded border border-amber-100">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Usages Recommandés */}
              {product.specs.specsKitsStockage.usagesRecommandes && product.specs.specsKitsStockage.usagesRecommandes.length > 0 && (
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Usages Recommandés & Appareils Pris en Charge :</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs.specsKitsStockage.usagesRecommandes.map((usage, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 bg-amber-100/60 border border-amber-200 text-amber-950 rounded-md font-medium">
                        ⚡ {usage}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Options d'Installation */}
              {product.specs.specsKitsStockage.optionsInstallation && product.specs.specsKitsStockage.optionsInstallation.length > 0 && (
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                    <Wrench className="w-4 h-4 text-slate-600" />
                    <span>Options d’Installation & Supports Disponibles :</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs.specsKitsStockage.optionsInstallation.map((opt, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-md font-medium">
                        🛠️ {opt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. Conditions d'Installation & Prérequis de Pose */}
          {product.specs.conditionsInstallation && product.specs.conditionsInstallation.length > 0 && (
            <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Conditions d’Installation & Recommandations de Pose</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {product.specs.conditionsInstallation.map((condition, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Garantie & Engagements SAV */}
          <div className="space-y-3 bg-emerald-50/70 p-5 rounded-xl border border-emerald-200/80">
            <div className="flex items-center gap-2 text-emerald-950 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garantie Constructeur & Service Après-Vente</span>
            </div>
            <div className="space-y-2 text-xs text-emerald-900">
              <p>
                <strong>Durée de garantie contractuelle :</strong> {product.specs.garantie} pièces et main d’œuvre.
              </p>
              {product.specs.garantieDetails ? (
                <p className="text-slate-600 leading-relaxed">
                  {product.specs.garantieDetails}
                </p>
              ) : (
                <p className="text-slate-600 leading-relaxed">
                  Garantie intégrale couvrant les défauts de fabrication, le driver d'alimentation, les modules LED et l'étanchéité IP. Engagement de disponibilité des pièces détachées d'origine pendant 10 ans en agence DIARRA ENERGIE (Dakar, Cotonou, Lomé).
                </p>
              )}
            </div>
          </div>

          {/* 4. Prix Applicables & Modalités Tarifaires */}
          <div className="space-y-3 bg-slate-900 text-white p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Tag className="w-4 h-4" />
              <span>Prix Applicables & Conditions Commerciales Marchés Publics</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-slate-400">Tarif catalogue unitaire :</span>
                <span className="text-amber-400 font-mono font-bold text-sm">
                  {product.estSurDevis ? 'Sur devis quantitatif personnalisé' : `${formatPrice(product.prixFCFA)} TTC`}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {product.specs.prixApplicables || 'Tarif dégressif par paliers pour commandes quantitatives de collectivités locales, mairies, ministères et entreprises du BTP. Possibilité de facturation hors taxes (HT) pour projets sous exonération fiscale ou bailleurs de fonds (UEMOA, BOAD, BAD, Banque Mondiale).'}
              </p>
            </div>
          </div>

          {/* Certifications and Compliance */}
          {product.specs.certifications && (
            <div className="pt-2">
              <span className="text-xs text-slate-500 block mb-2">Normes & Certifications de conformité :</span>
              <div className="flex flex-wrap gap-2">
                {product.specs.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
