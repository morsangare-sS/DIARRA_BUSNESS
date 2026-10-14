export type ProductCategory =
  | 'eclairage-solaire'
  | 'eclairage-electrique'
  | 'pompage-solaire'
  | 'kits-solaires'
  | 'composants-solaires';

export const SENEGAL_REGIONS = [
  'Dakar',
  'Thiès',
  'Saint-Louis',
  'Diourbel',
  'Fatick',
  'Kaolack',
  'Kaffrine',
  'Louga',
  'Matam',
  'Tambacounda',
  'Kédougou',
  'Kolda',
  'Sédhiou',
  'Ziguinchor'
] as const;

export type SenegalRegion = typeof SENEGAL_REGIONS[number];

export type TargetCountry =
  | 'Sénégal'
  | SenegalRegion
  | 'Bénin'
  | 'Togo'
  | 'Sous-Région';

export interface ProductSpecs {
  puissance?: string;
  fluxLumineux?: string;
  panneauSolaire?: string;
  batterieType?: string;
  batterieCapacite?: string;
  autonomie?: string;
  hauteurMat?: string;
  indiceProtection?: string;
  debitMax?: string;
  hmtMax?: string;
  profondeurImmersion?: string;
  tensionFonctionnement?: string;
  garantie: string;
  certifications?: string[];
  poidsEstime?: string;
  dimensions?: string;
  caracteristiquesElectriques?: {
    tensionAlimentation?: string;
    frequence?: string;
    facteurPuissance?: string;
    classeIsolation?: string;
    protectionSurtension?: string;
    driverOuAlimentation?: string;
    distorsionHarmonique?: string;
    temperatureCouleur?: string;
    rendementLumineux?: string;
  };
  specsPompage?: {
    debitNominal?: string;
    debitMax?: string;
    hauteurManometriqueTotale?: string; // HMT en m
    profondeurInstallationRecommandee?: string; // m
    puissanceMoteur?: string; // kW / HP
    tensionAlimentation?: string; // V DC ou 3x400V AC
    diametreForageMin?: string; // ex: 4 pouces (100 mm), 6 pouces (150 mm)
    diametreRefoulement?: string; // ex: 1"1/4, 2", 3"
    materiauCorps?: string; // Inox 304 / Inox 316
    systemePhotovoltaiqueCompatible?: {
      puissanceCreteRecommandee?: string; // ex: 3 300 Wc (6x 550Wc)
      nombrePanneaux?: string; // ex: 6 à 8 modules 550Wc
      tensionVocMax?: string; // ex: 450V DC
      plageMppt?: string; // ex: 150V - 430V DC
      technologieOnduleur?: string; // ex: Variateur MPPT IP65 avec sonde de puits et capteur de niveau
    };
    exemplesProjetsOuVillages?: string[];
  };
  specsKitsStockage?: {
    puissancePanneaux?: string; // ex: 5 500 Wc (10x 550Wc)
    puissanceOnduleur?: string; // ex: 5.0 kVA / 5 000 W Pur Sinus
    capaciteBatterie?: string; // ex: 10.24 kWh (200Ah @ 51.2V)
    tensionBatteries?: string; // ex: 48V / 51.2V DC
    technologieBatterie?: string; // ex: Lithium LiFePO4 (6000 cycles)
    equipementsInclus?: string[]; // Panneaux, onduleur, batteries, coffret DC/AC, câbles...
    usagesRecommandes?: string[]; // Climatisation, réfrigérateur, informatique, éclairage...
    optionsInstallation?: string[]; // Toiture terrasse dalle, bac alu, fixation sol, baie rack
    autonomieEstimee?: string; // ex: 18h d'autonomie continue sans soleil ni réseau
    typeOnduleur?: string; // ex: Onduleur Hybride Pur Sinus MPPT Haute Tension
  };
  conditionsInstallation?: string[];
  garantieDetails?: string;
  prixApplicables?: string;
}

export interface ProductVariantSpec {
  modele: string;
  puissance: string;
  lentillesOuOptique?: string;
  dimensions?: string;
  fluxLumineux?: string;
  panneauSolaire?: string;
  batterie?: string;
  hauteurMat?: string;
}

