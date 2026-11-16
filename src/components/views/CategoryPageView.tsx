import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';
import { ProductCard } from '../common/ProductCard';
import {
  Sun,
  Lightbulb,
  Droplet,
  BatteryCharging,
  Cpu,
  Calculator,
  FileText,
  Filter,
  CheckCircle,
  HelpCircle,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Waves,
  Download,
  ShieldCheck,
  Send,
  Zap,
  Layers,
  Building2,
  Store,
  Home,
  ZoomIn,
  Maximize2,
  X
} from 'lucide-react';

export interface VillageBoreholeExample {
  nom: string;
  pays: string;
  region: string;
  usage: string;
  profondeur: number;
  niveauDyn: number;
  refoulement: number;
  distance: number;
  debitJour: number;
  tubage: string;
  typePompe: string;
}

export const VILLAGE_EXAMPLES: VillageBoreholeExample[] = [
  {
    nom: 'Village de Keur Momar Sarr (Louga, Sénégal)',
    pays: 'Sénégal',
    region: 'Louga (Bassin sahélien)',
    usage: 'Adduction d’Eau Potable villageoise (AEP) & Abreuvoir',
    profondeur: 85,
    niveauDyn: 55,
    refoulement: 15,
    distance: 120,
    debitJour: 60,
    tubage: '6" (150 mm)',
    typePompe: 'Pompe immergée inox 4.0kW (5.5HP)'
  },
  {
    nom: 'Village de Touba Toul (Thiès, Sénégal)',
    pays: 'Sénégal',
    region: 'Thiès (Bassin arachidier)',
    usage: 'Adduction d’Eau Potable villageoise (AEP)',
    profondeur: 65,
    niveauDyn: 40,
    refoulement: 12,
    distance: 90,
    debitJour: 45,
    tubage: '4" (100 mm)',
    typePompe: 'Pompe immergée inox 2.2kW (3HP)'
  },
  {
    nom: 'Périmètre Maraîcher de Mboro (Niayes, Sénégal)',
    pays: 'Sénégal',
    region: 'Thiès (Zone des Niayes)',
    usage: 'Maraîchage intensif & Goutte-à-goutte',
    profondeur: 30,
    niveauDyn: 18,
    refoulement: 6,
    distance: 250,
    debitJour: 80,
    tubage: '6" (150 mm)',
    typePompe: 'Station filtration & goutte-à-goutte 3.0kW'
  },
  {
    nom: 'Forage Pastoral de Dahra Djoloff (Ferlo, Sénégal)',
    pays: 'Sénégal',
    region: 'Louga (Zone sylvopastorale du Ferlo)',
    usage: 'Abreuvement bétail & Forage pastoral',
    profondeur: 120,
    niveauDyn: 80,
    refoulement: 10,
    distance: 150,
    debitJour: 70,
    tubage: '6" (150 mm)',
    typePompe: 'Pompe haute pression inox 316 4.0kW'
  },
  {
    nom: 'Commune de Fimela (Fatick / Sine-Saloum, Sénégal)',
    pays: 'Sénégal',
    region: 'Fatick (Sine-Saloum)',
    usage: 'Usage mixte eau potable & maraîchage villageois',
    profondeur: 50,
    niveauDyn: 32,
    refoulement: 12,
    distance: 100,
    debitJour: 35,
    tubage: '4" (100 mm)',
    typePompe: 'Pompe immergée inox 2.2kW'
  },
  {
    nom: 'Village d’Oussouye (Casamance, Sénégal)',
    pays: 'Sénégal',
    region: 'Ziguinchor (Basse-Casamance)',
    usage: 'Adduction d’Eau Potable villageoise (AEP)',
    profondeur: 40,
    niveauDyn: 22,
    refoulement: 10,
    distance: 60,
    debitJour: 30,
    tubage: '4" (100 mm)',
    typePompe: 'Pompe immergée 2.2kW'
  },
  {
    nom: 'Exploitation de Notto Diobass (Thiès, Sénégal)',
    pays: 'Sénégal',
    region: 'Thiès (Plateau de Thiès)',
    usage: 'Maraîchage & irrigation localisée',
    profondeur: 45,
    niveauDyn: 28,
    refoulement: 8,
    distance: 180,
    debitJour: 50,
    tubage: '4" (100 mm)',
    typePompe: 'Pompe de surface multi-étage 3.0kW'
  },
  {
    nom: 'Zone Rurale de Sikasso (Mali)',
    pays: 'Mali',
    region: 'Sikasso (Sud-Mali)',
    usage: 'Vergers arboricoles & Ferme intégrée',
    profondeur: 75,
    niveauDyn: 48,
    refoulement: 15,
    distance: 140,
    debitJour: 55,
    tubage: '6" (150 mm)',
    typePompe: 'Pompe immergée inox 4.0kW'
  },
  {
    nom: 'Village Sahélien de Tillabéri (Niger)',
    pays: 'Niger',
    region: 'Tillabéri (Fleuve Niger)',
    usage: 'Adduction d’Eau Potable villageoise (AEP)',
    profondeur: 90,
    niveauDyn: 65,
    refoulement: 12,
    distance: 110,
    debitJour: 40,
    tubage: '6" (150 mm)',
    typePompe: 'Pompe pour forage profond 5.5kW'
  },
  {
    nom: 'Commune de Koudougou (Burkina Faso)',
    pays: 'Burkina Faso',
    region: 'Centre-Ouest',
    usage: 'Adduction villageoise & Agriculture vivrière',
    profondeur: 60,
    niveauDyn: 38,
    refoulement: 10,
    distance: 80,
    debitJour: 35,
    tubage: '4" (100 mm)',
    typePompe: 'Pompe immergée solaire 2.2kW'
  },
  {
    nom: 'Ferme Agro-pastorale de Korhogo (Côte d’Ivoire)',
    pays: 'Côte d’Ivoire',
    region: 'Savanes (Nord)',
    usage: 'Exploitation agro-pastorale & Élevage',
    profondeur: 48,
    niveauDyn: 30,
    refoulement: 10,
    distance: 130,
    debitJour: 50,
    tubage: '4" (100 mm)',
    typePompe: 'Pompe multicellulaire 3.0kW'
  },
  {
    nom: 'Périmètre Vivrier de Malanville (Bénin)',
    pays: 'Bénin',
    region: 'Alibori (Nord-Bénin)',
    usage: 'Maraîchage intensif oignon & céréales',
    profondeur: 55,
    niveauDyn: 35,
    refoulement: 10,
    distance: 200,
    debitJour: 45,
    tubage: '4" (100 mm)',
    typePompe: 'Station de pompage & irrigation 3.0kW'
  }
];

interface CategoryConfig {
  titre: string;
  soustitre: string;
  description: string;
  icon: any;
  subcategories: string[];
}

