import { Product, ProjectReference, NewsArticle, ClientAccount, Order, ClientDiscussion } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. ÉCLAIRAGE PUBLIC SOLAIRE
  {
    id: 'deb-eps-01',
    reference: 'DEB-SL-100-PRO',
    nom: 'Lampadaire Solaire Intégré All-In-One 100W Lumileds',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires intégrés',
    applications: ['Lampadaires solaires intégrés', 'Rues, villages et collectivités', 'Routes et autoroutes'],
    descriptionCourte: 'Lampadaire solaire monobloc avec panneau monocristallin haute efficacité et batterie LiFePO4 intégrée. Idéal pour voiries urbaines et lotissements.',
    descriptionDetaillee: 'Le DEB-SL-100-PRO est conçu spécifiquement pour les conditions climatiques d’Afrique de l’Ouest. Équipé de puces LED Philips Lumileds 3030 délivrant 170 lm/W, d’un panneau monocristallin 120Wc et d’une batterie Lithium Fer Phosphate (LiFePO4) 12.8V 54Ah offrant plus de 3000 cycles. Régulateur MPPT intelligent avec programmation d’atténuation automatique (dimming) et capteur de présence radar.',
    prixFCFA: 195000,
    estSurDevis: false,
    stockDisponible: 64,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_lampadaire_solaire_1791734634193.jpg',
    specs: {
      puissance: '100W LED (Équivalent 250W HPS)',
      fluxLumineux: '16 500 Lumens',
      panneauSolaire: 'Monocristallin 120Wc - Rendement 22.4%',
      batterieType: 'LiFePO4 Haute Température',
      batterieCapacite: '12.8V / 54Ah (691Wh)',
      autonomie: '36 à 48 heures (3 à 4 nuits d’autonomie)',
      hauteurMat: '6 à 8 mètres',
      indiceProtection: 'IP66 / IK09',
      garantie: '3 ans (Extension 5 ans disponible)',
      certifications: ['CE', 'RoHS', 'IEC 60598', 'ISO 9001']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-eps-07',
    reference: 'DEB-SLM-TYN-01',
    nom: 'Lampadaire Solaire Intégré Compact SLM-TYN-01 (40W à 150W)',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires intégrés',
    applications: ['Lampadaires solaires intégrés', 'Rues, villages et collectivités'],
    descriptionCourte: 'Lampadaire solaire monobloc compact en aluminium injecté avec détecteur crépusculaire et radar PIR, batterie LiFePO4 et panneau solaire haute conversion.',
    descriptionDetaillee: 'Le modèle SLM-TYN-01 est un luminaire solaire autonome All-In-One conçu pour l\'éclairage des rues résidentielles, pistes cyclables, allées de résidences, parkings et cours scolaires. Très compact et léger pour une pose rapide par un seul technicien sur mât de 4 à 8 mètres, il intègre des puces LED 3030/5050 à haute efficacité (140 lm/W), une batterie Lithium Fer Phosphate LiFePO4 thermo-résistante, un panneau solaire monocristallin anti-reflet et un détecteur de mouvement PIR intelligent permettant d\'ajuster la luminosité selon le passage. Boîtier en fonte d\'aluminium thermolaqué IP65 / IK08 résistant aux ambiances salines et aux fortes chaleurs tropicales.',
    prixFCFA: 145000,
    estSurDevis: false,
    stockDisponible: 60,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_slm_tyn_01_1791892182952.jpg',
    specs: {
      puissance: '60W à 80W LED Standard (Gamme 40W à 150W)',
      fluxLumineux: '11 200 Lumens (140 lm/W)',
      panneauSolaire: 'Monocristallin 90Wc intégré haute efficacité 21.8%',
      batterieType: 'LiFePO4 (Lithium Fer Phosphate) > 2500 cycles',
      batterieCapacite: '12.8V / 42Ah (537Wh)',
      autonomie: '36 heures (3 nuits complètes en mode économique)',
      hauteurMat: '4 à 8 mètres (Emmanchement mât Φ60mm)',
      indiceProtection: 'IP65 / IK08 / Température -20°C ~ +50°C',
      dimensions: '580 × 310 × 110 mm (Modèle 60W/80W)',
      garantie: '3 ans (Extension 5 ans disponible)',
      certifications: ['CE', 'RoHS', 'IP65', 'IK08']
    },
    variantesDisponibles: [
      { modele: 'SLM-TYN-01-A', puissance: '40W', lentillesOuOptique: 'Optique grand angle', dimensions: '510 × 290 × 105 mm', fluxLumineux: '5 600 LM', hauteurMat: '4-6m' },
      { modele: 'SLM-TYN-01-B', puissance: '60W', lentillesOuOptique: 'Optique asymétrique', dimensions: '580 × 310 × 110 mm', fluxLumineux: '8 400 LM', hauteurMat: '5-7m' },
      { modele: 'SLM-TYN-01-C', puissance: '80W', lentillesOuOptique: 'Optique asymétrique', dimensions: '640 × 310 × 110 mm', fluxLumineux: '11 200 LM', hauteurMat: '6-8m' },
      { modele: 'SLM-TYN-01-D', puissance: '100W', lentillesOuOptique: 'Optique routière TII', dimensions: '710 × 320 × 115 mm', fluxLumineux: '14 000 LM', hauteurMat: '6-8m' },
      { modele: 'SLM-TYN-01-E', puissance: '150W', lentillesOuOptique: 'Optique routière TII', dimensions: '820 × 330 × 120 mm', fluxLumineux: '21 000 LM', hauteurMat: '7-9m' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },
  {
    id: 'deb-eps-08',
    reference: 'DEB-SLM-TYN-02',
    nom: 'Lampadaire Solaire Intégré Slimline SLM-TYN-02 (60W à 200W)',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires intégrés',
    applications: ['Lampadaires solaires intégrés', 'Rues, villages et collectivités', 'Routes et autoroutes'],
    descriptionCourte: 'Lampadaire solaire monobloc profil plat à double bloc optique LED, panneau solaire surélevé à ventilation dorsale et batterie LiFePO4 haute capacité.',
    descriptionDetaillee: 'Le SLM-TYN-02 adopte une architecture moderne avec panneau solaire décollé surélevé offrant une circulation d\'air naturelle sous les cellules photovoltaïques, réduisant la température de surface de plus de 12°C et maximisant le rendement de charge sous fort ensoleillement sahélo-saharien. Équipé de double blocs optiques haute précision avec puces LED 5050 (150 lm/W) et distribution asymétrique type II/III pour une excellente uniformité sur chaussée sans éblouissement. Sa batterie Lithium LiFePO4 avec régulateur MPPT 98% garantit un fonctionnement nocturne continu de plus de 4 nuits d\'autonomie sans interruption. Certifié CE, CB, RoHS, IP66 et IK09.',
    prixFCFA: 165000,
    estSurDevis: false,
    stockDisponible: 50,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_slm_tyn_02_1791892205558.jpg',
    specs: {
      puissance: '80W à 120W LED (Gamme 60W à 200W)',
      fluxLumineux: '15 000 à 18 000 Lumens (150 lm/W)',
      panneauSolaire: 'Monocristallin 120Wc à ventilation dorsale continue',
      batterieType: 'LiFePO4 Haute Énergie avec régulateur MPPT synchronisé',
      batterieCapacite: '12.8V / 54Ah (691Wh) > 3000 cycles',
      autonomie: '48 heures (4 nuits complètes garanties)',
      hauteurMat: '6 à 10 mètres (Emmanchement mât Φ60mm)',
      indiceProtection: 'IP66 / IK09 / Température -25°C ~ +55°C',
      dimensions: '690 × 330 × 140 mm (Modèle 100W/120W)',
      garantie: '5 ans (Garantie 5 Years certifiée)',
      certifications: ['CE', 'CB', 'RoHS', 'IP66', 'IK09']
    },
    variantesDisponibles: [
      { modele: 'SLM-TYN-02-A', puissance: '60W', lentillesOuOptique: 'Double bloc optique', dimensions: '610 × 320 × 135 mm', fluxLumineux: '9 000 LM', hauteurMat: '5-7m' },
      { modele: 'SLM-TYN-02-B', puissance: '80W', lentillesOuOptique: 'Double bloc optique', dimensions: '660 × 320 × 135 mm', fluxLumineux: '12 000 LM', hauteurMat: '6-8m' },
      { modele: 'SLM-TYN-02-C', puissance: '100W', lentillesOuOptique: 'Double bloc optique', dimensions: '690 × 330 × 140 mm', fluxLumineux: '15 000 LM', hauteurMat: '6-9m' },
      { modele: 'SLM-TYN-02-D', puissance: '150W', lentillesOuOptique: 'Double bloc optique', dimensions: '780 × 340 × 145 mm', fluxLumineux: '22 500 LM', hauteurMat: '8-10m' },
      { modele: 'SLM-TYN-02-E', puissance: '200W', lentillesOuOptique: 'Double bloc optique', dimensions: '890 × 350 × 150 mm', fluxLumineux: '30 000 LM', hauteurMat: '9-12m' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-eps-04',
    reference: 'DEB-SLM-TYN-04',
    nom: 'Lampadaire Solaire Intégré Modulaire SLM-TYN-04 (50W à 300W)',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires intégrés',
    applications: ['Lampadaires solaires intégrés', 'Routes et autoroutes', 'Parkings et espaces industriels'],
    descriptionCourte: 'Lampadaire solaire monobloc tout-en-un à conception modulaire 1 à 6 blocs optiques LED 5050, boîtier aluminium haute dissipation, certifié IP66 et IK09.',
    descriptionDetaillee: 'Le modèle SLM-TYN-04 est un luminaire solaire autonome monobloc haute performance conçu pour les voiries urbaines, lotissements et avenues d\'Afrique de l\'Ouest. Conçu autour d\'une architecture modulaire évolutive (de 50W à 300W, 1 à 6 blocs optiques 5050), il intègre des puces LED à très haute efficacité lumineuse (130 à 160 lm/W), une durée de vie supérieure à 50 000 heures et plus de 100 000 cycles d\'allumage. Son châssis en fonte d\'aluminium avec ailettes de dissipation passives assure une gestion thermique optimale même à 50°C ambiant. Il embarque une batterie Lithium LiFePO4 longue endurance (>3000 cycles), un panneau monocristallin haute conversion et un régulateur MPPT intelligent. Certifié CE, CB, RoHS, ENEC, IP66 et résistant aux chocs IK09 avec garantie constructeur de 5 ans.',
    prixFCFA: 215000,
    estSurDevis: false,
    stockDisponible: 58,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_slm_tyn_04_1791891551863.jpg',
    specs: {
      puissance: '150W LED (Configurable 50W à 300W / 1 à 6 lentilles)',
      fluxLumineux: '22 500 à 24 000 Lumens (Efficacité 130-160 lm/W)',
      panneauSolaire: 'Monocristallin 180Wc intégré haute conversion',
      batterieType: 'LiFePO4 (Lithium Fer Phosphate) thermo-stabilisée',
      batterieCapacite: '12.8V / 72Ah (921Wh) > 3000 cycles',
      autonomie: '48 à 60 heures (3 à 5 nuits sans soleil)',
      hauteurMat: '6 à 12 mètres (Emmanchement mât Φ60mm)',
      indiceProtection: 'IP66 / IK09 / Température -30°C ~ +50°C',
      dimensions: '799 × 350 × 123 mm (Modèle 150W 04-C)',
      garantie: '5 ans de garantie constructeur',
      certifications: ['CE', 'CB', 'RoHS', 'ENEC', 'IP66', 'IK09']
    },
    variantesDisponibles: [
      { modele: 'SLM-TYN-04-A', puissance: '50W', lentillesOuOptique: '1 Lentille (5050)', dimensions: '649 × 350 × 123 mm', fluxLumineux: '7 500 LM', hauteurMat: '6-8m' },
      { modele: 'SLM-TYN-04-B', puissance: '100W', lentillesOuOptique: '2 Lentilles (5050)', dimensions: '724 × 350 × 123 mm', fluxLumineux: '15 000 LM', hauteurMat: '6-9m' },
      { modele: 'SLM-TYN-04-C', puissance: '150W', lentillesOuOptique: '3 Lentilles (5050)', dimensions: '799 × 350 × 123 mm', fluxLumineux: '22 500 LM', hauteurMat: '8-10m' },
      { modele: 'SLM-TYN-04-D', puissance: '200W', lentillesOuOptique: '4 Lentilles (5050)', dimensions: '874 × 350 × 123 mm', fluxLumineux: '30 000 LM', hauteurMat: '9-11m' },
      { modele: 'SLM-TYN-04-E', puissance: '250W', lentillesOuOptique: '5 Lentilles (5050)', dimensions: '949 × 350 × 123 mm', fluxLumineux: '37 500 LM', hauteurMat: '10-12m' },
      { modele: 'SLM-TYN-04-F', puissance: '300W', lentillesOuOptique: '6 Lentilles (5050)', dimensions: '1024 × 350 × 123 mm', fluxLumineux: '45 000 LM', hauteurMat: '10-12m' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-eps-05',
    reference: 'DEB-SLM-TYN-03',
    nom: 'Lampadaire Solaire Intégré Aérodynamique SLM-TYN-03 (50W à 300W)',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires intégrés',
    applications: ['Lampadaires solaires intégrés', 'Routes et autoroutes', 'Rues, villages et collectivités'],
    descriptionCourte: 'Lampadaire solaire monobloc profilé courbe avec optiques LED 5050 modulaires, forte pénétration d\'air, étanchéité IP66 et protection IK09.',
    descriptionDetaillee: 'Le SLM-TYN-03 associe une esthétique courbée contemporaine à une résistance mécanique d\'exception contre les bourrasques de vent et tempêtes de sable. Grâce à sa géométrie profilée, il évite l\'accumulation de poussière latéritique sur la face solaire supérieure et optimise l\'évacuation thermique. Doté de blocs optiques LED 5050 (1 à 6 blocs, de 50W à 300W), il développe une efficacité lumineuse de 130 à 160 lm/W avec un facteur de puissance > 0.95 et plus de 100 000 cycles d\'allumage. Sa batterie LiFePO4 intégrée et son contrôleur intelligent garantissent un allumage automatique crépusculaire avec une autonomie continue de 3 à 4 nuits. Conforme aux normes CE, CB, RoHS, ENEC avec garantie totale de 5 ans.',
    prixFCFA: 185000,
    estSurDevis: false,
    stockDisponible: 46,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_slm_tyn_03_1791891567914.jpg',
    specs: {
      puissance: '100W à 150W LED (Gamme 50W à 300W / 1 à 6 lentilles)',
      fluxLumineux: '16 000 à 22 500 Lumens (Efficacité 130-160 lm/W)',
      panneauSolaire: 'Monocristallin 140Wc profilé auto-nettoyant',
      batterieType: 'LiFePO4 Haute Densité intégrée avec BMS intelligent',
      batterieCapacite: '12.8V / 60Ah (768Wh) > 3000 cycles',
      autonomie: '36 à 48 heures (3 à 4 nuits garanties)',
      hauteurMat: '6 à 12 mètres (Emmanchement mât Φ60mm)',
      indiceProtection: 'IP66 / IK09 / Température -30°C ~ +50°C',
      dimensions: '643 × 335 × 165 mm (Modèle 100W 03-B) / 721 × 335 × 165 mm (150W 03-C)',
      garantie: '5 ans de garantie constructeur',
      certifications: ['CE', 'CB', 'RoHS', 'ENEC', 'IP66', 'IK09']
    },
    variantesDisponibles: [
      { modele: 'SLM-TYN-03-A', puissance: '50W', lentillesOuOptique: '1 Lentille (5050)', dimensions: '565 × 335 × 165 mm', fluxLumineux: '7 500 LM', hauteurMat: '6-8m' },
      { modele: 'SLM-TYN-03-B', puissance: '100W', lentillesOuOptique: '2 Lentilles (5050)', dimensions: '643 × 335 × 165 mm', fluxLumineux: '15 000 LM', hauteurMat: '6-9m' },
      { modele: 'SLM-TYN-03-C', puissance: '150W', lentillesOuOptique: '3 Lentilles (5050)', dimensions: '721 × 335 × 165 mm', fluxLumineux: '22 500 LM', hauteurMat: '8-10m' },
      { modele: 'SLM-TYN-03-D', puissance: '200W', lentillesOuOptique: '4 Lentilles (5050)', dimensions: '799 × 335 × 165 mm', fluxLumineux: '30 000 LM', hauteurMat: '9-11m' },
      { modele: 'SLM-TYN-03-E', puissance: '250W', lentillesOuOptique: '5 Lentilles (5050)', dimensions: '877 × 335 × 165 mm', fluxLumineux: '37 500 LM', hauteurMat: '10-12m' },
      { modele: 'SLM-TYN-03-F', puissance: '300W', lentillesOuOptique: '6 Lentilles (5050)', dimensions: '955 × 335 × 165 mm', fluxLumineux: '45 000 LM', hauteurMat: '10-12m' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-eps-06',
    reference: 'DEB-POLE-SPLIT-3-12M',
    nom: 'Candélabre Solaire à Panneau Séparé 3M-12M (Simple/Double Crosse)',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires à panneau séparé',
    applications: ['Lampadaires solaires à panneau séparé', 'Routes et autoroutes', 'Rues, villages et collectivités'],
    descriptionCourte: 'Système complet d\'éclairage solaire à panneau séparé (30W-700W) avec mât conique acier Q235/Q345 galvanisé (3m à 12m), caisson batterie Lithium et lanterne LED 5050.',
    descriptionDetaillee: 'Système d\'éclairage public solaire autonome complet à haute résilience, conçu selon les spécifications candélabre 3M à 12M pour routes nationales, autoroutes, échangeurs et grands boulevards. Le système comprend : un mât conique en acier Q235/Q345 galvanisé à chaud selon la norme EN ISO 1461 (épaisseur 2.5mm à 4.5mm), une crosse simple ou double armée (déport 600mm à 1500mm, manchon Φ60mm), un ou deux panneaux solaires monocristallins séparés haute efficacité (30W à 700Wc) montés sur étrier orientable à 15°-30° plein Sud, un caisson métallique étanche cadenassable pour batterie Lithium LiFePO4 fixé sur le mât, et un luminaire LED 5050 haute performance (10W à 120W, 2 200 à 16 800+ Lumens). Livré complet avec semelle de fixation renforcée et cage d\'ancrage en béton avec tiges J-bolts (M12 à M24).',
    prixFCFA: 345000,
    estSurDevis: false,
    stockDisponible: 34,
    delaiLivraisonJours: 4,
    imagePrincipale: './images/product_split_pole_1791891587682.jpg',
    specs: {
      puissance: '40W à 80W LED Standard (Configurable 10W à 120W / Simple & Double Crosse)',
      fluxLumineux: '8 400 à 16 800 Lumens (2 200 LM pour 3m jusqu\'à 16 800 LM pour 12m)',
      panneauSolaire: 'Monocristallin Séparé 80Wc à 320Wc (Supporte 30W à 700Wc orientable)',
      batterieType: 'Lithium LiFePO4 haute sécurité logée dans caisson métallique sur mât',
      batterieCapacite: '25.6V / 30Ah (768Wh) à 60Ah (1536Wh) selon hauteur',
      autonomie: '4 nuits consécutives sans soleil garanties (100% zéro coupure)',
      hauteurMat: 'Mât conique 3m à 12m acier Q235 / Q345 galvanisé à chaud',
      indiceProtection: 'IP66 (Luminaire) / IP65 (Caisson batterie) / IK10',
      dimensions: 'Mât 3m à 12m, diamètre tête Φ60-90mm / base Φ105-200mm, platine 240x240 à 400x400mm',
      garantie: '5 ans système global / 10 ans mât candélabre galvanisé',
      certifications: ['CE', 'ISO 9001', 'EN ISO 1461', 'IEC 60598', 'IEC 61215']
    },
    variantesDisponibles: [
      { modele: 'Mât 3m - Simple Crosse', puissance: '10W LED', dimensions: 'H: 3m | Base Φ105mm | Tiges M12', fluxLumineux: '2 200 LM', panneauSolaire: '20Wc Monocristallin', batterie: 'LiFePO4 144Wh', hauteurMat: '3.0 mètres' },
      { modele: 'Mât 6m - Simple Crosse', puissance: '20W LED', dimensions: 'H: 6m | Base Φ140mm | Tiges M14', fluxLumineux: '4 200 LM', panneauSolaire: '40Wc Monocristallin', batterie: 'LiFePO4 240Wh', hauteurMat: '6.0 mètres' },
      { modele: 'Mât 7m - Simple/Double Crosse', puissance: '30W à 40W LED', dimensions: 'H: 7m | Base Φ140-150mm | Tiges M16-M18', fluxLumineux: '6 600 - 8 400 LM', panneauSolaire: '60Wc à 80Wc', batterie: 'LiFePO4 384-480Wh', hauteurMat: '7.0 mètres' },
      { modele: 'Mât 8m - Simple/Double Crosse', puissance: '40W à 50W LED', dimensions: 'H: 8m | Base Φ175-180mm | Tiges M18-M20', fluxLumineux: '8 400 - 10 500 LM', panneauSolaire: '80Wc à 100Wc', batterie: 'LiFePO4 480-672Wh', hauteurMat: '8.0 mètres' },
      { modele: 'Mât 9m - Simple Crosse', puissance: '50W LED', dimensions: 'H: 9m | Base Φ190mm | Tiges M20', fluxLumineux: '10 500 LM', panneauSolaire: '100Wc Monocristallin', batterie: 'LiFePO4 672Wh', hauteurMat: '9.0 mètres' },
      { modele: 'Mât 10m - Simple/Double Crosse', puissance: '60W à 80W LED', dimensions: 'H: 10m | Base Φ180-200mm | Tiges M20', fluxLumineux: '12 600 - 16 800 LM', panneauSolaire: '120Wc à 160Wc', batterie: 'LiFePO4 768-960Wh', hauteurMat: '10.0 mètres' },
      { modele: 'Mât 11m - Simple/Double Crosse', puissance: '80W LED', dimensions: 'H: 11m | Base Φ190-200mm | Tiges M24', fluxLumineux: '16 800 LM', panneauSolaire: '160Wc (1 ou 2 panneaux)', batterie: 'LiFePO4 960Wh', hauteurMat: '11.0 mètres' },
      { modele: 'Mât 12m - Simple/Double Crosse', puissance: '80W à 120W LED', dimensions: 'H: 12m | Base Φ200mm | Tiges M24', fluxLumineux: '16 800 - 24 000 LM', panneauSolaire: '160Wc à 320Wc (Double)', batterie: 'LiFePO4 960-1536Wh', hauteurMat: '12.0 mètres' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-sokoyo-01',
    reference: 'DEB-SOKOYO-COOLEX-120',
    nom: 'Lampadaire Solaire Intégré Coolex 120W Sokoyo Convection Saharienne',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires intégrés',
    applications: ['Lampadaires solaires intégrés', 'Rues, villages et collectivités', 'Routes et autoroutes', 'Parkings et espaces industriels'],
    descriptionCourte: 'Technologie brevetée Sokoyo Coolex à cavité de refroidissement convectif pour forte chaleur (>50°C), optique Batwing, batterie LiFePO4 et capteur micro-ondes.',
    descriptionDetaillee: 'Inspiré de l’ingénierie brevetée Coolex de Sokoyo, ce luminaire All-in-One intègre une cavité creuse à convection thermique naturelle qui évacue instantanément la chaleur sous climat désertique et sahélien. Équipé d’un panneau monocristallin haute conversion 150Wc, d’un module LED haute efficacité 160 lm/W à lentille optique Batwing (éliminant tout cône d’ombre entre les mâts), d’une batterie LiFePO4 haute température (3000 cycles) et d’un capteur micro-ondes intelligent réglable. Tête orientable pour un angle d’inclinaison zénithal idéal.',
    prixFCFA: 210000,
    estSurDevis: false,
    stockDisponible: 40,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_sokoyo_coolex_1791894551466.jpg',
    specs: {
      puissance: '120W LED (Gamme Coolex 60W à 120W / Optique Batwing)',
      fluxLumineux: '19 200 Lumens (160 lm/W)',
      panneauSolaire: 'Monocristallin Grade-A 150Wc - Rendement 22.6%',
      batterieType: 'LiFePO4 Haute Température avec BMS thermo-actif',
      batterieCapacite: '12.8V / 60Ah (768Wh) > 3000 cycles',
      autonomie: '4 nuits garanties (Régulation crépusculaire intelligente)',
      hauteurMat: '6 à 9 mètres (Manchon orientable Φ60mm)',
      indiceProtection: 'IP66 / IK09 / Température -30°C ~ +60°C',
      dimensions: '1120 × 420 × 160 mm',
      garantie: '5 ans (Garantie usine certifiée)',
      certifications: ['CE', 'CB', 'RoHS', 'ENEC', 'IP66', 'IK09']
    },
    variantesDisponibles: [
      { modele: 'Coolex-60W', puissance: '60W', lentillesOuOptique: 'Lentille Batwing', dimensions: '890 × 380 × 150 mm', fluxLumineux: '9 600 LM', hauteurMat: '5-7m' },
      { modele: 'Coolex-80W', puissance: '80W', lentillesOuOptique: 'Lentille Batwing', dimensions: '980 × 400 × 155 mm', fluxLumineux: '12 800 LM', hauteurMat: '6-8m' },
      { modele: 'Coolex-100W', puissance: '100W', lentillesOuOptique: 'Lentille Batwing', dimensions: '1050 × 410 × 160 mm', fluxLumineux: '16 000 LM', hauteurMat: '7-9m' },
      { modele: 'Coolex-120W', puissance: '120W', lentillesOuOptique: 'Lentille Batwing', dimensions: '1120 × 420 × 160 mm', fluxLumineux: '19 200 LM', hauteurMat: '8-10m' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-sokoyo-02',
    reference: 'DEB-SOKOYO-LUMO-80',
    nom: 'Lampadaire Solaire Intégré Urbain & Collectivités Lumo 80W Sokoyo',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires intégrés',
    applications: ['Lampadaires solaires intégrés', 'Rues, villages et collectivités', 'Parkings et espaces industriels'],
    descriptionCourte: 'Design courbe architectural primé Sokoyo Lumo, distribution lumineuse uniforme bat-wing pour avenues urbaines, cités et villages ruraux.',
    descriptionDetaillee: 'Modèle phare de la série Lumo de Sokoyo, plébiscité pour sa silhouette courbée sculptée et son intégration paysagère soignée. Spécialement dimensionné pour les programmes municipaux d’électrification de voiries, les quartiers résidentiels, les centres de santé et les villages isolés. Doté d’une distribution lumineuse Batwing brevetée garantissant un éclairage étendu sans éblouissement, de puces LED Philips Lumileds 5050 (160 lm/W), d’une batterie Lithium LiFePO4 longue endurance et d’un contrôleur MPPT 100% étanche.',
    prixFCFA: 175000,
    estSurDevis: false,
    stockDisponible: 55,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_sokoyo_lumo_1791894571096.jpg',
    specs: {
      puissance: '80W LED (Gamme Lumo 40W à 100W)',
      fluxLumineux: '12 800 Lumens (160 lm/W)',
      panneauSolaire: 'Monocristallin 110Wc profilé anti-salissure',
      batterieType: 'LiFePO4 Haute Densité intégrée',
      batterieCapacite: '12.8V / 48Ah (614Wh) > 2500 cycles',
      autonomie: '3 à 4 nuits d’autonomie continue',
      hauteurMat: '5 à 8 mètres (Emmanchement Φ60mm)',
      indiceProtection: 'IP66 / IK08 / Tropicalisé anti-corrosion',
      dimensions: '980 × 360 × 145 mm',
      garantie: '5 ans (Garantie Sokoyo Certified)',
      certifications: ['CE', 'RoHS', 'ISO 9001', 'IP66']
    },
    variantesDisponibles: [
      { modele: 'Lumo-40W', puissance: '40W', lentillesOuOptique: 'Optique Batwing', dimensions: '780 × 340 × 135 mm', fluxLumineux: '6 400 LM', hauteurMat: '4-6m' },
      { modele: 'Lumo-60W', puissance: '60W', lentillesOuOptique: 'Optique Batwing', dimensions: '880 × 350 × 140 mm', fluxLumineux: '9 600 LM', hauteurMat: '5-7m' },
      { modele: 'Lumo-80W', puissance: '80W', lentillesOuOptique: 'Optique Batwing', dimensions: '980 × 360 × 145 mm', fluxLumineux: '12 800 LM', hauteurMat: '6-8m' },
      { modele: 'Lumo-100W', puissance: '100W', lentillesOuOptique: 'Optique Batwing', dimensions: '1080 × 370 × 150 mm', fluxLumineux: '16 000 LM', hauteurMat: '7-9m' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-sokoyo-03',
    reference: 'DEB-SOKOYO-INTENSE-150',
    nom: 'Système Solaire All-In-Two Intense 150W Sokoyo (Routes & Autoroutes)',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires à panneau séparé',
    applications: ['Lampadaires solaires à panneau séparé', 'Routes et autoroutes', 'Parkings et espaces industriels'],
    descriptionCourte: 'Architecture All-In-Two semi-séparée Sokoyo Intense pour autoroutes et grands axes, panneau solaire 200Wc orientable, autonomie 5 nuits sans black-out.',
    descriptionDetaillee: 'Conçu selon l’architecture All-in-Two brevetée de la série Sokoyo Intense pour autoroutes, rocades à fort trafic et pénétrantes urbaines. Le luminaire intègre le bloc optique LED, la batterie Lithium LiFePO4 et le régulateur MPPT dans un corps monobloc profilé en aluminium coulé sous haute pression, tandis que le panneau solaire photovoltaïque haute puissance (200Wc) est monté sur étrier réglable orientable plein Sud à l’angle zénithal optimal. Optique routière asymétrique longue portée permettant un espacement entre candélabres de 35 à 45 mètres.',
    prixFCFA: 295000,
    estSurDevis: false,
    stockDisponible: 36,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_sokoyo_intense_1791894591590.jpg',
    specs: {
      puissance: '150W LED Autoroute (Gamme Intense 60W à 180W)',
      fluxLumineux: '24 000 Lumens (Efficacité 160 lm/W)',
      panneauSolaire: 'Monocristallin Séparé Orientable 200Wc Grade-A (22.8%)',
      batterieType: 'LiFePO4 intégrée en tête de luminaire avec gestion thermique',
      batterieCapacite: '25.6V / 48Ah (1228Wh) > 3000 cycles',
      autonomie: '5 nuits consécutives 100% zéro black-out',
      hauteurMat: '8 à 12 mètres (Emmanchement mât Φ60mm)',
      indiceProtection: 'IP67 / IK10 / Résistance au vent 160 km/h',
      dimensions: 'Luminaire: 820 × 340 × 130 mm | Panneau: 1480 × 680 × 35 mm',
      garantie: '5 ans de garantie globale',
      certifications: ['CE', 'CB', 'RoHS', 'ENEC', 'IP67', 'IK10']
    },
    variantesDisponibles: [
      { modele: 'Intense-60W', puissance: '60W', lentillesOuOptique: 'Optique autoroutière asymétrique', dimensions: 'Luminaire 680mm | Panneau 100Wc', fluxLumineux: '9 600 LM', hauteurMat: '6-8m' },
      { modele: 'Intense-100W', puissance: '100W', lentillesOuOptique: 'Optique autoroutière asymétrique', dimensions: 'Luminaire 750mm | Panneau 150Wc', fluxLumineux: '16 000 LM', hauteurMat: '7-9m' },
      { modele: 'Intense-150W', puissance: '150W', lentillesOuOptique: 'Optique autoroutière asymétrique', dimensions: 'Luminaire 820mm | Panneau 200Wc', fluxLumineux: '24 000 LM', hauteurMat: '8-11m' },
      { modele: 'Intense-180W', puissance: '180W', lentillesOuOptique: 'Optique autoroutière asymétrique', dimensions: 'Luminaire 900mm | Panneau 250Wc', fluxLumineux: '28 800 LM', hauteurMat: '9-12m' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-sokoyo-04',
    reference: 'DEB-SOKOYO-HELIOS-200',
    nom: 'Projecteur Solaire Candélabre Helios 200W Parkings & Espaces Industriels',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Solutions d’éclairage de parkings et d’espaces industriels',
    applications: ['Parkings et espaces industriels', 'Lampadaires solaires à panneau séparé', 'Routes et autoroutes'],
    descriptionCourte: 'Système solaire multi-projecteurs orientables pour grandes aires logistiques, quais portuaires, parkings de supermarchés et sites miniers.',
    descriptionDetaillee: 'Système d’éclairage solaire grande surface inspiré des séries industrielles Sokoyo pour parcs logistiques, zones portuaires, parkings de centres commerciaux, dépôts miniers et carrefours autoroutiers. Équipé d’une double tête LED orientable à 360° pour un arrosage lumineux panoramique, d’un grand panneau solaire 300Wc et d’un caisson batterie étanche IP66 avec régulateur MPPT programmable.',
    prixFCFA: 365000,
    estSurDevis: false,
    stockDisponible: 28,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_solar_parking_indus_1791894613199.jpg',
    specs: {
      puissance: '200W LED (Double tête projecteur 2x 100W orientables)',
      fluxLumineux: '30 000 Lumens (Faisceau large 120° x 60°)',
      panneauSolaire: 'Monocristallin 300Wc séparé inclinable',
      batterieType: 'LiFePO4 Haute Capacité en caisson métallique étanche',
      batterieCapacite: '25.6V / 60Ah (1536Wh)',
      autonomie: '4 nuits complètes d’autonomie',
      hauteurMat: '8 à 12 mètres',
      indiceProtection: 'IP66 / IK10',
      dimensions: 'Double tête 2x (380x280mm) + Panneau 1650x990mm',
      garantie: '5 ans',
      certifications: ['CE', 'RoHS', 'ISO 9001']
    },
    variantesDisponibles: [
      { modele: 'Helios-150W', puissance: '150W', lentillesOuOptique: 'Double projecteur 2x 75W', dimensions: 'Panneau 240Wc | Batterie 1228Wh', fluxLumineux: '22 500 LM', hauteurMat: '7-9m' },
      { modele: 'Helios-200W', puissance: '200W', lentillesOuOptique: 'Double projecteur 2x 100W', dimensions: 'Panneau 300Wc | Batterie 1536Wh', fluxLumineux: '30 000 LM', hauteurMat: '8-10m' },
      { modele: 'Helios-300W', puissance: '300W', lentillesOuOptique: 'Triple projecteur 3x 100W', dimensions: 'Panneau 450Wc | Batterie 2304Wh', fluxLumineux: '45 000 LM', hauteurMat: '9-12m' }
    ],
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-eps-02',
    reference: 'DEB-SL-150-SPLIT',
    nom: 'Lampadaire Solaire Split 150W Haute Puissance Autoroute',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires solaires à panneau séparé',
    applications: ['Lampadaires solaires à panneau séparé', 'Routes et autoroutes'],
    descriptionCourte: 'Système à panneau orientable séparé pour autoroutes, grands boulevards et zones industrielles à fort trafic.',
    descriptionDetaillee: 'Conception deux-corps permettant d’orienter le panneau plein Sud à l’angle optimal pour maximiser la captation solaire en zone tropicale. Bloc optique asymétrique Batwing pour éviter les zones d’ombre entre les candélabres espacés jusqu’à 35 mètres. Batterie LiFePO4 logée dans un caisson ventilé au pied ou en tête de mât.',
    prixFCFA: 320000,
    estSurDevis: true,
    stockDisponible: 30,
    delaiLivraisonJours: 5,
    imagePrincipale: './images/hero_diarra_solar_1791734623148.jpg',
    specs: {
      puissance: '150W LED Bridgelux',
      fluxLumineux: '24 000 Lumens',
      panneauSolaire: 'Bi-verre Monocristallin 200Wc',
      batterieType: 'LiFePO4 rackable avec BMS intelligent',
      batterieCapacite: '25.6V / 60Ah (1536Wh)',
      autonomie: '4 nuits garanties sans ensoleillement',
      hauteurMat: '8 à 10 mètres',
      indiceProtection: 'IP67 / IK10',
      garantie: '5 ans',
      certifications: ['CE', 'IEC 61215', 'IEC 62133']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-eps-03',
    reference: 'DEB-MAT-OCTA-8M',
    nom: 'Mât Octogonal Galvanisé à Chaud 8m avec Crosse et Semelle',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Mâts, supports et accessoires',
    applications: ['Mâts, supports et accessoires', 'Routes et autoroutes', 'Rues, villages et collectivités'],
    descriptionCourte: 'Mât candélabre en acier galvanisé à chaud selon norme EN ISO 1461, résistant aux vents côtiers et à la corrosion saline.',
    descriptionDetaillee: 'Mât conique octogonal en tôle d’acier de 4mm d’épaisseur, galvanisation intégrale intérieure et extérieure 85 microns. Livré avec platine d’ancrage renforcée 300x300mm, 4 tiges de scellement M20 et crosse simple ou double 1.5m d’avancée avec inclinaison 15°.',
    prixFCFA: 245000,
    estSurDevis: false,
    stockDisponible: 45,
    delaiLivraisonJours: 4,
    imagePrincipale: './images/product_lampadaire_solaire_1791734634193.jpg',
    specs: {
      puissance: 'Supporte luminaire jusqu’à 30kg + panneau 300Wc',
      hauteurMat: '8.00 mètres hors-sol',
      indiceProtection: 'Galvanisation EN ISO 1461 (Anti-corrosion C5)',
      garantie: '10 ans anti-corrosion'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },
  {
    id: 'deb-eps-09',
    reference: 'DEB-MAT-SOLAR-PRO-9M',
    nom: 'Mât Candélabre Conique 9M Galvanisé avec Étrier Panneau Solaire & Crosse',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Mâts, supports et accessoires',
    applications: ['Mâts, supports et accessoires', 'Routes et autoroutes', 'Rues, villages et collectivités', 'Parkings et espaces industriels'],
    descriptionCourte: 'Mât candélabre conique 9m en acier Q235/Q345 galvanisé à chaud selon norme EN ISO 1461, étrier orientable pour panneau solaire et crosse Φ60mm.',
    descriptionDetaillee: 'Mât candélabre conique en acier haute résistance Q235/Q345 galvanisé à chaud selon la norme EN ISO 1461 (épaisseur 3.5mm à 4mm, résistance aux vents cycloniques jusqu’à 160 km/h). Livré avec étrier supérieur universel orientable à 15°-30° pour panneau solaire 80Wc à 400Wc, crosse simple ou double d’avancée 1.2m avec manchon Φ60mm, platine d’ancrage renforcée 350x350x18mm et jeu complet de 4 tiges de scellement J-bolts M20 avec gabarit béton.',
    prixFCFA: 275000,
    estSurDevis: false,
    stockDisponible: 38,
    delaiLivraisonJours: 4,
    imagePrincipale: './images/product_lampadaire_solaire_1791734634193.jpg',
    specs: {
      puissance: 'Supporte luminaire jusqu’à 35 kg + panneau solaire 400Wc',
      hauteurMat: '9.00 mètres hors-sol (conique octogonal)',
      indiceProtection: 'Galvanisation EN ISO 1461 (Anti-corrosion marine C5-M)',
      dimensions: 'Base Φ190mm / Sommet Φ76mm, épaisseur acier 3.75mm, platine 350×350×18mm',
      garantie: '10 ans anti-corrosion',
      certifications: ['EN ISO 1461', 'CE', 'ISO 9001']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },
  {
    id: 'deb-eps-10',
    reference: 'DEB-SERV-SOLAR-POSE-MAINT',
    nom: 'Prestation Clé en Main : Étude, Fourniture, Pose & Maintenance Solaire',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Prestations de fourniture, de pose et de maintenance',
    applications: ['Prestations, pose et maintenance', 'Routes et autoroutes', 'Rues, villages et collectivités', 'Parkings et espaces industriels'],
    descriptionCourte: 'Service complet d’ingénierie, pose sur camion-nacelle, massif béton, mise en service et contrat de maintenance préventive semestrielle.',
    descriptionDetaillee: 'DIARRA ENERGIE & BUSINESS déploie ses équipes mobiles de techniciens habilités équipés de camions-nacelles pour la réalisation intégrale de vos chantiers d’éclairage public solaire : implantation photométrique Dialux, fouille et coulage du massif béton avec gabarit de scellement, érection et calage du mât candélabre, orientation azimutale/zénithale optimale du panneau solaire plein Sud, raccordement sécurisé du régulateur MPPT, essais nocturnes et contrat de maintenance préventive (dépoussiérage et lavage semestriel des panneaux solaires, contrôle d’impédance des batteries LiFePO4, remplacement de pièces sous garantie).',
    prixFCFA: 45000,
    estSurDevis: true,
    stockDisponible: 999,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/service_pose_maintenance_1791894634261.jpg',
    specs: {
      puissance: 'Prise en charge de 1 à 5 000+ candélabres solaires',
      hauteurMat: 'Intervention sur mâts de 3m à 15m avec camion-nacelle',
      garantie: 'Garantie décennale travaux & astreinte technique 7j/7',
      certifications: ['Habilitation Électrique B2T / BR', 'Norme NFC 17-200 Voirie', 'ISO 9001']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },

  // 2. ÉCLAIRAGE PUBLIC ÉLECTRIQUE & LED (7 Sous-Catégories Spécifiques)
  // 2.1 Les lampadaires électriques
  {
    id: 'deb-elec-lp-01',
    reference: 'DEB-LP-ELEC-URBAN-150',
    nom: 'Lampadaire Électrique Urbain Complet LED 150W Réseau (Mât Octogonal 8m + Crosse + Luminaire)',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les lampadaires électriques',
    applications: ['Les lampadaires électriques', 'Voirie urbaine', 'Avenues communales', 'Boulevards'],
    descriptionCourte: 'Ensemble candélabre complet raccordé au réseau BT conventionnel (Senelec/SBEE/EDM), mât octogonal 8m galvanisé à chaud, crosse stylisée et luminaire LED 150W haute efficacité 160 lm/W.',
    descriptionDetaillee: 'Candélabre complet d’éclairage public routier et urbain raccordé au réseau électrique conventionnel. Conforme aux normes CE, EN 13201 (classes M2/M3) et NF C 17-200. Il intègre un mât conique octogonal en acier Q235 galvanisé à chaud 85µm (EN ISO 1461), une crosse tubulaire cintrée Ø60mm avancée 1.5m, et un luminaire LED professionnel avec driver Philips Xitanium programmable 1-10V / DALI et protection renforcée contre les surtensions.',
    prixFCFA: 345000,
    estSurDevis: false,
    stockDisponible: 64,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_lampadaire_electrique_1791969743726.jpg',
    specs: {
      puissance: '150W LED (Remplacement direct Sodium 250W/400W)',
      fluxLumineux: '24 000 Lumens (Efficacité 160 lm/W)',
      tensionFonctionnement: '100 - 277V AC / 50-60Hz',
      hauteurMat: '8.00 mètres hors-sol (Octogonal galvanisé à chaud)',
      indiceProtection: 'IP66 / IK09 / Résistance brouillard salin 1 000h',
      dimensions: 'Hauteur 8m, semelle 300×300×16mm, entraxe scellement 200×200mm M20',
      garantie: '5 ans constructeur pièces et main d’œuvre',
      certifications: ['CE', 'EN 13201', 'NF C 17-200', 'ENEC', 'RoHS'],
      caracteristiquesElectriques: {
        tensionAlimentation: '220 - 240V AC monophasé / 380 - 415V triphasé',
        frequence: '50 Hz / 60 Hz nominal',
        facteurPuissance: 'Cos φ > 0.97 à pleine charge',
        classeIsolation: 'Classe I avec borne de terre intégrée (Option Classe II)',
        protectionSurtension: 'Parafoudre SPD 10kV / 10kA (Protection onde foudre 8/20µs)',
        driverOuAlimentation: 'Philips Xitanium Full Xi FP programmable DALI / Dynadimmer',
        distorsionHarmonique: 'THD < 8% conforme IEC 61000-3-2',
        temperatureCouleur: '4000K Blanc Neutre (IRC > 75)',
        rendementLumineux: '160 Lumens / Watt'
      },
      conditionsInstallation: [
        'Implantation sur massif béton armé C25/30 de dimensions minimales 0.80 × 0.80 × 1.20 m',
        'Scellement via gabarit d’ancrage et 4 tiges filetées J-bolts M20 en acier galvanisé',
        'Fixation luminaire sur embout de crosse standard Ø60mm avec réglage d’angle de -15° à +15°',
        'Entraxe d’implantation conseillé : 28 à 35 mètres pour un éclairement moyen uniforme > 20 Lux',
        'Raccordement d’alimentation via câble cuivre armé U-1000 R2V 3G2.5mm² jusqu’au coffret de pied de mât',
        'Mise à la terre obligatoire du fût avec piquet cuivre Ø16mm (résistance R < 10 Ohms)'
      ],
      garantieDetails: 'Garantie intégrale usine de 5 ans couvrant les modules LED Lumileds/Bridgelux, le driver électronique Philips et le traitement anti-corrosion du mât (garantie anti-corrosion 10 ans). Disponibilité des pièces de rechange assurée pendant 10 ans par DIARRA ENERGIE.',
      prixApplicables: 'Prix unitaire catalogue : 345 000 FCFA TTC. Tarification préférentielle pour collectivités locales et marchés publics : -8% dès 15 unités, -12% dès 50 unités. Possibilité de facturation hors taxes (HT) pour projets sous convention de financement bailleurs (BOAD, BAD, KfW).'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-elec-lp-02',
    reference: 'DEB-LP-ELEC-AVENUE-200',
    nom: 'Candélabre Électrique Double Crosse Voies Rapides LED 2×100W (Mât 9m)',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les lampadaires électriques',
    applications: ['Les lampadaires électriques', 'Terre-plein central', 'Boulevards 4 voies', 'Grandes artères'],
    descriptionCourte: 'Candélabre d’éclairage bilatéral pour terre-plein central et boulevards urbains à chaussées séparées, mât conique 9m et double luminaire LED orientable.',
    descriptionDetaillee: 'Solution d’excellence pour l’éclairage simultané des deux sens de circulation sur les axes à fort trafic (VRD, autoroutes urbaines, rocades). Mât conique en acier haute limite élastique galvanisé à chaud, équipé d’une double crosse symétrique à portée 1.5m de chaque côté, supportant deux luminaires LED 100W à optique asymétrique routière Type II.',
    prixFCFA: 490000,
    estSurDevis: false,
    stockDisponible: 30,
    delaiLivraisonJours: 4,
    imagePrincipale: './images/product_lampadaire_electrique_1791969743726.jpg',
    specs: {
      puissance: '200W Total (2× 100W LED)',
      fluxLumineux: '32 000 Lumens (2× 16 000 lm)',
      tensionFonctionnement: '100 - 277V AC / 50-60Hz',
      hauteurMat: '9.00 mètres hors-sol',
      indiceProtection: 'IP66 / IK09 / Parafoudre 10kV',
      garantie: '5 ans constructeur',
      certifications: ['CE', 'ENEC', 'NF C 17-200'],
      caracteristiquesElectriques: {
        tensionAlimentation: '230V AC monophasé ou 400V triphasé (1 luminaire par phase)',
        frequence: '50-60 Hz',
        facteurPuissance: 'Cos φ > 0.98',
        classeIsolation: 'Classe I',
        protectionSurtension: 'Double parafoudre 10kV / 10kA indépendant par tête',
        driverOuAlimentation: 'Inventronics EUM Series programmable gradable',
        distorsionHarmonique: 'THD < 7%'
      },
      conditionsInstallation: [
        'Implantation axiale sur terre-plein central sur socle béton armé 1.00 × 1.00 × 1.30 m',
        'Double crosse Ø60mm orientée perpendiculairement aux voies de circulation',
        'Entraxe recommandé : 32 à 40 mètres entre mâts',
        'Boîte de dérivation étanche de pied de mât avec 2 coupe-circuits individuels'
      ],
      garantieDetails: 'Garantie de 5 ans pièces et main d’œuvre. Mât garanti 10 ans contre toute perforation corrosive.',
      prixApplicables: 'Prix unitaire catalogue : 490 000 FCFA TTC. Remise marché public de 10% à partir de 10 candélabres.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 2.2 Les luminaires LED pour routes et rues
  {
    id: 'deb-elec-lum-01',
    reference: 'DEB-LUM-VOIRIE-120',
    nom: 'Luminaire LED de Voirie Haute Performance 120W (Remplacement Sodium 250W)',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les luminaires LED pour routes et rues',
    applications: ['Les luminaires LED pour routes et rues', 'Rues et voies communales', 'Zones résidentielles'],
    descriptionCourte: 'Luminaire de voirie en aluminium injecté à ailettes de refroidissement passif, photométrie Batwing routière anti-éblouissement (G*3/D*6).',
    descriptionDetaillee: 'Luminaire LED haute performance pour l’équipement des réseaux communaux et interurbains. Équipé de puces LED Philips Lumileds Luxeon 5050 et d’une lentille optique en PMMA traité anti-UV assurant une répartition photométrique homogène sans zone d’ombre. Ouverture sans outil par clips inox pour une maintenance sécurisée depuis nacelle.',
    prixFCFA: 89000,
    estSurDevis: false,
    stockDisponible: 140,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_lampadaire_electrique_1791969743726.jpg',
    specs: {
      puissance: '120W LED',
      fluxLumineux: '19 200 Lumens (160 lm/W)',
      tensionFonctionnement: '90 - 305V AC / 50-60Hz',
      hauteurMat: '6 à 9 mètres',
      indiceProtection: 'IP66 / IK09',
      garantie: '5 ans constructeur',
      certifications: ['CE', 'CB', 'ENEC', 'TÜV Rheinland'],
      caracteristiquesElectriques: {
        tensionAlimentation: '100 - 277V AC universel',
        frequence: '50/60 Hz',
        facteurPuissance: 'PF > 0.96',
        classeIsolation: 'Classe I / Classe II sélectionnable',
        protectionSurtension: 'Parafoudre intégré 10kV / 10kA (Option 20kV)',
        driverOuAlimentation: 'MeanWell HLG / Inventronics EUM haute fiabilité',
        distorsionHarmonique: 'THD < 10%',
        rendementLumineux: '160 lm/W'
      },
      conditionsInstallation: [
        'Fixation sur embout de mât ou crosse Ø48mm, Ø60mm ou Ø76mm avec adaptateur réversible',
        'Inclinaison réglable par pas de 5° de -15° à +15° en position latérale ou sommitale',
        'Raccordement direct sur bornier automatique sans dénudage d’outil',
        'Section de câble acceptée : 3G1.5mm² à 3G2.5mm²'
      ],
      garantieDetails: 'Garantie totale de 5 ans sur l’ensemble optique et électronique.',
      prixApplicables: '89 000 FCFA TTC l’unité. Tarif carton de 4 pièces : 340 000 FCFA TTC. Tarif palette de 60 pièces : 4 800 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-elec-lum-02',
    reference: 'DEB-LUM-HIGHWAY-240',
    nom: 'Luminaire LED Autoroutes & Voies Express 240W Optique Asymétrique M1/M2',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les luminaires LED pour routes et rues',
    applications: ['Les luminaires LED pour routes et rues', 'Autoroutes', 'Pénétrantes urbaines', 'Voies rapides'],
    descriptionCourte: 'Luminaire grande puissance pour autoroutes et voies rapides à 110/130 km/h, flux puissant 38 400 lm avec parafoudre 20kV.',
    descriptionDetaillee: 'Conçu pour satisfaire aux critères photométriques les plus stricts de la norme EN 13201 classe M1 et M2 (luminance moyenne Lm > 2.0 cd/m², uniformité globale Uo > 0.40). Châssis en aluminium à double chambre isolant le compartiment thermique LED du compartiment appareillage électrique.',
    prixFCFA: 175000,
    estSurDevis: false,
    stockDisponible: 45,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_lampadaire_electrique_1791969743726.jpg',
    specs: {
      puissance: '240W LED',
      fluxLumineux: '38 400 Lumens',
      tensionFonctionnement: '100 - 277V AC / 50-60Hz',
      hauteurMat: '10 à 14 mètres',
      indiceProtection: 'IP67 / IK10',
      garantie: '5 ans constructeur',
      certifications: ['CE', 'ENEC', 'ISO 9001'],
      caracteristiquesElectriques: {
        tensionAlimentation: '220 - 240V AC / 380V AC',
        frequence: '50-60 Hz',
        facteurPuissance: 'Cos φ > 0.98',
        classeIsolation: 'Classe I',
        protectionSurtension: 'Module SPD haute capacité 20kV / 20kA',
        driverOuAlimentation: 'Philips Xitanium Xi FP 240W DALI 2.0',
        distorsionHarmonique: 'THD < 6%'
      },
      conditionsInstallation: [
        'Installation sur mâts de grande hauteur (10m à 14m) avec crosse avancée 2.0m',
        'Embout d’emmanchement renforcé Ø60mm serré par 4 boulons inox A4-70',
        'Entraxe d’implantation conseillé : 38 à 48 mètres',
        'Section câble recommandée : 3G2.5mm²'
      ],
      garantieDetails: 'Garantie 5 ans complète pièces et main d’œuvre avec échange standard sous 48h.',
      prixApplicables: 'Prix unitaire : 175 000 FCFA TTC. Remise collectivité de 10% au-delà de 20 unités.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 2.3 Les projecteurs LED extérieurs et industriels
  {
    id: 'deb-elec-proj-01',
    reference: 'DEB-PROJ-IND-300',
    nom: 'Projecteur LED Industriel 300W IP67 Stades, Carrefours & Zones Logistiques',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les projecteurs LED extérieurs et industriels',
    applications: ['Les projecteurs LED extérieurs et industriels', 'Stades municipaux', 'Carrefours', 'Aires logistiques'],
    descriptionCourte: 'Projecteur orientable haute puissance 48 000 Lumens pour arènes de lutte, terrains multisports, carrefours giratoires et parcs de stockage.',
    descriptionDetaillee: 'Projecteur extérieur et industriel lourd conçu pour résister aux environnements les plus sévères (poussière d’harmattan, humidité équatoriale, chaleur > 50°C). Châssis en fonte d’aluminium anodisé noir avec ailettes de refroidissement par convection naturelle, verre trempé prismatique 5mm résistant aux impacts mécaniques IK10 et étrier de fixation gradué à 180°.',
    prixFCFA: 195000,
    estSurDevis: false,
    stockDisponible: 55,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_projecteur_led_indus_1791969759701.jpg',
    specs: {
      puissance: '300W LED Cree / Bridgelux',
      fluxLumineux: '48 000 Lumens (160 lm/W)',
      tensionFonctionnement: '100 - 277V AC / 50-60Hz',
      indiceProtection: 'IP67 étanche submersion temporaire / IK10 anti-vandalisme',
      garantie: '5 ans constructeur',
      certifications: ['CE', 'RoHS', 'TÜV', 'IEC 60598'],
      caracteristiquesElectriques: {
        tensionAlimentation: '100 - 277V AC monophasé',
        frequence: '50-60 Hz',
        facteurPuissance: 'Cos φ > 0.96',
        classeIsolation: 'Classe I',
        protectionSurtension: 'Parafoudre intégré 10kV / 10kA',
        driverOuAlimentation: 'MeanWell HLG-320C étanche résiné IP67',
        distorsionHarmonique: 'THD < 10%',
        temperatureCouleur: '5000K Blanc Pur Daylight'
      },
      conditionsInstallation: [
        'Montage sur traverse de mât, potence murale ou charpente métallique via étrier acier 6mm',
        'Réglage angulaire au degré près grâce à l’échelle graduée gravée au laser',
        'Raccordement étanche via boîte de dérivation IP68 fournie',
        'Câble d’alimentation néoprène H07RN-F 3G1.5mm² longueur 1.5m pré-raccordé'
      ],
      garantieDetails: 'Garantie constructeur de 5 ans sur l’électronique et le corps étanche.',
      prixApplicables: 'Prix unitaire catalogue : 195 000 FCFA TTC. Tarif lot de 8 projecteurs (équipement complet terrain multisport) : 1 450 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-elec-proj-02',
    reference: 'DEB-PROJ-PORT-600',
    nom: 'Projecteur Grande Aire LED 600W Quais Portuaires, Dépôts & Chantiers BTP',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les projecteurs LED extérieurs et industriels',
    applications: ['Les projecteurs LED extérieurs et industriels', 'Zones portuaires', 'Aéroports', 'Chantiers BTP'],
    descriptionCourte: 'Projecteur grande aire modulaire 600W (96 000 Lumens) pour mâts grande hauteur de 15m à 30m, faisceau étroit ou large longue portée.',
    descriptionDetaillee: 'Projecteur haute performance pour l’illumination de très grands espaces ouverts : terminaux à conteneurs du Port Autonome de Dakar (PAD) ou de Cotonou (PAC), carrières minières et plateformes pétrolières côtières. 4 modules indépendants orientables individuellement, traitement anti-corrosion marine C5-M.',
    prixFCFA: 385000,
    estSurDevis: false,
    stockDisponible: 22,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_projecteur_led_indus_1791969759701.jpg',
    specs: {
      puissance: '600W LED modulaire',
      fluxLumineux: '96 000 Lumens',
      tensionFonctionnement: '180 - 440V AC / 50-60Hz',
      hauteurMat: '15 à 30 mètres (Couronnes mobiles de grands mâts)',
      indiceProtection: 'IP67 / IK10 / Anti-corrosion C5-M',
      garantie: '5 ans constructeur',
      certifications: ['CE', 'IEC 60598-2-5', 'ISO 9001'],
      caracteristiquesElectriques: {
        tensionAlimentation: '220 - 240V monophasé ou 380 - 415V triphasé',
        frequence: '50-60 Hz',
        facteurPuissance: 'Cos φ > 0.98',
        classeIsolation: 'Classe I',
        protectionSurtension: 'Protection surtension foudre 20kV',
        driverOuAlimentation: 'Double driver Inventronics programmable',
        distorsionHarmonique: 'THD < 6%'
      },
      conditionsInstallation: [
        'Installation sur herse ou couronne mobile de mât grande hauteur (15m à 30m)',
        'Visserie 100% acier inoxydable nuance A4-80 résistant aux embruns marins',
        'Étude photométrique 3D Dialux offerte sur plan de masse',
        'Prise de terre renforcée par câblette cuivre nu 29mm²'
      ],
      garantieDetails: 'Garantie intégrale de 5 ans avec assistance technique sur site.',
      prixApplicables: 'Prix unitaire catalogue : 385 000 FCFA TTC. Étude d’implantation et remises de volume sur devis personnalisé.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 2.4 Les mâts et accessoires
  {
    id: 'deb-elec-mat-01',
    reference: 'DEB-MAT-OCTA-ELEC-9M',
    nom: 'Mât Candélabre Octogonal Galvanisé à Chaud 9m avec Trappe & Crosse Simple',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les mâts et accessoires',
    applications: ['Les mâts et accessoires', 'Support d’éclairage public', 'Voiries et carrefours'],
    descriptionCourte: 'Mât candélabre conique octogonal 9m en acier S235/S355JR galvanisé à chaud selon EN ISO 1461, porte de visite étanche avec platine appareillage.',
    descriptionDetaillee: 'Mât d’éclairage public routier fabriqué en tôle d’acier de 4mm pliée et soudée longitudinalement sans discontinuité. Traitement de galvanisation intégrale par bain de zinc en fusion à 450°C (épaisseur de zinc minimale 85 microns, durée de vie supérieure à 30 ans). Équipé d’une trappe de visite affleurante 400×85mm avec fermeture par vis inviolable triangulaire, rail DIN interne pour fixation de la boîte de dérivation et crosse simple 1.5m avancée Ø60mm.',
    prixFCFA: 235000,
    estSurDevis: false,
    stockDisponible: 40,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_lampadaire_solaire_1791734634193.jpg',
    specs: {
      puissance: 'Charge utile admissible : luminaire jusqu’à 40 kg à vent extrême 160 km/h',
      hauteurMat: '9.00 mètres hors-sol (base Ø185mm / sommet Ø60mm)',
      dimensions: 'Platine d’ancrage 350×350×18mm, entraxe 250×250mm, 4 perçages Ø24mm',
      indiceProtection: 'Galvanisation EN ISO 1461 (Classe de corrosivité atmosphérique C4/C5)',
      garantie: '10 ans anti-corrosion',
      certifications: ['EN 40-5', 'EN ISO 1461', 'CE'],
      caracteristiquesElectriques: {
        classeIsolation: 'Classe I avec borne de terre cuivre M10 soudée à l’intérieur du fût',
        tensionAlimentation: 'Supporte câbles BT jusqu’à 4×25mm²',
        protectionSurtension: 'Équipotentialité totale du fût métallique'
      },
      conditionsInstallation: [
        'Massif de fondation béton armé 0.90 × 0.90 × 1.30 m dosé à 350 kg/m³',
        'Jeu de 4 tiges d’ancrage filetées M20 longueur 700mm en acier haute résistance 8.8 avec gabarit',
        'Serrage des écrous et contre-écrous au couple prescrit de 280 Nm',
        'Fourreau d’entrée des câbles TPC rouge Ø90mm centré dans le massif béton'
      ],
      garantieDetails: 'Garantie décennale de 10 ans contre toute perforation due à la corrosion.',
      prixApplicables: 'Prix unitaire catalogue : 235 000 FCFA TTC livré avec platine, crosse et tiges d’ancrage. Tarif dégressif -10% dès 20 mâts.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },
  {
    id: 'deb-elec-mat-02',
    reference: 'DEB-ACC-CROSSE-M20',
    nom: 'Crosses Stylisées Simples & Doubles Ø60mm & Gabarit d’Ancrage Tiges M20',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les mâts et accessoires',
    applications: ['Les mâts et accessoires', 'Accessoires de candélabres', 'Ferronnerie de voirie'],
    descriptionCourte: 'Ensemble complet d’accessoires pour candélabres : crosses cintrées simples ou doubles en acier galvanisé Ø60mm et kits de scellement avec gabarit acier.',
    descriptionDetaillee: 'Gamme complète d’accessoires mécaniques de voirie : crosses simples d’avancée 1.0m, 1.5m et 2.0m, crosses doubles papillon pour terre-plein central, réhausses droites, embouts de pénétration Ø60/76mm et gabarits de ferraillage avec 4 tiges J-bolts M20/M24 zinguées avec rondelles larges et doubles écrous.',
    prixFCFA: 65000,
    estSurDevis: false,
    stockDisponible: 90,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_split_pole_1791891587682.jpg',
    specs: {
      puissance: 'Résistance mécanique certifiée selon EN 40',
      hauteurMat: 'Adaptable sur tous mâts Ø60mm et Ø76mm',
      garantie: '10 ans anti-corrosion',
      certifications: ['EN ISO 1461', 'CE'],
      conditionsInstallation: [
        'Emmanchement sommital sur mât avec serrage par 3 vis de pression inox M10',
        'Passage intérieur de câble sans arête tranchante pour préserver l’isolant'
      ],
      garantieDetails: 'Garantie anti-corrosion 10 ans en environnement tropical et côtier.',
      prixApplicables: 'Crosse simple 1.5m : 65 000 FCFA TTC. Crosse double 1.5m : 110 000 FCFA TTC. Kit tiges scellement M20 complet : 35 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 2.5 Les armoires électriques et dispositifs de commande
  {
    id: 'deb-elec-arm-01',
    reference: 'DEB-ARM-ELEC-EP-63A',
    nom: 'Armoire de Commande d’Éclairage Public 63A avec Horloge Astronomique & Parafoudre Type 1+2',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les armoires électriques et dispositifs de commande',
    applications: ['Les armoires électriques et dispositifs de commande', 'Pilotage éclairage public', 'Armoire de voirie IP65'],
    descriptionCourte: 'Armoire de distribution et de télégestion d’éclairage public 63A triphasée, enveloppe polyester armé fibre de verre IP65/IK10, programmateur astronomique hebdomadaire.',
    descriptionDetaillee: 'Armoire de commande extérieure conçue selon la norme NF C 17-200 pour le pilotage automatique et la protection de départs d’éclairage public (jusqu’à 80 candélabres LED). Elle comprend un interrupteur sectionneur général tétrapolaire 63A avec plastron cadenassable, un parafoudre modulaire Type 1+2 débrochable 40kA, un contacteur tétrapolaire Schneider TeSys, une horloge astronomique programmable à coordonnées GPS locales (lever/coucher du soleil automatique) et un relais crépusculaire avec cellule étanche déportée.',
    prixFCFA: 590000,
    estSurDevis: false,
    stockDisponible: 16,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_armoire_electrique_1791969776063.jpg',
    specs: {
      puissance: 'Calibre 63A Triphasé 400V (Puissance commutable jusqu’à 43 kVA)',
      dimensions: 'Enveloppe 800 × 600 × 300 mm avec socle béton ou polyester 300mm',
      indiceProtection: 'IP65 étanche aux intempéries / IK10 anti-vandalisme',
      garantie: '5 ans constructeur',
      certifications: ['NF C 17-200', 'IEC 61439-1/2', 'CE', 'Conforme cahier des charges Senelec / SBEE'],
      caracteristiquesElectriques: {
        tensionAlimentation: '400V Triphasé + Neutre + Terre (3P+N+PE)',
        frequence: '50 Hz',
        facteurPuissance: 'Compatible Cos φ 0.8 à 1.0',
        classeIsolation: 'Classe II avec plastronnage isolant total',
        protectionSurtension: 'Parafoudre Type 1+2 Imax 40kA / Up 1.5kV avec disjoncteur associé',
        driverOuAlimentation: 'Contacteur Schneider Electric TeSys D 65A AC-3 bobine 230V',
        distorsionHarmonique: 'Tenue aux courants d’appel d’allumage LED inrush 120A'
      },
      conditionsInstallation: [
        'Pose en voirie sur socle maçonné ou embase polyester enfouie 40cm dans le sol',
        'Raccordement amont sur réseau concessionnaire (Senelec/SBEE) avec coupe-circuit général',
        'Départs protégés par 4 disjoncteurs magnétothermiques différentiels 16A 30mA Courbe C',
        'Mise à la terre de l’armoire avec boucle de fond de fouille ou 2 piquets cuivre (R < 5 Ohms)'
      ],
      garantieDetails: 'Garantie 5 ans pièces et main d’œuvre sur l’ensemble de l’appareillage modulaire Schneider/Legrand.',
      prixApplicables: 'Prix catalogue : 590 000 FCFA TTC entièrement câblée en usine avec schéma unifilaire plastifié. Option module de télégestion GSM/4G pour suivi à distance : +120 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-elec-arm-02',
    reference: 'DEB-COMM-CELL-CREP-PRO',
    nom: 'Cellule Photoélectrique Crépusculaire Étanche IP65 avec Relais Temporisé Anti-Éclair',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les armoires électriques et dispositifs de commande',
    applications: ['Les armoires électriques et dispositifs de commande', 'Commande crépusculaire', 'Économie d’énergie'],
    descriptionCourte: 'Dispositif de détection crépusculaire étanche avec cellule orientable, seuil réglable de 2 à 200 Lux et temporisation anti-parasite contre les phares de véhicules.',
    descriptionDetaillee: 'Capteur crépusculaire professionnel pour l’allumage et l’extinction automatique des réseaux d’éclairage public et des projecteurs industriels selon le niveau de luminosité naturelle. Filtre électronique anti-clignotement et temporisation de 30 secondes éliminant les commutations intempestives causées par les éclairs d’orage ou les phares de camions.',
    prixFCFA: 35000,
    estSurDevis: false,
    stockDisponible: 85,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_armoire_electrique_1791969776063.jpg',
    specs: {
      puissance: 'Pouvoir de coupure 16A / 250V AC (jusqu’à 3 000W LED)',
      tensionFonctionnement: '220 - 240V AC / 50-60Hz',
      indiceProtection: 'IP65 boîtier étanche traité anti-UV',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'RoHS', 'EN 60669-2-1'],
      caracteristiquesElectriques: {
        tensionAlimentation: '230V AC ± 10%',
        frequence: '50-60 Hz',
        facteurPuissance: 'Consommation veille < 0.8W',
        classeIsolation: 'Classe II',
        protectionSurtension: 'Varistance intégrée 4kV'
      },
      conditionsInstallation: [
        'Montage en façade Nord ou sur candélabre à l’abri de la lumière directe des luminaires',
        'Réglage du seuil de déclenchement recommandé à 20-30 Lux pour l’Afrique de l’Ouest',
        'Presse-étoupe M16 étanche pour câble 3G1.5mm²'
      ],
      garantieDetails: 'Garantie de 3 ans avec remplacement immédiat en cas de défaillance.',
      prixApplicables: 'Prix unitaire : 35 000 FCFA TTC. Lot de 10 cellules : 300 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 2.6 Les câbles et accessoires de raccordement
  {
    id: 'deb-elec-cab-01',
    reference: 'DEB-CAB-U1000-4X16',
    nom: 'Câble Armé Souterrain Cuivre U-1000 R2V 4×16mm² NF C 32-321 (Touret 100m)',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les câbles et accessoires de raccordement',
    applications: ['Les câbles et accessoires de raccordement', 'Alimentation souterraine candélabres', 'Réseau basse tension'],
    descriptionCourte: 'Câble d’énergie basse tension cuivre rigide 4 conducteurs 16mm² sous gaine PVC noire résistante aux hydrocarbures et aux rongeurs.',
    descriptionDetaillee: 'Câble normalisé de référence pour la pose en tranchée d’alimentation des réseaux communaux d’éclairage public et tertiaire. Conducteurs cuivre massif de classe 2, isolation polyéthylène réticulé (PR) résistant jusqu’à 90°C en service permanent, et gaine de protection extérieure épaisse PVC noir anti-UV adaptée aux sols latéritiques et sableux.',
    prixFCFA: 325000,
    estSurDevis: false,
    stockDisponible: 35,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_cables_raccordement_1791969809173.jpg',
    specs: {
      puissance: 'Intensité admissible : 98A enterré (Chute de tension < 3% sur 300m)',
      tensionFonctionnement: '0.6 / 1 kV (Tension d’essai 3 500V)',
      dimensions: 'Diamètre extérieur approximatif Ø22mm, touret de 100 mètres',
      indiceProtection: 'Gaine anti-UV, résistant à l’eau AD7 et aux agents chimiques',
      garantie: '10 ans constructeur',
      certifications: ['NF C 32-321', 'IEC 60502-1', 'CE'],
      caracteristiquesElectriques: {
        tensionAlimentation: 'Tension assignée Uo/U : 600V / 1000V AC',
        frequence: '50-60 Hz',
        facteurPuissance: 'Résistance linéique 1.15 Ohm/km à 20°C',
        classeIsolation: 'Isolation PR (XLPE) 90°C tenue aux surcharges'
      },
      conditionsInstallation: [
        'Pose en tranchée à 0.80m de profondeur sous trottoir et 1.00m sous chaussée',
        'Lit de sable meuble de 10cm sous et sur le câble avec grillage avertisseur rouge posé 20cm au-dessus',
        'Rayon de courbure minimal : 6 fois le diamètre extérieur du câble (135mm)',
        'Passage sous fourreaux annelés TPC rouge Ø75mm ou Ø90mm aux traversées de voirie'
      ],
      garantieDetails: 'Garantie constructeur de 10 ans sur la longévité de l’isolant.',
      prixApplicables: 'Touret de 100 mètres : 325 000 FCFA TTC (soit 3 250 FCFA/mètre). Touret de 500 mètres sur commande : 1 500 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },
  {
    id: 'deb-elec-cab-02',
    reference: 'DEB-ACC-DERIV-IP68',
    nom: 'Coffret Électrique de Pied de Mât IP68 avec Coupe-Circuit Fusible & Piquet de Terre Cuivre',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les câbles et accessoires de raccordement',
    applications: ['Les câbles et accessoires de raccordement', 'Raccordement pied de mât', 'Mise à la terre NF C 17-200'],
    descriptionCourte: 'Kit complet de dérivation et de protection individuelle pour candélabre : coffret étanche IP68, bornes de dérivation 4×16mm², coupe-circuit fusible 6A/10A et piquet de terre cuivre 1.5m.',
    descriptionDetaillee: 'Ensemble essentiel pour la sécurité électrique de chaque lampadaire selon la norme NF C 17-200. S’insère parfaitement dans la porte de visite du mât. Permet le repiquage étanche des câbles d’alimentation souterraine sans coupure de ligne et assure l’isolement individuel du luminaire en cas de court-circuit sans interrompre le reste de l’artère.',
    prixFCFA: 38000,
    estSurDevis: false,
    stockDisponible: 110,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_cables_raccordement_1791969809173.jpg',
    specs: {
      puissance: 'Bornier pour 2 ou 3 câbles 4×16mm² + départ luminaire 3×2.5mm²',
      indiceProtection: 'IP68 étanche immersion / IK08',
      garantie: '5 ans constructeur',
      certifications: ['NF C 17-200', 'CE', 'ISO 9001'],
      caracteristiquesElectriques: {
        tensionAlimentation: '230V / 400V AC',
        classeIsolation: 'Classe II avec capot isolant imperdable',
        protectionSurtension: 'Coupe-circuit modulaire porte-fusible gG 6A ou 10A taille 10×38'
      },
      conditionsInstallation: [
        'Fixation sur rail DIN à l’intérieur du mât à hauteur de la porte de visite (50cm du sol)',
        'Serrage des bornes au couple de 4 Nm avec clé dynamométrique',
        'Liaison du piquet de terre cuivre Ø16mm × 1.50m avec câblette cuivre nu 25mm² et cosse à serrage'
      ],
      garantieDetails: 'Garantie 5 ans contre tout défaut d’étanchéité ou échauffement.',
      prixApplicables: 'Prix du kit complet (coffret + fusibles + piquet de terre + connecteurs) : 38 000 FCFA TTC. Tarif carton de 20 kits : 700 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 2.7 Les prestations d’installation, de raccordement et de maintenance
  {
    id: 'deb-elec-serv-01',
    reference: 'DEB-SERV-ELEC-POSE-RACC',
    nom: 'Prestation Clé en Main : Génie Civil, Levage Candélabre, Raccordement Réseau Senelec/SBEE & Essais',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les prestations d’installation, de raccordement et de maintenance',
    applications: ['Les prestations d’installation, de raccordement et de maintenance', 'Travaux de voirie', 'Raccordement électrique concessionnaire'],
    descriptionCourte: 'Service complet d’installation d’éclairage public par nos techniciens habilités B2T/BR avec camions-nacelles, coulage de massifs, raccordement et procès-verbal de conformité.',
    descriptionDetaillee: 'DIARRA ENERGIE & BUSINESS prend en charge l’intégralité de la réalisation de vos chantiers d’éclairage public conventionnel au Sénégal, au Bénin et au Togo : piquetage topographique et note Dialux, terrassement et tranchée technique, coulage des massifs béton dosés avec gabarit de scellement, levage et réglage d’aplomb des candélabres par camion-nacelle 18m, tirage des câbles armés souterrains, raccordement dans les coffrets de pied de mât et armoire de commande, mise à la terre mesurée au telluromètre (< 10 Ohms), démarches de raccordement au poste Senelec / SBEE / CEET, et essais d’allumage nocturnes.',
    prixFCFA: 65000,
    estSurDevis: true,
    stockDisponible: 999,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/service_pose_maintenance_1791894634261.jpg',
    specs: {
      puissance: 'Déploiement de 5 à plus de 2 000 points lumineux',
      hauteurMat: 'Intervention jusqu’à 22 mètres de hauteur avec flotte de camions-nacelles',
      garantie: 'Garantie décennale travaux (10 ans) & attestation de conformité',
      certifications: ['Habilitation Électrique B2T / BR / H0V', 'Norme NF C 17-200 Voirie', 'ISO 9001 / ISO 14001'],
      caracteristiquesElectriques: {
        tensionAlimentation: 'Intervention sur réseaux Basse Tension 230/400V et Moyenne Tension HTA',
        protectionSurtension: 'Mesure de résistance de boucle et certificat d’équipotentialité'
      },
      conditionsInstallation: [
        'Balisage réglementaire de chantier et sécurité routière conformes au code de la route',
        'Contrôle géotechnique du sol avant coulage béton',
        'Présence permanente d’un chef de chantier ingénieur électricien',
        'Remise d’un dossier d’ouvrage exécuté (DOE) complet avec plans de recollement géo-référencés'
      ],
      garantieDetails: 'Assurance responsabilité civile décennale et garantie de parfait achèvement d’un an sur l’ensemble des travaux de pose.',
      prixApplicables: 'Forfait pose et raccordement à partir de 65 000 FCFA HT / point lumineux (hors fourniture mât et luminaire). Devis quantitatif personnalisé sous 48h selon métré linéaire et nature des sols.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-elec-serv-02',
    reference: 'DEB-SERV-ELEC-MAINT-247',
    nom: 'Contrat Annuel de Maintenance & Astreinte Réseau Éclairage Public (Dépannage 24/7 & Contrôle Semestriel)',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Les prestations d’installation, de raccordement et de maintenance',
    applications: ['Les prestations d’installation, de raccordement et de maintenance', 'Maintenance préventive', 'Astreinte communale'],
    descriptionCourte: 'Contrat de maintenance préventive et curative pour communes, aéroports, ports et zones industrielles, astreinte technique 24h/24 et 7j/7 avec délai d’intervention garanti sous 4h.',
    descriptionDetaillee: 'Offre d’exploitation déléguée pour garantir un taux de disponibilité supérieur à 98% de votre parc d’éclairage public : rondes de nuit mensuelles, nettoyage semestriel des vasques et luminaires LED, contrôle d’isolement et resserrage des connexions électriques, vérification de la valeur de terre des armoires et mâts, remplacement immédiat des sources lumineuses ou appareillages vandalisés, et astreinte d’urgence 24h/24 en cas d’accident ou de coupure générale sur artère prioritaire.',
    prixFCFA: 120000,
    estSurDevis: true,
    stockDisponible: 999,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/service_pose_maintenance_1791894634261.jpg',
    specs: {
      puissance: 'Prise en charge de réseaux de 50 à 10 000 candélabres',
      hauteurMat: 'Flotte nacelles légères et lourdes pour interventions rapides',
      garantie: 'Engagement de taux de disponibilité 98% pénalités incluses',
      certifications: ['ISO 9001', 'Agrément maintenance concessionnaire', 'Habilitation NFC 18-510'],
      caracteristiquesElectriques: {
        tensionAlimentation: 'Réseaux BT 230/400V monophasé et triphasé',
        frequence: '50 Hz'
      },
      conditionsInstallation: [
        'Audit initial contradictoire de l’état du réseau d’éclairage public avec inventaire numéroté',
        'Mise en place d’un numéro vert d’astreinte directe pour la police municipale et les services techniques',
        'Rapports d’intervention trimestriels détaillés avec indicateurs de performance (KPI)'
      ],
      garantieDetails: 'Engagement contractuel d’intervention sous 4 heures pour toute urgence sécuritaire (candélabre accidenté, câble arraché).',
      prixApplicables: 'Abonnement de maintenance préventive et curative à partir de 10 000 FCFA HT / candélabre / an selon la taille du parc. Formules adaptées aux budgets communaux votés.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 3. POMPES SOLAIRES & FORAGES (6 Sous-Catégories Spécifiques)
  // 3.1 Les pompes solaires immergées
  {
    id: 'deb-ps-imm-01',
    reference: 'DEB-PUMP-SUB-3HP',
    nom: 'Pompe Solaire Immergée Inox 304 2.2kW (3HP) HMT 120m Débit 18m³/h',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les pompes solaires immergées',
    applications: ['Les pompes solaires immergées', 'Forages profonds', 'Maraîchage villageois', 'AEP rurale'],
    descriptionCourte: 'Électropompe immergée submersible 4 pouces tout inox 304, variateur MPPT haute performance au fil du soleil sans batterie.',
    descriptionDetaillee: 'Solution de référence pour les forages profonds au Sénégal et en Afrique de l’Ouest. Équipée d’une turbine hélicoïdale ou centrifuge tout inox AISI 304 résistante aux sables fins (jusqu’à 150 g/m³). Moteur à bain d’huile alimentaire écologique. Fonctionne en connexion directe avec les panneaux solaires grâce au variateur MPPT à balayage rapide de courbe P-V.',
    prixFCFA: 980000,
    estSurDevis: false,
    stockDisponible: 22,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_pompe_solaire_1791734645113.jpg',
    specs: {
      puissance: '2.2 kW (3.0 CV / HP)',
      debitMax: '18 m³/h (Débit journalier : 70 à 110 m³/jour)',
      hmtMax: '120 mètres',
      profondeurImmersion: 'Recommandée entre 45m et 95m',
      tensionFonctionnement: '3× 230V / 380V AC ou 200-450V DC',
      indiceProtection: 'Pompe IP68 / Coffret de commande IP65',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'ISO 9001', 'IEC 60034-1', 'ACS Eau Potable'],
      specsPompage: {
        debitNominal: '12 m³/h à 75m HMT',
        debitMax: '18 m³/h',
        hauteurManometriqueTotale: '120 mètres max',
        profondeurInstallationRecommandee: '50 à 90 mètres de profondeur',
        puissanceMoteur: '2.2 kW / 3.0 HP (Moteur asynchrone triphasé à haut rendement IE3)',
        tensionAlimentation: '380V Triphasé via variateur solaire dédié',
        diametreForageMin: '4 pouces (DN 100 mm minimum)',
        diametreRefoulement: '2 pouces (DN 50 mm taraudé)',
        materiauCorps: 'Acier inoxydable AISI 304, diffuseurs et roues inox, clapets anti-retour intégrés',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '3 300 Wc (6 panneaux solaires 550Wc)',
          nombrePanneaux: '6 modules monocristallins half-cell 550Wc en série',
          tensionVocMax: '450V DC',
          plageMppt: '200V - 420V DC',
          technologieOnduleur: 'Variateur solaire MPPT Veichi / INVT avec détection automatique d’ensoleillement et arrêt sur niveau bas'
        },
        exemplesProjetsOuVillages: [
          'Village de Keur Momar Sarr (Région de Louga)',
          'Village de Touba Toul (Région de Thiès)',
          'Commune de Fimela (Région de Fatick)',
          'Localité de Sikasso (Mali)'
        ]
      },
      conditionsInstallation: [
        'Installation suspendue par câble de sécurité en acier inox Ø6mm avec serre-câbles inox',
        'Tuyau de refoulement PEHD semi-rigide PN16 avec raccords compression laiton/inox',
        'Câble d’alimentation submersible plat étanche 4G4mm² vulcanisé sous résine',
        'Sonde de niveau bas installée 2 mètres au-dessus du corps de pompe pour sécurité manque d’eau'
      ],
      garantieDetails: 'Garantie intégrale constructeur de 3 ans avec remplacement immédiat en cas de défaut d’usine. Atelier de maintenance et pièces détachées permanents à Dakar et Cotonou.',
      prixApplicables: 'Prix catalogue kit complet (pompe + variateur MPPT + sondes) : 980 000 FCFA TTC. Hors panneaux solaires et structure de pose.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-ps-imm-02',
    reference: 'DEB-PUMP-SUB-5.5HP',
    nom: 'Électropompe Submersible Solaire Forage Profond Inox 316 4.0kW (5.5HP) HMT 190m',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les pompes solaires immergées',
    applications: ['Les pompes solaires immergées', 'Forages très profonds', 'Hydraulique pastorale', 'Grands villages'],
    descriptionCourte: 'Pompe haute pression en acier inoxydable 316 résistant aux eaux agressives et salines, profondeur jusqu’à 180 mètres.',
    descriptionDetaillee: 'Conçue pour les forages d’adduction d’eau potable à grande profondeur et les nappes du Crétacé ou du Continental Terminal (Bassin arachidier, Ferlo, Sahel malien et nigérien). Moteur submersible rebobinable à haut rendement, résistant aux particules abrasives et aux températures d’eau jusqu’à 35°C.',
    prixFCFA: 1650000,
    estSurDevis: false,
    stockDisponible: 14,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_pompe_solaire_1791734645113.jpg',
    specs: {
      puissance: '4.0 kW (5.5 CV / HP)',
      debitMax: '24 m³/h (Débit journalier : 120 à 180 m³/jour)',
      hmtMax: '190 mètres',
      profondeurImmersion: 'Recommandée entre 80m et 160m',
      tensionFonctionnement: '3× 380V / 400V AC',
      indiceProtection: 'IP68 submersible 200m',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'ISO 9001', 'IEC 60034'],
      specsPompage: {
        debitNominal: '16 m³/h à 130m HMT',
        debitMax: '24 m³/h',
        hauteurManometriqueTotale: '190 mètres max',
        profondeurInstallationRecommandee: '90 à 150 mètres',
        puissanceMoteur: '4.0 kW / 5.5 HP triphasé 400V',
        tensionAlimentation: '380V - 415V AC triphasé',
        diametreForageMin: '4 pouces ou 6 pouces (DN 100 à 150 mm)',
        diametreRefoulement: '2 pouces 1/2 (DN 65 mm)',
        materiauCorps: 'Acier inoxydable AISI 316 spécial eaux corrosives & chemise d’aspiration inox',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '5 500 Wc (10 panneaux solaires 550Wc)',
          nombrePanneaux: '10 modules 550Wc (1 string de 10 panneaux)',
          tensionVocMax: '550V DC',
          plageMppt: '280V - 500V DC',
          technologieOnduleur: 'Variateur solaire MPPT triphasé IP65 avec écran LCD dynamique et communication RS485 Modbus'
        },
        exemplesProjetsOuVillages: [
          'Village pastoral de Dahra Djoloff (Sénégal)',
          'Forage communal d’Oussouye (Casamance, Sénégal)',
          'Localité de Tillabéri (Niger)',
          'Zone rurale de Kayes (Mali)'
        ]
      },
      conditionsInstallation: [
        'Tubage de forage d’au moins 4 pouces libre de tout obstacle',
        'Installation recommandée avec clapet de retenue intermédiaire tous les 50 mètres de colonne montante',
        'Mise à la terre de la tête de forage avec piquet cuivre et parafoudre parafoudre DC 1000V',
        'Protection contre la marche à sec par électrodes inox et régulateur de niveau'
      ],
      garantieDetails: 'Garantie de 3 ans pièces et main d’œuvre. Service d’astreinte technique disponible pour collectivités et forages pastoraux.',
      prixApplicables: 'Prix unitaire catalogue : 1 650 000 FCFA TTC avec variateur MPPT 5.5kW. Devis d’ingénierie et équipement complet sur demande.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },

  // 3.2 Les pompes solaires de surface
  {
    id: 'deb-ps-surf-01',
    reference: 'DEB-PUMP-SURF-CENTRI-2HP',
    nom: 'Pompe Solaire de Surface Centrifuge 1.5kW (2HP) Débit 28m³/h HMT 40m',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les pompes solaires de surface',
    applications: ['Les pompes solaires de surface', 'Prise d’eau fleuve', 'Bassins maraîchers', 'Puits ouverts'],
    descriptionCourte: 'Pompe de surface solaire centrifuge gros débit pour arrosage de parcelles maraîchères et remplissage de bassins de stockage.',
    descriptionDetaillee: 'Équipement idéal pour les périmètres agricoles situés le long des cours d’eau (Vallée du Fleuve Sénégal à Podor, Dagana, Matam, bordures du fleuve Niger ou cours d’eau du Sud-Bénin). Elle permet d’aspirer l’eau jusqu’à 7 mètres de profondeur et de refouler sous forte pression dans des réseaux d’aspersion ou de goutte-à-goutte.',
    prixFCFA: 580000,
    estSurDevis: false,
    stockDisponible: 30,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_pompe_solaire_1791734645113.jpg',
    specs: {
      puissance: '1.5 kW (2.0 CV / HP)',
      debitMax: '28 m³/h (Jusqu’à 150 m³/jour)',
      hmtMax: '40 mètres',
      profondeurImmersion: 'Aspiration max 7 mètres avec clapet crépine',
      tensionFonctionnement: '150 - 350V DC Solaire direct',
      indiceProtection: 'IP55 carrosserie aluminium ailetée',
      garantie: '2 ans constructeur',
      certifications: ['CE', 'ISO 9001'],
      specsPompage: {
        debitNominal: '20 m³/h à 25m HMT',
        debitMax: '28 m³/h',
        hauteurManometriqueTotale: '40 mètres',
        profondeurInstallationRecommandee: 'Installation hors sol, hauteur d’aspiration 2 à 6 mètres max',
        puissanceMoteur: '1.5 kW / 2.0 HP Brushless DC à aimants permanents',
        tensionAlimentation: '150V à 300V DC continu',
        diametreForageMin: 'Puits ouvert ou bâche de reprise (Non submersible)',
        diametreRefoulement: '2 pouces (DN 50 mm)',
        materiauCorps: 'Fonte traitée cataphorèse avec roue en laiton massif et arbre inox',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '2 200 Wc (4 panneaux solaires 550Wc)',
          nombrePanneaux: '4 modules 550Wc en série',
          tensionVocMax: '350V DC',
          plageMppt: '140V - 320V DC',
          technologieOnduleur: 'Boîtier contrôleur MPPT numérique intégré avec affichage digital du débit et de la puissance'
        },
        exemplesProjetsOuVillages: [
          'Périmètre maraîcher des Niayes à Mboro (Thiès, Sénégal)',
          'Exploitation agricole de Podor (Vallée du Fleuve Sénégal)',
          'Périmètre irrigué de Malanville (Bénin)',
          'Exploitation rizicole de Baguineda (Mali)'
        ]
      },
      conditionsInstallation: [
        'Pose sur dalle béton horizontale à l’abri du soleil direct par un auvent aéré',
        'Tuyau d’aspiration armé annelé anti-écrasement avec clapet de pied crépine laiton',
        'Amorçage complet du corps de pompe avant la première mise en route',
        'Installation d’un clapet anti-retour sur la tuyauterie de refoulement'
      ],
      garantieDetails: 'Garantie de 2 ans pièces et main d’œuvre. Roue laiton et garniture mécanique disponibles immédiatement.',
      prixApplicables: 'Prix catalogue : 580 000 FCFA TTC avec contrôleur MPPT inclus. Remise de 5% pour coopératives paysannes.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },
  {
    id: 'deb-ps-surf-02',
    reference: 'DEB-PUMP-SURF-MULTI-4HP',
    nom: 'Groupe Motopompe Solaire Multi-étage de Surface 3.0kW (4HP) HMT 75m',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les pompes solaires de surface',
    applications: ['Les pompes solaires de surface', 'Refoulement longue distance', 'Irrigation sous pression', 'Châteaux d’eau'],
    descriptionCourte: 'Pompe de surface multicellulaire haute pression pour alimentation de châteaux d’eau éloignés et aspersion agricole.',
    descriptionDetaillee: 'Pompe multicellulaire horizontale tout inox 304 pour transférer de gros volumes d’eau sur de longues distances (plusieurs kilomètres) ou alimenter des châteaux d’eau de grande hauteur depuis un bassin de rétention ou un fleuve. Moteur synchrone piloté par variateur solaire MPPT pour un fonctionnement continu du matin au soir.',
    prixFCFA: 890000,
    estSurDevis: false,
    stockDisponible: 16,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_pompe_solaire_1791734645113.jpg',
    specs: {
      puissance: '3.0 kW (4.0 CV / HP)',
      debitMax: '35 m³/h',
      hmtMax: '75 mètres',
      profondeurImmersion: 'Aspiration max 7 mètres',
      tensionFonctionnement: '3× 380V AC ou 350-600V DC',
      indiceProtection: 'IP55 / Moteur tropicalisé',
      garantie: '2 ans constructeur',
      certifications: ['CE', 'ISO 9001'],
      specsPompage: {
        debitNominal: '25 m³/h à 50m HMT',
        debitMax: '35 m³/h',
        hauteurManometriqueTotale: '75 mètres',
        profondeurInstallationRecommandee: 'Installation en surface à proximité de la réserve d’eau',
        puissanceMoteur: '3.0 kW / 4.0 HP',
        tensionAlimentation: '380V Triphasé',
        diametreForageMin: 'Non applicable (Surface)',
        diametreRefoulement: '2 pouces 1/2 (DN 65 mm)',
        materiauCorps: 'Acier inoxydable AISI 304, diffuseurs et étages empilés en acier inoxydable',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '4 400 Wc (8 panneaux solaires 550Wc)',
          nombrePanneaux: '8 modules 550Wc en série',
          tensionVocMax: '450V DC',
          plageMppt: '220V - 420V DC',
          technologieOnduleur: 'Variateur solaire MPPT 4kW avec contact sec pour commande automatique par flotteur haut'
        },
        exemplesProjetsOuVillages: [
          'Station de refoulement vers château d’eau à Notto Diobass (Thiès)',
          'Ferme semencière de Koudougou (Burkina Faso)',
          'Périmètre agro-pastoral de Korhogo (Côte d’Ivoire)'
        ]
      },
      conditionsInstallation: [
        'Protection contre les coups de bélier par réservoir anti-bélier à vessie',
        'Filtre à tamis amont recommandé pour retenir les débris végétaux',
        'Section de tuyau de refoulement minimale recommandée : PEHD Ø75mm'
      ],
      garantieDetails: 'Garantie de 2 ans. Pièces d’usure disponibles sous 48h.',
      prixApplicables: 'Prix unitaire catalogue : 890 000 FCFA TTC variateur solaire inclus.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 3.3 Les systèmes de pompage pour forages
  {
    id: 'deb-ps-for-01',
    reference: 'DEB-SYS-FORAGE-5.5KW',
    nom: 'Système Complet de Pompage pour Forage Communal Autonome 5.5kW (7.5HP)',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les systèmes de pompage pour forages',
    applications: ['Les systèmes de pompage pour forages', 'Forage villageois AEP', 'Collectivités locales', 'Forages ruraux'],
    descriptionCourte: 'Pack d’ingénierie complet prêt à raccorder : pompe immergée grand débit, variateur solaire MPPT, champ solaire 7.7kWc et armoire IP65.',
    descriptionDetaillee: 'Système complet certifié pour l’équipement ou la réhabilitation de forages ruraux d’adduction d’eau potable. Il intègre tous les composants indispensables : électropompe submersible tout inox 5.5kW, armoire solaire étanche ventilée avec variateur de fréquence MPPT, ensemble de 14 panneaux solaires 550Wc Tier-1, structure métallique galvanisée au sol à inclinaison 15°, câblage submersible étanche, tête de forage sécurisée et accessoires de raccordement.',
    prixFCFA: 3450000,
    estSurDevis: true,
    stockDisponible: 10,
    delaiLivraisonJours: 5,
    imagePrincipale: './images/product_chateau_eau_village_1791982686064.jpg',
    specs: {
      puissance: '5.5 kW / 7.5 HP Triphasé 380V',
      debitMax: '32 m³/h (Production journalière : 160 à 240 m³/jour)',
      hmtMax: '145 mètres',
      profondeurImmersion: 'Recommandée entre 60m et 120m',
      tensionFonctionnement: '3× 380V AC',
      indiceProtection: 'Armoire IP65 / Pompe submersible IP68',
      garantie: '3 ans pièces et main d’œuvre',
      certifications: ['CE', 'IEC 60034', 'ISO 9001', 'Normes AEP Hydraulique Villageoise'],
      specsPompage: {
        debitNominal: '22 m³/h à 90m HMT',
        debitMax: '32 m³/h',
        hauteurManometriqueTotale: '145 mètres',
        profondeurInstallationRecommandee: '70 à 110 mètres',
        puissanceMoteur: '5.5 kW / 7.5 HP',
        tensionAlimentation: '380V Triphasé',
        diametreForageMin: '6 pouces (DN 150 mm) ou 8 pouces',
        diametreRefoulement: '2 pouces 1/2 ou 3 pouces (DN 65 / DN 80 mm)',
        materiauCorps: 'Acier inoxydable AISI 304, turbines radiales haute résistance à l’abrasion',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '7 700 Wc (14 panneaux solaires 550Wc)',
          nombrePanneaux: '14 modules monocristallins 550Wc (2 strings de 7 en parallèle)',
          tensionVocMax: '450V DC',
          plageMppt: '250V - 420V DC',
          technologieOnduleur: 'Onduleur-variateur solaire MPPT hybride avec entrée réseau/groupe automatique et automate de télésuivi'
        },
        exemplesProjetsOuVillages: [
          'Village de Niakhar (Région de Fatick, Sénégal)',
          'Forage communal de Keur Momar Sarr (Louga)',
          'Commune rurale de Tillabéri (Niger)',
          'Commune de Dassa-Zoumè (Bénin)'
        ]
      },
      conditionsInstallation: [
        'Coulage de massifs d’ancrage pour structure métallique solaire (vent résistant 150 km/h)',
        'Pose d’une clôture de protection grillagée autour du champ solaire et de la tête de forage',
        'Tête de forage en acier galvanisé avec manomètre à glycérine, vanne papillon et clapet de retenue',
        'Mise à la terre unifiée de la structure et du forage avec résistance mesurée < 5 Ohms'
      ],
      garantieDetails: 'Garantie intégrale de 3 ans sur tout le système. Visite semestrielle de contrôle incluse la première année.',
      prixApplicables: 'Prix indicatif système complet : 3 450 000 FCFA HT. Sur devis quantitatif avec installation et génie civil.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-ps-for-02',
    reference: 'DEB-SYS-FORAGE-11KW',
    nom: 'Station de Pompage Solaire Hybride Grande Capacité 11kW (15HP) Débit 60m³/h',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les systèmes de pompage pour forages',
    applications: ['Les systèmes de pompage pour forages', 'Grandes adductions d’eau', 'Périmètres agro-industriels', 'Hydraulique pastorale'],
    descriptionCourte: 'Station de forage industrielle à grand rendement pour l’alimentation de plusieurs villages ou de grands périmètres agricoles de plus de 15 hectares.',
    descriptionDetaillee: 'Centrale hydraulique solaire hybride pour forages à fort débit. Le variateur de fréquence hybride bascule de manière continue et sans coupure entre l’énergie solaire diurne et une source d’appoint (groupe électrogène de secours ou réseau conventionnel) pour garantir un débit 24h/24 en cas de forte demande en période d’étiage.',
    prixFCFA: 6900000,
    estSurDevis: true,
    stockDisponible: 6,
    delaiLivraisonJours: 7,
    imagePrincipale: './images/product_chateau_eau_village_1791982686064.jpg',
    specs: {
      puissance: '11.0 kW / 15.0 HP Triphasé 380V-415V',
      debitMax: '60 m³/h (300 à 450 m³/jour selon saison)',
      hmtMax: '175 mètres',
      profondeurImmersion: 'Recommandée entre 80m et 150m',
      tensionFonctionnement: '3× 400V AC',
      indiceProtection: 'Armoire IP66 climatisée / Pompe IP68',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'IEC 60034', 'ISO 9001'],
      specsPompage: {
        debitNominal: '45 m³/h à 110m HMT',
        debitMax: '60 m³/h',
        hauteurManometriqueTotale: '175 mètres',
        profondeurInstallationRecommandee: '90 à 140 mètres',
        puissanceMoteur: '11.0 kW / 15.0 HP',
        tensionAlimentation: '380 - 415V Triphasé',
        diametreForageMin: '6 pouces ou 8 pouces (DN 150 à 200 mm)',
        diametreRefoulement: '3 pouces (DN 80 mm) ou 4 pouces (DN 100 mm)',
        materiauCorps: 'Inox AISI 304/316 forgé avec roulements renforcés céramique/carbone',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '15 400 Wc (28 panneaux solaires 550Wc)',
          nombrePanneaux: '28 modules 550Wc (2 strings de 14 panneaux)',
          tensionVocMax: '800V DC',
          plageMppt: '450V - 720V DC',
          technologieOnduleur: 'Variateur industriel VFD MPPT avec module de synchronisation automatique solaire / groupe électrogène'
        },
        exemplesProjetsOuVillages: [
          'Forage pastoral de Matam (Vallée du Fleuve Sénégal)',
          'Grand périmètre agricole de Tambacounda (Sénégal)',
          'Zone agro-industrielle de Sikasso (Mali)',
          'Projet AEP communal de Koudougou (Burkina Faso)'
        ]
      },
      conditionsInstallation: [
        'Colonne montante en tubes inox filetés DN80 ou brides acier inoxydable',
        'Câblage puissance 3×16mm² + terre étanche avec capteurs de température moteur Pt100',
        'Local technique maçonné ou armoire abritée pour héberger le variateur et les parafoudres',
        'Contrat de maintenance préventive semestrielle recommandé'
      ],
      garantieDetails: 'Garantie constructeur 3 ans et disponibilité garantie des pièces de rechange pendant 10 ans.',
      prixApplicables: 'Prix sur devis personnalisé selon la profondeur exacte du forage et le profil de pompage souhaité.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },

  // 3.4 Les équipements d’irrigation agricole
  {
    id: 'deb-ps-irrig-01',
    reference: 'DEB-IRRIG-DRIP-3KW',
    nom: 'Station de Pompage Solaire & Fertirrigation Goutte-à-Goutte Maraîchère 3.0kW (2 à 5 Hectares)',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les équipements d’irrigation agricole',
    applications: ['Les équipements d’irrigation agricole', 'Maraîchage intensif', 'Goutte-à-goutte', 'Fertirrigation'],
    descriptionCourte: 'Système complet d’irrigation localisée goutte-à-goutte alimenté par énergie solaire : pompage, filtration à disques, injecteur Venturi et lignes de distribution.',
    descriptionDetaillee: 'Offre clé en main dédiée aux exploitants agricoles et coopératives de maraîchage (tomate, oignon, piment, choux, pastèque). Elle combine une motopompe solaire à haut rendement, une station de filtration professionnelle double filtre à disques 120 mesh pour éliminer toutes les impuretés, un injecteur d’engrais Venturi avec débitmètre, et les manifolds de distribution vers les lignes de gaines de goutte-à-goutte autorégulantes.',
    prixFCFA: 1950000,
    estSurDevis: false,
    stockDisponible: 12,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_irrigation_agricole_1791982667672.jpg',
    specs: {
      puissance: '3.0 kW (4.0 CV / HP)',
      debitMax: '25 m³/h sous 3.5 bars de pression constante',
      hmtMax: '55 mètres',
      profondeurImmersion: 'Aspiration bassin / puits jusqu’à 6 mètres',
      tensionFonctionnement: '3× 230V / 380V AC Solaire direct',
      indiceProtection: 'IP65 station complète protégée',
      garantie: '2 ans constructeur',
      certifications: ['CE', 'ISO 9001', 'ISO 9261 (Goutte-à-goutte)'],
      specsPompage: {
        debitNominal: '18 m³/h à 3.0 bars de pression d’irrigation',
        debitMax: '25 m³/h',
        hauteurManometriqueTotale: '55 mètres',
        profondeurInstallationRecommandee: 'Installation sur skid acier galvanisé en bordure de bassin ou forage',
        puissanceMoteur: '3.0 kW / 4.0 HP',
        tensionAlimentation: '220V monophasé ou 380V triphasé solaire',
        diametreForageMin: 'Puits maraîcher ou bâche de stockage',
        diametreRefoulement: '2 pouces (DN 50 mm) sortie filtration',
        materiauCorps: 'Pompe corps fonte/inox, manifolds polypropylène renforcé fibre de verre résistant aux engrais',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '4 400 Wc (8 panneaux solaires 550Wc)',
          nombrePanneaux: '8 modules 550Wc',
          tensionVocMax: '450V DC',
          plageMppt: '220V - 420V DC',
          technologieOnduleur: 'Variateur solaire MPPT avec régulation de pression constante PID pour éviter les surpressions sur les gaines goutte-à-goutte'
        },
        exemplesProjetsOuVillages: [
          'Zone maraîchère des Niayes à Mboro (Thiès, Sénégal)',
          'Exploitations maraîchères de Notto Diobass (Thiès)',
          'Périmètre maraîcher de Sikasso (Mali)',
          'Ferme maraîchère de Grand-Popo (Bénin)'
        ]
      },
      conditionsInstallation: [
        'Implantation sur dalle béton 2.00 × 1.50 m en tête de parcelle',
        'Nettoyage régulier des filtres à disques par rétrolavage manuel ou automatique',
        'Pose des tuyaux maîtres PEHD Ø63mm et vannes sectorielles par quart d’hectare',
        'Utilisation d’engrais entièrement solubles pour préserver les goutteurs'
      ],
      garantieDetails: 'Garantie 2 ans sur la station de pompage et les filtres. 1 an sur les accessoires d’injection.',
      prixApplicables: 'Prix catalogue station de pompage + filtration + fertirrigation : 1 950 000 FCFA TTC. Réseau de gaines goutte-à-goutte sur devis à l’hectare (environ 450 000 FCFA / ha).'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-ps-irrig-02',
    reference: 'DEB-IRRIG-ASPERS-7.5KW',
    nom: 'Système d’Aspersion Solaire Agricole & Rampe Mobile 7.5kW (Jusqu’à 10 Hectares)',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les équipements d’irrigation agricole',
    applications: ['Les équipements d’irrigation agricole', 'Aspersion plein champ', 'Céréales & fourrage', 'Arboriculture'],
    descriptionCourte: 'Installation d’irrigation par aspersion sous pression moyenne (4 bars) pour cultures fourragères, maïs, canne à sucre et vergers.',
    descriptionDetaillee: 'Équipement robuste comprenant un groupe motopompe solaire grand débit 7.5kW, un réseau de tuyauteries mobiles en aluminium à raccords rapides ou PEHD, et des asperseurs rotatifs à longue portée (rayon d’arrosage 18 à 25 mètres). Permet un arrosage homogène reproduisant une pluie fine naturelle pour les grandes surfaces.',
    prixFCFA: 3800000,
    estSurDevis: true,
    stockDisponible: 8,
    delaiLivraisonJours: 5,
    imagePrincipale: './images/product_irrigation_agricole_1791982667672.jpg',
    specs: {
      puissance: '7.5 kW / 10 HP',
      debitMax: '45 m³/h sous 4.5 bars de pression',
      hmtMax: '80 mètres',
      tensionFonctionnement: '3× 380V AC Solaire',
      indiceProtection: 'IP55 / IP65',
      garantie: '2 ans constructeur',
      certifications: ['CE', 'ISO 9001'],
      specsPompage: {
        debitNominal: '35 m³/h à 45m HMT',
        debitMax: '45 m³/h',
        hauteurManometriqueTotale: '80 mètres',
        profondeurInstallationRecommandee: 'Prise sur forage à gros débit ou canal d’irrigation',
        puissanceMoteur: '7.5 kW / 10 HP',
        tensionAlimentation: '380V Triphasé',
        diametreRefoulement: '3 pouces (DN 80 mm)',
        materiauCorps: 'Corps fonte graphite nodulaire, turbine bronze/inox',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '11 000 Wc (20 panneaux solaires 550Wc)',
          nombrePanneaux: '20 modules 550Wc',
          tensionVocMax: '650V DC',
          plageMppt: '350V - 600V DC',
          technologieOnduleur: 'Variateur solaire MPPT triphasé avec démarrage progressif Soft-Start évitant les surpressions'
        },
        exemplesProjetsOuVillages: [
          'Périmètre agricole de Dahra Djoloff (Sénégal)',
          'Domaine fourrager de Tambacounda (Sénégal)',
          'Exploitation céréalière de Korhogo (Côte d’Ivoire)'
        ]
      },
      conditionsInstallation: [
        'Installation de vannes de purge et clapets de sécurité sur le réseau d’aspersion',
        'Vérification de la granulométrie du sable pour préserver les buses d’asperseurs'
      ],
      garantieDetails: 'Garantie de 2 ans sur la pompe et le variateur solaire.',
      prixApplicables: 'Prix sur devis selon le dimensionnement de la tuyauterie mobile et le nombre d’asperseurs.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 3.5 Les systèmes d’alimentation en eau pour villages et exploitations
  {
    id: 'deb-ps-vill-01',
    reference: 'DEB-AEP-VILLAGE-COMPLET',
    nom: 'Système Clé en Main d’Adduction d’Eau Potable Villageoise (AEP) avec Château d’Eau 30m³ & Bornes Fontaines',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les systèmes d’alimentation en eau pour villages et exploitations',
    applications: ['Les systèmes d’alimentation en eau pour villages et exploitations', 'AEP Villageoise', 'Eau potable rurale', 'Santé publique'],
    descriptionCourte: 'Infrastructure villageoise intégrale clé en main : forage équipé en pompe solaire inox, château d’eau métallique 30m³, réseau de distribution et bornes fontaines publiques.',
    descriptionDetaillee: 'Véritable projet de développement rural fournissant de l’eau potable saine et gratuite à 1 500 à 3 000 habitants. Le système comprend : l’équipement du forage avec pompe submersible solaire inox, le générateur photovoltaïque sur structure métallique sécurisée avec clôture, un château d’eau métallique galvanisé de 30m³ monté sur tour de 10 mètres, la tuyauterie d’adduction PEHD, et 2 à 4 bornes fontaines publiques à 4 robinets poussoirs temporisés anti-gaspillage avec compteur d’eau et abreuvoir pour le bétail.',
    prixFCFA: 14500000,
    estSurDevis: true,
    stockDisponible: 5,
    delaiLivraisonJours: 14,
    imagePrincipale: './images/product_chateau_eau_village_1791982686064.jpg',
    specs: {
      puissance: '3.0 kW à 5.5 kW solaire autonome',
      debitMax: 'Production journalière de 50 à 100 m³ d’eau potable par jour',
      hmtMax: '90 à 130 mètres',
      profondeurImmersion: 'Adaptée à la profondeur du forage (50m à 120m)',
      tensionFonctionnement: 'Solaire direct 100% au fil du soleil',
      indiceProtection: 'Château d’eau métallique galvanisé EN ISO 1461 / Pompe IP68',
      garantie: 'Garantie décennale sur génie civil & 3 ans sur équipements électromécaniques',
      certifications: ['Normes OMS Eau Potable', 'Certification PEPAM Sénégal', 'ISO 9001'],
      specsPompage: {
        debitNominal: '15 m³/h pompés aux heures d’ensoleillement',
        debitMax: '20 m³/h',
        hauteurManometriqueTotale: '110 mètres (profondeur + 10m tour réservoir + pertes)',
        profondeurInstallationRecommandee: '60 à 100 mètres',
        puissanceMoteur: '4.0 kW / 5.5 HP inox 304',
        tensionAlimentation: '380V Triphasé via variateur solaire',
        diametreForageMin: '4 pouces ou 6 pouces (DN 100 à 150 mm)',
        diametreRefoulement: '2 pouces 1/2 PEHD PN16',
        materiauCorps: 'Pompe inox 304 alimentaire / Réservoir acier vitrifié ou galvanisé à chaud',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '5 500 Wc (10 panneaux solaires 550Wc)',
          nombrePanneaux: '10 modules 550Wc monocristallins',
          tensionVocMax: '550V DC',
          plageMppt: '280V - 500V DC',
          technologieOnduleur: 'Variateur MPPT avec régulateur de niveau haut pour arrêt automatique quand le château d’eau est plein'
        },
        exemplesProjetsOuVillages: [
          'Village de Touba Toul (Région de Thiès, Sénégal)',
          'Village de Keur Momar Sarr (Région de Louga, Sénégal)',
          'Village de Fimela (Région de Fatick, Sénégal)',
          'Commune rurale de Tillabéri (Niger)',
          'Village de Koudougou (Burkina Faso)'
        ]
      },
      conditionsInstallation: [
        'Étude géotechnique préalable du sol pour fondation de la tour du château d’eau',
        'Massifs béton armé dosés à 350 kg/m³ vibrés mécaniquement',
        'Clôture périmétrique du champ solaire en grillage galvanisé avec portail cadenassable',
        'Formation du comité de gestion villageois de l’eau (ASUFOR) pour la maintenance de premier niveau'
      ],
      garantieDetails: 'Garantie décennale de 10 ans sur la structure du château d’eau. Garantie de 3 ans sur les pompes et variateurs solaires. Pièces d’usure garanties en stock.',
      prixApplicables: 'Projet clé en main à partir de 14 500 000 FCFA HT selon la hauteur du château d’eau et le linéaire du réseau de distribution. Éligible aux financements ONG, bailleurs et mairies.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-ps-vill-02',
    reference: 'DEB-SYS-EAU-EXPLOIT-40M3',
    nom: 'Système d’Alimentation en Eau pour Exploitations Agricoles & Élevages Bovins 40m³/jour',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les systèmes d’alimentation en eau pour villages et exploitations',
    applications: ['Les systèmes d’alimentation en eau pour villages et exploitations', 'Ranches pastoraux', 'Abreuvement bovin & ovin', 'Grandes fermes'],
    descriptionCourte: 'Système autonome de pompage pour ranchs, fermes avicoles et élevages : réservoir tampon au sol 20m³ et abreuvoirs automatiques à niveau constant.',
    descriptionDetaillee: 'Offre conçue spécifiquement pour sécuriser l’approvisionnement en eau des troupeaux de bétail (bovins, ovins, caprins) et fermes avicoles dans les zones sahéliennes et soudaniennes. Pompe solaire immergée à démarrage automatique couplée à une cuve de rétention et à des bacs abreuvoirs en béton ou acier galvanisé équipés de flotteurs protégés.',
    prixFCFA: 2250000,
    estSurDevis: false,
    stockDisponible: 9,
    delaiLivraisonJours: 4,
    imagePrincipale: './images/product_chateau_eau_village_1791982686064.jpg',
    specs: {
      puissance: '2.2 kW / 3.0 HP',
      debitMax: '15 m³/h (Production journalière : 40 à 60 m³/jour)',
      hmtMax: '95 mètres',
      profondeurImmersion: 'Recommandée entre 40m et 80m',
      tensionFonctionnement: 'Solaire direct 200V - 400V DC',
      indiceProtection: 'IP68 / IP65',
      garantie: '2 ans constructeur',
      certifications: ['CE', 'ISO 9001'],
      specsPompage: {
        debitNominal: '10 m³/h à 65m HMT',
        debitMax: '15 m³/h',
        hauteurManometriqueTotale: '95 mètres',
        profondeurInstallationRecommandee: '50 à 75 mètres',
        puissanceMoteur: '2.2 kW / 3.0 HP',
        tensionAlimentation: '380V Triphasé via variateur solaire',
        diametreForageMin: '4 pouces (DN 100 mm)',
        diametreRefoulement: '2 pouces (DN 50 mm)',
        materiauCorps: 'Acier inoxydable AISI 304 résistant aux dépôts minéraux',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '3 300 Wc (6 panneaux solaires 550Wc)',
          nombrePanneaux: '6 modules 550Wc',
          tensionVocMax: '450V DC',
          plageMppt: '200V - 420V DC',
          technologieOnduleur: 'Contrôleur MPPT étanche avec arrêt automatique sur cuve pleine'
        },
        exemplesProjetsOuVillages: [
          'Ranch pastoral de Dahra Djoloff (Louga, Sénégal)',
          'Ferme d’élevage de Fatick (Sénégal)',
          'Exploitation pastorale de Sikasso (Mali)'
        ]
      },
      conditionsInstallation: [
        'Installation de bacs abreuvoirs avec plage de stabilisation béton pour sabots du bétail',
        'Canalisations enterrées à 60cm de profondeur pour éviter la surchauffe de l’eau au soleil'
      ],
      garantieDetails: 'Garantie de 2 ans pièces et main d’œuvre.',
      prixApplicables: 'Prix catalogue kit complet (hors cuve) : 2 250 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 3.6 Les contrôleurs, onduleurs et accessoires de pompage
  {
    id: 'deb-ps-ctrl-01',
    reference: 'DEB-INV-PUMP-MPPT-5.5KW',
    nom: 'Onduleur Variateur Solaire de Pompage MPPT IP65 5.5kW avec Écran LCD & Entrée Hybride',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les contrôleurs, onduleurs et accessoires de pompage',
    applications: ['Les contrôleurs, onduleurs et accessoires de pompage', 'Pilotage pompes solaires', 'Variateur de fréquence', 'Hybridation solaire/groupe'],
    descriptionCourte: 'Variateur de fréquence solaire intelligent IP65 pour moteurs triphasés 380V (pompes submersibles et de surface jusqu’à 7.5HP), algorithme MPPT 99.8%.',
    descriptionDetaillee: 'Cœur électronique de toute station de pompage solaire moderne. Ce variateur de vitesse convertit le courant continu des panneaux photovoltaïques en courant alternatif triphasé pour alimenter directement les pompes hydrauliques standards sans batterie. Écran LCD multifonctions indiquant en temps réel la fréquence (Hz), le débit estimé (m³/h), la tension DC (V), et le courant moteur (A). Double bornier avec basculement automatique sur groupe électrogène en cas d’urgence.',
    prixFCFA: 650000,
    estSurDevis: false,
    stockDisponible: 35,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_variateur_pompage_mppt_1791982703203.jpg',
    specs: {
      puissance: '5.5 kW / 7.5 HP (Calibre courant sortie 13A)',
      tensionFonctionnement: 'Entrée PV : 250V à 800V DC / Sortie moteur : 3× 380V AC 0-50Hz',
      indiceProtection: 'IP65 étanche à la poussière et aux projections d’eau (boîtier aluminium dissipateur)',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'IEC 61800-3', 'ISO 9001', 'TÜV Rheinland'],
      specsPompage: {
        puissanceMoteur: 'Prend en charge moteurs de 1.5 kW à 5.5 kW (2HP à 7.5HP)',
        tensionAlimentation: 'Plage PV 250 - 800V DC / Entrée AC 380V triphasée secourue',
        systemePhotovoltaiqueCompatible: {
          puissanceCreteRecommandee: '4 400 Wc à 8 000 Wc',
          nombrePanneaux: '8 à 16 panneaux solaires 550Wc',
          tensionVocMax: '800V DC',
          plageMppt: '250V - 750V DC (Efficacité MPPT > 99.8%)',
          technologieOnduleur: 'Double algorithme MPPT avancé avec démarrage dès 50 W/m² de radiation solaire et protection contre la foudre'
        },
        exemplesProjetsOuVillages: [
          'Installé sur plus de 120 forages au Sénégal (Thiès, Louga, Fatick, Podor)',
          'Déployé au Mali (Sikasso, Ségou)',
          'Déployé au Bénin (Parakou, Djougou)'
        ]
      },
      conditionsInstallation: [
        'Fixation murale verticale sur support plan non inflammable à l’ombre ou en local technique',
        'Raccordement de la sectionneur DC avec parafoudre intégré obligatoire',
        'Câblage blindé entre le variateur et le moteur recommandé pour les forages profonds (> 100m)',
        'Mise à la terre de la carcasse métallique (résistance < 10 Ohms)'
      ],
      garantieDetails: 'Garantie intégrale de 3 ans avec échange standard en agence DIARRA ENERGIE.',
      prixApplicables: 'Prix unitaire catalogue : 650 000 FCFA TTC. Modèle 2.2kW : 420 000 FCFA TTC. Modèle 11kW : 1 150 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-ps-ctrl-02',
    reference: 'DEB-ACC-FORAGE-KIT-PRO',
    nom: 'Kit Complet de Protection & Sécurité Forage Solaire (Sondes Puits Sec, Flotteurs Cuve & Parafoudre 1000V)',
    categorie: 'pompage-solaire',
    sousCategorie: 'Les contrôleurs, onduleurs et accessoires de pompage',
    applications: ['Les contrôleurs, onduleurs et accessoires de pompage', 'Sécurité manque d’eau', 'Protection foudre', 'Accessoires forage'],
    descriptionCourte: 'Ensemble indispensable pour protéger et pérenniser votre investissement forage : 3 sondes inox de niveau d’eau, flotteur de château d’eau, coffret parafoudre DC 1000V et manomètre à glycérine.',
    descriptionDetaillee: 'Ce kit rassemble tous les accessoires de protection exigés par les cahiers des charges de l’hydraulique villageoise : jeu de 3 électrodes de niveau en acier inoxydable 316 avec câble spécial eau potable pour couper la pompe avant le dénoyage de la turbine, un flotteur à contact sec étanche IP68 pour arrêter le pompage lorsque le réservoir est plein, un coffret de protection parafoudre DC 1000V 40kA avec sectionneur rotatif cadenassable, et un manomètre à bain de glycérine 0-16 bars avec robinet d’isolement.',
    prixFCFA: 195000,
    estSurDevis: false,
    stockDisponible: 45,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_cables_raccordement_1791969809173.jpg',
    specs: {
      puissance: 'Compatible pompes solaires de 0.5HP à 20HP',
      indiceProtection: 'Sondes IP68 / Flotteur IP68 / Coffret IP65',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'RoHS', 'ACS'],
      specsPompage: {
        materiauCorps: 'Électrodes acier inoxydable 316 / Câble polypropylène alimentaire / Coffret polycarbonate',
        systemePhotovoltaiqueCompatible: {
          tensionVocMax: '1000V DC',
          technologieOnduleur: 'Raccordement direct sur entrées numériques (DI) de tous les variateurs solaires (Veichi, INVT, Grundfos, Schneider)'
        },
        exemplesProjetsOuVillages: [
          'Équipement standardisé sur tous les forages ruraux au Sénégal et en Afrique de l’Ouest'
        ]
      },
      conditionsInstallation: [
        'Sonde de niveau bas fixée à 2 mètres au-dessus du clapet d’aspiration de la pompe',
        'Sonde de référence fixée au corps de pompe métallique',
        'Suspension libre du flotteur dans le château d’eau avec câble lesté réglable'
      ],
      garantieDetails: 'Garantie de 3 ans contre toute corrosion ou défaillance des contacts étanches.',
      prixApplicables: 'Prix du kit complet prêt à poser : 195 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 4. KITS SOLAIRES & SYSTÈMES DE STOCKAGE (10 Sous-Catégories Officielles)
  // 4.1 Les kits solaires domestiques
  {
    id: 'deb-kit-dom-01',
    reference: 'DEB-KIT-DOM-1.5KW',
    nom: 'Kit Solaire Domestique Autonome Confort 1.5kVA / 2.5kWh Batterie Gel & Panneaux 1200Wc',
    categorie: 'kits-solaires',
    sousCategorie: 'Les kits solaires domestiques',
    applications: ['Les kits solaires domestiques', 'Maisons rurales', 'Studios urbains', 'Secours anti-coupure', 'Éclairage & TV'],
    descriptionCourte: 'Alimentation de secours anti-coupure économique et fiable pour appartements, petites maisons et résidences semi-urbaines.',
    descriptionDetaillee: 'Solution compacte prête à raccorder garantissant la continuité de service lors des délestages ou en site isolé. Alimente en 230V pur sinus un réfrigérateur basse consommation (A+), la télévision, les ventilateurs, les ordinateurs, box internet et l’éclairage LED complet.',
    prixFCFA: 980000,
    estSurDevis: false,
    stockDisponible: 25,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_kit_solaire_hybride_1791734655495.jpg',
    specs: {
      puissance: '1 500 VA / 1 200 W Pur Sinus',
      panneauSolaire: '3x 400Wc Monocristallin (1 200 Wc crête)',
      batterieType: 'Batteries Gel Solaire Plomb-Carbone Décharge Profonde',
      batterieCapacite: '2x 12V 150Ah couplées en 24V (3.6 kWh brut / 2.5 kWh utile)',
      autonomie: '12 à 18 heures d’autonomie continue sans réseau ni soleil',
      tensionFonctionnement: '230V AC ± 5% monophasé / 24V DC bus batterie',
      indiceProtection: 'Onduleur IP21 / Panneaux IP68',
      garantie: '2 ans constructeur',
      certifications: ['CE', 'RoHS', 'ISO 9001'],
      specsKitsStockage: {
        puissancePanneaux: '1 200 Wc (3 modules 400Wc Monocristallins)',
        puissanceOnduleur: '1.5 kVA / 1 200 W Pur Sinus avec régulateur MPPT 40A',
        capaciteBatterie: '2.5 kWh utile (2x 12V 150Ah Gel étanche sans entretien)',
        tensionBatteries: '24V DC',
        technologieBatterie: 'Gel Plomb-Carbone à décharge profonde (1800 cycles à 50% DOD)',
        typeOnduleur: 'Onduleur Hybride Basse Fréquence Pur Sinus avec chargeur secteur rapide',
        autonomieEstimee: '14 à 18 heures avec charge moyenne (200W à 300W)',
        equipementsInclus: [
          '3x Panneaux solaires monocristallins 400Wc Tier-1',
          '1x Onduleur Hybride 1.5kVA / 24V Pur Sinus régulateur MPPT',
          '2x Batteries Gel 12V 150Ah solaires étanches',
          '1x Coffret de protection DC avec parafoudre 600V et disjoncteur 32A',
          '1x Coffret de coupure AC 230V avec différentiel 30mA',
          '2x Paires câbles solaires 6mm² (25m rouge + 25m noir) avec connecteurs MC4',
          '1x Câblage inter-batterie cuivre 25mm² avec cosses serties'
        ],
        usagesRecommandes: [
          'Éclairage LED intégral (8 à 12 lampes)',
          '1 Téléviseur LED 43" à 55" + décodeur Canal+ / TNT',
          '3 Ventilateurs de plafond ou sur pied',
          '1 Réfrigérateur combiné classe A+ (180L à 250L)',
          'Recharge smartphones, ordinateurs portables et box WiFi'
        ],
        optionsInstallation: [
          'Fixation sur toiture tôle / bac alu avec profilés aluminium anodisé',
          'Support incliné 15° pour toiture terrasse dalle béton',
          'Pose du pack onduleur/batteries en coffret aéré au sol'
        ]
      },
      conditionsInstallation: [
        'Installation de l’onduleur et des batteries dans un local sec, ventilé et à l’abri du soleil direct',
        'Orientation des panneaux plein Sud avec inclinaison 15° pour un rendement annuel optimal',
        'Raccordement de la terre sur piquet cuivre indépendant (< 10 Ohms)'
      ],
      garantieDetails: 'Garantie intégrale constructeur de 2 ans sur onduleur et batteries, 10 ans sur panneaux solaires. Remplacement express en agence DIARRA ENERGIE.',
      prixApplicables: 'Prix catalogue kit complet matériel : 980 000 FCFA TTC. Forfait pose et mise en service certifiée : +120 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },
  {
    id: 'deb-kit-dom-02',
    reference: 'DEB-KIT-DOM-1KW-LITHIUM',
    nom: 'Mini-Kit Solaire Résidentiel Essentiel 1.0kVA / 1.28kWh Lithium LiFePO4',
    categorie: 'kits-solaires',
    sousCategorie: 'Les kits solaires domestiques',
    applications: ['Les kits solaires domestiques', 'Studios', 'Bureaux à domicile', 'Cabanes de chantier', 'Petits logements'],
    descriptionCourte: 'Pack compact mural au Lithium LiFePO4 ultra-rapide à installer pour zéro coupure d’éclairage, informatique et ventilation.',
    descriptionDetaillee: 'Intègre une batterie murale Lithium dernière génération LiFePO4 12.8V 100Ah (6000 cycles) avec onduleur pur sinus 1000W et 2 panneaux 400Wc. Idéal pour garantir l’alimentation ininterrompue des équipements prioritaires en milieu urbain et périurbain.',
    prixFCFA: 690000,
    estSurDevis: false,
    stockDisponible: 30,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_kit_solaire_hybride_1791734655495.jpg',
    specs: {
      puissance: '1 000 VA / 1 000 W Pur Sinus',
      panneauSolaire: '2x 400Wc (800 Wc crête)',
      batterieType: 'Lithium Fer Phosphate LiFePO4 Smart BMS',
      batterieCapacite: '12.8V / 100Ah (1.28 kWh utile à 90% DOD)',
      autonomie: '10 à 14 heures sur charge essentielle (150W)',
      tensionFonctionnement: '230V AC monophasé / 12V DC',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'UN38.3', 'IEC 62619'],
      specsKitsStockage: {
        puissancePanneaux: '800 Wc (2 modules 400Wc)',
        puissanceOnduleur: '1.0 kVA / 1 000 W Pur Sinus MPPT',
        capaciteBatterie: '1.28 kWh utile (Lithium LiFePO4 12.8V 100Ah)',
        tensionBatteries: '12.8V DC',
        technologieBatterie: 'Lithium LiFePO4 Smart BMS 6000 cycles',
        typeOnduleur: 'Onduleur Hybride Pur Sinus avec régulateur MPPT 30A',
        autonomieEstimee: '12 heures en continu (TV, 6 ampoules LED, box, ventilateur)',
        equipementsInclus: [
          '2x Panneaux solaires monocristallins 400Wc',
          '1x Onduleur Pur Sinus 1000W 12V avec chargeur MPPT',
          '1x Batterie murale Lithium LiFePO4 12.8V 100Ah',
          '1x Coffret de protection DC/AC précâblé',
          'Câbles de liaison et connecteurs MC4'
        ],
        usagesRecommandes: [
          'Éclairage LED maisonnette (6 lampes)',
          'Téléviseur et box internet 24h/24',
          '2 Ventilateurs sur pied',
          'Chargeur PC et tablettes'
        ],
        optionsInstallation: [
          'Fixation toiture tôle ou dalle terrasse',
          'Fixation murale compacte dans le séjour ou couloir'
        ]
      },
      conditionsInstallation: [
        'Pose murale simplifiée à portée de main',
        'Câblage solaire direct sans outillage lourd'
      ],
      garantieDetails: 'Garantie de 3 ans sur la batterie Lithium et l’onduleur, 12 ans sur les panneaux solaires.',
      prixApplicables: 'Prix catalogue kit complet : 690 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 4.2 Les systèmes pour maisons et villas
  {
    id: 'deb-kit-vil-01',
    reference: 'DEB-KIT-VILLA-5KW',
    nom: 'Système Solaire Hybride Villa Familiale 5kVA / 10.24kWh LiFePO4 & 10 Panneaux 550Wc',
    categorie: 'kits-solaires',
    sousCategorie: 'Les systèmes pour maisons et villas',
    applications: ['Les systèmes pour maisons et villas', 'Villas familiales', 'Résidences de standing', 'Autonomie totale', 'Anti-délestage'],
    descriptionCourte: 'Autonomie énergétique totale contre les délestages et division par 3 de la facture d’électricité pour villa de 4 à 6 pièces.',
    descriptionDetaillee: 'La solution de référence DIARRA ENERGIE pour les villas et résidences privées à Dakar, Cotonou, Lomé et Abidjan. Comprend 1 Onduleur Hybride Pur Sinus 5kVA / 5kW 48V MPPT haute tension avec liaison WiFi, 1 Armoire murale Lithium LiFePO4 51.2V 200Ah (10.24 kWh utile), 10 Panneaux solaires monocristallins 550Wc Tier-1 (5500Wc crête), coffrets de protection parafoudre DC et AC complets, câblerie certifiée et structure de fixation aluminium.',
    prixFCFA: 3650000,
    estSurDevis: false,
    stockDisponible: 18,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_kit_solaire_hybride_1791734655495.jpg',
    specs: {
      puissance: '5 000 VA / 5 000 W Pur Sinus Facteur 1.0',
      panneauSolaire: '10x 550Wc Monocristallin Half-Cell Tier-1 (5.5 kWc)',
      batterieType: 'Lithium Fer Phosphate (LiFePO4) Smart BMS 6000 cycles',
      batterieCapacite: '51.2V / 200Ah (10.24 kWh utile)',
      autonomie: 'Assure 24h/24 : 2 climatiseurs Inverter 1.5CV, grand réfrigérateur, congélateur, TV 65", pompe surpresseur, box internet et éclairage',
      tensionFonctionnement: '230V AC ± 2% / 48V (51.2V) DC bus batterie',
      indiceProtection: 'Onduleur IP21 / Batterie IP54 / Panneaux IP68',
      garantie: 'Panneaux 25 ans / Batterie 5 ans / Onduleur 3 ans',
      certifications: ['CE', 'IEC 62109', 'UN38.3', 'IEC 62619', 'TÜV Rheinland'],
      specsKitsStockage: {
        puissancePanneaux: '5 500 Wc (10 modules monocristallins 550Wc Tier-1)',
        puissanceOnduleur: '5.0 kVA / 5 000 W Pur Sinus Hybride MPPT avec port WiFi',
        capaciteBatterie: '10.24 kWh utile (Pack mural LiFePO4 51.2V 200Ah)',
        tensionBatteries: '51.2V DC (Basse Tension sécurisée 48V nominal)',
        technologieBatterie: 'Lithium LiFePO4 cellules prismatiques Grade-A (6000 cycles à 80% DOD)',
        typeOnduleur: 'Onduleur Hybride Pur Sinus MPPT Haute Tension (Plage MPPT 120V - 450V DC) avec double sortie secourue',
        autonomieEstimee: '20 à 28 heures en coupure réseau complète selon utilisation de la climatisation',
        equipementsInclus: [
          '10x Panneaux solaires monocristallins 550Wc Tier-1 Half-Cut',
          '1x Onduleur hybride 5kVA / 48V Pur Sinus MPPT avec antenne WiFi',
          '1x Armoire murale Lithium LiFePO4 51.2V 200Ah (10.24kWh) avec écran LCD tactile',
          '1x Coffret parafoudre DC 1000V avec sectionneur et fusibles gPV',
          '1x Coffret de protection AC 230V avec inverseur de source automatique et disjoncteurs différentiels',
          '60 mètres câble solaire souple 6mm² rouge/noir certifié TÜV',
          'Jeu complet de connecteurs MC4 IP68 et câbles de puissance batterie 50mm²',
          'Structure de montage aluminium anodisé pour toiture'
        ],
        usagesRecommandes: [
          '2 Climatiseurs 1.5 CV Inverter (nuit ou jour)',
          '1 Grand réfrigérateur américain ou combiné + 1 congélateur coffre',
          '1 Pompe surpresseur d’eau de villa (0.75kW)',
          '2 Téléviseurs grand écran, sonorisation, ordinateurs et caméras CCTV',
          'Éclairage LED complet de la villa et du jardin extérieur',
          'Portail électrique et interphonie vidéo'
        ],
        optionsInstallation: [
          'Fixation toiture terrasse béton avec plots autoportants sans percement d’étanchéité',
          'Fixation toiture tuiles ou bac acier avec étriers inox',
          'Pose murale élégante de la batterie et de l’onduleur dans buanderie ou garage'
        ]
      },
      conditionsInstallation: [
        'Surface de toiture requise : environ 26 m² bien exposée sans ombrage de bâtiment voisin',
        'Mise à la terre indépendante de l’installation solaire avec barre d’équipotentialité',
        'Ligne d’alimentation dédiée depuis le tableau électrique général de la villa'
      ],
      garantieDetails: 'Garantie de 25 ans sur la production linéaire des panneaux photovoltaïques, 5 ans sur la batterie Lithium LiFePO4 et 3 ans sur l’onduleur hybride. SAV réactif sous 24h garanti par DIARRA ENERGIE.',
      prixApplicables: 'Prix catalogue kit complet : 3 650 000 FCFA TTC. Forfait installation clé en main par nos ingénieurs certifiés : +280 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-kit-vil-02',
    reference: 'DEB-KIT-VILLA-10KW-PRESTIGE',
    nom: 'Système Solaire Hybride Prestige Grande Villa 10kVA / 20.48kWh LiFePO4 & 16 Panneaux 550Wc',
    categorie: 'kits-solaires',
    sousCategorie: 'Les systèmes pour maisons et villas',
    applications: ['Les systèmes pour maisons et villas', 'Grandes résidences', 'Villas R+2', 'Climatisation centrale', 'Autonomie continue'],
    descriptionCourte: 'Centrale solaire domestique très haute puissance pour grandes villas avec 4 à 6 climatiseurs et piscine.',
    descriptionDetaillee: 'Offre haut de gamme comprenant un onduleur hybride 10kVA monophasé ou triphasé 400V couplé à deux armoires Lithium LiFePO4 murales totalisant 20.48 kWh de réserve, et 16 panneaux solaires 550Wc (8.8kWc). Permet de faire fonctionner toute la maison en totale indépendance énergétique.',
    prixFCFA: 6850000,
    estSurDevis: false,
    stockDisponible: 8,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_onduleur_hybride_solaire_1791983804078.jpg',
    specs: {
      puissance: '10 000 VA / 10 000 W Pur Sinus',
      panneauSolaire: '16x 550Wc Monocristallin Tier-1 (8.8 kWc)',
      batterieType: 'Double Pack Lithium LiFePO4 51.2V 200Ah couplés en parallèle',
      batterieCapacite: '20.48 kWh utile (400Ah @ 51.2V)',
      autonomie: 'Autonomie 24h/24 : 4 climatiseurs, pompe de piscine 1.5CV, chauffe-eau solaire d’appoint, électroménager complet',
      tensionFonctionnement: '230V monophasé ou 400V triphasé / 48V DC bus batterie',
      garantie: 'Panneaux 25 ans / Batterie 5 ans / Onduleur 3 ans',
      certifications: ['CE', 'IEC 62109', 'TÜV', 'UN38.3'],
      specsKitsStockage: {
        puissancePanneaux: '8 800 Wc (16 panneaux 550Wc)',
        puissanceOnduleur: '10.0 kVA / 10 000 W Pur Sinus avec double tracker MPPT',
        capaciteBatterie: '20.48 kWh utile (2x Armoires LiFePO4 10.24kWh en parallèle)',
        tensionBatteries: '51.2V DC',
        technologieBatterie: 'Lithium LiFePO4 Grade-A (6000 cycles à 80% DOD)',
        typeOnduleur: 'Onduleur Hybride Double MPPT avec synchronisation groupe et réseau',
        autonomieEstimee: '24 heures à 36 heures d’autonomie complète',
        equipementsInclus: [
          '16x Panneaux solaires monocristallins 550Wc Tier-1',
          '1x Onduleur Hybride 10kVA double MPPT avec monitoring connecté',
          '2x Armoires murales Lithium LiFePO4 51.2V 200Ah (20.48 kWh au total)',
          '1x Coffret parafoudre DC double tracker 1000V',
          '1x Armoire de protection AC avec inverseur motorisé automatique',
          'Câbles de puissance 70mm² et connecteurs MC4 étanches'
        ],
        usagesRecommandes: [
          '4 à 5 Climatiseurs Inverter simultanés',
          'Pompe de filtration de piscine (1.5 HP)',
          'Grand équipement de cuisine (fours, 2 réfrigérateurs, lave-linge)',
          'Éclairage architectural extérieur et intérieur'
        ],
        optionsInstallation: [
          'Fixation terrasse toiture dalle béton ou pergolas solaires',
          'Installation en local technique avec coffret d’intégration'
        ]
      },
      conditionsInstallation: [
        'Surface de toiture nécessaire : 40 m² dégagée',
        'Alimentation triphasée ou monophasée selon abonnement'
      ],
      garantieDetails: 'Garantie de 25 ans sur les panneaux photovoltaïques, 5 ans sur les batteries Lithium et 3 ans sur l’onduleur.',
      prixApplicables: 'Prix catalogue kit matériel complet : 6 850 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },

  // 4.3 Les solutions pour boutiques et bureaux
  {
    id: 'deb-kit-btq-01',
    reference: 'DEB-KIT-COMMERCE-3KW',
    nom: 'Solution Solaire Anti-Coupure Boutiques & Commerces Alimentaires 3kVA / 5.12kWh LiFePO4',
    categorie: 'kits-solaires',
    sousCategorie: 'Les solutions pour boutiques et bureaux',
    applications: ['Les solutions pour boutiques et bureaux', 'Boutiques d’alimentation', 'Pharmacies', 'Supérettes', 'Boulangeries'],
    descriptionCourte: 'Sécurise vos frigos et congélateurs commerciaux contre les pannes et pertes de marchandises alimentaires ou pharmaceutiques.',
    descriptionDetaillee: 'Conçu spécifiquement pour les gérants de commerces, supérettes, boucheries et pharmacies d’Afrique de l’Ouest. Maintient sous tension permanente les congélateurs coffres, vitrines réfrigérées, caisses enregistreuses, balance et système d’éclairage même en cas de coupure prolongée de 24 heures.',
    prixFCFA: 1980000,
    estSurDevis: false,
    stockDisponible: 20,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_kit_solaire_hybride_1791734655495.jpg',
    specs: {
      puissance: '3 000 VA / 3 000 W Pur Sinus',
      panneauSolaire: '6x 450Wc Monocristallin (2.7 kWc)',
      batterieType: 'Lithium Fer Phosphate LiFePO4',
      batterieCapacite: '51.2V / 100Ah (5.12 kWh utile)',
      autonomie: 'Maintient 2 congélateurs commerciaux, vitrine positive, caisse et éclairage pendant 16 à 22h',
      tensionFonctionnement: '230V AC monophasé / 48V DC',
      garantie: 'Panneaux 25 ans / Batterie 5 ans / Onduleur 2 ans',
      certifications: ['CE', 'RoHS', 'ISO 9001'],
      specsKitsStockage: {
        puissancePanneaux: '2 700 Wc (6 modules 450Wc)',
        puissanceOnduleur: '3.0 kVA / 3 000 W Pur Sinus avec MPPT 60A',
        capaciteBatterie: '5.12 kWh utile (Batterie LiFePO4 51.2V 100Ah)',
        tensionBatteries: '51.2V DC (Bus 48V nominal)',
        technologieBatterie: 'Lithium LiFePO4 Smart BMS (6000 cycles)',
        typeOnduleur: 'Onduleur Hybride Pur Sinus avec basculement 10ms (sans micro-coupure pour caisse)',
        autonomieEstimee: '18 heures d’autonomie sur charges froides et caisse',
        equipementsInclus: [
          '6x Panneaux solaires monocristallins 450Wc',
          '1x Onduleur Hybride 3kVA / 48V Pur Sinus MPPT',
          '1x Batterie murale Lithium LiFePO4 5.12kWh avec écran LCD',
          '1x Coffret de protection DC parafoudre 800V',
          '1x Coffret AC avec disjoncteur différentiel',
          'Câbles solaires et connecteurs MC4'
        ],
        usagesRecommandes: [
          '2 Congélateurs coffres commerciaux (300L à 500L)',
          '1 Vitrine réfrigérée à boissons',
          'Caisse tactile, balance électronique, TPE et imprimante tickets',
          'Éclairage LED de la boutique et enseigne extérieure',
          'Vidéosurveillance CCTV 4 caméras'
        ],
        optionsInstallation: [
          'Fixation toiture tôle bac alu ou toiture terrasse',
          'Installation de la batterie et de l’onduleur en arrière-boutique'
        ]
      },
      conditionsInstallation: [
        'Ventilation convenable en arrière-boutique',
        'Raccordement direct au départ des réfrigérateurs'
      ],
      garantieDetails: 'Garantie de 5 ans sur la batterie Lithium, 2 ans sur l’onduleur et 25 ans sur les panneaux solaires.',
      prixApplicables: 'Prix catalogue kit complet : 1 980 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },
  {
    id: 'deb-kit-bur-02',
    reference: 'DEB-KIT-BUREAU-6KW',
    nom: 'Système Solaire Hybride Bureaux Professionnels & Agences 6kVA / 10.24kWh LiFePO4',
    categorie: 'kits-solaires',
    sousCategorie: 'Les solutions pour boutiques et bureaux',
    applications: ['Les solutions pour boutiques et bureaux', 'Cabinets d’avocats', 'Bureaux d’études', 'Agences bancaires', 'Cabinets médicaux'],
    descriptionCourte: 'Zéro interruption pour vos serveurs, postes de travail informatiques et climatisation de bureaux.',
    descriptionDetaillee: 'Offre professionnelle pour entreprises tertiaires et agences. Temps de transfert quasi-nul (<10ms) empêchant tout redémarrage des ordinateurs, box fibre et serveurs lors des basculements réseau.',
    prixFCFA: 4200000,
    estSurDevis: false,
    stockDisponible: 10,
    delaiLivraisonJours: 3,
    imagePrincipale: './images/product_onduleur_hybride_solaire_1791983804078.jpg',
    specs: {
      puissance: '6 000 VA / 6 000 W Pur Sinus facteur 1.0',
      panneauSolaire: '12x 550Wc Monocristallin Tier-1 (6.6 kWc)',
      batterieType: 'Lithium LiFePO4 Smart BMS 51.2V 200Ah',
      batterieCapacite: '10.24 kWh utile',
      autonomie: 'Alimente 10 postes PC, serveurs, copieur réseau, éclairage et 2 clims pendant les heures de bureau',
      tensionFonctionnement: '230V AC monophasé / 48V DC',
      garantie: '3 ans onduleur / 5 ans batterie / 25 ans panneaux',
      certifications: ['CE', 'IEC 62040', 'ISO 9001'],
      specsKitsStockage: {
        puissancePanneaux: '6 600 Wc (12 panneaux solaires 550Wc)',
        puissanceOnduleur: '6.0 kVA / 6 000 W Pur Sinus avec double sortie AC secourue',
        capaciteBatterie: '10.24 kWh utile (Pack mural Lithium LiFePO4)',
        tensionBatteries: '51.2V DC',
        technologieBatterie: 'Lithium LiFePO4 Grade-A (6000 cycles)',
        typeOnduleur: 'Onduleur Hybride Pur Sinus temps de transfert <10ms compatible onduleurs informatiques',
        autonomieEstimee: '18 à 24 heures d’autonomie sur charges tertiaires',
        equipementsInclus: [
          '12x Panneaux solaires monocristallins 550Wc',
          '1x Onduleur Hybride 6kVA / 48V Pur Sinus MPPT avec port communication RS485/WiFi',
          '1x Armoire murale Lithium LiFePO4 51.2V 200Ah',
          'Coffrets parafoudres DC et AC homologués',
          'Structures de montage toiture et câblerie cuivre'
        ],
        usagesRecommandes: [
          '8 à 12 Postes informatiques complets (écrans + UC + imprimantes)',
          '1 Baie serveur réseau, routeur fibre, switch PoE et caméras',
          '2 Climatiseurs Inverter 1.5 CV',
          'Éclairage LED des bureaux et salle de réunion'
        ],
        optionsInstallation: [
          'Montage toiture terrasse dalle ou bac alu',
          'Installation en baie technique ou buanderie sécurisée'
        ]
      },
      conditionsInstallation: [
        'Séparation du tableau électrique entre charges ondulées (secourues) et non-secourues'
      ],
      garantieDetails: 'Garantie intégrale de 5 ans sur la batterie Lithium et 3 ans sur l’onduleur.',
      prixApplicables: 'Prix catalogue : 4 200 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 4.4 Les installations pour entreprises
  {
    id: 'deb-kit-ent-01',
    reference: 'DEB-KIT-INDUS-15KW',
    nom: 'Centrale Solaire Hybride Triphasée pour Entreprises & PME 15kVA / 20.48kWh LiFePO4',
    categorie: 'kits-solaires',
    sousCategorie: 'Les installations pour entreprises',
    applications: ['Les installations pour entreprises', 'PME industrielles', 'Cliniques médicales', 'Usines agroalimentaires', 'Sièges sociaux'],
    descriptionCourte: 'Centrale triphasée 380V/400V avec zéro injection réseau et synchronisation automatique groupe électrogène.',
    descriptionDetaillee: 'Système complet d’autoconsommation industrielle conçu pour réduire de 60% à 75% la facture Senelec / SBEE et éliminer les pertes de productivité dues aux coupures. Comprend onduleur hybride triphasé 15kW, armoire rackable de 2 modules Lithium LiFePO4 totalisant 20.48kWh et un champ photovoltaïque de 32 panneaux solaires 550Wc (17.6kWc).',
    prixFCFA: 9850000,
    estSurDevis: true,
    stockDisponible: 6,
    delaiLivraisonJours: 7,
    imagePrincipale: './images/product_onduleur_hybride_solaire_1791983804078.jpg',
    specs: {
      puissance: '15 kW (15 000 VA) Triphasé 400V Pur Sinus',
      panneauSolaire: '32x 550Wc Tier-1 Monocristallin (17.6 kWc)',
      batterieType: 'Lithium LiFePO4 Rackable Haute Capacité',
      batterieCapacite: '20.48 kWh utile (extensible jusqu’à 60 kWh)',
      autonomie: 'Maintient la production d’atelier, chambres froides, 6 climatiseurs et serveurs 24h/24',
      tensionFonctionnement: '3× 400V AC + Neutre / 48V DC ou Haute Tension',
      garantie: 'Panneaux 25 ans / Batterie 5 ans / Onduleur 3 ans',
      certifications: ['CE', 'IEC 62109-1/-2', 'IEC 62619', 'TÜV'],
      specsKitsStockage: {
        puissancePanneaux: '17 600 Wc (32 modules monocristallins 550Wc Tier-1)',
        puissanceOnduleur: '15.0 kVA / 15 000 W Triphasé 400V avec double tracker MPPT haute tension',
        capaciteBatterie: '20.48 kWh utile (2x packs Lithium 10.24kWh)',
        tensionBatteries: '51.2V DC (ou banc haute tension 200V-400V selon configuration)',
        technologieBatterie: 'Lithium LiFePO4 Grade-A (6000 cycles)',
        typeOnduleur: 'Onduleur Hybride Industriel Triphasé avec fonction Peak-Shaving et Zéro Injection',
        autonomieEstimee: '14 à 20 heures d’activité industrielle selon profils de charge',
        equipementsInclus: [
          '32x Panneaux solaires monocristallins 550Wc Tier-1',
          '1x Onduleur hybride triphasé 15kW avec module de communication Ethernet/4G',
          '1x Armoire rack industrielle comprenant 2 modules LiFePO4 51.2V 200Ah',
          '1x Smart Meter triphasé avec tores de mesure pour régulation zéro injection',
          '1x Armoire de protection AC triphasée avec inverseur motorisé et parafoudre Type 1+2',
          '2x Coffrets parafoudre DC 1000V multipistes',
          'Structures portantes métalliques galvanisées et câblage armé'
        ],
        usagesRecommandes: [
          'Lignes d’emballage et machines d’atelier PME',
          'Blocs opératoires et chambres d’hospitalisation de cliniques',
          '6 à 8 Climatiseurs 2CV et chambres froides',
          'Serveurs informatiques, standard téléphonique et éclairage industriel'
        ],
        optionsInstallation: [
          'Pose sur toiture d’entrepôt bac acier avec fixations étanches',
          'Ombrières solaires pour parking d’entreprise',
          'Local technique dédié avec baie de distribution TGBT'
        ]
      },
      conditionsInstallation: [
        'Audit énergétique préalable et relevé de courbes de charge réalisé par DIARRA ENERGIE',
        'TGBT conforme aux normes NFC 15-100 avec coupure générale d’urgence'
      ],
      garantieDetails: 'Garantie décennale sur les structures, 25 ans de performance sur les panneaux, 5 ans sur les batteries Lithium et 3 ans sur l’onduleur. Contrat de maintenance annuel avec télé-suivi 24h/24.',
      prixApplicables: 'Prix sur devis personnalisé à partir de 9 850 000 FCFA HT selon contraintes de toiture et options de raccordement.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-kit-ent-02',
    reference: 'DEB-KIT-INDUS-30KW',
    nom: 'Installation Solaire Industrielle 30kVA Triphasé avec Armoire Rack LiFePO4 40.96kWh',
    categorie: 'kits-solaires',
    sousCategorie: 'Les installations pour entreprises',
    applications: ['Les installations pour entreprises', 'Grandes industries', 'Hôtels & Resorts', 'Entrepôts logistiques', 'Usines de transformation'],
    descriptionCourte: 'Centrale solaire hybride 30kW / 40kWh pour grands sites industriels, complexes hôteliers et exploitations agro-industrielles.',
    descriptionDetaillee: 'Offre clé en main de forte puissance couplant 56 panneaux solaires 550Wc (30.8kWc), 2 onduleurs 15kVA en parallèle ou 1 onduleur industriel 30kVA triphasé, et une armoire batterie rackable 40.96kWh LiFePO4. Zéro coupure pour les chaînes de fabrication.',
    prixFCFA: 18500000,
    estSurDevis: true,
    stockDisponible: 3,
    delaiLivraisonJours: 14,
    imagePrincipale: './images/hero_diarra_solar_1791734623148.jpg',
    specs: {
      puissance: '30 kW Triphasé 380V / 400V',
      panneauSolaire: '56x 550Wc Monocristallin (30.8 kWc)',
      batterieType: 'Lithium LiFePO4 Armoire Rack 4 modules 10.24kWh',
      batterieCapacite: '40.96 kWh utile (800Ah @ 51.2V)',
      autonomie: 'Assure la continuité 24h/24 des processus critiques',
      garantie: '5 ans équipements / 25 ans panneaux',
      specsKitsStockage: {
        puissancePanneaux: '30 800 Wc (56 panneaux 550Wc)',
        puissanceOnduleur: '30.0 kVA / 30 000 W Triphasé Pur Sinus',
        capaciteBatterie: '40.96 kWh utile (Banc 4 armoires 10.24kWh)',
        tensionBatteries: '51.2V DC (parallélisable)',
        technologieBatterie: 'Lithium LiFePO4 Smart BMS industriel (6000 cycles)',
        typeOnduleur: 'Centrale hybride triphasée industrielle avec automate programmable',
        autonomieEstimee: '18 à 24 heures d’autonomie complète sur charges industrielles prioritaires',
        equipementsInclus: [
          '56x Panneaux solaires monocristallins 550Wc Tier-1',
          'Armoire de conversion solaire triphasée 30kW',
          'Armoire batterie industrielle LiFePO4 40.96kWh',
          'TGBT avec inverseur de source motorisé et télégestion GSM/Fibre',
          'Structures métalliques renforcées traitées anti-corrosion'
        ],
        usagesRecommandes: [
          'Chambres froides industrielles négatives et positives',
          'Lignes de conditionnement automatisées',
          'Climatisation centrale de sièges sociaux et hôtels',
          'Centrale de pompage et de traitement d’eau'
        ],
        optionsInstallation: [
          'Toiture métallique d’usine avec renforts de charpente',
          'Centrale au sol clôturée ou ombrières de stationnement'
        ]
      },
      conditionsInstallation: [
        'Étude de faisabilité et note de calcul de structure toiture validée par bureau de contrôle'
      ],
      garantieDetails: 'Garantie de 10 ans sur les structures, 5 ans sur le stockage LiFePO4 et 25 ans sur le champ solaire.',
      prixApplicables: 'Sur devis technique quantitatif à partir de 18 500 000 FCFA HT.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },

  // 4.5 Les kits avec batteries de stockage
  {
    id: 'deb-kit-bat-01',
    reference: 'DEB-KIT-STOCK-5KW-10KWH',
    nom: 'Kit Énergie Solaire avec Armoire Murale Batterie LiFePO4 51.2V 200Ah (10.24kWh) & Onduleur 5kW',
    categorie: 'kits-solaires',
    sousCategorie: 'Les kits avec batteries de stockage',
    applications: ['Les kits avec batteries de stockage', 'Stockage résidentiel', 'Secours batterie', 'Autoconsommation nocturne'],
    descriptionCourte: 'Kit complet de stockage d’énergie centré sur la batterie Lithium LiFePO4 10.24kWh et onduleur hybride 5kW avec gestionnaire de flux intelligent.',
    descriptionDetaillee: 'Ce kit privilégie l’autonomie nocturne et la résilience face aux défaillances répétées du réseau électrique. Il stocke l’excédent solaire produit le jour pour restituer 100% de votre électricité la nuit.',
    prixFCFA: 2850000,
    estSurDevis: false,
    stockDisponible: 15,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_batterie_lithium_lifepo4_1791983803580.jpg',
    specs: {
      puissance: '5 000 VA / 5 000 W Pur Sinus',
      batterieType: 'Lithium Fer Phosphate LiFePO4 Smart BMS',
      batterieCapacite: '51.2V / 200Ah (10.24 kWh)',
      autonomie: '18h à 24h d’autonomie complète sur villa moyenne',
      tensionFonctionnement: '230V AC / 48V (51.2V) DC',
      garantie: '5 ans batterie / 3 ans onduleur',
      certifications: ['CE', 'UN38.3', 'IEC 62619'],
      specsKitsStockage: {
        puissancePanneaux: 'Optionnel (Compatible jusqu’à 5 500 Wc de panneaux)',
        puissanceOnduleur: '5.0 kVA / 5 000 W Pur Sinus avec MPPT 80A intégré',
        capaciteBatterie: '10.24 kWh utile (Pack mural Lithium LiFePO4)',
        tensionBatteries: '51.2V DC (Bus 48V nominal)',
        technologieBatterie: 'Lithium LiFePO4 cellules prismatiques Grade-A (6000 cycles)',
        typeOnduleur: 'Onduleur Hybride Pur Sinus avec basculement sans coupure <10ms',
        autonomieEstimee: '20 heures d’alimentation continue sans réseau',
        equipementsInclus: [
          '1x Armoire murale Lithium LiFePO4 51.2V 200Ah (10.24kWh)',
          '1x Onduleur Hybride Pur Sinus 5kVA / 48V avec interface écran tactile',
          '1x Coffret parafoudre AC et DC avec sectionneurs',
          'Câbles de batterie extra-souples 50mm² avec fusibles NH00 160A',
          'Module de supervision WiFi sur application mobile iOS / Android'
        ],
        usagesRecommandes: [
          'Alimentation 24h/24 de tous les récepteurs domestiques',
          'Sécurisation des appareils sensibles aux surtensions',
          'Effacement des heures de pointe tarifaire'
        ],
        optionsInstallation: [
          'Fixation murale sur mur porteur béton ou brique pleine',
          'Pose sur socle métallique au sol avec aération'
        ]
      },
      conditionsInstallation: [
        'Local aéré avec température comprise entre 10°C et 45°C'
      ],
      garantieDetails: 'Garantie de 5 ans sur la batterie Lithium et 3 ans sur l’onduleur.',
      prixApplicables: 'Prix catalogue kit de stockage : 2 850 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-kit-bat-02',
    reference: 'DEB-KIT-STOCK-3.5KW-5KWH',
    nom: 'Pack Stockage Solaire Haute Sécurité LiFePO4 48V 100Ah (5.12kWh) avec Onduleur Hybride 3.5kW',
    categorie: 'kits-solaires',
    sousCategorie: 'Les kits avec batteries de stockage',
    applications: ['Les kits avec batteries de stockage', 'Appartements', 'Commerces', 'Secours informatique'],
    descriptionCourte: 'Ensemble compact onduleur 3.5kW + batterie lithium 5.12kWh pour résidences et commerces nécessitant une sécurité continue.',
    descriptionDetaillee: 'Offre prête à brancher combinant la sécurité du Lithium LiFePO4 à la performance d’un onduleur pur sinus 3500W. Prend le relais instantanément lors des coupures de courant pour préserver vos équipements.',
    prixFCFA: 1650000,
    estSurDevis: false,
    stockDisponible: 22,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_batterie_lithium_lifepo4_1791983803580.jpg',
    specs: {
      puissance: '3 500 VA / 3 500 W Pur Sinus',
      batterieType: 'Lithium Fer Phosphate (LiFePO4)',
      batterieCapacite: '51.2V / 100Ah (5.12 kWh)',
      autonomie: '12h à 18h d’autonomie',
      tensionFonctionnement: '230V AC / 48V DC',
      garantie: '5 ans batterie / 2 ans onduleur',
      specsKitsStockage: {
        puissancePanneaux: 'Optionnel (compatible jusqu’à 4 000 Wc de panneaux)',
        puissanceOnduleur: '3.5 kVA / 3 500 W Pur Sinus MPPT',
        capaciteBatterie: '5.12 kWh utile (51.2V 100Ah)',
        tensionBatteries: '51.2V DC',
        technologieBatterie: 'Lithium LiFePO4 6000 cycles',
        typeOnduleur: 'Onduleur Hybride Pur Sinus compact',
        autonomieEstimee: '14 heures sur charge de 350W',
        equipementsInclus: [
          '1x Batterie murale Lithium LiFePO4 51.2V 100Ah',
          '1x Onduleur 3.5kVA / 48V Pur Sinus MPPT',
          'Coffret de protection et câblerie de raccordement'
        ],
        usagesRecommandes: [
          'Réfrigérateur, TV, ordinateurs, éclairage, ventilateurs'
        ],
        optionsInstallation: [
          'Fixation murale buanderie ou garage'
        ]
      },
      conditionsInstallation: ['Installation intérieure au sec'],
      garantieDetails: 'Garantie de 5 ans constructeur.',
      prixApplicables: 'Prix catalogue : 1 650 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 4.6 Les panneaux photovoltaïques
  {
    id: 'deb-pv-550-mono',
    reference: 'DEB-PV-550-MONO',
    nom: 'Panneau Solaire Monocristallin 550Wc Half-Cell Tier-1 Cadre Anodisé 144 Demi-Cellules',
    categorie: 'kits-solaires',
    sousCategorie: 'Les panneaux photovoltaïques',
    applications: ['Les panneaux photovoltaïques', 'Grandes centrales', 'Toitures résidentielles', 'Pompage solaire', 'Installations industrielles'],
    descriptionCourte: 'Module photovoltaïque monocristallin à haut rendement (21.5%) spécialement conçu pour résister aux climats chauds d’Afrique.',
    descriptionDetaillee: 'Module solaire Tier-1 haute performance équipé de 144 demi-cellules monocristallines MBB (Multi Busbar). Faible coefficient de perte thermique (-0.35%/°C), verre trempé haute transmissivité 3.2mm traité anti-salissure et cadre en alliage d’aluminium anodisé 35mm résistant aux vents côtiers et brouillards salins.',
    prixFCFA: 65000,
    estSurDevis: false,
    stockDisponible: 450,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_panneau_photovoltaique_tier1_1791983803226.jpg',
    specs: {
      puissance: '550 Wc (Tolérance positive 0 ~ +5W)',
      tensionFonctionnement: 'Vmp: 42.1V / Voc: 49.9V / Imp: 13.06A / Isc: 13.98A',
      dimensions: '2279 x 1134 x 35 mm (Poids: 28.5 kg)',
      indiceProtection: 'IP68 étanche (Boîte de jonction 3 diodes bypass)',
      garantie: '12 ans produit / 25 ans rendement linéaire à 84.8%',
      certifications: ['IEC 61215', 'IEC 61730', 'TÜV Rheinland', 'CE', 'ISO 9001'],
      specsKitsStockage: {
        puissancePanneaux: '550 Wc unitaire (Rendement surfacique 21.5%)',
        puissanceOnduleur: 'Compatible avec onduleurs centraux et hybrides de toute puissance',
        capaciteBatterie: 'Adapté pour recharge parcs 24V, 48V et Haute Tension',
        tensionBatteries: 'Tension max système : 1 500V DC',
        technologieBatterie: 'Composant de production photovoltaïque',
        typeOnduleur: 'Compatible onduleurs réseau, hybrides et variateurs de pompage MPPT',
        equipementsInclus: [
          'Panneau solaire cadré avec câbles solaires 4mm² longueur 1.2m et connecteurs MC4 d’origine montés d’usine'
        ],
        usagesRecommandes: [
          'Champs photovoltaïques pour toitures villas, entreprises et fermes de pompage',
          'Idéal pour chaînes haute tension jusqu’à 1000V et 1500V DC'
        ],
        optionsInstallation: [
          'Pose portrait ou paysage sur rails aluminium toiture',
          'Fixation au sol sur structures monopieu ou bipieu galvanisées'
        ]
      },
      conditionsInstallation: [
        'Inclinaison recommandée : 12° à 15° plein Sud pour Sénégal, Mali, Niger, Burkina Faso',
        'Serrage au couple préconisé avec étriers de fixation aluminium et boulonnerie inox A2'
      ],
      garantieDetails: 'Garantie produit constructeur de 12 ans et garantie de rendement linéaire de 25 ans à 84.8% minimum.',
      prixApplicables: 'Prix unitaire catalogue : 65 000 FCFA TTC. Tarif dégressif par palette (31 pièces) : 58 000 FCFA TTC / panneau.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-pv-600-bifacial',
    reference: 'DEB-PV-600-BIFACIAL',
    nom: 'Panneau Photovoltaïque Bi-facial Haute Efficacité N-Type 600Wc Double Verre',
    categorie: 'kits-solaires',
    sousCategorie: 'Les panneaux photovoltaïques',
    applications: ['Les panneaux photovoltaïques', 'Toitures blanches', 'Ombrières solaires', 'Parcs au sol', 'Centrales de pompage'],
    descriptionCourte: 'Module bi-facial double verre N-Type générant jusqu’à +25% d’énergie supplémentaire par la face arrière grâce à l’albédo.',
    descriptionDetaillee: 'Technologie d’avant-garde N-Type TOPCon 600Wc avec cellule bi-faciale et double verre trempé 2.0mm + 2.0mm. Résistance exceptionnelle aux micro-fissures, à l’humidité tropicale et à la dégradation PID/LID. Rendement face avant de 22.2% avec gain bi-facial jusqu’à 750Wc effectifs.',
    prixFCFA: 82000,
    estSurDevis: false,
    stockDisponible: 280,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_panneau_photovoltaique_tier1_1791983803226.jpg',
    specs: {
      puissance: '600 Wc face avant (+5% à +25% gain face arrière)',
      tensionFonctionnement: 'Vmp: 44.2V / Voc: 52.1V / Imp: 13.58A',
      dimensions: '2384 x 1134 x 30 mm (Poids: 32 kg)',
      indiceProtection: 'IP68 double verre',
      garantie: '15 ans produit / 30 ans rendement linéaire',
      certifications: ['IEC 61215', 'IEC 61730', 'TÜV', 'CE'],
      specsKitsStockage: {
        puissancePanneaux: '600 Wc à 750 Wc effectifs avec gain bi-facial',
        puissanceOnduleur: 'Onduleurs hybrides et de chaîne MPPT',
        equipementsInclus: ['Panneau bi-facial double verre avec connecteurs MC4-EVO2'],
        usagesRecommandes: [
          'Ombrières de parking avec sol clair',
          'Toitures terrasses peintes en blanc ou gravillonnées',
          'Centrales au sol sur sable ou calcaire'
        ],
        optionsInstallation: ['Montage surélevé pour optimiser la réflexion arrière']
      },
      conditionsInstallation: ['Distance minimale de 40cm par rapport au sol ou à la toiture pour capter l’albédo'],
      garantieDetails: 'Garantie produit de 15 ans et garantie de rendement linéaire de 30 ans.',
      prixApplicables: 'Prix unitaire catalogue : 82 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 4.7 Les batteries
  {
    id: 'deb-bat-mur-01',
    reference: 'DEB-BAT-LIFEPO4-51.2V-200AH',
    nom: 'Batterie Solaire Murale Lithium LiFePO4 51.2V 200Ah (10.24kWh) Écran LCD & Smart BMS 6000 Cycles',
    categorie: 'kits-solaires',
    sousCategorie: 'Les batteries',
    applications: ['Les batteries', 'Stockage d’énergie', 'Villas & PME', 'Autonomie continue', 'LiFePO4 longue durée'],
    descriptionCourte: 'Batterie de stockage murale Lithium LiFePO4 10.24kWh avec écran tactile LCD, communication CAN/RS485 et garantie 6000 cycles.',
    descriptionDetaillee: 'La batterie résidentielle et commerciale haut de gamme DIARRA ENERGIE. Équipée de cellules prismatiques LiFePO4 Grade-A neuves et d’un BMS haute performance autorisant une décharge continue jusqu’à 100A (5kW) et des pics à 150A. Compatible nativement avec les onduleurs Deye, Growatt, Victron, Must, SRNE, Luxpower et Sofar.',
    prixFCFA: 1750000,
    estSurDevis: false,
    stockDisponible: 32,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_batterie_lithium_lifepo4_1791983803580.jpg',
    specs: {
      puissance: 'Capacité nominale : 10 240 Wh (10.24 kWh) / Décharge continue 5 120 W',
      batterieType: 'Lithium Fer Phosphate (LiFePO4) Grade-A',
      batterieCapacite: '51.2V / 200Ah',
      tensionFonctionnement: 'Plage de fonctionnement : 44.8V à 57.6V DC (Nominal 51.2V)',
      dimensions: '650 x 480 x 220 mm (Poids: 88 kg)',
      indiceProtection: 'IP54 boîtier acier thermolaqué blanc',
      garantie: '5 ans constructeur (Durée de vie estimée 15 ans)',
      certifications: ['UN38.3', 'CE', 'IEC 62619', 'MSDS', 'RoHS'],
      specsKitsStockage: {
        capaciteBatterie: '10.24 kWh (200Ah sous 51.2V)',
        tensionBatteries: '51.2V DC (Système 48V standard)',
        technologieBatterie: 'Lithium LiFePO4 cellules prismatiques Grade-A (6000 cycles à 80% DOD)',
        autonomieEstimee: '18h à 24h d’alimentation pour un foyer moyen (consommation 400W moyenne)',
        equipementsInclus: [
          '1x Pack batterie murale 51.2V 200Ah avec écran tactile couleur',
          'Support métallique de fixation murale robuste avec chevilles d’ancrage',
          'Câbles de communication CAN et RS485 préconfigurés pour onduleurs',
          'Câbles de puissance 50mm² rouge/noir avec cosses M8 isolées'
        ],
        usagesRecommandes: [
          'Stockage pour villas familiales, cliniques, agences bancaires et commerces',
          'Parallélisable jusqu’à 15 unités (soit 153.6 kWh au total)'
        ],
        optionsInstallation: [
          'Fixation murale sécurisée sur mur en maçonnerie pleine',
          'Pose au sol sur socle antivibratoire ventilé'
        ]
      },
      conditionsInstallation: [
        'Mur porteur capable de supporter 90 kg en charge',
        'Température de fonctionnement optimale entre 15°C et 35°C (max 50°C)',
        'Raccordement de la borne de terre carcasse obligatoire'
      ],
      garantieDetails: 'Garantie intégrale de 5 ans constructeur avec assistance et remplacement express par DIARRA ENERGIE.',
      prixApplicables: 'Prix catalogue : 1 750 000 FCFA TTC. Forfait câble et pose murale : +45 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-bat-rack-02',
    reference: 'DEB-BAT-RACK-48V-100AH',
    nom: 'Batterie Rackable Lithium LiFePO4 48V 100Ah (5.12kWh) Format 19 Pouces pour Baies Industrielles',
    categorie: 'kits-solaires',
    sousCategorie: 'Les batteries',
    applications: ['Les batteries', 'Baies serveurs', 'Télécoms', 'PME', 'Extensions modulaires'],
    descriptionCourte: 'Module batterie Lithium LiFePO4 au format tiroir rack 19" 3U pour armoires d’entreprises et centres de données.',
    descriptionDetaillee: 'Format standardisé 19 pouces pour intégration propre et sécurisée dans les armoires serveurs et baies techniques d’entreprises. Permet d’empiler de 1 à 12 modules dans une même armoire fermée à clé.',
    prixFCFA: 950000,
    estSurDevis: false,
    stockDisponible: 40,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_batterie_lithium_lifepo4_1791983803580.jpg',
    specs: {
      puissance: '5 120 Wh (5.12 kWh) / Décharge continue 50A (Pic 100A)',
      batterieType: 'Lithium LiFePO4 format rack 19" 3U',
      batterieCapacite: '51.2V / 100Ah',
      tensionFonctionnement: '48V - 51.2V DC',
      dimensions: '442 x 480 x 133 mm (Format 3U - 45 kg)',
      garantie: '5 ans constructeur',
      certifications: ['CE', 'UN38.3', 'IEC 62619'],
      specsKitsStockage: {
        capaciteBatterie: '5.12 kWh par tiroir rack',
        tensionBatteries: '51.2V DC',
        technologieBatterie: 'Lithium LiFePO4 Grade-A (6000 cycles)',
        equipementsInclus: ['Tiroir rack 3U avec poignées de levage, câbles de pontage parallèle et bus de communication'],
        usagesRecommandes: ['Baies serveurs informatiques, relais télécoms GSM, centrales industrielles modulaires'],
        optionsInstallation: ['Montage en baie rack 19 pouces standard (armoire 12U, 24U, 42U)']
      },
      conditionsInstallation: ['Installation en baie ventilée'],
      garantieDetails: 'Garantie de 5 ans constructeur.',
      prixApplicables: 'Prix catalogue : 950 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 4.8 Les onduleurs
  {
    id: 'deb-inv-5kva-wifi',
    reference: 'DEB-INV-HYB-5KVA-WIFI',
    nom: 'Onduleur Solaire Hybride Pur Sinus MPPT 5.0kVA / 5.0kW 48V avec Monitoring WiFi & Double Sortie AC',
    categorie: 'kits-solaires',
    sousCategorie: 'Les onduleurs',
    applications: ['Les onduleurs', 'Onduleurs hybrides', 'Villas & commerces', 'Gestion intelligente', 'Zéro coupure'],
    descriptionCourte: 'Onduleur hybride intelligent 5kW pur sinus avec régulateur MPPT 100A, fonctionnement avec ou sans batterie et suivi WiFi.',
    descriptionDetaillee: 'Véritable cerveau de l’installation photovoltaïque, cet onduleur hybride 5kVA / 5kW facteur de puissance 1.0 gère en temps réel les flux d’énergie entre les panneaux solaires, la batterie, le réseau public (Senelec/SBEE) et les appareils de la maison. Il dispose d’un chargeur solaire MPPT haute tension (120V - 450V DC) permettant d’optimiser la production même par temps voilé, et d’un temps de basculement ultra-rapide de 10 millisecondes.',
    prixFCFA: 490000,
    estSurDevis: false,
    stockDisponible: 35,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_onduleur_hybride_solaire_1791983804078.jpg',
    specs: {
      puissance: '5 000 VA / 5 000 W Continu (Pic admissible 10 000 VA pendant 5 sec)',
      tensionFonctionnement: 'Entrée PV : 120V à 450V DC / Entrée AC : 170V à 280V AC / Sortie : 230V AC ±2%',
      indiceProtection: 'IP21 intérieur avec filtre anti-poussière nettoyable',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'IEC 62109-1', 'IEC 62109-2', 'VDE 0126-1-1'],
      specsKitsStockage: {
        puissanceOnduleur: '5.0 kVA / 5 000 W Pur Sinus Facteur 1.0',
        puissancePanneaux: 'Prend en charge jusqu’à 5 500 Wc de panneaux solaires',
        tensionBatteries: '48V DC nominal (plage 40V - 60V DC)',
        typeOnduleur: 'Onduleur Hybride Pur Sinus Haute Fréquence avec régulateur MPPT 100A',
        autonomieEstimee: 'Selon parc batterie raccordé (compatible Plomb-Carbone, Gel et Lithium LiFePO4 avec communication BMS)',
        equipementsInclus: [
          '1x Onduleur hybride 5kW avec écran LCD couleur rétro-éclairé',
          '1x Dongle WiFi USB étanche pour application smartphone',
          'Support de fixation murale métallique',
          'Borniers de raccordement PV, AC et batterie avec capots de sécurité'
        ],
        usagesRecommandes: [
          'Gestion de l’alimentation de villas, bureaux et commerces',
          'Fonctionnement hybride autonome ou raccordé réseau avec zéro injection'
        ],
        optionsInstallation: [
          'Fixation murale verticale avec dégagement supérieur de 30cm pour dissipation'
        ]
      },
      conditionsInstallation: [
        'Installation en local technique abrité de la pluie et de la poussière excessive',
        'Section de câble batterie préconisée : 35mm² à 50mm² avec fusible de calibre 125A'
      ],
      garantieDetails: 'Garantie intégrale de 3 ans avec échange ou réparation en atelier certifié DIARRA ENERGIE.',
      prixApplicables: 'Prix catalogue unitaire : 490 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-inv-10kva-tri',
    reference: 'DEB-INV-HYB-10KW-TRI',
    nom: 'Onduleur Hybride Triphasé 10kVA 400V Haute Tension avec Double Tracker MPPT et Zéro Injection',
    categorie: 'kits-solaires',
    sousCategorie: 'Les onduleurs',
    applications: ['Les onduleurs', 'Onduleurs triphasés', 'Grandes villas', 'PME', 'Hôtels'],
    descriptionCourte: 'Onduleur hybride triphasé 10kW avec 2 trackers MPPT indépendants pour toitures multi-orientations et gestion réseau zéro injection.',
    descriptionDetaillee: 'Solution triphasée professionnelle capable d’équilibrer automatiquement les charges entre les 3 phases réseau. Fonctionne avec batteries Lithium LiFePO4 basse tension 48V ou haute tension. Idéal pour les installations tertiaires et villas disposant d’un abonnement triphasé.',
    prixFCFA: 1450000,
    estSurDevis: false,
    stockDisponible: 12,
    delaiLivraisonJours: 2,
    imagePrincipale: './images/product_onduleur_hybride_solaire_1791983804078.jpg',
    specs: {
      puissance: '10 000 VA / 10 000 W Triphasé 3× 400V + N',
      tensionFonctionnement: 'Tension PV max 800V DC / Plage MPPT 200V - 650V DC',
      indiceProtection: 'IP65 étanche pour pose extérieure sous auvent',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'IEC 62109', 'VDE-AR-N 4105'],
      specsKitsStockage: {
        puissanceOnduleur: '10.0 kVA Triphasé Pur Sinus 400V',
        puissancePanneaux: 'Jusqu’à 13 000 Wc de champ solaire (2 trackers MPPT)',
        tensionBatteries: '48V DC ou Haute Tension 160V-500V',
        typeOnduleur: 'Onduleur Hybride Triphasé Double MPPT avec smart meter inclus',
        equipementsInclus: ['Onduleur 10kW IP65, smart meter triphasé, module WiFi/LAN, fixations murales'],
        usagesRecommandes: ['Villas triphasées, cliniques, ateliers, immeubles de bureaux'],
        optionsInstallation: ['Fixation murale intérieure ou extérieure abritée IP65']
      },
      conditionsInstallation: ['Mise à la terre rigoureuse et équilibrage des phases'],
      garantieDetails: 'Garantie de 3 ans pièces et main d’œuvre.',
      prixApplicables: 'Prix catalogue : 1 450 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },

  // 4.9 Les régulateurs de charge
  {
    id: 'deb-reg-mppt-60a',
    reference: 'DEB-REG-MPPT-60A',
    nom: 'Régulateur de Charge Solaire MPPT 60A / 12V-24V-36V-48V Auto avec Écran LCD & Sonde Thermique',
    categorie: 'kits-solaires',
    sousCategorie: 'Les régulateurs de charge',
    applications: ['Les régulateurs de charge', 'Régulateurs MPPT', 'Sites isolés', 'Télécoms', 'Pompage & stockage'],
    descriptionCourte: 'Régulateur solaire intelligent MPPT 60A à reconnaissance automatique de tension de batterie (12V à 48V) avec rendement de conversion 98%.',
    descriptionDetaillee: 'Équipé d’un algorithme avancé de suivi du point de puissance maximale (MPPT) ultra-rapide garantissant un gain de production de +25% à +35% par rapport aux anciens régulateurs PWM. Écran LCD multifonctions affichant en temps réel la tension PV, le courant de charge batterie (A), la puissance instantanée (W) et l’historique des kWh produits. Compatible batteries Gel, AGM, Acide et Lithium LiFePO4.',
    prixFCFA: 145000,
    estSurDevis: false,
    stockDisponible: 55,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_regulateur_mppt_charge_1791983824035.jpg',
    specs: {
      puissance: 'Courant de charge max : 60 Ampères / Puissance PV max : 3 200W sous 48V (1 600W sous 24V / 800W sous 12V)',
      tensionFonctionnement: 'Tension circuit ouvert Voc max : 150V DC / Tension batterie : 12V / 24V / 36V / 48V Auto',
      dimensions: '260 x 185 x 80 mm (Radiateur aluminium passif - 3.2 kg)',
      indiceProtection: 'IP32 boîtier métallique ventilé',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'RoHS', 'ISO 9001'],
      specsKitsStockage: {
        puissancePanneaux: 'Prend en charge jusqu’à 3 200 Wc de panneaux solaires',
        puissanceOnduleur: 'Assure la charge contrôlée des parcs batteries',
        capaciteBatterie: 'Compatible parcs batteries de 100Ah à 1000Ah',
        tensionBatteries: '12V, 24V, 36V ou 48V détection automatique',
        technologieBatterie: 'Gel, AGM, Plomb ouvert, Lithium LiFePO4 avec réglage des tensions de float/boost',
        typeOnduleur: 'Régulateur MPPT haute efficacité (Tracking > 99.5%)',
        equipementsInclus: [
          '1x Régulateur MPPT 60A avec écran LCD',
          '1x Sonde de température de batterie déportée (câble 3m)',
          '1x Notice détaillée de programmation en français'
        ],
        usagesRecommandes: [
          'Sites isolés non raccordés, stations relais, fermes agricoles, maisons rurales'
        ],
        optionsInstallation: [
          'Fixation murale verticale sur surface plane incombustible'
        ]
      },
      conditionsInstallation: [
        'Connexion impérative de la batterie en premier avant de connecter les panneaux photovoltaïques',
        'Section de câble batterie recommandée : 16mm² à 25mm²'
      ],
      garantieDetails: 'Garantie intégrale de 3 ans avec remplacement direct en cas d’avarie.',
      prixApplicables: 'Prix catalogue unitaire : 145 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-reg-mppt-100a',
    reference: 'DEB-REG-MPPT-100A-PRO',
    nom: 'Régulateur Solaire Industriel MPPT 100A / 150V Voc avec Port RS485 et Refroidissement Aluminium',
    categorie: 'kits-solaires',
    sousCategorie: 'Les régulateurs de charge',
    applications: ['Les régulateurs de charge', 'Sites industriels', 'Grandes stations', 'Bancs batteries 48V'],
    descriptionCourte: 'Régulateur MPPT professionnel 100A pour parcs batteries 48V de grande capacité (jusqu’à 5 400Wc de panneaux).',
    descriptionDetaillee: 'Conçu pour les environnements chauds et exigeants d’Afrique de l’Ouest. Châssis en aluminium épais pour dissipation thermique passive sans ventilateur bruyant.',
    prixFCFA: 220000,
    estSurDevis: false,
    stockDisponible: 25,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_regulateur_mppt_charge_1791983824035.jpg',
    specs: {
      puissance: 'Courant de charge 100A continu / Puissance PV 5 400W sous 48V',
      tensionFonctionnement: 'Voc max 150V DC / Tension 12V/24V/36V/48V',
      garantie: '3 ans constructeur',
      certifications: ['CE', 'RoHS', 'IEC 62109'],
      specsKitsStockage: {
        puissancePanneaux: 'Jusqu’à 5 400 Wc de panneaux',
        tensionBatteries: '48V DC nominal',
        technologieBatterie: 'Lithium LiFePO4, Gel, Plomb-Carbone',
        typeOnduleur: 'Régulateur MPPT Industriel 100A avec communication Modbus RS485',
        equipementsInclus: ['Régulateur MPPT 100A, sonde thermique, connecteurs haute section'],
        usagesRecommandes: ['Centrales de télécommunications, pompage agricole mixte, grandes résidences isolées'],
        optionsInstallation: ['Fixation murale en armoire ventilée']
      },
      conditionsInstallation: ['Câbles cuivre 35mm² pour circuit batterie'],
      garantieDetails: 'Garantie de 3 ans constructeur.',
      prixApplicables: 'Prix catalogue : 220 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 4.10 Les câbles, protections et accessoires
  {
    id: 'deb-prot-coffret-dc-ac',
    reference: 'DEB-COFFRET-PROT-DCAC-5KW',
    nom: 'Coffret de Protection Solaire Combiné DC 1000V & AC 230V avec Parafoudres et Sectionneurs Cadenassables',
    categorie: 'kits-solaires',
    sousCategorie: 'Les câbles, protections et accessoires',
    applications: ['Les câbles, protections et accessoires', 'Protection parafoudre', 'Sécurité incendie', 'Conformité NFC 15-712-1'],
    descriptionCourte: 'Coffret combiné IP65 prêt à raccorder intégrant parafoudres DC 1000V, sectionneur rotatif cadenassable, disjoncteur différentiel AC 30mA et parafoudre secteur.',
    descriptionDetaillee: 'Élément indispensable de sécurité obligatoire selon la norme UTE C 15-712-1. Protège vos onduleurs et batteries contre la foudre, les surtensions du réseau Senelec/SBEE et les courts-circuits. Boîtier étanche IP65 avec porte transparente.',
    prixFCFA: 185000,
    estSurDevis: false,
    stockDisponible: 60,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_armoire_electrique_1791969776063.jpg',
    specs: {
      puissance: 'Compatible installations solaires de 3kW à 8kW monophasé',
      tensionFonctionnement: 'Partie DC : 1000V DC 25A / Partie AC : 230V AC 40A',
      indiceProtection: 'IP65 étanche à l’eau et à la poussière (polycarbonate auto-extinguible)',
      garantie: '3 ans constructeur',
      certifications: ['UTE C 15-712-1', 'IEC 61439-2', 'CE'],
      specsKitsStockage: {
        puissancePanneaux: 'Prend en charge 1 ou 2 chaînes (strings) jusqu’à 1000V DC',
        puissanceOnduleur: 'Protection amont et aval pour onduleurs jusqu’à 8kW',
        equipementsInclus: [
          '1x Coffret étanche IP65 18 modules avec rail DIN',
          '1x Parafoudre DC Type 2 1000V 40kA avec cartouches débrochables et voyant d’état',
          '1x Interrupteur-sectionneur DC rotatif cadenassable 1000V 32A',
          '2x Porte-fusibles solaires gPV 1000V avec cartouches 15A incluses',
          '1x Disjoncteur différentiel AC 230V 40A 30mA Type A haute immunité',
          '1x Parafoudre AC Type 2 275V 40kA avec disjoncteur de protection associé',
          'Presse-étoupes étanches M16/M20 et jeu d’étiquettes normalisées NFC'
        ],
        usagesRecommandes: [
          'Protection intégrale de kits solaires pour villas, commerces et bureaux',
          'Mise en conformité avec les assurances et les distributeurs d’électricité'
        ],
        optionsInstallation: [
          'Fixation murale à proximité immédiate de l’onduleur'
        ]
      },
      conditionsInstallation: [
        'Raccordement de la borne de terre du coffret au collecteur de terre principal par un câble vert/jaune de 16mm² minimum'
      ],
      garantieDetails: 'Garantie de 3 ans sur tous les composants modulaires Schneider / ABB / Dehn.',
      prixApplicables: 'Prix catalogue coffret précâblé prêt à poser : 185 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-acc-cables-mc4',
    reference: 'DEB-PACK-CABLES-MC4-6MM',
    nom: 'Pack Câbles Solaires H1Z2Z2-K 6mm² Cuivre Étamé (Rouge & Noir 50m) + Connecteurs MC4 IP68 & Cosses',
    categorie: 'kits-solaires',
    sousCategorie: 'Les câbles, protections et accessoires',
    applications: ['Les câbles, protections et accessoires', 'Câblerie solaire', 'Connectique MC4', 'Liaisons batteries'],
    descriptionCourte: 'Ensemble complet de câblerie photovoltaïque certifiée double isolation résistant aux UV et aux températures extrêmes (jusqu’à 120°C).',
    descriptionDetaillee: 'Câbles solaires en cuivre étamé haute flexibilité classe 5 répondant à la norme européenne EN 50618 (H1Z2Z2-K). Conçus pour durer plus de 25 ans en plein soleil sans craqueler. Livré avec 5 paires de connecteurs MC4 étanches IP68 et cosses de puissance pour batterie.',
    prixFCFA: 95000,
    estSurDevis: false,
    stockDisponible: 80,
    delaiLivraisonJours: 1,
    imagePrincipale: './images/product_cables_raccordement_1791969809173.jpg',
    specs: {
      puissance: 'Section 6 mm² (Courant admissible jusqu’à 70A)',
      tensionFonctionnement: 'Tension assignée : 1.5 kV DC (1.8 kV max)',
      garantie: '10 ans constructeur',
      certifications: ['EN 50618', 'TÜV 2PfG 1169', 'RoHS', 'CE'],
      specsKitsStockage: {
        equipementsInclus: [
          '25 mètres de câble solaire 6mm² Rouge certifié H1Z2Z2-K',
          '25 mètres de câble solaire 6mm² Noir certifié H1Z2Z2-K',
          '5x Paires de connecteurs MC4 mâle/femelle IP68 à sertir',
          '4x Cosses tubulaires cuivre étamé pour bornes batteries M8/M10',
          'Gaine thermorétractable et colliers de serrage anti-UV'
        ],
        usagesRecommandes: [
          'Liaison entre les panneaux solaires et l’onduleur ou le régulateur MPPT',
          'Liaison batterie et distribution continue'
        ],
        optionsInstallation: [
          'Passage sous gaine ICTA anti-UV ou goulotte de protection'
        ]
      },
      conditionsInstallation: ['Sertissage obligatoire avec pince à sertir spéciale MC4'],
      garantieDetails: 'Garantie de 10 ans contre tout vieillissement ou craquelure sous UV.',
      prixApplicables: 'Prix catalogue du pack complet : 95 000 FCFA TTC.'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  }
];

export const INITIAL_PROJECTS: ProjectReference[] = [
  // 1. SÉNÉGAL (8 réalisations : Thiès, Louga, Fatick, Ziguinchor, Mboro, Notto Gouye Diama, Saint-Louis, Diamniadio)
  {
    id: 'proj-sn-thies-01',
    titre: 'Éclairage Public Solaire des Grands Boulevards & Ronds-points de Thiès',
    client: 'Mairie de Thiès & Agence de Gestion des Routes (AGEROUTE)',
    typeClient: 'Collectivité Territoriale & Voirie Nationale',
    pays: 'Sénégal',
    ville: 'Thiès (Avenue de la Paix & Boulevard Urbain)',
    annee: '2026',
    description: 'Pose sur camion-grue et mise en service de 180 candélabres solaires autonomes 120W All-In-One avec mâts coniques 9m. Le projet sécurise le transit urbain et commercial entre Dakar et l’intérieur du pays.',
    pointsForts: [
      '180 candélabres solaires posés par camion-grue sur terre-plein central',
      'Sécurisation complète du trafic nocturne sur la grande artère de Thiès',
      'Autonomie 4 nuits consécutives sans coupure grâce au stockage LiFePO4'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '21.6 kW LED Solaire (180x 120W)',
    image: './images/project_senegal_thies_1791902694200.jpg'
  },
  {
    id: 'proj-sn-louga-01',
    titre: 'Électrification Solaire & Éclairage Public Sahélien de Louga',
    client: 'Commune de Louga & Conseil Départemental',
    typeClient: 'Collectivité Territoriale',
    pays: 'Sénégal',
    ville: 'Louga (Artères Communales & Marché Central)',
    annee: '2025',
    description: 'Déploiement de 125 candélabres solaires Split haute puissance 80W résistant au vent sablonneux et à la poussière latéritique. Régulation crépusculaire automatique et continuité d’éclairage assurée pour les commerces nocturnes.',
    pointsForts: [
      'Éclairage chaleureux adapté aux conditions arides et poussiéreuses du Sahel',
      'Régulation crépusculaire automatique intelligente et zéro coupure',
      'Revitalisation économique des commerces de quartier et sécurisation piétonne'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '10 kW LED Solaire (125x 80W)',
    image: './images/project_senegal_louga_1791902711943.jpg'
  },
  {
    id: 'proj-sn-fatick-01',
    titre: 'Éclairage Solaire des Voies Littorales & Accès Sine-Saloum à Fatick',
    client: 'Conseil Régional du Sine-Saloum & Mairie de Fatick',
    typeClient: 'Conseil Régional & Aménagement Fluvial',
    pays: 'Sénégal',
    ville: 'Fatick (Route-Digue & Estuaire)',
    annee: '2025',
    description: 'Installation de 95 candélabres solaires avec traitement de galvanisation renforcé C5-M anti-corrosion marine le long de la route-digue reliant les berges de Fatick à travers la mangrove.',
    pointsForts: [
      'Galvanisation certifiée ISO 1461 résistant à la salinité extrême du Sine-Saloum',
      'Sécurisation de la route-digue et des déplacements nocturnes des pêcheurs',
      '100% énergie renouvelable sans abonnement réseau ni coût d’exploitation'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '9.5 kW LED Solaire (95x 100W)',
    image: './images/project_senegal_fatick_1791902727334.jpg'
  },
  {
    id: 'proj-sn-ziguinchor-01',
    titre: 'Modernisation de l’Éclairage Public Solaire du Boulevard de Ziguinchor',
    client: 'Mairie de Ziguinchor & Programme PUDC Casamance',
    typeClient: 'Développement Communal & PUDC',
    pays: 'Sénégal',
    ville: 'Ziguinchor (Casamance)',
    annee: '2026',
    description: 'Fourniture et implantation de 160 candélabres solaires à double crosse sur terre-plein central le long des grandes voies de pénétration de Ziguinchor. Conception tropicalisée résistante aux fortes pluies d’hivernage.',
    pointsForts: [
      'Double crosse 120W éclairant simultanément la chaussée et les trottoirs',
      'Étanchéité IP66/IK10 haute résilience pour la mousson de Casamance',
      'Transformation esthétique et sécuritaire du paysage urbain nocturne'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '19.2 kW LED Solaire (160x 120W)',
    image: './images/project_senegal_ziguinchor_1791902745021.jpg'
  },
  {
    id: 'proj-sn-mboro-01',
    titre: 'Complexe Solaire Mixte : Éclairage Maraîcher & Station de Pompage à Mboro',
    client: 'Coopérative Horticole des Niayes & Commune de Mboro',
    typeClient: 'Coopérative Agricole & Commune',
    pays: 'Sénégal',
    ville: 'Mboro (Zone des Niayes)',
    annee: '2025',
    description: 'Projet d’ingénierie combinant un réseau de 75 lampadaires solaires le long de la piste de desserte maraîchère et une station de pompage solaire immergée 7.5kW (45 m³/h) pour les bassins d’irrigation horticoles.',
    pointsForts: [
      'Double impact : irrigation solaire de jour et éclairage sécurisé de nuit',
      'Évacuation rapide des productions horticoles et maraîchères de nuit vers Dakar',
      'Suppression totale des dépenses de carburant groupe pour les producteurs'
    ],
    categorie: 'pompage-solaire',
    capaciteInstallee: '6 kW Solaire Éclairage + 11 kWc Pompage',
    image: './images/project_senegal_mboro_1791902767151.jpg'
  },
  {
    id: 'proj-sn-notto-01',
    titre: 'Électrification Solaire Villageoise, Place Publique & Dispensaire à Notto',
    client: 'Mairie de Notto Gouye Diama & Agence ASER',
    typeClient: 'Collectivité Rurale & Électrification',
    pays: 'Sénégal',
    ville: 'Notto Gouye Diama',
    annee: '2025',
    description: 'Électrification intégrale de la place communautaire, des abords de l’école primaire et du centre de santé de Notto Gouye Diama avec 60 candélabres solaires autonomes et kit solaire toiture pour le dispensaire.',
    pointsForts: [
      'La place publique, l’école et la maternité éclairées 365 nuits par an',
      'Permet les accouchements et soins d’urgence 24h/24 en toute sérénité',
      'Pôle d’étude et d’animation nocturne sécurisé pour les écoliers du village'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '4.8 kW Solaire Éclairage + 5kVA Kit Médical',
    image: './images/project_senegal_notto_1791902792387.jpg'
  },
  {
    id: 'proj-01',
    titre: 'Éclairage Public Solaire Autonome de la Corniche & Cité Communale de Saint-Louis',
    client: 'Mairie de Saint-Louis & Coopération Décentralisée',
    typeClient: 'Collectivité Territoriale',
    pays: 'Sénégal',
    ville: 'Saint-Louis (Corniche & Pont Faidherbe)',
    annee: '2025',
    description: 'Fourniture, génie civil et pose de 140 lampadaires solaires autonomes 100W All-In-One avec mâts octogonaux de 8m traités contre la corrosion marine atlantique.',
    pointsForts: [
      '140 points lumineux sécurisés sur les voies touristiques et de pêche',
      'Zéro coût de facture Senelec pour le budget municipal',
      'Éclairage ininterrompu 365 nuits/an sous brume saline marine'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '14 kW LED solaire autonome',
    image: './images/hero_diarra_solar_1791734623148.jpg'
  },
  {
    id: 'proj-04',
    titre: 'Éclairage LED de Sécurité & Voirie de la Zone Industrielle de Diamniadio',
    client: 'Consortium Logistique & Pôle Urbain de Diamniadio',
    typeClient: 'Entreprise BTP & Logistique',
    pays: 'Sénégal',
    ville: 'Diamniadio (Parc Industriel)',
    annee: '2025',
    description: 'Rénovation complète et équipement de 85 luminaires LED 150W sur réseau avec armoires de commande crépusculaires, télégestion et parafoudres 10kV.',
    pointsForts: [
      'Réduction immédiate de 55% de la puissance souscrite',
      'Éclairage haute visibilité pour camions lourds et logistique fret',
      'Parafoudre industriel certifié contre les surtensions réseau'
    ],
    categorie: 'eclairage-electrique',
    capaciteInstallee: '12.7 kW LED haute performance',
    image: './images/product_lampadaire_solaire_1791734634193.jpg'
  },

  // 2. DUBAÏ (5 réalisations)
  {
    id: 'proj-dubai-01',
    titre: 'Installation de Lampadaires Hybrides Éoliens & Solaires à Dubaï (Dubai Wind and Solar Street Light Installation)',
    client: 'Autorité des Transports & Développement Urbain (RTA Dubaï)',
    typeClient: 'Infrastructure Publique & Ville Durable',
    pays: 'Dubaï',
    ville: 'Dubaï (Axes Urbains & Voies Rapides)',
    annee: '2025',
    description: 'Projet d’ingénierie d’éclairage public éco-hybride combinant une micro-éolienne verticale hélicoïdale et un panneau solaire inclinable sur mât renforcé. Conçu pour capter la brise côtière et l’ensoleillement maximal du Golfe, garantissant une autonomie nocturne totale.',
    pointsForts: [
      'Double génération autonome : Solaire + Micro-éolienne à axe vertical',
      'Résistance thermique éprouvée jusqu’à +55°C sous le soleil du Golfe',
      'Éclairage LED haute intensité sans coupure 365 nuits par an'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '120W LED / Éolienne 300W / Solaire 160Wc',
    image: './images/project_dubai_wind_solar_1791900444202.jpg'
  },
  {
    id: 'proj-dubai-02',
    titre: 'Autoroute Désertique Al Qudra Desert Highway & Rond-Point Solaire Résistant Canicule',
    client: 'Ministère de l’Énergie & RTA Dubaï',
    typeClient: 'Infrastructure Autoroutière',
    pays: 'Dubaï',
    ville: 'Dubaï (Axe Al Qudra Road)',
    annee: '2025',
    description: 'Équipement d’un tronçon de 12 km en candélabres solaires All-In-Two Sokoyo Intense 150W avec optique autoroutière asymétrique et batterie LiFePO4 thermo-régulée pour supporter des températures de +60°C.',
    pointsForts: [
      'Optique autoroutière asymétrique Batwing permettant un espacement de 40m',
      'Batterie LiFePO4 thermo-isolée résistant aux canicules extrêmes',
      'Zéro tranchée ni câble électrique sur 12 km de tracé désertique'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '36 kW LED Solaire (240 candélabres)',
    image: './images/project_dubai_wind_solar_1791900444202.jpg'
  },
  {
    id: 'proj-dubai-03',
    titre: 'Promenade Côtière Jumeirah Beach & Piste Cyclable Éco-Solaire',
    client: 'Dubai Municipality (DM) & Dubai Tourism',
    typeClient: 'Aménagement Urbain & Tourisme',
    pays: 'Dubaï',
    ville: 'Dubaï (Front de Mer Jumeirah)',
    annee: '2026',
    description: 'Aménagement d’un réseau de 110 candélabres solaires design Sokoyo Lumo le long de la promenade piétonne et piste cyclable avec capteurs micro-ondes de présence et gradation automatique.',
    pointsForts: [
      'Design sculptural contemporain s’intégrant à l’architecture balnéaire',
      'Détecteur de présence micro-ondes intelligent réduisant l’empreinte nocturne',
      'Finitions anodisées anti-corrosion marine côtière'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '8.8 kW LED Solaire (110x 80W)',
    image: './images/project_dubai_wind_solar_1791900444202.jpg'
  },
  {
    id: 'proj-dubai-04',
    titre: 'Parc Logistique Dubai South & Zone Fret Aéroport Al Maktoum',
    client: 'Dubai Aviation City Corporation (DACC)',
    typeClient: 'Plateforme Logistique Internationale',
    pays: 'Dubaï',
    ville: 'Dubaï (Dubai South)',
    annee: '2025',
    description: 'Éclairage solaire haute puissance de parkings de semi-remorques et quais de chargement logistique avec projecteurs solaires 200W orientables Helios à 360°.',
    pointsForts: [
      'Projecteurs orientables 2x 100W couvrant de vastes aires de manœuvre',
      'Sécurité certifiée pour la circulation des engins de manutention lourds',
      'Autonomie totale de 5 nuits sans apport solaire'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '24 kW LED Solaire Haute Portée',
    image: './images/project_dubai_wind_solar_1791900444202.jpg'
  },
  {
    id: 'proj-dubai-05',
    titre: 'Éclairage Autonome du Terminal Maritime & Port Jebel Ali',
    client: 'DP World (Dubai Ports World)',
    typeClient: 'Autorité Portuaire & Maritime',
    pays: 'Dubaï',
    ville: 'Dubaï (Port Jebel Ali)',
    annee: '2026',
    description: 'Candélabres solaires renforcés 150W sur mâts de 12m pour les voies de desserte conteneurs et périmètres sécurisés du plus grand port du Moyen-Orient.',
    pointsForts: [
      'Mât conique acier galvanisé 12m avec cage d’ancrage renforcée M24',
      'Protection anti-corrosion saline C5-M pour atmosphère portuaire agressive',
      'Système sans interruption pour opérations maritimes 24h/24'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '18 kW LED Solaire (120 mâts 12m)',
    image: './images/project_dubai_wind_solar_1791900444202.jpg'
  },

  // 3. MALI (5 réalisations)
  {
    id: 'proj-mali-01',
    titre: 'Électrification Rurale & Éclairage Public Solaire Split au Mali (Mali Split Type Solar Street Light Installation)',
    client: 'Programme National d’Électrification Rurale & Collectivités',
    typeClient: 'Collectivité Territoriale & Développement',
    pays: 'Mali',
    ville: 'Région de Koulikoro & Sikasso',
    annee: '2025',
    description: 'Déploiement de candélabres solaires à panneau séparé (Split type) avec caissons de batteries ventilés en tête de mât dans plusieurs villages ruraux. Érection rapide par camion-grue et techniciens d’intervention.',
    pointsForts: [
      'Pose mécanisée par camion-grue et monteurs qualifiés',
      'Caisson métallique sécurisé en tête de mât pour batterie LiFePO4',
      'Retombées immédiates : vie communautaire, commerce et sécurité'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '80W-100W LED Split / Panneau 160Wc / LiFePO4 768Wh',
    image: './images/project_mali_split_solar_1791900470874.jpg'
  },
  {
    id: 'proj-mali-02',
    titre: 'Bamako : Éclairage Solaire de la Corniche et de l’Échangeur du Pont des Martyrs',
    client: 'Mairie du District de Bamako & Direction Nationale des Routes',
    typeClient: 'Collectivité Urbaine & Travaux Publics',
    pays: 'Mali',
    ville: 'Bamako (Axe Fleuve Niger)',
    annee: '2025',
    description: 'Installation de 140 candélabres solaires 100W avec panneaux orientables inclinés à 15° plein Sud pour sécuriser les rampes d’accès et carrefours stratégiques le long du fleuve Niger.',
    pointsForts: [
      'Sécurisation d’un axe majeur à très fort trafic de Bamako',
      'Indépendance totale face aux délestages du réseau EDM',
      'Éclairage blanc neutre 4000K garantissant un confort visuel optimal'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '14 kW LED Solaire (140x 100W)',
    image: './images/project_mali_split_solar_1791900470874.jpg'
  },
  {
    id: 'proj-mali-03',
    titre: 'Mopti : Candélabres Solaires sur la Digue Fluviale et Quais du Niger',
    client: 'Gouvernorat de Mopti & Agence de Développement Régional',
    typeClient: 'Développement Régional & Fleuve',
    pays: 'Mali',
    ville: 'Mopti (Venise Malienne)',
    annee: '2026',
    description: 'Alignement de 90 candélabres solaires à panneau séparé surélevé le long de la digue fluviale pour sécuriser l’embarcadère des pinasses marchandes et les voies inondables.',
    pointsForts: [
      'Batteries LiFePO4 perchées en tête de mât à l’abri des crues fluviales',
      'Soutien à l’activité commerciale nocturne de la pêche et du transport',
      'Construction robuste conçue pour durer plus de 15 ans'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '7.2 kW LED Solaire (90x 80W)',
    image: './images/project_mali_split_solar_1791900470874.jpg'
  },
  {
    id: 'proj-mali-04',
    titre: 'Ségou : Éclairage Public Solaire des Boulevards et Cités Communales',
    client: 'Commune Urbaine de Ségou & Coopération Internationale',
    typeClient: 'Commune Urbaine',
    pays: 'Mali',
    ville: 'Ségou (Cité des Balanzans)',
    annee: '2025',
    description: 'Implantation de 110 lampadaires solaires monoblocs All-In-One Coolex 120W avec mâts octogonaux 8m pour éclairer les grandes artères bordées d’arbres de la capitale régionale.',
    pointsForts: [
      'Dissipation thermique Saharienne éprouvée pour la chaleur de Ségou',
      'Maintenance simplifiée grâce au luminaire monobloc accessible',
      'Amélioration nette de la fréquentation des espaces publics le soir'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '13.2 kW LED Solaire (110x 120W)',
    image: './images/project_mali_split_solar_1791900470874.jpg'
  },
  {
    id: 'proj-mali-05',
    titre: 'Kayes : Éclairage Solaire Haute Résistance Thermique (>50°C) Zone Minière',
    client: 'Consortium Minier de Kayes & Collectivité Locale',
    typeClient: 'Industrie Extractive & Mines',
    pays: 'Mali',
    ville: 'Kayes (Zone Péri-Minière)',
    annee: '2026',
    description: 'Déploiement de luminaires solaires industriels dans la zone la plus chaude du Mali, équipés de panneaux monocristallins ventilés et de contrôleurs MPPT tropicalisés.',
    pointsForts: [
      'Fonctionnement certifié à +52°C à l’ombre sans baisse de rendement LED',
      'Résistance aux chocs mécaniques IK10 et étanchéité IP67 anti-poussière',
      'Sécurisation des convois logistiques miniers et des villages riverains'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '15 kW LED Solaire (100x 150W)',
    image: './images/project_mali_split_solar_1791900470874.jpg'
  },

  // 4. MALAISIE (5 réalisations)
  {
    id: 'proj-malaysia-01',
    titre: 'Candélabres Hybrides Éoliens-Solaires Littoraux en Malaisie (Malaysia Wind and Solar Street Light Installation)',
    client: 'Autorité Portuaire & Aménagement Touristique',
    typeClient: 'Aménagement Urbain & Maritime',
    pays: 'Malaisie',
    ville: 'Kuala Perlis / Promenade Côtière',
    annee: '2025',
    description: 'Installation sur échafaudage de mâts hybrides équipés de doubles panneaux solaires monocristallins et d’éoliennes verticales silencieuses le long d’une promenade piétonne en bois face à la mer. Éclairage nocturne puissant résistant à l’air salin marin et aux moussons tropicales.',
    pointsForts: [
      'Double panneau solaire + turbine éolienne aérodynamique',
      'Matériaux galvanisés et thermolaqués anti-corrosion marine C5-M',
      'Mise en valeur nocturne continue du front de mer'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '100W LED / Turbine 400W / 2x Panneaux 100Wc',
    image: './images/project_malaysia_wind_solar_1791900500640.jpg'
  },
  {
    id: 'proj-malaysia-02',
    titre: 'George Town (Penang) : Éclairage Solaire Littoral de la Promenade Maritime',
    client: 'Penang Municipal Council & Port Authority',
    typeClient: 'Autorité Municipale & Patrimoine UNESCO',
    pays: 'Malaisie',
    ville: 'George Town (Penang)',
    annee: '2025',
    description: 'Déploiement de 80 mâts solaires hybrides éco-conçus le long de l’esplanade côtière de Penang, alliant élégance patrimoniale et technologie photovoltaïque moderne.',
    pointsForts: [
      'Intégration harmonieuse dans le secteur protégé UNESCO de Penang',
      'Résistance aux vents de mousson et embruns marins salés',
      'Zéro émission de carbone pour le programme Penang Green City'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '8 kW LED Solaire (80x 100W)',
    image: './images/project_malaysia_wind_solar_1791900500640.jpg'
  },
  {
    id: 'proj-malaysia-03',
    titre: 'Langkawi : Route Éco-Touristique & Marina Insulaire Solaire',
    client: 'Langkawi Development Authority (LADA)',
    typeClient: 'Développement Touristique Insulaire',
    pays: 'Malaisie',
    ville: 'Langkawi (Géoparc)',
    annee: '2026',
    description: 'Candélabres solaires All-In-Two Sokoyo Intense sur 8 km de route panoramique reliant la marina aux plages touristiques sous l’équateur.',
    pointsForts: [
      'Préservation de l’environnement écologique fragile du Géoparc UNESCO',
      'Éclairage Batwing garantissant une route parfaitement éclairée sans éblouir',
      'Fonctionnement autonome 100% sans générateurs diesel sur l’île'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '12 kW LED Solaire (120x 100W)',
    image: './images/project_malaysia_wind_solar_1791900500640.jpg'
  },
  {
    id: 'proj-malaysia-04',
    titre: 'Johor Port / Tanjung Pelepas : Éclairage Solaire des Quais Logistiques',
    client: 'Port of Tanjung Pelepas (PTP)',
    typeClient: 'Terminal Maritime International',
    pays: 'Malaisie',
    ville: 'Johor Bahru',
    annee: '2025',
    description: 'Systèmes d’éclairage solaire haute puissance pour voies de circulation des portiques et aires de stationnement des semi-remorques porte-conteneurs.',
    pointsForts: [
      'Projecteurs LED solaires 200W orientables sur mâts de 10m',
      'Garantie d’éclairage nocturne sans interruption 365 nuits par an',
      'Protection galvanisée anticorrosion marine tropicale'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '16 kW LED Solaire (80x 200W)',
    image: './images/project_malaysia_wind_solar_1791900500640.jpg'
  },
  {
    id: 'proj-malaysia-05',
    titre: 'Sarawak (Bornéo) : Réseau Solaire Autonome pour Collectivités Fluviales',
    client: 'Sarawak Energy & Rural Infrastructure Division',
    typeClient: 'Développement Énergétique Rural',
    pays: 'Malaisie',
    ville: 'Sarawak (Bornéo)',
    annee: '2026',
    description: 'Implantation de candélabres solaires compacts SLM-TYN dans les villages le long des rivières isolées de Bornéo, où aucun réseau électrique conventionnel n’existe.',
    pointsForts: [
      'Facilité d’acheminement par pirogue et montage simple sans engin lourd',
      'Autonomie prolongée face à la très forte nébulosité équatoriale',
      'Amélioration directe du niveau de vie et de sécurité des communautés indigènes'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '6 kW LED Solaire (100x 60W)',
    image: './images/project_malaysia_wind_solar_1791900500640.jpg'
  },

  // 5. BANGLADESH (5 réalisations)
  {
    id: 'proj-bangladesh-01',
    titre: 'Éclairage Solaire Split sur Voie Digue au Bangladesh (Bangladesh Split Type Solar Street Light Installation)',
    client: 'Rural Electrification Board & Agence d’Infrastructure',
    typeClient: 'Électrification Rurale & Gouvernement',
    pays: 'Bangladesh',
    ville: 'District Fluvial & Voie Embankment',
    annee: '2024',
    description: 'Alignement continu de lampadaires solaires à panneau séparé sur mâts bicolores le long d’une digue routière surélevée reliant des villages isolés au milieu des plaines fluviales. De nuit, l’enfilade lumineuse sécurise les déplacements et les transports vitaux.',
    pointsForts: [
      'Enfilade continue de candélabres solaires Split sur plusieurs kilomètres',
      'Batteries LiFePO4 surélevées à l’abri des crues d’hivernage',
      'Visibilité parfaite pour les piétons, deux-roues et transports'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '60W LED Split / Panneau 120Wc / Mâts 7m',
    image: './images/project_bangladesh_split_solar_1791900534037.jpg'
  },
  {
    id: 'proj-bangladesh-02',
    titre: 'Chittagong : Éclairage Solaire Autonome des Voies d’Accès Portuaires',
    client: 'Chittagong Port Authority (CPA)',
    typeClient: 'Autorité Portuaire Nationale',
    pays: 'Bangladesh',
    ville: 'Chittagong (Voies d’Accès Nord)',
    annee: '2025',
    description: 'Pose de 130 candélabres solaires Split 100W le long des routes de délestage des camions de marchandises vers le golfe du Bengale, résistant à l’air salin et aux cyclones.',
    pointsForts: [
      'Structure certifiée pour résister à des vents cycloniques de 160 km/h',
      'Sécurisation 24h/24 du corridor d’exportation le plus important du pays',
      'Technologie MPPT étanche IP68 immergeable'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '13 kW LED Solaire (130x 100W)',
    image: './images/project_bangladesh_split_solar_1791900534037.jpg'
  },
  {
    id: 'proj-bangladesh-03',
    titre: 'Cox’s Bazar : Voie Côtière & Éclairage Solaire Résistant à l’Air Salin',
    client: 'Cox’s Bazar Development Authority',
    typeClient: 'Aménagement Touristique & Littoral',
    pays: 'Bangladesh',
    ville: 'Cox’s Bazar (Marine Drive)',
    annee: '2026',
    description: 'Candélabres solaires à double crosse sur la plus longue route de plage ininterrompue au monde. Panneaux orientés vers le soleil du midi et luminaires LED 160 lm/W.',
    pointsForts: [
      'Éclairage panoramique de la promenade touristique Marine Drive',
      'Galvanisation marine et caisson batterie anti-corrosion renforcée',
      'Zéro panne malgré les épisodes de mousson intense du Bengale'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '11 kW LED Solaire (110x 100W)',
    image: './images/project_bangladesh_split_solar_1791900534037.jpg'
  },
  {
    id: 'proj-bangladesh-04',
    titre: 'Sylhet : Éclairage Solaire Rural et Pont Fluvial Surélevé',
    client: 'Local Government Engineering Department (LGED)',
    typeClient: 'Génie Rural & Développement Local',
    pays: 'Bangladesh',
    ville: 'Sylhet (Région des Haors)',
    annee: '2025',
    description: 'Implantation de mâts solaires autonomes sur les ponts et digues d’accès des zones marécageuses de Sylhet, reliant les villages durant les inondations saisonnières.',
    pointsForts: [
      'Garantit le franchissement nocturne sécurisé des ponts fluviaux en période de crue',
      'Panneaux solaires monocristallins Grade-A à haut rendement sous ciel couvert',
      'Batteries LiFePO4 montées à 6m de hauteur pour une sécurité absolue'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '7.5 kW LED Solaire (75x 100W)',
    image: './images/project_bangladesh_split_solar_1791900534037.jpg'
  },
  {
    id: 'proj-bangladesh-05',
    titre: 'Rajshahi : Éclairage Solaire Routier le long des Voies Agricoles du Padma',
    client: 'Rajshahi City Corporation (RCC)',
    typeClient: 'Ville Agricole & Universitaire',
    pays: 'Bangladesh',
    ville: 'Rajshahi (Axe Fluvial)',
    annee: '2026',
    description: 'Installation de 85 lampadaires solaires All-In-One compacts pour éclairer les routes de transit des récoltes de mangues et de soie vers les marchés centraux.',
    pointsForts: [
      'Installation rapide sans interruption du trafic agricole',
      'Diminution drastique des accidents routiers de nuit sur les voies secondaires',
      'Zéro frais d’énergie pour la municipalité'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '6.8 kW LED Solaire (85x 80W)',
    image: './images/project_bangladesh_split_solar_1791900534037.jpg'
  },

  // 6. NIGERIA (5 réalisations)
  {
    id: 'proj-nigeria-01',
    titre: 'Candélabres Solaires Split pour Rues Commerciales au Nigeria (Nigeria Split Type Solar Street Light Installation)',
    client: 'Gouvernement Local (LGA) & Collectivité Urbaine',
    typeClient: 'Collectivité Urbaine & Quartier d’Affaires',
    pays: 'Nigeria',
    ville: 'Kano / Rues Communautaires',
    annee: '2025',
    description: 'Déploiement de candélabres solaires à crosse courbée et panneau séparé orientable dans des artères commerçantes et quartiers animés au Nigeria. L’éclairage nocturne éclatant revitalise le commerce du soir et renforce la sécurité des riverains sans dépendre du réseau instable.',
    pointsForts: [
      'Revitalisation du tissu économique et commercial de nuit',
      'Diffusion photométrique asymétrique Batwing couvrant toute la rue',
      'Zéro dépendance aux coupures réseau ou carburant groupe'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '80W-120W LED Split / Panneau 160Wc / LiFePO4',
    image: './images/project_nigeria_split_solar_1791900566735.jpg'
  },
  {
    id: 'proj-nigeria-02',
    titre: 'Lagos : Voie Rapide Lekki-Epe Expressway & Pénétrante Éclairage Solaire',
    client: 'Lagos State Ministry of Energy and Mineral Resources',
    typeClient: 'Ministère d’État & Infrastructures',
    pays: 'Nigeria',
    ville: 'Lagos (Couloir Lekki-Epe)',
    annee: '2026',
    description: 'Modernisation d’une section autoroutière de 15 km avec 200 candélabres solaires All-In-Two 150W Sokoyo Intense, apportant une visibilité haute définition pour le trafic intense de Lagos.',
    pointsForts: [
      'Élimination des black-outs fréquents causés par les pannes du réseau national',
      'Optique haute performance conçue pour chaussées à 3 et 4 voies',
      'Gestion thermique brevetée adaptée à l’humidité tropicale de Lagos'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '30 kW LED Solaire (200x 150W)',
    image: './images/project_nigeria_split_solar_1791900566735.jpg'
  },
  {
    id: 'proj-nigeria-03',
    titre: 'Abuja : Bypass Périurbain et Rocade FCT en Candélabres Solaires Haute Puissance',
    client: 'Federal Capital Development Authority (FCDA Abuja)',
    typeClient: 'Autorité Fédérale de la Capitale',
    pays: 'Nigeria',
    ville: 'Abuja (Federal Capital Territory)',
    annee: '2025',
    description: 'Implantation de mâts solaires galvanisés coniques 10m à double luminaire LED le long du boulevard périphérique reliant les ministères et quartiers résidentiels.',
    pointsForts: [
      'Éclairage majestueux digne d’une grande capitale fédérale africaine',
      'Autonomie garantie de 4 nuits consécutives 100% zéro black-out',
      'Matériaux haute résistance certifiés ISO 9001 et EN ISO 1461'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '24 kW LED Solaire (160x 150W)',
    image: './images/project_nigeria_split_solar_1791900566735.jpg'
  },
  {
    id: 'proj-nigeria-04',
    titre: 'Port Harcourt : Éclairage Solaire Industriel & Sécurité Zone Pétrolière',
    client: 'Consortium Énergétique du Delta du Niger & Collectivité',
    typeClient: 'Secteur Énergétique & Industriel',
    pays: 'Nigeria',
    ville: 'Port Harcourt (Rivers State)',
    annee: '2026',
    description: 'Système d’éclairage solaire haute sécurité pour voies d’accès aux raffineries et dépôts d’hydrocarbures, traité anti-corrosion acide et gazière.',
    pointsForts: [
      'Luminaire étanche IP67 certifié résistant aux environnements pétrochimiques',
      'Sécurisation des convois logistiques et patrouilles de surveillance',
      'Indépendance énergétique complète face aux coupures d’alimentation'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '18 kW LED Solaire (120x 150W)',
    image: './images/project_nigeria_split_solar_1791900566735.jpg'
  },
  {
    id: 'proj-nigeria-05',
    titre: 'Kaduna : Éclairage Solaire des Marchés Communautaires et Artères Urbaines',
    client: 'Kaduna State Urban Planning and Development Authority (KASUPDA)',
    typeClient: 'Aménagement Urbain & Marchés',
    pays: 'Nigeria',
    ville: 'Kaduna (Centre-Ville)',
    annee: '2025',
    description: 'Installation de 140 lampadaires solaires urbains Sokoyo Lumo 80W pour dynamiser les marchés vivriers du soir et sécuriser les artères communales.',
    pointsForts: [
      'Relance des activités économiques nocturnes pour plus de 800 commerçants',
      'Diffusion douce non éblouissante sans ombre portée entre les mâts',
      'Batteries LiFePO4 intégrées garanties 5 ans sans maintenance'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '11.2 kW LED Solaire (140x 80W)',
    image: './images/project_nigeria_split_solar_1791900566735.jpg'
  },

  // 7. KOWEÏT (5 réalisations)
  {
    id: 'proj-kuwait-01',
    titre: 'Boulevard & Artère Solaire Haute Performance au Koweït (Kuwait Split Type Solar Street Light Installation)',
    client: 'Ministère des Travaux Publics & Voiries',
    typeClient: 'Ministère & Grands Travaux Publics',
    pays: 'Koweït',
    ville: 'Koweït City (Axe Périurbain)',
    annee: '2025',
    description: 'Installation d’un alignement géométrique parfait de candélabres solaires Split à double courbure le long d’un axe routier bordé de plantations en environnement aride. Les mâts blancs avec panneaux orientables fournissent une clarté nocturne exceptionnelle.',
    pointsForts: [
      'Alignement géométrique continu sur plusieurs kilomètres de voirie',
      'Résistance thermique éprouvée aux canicules du désert (>60°C au soleil)',
      'Uniformité photométrique absolue sans zone d’ombre'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '100W-150W LED / Panneau 200Wc / Mât conique 9m',
    image: './images/project_kuwait_split_solar_1791900602810.jpg'
  },
  {
    id: 'proj-kuwait-02',
    titre: 'Al Jahra : Éclairage Autoroutier Haute Résistance Température (>60°C)',
    client: 'Public Authority for Roads and Transportation (PART Kuwait)',
    typeClient: 'Autorité Publique des Routes',
    pays: 'Koweït',
    ville: 'Al Jahra (Autoroute du Nord)',
    annee: '2025',
    description: 'Candélabres solaires équipés de la technologie Sokoyo Coolex à flux thermique convectif, résistant aux vents brûlants du désert et aux tempêtes de sable sans surchauffe de la batterie.',
    pointsForts: [
      'Cellules LiFePO4 avec gestion thermique thermo-active jusqu’à +65°C',
      'Verre trempé autonettoyant réduisant l’adhérence des poussières de sable',
      'Visibilité de conduite parfaite à grande vitesse (120 km/h)'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '27 kW LED Solaire (180x 150W)',
    image: './images/project_kuwait_split_solar_1791900602810.jpg'
  },
  {
    id: 'proj-kuwait-03',
    titre: 'Mina Al Ahmadi : Candélabres Solaires Industriels pour Raffineries et Terminaux',
    client: 'Kuwait National Petroleum Company (KNPC)',
    typeClient: 'Industrie Pétrolière & Raffinage',
    pays: 'Koweït',
    ville: 'Mina Al Ahmadi',
    annee: '2026',
    description: 'Éclairage solaire sécurisé des zones de transit et parkings d’usines chimiques avec projecteurs solaires 200W conformes aux normes industrielles strictes.',
    pointsForts: [
      'Conception antidéflagrante sécurisée pour atmosphères industrielles exigeantes',
      'Zéro câblage souterrain réduisant les risques d’incidents de génie civil',
      'Télégestion intelligente à distance de chaque candélabre'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '20 kW LED Solaire Haute Puissance',
    image: './images/project_kuwait_split_solar_1791900602810.jpg'
  },
  {
    id: 'proj-kuwait-04',
    titre: 'Subiya Causeway : Éclairage Solaire d’Accès au Viaduc Sheikh Jaber',
    client: 'Ministère des Travaux Publics du Koweït',
    typeClient: 'Grand Projet d’Infrastructure Nationale',
    pays: 'Koweït',
    ville: 'Baie de Koweït (Subiya)',
    annee: '2025',
    description: 'Alignement de mâts solaires blancs coniques 10m le long des échangeurs et voies d’approche reliant Koweït City à la ville nouvelle de Silk City.',
    pointsForts: [
      'Architecture moderne soulignant l’un des plus longs viaducs maritimes au monde',
      'Double crosse asymétrique pour échangeurs autoroutiers complexes',
      'Résistance au brouillard salin de la baie de Koweït'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '22.5 kW LED Solaire (150x 150W)',
    image: './images/project_kuwait_split_solar_1791900602810.jpg'
  },
  {
    id: 'proj-kuwait-05',
    titre: 'Al Wafra : Zone Maraîchère & Éclairage Solaire des Pistes Agricoles',
    client: 'Public Authority for Agriculture Affairs (PAAA)',
    typeClient: 'Agriculture & Développement Rural',
    pays: 'Koweït',
    ville: 'Al Wafra (Zone des Fermes)',
    annee: '2026',
    description: 'Éclairage solaire de 95 carrefours de pistes agricoles et forages d’irrigation dans la principale oasis maraîchère du Koweït.',
    pointsForts: [
      'Sécurisation des convois de légumes frais vers les marchés d’approvisionnement',
      'Alimentation 100% autonome sans tirage de lignes électriques à travers le désert',
      'Système sans entretien avec garantie de 5 ans sur l’ensemble des composants'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '9.5 kW LED Solaire (95x 100W)',
    image: './images/project_kuwait_split_solar_1791900602810.jpg'
  },

  // 8. BÉNIN (5 réalisations)
  {
    id: 'proj-02',
    titre: 'Station Solaire d’Adduction d’Eau Potable (AEP) & Forage Villageois à Parakou',
    client: 'Projet Hydraulique Rurale & ONG Partenaire',
    typeClient: 'Organisation Non Gouvernementale & Hydraulique',
    pays: 'Bénin',
    ville: 'Parakou (Zone Rurale Borgou)',
    annee: '2025',
    description: 'Installation d’une pompe solaire immergée 5.5kW avec champ photovoltaïque 8.8kWc alimentant un château d’eau de 40m³ et 6 bornes fontaines publiques.',
    pointsForts: [
      'Débit de 32 m³/h à 85m HMT pour sécuriser l’accès à l’eau',
      'Accès à l’eau potable pour plus de 4 200 habitants du Borgou',
      'Système sans batterie garanti sans maintenance chimique polluante'
    ],
    categorie: 'pompage-solaire',
    capaciteInstallee: '8.8 kWc solaire / 5.5 kW hydraulique',
    image: './images/product_pompe_solaire_1791734645113.jpg'
  },
  {
    id: 'proj-benin-02',
    titre: 'Cotonou : Boulevard de la Marina & Éclairage Public Solaire Haute Visibilité',
    client: 'Ministère du Cadre de Vie & Mairie de Cotonou',
    typeClient: 'Ministère d’État & Ville de Cotonou',
    pays: 'Bénin',
    ville: 'Cotonou (Boulevard de la Marina & Haie Vive)',
    annee: '2025',
    description: 'Fourniture et implantation de 150 candélabres solaires All-In-Two 120W Sokoyo le long de la vitrine touristique et hôtelière de la Marina de Cotonou.',
    pointsForts: [
      'Design prestige valorisant le front de mer et les ambassades de Cotonou',
      'Protection tropicalisée anti-corrosion marine face aux embruns de l’Atlantique',
      'Éclairage ininterrompu même lors des coupures de réseau électrique SBEE'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '18 kW LED Solaire (150x 120W)',
    image: './images/product_split_pole_1791891587682.jpg'
  },
  {
    id: 'proj-benin-03',
    titre: 'Porto-Novo : Rocade Lagonaire & Éclairage Solaire des Quais Fluviaux',
    client: 'Mairie de Porto-Novo & Agence Nationale des Transports',
    typeClient: 'Collectivité Territoriale',
    pays: 'Bénin',
    ville: 'Porto-Novo (Rocade de la Lagune)',
    annee: '2026',
    description: 'Pose de 110 candélabres solaires à panneau séparé orientable sur mâts coniques de 8m pour éclairer la corniche lagonaire et les débarcadères artisanaux.',
    pointsForts: [
      'Sécurisation des activités de pêche et de commerce piroguier de nuit',
      'Batteries LiFePO4 étanches IP67 montées en hauteur sur les fûts de candélabres',
      'Régulation de puissance intelligente diminuant l’intensité en fin de nuit'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '11 kW LED Solaire (110x 100W)',
    image: './images/product_split_pole_1791891587682.jpg'
  },
  {
    id: 'proj-benin-04',
    titre: 'Abomey-Calavi : Éclairage Solaire de la Cité Universitaire & Voies d’Accès',
    client: 'Université d’Abomey-Calavi (UAC) & Ministère de l’Enseignement',
    typeClient: 'Campus Universitaire & Enseignement Supérieur',
    pays: 'Bénin',
    ville: 'Abomey-Calavi (Campus & Résidences)',
    annee: '2025',
    description: 'Sécurisation nocturne de 4 km d’allées de circulation piétonne et parkings du campus universitaire le plus fréquenté d’Afrique de l’Ouest avec 120 lampadaires solaires 80W.',
    pointsForts: [
      'Sécurité garantie pour plus de 80 000 étudiants lors des cours du soir',
      'Optique Batwing anti-éblouissante idéale pour la lecture et les bancs publics',
      'Économies d’échelle massives pour le budget énergétique de l’université'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '9.6 kW LED Solaire (120x 80W)',
    image: './images/product_sokoyo_lumo_1791894571096.jpg'
  },
  {
    id: 'proj-benin-05',
    titre: 'Natitingou : Pompage Solaire de Forage & Éclairage des Villages de l’Atacora',
    client: 'Direction Départementale de l’Eau & Communes de l’Atacora',
    typeClient: 'Développement Hydraulique & Rural',
    pays: 'Bénin',
    ville: 'Natitingou (Région de l’Atacora)',
    annee: '2026',
    description: 'Projet d’adduction d’eau solaire villageoise avec pompe immergée inox 4kW alimentée par 6.6kWc de panneaux photovoltaïques et 45 candélabres solaires pour les centres de santé.',
    pointsForts: [
      'Production quotidienne de 25m³ d’eau potable à 75m de profondeur dans la roche',
      'Alimentation en continu de la maternité et du dispensaire villageois',
      'Fin définitive de la corvée d’eau pour les femmes et enfants'
    ],
    categorie: 'pompage-solaire',
    capaciteInstallee: '6.6 kWc Pompage + 3.6 kW Éclairage',
    image: './images/service_pose_maintenance_1791894634261.jpg'
  },

  // 9. TOGO (5 réalisations)
  {
    id: 'proj-03',
    titre: 'Centrale Solaire Hybride 25kVA & Stockage LiFePO4 pour Clinique Médicale à Lomé',
    client: 'Clinique Médico-Chirurgicale Privée',
    typeClient: 'Secteur de la Santé Privé',
    pays: 'Togo',
    ville: 'Lomé (Quartier Tokoin)',
    annee: '2026',
    description: 'Sécurisation électrique ininterrompue des blocs opératoires, de la chaîne de froid vaccinale et des respirateurs artificiels face aux coupures de réseau.',
    pointsForts: [
      'Temps de basculement 10ms imperceptible assurant la sécurité vitale',
      'Autonomie continue 14 heures de nuit sur batteries LiFePO4 industrielles',
      'Économie annuelle de 8.5M FCFA de carburant pour groupe électrogène'
    ],
    categorie: 'kits-solaires',
    capaciteInstallee: '25 kVA Onduleurs / 40.96 kWh LiFePO4 / 22 kWc PV',
    image: './images/product_kit_solaire_hybride_1791734655495.jpg'
  },
  {
    id: 'proj-togo-02',
    titre: 'Lomé : Éclairage Public Solaire du Boulevard Circulaire et Front de Mer',
    client: 'Mairie de la Ville de Lomé & Ministère des Travaux Publics',
    typeClient: 'Collectivité Territoriale & Capitale',
    pays: 'Togo',
    ville: 'Lomé (Boulevard Circulaire & Plage)',
    annee: '2025',
    description: 'Implantation de 135 candélabres solaires coniques 100W All-In-One avec revêtement anti-sel pour illuminer les grands axes périphériques de Lomé.',
    pointsForts: [
      'Mise en valeur nocturne de la promenade côtière et réduction des accidents',
      'Suppression de la dépendance aux coupures intermittentes de la CEET',
      'Mâts en acier galvanisé EN ISO 1461 garantis 10 ans contre la rouille'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '13.5 kW LED Solaire (135x 100W)',
    image: './images/product_sokoyo_intense_1791894591590.jpg'
  },
  {
    id: 'proj-togo-03',
    titre: 'Tsévié : Éclairage Solaire de la Route Nationale 1 et Carrefours Stratégiques',
    client: 'Commune de Tsévié & Direction Générale des Transports',
    typeClient: 'Collectivité Urbaine & Voie Nationale',
    pays: 'Togo',
    ville: 'Tsévié (RN1 Corridor Maritime)',
    annee: '2025',
    description: 'Installation de 90 candélabres solaires Split 120W pour sécuriser la traversée urbaine de la Nationale 1, axe névralgique de transport vers le Burkina Faso et le Niger.',
    pointsForts: [
      'Sécurisation des passages piétons et marchés de nuit le long du couloir de fret',
      'Luminaires LED haute pénétration optique pour la visibilité des routiers',
      'Installation sans tranchée ni dégradation du bitume existant'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '10.8 kW LED Solaire (90x 120W)',
    image: './images/product_slm_tyn_04_1791891551863.jpg'
  },
  {
    id: 'proj-togo-04',
    titre: 'Kara : Voirie Solaire Autonome d’Accès au Centre Hospitalier Régional',
    client: 'Préfecture de la Kozah & CHR de Kara',
    typeClient: 'Infrastructure Sanitaire & Préfecture',
    pays: 'Togo',
    ville: 'Kara (Accès CHR & Quartier Administratif)',
    annee: '2026',
    description: 'Équipement de 70 candélabres solaires Sokoyo Coolex 100W le long des voies d’urgence et aires de stationnement des ambulances du CHR de Kara.',
    pointsForts: [
      'Accès permanent et sécurisé des ambulances et patients 24h/24',
      'Évacuation thermique adaptée au climat chaud et sec du nord du Togo',
      'Contrat de maintenance préventive semestrielle assuré par nos équipes'
    ],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '7 kW LED Solaire (70x 100W)',
    image: './images/product_sokoyo_coolex_1791894551466.jpg'
  },
  {
    id: 'proj-togo-05',
    titre: 'Dapaong (Savanes) : Stations de Pompage Solaire Hydraulique & Éclairage Rural',
    client: 'Projet d’Urgence pour la Région des Savanes (PURS)',
    typeClient: 'Programme d’Urgence & Hydraulique Villageoise',
    pays: 'Togo',
    ville: 'Dapaong (Région des Savanes)',
    annee: '2026',
    description: 'Déploiement de 4 stations de pompage solaire de forage (3kW chacune) et de 50 lampadaires solaires dans les hameaux frontaliers pour l’accès à l’eau et la sécurité.',
    pointsForts: [
      'Plus de 6 500 villageois alimentés en eau potable au fil du soleil',
      'Sécurisation des places de marché et des écoles rurales de nuit',
      'Résilience totale sans dépendance au carburant diesel'
    ],
    categorie: 'pompage-solaire',
    capaciteInstallee: '12 kWc Pompage Solaire + 4 kW Éclairage',
    image: './images/product_pompe_solaire_1791734645113.jpg'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-01',
    titre: 'Comment bien dimensionner un système de pompage solaire de forage en Afrique de l’Ouest ?',
    slug: 'guide-dimensionnement-pompage-solaire-sahel',
    date: '8 Octobre 2026',
    auteur: 'Ing. M. Diarra — Directeur Technique',
    categorie: 'Guide Technique & Conseils',
    resume: 'Découvrez les étapes indispensables pour calculer la HMT (Hauteur Manométrique Totale), le volume d’eau journalier nécessaire et le champ photovoltaïque sans risque de sous-dimensionnement.',
    contenuComplet: 'En zone soudano-sahélienne (Sénégal, Bénin, Togo), le pompage solaire représente l’alternative la plus rentable au groupe électrogène diesel. Pour réussir son installation, trois facteurs cruciaux doivent être mesurés avec précision : 1) La profondeur du niveau dynamique du forage ; 2) La hauteur géométrique du refoulement jusqu’au réservoir ; 3) Les pertes de charge dans les canalisations. DIARRA ENERGIE & BUSINESS met à disposition son bureau d’études pour réaliser une modélisation hydraulique certifiée avant toute commande.',
    tempsLecture: '5 min de lecture',
    image: './images/product_pompe_solaire_1791734645113.jpg'
  },
  {
    id: 'news-02',
    titre: 'Lampadaires Solaires All-in-One vs Split : Quel choix pour les mairies et collectivités ?',
    slug: 'comparatif-lampadaire-solaire-integre-vs-split',
    date: '24 Septembre 2026',
    auteur: 'Équipe Projets DIARRA ENERGIE',
    categorie: 'Éclairage Public',
    resume: 'Analyse comparative entre les luminaires monoblocs intégrés faciles à poser et les lampadaires à panneau séparé pour les voiries à fort gabarit.',
    contenuComplet: 'Le lampadaire solaire All-in-One présente l’avantage d’une installation ultra-rapide en moins de 15 minutes par mât sans câblage extérieur. Cependant, sur les voies de plus de 10 mètres de large ou les autoroutes, le système Split (panneau séparé orientable) permet d’installer des panneaux de 200Wc à 300Wc avec une inclinaison idéale pour garantir 100% de luminosité même durant l’hivernage et la saison des pluies.',
    tempsLecture: '4 min de lecture',
    image: './images/product_lampadaire_solaire_1791734634193.jpg'
  },
  {
    id: 'news-03',
    titre: 'Batteries Lithium LiFePO4 : Pourquoi elles supplantent définitivement le Gel et le Plomb en climat tropical',
    slug: 'pourquoi-choisir-batterie-lithium-lifepo4-climat-chaud',
    date: '12 Septembre 2026',
    auteur: 'Département Électrotechnique',
    categorie: 'Stockage & Énergie',
    resume: 'Une durée de vie multipliée par 5, résistance éprouvée aux températures dépassant 40°C et taux de décharge à 90% sans altération prématurée.',
    contenuComplet: 'Sous les températures ambiantes de Dakar, Cotonou ou Lomé, une batterie au gel subit une dégradation thermique accélérée limitant sa durée de vie à 2 ou 3 ans. La technologie LiFePO4 (Phosphate de fer et de lithium), grâce à sa stabilité chimique remarquable et ses systèmes BMS actifs, tolère des cycles profonds quotidiens avec plus de 6000 cycles garantis, soit plus de 10 ans d’usage continu.',
    tempsLecture: '6 min de lecture',
    image: './images/product_kit_solaire_hybride_1791734655495.jpg'
  }
];

export const DELIVERY_ZONES = [
  {
    pays: 'Sénégal',
    capital: 'Dakar',
    villes: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque', 'Thiès', 'Mbour', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Touba'],
    fraisBaseFCFA: 5000,
    delaiMoyen: '24h à 72h',
    contactSupport: '+221 77 114 95 39',
    agenceLocale: 'Direction Régionale Sénégal, VDN / Almadies, Dakar'
  },
  {
    pays: 'Bénin',
    capital: 'Cotonou',
    villes: ['Cotonou', 'Abomey-Calavi', 'Porto-Novo', 'Parakou', 'Bohicon', 'Ouidah', 'Natitingou', 'Djougou'],
    fraisBaseFCFA: 6000,
    delaiMoyen: '24h à 72h',
    contactSupport: '+229 97 00 00 00',
    agenceLocale: 'Agence Bénin, Boulevard de la Marina / Haie Vive, Cotonou'
  },
  {
    pays: 'Togo',
    capital: 'Lomé',
    villes: ['Lomé', 'Tsévié', 'Kpalimé', 'Atakpamé', 'Sokodé', 'Kara', 'Dapaong'],
    fraisBaseFCFA: 6000,
    delaiMoyen: '24h à 72h',
    contactSupport: '+228 90 00 00 00',
    agenceLocale: 'Agence Togo, Boulevard du 13 Janvier, Lomé'
  }
];

export const COMPANY_CONTACTS = {
  raisonSociale: 'DIARRA ENERGIE & BUSINESS',
  slogan: 'L’Excellence de l’Énergie Solaire & de l’Éclairage Public en Afrique de l’Ouest',
  emailCommercial: 'contact@diarraenergie.com',
  emailDevis: 'devis@diarraenergie.com',
  whatsappPrincipal: '+221771149539',
  telephonePrincipal: '+221 77 114 95 39',
  heuresOuverture: 'Du Lundi au Vendredi : 08h00 - 18h30 | Samedi : 08h30 - 13h00',
  adresses: [
    {
      pays: 'Sénégal (Siège Régional)',
      adresse: 'Route de la VDN, Immeuble Solaire R+3, Dakar',
      telephone: '+221 77 114 95 39 / +221 33 800 00 00'
    },
    {
      pays: 'Bénin (Représentation Nationale)',
      adresse: 'Boulevard Saint-Michel, Haie Vive, Cotonou',
      telephone: '+229 97 00 00 00'
    },
    {
      pays: 'Togo (Représentation Nationale)',
      adresse: 'Carrefour 3K, Boulevard de la Paix, Lomé',
    }
  ]
};

export const INITIAL_CLIENTS: ClientAccount[] = [
  {
    id: 'cli-mor-sangare',
    nom: 'Sangaré',
    prenom: 'Mor',
    nomComplet: 'Mor Sangaré',
    email: 'morsangare@gmail.com',
    telephone: '+221 77 114 95 39',
    ville: 'Dakar',
    pays: 'Sénégal',
    adresse: 'Almadies, Zone Résidentielle',
    typeClient: 'particulier',
    dateInscription: '2026-10-01',
    motDePasse: 'client123'
  },
  {
    id: 'cli-amadou-diallo',
    nom: 'Diallo',
    prenom: 'Amadou',
    nomComplet: 'Amadou Diallo',
    email: 'amadou.diallo@teranga-solar.sn',
    telephone: '+221 77 555 12 34',
    ville: 'Thiès',
    pays: 'Sénégal',
    adresse: 'Quartier Som, Rue 14 x Boulevard Canal',
    typeClient: 'entreprise',
    raisonSociale: 'Diallo Agrobusiness & Forages',
    dateInscription: '2026-09-15',
    motDePasse: 'client123'
  },
  {
    id: 'cli-fatou-sall',
    nom: 'Sall',
    prenom: 'Fatou',
    nomComplet: 'Fatou Sall',
    email: 'fatou.sall@gmail.com',
    telephone: '+221 78 444 88 99',
    ville: 'Saint-Louis',
    pays: 'Sénégal',
    adresse: 'Île Nord, Rue Blanchot face Place Faidherbe',
    typeClient: 'particulier',
    dateInscription: '2026-10-01',
    motDePasse: 'client123'
  },
  {
    id: 'cli-kofi-mensah',
    nom: 'Mensah',
    prenom: 'Kofi',
    nomComplet: 'Kofi Mensah',
    email: 'kofi.mensah@cotonou-energy.bj',
    telephone: '+229 97 12 34 56',
    ville: 'Cotonou',
    pays: 'Bénin',
    adresse: 'Haie Vive, Zone Résidentielle Lot 12',
    typeClient: 'entreprise',
    raisonSociale: 'Bénin Solar Tech SARL',
    dateInscription: '2026-10-05',
    motDePasse: 'client123'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-init-client-a',
    clientId: 'cli-amadou-diallo',
    numeroCommande: 'DEB-CMD-2026-0842',
    dateCreation: '2026-10-09 14:22',
    client: {
      clientId: 'cli-amadou-diallo',
      nom: 'Diallo',
      prenom: 'Amadou',
      nomComplet: 'Amadou Diallo',
      raisonSociale: 'Diallo Agrobusiness & Forages',
      typeClient: 'entreprise',
      email: 'amadou.diallo@teranga-solar.sn',
      telephone: '+221 77 555 12 34',
      pays: 'Sénégal',
      ville: 'Thiès',
      adresseLivraison: 'Quartier Som, Rue 14 x Boulevard Canal',
      numeroFiscal: 'SN-TH-2024-B-998'
    },
    articles: [
      {
        productId: 'deb-ps-01',
        reference: 'DEB-PUMP-SUB-2HP',
        nom: 'Système de Pompage Solaire Immergé 2.2kW (3HP) Débit 24m³/h',
        prixUnitaireFCFA: 890000,
        quantite: 1,
        totalLigneFCFA: 890000
      }
    ],
    sousTotalFCFA: 890000,
    fraisLivraisonFCFA: 15000,
    totalFCFA: 905000,
    methodeLivraison: 'transporteur_interurbain',
    moyenPaiement: 'wave',
    statutPaiement: 'paye',
    statutCommande: 'en_preparation',
    numeroSuivi: 'TR-SN-TH-9941',
    notes: 'Livraison prioritaire pour périmètre maraîcher de Thiès'
  },
  {
    id: 'ord-init-client-b',
    clientId: 'cli-fatou-sall',
    numeroCommande: 'DEB-CMD-2026-0915',
    dateCreation: '2026-10-12 11:30',
    client: {
      clientId: 'cli-fatou-sall',
      nom: 'Sall',
      prenom: 'Fatou',
      nomComplet: 'Fatou Sall',
      typeClient: 'particulier',
      email: 'fatou.sall@gmail.com',
      telephone: '+221 78 444 88 99',
      pays: 'Sénégal',
      ville: 'Saint-Louis',
      adresseLivraison: 'Île Nord, Rue Blanchot face Place Faidherbe'
    },
    articles: [
      {
        productId: 'deb-eps-01',
        reference: 'DEB-SL-100-PRO',
        nom: 'Lampadaire Solaire Intégré All-In-One 100W Lumileds',
        prixUnitaireFCFA: 195000,
        quantite: 2,
        totalLigneFCFA: 390000
      }
    ],
    sousTotalFCFA: 390000,
    fraisLivraisonFCFA: 5000,
    totalFCFA: 395000,
    methodeLivraison: 'livraison_urbaine',
    moyenPaiement: 'orange_money',
    statutPaiement: 'paye',
    statutCommande: 'confirmee',
    numeroSuivi: 'SL-EXPRESS-102',
    notes: 'Installation sur cour et devanture villa'
  },
  {
    id: 'ord-init-client-c',
    clientId: 'cli-kofi-mensah',
    numeroCommande: 'DEB-CMD-2026-1022',
    dateCreation: '2026-10-13 16:45',
    client: {
      clientId: 'cli-kofi-mensah',
      nom: 'Mensah',
      prenom: 'Kofi',
      nomComplet: 'Kofi Mensah',
      raisonSociale: 'Bénin Solar Tech SARL',
      typeClient: 'entreprise',
      email: 'kofi.mensah@cotonou-energy.bj',
      telephone: '+229 97 12 34 56',
      pays: 'Bénin',
      ville: 'Cotonou',
      adresseLivraison: 'Haie Vive, Zone Résidentielle Lot 12',
      numeroFiscal: 'IFU-BJ-2023-887711'
    },
    articles: [
      {
        productId: 'deb-kit-dom-02',
        reference: 'DEB-KIT-VILLA-5KW',
        nom: 'Kit Solaire Hybride Villa & Résidence 5kVA / 10kWh LiFePO4',
        prixUnitaireFCFA: 3850000,
        quantite: 1,
        totalLigneFCFA: 3850000
      }
    ],
    sousTotalFCFA: 3850000,
    fraisLivraisonFCFA: 6000,
    totalFCFA: 3856000,
    methodeLivraison: 'livraison_urbaine',
    moyenPaiement: 'virement_bancaire',
    statutPaiement: 'paye',
    statutCommande: 'expediee',
    numeroSuivi: 'DHL-BJ-COT-4482',
    notes: 'Commande société avec technicien agréé en attente'
  }
];

export const INITIAL_DISCUSSIONS: ClientDiscussion[] = [
  {
    id: 'disc-diallo-01',
    clientId: 'cli-amadou-diallo',
    clientNom: 'Amadou Diallo',
    clientEmail: 'amadou.diallo@teranga-solar.sn',
    clientTelephone: '+221 77 555 12 34',
    pageSource: 'Page Éclairage Solaire',
    produitReference: {
      id: 'deb-eps-01',
      nom: 'Lampadaire Solaire Intégré All-In-One 100W Lumileds',
      reference: 'DEB-SL-100-PRO',
      prixFCFA: 195000,
      image: './images/product_lampadaire_solaire_1791734634193.jpg'
    },
    dernierMessage: 'Bonjour M. Diallo, ce modèle 100W est bien en stock à Dakar avec mât disponible de 6 à 8 mètres. Il est certifié IP66 étanche poussières et sable fin, avec batterie LiFePO4 haute température garantie 3 ans.',
    dateDernierMessage: '2026-10-18 11:20',
    nbNonLusAdmin: 0,
    nbNonLusClient: 1,
    messages: [
      {
        id: 'msg-1',
        sender: 'client',
        senderName: 'Amadou Diallo',
        senderEmail: 'amadou.diallo@teranga-solar.sn',
        texte: 'Bonjour l\'équipe DIARRA ENERGIE. Pour notre coopérative à Louga, est-ce que ce lampadaire 100W supporte bien la poussière sahélienne et quelle est la hauteur de mât recommandée ?',
        date: '2026-10-18 10:45',
        produitId: 'deb-eps-01',
        produitNom: 'Lampadaire Solaire Intégré All-In-One 100W Lumileds'
      },
      {
        id: 'msg-2',
        sender: 'admin',
        senderName: 'Service Client DIARRA ENERGIE (Admin)',
        texte: 'Bonjour M. Diallo, ce modèle 100W est bien en stock à Dakar avec mât disponible de 6 à 8 mètres. Il est certifié IP66 étanche poussières et sable fin, avec batterie LiFePO4 haute température garantie 3 ans.',
        date: '2026-10-18 11:20'
      }
    ]
  },
  {
    id: 'disc-order-9941',
    clientId: 'cli-amadou-diallo',
    clientNom: 'Amadou Diallo',
    clientEmail: 'amadou.diallo@teranga-solar.sn',
    clientTelephone: '+221 77 555 12 34',
    pageSource: 'Suivi Commande DEB-CMD-2026-0882 (Bordereau TR-SN-TH-9941)',
    dernierMessage: 'Bonjour M. Diallo, votre colis de pompage solaire a été vérifié par notre chef d\'atelier et confié au transporteur. Numéro de suivi : TR-SN-TH-9941.',
    dateDernierMessage: '2026-10-19 14:30',
    nbNonLusAdmin: 0,
    nbNonLusClient: 1,
    messages: [
      {
        id: 'msg-ord-1',
        sender: 'client',
        senderName: 'Amadou Diallo',
        senderEmail: 'amadou.diallo@teranga-solar.sn',
        texte: 'Bonjour l\'équipe logistique, pouvez-vous me confirmer le jour exact d\'arrivée du colis pour la commande DEB-CMD-2026-0882 à Thiès ? Merci.',
        date: '2026-10-19 13:40'
      },
      {
        id: 'msg-ord-2',
        sender: 'admin',
        senderName: 'Service Expéditions & Logistique DIARRA ENERGIE (Admin)',
        texte: 'Bonjour M. Diallo, votre colis de pompage solaire a été vérifié par notre chef d\'atelier et confié au transporteur. Numéro de suivi : TR-SN-TH-9941. Livraison programmée demain entre 10h et 14h. Notre chauffeur vous contactera 30 min avant son passage.',
        date: '2026-10-19 14:30'
      }
    ]
  },
  {
    id: 'disc-sow-02',
    clientId: 'cli-fatou-sow',
    clientNom: 'Fatou Sow',
    clientEmail: 'fatou.sow@orange.sn',
    clientTelephone: '+221 78 321 09 87',
    pageSource: 'Page Pompage Solaire',
    produitReference: {
      id: 'deb-pmp-01',
      nom: 'Pompe Solaire Immergée Hélicoïdale Inox 750W (1.0 HP)',
      reference: 'DEB-PUMP-SUB-750W',
      prixFCFA: 345000,
      image: './images/product_pompe_solaire_1791734645229.jpg'
    },
    dernierMessage: 'Bonjour, j\'ai un forage de 45 mètres à Thiès, combien de panneaux me conseillez-vous ?',
    dateDernierMessage: '2026-10-19 13:15',
    nbNonLusAdmin: 1,
    nbNonLusClient: 0,
    messages: [
      {
        id: 'msg-3',
        sender: 'client',
        senderName: 'Fatou Sow',
        senderEmail: 'fatou.sow@orange.sn',
        texte: 'Bonjour, j\'ai un forage de 45 mètres à Thiès, combien de panneaux me conseillez-vous pour cette pompe immergée 750W ? Faites-vous aussi la pose ?',
        date: '2026-10-19 13:15',
        produitId: 'deb-pmp-01',
        produitNom: 'Pompe Solaire Immergée Hélicoïdale Inox 750W (1.0 HP)'
      }
    ]
  }
];