export interface Product {
  id: string;
  reference: string;
  nom: string;
  categorie: ProductCategory;
  sousCategorie: string;
  descriptionCourte: string;
  descriptionDetaillee: string;
  prixFCFA: number;
  estSurDevis: boolean;
  stockDisponible: number;
  delaiLivraisonJours: number;
  imagePrincipale: string;
  galerie?: string[];
  specs: ProductSpecs;
  paysDisponibilite: TargetCountry[];
  estPhare?: boolean;
  variantesDisponibles?: ProductVariantSpec[];
  applications?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'en_attente'
  | 'confirmee'
  | 'en_preparation'
  | 'expediee'
  | 'livree'
  | 'annulee';

export type DeliveryMethod =
  | 'retrait_agence'
  | 'livraison_urbaine'
  | 'transporteur_interurbain'
  | 'fret_lourd_mats';

export type PaymentMethod =
  | 'wave'
  | 'orange_money'
  | 'moov_money'
  | 'mtn_momo'
  | 'carte_bancaire'
  | 'virement_bancaire'
  | 'modalites_pro';

export interface ClientAccount {
  id: string;
  nom: string;
  prenom: string;
  nomComplet: string;
  email: string;
  telephone: string;
  ville: string;
  pays: TargetCountry;
  adresse?: string;
  typeClient: 'particulier' | 'entreprise' | 'collectivite';
  raisonSociale?: string;
  dateInscription: string;
  motDePasse?: string;
}

export interface OrderCustomerInfo {
  clientId?: string;
  nom?: string;
  prenom?: string;
  nomComplet: string;
  raisonSociale?: string;
  typeClient: 'particulier' | 'entreprise' | 'collectivite';
  email: string;
  telephone: string;
  numeroWhatsapp?: string;
  pays: TargetCountry;
  ville: string;
  adresseLivraison: string;
  instructionsLivraison?: string;
  numeroFiscal?: string; // NINEA / IFU
}

export interface Order {
  id: string;
  clientId: string;
  numeroCommande: string;
  dateCreation: string;
  client: OrderCustomerInfo;
  articles: {
    productId: string;
    reference: string;
    nom: string;
    prixUnitaireFCFA: number;
    quantite: number;
    totalLigneFCFA: number;
  }[];
  sousTotalFCFA: number;
  fraisLivraisonFCFA: number;
  totalFCFA: number;
  methodeLivraison: DeliveryMethod;
  moyenPaiement: PaymentMethod;
  statutPaiement: 'en_attente' | 'paye' | 'en_cours_de_validation';
  statutCommande: OrderStatus;
  numeroSuivi?: string;
  notes?: string;
}

export type QuoteStatus =
  | 'recu'
  | 'en_etude'
  | 'devis_transmis'
  | 'accepte'
  | 'refuse';

export interface QuoteRequest {
  id: string;
  numeroDevis: string;
  dateCreation: string;
  demandeur: {
    nomComplet: string;
    entreprise?: string;
    typeEntite: 'collectivite' | 'entreprise_btp' | 'agriculteur' | 'ong' | 'particulier';
    email: string;
    telephone: string;
    whatsapp: string;
    paysProjet: TargetCountry;
    villeProjet: string;
    lieuDit?: string;
  };
  projet: {
    typeProjet: ProductCategory | 'projet_mixte';
    intitule: string;
    datePrevisionnelle: string;
    quantiteEstimee: number;
    descriptionBesoin: string;
    // Données spécifiques pompage
    pompageData?: {
      debitSouhaiteM3Jour?: number;
      profondeurForageM?: number;
      hauteurRefoulementM?: number;
      distanceRefoulementM?: number;
      usageEau?: 'irrigation' | 'abreuvement' | 'aep_villageoise' | 'commercial';
    };
    // Données spécifiques éclairage
    eclairageData?: {
      longueurVoieKm?: number;
      largeurVoieM?: number;
      hauteurMatSouhaiteeM?: number;
      typeVoirie?: 'autoroute' | 'boulevard' | 'rue_secondaire' | 'parking' | 'piste_rurale';
    };
    piecesJointesNoms?: string[];
  };
  estimationEstimeeFCFA?: number;
  statut: QuoteStatus;
  reponseCommerciale?: string;
}

export interface ProjectReference {
  id: string;
  titre: string;
  client: string;
  typeClient: string;
  pays: string;
  ville: string;
  annee: string;
  description: string;
  pointsForts: string[];
  categorie: ProductCategory;
  capaciteInstallee: string;
  image: string;
}

export interface NewsArticle {
  id: string;
  titre: string;
  slug: string;
  date: string;
  auteur: string;
  categorie: string;
  resume: string;
  contenuComplet: string;
  tempsLecture: string;
  image?: string;
}