const CATEGORY_CONFIGS: Record<ProductCategory, CategoryConfig> = {
  'eclairage-solaire': {
    titre: 'Éclairage Public Solaire',
    soustitre: 'Solutions d’éclairage autonome pour voiries urbaines, autoroutes et zones rurales',
    description: 'DIARRA ENERGIE & BUSINESS fournit des lampadaires solaires monoblocs All-in-One, des candélabres solaires Split à panneau séparé, des solutions d’éclairage autoroutier, villageois et industriel, ainsi que des mâts galvanisés et des prestations complètes de pose et maintenance.',
    icon: Sun,
    subcategories: [
      'Tous',
      'Lampadaires solaires intégrés',
      'Lampadaires solaires à panneau séparé',
      'Lampadaires pour routes et autoroutes',
      'Lampadaires pour rues, villages et collectivités',
      'Solutions d’éclairage de parkings et d’espaces industriels',
      'Mâts, supports et accessoires',
      'Prestations de fourniture, de pose et de maintenance'
    ]
  },
  'eclairage-electrique': {
    titre: 'Éclairage Public Électrique & LED',
    soustitre: 'Équipements et infrastructures certifiés raccordés au réseau conventionnel (Senelec, SBEE, CEET, EDM)',
    description: 'Catalogue complet d’éclairage public et industriel raccordé au réseau électrique conventionnel : candélabres urbains complets, luminaires LED haute performance (160 lm/W), projecteurs industriels lourds, mâts octogonaux galvanisés à chaud, armoires de commande crépusculaires et astronomiques, câblerie armée et prestations certifiées de pose et de raccordement.',
    icon: Lightbulb,
    subcategories: [
      'Tous',
      'Les lampadaires électriques',
      'Les luminaires LED pour routes et rues',
      'Les projecteurs LED extérieurs et industriels',
      'Les mâts et accessoires',
      'Les armoires électriques et dispositifs de commande',
      'Les câbles et accessoires de raccordement',
      'Les prestations d’installation, de raccordement et de maintenance'
    ]
  },
  'pompage-solaire': {
    titre: 'Pompes Solaires & Systèmes de Forages',
    soustitre: 'Équipements certifiés de pompage au fil du soleil pour forages profonds, adduction villageoise et irrigation',
    description: 'Catalogue complet de solutions hydrauliques solaires pour l’Afrique : pompes solaires immergées tout inox 304/316, pompes solaires de surface, systèmes clé en main pour forages ruraux, équipements d’irrigation goutte-à-goutte et aspersion, adductions d’eau potable (AEP) pour villages et exploitations, ainsi que variateurs solaires MPPT et accessoires de protection.',
    icon: Droplet,
    subcategories: [
      'Tous',
      'Les pompes solaires immergées',
      'Les pompes solaires de surface',
      'Les systèmes de pompage pour forages',
      'Les équipements d’irrigation agricole',
      'Les systèmes d’alimentation en eau pour villages et exploitations',
      'Les contrôleurs, onduleurs et accessoires de pompage'
    ]
  },
  'kits-solaires': {
    titre: 'Kits Solaires & Systèmes de Stockage',
    soustitre: 'Solutions complètes d’autonomie électrique pour résidences, commerces, entreprises et sites isolés',
    description: 'Le catalogue officiel DIARRA ENERGIE & BUSINESS d’énergie solaire et de stockage : kits solaires domestiques, systèmes hybrides pour maisons et villas, solutions pour boutiques et bureaux, installations d’envergure pour entreprises, packs avec batteries de stockage, panneaux photovoltaïques haute efficacité, batteries Lithium LiFePO4, onduleurs hybrides MPPT, régulateurs de charge solaires et câbles/protections conformes.',
    icon: BatteryCharging,
    subcategories: [
      'Tous',
      'Les kits solaires domestiques',
      'Les systèmes pour maisons et villas',
      'Les solutions pour boutiques et bureaux',
      'Les installations pour entreprises',
      'Les kits avec batteries de stockage',
      'Les panneaux photovoltaïques',
      'Les batteries',
      'Les onduleurs',
      'Les régulateurs de charge',
      'Les câbles, protections et accessoires'
    ]
  },
  'composants-solaires': {
    titre: 'Panneaux, Batteries, Onduleurs & Accessoires',
    soustitre: 'Composants solaires photovoltaïques, stockage LiFePO4, onduleurs hybrides et accessoires certifiés',
    description: 'Le catalogue officiel DIARRA ENERGIE & BUSINESS des composants et matériels solaires pour installateurs, techniciens, entreprises et particuliers : panneaux photovoltaïques Tier-1 mono et bi-faciaux, parcs de batteries Lithium LiFePO4 48V, onduleurs hybrides MPPT pur sinus, coffrets de protection parafoudres DC/AC, câblerie certifiée et schémas d’ingénierie conformes.',
    icon: Cpu,
    subcategories: [
      'Tous',
      'Schémas & Architecture Système',
      'Panneaux photovoltaïques',
      'Batteries solaires',
      'Onduleurs hybrides',
      'Régulateurs MPPT',
      'Accessoires & Câblage'
    ]
  }
};

