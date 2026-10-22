import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Download,
  FileText,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Award,
  Sun,
  BatteryCharging,
  Cpu,
  Layers,
  CheckCircle2,
  ChevronRight,
  Globe,
  Radio,
  Sliders,
  MapPin,
  Sparkles
} from 'lucide-react';

export const SunLuminCatalogModal: React.FC = () => {
  const { isSunLuminModalOpen, closeSunLuminModal, setActiveTab } = useApp();
  const [activeCatalogTab, setActiveCatalogTab] = useState<'luminaires' | 'iot' | 'batteries' | 'mats' | 'references' | 'contact'>('luminaires');

  if (!isSunLuminModalOpen) return null;

  const handlePrintOrDownload = () => {
    window.print();
  };

  const handleRequestQuote = () => {
    closeSunLuminModal();
    setActiveTab('devis');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-4 sm:p-6 shrink-0 relative border-b border-amber-500/30">
          <button
            onClick={closeSunLuminModal}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors print:hidden"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5" />
              Partenariat Stratégique Exclusif
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300">Afrique de l'Ouest · Sénégal · Bénin · Togo</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-white tracking-tight">
            SUNLUMIN LED Solar Lighting System Solution
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Dossier technique officiel de référence (22 pages) : Lampadaires solaires haute performance SLM-TYN-01 à 04, télésurveillance IoT 4G/Zigbee, stockage LiFePO4 longue durée et mâts galvanisés.
          </p>

          {/* Quick Action Buttons on Top Bar */}
          <div className="flex flex-wrap items-center gap-2 mt-4 print:hidden">
            <button
              onClick={handleRequestQuote}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Demander un devis sur ces équipements</span>
            </button>

            <a
              href="https://wa.me/221771149539?text=Bonjour,%20je%20souhaite%20obtenir%20des%20informations%20sur%20le%20catalogue%20technique%20SunLumin%20SLM-TYN"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Bureau Sénégal : +221 77 114 95 39</span>
            </a>

            <button
              onClick={handlePrintOrDownload}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger / Imprimer la Fiche</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs corresponding to the 22-page sections */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs font-bold shrink-0 py-2.5 print:hidden">
          <button
            onClick={() => setActiveCatalogTab('luminaires')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCatalogTab === 'luminaires'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>1. Gammes SLM-TYN (01 à 04)</span>
          </button>

          <button
            onClick={() => setActiveCatalogTab('iot')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCatalogTab === 'iot'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>2. Smart Lighting IoT (4G/Zigbee)</span>
          </button>

          <button
            onClick={() => setActiveCatalogTab('batteries')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCatalogTab === 'batteries'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>3. Batteries LiFePO4 & MPPT</span>
          </button>

          <button
            onClick={() => setActiveCatalogTab('mats')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCatalogTab === 'mats'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. Panneaux & Mâts 3m-12m</span>
          </button>

          <button
            onClick={() => setActiveCatalogTab('references')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCatalogTab === 'references'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>5. Références Chantiers</span>
          </button>

          <button
            onClick={() => setActiveCatalogTab('contact')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCatalogTab === 'contact'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>6. Bureau Sénégal & Contacts</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-8 flex-1 text-slate-800">
          
          {/* TAB 1: GAMMES DE LUMINAIRES SLM-TYN-01 À 04 */}
          {activeCatalogTab === 'luminaires' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                    Série SLM-TYN : Luminaires Haute Performance Voiries & Autoroutes
                  </h3>
                  <p className="text-xs text-slate-500">
                    Conformes aux normes internationales : CE, CB, RoHS, IP66, IK09 avec 5 ans de garantie constructeur.
                  </p>
                </div>
                <span className="hidden sm:inline-block font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Pages 01 à 08
                </span>
              </div>

              {/* 4 Models Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Model 01 */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Modèle Aérodynamique</span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">IP66 / IK09</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    SLM-TYN-01 (50W à 300W)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Luminaire modulaire ultra-léger avec dissipation thermique par convection naturelle. Montage horizontal ou vertical orientable à 90°.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-slate-200 font-mono">
                    <div>Puissances : <strong>50W / 100W / 150W / 240W / 300W</strong></div>
                    <div>Efficacité : <strong>130-160 lm/W</strong></div>
                    <div>Puces LED : <strong>Philips Lumileds 3030/5050</strong></div>
                    <div>Angle mât : <strong>Φ60mm (H: 6-12m)</strong></div>
                  </div>
                </div>

                {/* Model 02 */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Série Châssis Compact</span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">IP66 / IK09</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    SLM-TYN-02 (80W à 180W)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Corps monobloc en fonte d'aluminium avec double compartiment séparé pour driver et bloc optique anti-poussière.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-slate-200 font-mono">
                    <div>Modèles : <strong>80W (8 lentilles) / 150W / 180W</strong></div>
                    <div>Lentilles optiques : <strong>Polycarbonate traité UV</strong></div>
                    <div>Facteur de puissance : <strong>&gt; 0.95</strong></div>
                    <div>Température de couleur : <strong>2200K à 6500K</strong></div>
                  </div>
                </div>

                {/* Model 03 */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Série Modulaire Haute Puissance</span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">Modules IP67</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    SLM-TYN-03 (50W à 300W)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Architecture modulaire 1 à 6 modules indépendants étanches IP67. Verre trempé transparent haute transmission (&gt;98%).
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-slate-200 font-mono">
                    <div>Configuration : <strong>1 à 6 modules 50W</strong></div>
                    <div>Distribution optique : <strong>Batwing Type II / III</strong></div>
                    <div>Durée de vie LED : <strong>&gt; 50 000 heures</strong></div>
                    <div>Cycles allumage : <strong>&gt; 100 000 commutations</strong></div>
                  </div>
                </div>

                {/* Model 04 */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Design Urbain Épuré</span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">Noir & Gris Métallisé</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    SLM-TYN-04 (50W à 300W)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Finitions gris anthracite ou noir mat anodisé. Idéal pour avenues métropolitaines, voies express et boulevards côtiers.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-slate-200 font-mono">
                    <div>Puces : <strong>High Power 5050</strong></div>
                    <div>Rendu des couleurs : <strong>CRI &gt; 70 / CRI 80</strong></div>
                    <div>Plage thermique : <strong>-30°C ~ +50°C</strong></div>
                    <div>Garantie totale : <strong>5 ans constructeur</strong></div>
                  </div>
                </div>
              </div>

              {/* Photometric & Engineering Highlights */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 space-y-3 text-xs text-amber-950">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Courbes Photométriques & Optiques Spécifiques Voirie Ouest-Africaine</span>
                </div>
                <p className="leading-relaxed">
                  Tous les modèles SunLumin intègrent des optiques brevetées <strong>Batwing Light Distribution</strong> assurant une illumination uniforme de la chaussée (largeur de 6m à 16m) sans zone d'ombre entre les mâts espacés de 25m à 35m, réduisant considérablement le nombre de mâts requis au kilomètre.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SMART LIGHTING IOT & GESTION CLOUD */}
          {activeCatalogTab === 'iot' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                  Système de Gestion Centralisée IoT & Télésurveillance (Pages 14 à 17)
                </h3>
                <p className="text-xs text-slate-500">
                  Supervision en temps réel des parcs communaux par réseau sans fil 4G / NB-IoT / Zigbee avec plateforme Cloud et application mobile.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Radio className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Contrôleur IoT-4G M1280</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Contrôleur intelligent MPPT intégré avec booster courant constant. Communication 4G / Zigbee bidirectionnelle pour télégestion.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Gestion des Modes d'Autonomie</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Programmation multi-paliers : Mode veille 30% puis 100% au passage (Radar PIR/Doppler), ou gradation automatique 100%-70%-40%.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Application Mobile & Cartographie GPS</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Localisation exacte de chaque candélabre sur carte GPS, diagnostic des pannes à distance, relevé tension/courant instantané.
                  </p>
                </div>
              </div>

              {/* Topology Scheme */}
              <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
                <span className="text-xs font-mono font-bold text-amber-400 block uppercase">
                  Topologie Système (Page 17 du Catalogue SunLumin)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <span className="text-amber-300 font-bold block mb-1">📱 Terminal PC / Tablette</span>
                    <span className="text-[11px] text-slate-400">Dashboard de contrôle & QR Code scanner</span>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <span className="text-amber-300 font-bold block mb-1">☁️ Serveur Cloud & Monitoring</span>
                    <span className="text-[11px] text-slate-400">Stockage télémétrie & rapports de pannes</span>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <span className="text-amber-300 font-bold block mb-1">📡 Antenne Relais 4G / NB-IoT</span>
                    <span className="text-[11px] text-slate-400">Passerelle GSM longue portée sécurisée</span>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <span className="text-amber-300 font-bold block mb-1">💡 Candélabres Connectés</span>
                    <span className="text-[11px] text-slate-400">Contrôleur MPPT M1280 + Radar PIR</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BATTERIES LIFEPO4 & MPPT */}
          {activeCatalogTab === 'batteries' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                  Caissons Batteries LiFePO4 & Unités Intégrées (Pages 10 & 11)
                </h3>
                <p className="text-xs text-slate-500">
                  Cellules Lithium Fer Phosphate (LiFePO4) de classe A avec boîtier profilé aluminium IP66 thermo-résistant jusqu'à +60°C.
                </p>
              </div>

              {/* Specs Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Série Caisson</th>
                      <th className="p-3">Tension Nominale</th>
                      <th className="p-3">Capacité (Ah)</th>
                      <th className="p-3">Énergie Stockée</th>
                      <th className="p-3">Contrôleur MPPT</th>
                      <th className="p-3">Poids Réf.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-amber-700">BC13.12030.4S10A</td>
                      <td className="p-3">12.8V</td>
                      <td className="p-3">30Ah (C5)</td>
                      <td className="p-3 font-semibold">384 Wh</td>
                      <td className="p-3">MZB60-L</td>
                      <td className="p-3">4.6 ± 0.2 kg</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-amber-700">BC13.12045.4S10A</td>
                      <td className="p-3">12.8V</td>
                      <td className="p-3">45Ah (C5)</td>
                      <td className="p-3 font-semibold">576 Wh</td>
                      <td className="p-3">MZB60-L</td>
                      <td className="p-3">6.1 ± 0.2 kg</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-amber-700">BC13.12060.4S10A</td>
                      <td className="p-3">12.8V</td>
                      <td className="p-3">60Ah (C5)</td>
                      <td className="p-3 font-semibold">768 Wh</td>
                      <td className="p-3">MZB60-L</td>
                      <td className="p-3">7.5 ± 0.2 kg</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-amber-700">BC13.12075.4S15A</td>
                      <td className="p-3">12.8V</td>
                      <td className="p-3">75Ah (C5)</td>
                      <td className="p-3 font-semibold">960 Wh</td>
                      <td className="p-3">MZB120-L</td>
                      <td className="p-3">9.1 ± 0.2 kg</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-amber-700">BC13.12090.4S15A</td>
                      <td className="p-3">12.8V</td>
                      <td className="p-3">90Ah (C5)</td>
                      <td className="p-3 font-semibold">1 152 Wh</td>
                      <td className="p-3">MZB120-L</td>
                      <td className="p-3">10.5 ± 0.2 kg</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-amber-700">BC13.12120.4S15A</td>
                      <td className="p-3">12.8V</td>
                      <td className="p-3">120Ah (C5)</td>
                      <td className="p-3 font-semibold">1 536 Wh</td>
                      <td className="p-3">MZB120-L</td>
                      <td className="p-3">13.5 ± 0.2 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                  <span className="font-bold text-emerald-900 block">Durabilité Extrême (&gt; 2500 cycles)</span>
                  <p className="text-emerald-800 leading-relaxed">
                    Contrairement aux batteries gel/plomb qui se dégradent en 18 mois sous le climat sahélien, la technologie LiFePO4 SunLumin conserve &gt;80% de sa capacité nominale après 7 à 10 années de cycles quotidiens.
                  </p>
                </div>

                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 space-y-1">
                  <span className="font-bold text-sky-900 block">Protection IP66 Aluminium 6063</span>
                  <p className="text-sky-800 leading-relaxed">
                    Boîtier extrudé étanche avec connecteurs étanches imperdables M16, résistant à l'atmosphère saline de Dakar et aux tempêtes de sable de l'intérieur du pays.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PANNEAUX SOLAIRES & MÂTS */}
          {activeCatalogTab === 'mats' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                  Modules Solaires Monocristallins & Mâts Galvanisés (Pages 12, 13, 18, 19)
                </h3>
                <p className="text-xs text-slate-500">
                  Modules de classe A à haut rendement et candélabres coniques en acier haute limite élastique Q235 / Q345.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Solar Panels Specs */}
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>Modules Solaires Monocristallins (18V)</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Verre trempé 3.2mm haute transmission (&gt;91%), cadre en aluminium anodisé 35mm résistant aux vents de 160 km/h et charges de neige/sable de 5400 Pa.
                  </p>
                  <ul className="space-y-1 text-slate-700 font-mono">
                    <li>• <strong>40W à 80Wc :</strong> Largeur 580mm, longueur 390 à 760mm</li>
                    <li>• <strong>100W à 150Wc :</strong> Largeur 580mm, longueur 980 à 1300mm</li>
                    <li>• Tension à vide Voc : <strong>21.6V</strong> · Courant max : <strong>jusqu'à 10.09A</strong></li>
                    <li>• Rendement cellules : <strong>&gt; 22.4%</strong> (Garantie de performance 25 ans)</li>
                  </ul>
                </div>

                {/* Light Poles Specs */}
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>Candélabres & Mâts en Acier Galvanisé Q235/Q345</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Galvanisation à chaud intérieure et extérieure selon norme ISO 1461. Finition thermolaquée RAL au choix des municipalités.
                  </p>
                  <ul className="space-y-1 text-slate-700 font-mono">
                    <li>• Hauteurs standards : <strong>3m, 4m, 6m, 7m, 8m, 9m, 10m, 12m</strong></li>
                    <li>• Configurations : <strong>Simple crosse (Single Arm) ou Double crosse</strong></li>
                    <li>• Cages d'ancrage : <strong>Tiges filetées J-bolts M12 à M24 avec gabarit</strong></li>
                    <li>• Options batterie : <strong>Tête de mât, suspension en console ou socle</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RÉFÉRENCES CHANTIERS INTERNATIONALES */}
          {activeCatalogTab === 'references' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                  Déploiements Réels & Références Internationales (Pages 20 & 21)
                </h3>
                <p className="text-xs text-slate-500">
                  Des milliers de candélabres SunLumin opérationnels en Afrique de l'Ouest, au Moyen-Orient et en Asie du Sud.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-amber-800 block text-sm">🇸🇳 Sénégal (Régions)</span>
                  <p className="text-slate-600">
                    Équipement de voiries à Thiès, Louga, Fatick, Mboro, Notto et Ziguinchor par DIARRA ENERGIE & BUSINESS.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-amber-800 block text-sm">🇲🇱 Mali (Split Solar)</span>
                  <p className="text-slate-600">
                    Installation de lampadaires solaires split à batterie suspendue pour la sécurisation de villages et axes routiers.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-amber-800 block text-sm">🇦🇪 Dubaï (Éolien & Solaire)</span>
                  <p className="text-slate-600">
                    Projet pilote hybride éolien-solaire pour zones côtières et pistes autoroutières à haute exigence lumineuse.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-amber-800 block text-sm">🇳🇬 Nigeria (Split Solar)</span>
                  <p className="text-slate-600">
                    Éclairage public solaire de zones industrielles et voies expresses avec optiques batwing anti-éblouissement.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-amber-800 block text-sm">🇧🇩 Bangladesh (Ports & Voies)</span>
                  <p className="text-slate-600">
                    Éclairage de zones portuaires et digues côtières résistantes à l'humidité saline et aux cyclones.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-amber-800 block text-sm">🇰🇼 Koweït (Boulevards Désertiques)</span>
                  <p className="text-slate-600">
                    Résistance éprouvée aux températures extrêmes (&gt;52°C) et aux tempêtes de sable sans perte de flux.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT BUREAU SÉNÉGAL */}
          {activeCatalogTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                  Coordonnées Officielles & Bureau de Représentation (Page 22)
                </h3>
                <p className="text-xs text-slate-500">
                  DIARRA ENERGIE & BUSINESS est le partenaire officiel pour la distribution, l'installation et la maintenance des systèmes SunLumin.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Bureau Sénégal & Afrique de l'Ouest</span>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <p>
                      <strong>Téléphone / WhatsApp :</strong>{' '}
                      <a href="tel:+221771149539" className="text-amber-300 font-mono font-bold hover:underline">
                        +221 77 114 95 39
                      </a>
                    </p>
                    <p>
                      <strong>Email Direct :</strong>{' '}
                      <a href="mailto:abdou@sunluminsolar.com" className="text-amber-300 font-mono hover:underline">
                        abdou@sunluminsolar.com
                      </a>
                    </p>
                    <p>
                      <strong>Partenaire Intégrateur :</strong> DIARRA ENERGIE & BUSINESS (Dakar, Thiès, Bénin, Togo)
                    </p>
                    <p>
                      <strong>Site Web Officiel :</strong>{' '}
                      <a href="https://www.sunluminsol.com" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline">
                        www.sunluminsolar.com
                      </a>
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://wa.me/221771149539?text=Bonjour,%20je%20contacte%20le%20Bureau%20S%C3%A9n%C3%A9gal%20concernant%20le%20catalogue%20SunLumin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Échanger directement sur WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Globe className="w-4 h-4 text-amber-600" />
                    <span>Siège International Constructeur</span>
                  </div>

                  <div className="space-y-2 text-slate-600">
                    <p><strong>Raison Sociale :</strong> SunLumin Solar Lighting Co., Limited</p>
                    <p><strong>Site Industriel :</strong> Building 5, Auto Parts Industrial Park, High-Tech Zone, Gaoyou City, Jiangsu Province, P.R. China</p>
                    <p><strong>Hotline Internationale :</strong> +86-18652788505</p>
                    <p><strong>Email Global :</strong> kathy@sunluminsolar.com</p>
                    <p><strong>Certifications d'usine :</strong> ISO 9001, CE, RoHS, CB, IEC 60598</p>
                  </div>

                  <button
                    onClick={handleRequestQuote}
                    className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Transmettre un cahier des charges de projet</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0 print:hidden">
          <span className="text-slate-500 text-center sm:text-left">
            Document technique certifié officiel · Compatible études photométriques Dialux
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={closeSunLuminModal}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={handleRequestQuote}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Demander une cotation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