export const CategoryPageView: React.FC<{ categoryKey: ProductCategory }> = ({ categoryKey }) => {
  const { products, setActiveTab, showToast, formatPrice } = useApp();
  const config = CATEGORY_CONFIGS[categoryKey];
  const Icon = config.icon;

  const [activeSubcat, setActiveSubcat] = useState<string>('Tous');

  useEffect(() => {
    setActiveSubcat('Tous');
  }, [categoryKey]);

  const selectSubcatAndScroll = (subcat: string) => {
    setActiveSubcat(subcat);
    const gridEl = document.getElementById('category-products-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Modal Lightbox pour zoom haute résolution des schémas et images
  const [selectedImageModal, setSelectedImageModal] = useState<{
    src: string;
    title: string;
    subtitle: string;
    description: string;
    badges: string[];
  } | null>(null);

  // Formulaire d'Étude & Dimensionnement Hydraulique de Forage
  const [selectedVillageExample, setSelectedVillageExample] = useState<string>('Village de Keur Momar Sarr (Louga, Sénégal)');
  const [paysProjet, setPaysProjet] = useState<string>('Sénégal');
  const [nomLocalite, setNomLocalite] = useState<string>('Keur Momar Sarr');
  const [regionProjet, setRegionProjet] = useState<string>('Région de Louga');
  const [usageEau, setUsageEau] = useState<string>('Adduction d’Eau Potable villageoise (AEP) & Abreuvoir');
  
  // Paramètres Forage
  const [profondeurForage, setProfondeurForage] = useState<number>(85); // m
  const [niveauDynamique, setNiveauDynamique] = useState<number>(55); // m
  const [diametreTubage, setDiametreTubage] = useState<string>('6" (150 mm)');
  const [debitExploitableForage, setDebitExploitableForage] = useState<number>(25); // m3/h max

  // Paramètres Refoulement & Réseau
  const [hauteurRefoulement, setHauteurRefoulement] = useState<number>(15); // m vers château d'eau
  const [distanceRefoulement, setDistanceRefoulement] = useState<number>(120); // mètres linéaires
  const [debitJournalier, setDebitJournalier] = useState<number>(60); // m3/jour souhaité
  const [typeCanalisation, setTypeCanalisation] = useState<string>('PEHD PN16 Ø63mm');

  // Résultats dimensionnement calculés
  const [calculatedHmt, setCalculatedHmt] = useState<number>(79.5); // (55 + 15) * 1.1 + pertes dist
  const [calculatedDebitHoraire, setCalculatedDebitHoraire] = useState<number>(10.9); // m3/h pour 5.5h soleil
  const [pumpKwEstime, setPumpKwEstime] = useState<number>(3.8); // kW
  const [pumpHpEstime, setPumpHpEstime] = useState<number>(5.2); // HP
  const [pvWcEstime, setPvWcEstime] = useState<number>(5100); // Wc
  const [nbPanneauxEstime, setNbPanneauxEstime] = useState<number>(10);
  const [onduleurRecommande, setOnduleurRecommande] = useState<string>('Variateur MPPT 4.0kW / 5.5HP Triphasé IP65');
  const [modelePompeRecommande, setModelePompeRecommande] = useState<string>('DEB-PUMP-SUB-5.5HP Inox 316 (HMT 190m)');
  const [etudeTransmise, setEtudeTransmise] = useState<boolean>(false);

  // État Configurateur Kits Solaires & Stockage
  const [kitProfil, setKitProfil] = useState<string>('villa');
  const [kitConsoKwhJour, setKitConsoKwhJour] = useState<number>(18);
  const [kitPuissancePointeKw, setKitPuissancePointeKw] = useState<number>(5.0);
  const [kitAutonomieHeures, setKitAutonomieHeures] = useState<number>(18);
  const [kitTensionBatterie, setKitTensionBatterie] = useState<string>('48V (51.2V DC)');
  const [kitPays, setKitPays] = useState<string>('Sénégal');
  const [kitTypePose, setKitTypePose] = useState<string>('Toiture terrasse dalle béton');
  const [kitProjetTransmis, setKitProjetTransmis] = useState<boolean>(false);

  const [kitPvWcCalcule, setKitPvWcCalcule] = useState<number>(5500);
  const [kitNbPanneauxCalcule, setKitNbPanneauxCalcule] = useState<number>(10);
  const [kitOnduleurKvaCalcule, setKitOnduleurKvaCalcule] = useState<number>(5.0);
  const [kitBatterieKwhCalcule, setKitBatterieKwhCalcule] = useState<number>(10.24);
  const [kitModeleSuggere, setKitModeleSuggere] = useState<string>('DEB-KIT-VILLA-5KW (5kVA / 10.24kWh LiFePO4)');

  const recalculerKit = (conso: number, pointe: number, autonomie: number, profilName?: string) => {
    const pvWc = Math.round((conso / 5.0) * 1.30 * 1000 / 100) * 100;
    const nbPanneaux = Math.max(2, Math.ceil(pvWc / 550));
    const effectivePvWc = nbPanneaux * 550;
    const invKw = Math.max(1.0, Math.round(pointe * 1.2 * 10) / 10);
    const consoNuit = conso * (autonomie / 24);
    const battKwh = Math.round((consoNuit / 0.85) * 10) / 10;

    setKitConsoKwhJour(conso);
    setKitPuissancePointeKw(pointe);
    setKitAutonomieHeures(autonomie);
    setKitPvWcCalcule(effectivePvWc);
    setKitNbPanneauxCalcule(nbPanneaux);
    setKitOnduleurKvaCalcule(invKw);
    setKitBatterieKwhCalcule(battKwh);

    if (invKw <= 1.8) {
      setKitTensionBatterie('24V DC');
      setKitModeleSuggere('Kit Solaire Domestique Autonome Confort 1.5kVA / 2.5kWh');
    } else if (invKw <= 3.8) {
      setKitTensionBatterie('48V (51.2V DC)');
      setKitModeleSuggere('Solution Anti-Coupure Boutiques & Commerces 3kVA / 5.12kWh LiFePO4');
    } else if (invKw <= 6.5) {
      setKitTensionBatterie('48V (51.2V DC)');
      setKitModeleSuggere('Système Solaire Hybride Villa Familiale 5kVA / 10.24kWh LiFePO4');
    } else if (invKw <= 12) {
      setKitTensionBatterie('48V / 51.2V DC (Banc 20.48kWh)');
      setKitModeleSuggere('Système Solaire Hybride Prestige Grande Villa 10kVA / 20.48kWh LiFePO4');
    } else {
      setKitTensionBatterie('Banc Haute Tension 200V-400V DC ou Triphasé');
      setKitModeleSuggere('Centrale Solaire Hybride Triphasée Entreprises & PME 15kVA / 20.48kWh');
    }

    if (profilName) {
      showToast(`Configuration ${profilName} appliquée : Onduleur ${invKw}kW · Batterie ${battKwh}kWh`);
    }
  };

  const appliquerProfilKit = (type: string) => {
    setKitProfil(type);
    if (type === 'domestique') {
      recalculerKit(4.5, 1.2, 14, 'Studio / Maisonnette / Petite Boutique');
    } else if (type === 'villa') {
      recalculerKit(18, 5.0, 18, 'Villa Familiale Confort');
    } else if (type === 'boutique') {
      recalculerKit(12, 3.0, 16, 'Commerce & Pharmacie');
    } else if (type === 'bureau') {
      recalculerKit(22, 6.0, 18, 'Bureaux & Cabinets Professionnels');
    } else if (type === 'entreprise') {
      recalculerKit(60, 15.0, 16, 'Entreprise, Clinique & PME Industrielle');
    }
  };

  const transmettreKitDevis = () => {
    setKitProjetTransmis(true);
    showToast(`Configuration Solaire ${kitModeleSuggere} enregistrée ! Redirection vers la demande de devis...`);
    setTimeout(() => {
      setActiveTab('devis');
    }, 900);
  };

  const calculatePumpSpecs = () => {
    // Hauteur géométrique = niveau dynamique + hauteur château d'eau
    const hGeo = niveauDynamique + hauteurRefoulement;
    // Pertes de charge régulières et singulières (estimées à 10% de la Hgeo + 0.02 bar / 100m distance)
    const pertesLigne = (distanceRefoulement / 100) * 2;
    const hmt = (hGeo * 1.1) + pertesLigne;

    // Débit horaire basé sur 5.5 heures crêtes d'ensoleillement sahélien
    const qHoraire = debitJournalier / 5.5;

    // Énergie hydraulique : P_hyd = (rho * g * Q * HMT) / 3600
    // Rendement groupe moto-pompe submersible ~ 0.52
    const pMoteurKw = (qHoraire * hmt * 9.81) / (3600 * 0.52);
    const pHp = pMoteurKw * 1.36;

    // Surdimensionnement champ PV (+32% pour compenser chaleur Sahel et pertes câblage)
    const pPvWc = pMoteurKw * 1000 * 1.35;
    const nbPanneaux = Math.ceil(pPvWc / 550);

    const roundedHmt = Math.round(hmt * 10) / 10;
    const roundedQ = Math.round(qHoraire * 10) / 10;
    const roundedKw = Math.round(pMoteurKw * 10) / 10;
    const roundedHp = Math.round(pHp * 10) / 10;
    const roundedWc = Math.round(pPvWc / 100) * 100;

    setCalculatedHmt(roundedHmt);
    setCalculatedDebitHoraire(roundedQ);
    setPumpKwEstime(roundedKw);
    setPumpHpEstime(roundedHp);
    setPvWcEstime(roundedWc);
    setNbPanneauxEstime(nbPanneaux);

    // Recommandation intelligente de produit catalogue
    if (roundedKw <= 1.5) {
      setOnduleurRecommande('Variateur MPPT 2.2kW Triphasé IP65 avec sonde de niveau');
      setModelePompeRecommande('DEB-PUMP-SUB-3HP Inox 304 (2.2kW HMT 120m)');
    } else if (roundedKw <= 3.2) {
      setOnduleurRecommande('Variateur MPPT 4.0kW Triphasé IP65 écran LCD');
      setModelePompeRecommande('DEB-PUMP-SUB-3HP ou Surface Multi-étage 3kW');
    } else if (roundedKw <= 5.8) {
      setOnduleurRecommande('Variateur MPPT 5.5kW / 7.5HP Triphasé avec entrée hybride');
      setModelePompeRecommande('DEB-PUMP-SUB-5.5HP Inox 316 Haute Pression (HMT 190m)');
    } else {
      setOnduleurRecommande('Centrale Variateur MPPT Hybride 11kW avec automate GSM');
      setModelePompeRecommande('DEB-SYS-FORAGE-11KW Station Grande Capacité');
    }

    showToast(`Dimensionnement actualisé : HMT ${roundedHmt}m · Puissance ${roundedKw}kW (${roundedHp}HP)`);
  };

  const applyVillageExample = (example: VillageBoreholeExample) => {
    setSelectedVillageExample(example.nom);
    setPaysProjet(example.pays);
    setRegionProjet(example.region);
    setNomLocalite(example.nom);
    setUsageEau(example.usage);
    setProfondeurForage(example.profondeur);
    setNiveauDynamique(example.niveauDyn);
    setHauteurRefoulement(example.refoulement);
    setDistanceRefoulement(example.distance);
    setDebitJournalier(example.debitJour);
    setDiametreTubage(example.tubage);

    // Calcul immédiat
    const hGeo = example.niveauDyn + example.refoulement;
    const pertesLigne = (example.distance / 100) * 2;
    const hmt = (hGeo * 1.1) + pertesLigne;
    const qHoraire = example.debitJour / 5.5;
    const pMoteurKw = (qHoraire * hmt * 9.81) / (3600 * 0.52);
    const pPvWc = pMoteurKw * 1000 * 1.35;
    const nbPanneaux = Math.ceil(pPvWc / 550);

    const roundedHmt = Math.round(hmt * 10) / 10;
    const roundedQ = Math.round(qHoraire * 10) / 10;
    const roundedKw = Math.round(pMoteurKw * 10) / 10;
    const roundedHp = Math.round(pMoteurKw * 1.36 * 10) / 10;
    const roundedWc = Math.round(pPvWc / 100) * 100;

    setCalculatedHmt(roundedHmt);
    setCalculatedDebitHoraire(roundedQ);
    setPumpKwEstime(roundedKw);
    setPumpHpEstime(roundedHp);
    setPvWcEstime(roundedWc);
    setNbPanneauxEstime(nbPanneaux);

    if (roundedKw <= 1.5) {
      setOnduleurRecommande('Variateur MPPT 2.2kW Triphasé IP65 avec sonde de niveau');
      setModelePompeRecommande('DEB-PUMP-SUB-3HP Inox 304 (2.2kW HMT 120m)');
    } else if (roundedKw <= 3.2) {
      setOnduleurRecommande('Variateur MPPT 4.0kW Triphasé IP65 écran LCD');
      setModelePompeRecommande('DEB-PUMP-SUB-3HP ou Surface Multi-étage 3kW');
    } else if (roundedKw <= 5.8) {
      setOnduleurRecommande('Variateur MPPT 5.5kW / 7.5HP Triphasé avec entrée hybride');
      setModelePompeRecommande('DEB-PUMP-SUB-5.5HP Inox 316 Haute Pression (HMT 190m)');
    } else {
      setOnduleurRecommande('Centrale Variateur MPPT Hybride 11kW avec automate GSM');
      setModelePompeRecommande('DEB-SYS-FORAGE-11KW Station Grande Capacité');
    }

    showToast(`Exemple appliqué : ${example.nom}`);
  };

  const transmettreEtudeDevis = () => {
    setEtudeTransmise(true);
    showToast(`Étude technique du forage ${nomLocalite} enregistrée ! Redirection vers la demande de devis...`);
    setTimeout(() => {
      setActiveTab('devis');
    }, 900);
  };

  const isComposantsSolaires = categoryKey === 'composants-solaires';
  const componentSubcategories = [
    'Les panneaux photovoltaïques',
    'Les batteries',
    'Les onduleurs',
    'Les régulateurs de charge',
    'Les câbles, protections et accessoires',
    'Schémas & Architecture Système'
  ];

  const filteredProducts = products.filter((p) => {
    if (isComposantsSolaires) {
      const isComposant =
        p.categorie === 'composants-solaires' ||
        (p.categorie === 'kits-solaires' && componentSubcategories.includes(p.sousCategorie)) ||
        p.id.startsWith('deb-schema-');
      if (!isComposant) return false;
    } else {
      if (p.categorie !== categoryKey) return false;
    }
    if (activeSubcat !== 'Tous') {
      const matchSubcat = p.sousCategorie === activeSubcat;
      const matchApp = p.applications?.some(
        (app) =>
          app.toLowerCase().includes(activeSubcat.toLowerCase()) ||
          activeSubcat.toLowerCase().includes(app.toLowerCase())
      );
      const subLower = activeSubcat.toLowerCase();
      const matchAlias =
        // Composants Solaires subcategories aliases
        (subLower.includes('schéma') && (p.sousCategorie.toLowerCase().includes('schéma') || p.id.startsWith('deb-schema-') || p.nom.toLowerCase().includes('schéma') || p.nom.toLowerCase().includes('câblage'))) ||
        (subLower.includes('panneaux photovoltaïques') && (p.sousCategorie.toLowerCase().includes('panneaux') || p.nom.toLowerCase().includes('panneau'))) ||
        (subLower.includes('batteries solaires') && (p.sousCategorie.toLowerCase().includes('batterie') || p.nom.toLowerCase().includes('batterie'))) ||
        (subLower.includes('onduleurs hybrides') && (p.sousCategorie.toLowerCase().includes('onduleur') || p.nom.toLowerCase().includes('onduleur'))) ||
        (subLower.includes('régulateurs mppt') && (p.sousCategorie.toLowerCase().includes('régulateur') || p.nom.toLowerCase().includes('régulateur'))) ||
        (subLower.includes('accessoires & câblage') && (p.sousCategorie.toLowerCase().includes('câble') || p.sousCategorie.toLowerCase().includes('protection') || p.nom.toLowerCase().includes('câble') || p.nom.toLowerCase().includes('coffret') || p.nom.toLowerCase().includes('accessoire'))) ||
        // Éclairage Solaire aliases
        (subLower.includes('intégré') && (p.sousCategorie.toLowerCase().includes('intégré') || p.nom.toLowerCase().includes('all-in-one') || p.nom.toLowerCase().includes('intégré'))) ||
        (subLower.includes('séparé') && (p.sousCategorie.toLowerCase().includes('séparé') || p.nom.toLowerCase().includes('split') || p.nom.toLowerCase().includes('séparé') || p.nom.toLowerCase().includes('all-in-two'))) ||
        // Éclairage Électrique & LED 7 subcategories aliases
        (subLower.includes('lampadaire') && (p.sousCategorie.toLowerCase().includes('lampadaire') || p.nom.toLowerCase().includes('candélabre') || p.nom.toLowerCase().includes('lampadaire'))) ||
        (subLower.includes('luminaire') && (p.sousCategorie.toLowerCase().includes('luminaire') || p.nom.toLowerCase().includes('luminaire') || p.nom.toLowerCase().includes('voirie'))) ||
        (subLower.includes('projecteur') && (p.sousCategorie.toLowerCase().includes('projecteur') || p.nom.toLowerCase().includes('projecteur') || p.nom.toLowerCase().includes('stade'))) ||
        (subLower.includes('mât') && (p.sousCategorie.toLowerCase().includes('mât') || p.nom.toLowerCase().includes('mât') || p.nom.toLowerCase().includes('candélabre') || p.nom.toLowerCase().includes('crosse'))) ||
        (subLower.includes('armoire') && (p.sousCategorie.toLowerCase().includes('armoire') || p.nom.toLowerCase().includes('armoire') || p.nom.toLowerCase().includes('cellule') || p.nom.toLowerCase().includes('crépusculaire'))) ||
        (subLower.includes('câble') && (p.sousCategorie.toLowerCase().includes('câble') || p.nom.toLowerCase().includes('câble') || p.nom.toLowerCase().includes('coffret') || p.nom.toLowerCase().includes('dérivation') || p.nom.toLowerCase().includes('raccordement'))) ||
        (subLower.includes('prestation') && (p.sousCategorie.toLowerCase().includes('prestation') || p.nom.toLowerCase().includes('prestation') || p.nom.toLowerCase().includes('pose') || p.nom.toLowerCase().includes('maintenance'))) ||
        // Pompes et Forages 6 subcategories aliases
        (subLower.includes('immergée') && (p.sousCategorie.toLowerCase().includes('immergée') || p.nom.toLowerCase().includes('immergé') || p.nom.toLowerCase().includes('submersible'))) ||
        (subLower.includes('surface') && (p.sousCategorie.toLowerCase().includes('surface') || p.nom.toLowerCase().includes('surface') || p.nom.toLowerCase().includes('centrifuge') || p.nom.toLowerCase().includes('multi-étage'))) ||
        (subLower.includes('systèmes de pompage') && (p.sousCategorie.toLowerCase().includes('systèmes de pompage') || p.nom.toLowerCase().includes('forage') || p.nom.toLowerCase().includes('station'))) ||
        (subLower.includes('irrigation') && (p.sousCategorie.toLowerCase().includes('irrigation') || p.nom.toLowerCase().includes('irrigation') || p.nom.toLowerCase().includes('goutte') || p.nom.toLowerCase().includes('aspersion'))) ||
        (subLower.includes('alimentation en eau') && (p.sousCategorie.toLowerCase().includes('alimentation en eau') || p.nom.toLowerCase().includes('aep') || p.nom.toLowerCase().includes('village') || p.nom.toLowerCase().includes('château') || p.nom.toLowerCase().includes('bovins'))) ||
        (subLower.includes('contrôleur') && (p.sousCategorie.toLowerCase().includes('contrôleur') || p.nom.toLowerCase().includes('variateur') || p.nom.toLowerCase().includes('onduleur') || p.nom.toLowerCase().includes('accessoire') || p.nom.toLowerCase().includes('kit complet'))) ||
        // Kits & Stockage 10 subcategories aliases
        (subLower.includes('domestique') && (p.sousCategorie.toLowerCase().includes('domestique') || p.nom.toLowerCase().includes('domestique') || p.nom.toLowerCase().includes('confort') || p.nom.toLowerCase().includes('1.5kva'))) ||
        (subLower.includes('maisons et villas') && (p.sousCategorie.toLowerCase().includes('maisons et villas') || p.nom.toLowerCase().includes('villa') || p.sousCategorie.toLowerCase().includes('villa'))) ||
        (subLower.includes('boutiques et bureaux') && (p.sousCategorie.toLowerCase().includes('boutiques et bureaux') || p.nom.toLowerCase().includes('boutique') || p.nom.toLowerCase().includes('bureau') || p.nom.toLowerCase().includes('commerce'))) ||
        (subLower.includes('entreprises') && (p.sousCategorie.toLowerCase().includes('entreprises') || p.nom.toLowerCase().includes('entreprise') || p.nom.toLowerCase().includes('pme') || p.nom.toLowerCase().includes('industriel'))) ||
        (subLower.includes('batteries de stockage') && (p.sousCategorie.toLowerCase().includes('batteries de stockage') || p.nom.toLowerCase().includes('stockage') || p.nom.toLowerCase().includes('pack stockage'))) ||
        (subLower.includes('panneaux') && (p.sousCategorie.toLowerCase().includes('panneaux') || p.nom.toLowerCase().includes('panneau') || p.nom.toLowerCase().includes('photovoltaïque') || p.nom.toLowerCase().includes('module'))) ||
        (subLower.includes('batteries') && !subLower.includes('kits') && (p.sousCategorie.toLowerCase().includes('batteries') || p.nom.toLowerCase().includes('batterie') || p.nom.toLowerCase().includes('lifepo4'))) ||
        (subLower.includes('onduleurs') && (p.sousCategorie.toLowerCase().includes('onduleurs') || p.nom.toLowerCase().includes('onduleur') || p.nom.toLowerCase().includes('inverter'))) ||
        (subLower.includes('régulateurs') && (p.sousCategorie.toLowerCase().includes('régulateurs') || p.nom.toLowerCase().includes('régulateur') || p.nom.toLowerCase().includes('mppt'))) ||
        ((subLower.includes('câbles') || subLower.includes('protections')) && (p.sousCategorie.toLowerCase().includes('câbles') || p.nom.toLowerCase().includes('câble') || p.nom.toLowerCase().includes('coffret') || p.nom.toLowerCase().includes('protection') || p.nom.toLowerCase().includes('accessoire')));

      if (!matchSubcat && !matchApp && !matchAlias) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Category Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Icon className="w-4 h-4" />
            <span className="uppercase tracking-wider">Catalogue DIARRA ENERGIE & BUSINESS</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            {config.titre}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {config.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('devis')}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Demander un devis sur cette gamme</span>
            </button>
          </div>
        </div>
      </div>

      {/* SPECIAL INTERACTIVE TOOL FOR PUMPS: Formulaire d'Étude & Dimensionnement Hydraulique de Forage */}
      {categoryKey === 'pompage-solaire' && (
        <section className="bg-gradient-to-b from-sky-50/90 via-sky-50/50 to-white border-2 border-sky-300 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-sky-200 pb-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-sky-600" />
                <span>Formulaire d’Étude Technique & Dimensionnement de Forage</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
                Étude Personnalisée de Forage, Débit & Hauteur Manométrique Totale (HMT)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                Renseignez les données techniques de votre forage pour obtenir instantanément le pré-dimensionnement hydraulique de la pompe, la puissance du générateur photovoltaïque compatible et l'onduleur variateur MPPT recommandé.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono font-bold bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Conforme Normes AEP & Sahel</span>
              </span>
            </div>
          </div>

          {/* Quick Village Preset Selector (Senegal & Sub-Region) */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-sky-200/80 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Exemples types de forages au Sénégal et dans la sous-région (Cliquez pour charger) :</span>
              </div>
              <span className="text-[11px] text-slate-500 italic">
                Données réelles mesurées sur site
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {VILLAGE_EXAMPLES.map((ex) => (
                <button
                  key={ex.nom}
                  onClick={() => applyVillageExample(ex)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 ${
                    selectedVillageExample === ex.nom
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-sky-50 text-slate-700 border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <span>📍</span>
                  <span>{ex.nom}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Grid with 4 Main Logical Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne 1 : Données Forage & Localisation */}
            <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-bold">1</span>
                <span>Localisation du Projet & Usage de l'Eau</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Pays du projet
                  </label>
                  <select
                    value={paysProjet}
                    onChange={(e) => setPaysProjet(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  >
                    <option value="Sénégal">Sénégal</option>
                    <option value="Mali">Mali</option>
                    <option value="Niger">Niger</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                    <option value="Bénin">Bénin</option>
                    <option value="Togo">Togo</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Nom du village ou commune
                  </label>
                  <input
                    type="text"
                    value={nomLocalite}
                    onChange={(e) => setNomLocalite(e.target.value)}
                    placeholder="Ex: Keur Momar Sarr, Touba Toul..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Usage principal de l'eau
                  </label>
                  <select
                    value={usageEau}
                    onChange={(e) => setUsageEau(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  >
                    <option value="Adduction d’Eau Potable villageoise (AEP) & Abreuvoir">
                      Adduction d’Eau Potable villageoise (AEP) & Bornes fontaines
                    </option>
                    <option value="Maraîchage intensif & Goutte-à-goutte">
                      Maraîchage intensif & Irrigation goutte-à-goutte
                    </option>
                    <option value="Abreuvement bétail & Forage pastoral">
                      Abreuvement du cheptel / Forage pastoral (bovins, ovins)
                    </option>
                    <option value="Exploitation agro-pastorale & Élevage">
                      Exploitation agricole commerciale & Arboriculture
                    </option>
                    <option value="Usage mixte eau potable & maraîchage villageois">
                      Usage mixte (Village + Maraîchage + Bétail)
                    </option>
                  </select>
                </div>
              </div>

              {/* Sous-section Forage */}
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3 pt-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-bold">2</span>
                <span>Caractéristiques Hydrogéologiques du Forage</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Profondeur totale du forage (m)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={profondeurForage}
                    onChange={(e) => setProfondeurForage(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 block">Ex: 40m (Casamance) à 140m (Ferlo)</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Niveau dynamique de la nappe (m)
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="250"
                    value={niveauDynamique}
                    onChange={(e) => setNiveauDynamique(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 block">Profondeur d'eau en cours de pompage</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Diamètre du tubage forage
                  </label>
                  <select
                    value={diametreTubage}
                    onChange={(e) => setDiametreTubage(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                  >
                    <option value='4" (100 mm)'>4 pouces (DN 100 mm)</option>
                    <option value='5" (125 mm)'>5 pouces (DN 125 mm)</option>
                    <option value='6" (150 mm)'>6 pouces (DN 150 mm)</option>
                    <option value='8" (200 mm)'>8 pouces (DN 200 mm)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Débit d'exploitation max du forage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={debitExploitableForage}
                      onChange={(e) => setDebitExploitableForage(Number(e.target.value))}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">m³/h</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Selon rapport d'essai de pompage</span>
                </div>
              </div>
            </div>

            {/* Colonne 2 : Débit Souhaité, Refoulement & Réseau */}
            <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-bold">3</span>
                <span>Besoins en Eau & Infrastructures de Refoulement</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Volume d'eau journalier souhaité
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="5"
                      max="600"
                      value={debitJournalier}
                      onChange={(e) => setDebitJournalier(Number(e.target.value))}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono font-bold text-sky-900"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">m³/jour</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Ex: 30m³ (petit village), 80m³ (maraîchage)</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Hauteur sol du réservoir / château d'eau
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={hauteurRefoulement}
                      onChange={(e) => setHauteurRefoulement(Number(e.target.value))}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">m</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">0m si bassin au sol, 10-15m si château d'eau</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Distance horizontale de refoulement
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="5"
                      max="3000"
                      value={distanceRefoulement}
                      onChange={(e) => setDistanceRefoulement(Number(e.target.value))}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">mètres</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Longueur de canalisation jusqu'au réservoir</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Type de tuyau de refoulement
                  </label>
                  <select
                    value={typeCanalisation}
                    onChange={(e) => setTypeCanalisation(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                  >
                    <option value="PEHD PN16 Ø63mm">PEHD PN16 Ø63 mm (2")</option>
                    <option value="PEHD PN16 Ø75mm">PEHD PN16 Ø75 mm (2"1/2)</option>
                    <option value="PEHD PN16 Ø90mm">PEHD PN16 Ø90 mm (3")</option>
                    <option value="Acier Galvanisé DN80">Acier Galvanisé fileté DN80</option>
                  </select>
                </div>
              </div>

              {/* Bouton de recalcul */}
              <div className="pt-2">
                <button
                  onClick={calculatePumpSpecs}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>Calculer & Valider le Pré-Dimensionnement</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Results Display Card */}
          <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Synthèse Technique du Dimensionnement (Sahel & Ouest Africain)
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  Résultats pour : {nomLocalite} ({paysProjet})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono font-semibold">
                  ✓ Faisabilité Technique Confirmée
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">HMT Totale :</span>
                <strong className="text-amber-400 font-mono text-base block">{calculatedHmt} m</strong>
                <span className="text-[10px] text-slate-500">Pertes de charge incl.</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Débit Horaire :</span>
                <strong className="text-white font-mono text-base block">{calculatedDebitHoraire} m³/h</strong>
                <span className="text-[10px] text-slate-500">Sur 5.5h crête/jour</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Puissance Moteur :</span>
                <strong className="text-emerald-400 font-mono text-base block">
                  {pumpKwEstime} kW ({pumpHpEstime} HP)
                </strong>
                <span className="text-[10px] text-slate-500">Moteur submersible IE3</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Champ PV Solaire :</span>
                <strong className="text-amber-400 font-mono text-base block">{pvWcEstime} Wc</strong>
                <span className="text-[10px] text-slate-500">Surdimensionné +35%</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Modules 550Wc :</span>
                <strong className="text-white font-mono text-base block">{nbPanneauxEstime} panneaux</strong>
                <span className="text-[10px] text-slate-500">Monocristallin Half-Cell</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Régulation :</span>
                <strong className="text-sky-400 font-mono text-xs block">Onduleur MPPT IP65</strong>
                <span className="text-[10px] text-slate-500">Avec arrêt niveau cuve</span>
              </div>
            </div>

            {/* Matériel Préconisé & Recommandation */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
              <div className="space-y-1 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">Équipement DIARRA ENERGIE recommandé :</span>
                  <span className="font-semibold text-white font-mono">{modelePompeRecommande}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Variateur préconisé : <span className="text-slate-200">{onduleurRecommande}</span> · Matériau : Inox 304/316 qualité alimentaire · Sondes manque d'eau incluses.
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={transmettreEtudeDevis}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmettre cette étude au Devis</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SPECIAL INTERACTIVE OVERVIEW FOR POMPES SOLAIRES & FORAGES (6 Piliers) */}
      {categoryKey === 'pompage-solaire' && (
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
                <Droplet className="w-4 h-4" />
                <span>Gamme Complète Pompage & Forages Ruraux (Sénégal & Sous-Région)</span>
              </div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Les 6 Piliers des Solutions de Pompage & Forages DIARRA ENERGIE
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Toutes nos fiches techniques précisent le débit, la HMT, la puissance moteur, la tension, la profondeur et le champ photovoltaïque compatible.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono bg-sky-400/10 text-sky-300 border border-sky-400/30 px-3 py-1.5 rounded-xl font-bold">
                100% Inox · Garanti 3 Ans
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-sky-400 font-bold block text-sm">💧 1. Pompes Solaires Immergées</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Pompes submersibles tout inox 304/316 pour forages de 40m à 190m, tolérance au sable, moteurs rebobinables à haut rendement et sondes de niveau.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-sky-400 font-bold block text-sm">🌊 2. Pompes Solaires de Surface</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Pompes centrifuges et multicellulaires pour prise d’eau de fleuves, lacs et bassins de rétention maraîchers, gros débits jusqu’à 40 m³/h.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-sky-400 font-bold block text-sm">🏗️ 3. Systèmes Complets pour Forages</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Packs complets autonomes et hybrides clé en main pour forages ruraux, armoires MPPT, structures solaires au sol et têtes de puits sécurisées.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-sky-400 font-bold block text-sm">🌱 4. Équipements d’Irrigation Agricole</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Stations de fertirrigation, filtration double disques 120 mesh, manifolds et gaines de goutte-à-goutte ou rampes d'aspersion plein champ.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-sky-400 font-bold block text-sm">🏰 5. Alimentation Eau Villages & Fermes</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Châteaux d’eau métalliques galvanisés 20m³ à 50m³, réseaux d'adduction PEHD, bornes fontaines publiques et abreuvoirs pour cheptel bovin.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-sky-400 font-bold block text-sm">⚙️ 6. Contrôleurs & Variateurs MPPT</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Variateurs de fréquence solaires IP65 avec écran LCD dynamique, double entrée hybride solaire/groupe, protection foudre et surveillance GSM.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SPECIAL INTERACTIVE OVERVIEW FOR ÉCLAIRAGE ÉLECTRIQUE & LED */}
      {categoryKey === 'eclairage-electrique' && (
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Lightbulb className="w-4 h-4" />
                <span>Gamme Complète Réseau Conventionnel (Senelec · SBEE · CEET · EDM)</span>
              </div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Les 7 Piliers de l’Éclairage Public Électrique & Industriel
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Toutes nos fiches intègrent caractéristiques électriques, conditions d’installation, garanties et tarification officielle.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono bg-amber-400/10 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-xl font-bold">
                Catalogue Réseau Conforme
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-amber-400 font-bold block text-sm">⚡ Caractéristiques Électriques</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Tension 100-277V / 400V 50Hz, Cos φ &gt; 0.96, protections foudre SPD 10kV à 20kV, drivers Philips &amp; Inventronics certifiés ENEC/CE.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-amber-400 font-bold block text-sm">🛠️ Conditions d’Installation</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Massifs béton armé dosés, traverses, crosses Ø60/76mm réglables, coffrets IP68 et boucles de terre mesurées &lt; 10 Ohms (NF C 17-200).
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-amber-400 font-bold block text-sm">🛡️ Garanties Constructeur</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Garantie constructeur intégrale de 5 à 10 ans pièces et main d’œuvre. Stock de pièces de rechange garanti 10 ans en agence régionale.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-amber-400 font-bold block text-sm">💰 Prix &amp; Marchés Publics</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Tarifs unitaires FCFA transparents, remises quantitatives de -8% à -15% pour communes et ministères, devis d’ingénierie sous 48h.
              </p>
            </div>
          </div>

          {/* 4 Familles phares Éclairage Public Électrique & LED avec images & prix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div
              onClick={() => selectSubcatAndScroll('Les lampadaires électriques')}
              className="group bg-white text-slate-900 rounded-xl border border-slate-200 hover:border-amber-400 p-3.5 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src="/images/product_lampadaire_electrique_1791969743726.jpg"
                    alt="Candélabres et lampadaires électriques LED de voirie"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/85 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                    Dès {formatPrice(89000)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                    Lampadaires &amp; Luminaires LED
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Candélabres complets simple/double crosse et têtes LED 100W à 200W.
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600">
                <span>Voir les luminaires</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => selectSubcatAndScroll('Les projecteurs LED extérieurs et industriels')}
              className="group bg-white text-slate-900 rounded-xl border border-slate-200 hover:border-amber-400 p-3.5 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src="/images/product_projecteur_led_indus_1791969759701.jpg"
                    alt="Projecteurs LED industriels haute puissance pour stades et chantiers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/85 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                    Dès {formatPrice(195000)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                    Projecteurs LED Industriels
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Projecteurs IP66 200W à 600W pour stades, usines, entrepôts et ports.
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600">
                <span>Voir les projecteurs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => selectSubcatAndScroll('Les armoires électriques et dispositifs de commande')}
              className="group bg-white text-slate-900 rounded-xl border border-slate-200 hover:border-amber-400 p-3.5 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src="/images/product_armoire_electrique_1791969776063.jpg"
                    alt="Armoires électriques de commande et horloges astronomiques d'éclairage public"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/85 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                    Dès {formatPrice(35000)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                    Armoires &amp; Commandes Réseau
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Coffrets de distribution éclairage public, horloges astronomiques et cellules.
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600">
                <span>Voir les armoires</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => selectSubcatAndScroll('Les câbles et accessoires de raccordement')}
              className="group bg-white text-slate-900 rounded-xl border border-slate-200 hover:border-amber-400 p-3.5 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src="/images/product_cables_raccordement_1791969809173.jpg"
                    alt="Câbles souterrains armés et accessoires de raccordement éclairage public"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/85 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                    Dès {formatPrice(38000)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                    Mâts, Câbles &amp; Raccordements
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Câbles U-1000 RVFV, crosses de fixation galvanisées et coffrets pied de mât.
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600">
                <span>Voir câbles &amp; mâts</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SPECIAL INTERACTIVE TOOL FOR KITS & STOCKAGE: Configurateur & Dimensionneur */}
      {categoryKey === 'kits-solaires' && (
        <>
          <section className="bg-gradient-to-b from-amber-50/90 via-amber-50/50 to-white border border-amber-200/90 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                  <BatteryCharging className="w-4 h-4 text-amber-600" />
                  <span>Configurateur Intelligent & Dimensionnement Solaire Hybride</span>
                </div>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                  Dimensionnez votre Kit Solaire avec Batteries de Stockage
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Sélectionnez votre profil d'usage ou ajustez vos paramètres pour obtenir immédiatement la puissance des panneaux solaires, la capacité des batteries LiFePO4, la puissance de l'onduleur et les équipements inclus.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono bg-amber-200/70 text-amber-950 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border border-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Calcul Immédiat 230V / 400V</span>
                </span>
              </div>
            </div>

            {/* Profils prédéfinis */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                1. Choisissez un profil type ou personnalisez ci-dessous :
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {[
                  { id: 'domestique', nom: 'Maisonnette & Studio', sous: '1.5kVA · 2.5kWh', icon: Home },
                  { id: 'villa', nom: 'Villa Familiale Confort', sous: '5kVA · 10.24kWh', icon: Building2 },
                  { id: 'boutique', nom: 'Boutique & Supérette', sous: '3kVA · 5.12kWh', icon: Store },
                  { id: 'bureau', nom: 'Bureaux & Agences', sous: '6kVA · 10.24kWh', icon: Building2 },
                  { id: 'entreprise', nom: 'Entreprise & PME Tri', sous: '15kVA · 20.48kWh', icon: Zap }
                ].map((p) => {
                  const PIcon = p.icon;
                  const isSelected = kitProfil === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => appliquerProfilKit(p.id)}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-slate-900 text-white shadow-sm ring-2 ring-amber-400'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-amber-300 hover:bg-amber-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <PIcon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-amber-600'}`} />
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <span className="block text-xs font-bold truncate">{p.nom}</span>
                      <span className={`block text-[10px] font-mono mt-0.5 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                        {p.sous}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paramètres de saisie */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 sm:p-6 rounded-xl border border-amber-200">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span>Consommation journalière :</span>
                  <span className="font-mono font-bold text-amber-600">{kitConsoKwhJour} kWh/jour</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="80"
                  step="1"
                  value={kitConsoKwhJour}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setKitProfil('custom');
                    recalculerKit(val, kitPuissancePointeKw, kitAutonomieHeures);
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">
                  Ex: 4 kWh (Studio) · 18 kWh (Villa 4 pièces) · 60 kWh (Entreprise)
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span>Puissance de crête (onduleur) :</span>
                  <span className="font-mono font-bold text-amber-600">{kitPuissancePointeKw} kW</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={kitPuissancePointeKw}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setKitProfil('custom');
                    recalculerKit(kitConsoKwhJour, val, kitAutonomieHeures);
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">
                  Puissance nécessaire pour démarrer clims, frigos et moteurs
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span>Autonomie nocturne souhaitée :</span>
                  <span className="font-mono font-bold text-amber-600">{kitAutonomieHeures} heures</span>
                </label>
                <input
                  type="range"
                  min="6"
                  max="36"
                  step="2"
                  value={kitAutonomieHeures}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setKitProfil('custom');
                    recalculerKit(kitConsoKwhJour, kitPuissancePointeKw, val);
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">
                  Nombre d’heures garanties sur batterie sans apport solaire
                </span>
              </div>
            </div>

            {/* Résultats du dimensionnement */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    Fiche Technique de Dimensionnement Système Solaire & Stockage
                  </span>
                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                    Modèle recommandé : {kitModeleSuggere}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono font-semibold">
                    ✓ 100% Autonome &amp; Hybride
                  </span>
                </div>
              </div>

              {/* 4 Métriques clés */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Puissance des panneaux :</span>
                  <strong className="text-amber-400 font-mono text-base block">{kitPvWcCalcule} Wc</strong>
                  <span className="text-[10px] text-slate-400">{kitNbPanneauxCalcule} modules 550Wc Tier-1</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Puissance Onduleur :</span>
                  <strong className="text-amber-400 font-mono text-base block">{kitOnduleurKvaCalcule} kVA / kW</strong>
                  <span className="text-[10px] text-slate-400">Pur Sinus Hybride MPPT</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Capacité des batteries :</span>
                  <strong className="text-emerald-400 font-mono text-base block">{kitBatterieKwhCalcule} kWh</strong>
                  <span className="text-[10px] text-slate-400">Lithium LiFePO4 (6000 cycles)</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Tension nominale :</span>
                  <strong className="text-white font-mono text-base block">{kitTensionBatterie}</strong>
                  <span className="text-[10px] text-slate-400">Sécurité basse tension</span>
                </div>
              </div>

              {/* Équipements inclus, usages et options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Équipements Inclus</span>
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• Panneaux solaires monocristallins 550Wc</li>
                    <li>• Onduleur Hybride Pur Sinus MPPT WiFi</li>
                    <li>• Batterie(s) Lithium LiFePO4 Smart BMS</li>
                    <li>• Coffret parafoudre combiné DC 1000V &amp; AC</li>
                    <li>• Câbles solaires souples 6mm² et liaisons cuivre</li>
                  </ul>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Usages Recommandés</span>
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• 1 à 4 Climatiseurs Inverter 1.5CV</li>
                    <li>• Réfrigérateurs &amp; congélateurs continus</li>
                    <li>• Informatique, téléviseurs et box WiFi 24h/24</li>
                    <li>• Éclairage LED intérieur &amp; extérieur complet</li>
                    <li>• Pompes de surpression et portail automatique</li>
                  </ul>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Options d’Installation</span>
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• Pose sur toiture terrasse dalle béton sans percement</li>
                    <li>• Fixation toiture bac alu / tôle ondulée</li>
                    <li>• Pose murale élégante en local technique / buanderie</li>
                    <li>• Baie technique rack 19" pour PME et entreprises</li>
                    <li>• Raccordement certifié avec mise à la terre &lt; 10Ω</li>
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="text-slate-400 text-xs">
                  Garantie 25 ans panneaux · 5 ans batteries LiFePO4 · 3 ans onduleurs hybrides
                </div>
                <button
                  onClick={transmettreKitDevis}
                  disabled={kitProjetTransmis}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {kitProjetTransmis ? 'Projet de kit transmis !' : 'Transmettre ce projet au service Devis'}
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* 10 Piliers du Catalogue Kits & Stockage */}
          <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <BatteryCharging className="w-4 h-4" />
                  <span>Catalogue Officiel Kits &amp; Stockage</span>
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  Les 10 Piliers des Kits Solaires &amp; Systèmes de Stockage DIARRA ENERGIE
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Toutes nos fiches précisent la puissance des panneaux, la puissance de l’onduleur, la capacité et la tension des batteries, les équipements inclus, les usages recommandés et les options d’installation.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono bg-amber-400/10 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-xl font-bold">
                  10 Familles Certifiées
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">🏠 1. Kits Domestiques</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Packs autonomes 1.0kVA à 1.5kVA pour petits logements, éclairage LED, ventilation et TV sans coupure.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">🏡 2. Systèmes Villas</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Systèmes hybrides 5kVA à 10kVA pour résidences avec 2 à 5 climatiseurs et autonomie nocturne totale.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">🏪 3. Boutiques &amp; Bureaux</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Protection anti-coupure des chambres froides, caisses, serveurs informatiques et pharmacies.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">🏭 4. Entreprises &amp; PME</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Centrales triphasées 15kVA à 30kVA avec zéro injection réseau et intégration groupe électrogène.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">🔋 5. Kits avec Batteries</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Packs complets avec armoires Lithium LiFePO4 5.12kWh à 20.48kWh pour résilience électrique 24h/24.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">☀️ 6. Panneaux Solaires</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Modules monocristallins et bi-faciaux 550Wc à 600Wc Tier-1 résistant aux chaleurs sahéliennes.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">🔋 7. Batteries LiFePO4</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Batteries murales et rackables 51.2V 100Ah et 200Ah avec BMS intelligent et garantie 6000 cycles.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">⚡ 8. Onduleurs Hybrides</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Onduleurs pur sinus MPPT 5kVA à 10kVA mono/triphasé avec suivi WiFi et gestion de charge intelligente.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">🎛️ 9. Régulateurs MPPT</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Régulateurs de charge solaires MPPT 60A à 100A haute efficacité (98%) avec écran de monitoring.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">🔌 10. Câbles &amp; Protections</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Coffrets parafoudres DC 1000V / AC 230V, câbles solaires cuivre étamé 6mm² et connecteurs MC4 IP68.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Composants Solaires : Schémas & Composants Showcase */}
      {categoryKey === 'composants-solaires' && (
        <>
          {/* Section 1 : Schémas d'Ingénierie & Exemples d'Installation */}
          <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Ingénierie & Architecture Système</span>
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  Schémas Synoptiques, Plans Unifilaires & Réalisations d'Installations
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Consultez les schémas de principe et exemples d'installations réalisés par les ingénieurs de DIARRA ENERGIE & BUSINESS. Cliquez sur chaque illustration pour l'agrandir en haute résolution.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono bg-amber-400/10 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-xl font-bold">
                  Conforme NFC 15-712-1
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Carte 1 : Installation Réelle Toiture + Onduleur + Batterie */}
              <div
                onClick={() =>
                  setSelectedImageModal({
                    src: '/assets/aistudio/image_970a0983.png',
                    title: 'Installation Résidentielle Solaire Haut de Gamme',
                    subtitle: 'Champ photovoltaïque toiture, onduleur hybride mural et tour de stockage LiFePO4',
                    description:
                      'Configuration réelle d’une résidence autonome : les panneaux monocristallins sont solidement fixés sur rails aluminium étanches en toiture tuile. Le câblage solaire chemine sous goulotte jusqu’au local technique intérieur où sont installés l’onduleur pur sinus à écran LCD et l’armoire de batteries Lithium LiFePO4 modulaire empilable.',
                    badges: ['Installation Réelle', 'Toiture & Local Technique', 'Batterie LiFePO4 Empilable']
                  })
                }
                className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col"
              >
                <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
                  <img
                    src="/assets/aistudio/image_970a0983.png"
                    alt="Installation résidentielle solaire toiture onduleur et batterie"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur-xs rounded-lg text-amber-400 border border-white/10 group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
                      Vue Réelle Clé en Main
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      Toiture Solaire, Onduleur &amp; Tour LiFePO4
                    </h3>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    Intégration propre et soignée combinant champ PV en toiture, onduleur mural et armoire modulaire Lithium pour zéro coupure d'électricité.
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-amber-400 pt-2 border-t border-slate-700/60 font-semibold">
                    <span>Agrandir en plein écran</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Carte 2 : Schéma Synoptique Hybride */}
              <div
                onClick={() =>
                  setSelectedImageModal({
                    src: '/assets/aistudio/image_249f476c.png',
                    title: 'Schéma Synoptique d’Architecture Solaire Hybride',
                    subtitle: 'Panneaux solaires, coffrets DC/AC, onduleur hybride, parc batteries & réseau',
                    description:
                      'Schéma fonctionnel de principe détaillant le cheminement de l’énergie : le champ photovoltaïque est raccordé au coffret avec sectionneur DC, puis à l’onduleur hybride central. Le parc de batteries de stockage est protégé par coffret sectionneur et fusible dédié. Le raccordement au réseau électrique est sécurisé par disjoncteur différentiel, assurant une alimentation ininterrompue des équipements domestiques (froid, cuisine, lavage, multimédia).',
                    badges: ['Schéma Synoptique', 'Hybride Réseau + PV', 'Protections DC & AC']
                  })
                }
                className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col"
              >
                <div className="relative aspect-4/3 w-full bg-white overflow-hidden p-2 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/image_249f476c.png"
                    alt="Schéma synoptique installation solaire hybride avec batteries et réseau"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur-xs rounded-lg text-amber-400 border border-white/10 group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="inline-block text-[10px] font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
                      Schéma Synoptique
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      Synoptique Hybride : PV, Batteries &amp; Réseau
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mt-1">
                      Architecture complète avec sectionneurs DC, fusibles batterie, disjoncteur différentiel réseau et tableau de distribution des récepteurs.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-amber-400 pt-2 border-t border-slate-700/60 font-semibold">
                    <span>Agrandir le schéma</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Carte 3 : Schéma Électrique Unifilaire NFC 15-712-1 */}
              <div
                onClick={() =>
                  setSelectedImageModal({
                    src: '/assets/aistudio/image_cea4883a.png',
                    title: 'Plan de Câblage Électrique Unifilaire (NFC 15-712-1)',
                    subtitle: 'Strings photovoltaïques, boîtes de jonction parafoudres, onduleur et comptage',
                    description:
                      'Plan d’ingénierie électrique unifilaire certifié : groupement de modules photovoltaïques en strings, boîtes de jonction DC avec parafoudres et sectionneurs, raccordement onduleur réseau avec afficheur, compteurs d’énergie bidirectionnels et tableau de distribution AC pour charges domestiques prioritaires.',
                    badges: ['Norme NFC 15-712-1', 'Boîtes Parafoudres DC/AC', 'Comptage d’Énergie']
                  })
                }
                className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col"
              >
                <div className="relative aspect-4/3 w-full bg-white overflow-hidden p-2 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/image_cea4883a.png"
                    alt="Schéma unifilaire câblage électrique photovoltaïque conforme NFC 15-712-1"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur-xs rounded-lg text-amber-400 border border-white/10 group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="inline-block text-[10px] font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
                      Plan Unifilaire Conforme
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      Plan de Câblage Unifilaire Ingénierie
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mt-1">
                      Conforme aux exigences normatives NFC 15-712-1 : parafoudres DC/AC, mise à la terre, double compteur et protection différentielle.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-amber-400 pt-2 border-t border-slate-700/60 font-semibold">
                    <span>Agrandir le plan technique</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 : Les 4 Familles Majeures de Composants avec Photos Réalistes */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Composants &amp; Matériels Certifiés Disponibles au Catalogue
                </h3>
                <p className="text-xs text-slate-500">
                  Sélectionnez une famille pour filtrer directement les équipements en stock.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                Garanties constructeurs 2 à 25 ans
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Famille 1 : Panneaux Photovoltaïques */}
              <div
                onClick={() => selectSubcatAndScroll('Panneaux photovoltaïques')}
                className="group bg-white rounded-xl border border-slate-200 hover:border-amber-400 p-4 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src="/images/panneaux_solaires_pro.jpg"
                      alt="Panneaux photovoltaïques monocristallins haute efficacité"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                      550Wc ~ 600Wc
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                      Panneaux Photovoltaïques
                    </h4>
                    <p className="text-xs font-extrabold text-emerald-700 font-mono mt-1">
                      Dès {formatPrice(65000)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Modules monocristallins et bi-faciaux Half-Cell Tier-1. Rendement élevé adapté aux climats sahéliens chauds.
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
                  <span>Voir les panneaux</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Famille 2 : Batteries Solaires LiFePO4 */}
              <div
                onClick={() => selectSubcatAndScroll('Batteries solaires')}
                className="group bg-white rounded-xl border border-slate-200 hover:border-amber-400 p-4 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src="/images/batterie_lithium_pro.jpg"
                      alt="Batterie solaire Lithium LiFePO4 murale et rackable"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                      5.12kWh ~ 20.48kWh
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                      Batteries Lithium LiFePO4
                    </h4>
                    <p className="text-xs font-extrabold text-emerald-700 font-mono mt-1">
                      Dès {formatPrice(950000)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Armoires murales et racks 51.2V avec BMS intelligent. 6000 cycles à 80% DOD pour une longévité supérieure à 15 ans.
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
                  <span>Voir les batteries</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Famille 3 : Onduleurs Hybrides */}
              <div
                onClick={() => selectSubcatAndScroll('Onduleurs hybrides')}
                className="group bg-white rounded-xl border border-slate-200 hover:border-amber-400 p-4 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src="/images/onduleur_hybride_pro.jpg"
                      alt="Onduleur solaire hybride pur sinus avec monitoring"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                      3kVA ~ 10kVA Pur Sinus
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                      Onduleurs Hybrides Pur Sinus
                    </h4>
                    <p className="text-xs font-extrabold text-emerald-700 font-mono mt-1">
                      Dès {formatPrice(490000)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Onduleurs hybrides avec double régulateur MPPT, basculement réseau instantané (&lt;10ms) et supervision WiFi / mobile.
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
                  <span>Voir les onduleurs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Famille 4 : Accessoires & Câblage */}
              <div
                onClick={() => selectSubcatAndScroll('Accessoires & Câblage')}
                className="group bg-white rounded-xl border border-slate-200 hover:border-amber-400 p-4 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src="/images/accessoires_solaires_pro.jpg"
                      alt="Accessoires coffrets parafoudres et câbles solaires"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                      Norme DC 1000V / IP68
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                      Accessoires, Câblage &amp; Coffrets
                    </h4>
                    <p className="text-xs font-extrabold text-emerald-700 font-mono mt-1">
                      Dès {formatPrice(95000)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Coffrets parafoudres DC/AC, câbles solaires 6mm² cuivre étamé résistant aux UV, et connecteurs MC4 certifiés.
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
                  <span>Voir les accessoires</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Subcategory Filter Tabs */}
      <div id="category-products-grid" className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scroll-mt-24">
        <Filter className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        {config.subcategories.map((subcat) => (
          <button
            key={subcat}
            onClick={() => setActiveSubcat(subcat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeSubcat === subcat
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {subcat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-slate-500">
            Affichage de <span className="font-semibold text-slate-900">{filteredProducts.length}</span> produit(s)
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-slate-500 text-sm">
            Aucun équipement ne correspond à cette sous-catégorie pour le moment.
          </div>
        )}
      </div>

      {/* Lightbox Modal Zoom Haute Résolution pour Schémas et Installations */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Header Modal */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {selectedImageModal.badges.map((b, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded uppercase tracking-wider"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  {selectedImageModal.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedImageModal.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedImageModal(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image Container with high quality display */}
            <div className="flex-1 bg-slate-950/90 p-3 sm:p-6 overflow-auto flex items-center justify-center min-h-[300px]">
              <img
                src={selectedImageModal.src}
                alt={selectedImageModal.title}
                className="max-h-[62vh] max-w-full object-contain rounded-lg border border-slate-800 shadow-2xl bg-white"
              />
            </div>

            {/* Description & Action Footer */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {selectedImageModal.description}
              </p>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => {
                    setSelectedImageModal(null);
                    setActiveTab('devis');
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Demander une Étude / Devis
                </button>
                <button
                  onClick={() => setSelectedImageModal(null)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
