import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, OrderStatus, QuoteStatus, ProductCategory } from '../../types';
import {
  ShieldCheck,
  Package,
  ShoppingCart,
  ShoppingBag,
  FileText,
  TrendingUp,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  CheckCircle,
  Clock,
  Layers,
  Search,
  Users,
  Database,
  ExternalLink,
  Copy,
  Check,
  LogOut,
  UserCheck,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  Terminal,
  Eye,
  EyeOff,
  ArrowRight,
  MessageCircle,
  Send,
  CheckCheck,
  Compass,
  Sparkles,
  Phone,
  Mail,
  Bell,
  Smartphone,
  CheckCircle2,
  CreditCard,
  Image as ImageIcon,
  Camera,
  DollarSign,
  Sliders,
  Sun,
  Droplets,
  Zap,
  X,
  PhoneCall
} from 'lucide-react';
import { AdminLoginView } from './AdminLoginView';

export const AdminView: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    quotes,
    updateQuoteStatus,
    formatPrice,
    setActiveTab,
    showToast,
    isAdminAuthenticated,
    adminUser,
    logoutAdmin,
    openSunLuminModal,
    isDevAuthenticated,
    loginDev,
    logoutDev,
    discussions,
    sendMessageAsAdmin,
    markDiscussionAsReadByAdmin,
    setSpecModalProduct,
    paymentAlerts,
    unreadPaymentAlertsCount,
    markPaymentAlertAsRead,
    clearAllPaymentAlerts,
    adminEditingProductId,
    setAdminEditingProductId
  } = useApp();

  const [adminTab, setAdminTab] = useState<'dashboard' | 'produits' | 'commandes' | 'alertes-paiements' | 'devis' | 'discussions' | 'database'>('dashboard');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<string | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [discussionFilter, setDiscussionFilter] = useState<'all' | 'unread'>('all');
  const [paymentAlertFilter, setPaymentAlertFilter] = useState<'all' | 'intentions' | 'confirmed'>('all');

  // Search & Category Filters for Products Inventory
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState<string>('all');

  // Developer Login State for Database & API links
  const [devLoginId, setDevLoginId] = useState('morsangare@gmail.com');
  const [devLoginPass, setDevLoginPass] = useState('');
  const [devLoginError, setDevLoginError] = useState('');
  const [showDevPass, setShowDevPass] = useState(false);

  const handleDevLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDevLoginError('');
    const success = loginDev(devLoginId, devLoginPass);
    if (!success) {
      setDevLoginError('Identifiant ou code secret développeur non reconnu.');
    } else {
      setDevLoginPass('');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedLink(label);
    showToast(`Lien copié : ${label}`);
    setTimeout(() => setCopiedLink(null), 3000);
  };

  // Product Add / Edit Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editTabSection, setEditTabSection] = useState<'general' | 'image' | 'specs'>('general');

  // Form fields for product (Commercial & Global)
  const [prodRef, setProdRef] = useState('');
  const [prodNom, setProdNom] = useState('');
  const [prodCat, setProdCat] = useState<ProductCategory>('eclairage-solaire');
  const [prodSousCat, setProdSousCat] = useState('Lampadaires intégrés');
  const [prodPrix, setProdPrix] = useState(150000);
  const [prodStock, setProdStock] = useState(25);
  const [prodEstSurDevis, setProdEstSurDevis] = useState(false);
  const [prodDescCourte, setProdDescCourte] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodGarantie, setProdGarantie] = useState('3 ans');
  const [prodDelai, setProdDelai] = useState(3);
  const [prodEstPhare, setProdEstPhare] = useState(false);
  const [prodImage, setProdImage] = useState('./images/product_lampadaire_solaire_1791734634193.jpg');
  const [prodGalerie, setProdGalerie] = useState<string[]>(['./images/product_lampadaire_solaire_1791734634193.jpg']);
  const [customGalleryUrl, setCustomGalleryUrl] = useState('');

  // Category-specific Technical Specs (Lampes, Pompes, Kits, Composants)
  // 1. Éclairage / Lampes
  const [specPuissance, setSpecPuissance] = useState('100W LED');
  const [specFlux, setSpecFlux] = useState('16 500 Lumens');
  const [specPanneau, setSpecPanneau] = useState('Monocristallin 120Wc Tier-1');
  const [specBatterie, setSpecBatterie] = useState('LiFePO4 12.8V 54Ah');
  const [specAutonomie, setSpecAutonomie] = useState('36 à 48 heures (3 nuits)');
  const [specHauteurMat, setSpecHauteurMat] = useState('6 à 8 mètres');
  const [specIndice, setSpecIndice] = useState('IP66 / IK09');
  const [specTempCouleur, setSpecTempCouleur] = useState('5700K Blanc Jour');

  // 2. Pompage Solaire / Pompes de Forage
  const [specDebitMax, setSpecDebitMax] = useState('18 m³/h');
  const [specHmtMax, setSpecHmtMax] = useState('115 mètres');
  const [specProfondeur, setSpecProfondeur] = useState('40m à 100m');
  const [specMoteurPuissance, setSpecMoteurPuissance] = useState('2.2 kW / 3.0 HP');
  const [specDiametreForage, setSpecDiametreForage] = useState('4 pouces (100 mm)');
  const [specDiametreRefoulement, setSpecDiametreRefoulement] = useState('2 pouces (50 mm)');
  const [specPvRecommande, setSpecPvRecommande] = useState('3 300 Wc (6x 550Wc)');
  const [specTechnologieOnduleur, setSpecTechnologieOnduleur] = useState('Variateur MPPT solaire IP65');

  // 3. Kits Solaires & Stockage
  const [specKitOnduleur, setSpecKitOnduleur] = useState('5 000 VA / 5 000 W Pur Sinus');
  const [specKitBatterie, setSpecKitBatterie] = useState('51.2V / 200Ah (10.24 kWh LiFePO4)');
  const [specKitPanneaux, setSpecKitPanneaux] = useState('10x 550Wc (5.5 kWc)');
  const [specKitAutonomie, setSpecKitAutonomie] = useState('18h à 24h continue');

  // 4. Composants (Panneaux, Onduleurs, Batteries)
  const [specRendement, setSpecRendement] = useState('21.8%');
  const [specTension, setSpecTension] = useState('48V / 51.2V');

  // Inline Quick Editing (Price & Stock) in Product Table
  const [inlinePriceId, setInlinePriceId] = useState<string | null>(null);
  const [inlinePriceVal, setInlinePriceVal] = useState<number>(0);
  const [inlineStockId, setInlineStockId] = useState<string | null>(null);
  const [inlineStockVal, setInlineStockVal] = useState<number>(0);

  // Compress image before storing in localStorage/database to prevent QuotaExceededError
  const compressImageDataUrl = (dataUrl: string, maxDim = 1000, quality = 0.82): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width <= maxDim && height <= maxDim && dataUrl.length < 250_000) {
          resolve(dataUrl);
          return;
        }
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed.length < dataUrl.length ? compressed : dataUrl);
        } catch {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  // File Upload handler for Multiple Product Images & Interfaces
  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const inputEl = e.target;
    let countDone = 0;
    const addedImages: string[] = [];

    const finalizeIfDone = () => {
      countDone++;
      if (countDone === fileList.length) {
        inputEl.value = '';
        if (addedImages.length > 0) {
          setProdGalerie((prev) => Array.from(new Set([...prev, ...addedImages])));
          setProdImage((currentMain) =>
            !currentMain || currentMain.includes('default') ? addedImages[0] : currentMain
          );
          showToast(`${addedImages.length} vue(s) d'interfaces ajoutée(s) avec succès !`);
        }
      }
    };

    fileList.forEach((file) => {
      if (file.size > 8 * 1024 * 1024) {
        showToast(`Image ${file.name} trop volumineuse (max 8 Mo).`);
        finalizeIfDone();
        return;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        if (result) {
          const optimized = await compressImageDataUrl(result);
          addedImages.push(optimized);
        }
        finalizeIfDone();
      };
      reader.onerror = () => {
        showToast(`Impossible de lire le fichier ${file.name}.`);
        finalizeIfDone();
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddGalleryUrl = () => {
    if (!customGalleryUrl.trim()) return;
    const url = customGalleryUrl.trim();
    setProdGalerie((prev) => (prev.includes(url) ? prev : [...prev, url]));
    if (!prodImage) setProdImage(url);
    setCustomGalleryUrl('');
    showToast('Nouvelle interface ajoutée au produit !');
  };

  const handleSetMainImage = (url: string) => {
    setProdImage(url);
    setProdGalerie((prev) => {
      if (!prev.includes(url)) return [url, ...prev];
      return [url, ...prev.filter((u) => u !== url)];
    });
    showToast('Vue définie comme photo principale du produit.');
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setProdGalerie((prev) => {
      const removed = prev[indexToRemove];
      const next = prev.filter((_, idx) => idx !== indexToRemove);
      if (removed === prodImage) {
        setProdImage(next.length > 0 ? next[0] : './images/product_lampadaire_solaire_1791734634193.jpg');
      }
      return next;
    });
    showToast('Vue retirée des interfaces.');
  };

  const handleAddPresetToGallery = (url: string, label: string) => {
    setProdGalerie((prev) => (prev.includes(url) ? prev : [...prev, url]));
    showToast(`Interface « ${label} » ajoutée aux vues du produit.`);
  };

  // Image Presets for 1-Click Assignment
  const IMAGE_PRESETS = [
    {
      category: 'Lampadaires Solaires & Éclairage',
      items: [
        { label: 'Lampadaire All-In-One 100W', url: './images/product_lampadaire_solaire_1791734634193.jpg' },
        { label: 'SunLumin TYN-01 100W', url: './images/product_slm_tyn_01_1791892182952.jpg' },
        { label: 'SunLumin TYN-02 150W', url: './images/product_slm_tyn_02_1791892205558.jpg' },
        { label: 'Lampadaire Split Mât Séparé', url: './images/product_split_pole_1791891587682.jpg' },
        { label: 'Sokoyo Coolex Haute Route', url: './images/product_sokoyo_coolex_1791894551466.jpg' },
        { label: 'Sokoyo Intense Autoroute', url: './images/product_sokoyo_intense_1791894591590.jpg' },
        { label: 'Sokoyo Lumo Éco-Voie', url: './images/product_sokoyo_lumo_1791894571096.jpg' },
        { label: 'Projecteur LED Industriel', url: './images/product_projecteur_led_indus_1791969759701.jpg' },
        { label: 'Lampadaire Électrique Urbain', url: './images/product_lampadaire_electrique_1791969743726.jpg' }
      ]
    },
    {
      category: 'Pompes Solaires & Forages',
      items: [
        { label: 'Pompe Immergée Inox 2.2kW', url: './images/product_pompe_solaire_1791734645113.jpg' },
        { label: 'Château d’Eau Villageois', url: './images/product_chateau_eau_village_1791982686064.jpg' },
        { label: 'Système Irrigation Maraîchère', url: './images/product_irrigation_agricole_1791982667672.jpg' },
        { label: 'Variateur de Pompage MPPT IP65', url: './images/product_variateur_pompage_mppt_1791982703203.jpg' }
      ]
    },
    {
      category: 'Kits Solaires, Batteries & Onduleurs',
      items: [
        { label: 'Kit Solaire Hybride Villa 5kVA', url: './images/product_kit_solaire_hybride_1791734655495.jpg' },
        { label: 'Batterie Lithium LiFePO4 Rack', url: './images/batterie_lithium_pro.jpg' },
        { label: 'Onduleur Hybride Pur Sinus', url: './images/onduleur_hybride_pro.jpg' },
        { label: 'Panneau Monocristallin 550Wc', url: './images/panneaux_solaires_pro.jpg' },
        { label: 'Armoire Murale & Toiture Solaire', url: '/assets/aistudio/image_970a0983.png' },
        { label: 'Synoptique Onduleur / Réseau', url: '/assets/aistudio/image_249f476c.png' },
        { label: 'Schéma Installation & Compteurs', url: '/assets/aistudio/image_cea4883a.png' },
        { label: 'Coffret Électrique de Protection', url: './images/product_armoire_electrique_1791969776063.jpg' }
      ]
    }
  ];

  // Stats calculation
  const totalRevenue = orders
    .filter((o) => o.statutCommande !== 'annulee')
    .reduce((sum, o) => sum + o.totalFCFA, 0);
  const pendingOrdersCount = orders.filter((o) => o.statutCommande === 'en_attente' || o.statutCommande === 'en_preparation').length;
  const pendingQuotesCount = quotes.filter((q) => q.statut === 'recu' || q.statut === 'en_etude').length;
  const lowStockProducts = products.filter((p) => p.stockDisponible < 10);

  // Catalog Export / Import
  const handleExportCatalog = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `catalogue_diarra_energie_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Catalogue exporté en fichier JSON');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        reference: prodRef,
        nom: prodNom,
        categorie: prodCat,
        sousCategorie: prodSousCat,
        prixFCFA: Number(prodPrix),
        stockDisponible: Number(prodStock),
        estSurDevis: prodEstSurDevis,
        delaiLivraisonJours: Number(prodDelai),
        estPhare: prodEstPhare,
        descriptionCourte: prodDescCourte || prodDesc.slice(0, 120),
        descriptionDetaillee: prodDesc,
        imagePrincipale: prodImage,
        galerie: prodGalerie.length > 0 ? (prodGalerie.includes(prodImage) ? prodGalerie : [prodImage, ...prodGalerie]) : [prodImage],
        specs: {
          ...editingProduct.specs,
          garantie: prodGarantie,
          puissance: specPuissance,
          fluxLumineux: specFlux,
          panneauSolaire: specPanneau,
          batterieType: specBatterie,
          autonomie: specAutonomie,
          hauteurMat: specHauteurMat,
          indiceProtection: specIndice,
          debitMax: specDebitMax,
          hmtMax: specHmtMax,
          profondeurImmersion: specProfondeur,
          tensionFonctionnement: specTension,
          caracteristiquesElectriques: {
            ...editingProduct.specs?.caracteristiquesElectriques,
            temperatureCouleur: specTempCouleur
          },
          specsPompage: {
            ...editingProduct.specs?.specsPompage,
            debitMax: specDebitMax,
            hauteurManometriqueTotale: specHmtMax,
            profondeurInstallationRecommandee: specProfondeur,
            puissanceMoteur: specMoteurPuissance,
            diametreForageMin: specDiametreForage,
            diametreRefoulement: specDiametreRefoulement,
            systemePhotovoltaiqueCompatible: {
              ...editingProduct.specs?.specsPompage?.systemePhotovoltaiqueCompatible,
              puissanceCreteRecommandee: specPvRecommande,
              technologieOnduleur: specTechnologieOnduleur
            }
          },
          specsKitsStockage: {
            ...editingProduct.specs?.specsKitsStockage,
            puissanceOnduleur: specKitOnduleur,
            capaciteBatterie: specKitBatterie,
            puissancePanneaux: specKitPanneaux,
            autonomieEstimee: specKitAutonomie
          }
        }
      });
      setEditingProduct(null);
      showToast(`Équipement « ${prodNom} » mis à jour avec succès (Prix & Image actualisés).`);
    } else {
      const newP: Product = {
        id: `deb-prod-${Date.now()}`,
        reference: prodRef || `DEB-REF-${Math.floor(Math.random() * 900)}`,
        nom: prodNom,
        categorie: prodCat,
        sousCategorie: prodSousCat,
        descriptionCourte: prodDescCourte || prodDesc.slice(0, 120),
        descriptionDetaillee: prodDesc,
        prixFCFA: Number(prodPrix),
        estSurDevis: prodEstSurDevis,
        stockDisponible: Number(prodStock),
        delaiLivraisonJours: Number(prodDelai) || 3,
        estPhare: prodEstPhare,
        imagePrincipale: prodImage || './images/product_lampadaire_solaire_1791734634193.jpg',
        galerie: prodGalerie.length > 0 ? (prodGalerie.includes(prodImage) ? prodGalerie : [prodImage, ...prodGalerie]) : [prodImage || './images/product_lampadaire_solaire_1791734634193.jpg'],
        specs: {
          garantie: prodGarantie,
          puissance: specPuissance,
          fluxLumineux: specFlux,
          panneauSolaire: specPanneau,
          batterieType: specBatterie,
          autonomie: specAutonomie,
          hauteurMat: specHauteurMat,
          indiceProtection: specIndice,
          debitMax: specDebitMax,
          hmtMax: specHmtMax,
          profondeurImmersion: specProfondeur,
          tensionFonctionnement: specTension,
          specsPompage: {
            debitMax: specDebitMax,
            hauteurManometriqueTotale: specHmtMax,
            profondeurInstallationRecommandee: specProfondeur,
            puissanceMoteur: specMoteurPuissance,
            diametreForageMin: specDiametreForage,
            diametreRefoulement: specDiametreRefoulement
          },
          specsKitsStockage: {
            puissanceOnduleur: specKitOnduleur,
            capaciteBatterie: specKitBatterie,
            puissancePanneaux: specKitPanneaux,
            autonomieEstimee: specKitAutonomie
          }
        },
        paysDisponibilite: ['Sénégal', 'Bénin', 'Togo']
      };
      addProduct(newP);
      setIsAddingProduct(false);
      showToast(`Nouvel équipement « ${prodNom} » ajouté au catalogue.`);
    }
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setEditTabSection('general');
    setProdRef(p.reference);
    setProdNom(p.nom);
    setProdCat(p.categorie);
    setProdSousCat(p.sousCategorie);
    setProdPrix(p.prixFCFA);
    setProdStock(p.stockDisponible);
    setProdEstSurDevis(p.estSurDevis);
    setProdDelai(p.delaiLivraisonJours || 3);
    setProdEstPhare(!!p.estPhare);
    setProdDescCourte(p.descriptionCourte || '');
    setProdDesc(p.descriptionDetaillee || '');
    setProdGarantie(p.specs?.garantie || '3 ans');
    const mainImg = p.imagePrincipale || './images/product_lampadaire_solaire_1791734634193.jpg';
    setProdImage(mainImg);
    const existingGallery = Array.isArray(p.galerie) && p.galerie.length > 0
      ? Array.from(new Set([mainImg, ...p.galerie]))
      : [mainImg];
    setProdGalerie(existingGallery);
    setCustomGalleryUrl('');

    // Technical specs
    setSpecPuissance(p.specs?.puissance || '100W LED');
    setSpecFlux(p.specs?.fluxLumineux || '16 500 Lumens');
    setSpecPanneau(p.specs?.panneauSolaire || 'Monocristallin 120Wc Tier-1');
    setSpecBatterie(p.specs?.batterieType || 'LiFePO4 12.8V 54Ah');
    setSpecAutonomie(p.specs?.autonomie || '36 à 48 heures (3 nuits)');
    setSpecHauteurMat(p.specs?.hauteurMat || '6 à 8 mètres');
    setSpecIndice(p.specs?.indiceProtection || 'IP66 / IK09');
    setSpecTempCouleur(p.specs?.caracteristiquesElectriques?.temperatureCouleur || '5700K Blanc Jour');

    setSpecDebitMax(p.specs?.debitMax || p.specs?.specsPompage?.debitMax || '18 m³/h');
    setSpecHmtMax(p.specs?.hmtMax || p.specs?.specsPompage?.hauteurManometriqueTotale || '115 mètres');
    setSpecProfondeur(p.specs?.profondeurImmersion || p.specs?.specsPompage?.profondeurInstallationRecommandee || '40m à 100m');
    setSpecMoteurPuissance(p.specs?.specsPompage?.puissanceMoteur || '2.2 kW / 3.0 HP');
    setSpecDiametreForage(p.specs?.specsPompage?.diametreForageMin || '4 pouces (100 mm)');
    setSpecDiametreRefoulement(p.specs?.specsPompage?.diametreRefoulement || '2 pouces (50 mm)');
    setSpecPvRecommande(p.specs?.specsPompage?.systemePhotovoltaiqueCompatible?.puissanceCreteRecommandee || '3 300 Wc (6x 550Wc)');
    setSpecTechnologieOnduleur(p.specs?.specsPompage?.systemePhotovoltaiqueCompatible?.technologieOnduleur || 'Variateur MPPT solaire IP65');

    setSpecKitOnduleur(p.specs?.specsKitsStockage?.puissanceOnduleur || '5 000 VA / 5 000 W Pur Sinus');
    setSpecKitBatterie(p.specs?.specsKitsStockage?.capaciteBatterie || '51.2V / 200Ah (10.24 kWh LiFePO4)');
    setSpecKitPanneaux(p.specs?.specsKitsStockage?.puissancePanneaux || '10x 550Wc (5.5 kWc)');
    setSpecKitAutonomie(p.specs?.specsKitsStockage?.autonomieEstimee || '18h à 24h continue');

    setSpecRendement('21.8%');
    setSpecTension(p.specs?.tensionFonctionnement || '48V / 51.2V');
    setIsAddingProduct(false);
  };

  // Auto-open product editor when triggered from a ProductCard anywhere in the boutique or categories
  React.useEffect(() => {
    if (adminEditingProductId) {
      const prod = products.find((p) => p.id === adminEditingProductId);
      if (prod) {
        setAdminTab('produits');
        openEditModal(prod);
      }
      setAdminEditingProductId(null);
    }
  }, [adminEditingProductId, products]);

  // Reactive filtering of products for admin inventory
  const filteredAdminProducts = React.useMemo(() => {
    return products.filter((p) => {
      if (productCatFilter !== 'all' && p.categorie !== productCatFilter) {
        return false;
      }
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase().trim();
        const matchNom = p.nom.toLowerCase().includes(q);
        const matchRef = p.reference.toLowerCase().includes(q);
        const matchSousCat = (p.sousCategorie || '').toLowerCase().includes(q);
        if (!matchNom && !matchRef && !matchSousCat) return false;
      }
      return true;
    });
  }, [products, productCatFilter, productSearch]);

  const handleQuickPriceSave = (p: Product) => {
    updateProduct({ ...p, prixFCFA: inlinePriceVal });
    setInlinePriceId(null);
    showToast(`Prix de ${p.reference} mis à jour : ${formatPrice(inlinePriceVal)}`);
  };

  const handleQuickStockSave = (p: Product) => {
    updateProduct({ ...p, stockDisponible: inlineStockVal });
    setInlineStockId(null);
    showToast(`Stock de ${p.reference} mis à jour : ${inlineStockVal} unités.`);
  };

  if (!isAdminAuthenticated) {
    return <AdminLoginView />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Espace d'Administration Sécurisé</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Tableau de Bord & Gestion Commerciale
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gestion intégrale du catalogue, commandes en ligne, pipeline de devis et stocks d'entrepôt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {adminUser && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-slate-800">{adminUser.name}</span>
            </div>
          )}

          <button
            onClick={openSunLuminModal}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            title="Consulter le catalogue technique officiel SunLumin 22 pages"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Catalogue SunLumin (PDF & Solutions)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-2 text-xs rounded-lg transition-colors flex items-center gap-1.5 font-medium ${
              isDevAuthenticated
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
            title="Accès réservé au Développeur Principal avec code secret"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Architecture v2.0 {isDevAuthenticated ? '(Déverrouillé ✓)' : '(Développeur 🔒)'}</span>
          </button>

          <button
            onClick={handleExportCatalog}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter catalogue</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium text-xs rounded-lg border border-rose-200 transition-colors flex items-center gap-1.5"
            title="Fermer la session administrateur"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Real-time Payment & Intent Notification Banner */}
      {unreadPaymentAlertsCount > 0 && (
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-amber-300">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-heading font-black text-sm sm:text-base tracking-wide">
                  🔔 ALERTE DIRECTE : {unreadPaymentAlertsCount} NOUVELLE(S) ALERTE(S) CLIENT
                </span>
                <span className="bg-white text-slate-900 font-mono text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Paiement en ligne / Wave / OM
                </span>
              </div>
              <p className="text-xs text-white/95 mt-1 leading-relaxed">
                {paymentAlerts.some((a) => a.statut === 'non_lu' && a.kind === 'intention_paiement')
                  ? '🛒 Un client est actuellement sur la page de paiement pour régler ses achats ! Vous pouvez l’assister immédiatement ou vérifier la réception des fonds.'
                  : 'Des règlements clients viennent d’être confirmés avec accusé SMS expédié automatiquement à la Direction (+221 77 114 95 39).'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAdminTab('alertes-paiements')}
            className="px-4 py-2.5 bg-white text-slate-900 font-extrabold text-xs rounded-xl shadow-xs hover:bg-slate-100 transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>Voir les alertes ({paymentAlerts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setAdminTab('dashboard')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'dashboard'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span>Indicateurs Clés</span>
        </button>

        <button
          onClick={() => setAdminTab('alertes-paiements')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'alertes-paiements'
              ? 'bg-white text-slate-900 shadow-xs ring-1 ring-rose-500/30'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-4 h-4 text-rose-600" />
          <span>Alertes Paiements Mobile Money ({paymentAlerts.length})</span>
          {unreadPaymentAlertsCount > 0 && (
            <span className="bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full text-[10px] animate-pulse">
              {unreadPaymentAlertsCount} NOUVEAU
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('produits')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'produits'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4 text-amber-600" />
          <span>Produits & Stocks ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('commandes')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'commandes'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingCart className="w-4 h-4 text-amber-600" />
          <span>Commandes Clients ({orders.length})</span>
          {pendingOrdersCount > 0 && (
            <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('devis')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'devis'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-600" />
          <span>Demandes de Devis ({quotes.length})</span>
          {pendingQuotesCount > 0 && (
            <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {pendingQuotesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setAdminTab('discussions');
            if (discussions.length > 0 && !selectedDiscussionId) {
              setSelectedDiscussionId(discussions[0].id);
              markDiscussionAsReadByAdmin(discussions[0].id);
            }
          }}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'discussions'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageCircle className="w-4 h-4 text-amber-600" />
          <span>Discussions Clients ({discussions.length})</span>
          {discussions.reduce((sum, d) => sum + d.nbNonLusAdmin, 0) > 0 && (
            <span className="bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full text-[10px] animate-pulse">
              {discussions.reduce((sum, d) => sum + d.nbNonLusAdmin, 0)}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('database')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'database'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-4 h-4 text-amber-600" />
          <span>Base de Données & Liens API</span>
          {isDevAuthenticated ? (
            <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded text-[10px] flex items-center gap-1">
              <CheckCircle className="w-2.5 h-2.5" />
              <span>Déverrouillé</span>
            </span>
          ) : (
            <span className="bg-slate-900 text-amber-400 font-bold px-1.5 py-0.2 rounded text-[10px] flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>Dev 🔒</span>
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: DASHBOARD METRICS */}
      {adminTab === 'dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500">Chiffre d'Affaires Réalisé</span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-slate-900">
                {formatPrice(totalRevenue)}
              </p>
              <span className="text-[11px] text-emerald-600">Commandes en ligne validées</span>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500">Commandes en Préparation</span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-slate-900">
                {pendingOrdersCount}
              </p>
              <span className="text-[11px] text-amber-600">À expédier Dakar / Cotonou / Lomé</span>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500">Devis Techniques en Attente</span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-amber-600">
                {pendingQuotesCount}
              </p>
              <span className="text-[11px] text-slate-500">Études forages & éclairage</span>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500">Alertes Stock Bas (&lt;10 unités)</span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-rose-600">
                {lowStockProducts.length}
              </p>
              <span className="text-[11px] text-slate-500">Réapprovisionnement requis</span>
            </div>
          </div>

          {/* Low Stock Warning Banner */}
          {lowStockProducts.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center justify-between text-xs text-rose-900">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  <strong>Alerte Stock :</strong> {lowStockProducts.length} référence(s) arrivent en rupture : {lowStockProducts.map(p => p.reference).join(', ')}.
                </span>
              </div>
              <button
                onClick={() => setAdminTab('produits')}
                className="font-semibold text-rose-800 hover:underline"
              >
                Gérer les stocks
              </button>
            </div>
          )}

          {/* Recent Orders Quick View */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">Dernières Commandes Passées</span>
              <button
                onClick={() => setAdminTab('commandes')}
                className="text-xs text-amber-700 hover:underline font-semibold"
              >
                Toutes les commandes →
              </button>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {orders.slice(0, 3).map((ord) => (
                <div key={ord.id} className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-slate-900">{ord.numeroCommande}</span>
                    <span className="text-slate-500 block">{ord.client.nomComplet} · {ord.client.ville} ({ord.client.pays})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">{formatPrice(ord.totalFCFA)}</span>
                    <span className="block text-[11px] text-slate-500">{ord.statutCommande}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS INVENTORY */}
      {adminTab === 'produits' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="font-heading font-extrabold text-sm text-slate-900">
                Gestion Intégrale des Équipements, Prix & Photos
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Modifiez en direct le prix des lampes, des pompes, des kits et des batteries, changez les photos (téléversement ou sélection prédéfinie) et ajustez les stocks.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setEditTabSection('general');
                  setProdRef(`DEB-${Date.now().toString().slice(-4)}`);
                  setProdNom('');
                  setProdCat('eclairage-solaire');
                  setProdSousCat('Lampadaires intégrés');
                  setProdPrix(180000);
                  setProdStock(20);
                  setProdEstSurDevis(false);
                  setProdDelai(3);
                  setProdEstPhare(false);
                  setProdDescCourte('');
                  setProdDesc('');
                  setProdGarantie('3 ans');
                  setProdImage('./images/product_lampadaire_solaire_1791734634193.jpg');
                  setProdGalerie(['./images/product_lampadaire_solaire_1791734634193.jpg']);
                  setCustomGalleryUrl('');
                  setIsAddingProduct(true);
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un équipement</span>
              </button>
            </div>
          </div>

          {/* Modal / Form for adding/editing product */}
          {(isAddingProduct || editingProduct) && (
            <div className="bg-white p-6 rounded-2xl border-2 border-amber-400/80 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-0.5">
                    <Sliders className="w-4 h-4" />
                    <span>{editingProduct ? 'Modification de l’équipement' : 'Nouvel équipement'}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900">
                    {editingProduct ? `Modifier les options de « ${editingProduct.nom} »` : 'Ajouter un Nouvel Équipement au Catalogue'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors self-end sm:self-auto"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-tabs inside Product Modal */}
              <div className="flex border-b border-slate-200 text-xs font-bold gap-2">
                <button
                  type="button"
                  onClick={() => setEditTabSection('general')}
                  className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                    editTabSection === 'general'
                      ? 'border-amber-500 text-amber-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>1. Prix & Infos Commerciales</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditTabSection('image')}
                  className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                    editTabSection === 'image'
                      ? 'border-amber-500 text-amber-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>2. Photos & Multi-Interfaces ({prodGalerie.length} vue{prodGalerie.length > 1 ? 's' : ''})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditTabSection('specs')}
                  className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                    editTabSection === 'specs'
                      ? 'border-amber-500 text-amber-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>3. Options Techniques ({prodCat.replace('-', ' ')})</span>
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
                {/* SECTION 1: GENERAL & PRICING */}
                {editTabSection === 'general' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Référence catalogue *</label>
                      <input
                        type="text"
                        required
                        value={prodRef}
                        onChange={(e) => setProdRef(e.target.value)}
                        placeholder="Ex: DEB-SL-100-PRO"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:bg-white focus:border-amber-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 mb-1 font-bold flex items-center justify-between">
                        <span>Nom commercial / Désignation du produit *</span>
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Visible en direct par les clients
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={prodNom}
                        onChange={(e) => setProdNom(e.target.value)}
                        placeholder="Ex: Lampadaire Solaire Intégré All-In-One 100W, Pompe de Forage 2.2kW..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-amber-500 font-semibold"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        💡 Dès que vous cliquez sur « Enregistrer », ce nouveau nom apparaîtra immédiatement en boutique, dans les catégories et sur le panier pour tous les clients.
                      </span>
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Catégorie *</label>
                      <select
                        value={prodCat}
                        onChange={(e) => setProdCat(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-amber-500"
                      >
                        <option value="eclairage-solaire">Éclairage public solaire (Lampes solaires)</option>
                        <option value="eclairage-electrique">Éclairage public électrique & LED</option>
                        <option value="pompage-solaire">Pompage solaire & Forages (Pompes solaires)</option>
                        <option value="kits-solaires">Kits solaires & Stockage hybride</option>
                        <option value="composants-solaires">Panneaux, batteries, onduleurs & accessoires</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Sous-catégorie</label>
                      <input
                        type="text"
                        value={prodSousCat}
                        onChange={(e) => setProdSousCat(e.target.value)}
                        placeholder="Ex: Lampadaires intégrés, Pompes immergées..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-amber-500"
                      />
                    </div>
                    <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                      <label className="block text-amber-950 mb-1 font-extrabold flex items-center justify-between">
                        <span>PRIX UNITAIRE (FCFA) *</span>
                        <span className="text-[10px] font-normal text-amber-800">Modifiable à tout moment</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={prodPrix}
                        onChange={(e) => setProdPrix(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-amber-400 rounded-lg font-mono font-bold text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Affiché en boutique : <strong>{formatPrice(prodPrix)}</strong>
                      </span>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Stock disponible en entrepôt *</label>
                      <input
                        type="number"
                        min="0"
                        value={prodStock}
                        onChange={(e) => setProdStock(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Délai d'expédition moyen (jours)</label>
                      <input
                        type="number"
                        min="1"
                        value={prodDelai}
                        onChange={(e) => setProdDelai(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Garantie constructeur</label>
                      <input
                        type="text"
                        value={prodGarantie}
                        onChange={(e) => setProdGarantie(e.target.value)}
                        placeholder="Ex: 3 ans, 5 ans, 25 ans"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-1 md:col-span-3">
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={prodEstSurDevis}
                          onChange={(e) => setProdEstSurDevis(e.target.checked)}
                          className="w-4 h-4 rounded text-amber-500"
                        />
                        <span className="font-semibold text-slate-800">Vente sur devis uniquement (Masquer le bouton d'achat direct)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-amber-50/60 p-2.5 rounded-lg border border-amber-200 hover:bg-amber-100/60">
                        <input
                          type="checkbox"
                          checked={prodEstPhare}
                          onChange={(e) => setProdEstPhare(e.target.checked)}
                          className="w-4 h-4 rounded text-amber-500"
                        />
                        <span className="font-semibold text-amber-950">Mettre en avant sur la page d'accueil (Produit Phare)</span>
                      </label>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-slate-700 mb-1 font-bold">Description courte</label>
                      <input
                        type="text"
                        value={prodDescCourte}
                        onChange={(e) => setProdDescCourte(e.target.value)}
                        placeholder="Accroche en 1 ligne pour la boutique..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-slate-700 mb-1 font-bold">Description technique détaillée</label>
                      <textarea
                        rows={3}
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        placeholder="Descriptif complet, applications chantiers, autonomie, etc."
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* SECTION 2: PHOTO & MULTI-INTERFACE MANAGEMENT */}
                {editTabSection === 'image' && (
                  <div className="space-y-6">
                    {/* Main Cover vs Multi-Interface Banner */}
                    <div className="p-4 bg-linear-to-r from-amber-500/10 via-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-xs">
                      <div className="shrink-0 text-center space-y-2">
                        <span className="text-[11px] font-black text-amber-900 block uppercase tracking-wider flex items-center justify-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                          Photo Principale (Couverture)
                        </span>
                        <div className="w-40 h-40 rounded-2xl border-2 border-amber-400 bg-white shadow-md overflow-hidden flex items-center justify-center p-2 relative group">
                          {prodImage ? (
                            <img
                              src={prodImage}
                              alt="Aperçu principal"
                              className="w-full h-full object-contain rounded-xl transition-transform group-hover:scale-105"
                              onError={(e) => {
                                (e.target as any).src = './images/product_lampadaire_solaire_1791734634193.jpg';
                              }}
                            />
                          ) : (
                            <div className="text-slate-400 text-center">
                              <ImageIcon className="w-10 h-10 mx-auto" />
                              <span className="text-xs block mt-1">Aucune image principale</span>
                            </div>
                          )}
                          <span className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/75 text-[10px] text-white py-0.5 rounded-md text-center font-bold">
                            Affichage 1er plan
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 flex-1 w-full">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                            <span>Gestion Multi-Interfaces de l'équipement</span>
                            <span className="bg-amber-100 text-amber-900 text-[11px] px-2 py-0.5 rounded-full font-bold">
                              {prodGalerie.length} vue{prodGalerie.length > 1 ? 's' : ''} enregistrée{prodGalerie.length > 1 ? 's' : ''}
                            </span>
                          </h4>
                          <p className="text-xs text-slate-600 mt-1">
                            Montrez votre équipement sous tous ses angles à vos clients : <strong>face avant</strong>, <strong>panneau photovoltaïque</strong>, <strong>lentille/optique LED</strong>, <strong>bride de fixation sur mât</strong>, <strong>connecteurs</strong> ou <strong>télécommande</strong>.
                          </p>
                        </div>

                        {/* Direct URL input for main image or quick edit */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Lien / URL de la photo principale :
                          </label>
                          <input
                            type="text"
                            value={prodImage}
                            onChange={(e) => {
                              setProdImage(e.target.value);
                              if (e.target.value && !prodGalerie.includes(e.target.value)) {
                                setProdGalerie((prev) => [e.target.value, ...prev]);
                              }
                            }}
                            placeholder="./images/nom_image.jpg ou https://..."
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:bg-white focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* INTERFACES GALLERY GRID */}
                    <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                            <span>📸 Galerie des Interfaces & Angles du Produit</span>
                            <span className="text-xs text-slate-500 font-normal">
                              (Les clients pourront faire défiler et zoomer sur chaque vue)
                            </span>
                          </h4>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500">
                          Astuce : Cliquez sur « ⭐ Définir Principale » pour changer la photo de couverture
                        </span>
                      </div>

                      {prodGalerie.length === 0 ? (
                        <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                          <ImageIcon className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                          <p className="text-sm font-semibold text-slate-700">Aucune interface supplémentaire enregistrée.</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Téléversez plusieurs photos ci-dessous ou sélectionnez des visuels prédéfinis.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                          {prodGalerie.map((imgUrl, index) => {
                            const isMain = prodImage === imgUrl;
                            return (
                              <div
                                key={`${imgUrl}-${index}`}
                                className={`group relative rounded-xl border-2 transition-all bg-slate-50 overflow-hidden flex flex-col ${
                                  isMain
                                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400/30 shadow-xs'
                                    : 'border-slate-200 hover:border-slate-400 shadow-xs'
                                }`}
                              >
                                <div className="h-28 w-full bg-white flex items-center justify-center p-2 relative overflow-hidden">
                                  <img
                                    src={imgUrl}
                                    alt={`Interface ${index + 1}`}
                                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                                    onError={(e) => {
                                      (e.target as any).src = './images/product_lampadaire_solaire_1791734634193.jpg';
                                    }}
                                  />
                                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-black bg-slate-900/80 text-white backdrop-blur-xs">
                                    Vue #{index + 1}
                                  </span>
                                  {isMain && (
                                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-500 text-amber-950 shadow-xs">
                                      ★ Principale
                                    </span>
                                  )}
                                </div>

                                <div className="p-2 bg-white border-t border-slate-100 flex flex-col gap-1.5">
                                  {!isMain ? (
                                    <button
                                      type="button"
                                      onClick={() => handleSetMainImage(imgUrl)}
                                      className="w-full text-left px-2 py-1 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded font-bold text-[10px] transition-colors flex items-center justify-center gap-1"
                                      title="Définir comme photo de couverture"
                                    >
                                      <span>⭐ Mettre Principale</span>
                                    </button>
                                  ) : (
                                    <span className="text-[10px] font-bold text-amber-700 text-center py-1 bg-amber-50 rounded">
                                      Couverture Actuelle
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveGalleryImage(index)}
                                    className="w-full text-left px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded font-bold text-[10px] transition-colors flex items-center justify-center gap-1"
                                    title="Supprimer cette interface"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-600" />
                                    <span>Supprimer</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* ADD NEW IMAGES / INTERFACES CONTROLS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Upload local files */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-wide">
                          1. Téléverser plusieurs photos en 1 fois (Multi-fichiers)
                        </label>
                        <p className="text-xs text-slate-600">
                          Sélectionnez plusieurs photos de la lampe ou équipement (face, dos, mât, accessoires...) directement depuis votre ordinateur ou smartphone.
                        </p>
                        <div>
                          <label className="cursor-pointer inline-flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs active:scale-95">
                            <Camera className="w-4 h-4 text-amber-400" />
                            <span>Sélectionner plusieurs photos</span>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleMultipleImageUpload}
                              className="hidden"
                            />
                          </label>
                          <span className="block mt-1.5 text-[11px] text-slate-500">
                            Supporte la sélection multiple (Ctrl / Maj cliqué). Formats : PNG, JPG, WEBP.
                          </span>
                        </div>
                      </div>

                      {/* Add by URL */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-wide">
                          2. Ajouter une vue par lien ou URL
                        </label>
                        <p className="text-xs text-slate-600">
                          Collez l'adresse Web ou le chemin d'une image pour l'intégrer à la galerie multi-interface.
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customGalleryUrl}
                            onChange={(e) => setCustomGalleryUrl(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddGalleryUrl();
                              }
                            }}
                            placeholder="./images/lampe_zoom_optique.jpg ou https://..."
                            className="flex-1 p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs focus:border-amber-500"
                          />
                          <button
                            type="button"
                            onClick={handleAddGalleryUrl}
                            className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs rounded-xl transition-colors shrink-0"
                          >
                            + Ajouter
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Pre-recorded Official Image Palette with Add to Gallery Option */}
                    <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                          3. Bibliothèque officielle DIARRA & SUNLUMIN (1 clic) :
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Cliquez sur « + Interface » pour ajouter comme angle supplémentaire, ou sur la carte pour remplacer la couverture.
                        </span>
                      </div>

                      <div className="space-y-5">
                        {IMAGE_PRESETS.map((group) => (
                          <div key={group.category} className="space-y-2.5">
                            <span className="font-extrabold text-[11px] text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-md inline-block">
                              {group.category}
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                              {group.items.map((preset) => {
                                const isAlreadyInGallery = prodGalerie.includes(preset.url);
                                const isMain = prodImage === preset.url;
                                return (
                                  <div
                                    key={preset.url}
                                    className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                                      isMain
                                        ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/30'
                                        : isAlreadyInGallery
                                        ? 'border-emerald-300 bg-emerald-50/30'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                                  >
                                    <div
                                      onClick={() => {
                                        setProdImage(preset.url);
                                        if (!prodGalerie.includes(preset.url)) {
                                          setProdGalerie((prev) => [...prev, preset.url]);
                                        }
                                        showToast(`Image « ${preset.label} » définie comme couverture.`);
                                      }}
                                      className="cursor-pointer"
                                      title="Cliquer pour définir comme couverture principale"
                                    >
                                      <div className="w-full h-16 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-0.5">
                                        <img
                                          src={preset.url}
                                          alt={preset.label}
                                          className="w-full h-full object-contain"
                                          onError={(e) => {
                                            (e.target as any).src = './images/product_lampadaire_solaire_1791734634193.jpg';
                                          }}
                                        />
                                      </div>
                                      <span className="text-[10px] font-semibold text-slate-800 line-clamp-1 text-center mt-1 block">
                                        {preset.label}
                                      </span>
                                    </div>

                                    <div className="pt-1 border-t border-slate-100 flex gap-1">
                                      <button
                                        type="button"
                                        onClick={() => handleAddPresetToGallery(preset.url, preset.label)}
                                        className={`w-full py-1 px-1 rounded text-[9px] font-bold transition-colors ${
                                          isAlreadyInGallery
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900'
                                        }`}
                                      >
                                        {isAlreadyInGallery ? '✓ Dans la galerie' : '+ Ajouter en Interface'}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 3: TECHNICAL SPECIFICATIONS & OPTIONS */}
                {editTabSection === 'specs' && (
                  <div className="space-y-5">
                    <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                      <span className="font-bold text-amber-950 block">
                        Options Techniques Spécifiques : {prodCat.replace('-', ' ').toUpperCase()}
                      </span>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Ces caractéristiques seront affichées sur la fiche technique client et prises en compte dans le comparateur.
                      </p>
                    </div>

                    {/* Form fields for Lamps / Éclairage */}
                    {(prodCat === 'eclairage-solaire' || prodCat === 'eclairage-electrique') && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Puissance LED (W)</label>
                          <input
                            type="text"
                            value={specPuissance}
                            onChange={(e) => setSpecPuissance(e.target.value)}
                            placeholder="Ex: 100W LED, 150W, 200W"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Flux Lumineux (Lumens)</label>
                          <input
                            type="text"
                            value={specFlux}
                            onChange={(e) => setSpecFlux(e.target.value)}
                            placeholder="Ex: 16 500 Lumens"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Panneau Solaire (Wc)</label>
                          <input
                            type="text"
                            value={specPanneau}
                            onChange={(e) => setSpecPanneau(e.target.value)}
                            placeholder="Ex: Monocristallin 120Wc Tier-1"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Technologie & Capacité Batterie</label>
                          <input
                            type="text"
                            value={specBatterie}
                            onChange={(e) => setSpecBatterie(e.target.value)}
                            placeholder="Ex: LiFePO4 12.8V 54Ah (Lithium Fer Phosphate)"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Autonomie Sans Soleil</label>
                          <input
                            type="text"
                            value={specAutonomie}
                            onChange={(e) => setSpecAutonomie(e.target.value)}
                            placeholder="Ex: 36 à 48 heures (3 nuits consécutives)"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Hauteur de Mât Recommandée</label>
                          <input
                            type="text"
                            value={specHauteurMat}
                            onChange={(e) => setSpecHauteurMat(e.target.value)}
                            placeholder="Ex: 6 à 8 mètres"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Indice de Protection</label>
                          <input
                            type="text"
                            value={specIndice}
                            onChange={(e) => setSpecIndice(e.target.value)}
                            placeholder="Ex: IP66 / IK09"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Température de Couleur</label>
                          <input
                            type="text"
                            value={specTempCouleur}
                            onChange={(e) => setSpecTempCouleur(e.target.value)}
                            placeholder="Ex: 5700K Blanc Jour"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    {/* Form fields for Pumps / Pompage */}
                    {prodCat === 'pompage-solaire' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Puissance Moteur Pompe</label>
                          <input
                            type="text"
                            value={specMoteurPuissance}
                            onChange={(e) => setSpecMoteurPuissance(e.target.value)}
                            placeholder="Ex: 2.2 kW / 3.0 HP"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Débit Maximal (m³/h)</label>
                          <input
                            type="text"
                            value={specDebitMax}
                            onChange={(e) => setSpecDebitMax(e.target.value)}
                            placeholder="Ex: 18 m³/h"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Hauteur Manométrique HMT Max (m)</label>
                          <input
                            type="text"
                            value={specHmtMax}
                            onChange={(e) => setSpecHmtMax(e.target.value)}
                            placeholder="Ex: 115 mètres"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Profondeur d'Immersion Recommandée</label>
                          <input
                            type="text"
                            value={specProfondeur}
                            onChange={(e) => setSpecProfondeur(e.target.value)}
                            placeholder="Ex: 40m à 100m"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Diamètre Forage Min</label>
                          <input
                            type="text"
                            value={specDiametreForage}
                            onChange={(e) => setSpecDiametreForage(e.target.value)}
                            placeholder="Ex: 4 pouces (100 mm)"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Générateur PV Recommandé</label>
                          <input
                            type="text"
                            value={specPvRecommande}
                            onChange={(e) => setSpecPvRecommande(e.target.value)}
                            placeholder="Ex: 3 300 Wc (6x 550Wc)"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-slate-700 mb-1 font-bold">Variateur & Sondes</label>
                          <input
                            type="text"
                            value={specTechnologieOnduleur}
                            onChange={(e) => setSpecTechnologieOnduleur(e.target.value)}
                            placeholder="Ex: Variateur MPPT solaire IP65 avec sondes de niveau d'eau"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    {/* Form fields for Kits / Stockage */}
                    {prodCat === 'kits-solaires' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Puissance Onduleur Hybride</label>
                          <input
                            type="text"
                            value={specKitOnduleur}
                            onChange={(e) => setSpecKitOnduleur(e.target.value)}
                            placeholder="Ex: 5 000 VA / 5 000 W Pur Sinus"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Capacité Batterie LiFePO4</label>
                          <input
                            type="text"
                            value={specKitBatterie}
                            onChange={(e) => setSpecKitBatterie(e.target.value)}
                            placeholder="Ex: 51.2V / 200Ah (10.24 kWh LiFePO4)"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Champ Photovoltaïque</label>
                          <input
                            type="text"
                            value={specKitPanneaux}
                            onChange={(e) => setSpecKitPanneaux(e.target.value)}
                            placeholder="Ex: 10x 550Wc (5.5 kWc)"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Autonomie Continue Estimée</label>
                          <input
                            type="text"
                            value={specKitAutonomie}
                            onChange={(e) => setSpecKitAutonomie(e.target.value)}
                            placeholder="Ex: 18h à 24h d'autonomie continue"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    {/* Form fields for Composants / Panneaux */}
                    {prodCat === 'composants-solaires' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Rendement de Conversion (%)</label>
                          <input
                            type="text"
                            value={specRendement}
                            onChange={(e) => setSpecRendement(e.target.value)}
                            placeholder="Ex: 21.8%"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Tension Système</label>
                          <input
                            type="text"
                            value={specTension}
                            onChange={(e) => setSpecTension(e.target.value)}
                            placeholder="Ex: 48V / 51.2V DC"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Form Footer Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    {editTabSection !== 'general' && (
                      <button
                        type="button"
                        onClick={() => setEditTabSection(editTabSection === 'specs' ? 'image' : 'general')}
                        className="px-3.5 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold"
                      >
                        ← Étape précédente
                      </button>
                    )}
                    {editTabSection !== 'specs' && (
                      <button
                        type="button"
                        onClick={() => setEditTabSection(editTabSection === 'general' ? 'image' : 'specs')}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 font-semibold"
                      >
                        Étape suivante →
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{editingProduct ? 'Enregistrer toutes les modifications' : 'Créer l’équipement'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Product Inventory Table with Live Filtering & Inline Editing */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-0">
            {/* Table Header: Live Search & Category Chips */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">
                    Catalogue Officiel : {filteredAdminProducts.length} sur {products.length} équipements affichés
                  </span>
                  <span className="text-[11px] text-slate-500">
                    💡 Cliquez sur « Modifier » ou directement sur le prix/stock pour modifier lampes, pompes, panneaux et batteries.
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Rechercher lampe, pompe, batterie..."
                    className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                  {productSearch && (
                    <button
                      type="button"
                      onClick={() => setProductSearch('')}
                      className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                {[
                  { id: 'all', label: 'Toutes les catégories', count: products.length },
                  { id: 'eclairage-solaire', label: 'Lampadaires & Lampes Solaires', count: products.filter((p) => p.categorie === 'eclairage-solaire').length },
                  { id: 'eclairage-electrique', label: 'Éclairage Public Électrique', count: products.filter((p) => p.categorie === 'eclairage-electrique').length },
                  { id: 'pompage-solaire', label: 'Pompes & Forages', count: products.filter((p) => p.categorie === 'pompage-solaire').length },
                  { id: 'kits-solaires', label: 'Kits Solaires & Stockage', count: products.filter((p) => p.categorie === 'kits-solaires').length },
                  { id: 'composants-solaires', label: 'Panneaux, Batteries & Onduleurs', count: products.filter((p) => p.categorie === 'composants-solaires').length }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setProductCatFilter(chip.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      productCatFilter === chip.id
                        ? 'bg-amber-400 text-slate-950 shadow-2xs font-bold'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{chip.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      productCatFilter === chip.id ? 'bg-amber-500/80 text-slate-950' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {chip.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Photo</th>
                    <th className="p-3">Réf & Désignation (Nom)</th>
                    <th className="p-3">Catégorie</th>
                    <th className="p-3">Prix FCFA (Édition rapide)</th>
                    <th className="p-3">Stock (Édition rapide)</th>
                    <th className="p-3">Statut Commercial</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAdminProducts.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        <p className="font-semibold text-sm text-slate-700">Aucun équipement ne correspond à votre recherche</p>
                        <p className="text-xs text-slate-400 mt-1">Essayez un autre mot-clé ou réinitialisez le filtre de catégorie.</p>
                      </td>
                    </tr>
                  )}
                  {filteredAdminProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-amber-50/20 transition-colors">
                      {/* Photo Thumbnail */}
                      <td className="p-3">
                        <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center p-0.5 shrink-0">
                          <img
                            src={p.imagePrincipale}
                            alt={p.nom}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as any).src = './images/product_lampadaire_solaire_1791734634193.jpg';
                            }}
                          />
                        </div>
                      </td>

                      {/* Reference & Name */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                            {p.reference}
                          </span>
                          {p.estPhare && (
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded">
                              Phare
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-slate-900 block mt-0.5 max-w-sm line-clamp-1" title={p.nom}>
                          {p.nom}
                        </span>
                        <span className="text-[11px] text-slate-500">Garantie : {p.specs.garantie}</span>
                      </td>

                      {/* Category */}
                      <td className="p-3">
                        <span className="font-medium text-slate-800 block">{p.sousCategorie}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{p.categorie.replace('-', ' ')}</span>
                      </td>

                      {/* Inline Price Edit */}
                      <td className="p-3">
                        {inlinePriceId === p.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              step="1000"
                              value={inlinePriceVal}
                              onChange={(e) => setInlinePriceVal(Number(e.target.value))}
                              className="w-28 p-1.5 bg-white border-2 border-amber-500 rounded font-mono font-bold text-xs"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleQuickPriceSave(p);
                                if (e.key === 'Escape') setInlinePriceId(null);
                              }}
                            />
                            <button
                              onClick={() => handleQuickPriceSave(p)}
                              className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
                              title="Valider"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setInlinePriceId(null)}
                              className="p-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded"
                              title="Annuler"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setInlinePriceId(p.id);
                              setInlinePriceVal(p.prixFCFA);
                            }}
                            className="group flex items-center gap-1.5 cursor-pointer p-1 rounded hover:bg-amber-100/50 w-fit"
                            title="Cliquer pour modifier rapidement le prix"
                          >
                            <span className="font-mono font-bold text-slate-900 text-xs">
                              {p.estSurDevis ? 'Sur devis' : formatPrice(p.prixFCFA)}
                            </span>
                            <Edit className="w-3 h-3 text-slate-400 group-hover:text-amber-700 opacity-60 group-hover:opacity-100" />
                          </div>
                        )}
                      </td>

                      {/* Inline Stock Edit */}
                      <td className="p-3">
                        {inlineStockId === p.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={inlineStockVal}
                              onChange={(e) => setInlineStockVal(Number(e.target.value))}
                              className="w-20 p-1.5 bg-white border-2 border-amber-500 rounded font-mono font-bold text-xs"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleQuickStockSave(p);
                                if (e.key === 'Escape') setInlineStockId(null);
                              }}
                            />
                            <button
                              onClick={() => handleQuickStockSave(p)}
                              className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
                              title="Valider"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setInlineStockId(null)}
                              className="p-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded"
                              title="Annuler"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setInlineStockId(p.id);
                              setInlineStockVal(p.stockDisponible);
                            }}
                            className="group flex items-center gap-1.5 cursor-pointer p-1 rounded hover:bg-amber-100/50 w-fit font-mono"
                            title="Cliquer pour ajuster le stock"
                          >
                            <span className={p.stockDisponible < 10 ? 'text-rose-600 font-bold' : 'text-slate-800'}>
                              {p.stockDisponible} u.
                            </span>
                            <Edit className="w-3 h-3 text-slate-400 group-hover:text-amber-700 opacity-60 group-hover:opacity-100" />
                          </div>
                        )}
                      </td>

                      {/* Commercial Status */}
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.estSurDevis
                            ? 'bg-purple-100 text-purple-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {p.estSurDevis ? 'Devis technique' : 'Achat direct boutique'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right space-x-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                          title="Modifier toutes les options, prix et photo"
                        >
                          <Edit className="w-3 h-3 text-amber-700" />
                          <span>Modifier</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Confirmer la suppression définitive de ${p.nom} (${p.reference}) ?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {adminTab === 'commandes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {orders.map((order) => (
              <div key={order.id} className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-900">{order.numeroCommande}</span>
                      <span className="text-xs text-slate-500">Date : {order.dateCreation}</span>
                      {order.statutPaiement === 'paye' ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-300">
                          ✓ Réglé & Encaissé (100%)
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-amber-300">
                          En attente de paiement
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Client : <strong>{order.client.nomComplet}</strong> ({order.client.telephone}) · {order.client.adresseLivraison}, {order.client.ville} ({order.client.pays})
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Paiement : <strong>{order.moyenPaiement.toUpperCase().replace('_', ' ')}</strong>
                      {order.referenceTransactionMobileMoney && (
                        <span> · Réf Transaction : <strong className="font-mono text-emerald-700">{order.referenceTransactionMobileMoney}</strong></span>
                      )}
                      {order.telephonePaiement && (
                        <span> · Mobile Payeur : <strong className="font-mono text-slate-800">{order.telephonePaiement}</strong></span>
                      )}
                    </p>

                    {order.smsAlerteEnvoye && (
                      <p className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                        <span>Alerte SMS expédiée à la Direction (+221 77 114 95 39)</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    <span className="font-mono text-base font-bold text-slate-900">
                      {formatPrice(order.totalFCFA)}
                    </span>

                    {/* Status Select */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">Statut :</span>
                      <select
                        value={order.statutCommande}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="p-1.5 bg-slate-100 border border-slate-200 rounded font-semibold text-slate-900 cursor-pointer"
                      >
                        <option value="en_attente">En attente</option>
                        <option value="confirmee">Confirmée</option>
                        <option value="en_preparation">En préparation</option>
                        <option value="expediee">Expédiée</option>
                        <option value="livree">Livrée</option>
                        <option value="annulee">Annulée</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1">
                  <span className="font-semibold text-slate-700 block">Produits commandés :</span>
                  {order.articles.map((art, idx) => (
                    <div key={idx} className="flex justify-between text-slate-600">
                      <span>{art.quantite}x {art.nom} (Réf : {art.reference})</span>
                      <span className="font-mono">{formatPrice(art.totalLigneFCFA)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: LIVE PAYMENT & INTENT ALERTS (Wave, Orange Money & Carte) */}
      {adminTab === 'alertes-paiements' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-lg text-slate-900">
                  Alertes de Caisse & Paiements en Direct
                </h2>
                <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  Temps Réel
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Notifications instantanées dès qu’un client <strong>veut payer ses achats</strong> (sur la page de règlement) et dès qu'un <strong>paiement Wave ou Orange Money</strong> est validé avec notification SMS à la Direction (+221 77 114 95 39).
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  paymentAlerts.forEach((a) => {
                    if (a.statut === 'non_lu') markPaymentAlertAsRead(a.id);
                  });
                  showToast('Toutes les alertes ont été marquées comme traitées.');
                }}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Tout marquer comme traité</span>
              </button>

              <button
                onClick={clearAllPaymentAlerts}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Effacer historique</span>
              </button>
            </div>
          </div>

          {/* Filter Bar between Intentions (veut payer) and Confirmés (a payé) */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => setPaymentAlertFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                paymentAlertFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-slate-700" />
              <span>Toutes les alertes ({paymentAlerts.length})</span>
            </button>

            <button
              onClick={() => setPaymentAlertFilter('intentions')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                paymentAlertFilter === 'intentions'
                  ? 'bg-white text-amber-900 shadow-xs ring-1 ring-amber-400'
                  : 'text-slate-600 hover:text-amber-900'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-600" />
              <span>🛒 Clients qui veulent payer ({paymentAlerts.filter((a) => a.kind === 'intention_paiement').length})</span>
            </button>

            <button
              onClick={() => setPaymentAlertFilter('confirmed')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                paymentAlertFilter === 'confirmed'
                  ? 'bg-white text-emerald-900 shadow-xs ring-1 ring-emerald-400'
                  : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>✅ Paiements encaissés ({paymentAlerts.filter((a) => a.kind !== 'intention_paiement').length})</span>
            </button>
          </div>

          {/* Alert List */}
          {paymentAlerts.filter((a) => {
            if (paymentAlertFilter === 'intentions') return a.kind === 'intention_paiement';
            if (paymentAlertFilter === 'confirmed') return a.kind !== 'intention_paiement';
            return true;
          }).length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-800">
                {paymentAlertFilter === 'intentions'
                  ? 'Aucun client n’est actuellement sur le point de payer'
                  : paymentAlertFilter === 'confirmed'
                  ? 'Aucun paiement confirmé dans cette vue'
                  : 'Aucune alerte de paiement pour le moment'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Dès qu’un client saisit ses coordonnées et passe au paiement, ou effectue un règlement Wave / Orange Money, l’alerte apparaîtra instantanément ici.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentAlerts
                .filter((a) => {
                  if (paymentAlertFilter === 'intentions') return a.kind === 'intention_paiement';
                  if (paymentAlertFilter === 'confirmed') return a.kind !== 'intention_paiement';
                  return true;
                })
                .map((alert) => {
                  const isIntent = alert.kind === 'intention_paiement';
                  return (
                    <div
                      key={alert.id}
                      className={`bg-white rounded-2xl border transition-all p-5 space-y-4 shadow-xs ${
                        alert.statut === 'non_lu'
                          ? isIntent
                            ? 'border-amber-400 ring-2 ring-amber-400/30 bg-gradient-to-r from-amber-50/20 via-white to-amber-50/10'
                            : 'border-rose-300 ring-2 ring-rose-400/20 bg-gradient-to-r from-white via-rose-50/20 to-white'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          {alert.moyenPaiement === 'wave' ? (
                            <div className="flex items-center gap-2">
                              <img
                                src="/assets/aistudio/image_0375626b.png"
                                alt="Wave"
                                className="w-8 h-8 rounded-lg object-cover shadow-xs border border-sky-300 shrink-0"
                              />
                              <div>
                                <span className="font-heading font-extrabold text-sm text-sky-950 block">
                                  Wave Mobile Money
                                </span>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  {isIntent ? 'Intention de règlement' : `Réf : ${alert.referenceTransaction}`}
                                </span>
                              </div>
                            </div>
                          ) : alert.moyenPaiement === 'orange_money' ? (
                            <div className="flex items-center gap-2">
                              <img
                                src="/assets/aistudio/image_f207f722.png"
                                alt="Orange Money"
                                className="w-8 h-8 rounded-lg object-contain bg-white p-1 shadow-xs border border-orange-200 shrink-0"
                              />
                              <div>
                                <span className="font-heading font-extrabold text-sm text-orange-950 block">
                                  Orange Money
                                </span>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  {isIntent ? 'Intention de règlement' : `Réf : ${alert.referenceTransaction}`}
                                </span>
                              </div>
                            </div>
                          ) : alert.moyenPaiement === 'paytech' ? (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                                PT
                              </div>
                              <div>
                                <span className="font-heading font-extrabold text-sm text-emerald-950 block">
                                  PayTech Sénégal (API Sécurisée)
                                </span>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  {isIntent ? 'Intention de paiement PayTech' : `Réf PayTech : ${alert.referenceTransaction}`}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-6 h-6 text-slate-800" />
                              <div>
                                <span className="font-heading font-extrabold text-sm text-slate-900 block">
                                  {alert.moyenPaiement.toUpperCase()}
                                </span>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  {isIntent ? 'Intention de règlement' : `Réf : ${alert.referenceTransaction || 'CB-3DS'}`}
                                </span>
                              </div>
                            </div>
                          )}

                          {isIntent ? (
                            <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs animate-pulse">
                              <ShoppingCart className="w-3 h-3" />
                              <span>Veut Payer ses Achats</span>
                            </span>
                          ) : alert.statut === 'non_lu' ? (
                            <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                              Paiement Reçu
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                              Traité
                            </span>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="font-mono text-lg font-black text-slate-900 block">
                            {formatPrice(alert.montantFCFA)}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {alert.datePaiement}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-semibold">Client Acheteur :</span>
                          <span className="font-bold text-slate-900 block text-xs">{alert.clientNom}</span>
                          <span className="text-slate-600 font-mono text-[11px]">{alert.clientTelephone}</span>
                          {alert.clientVille && (
                            <span className="text-[10px] text-slate-500 block">Ville : {alert.clientVille}</span>
                          )}
                        </div>

                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-semibold">Articles dans le Panier :</span>
                          <span className="font-medium text-slate-800 block text-[11px] line-clamp-2" title={alert.articlesResume}>
                            {alert.articlesResume || (alert.numeroCommande ? `Commande ${alert.numeroCommande}` : 'Matériels solaires en cours d’achat')}
                          </span>
                          <span className={`text-[10px] font-bold ${isIntent ? 'text-amber-800' : 'text-emerald-700'}`}>
                            {isIntent ? 'Étape : En cours de validation' : 'Reçu de caisse : Débloqué ✓'}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-semibold">Alerte SMS Expédiée :</span>
                          <span className="font-mono text-emerald-800 font-bold block text-xs">
                            {alert.smsDestinataire}
                          </span>
                          <span className="text-[10px] text-slate-500">Transmis instantanément</span>
                        </div>
                      </div>

                      <div className={`p-3 rounded-xl text-xs space-y-1 ${isIntent ? 'bg-amber-50/70 border border-amber-200' : 'bg-emerald-50/70 border border-emerald-200'}`}>
                        <div className={`flex items-center gap-1.5 font-bold text-[11px] ${isIntent ? 'text-amber-950' : 'text-emerald-950'}`}>
                          <Send className="w-3.5 h-3.5 text-slate-700" />
                          <span>Message d'alerte transmis en direct à la Direction :</span>
                        </div>
                        <p className={`text-[11px] font-mono p-2.5 rounded-lg border bg-white ${isIntent ? 'text-amber-950 border-amber-200' : 'text-emerald-900 border-emerald-200'}`}>
                          « {alert.smsContenu} »
                        </p>
                      </div>

                      {/* Direct Customer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2">
                          {alert.clientTelephone && (
                            <>
                              <a
                                href={`tel:${alert.clientTelephone.replace(/\s/g, '')}`}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5"
                                title="Appeler directement le client sur son mobile"
                              >
                                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                                <span>Appeler le client</span>
                              </a>
                              <a
                                href={`https://wa.me/${alert.clientTelephone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${alert.clientNom}, nous avons bien reçu votre intention de paiement pour vos équipements DIARRA ENERGIE (${formatPrice(alert.montantFCFA)}). Avez-vous besoin d'assistance pour finaliser ?`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5"
                                title="Contacter le client sur WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp direct</span>
                              </a>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {alert.statut === 'non_lu' && (
                            <button
                              onClick={() => {
                                markPaymentAlertAsRead(alert.id);
                                showToast(`Alerte de ${alert.clientNom} marquée comme traitée.`);
                              }}
                              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{isIntent ? 'Marquer comme contacté' : 'Confirmer encaissement'}</span>
                            </button>
                          )}

                          {alert.numeroCommande && (
                            <button
                              onClick={() => setAdminTab('commandes')}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-lg transition-colors flex items-center gap-1"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Voir commande</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: QUOTES MANAGEMENT */}
      {adminTab === 'devis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {quotes.map((q) => (
              <div key={q.id} className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-amber-600">{q.numeroDevis}</span>
                      <span className="text-xs text-slate-500">Reçu le : {q.dateCreation}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mt-1">{q.projet.intitule}</h3>
                    <p className="text-xs text-slate-600">
                      Demandeur : <strong>{q.demandeur.nomComplet}</strong> ({q.demandeur.entreprise || q.demandeur.typeEntite}) · Tél : {q.demandeur.telephone} · Email : {q.demandeur.email}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Localisation : {q.demandeur.villeProjet} ({q.demandeur.paysProjet}) {q.demandeur.lieuDit ? `· ${q.demandeur.lieuDit}` : ''}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">Statut Bureau d'Études :</span>
                      <select
                        value={q.statut}
                        onChange={(e) => updateQuoteStatus(q.id, e.target.value as QuoteStatus)}
                        className="p-1.5 bg-slate-100 border border-slate-200 rounded font-semibold text-slate-900 cursor-pointer"
                      >
                        <option value="recu">Dossier reçu</option>
                        <option value="en_etude">En étude technique</option>
                        <option value="devis_transmis">Devis chiffré transmis</option>
                        <option value="accepte">Validé & Gagné</option>
                        <option value="refuse">Refusé</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg text-xs space-y-2">
                  <p className="text-slate-700">
                    <strong>Besoin technique :</strong> {q.projet.descriptionBesoin}
                  </p>

                  {q.projet.pompageData && (
                    <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-950 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>Débit : <strong>{q.projet.pompageData.debitSouhaiteM3Jour} m³/j</strong></div>
                      <div>Profondeur : <strong>{q.projet.pompageData.profondeurForageM} m</strong></div>
                      <div>Refoulement : <strong>{q.projet.pompageData.hauteurRefoulementM} m</strong></div>
                      <div>Usage : <strong>{q.projet.pompageData.usageEau}</strong></div>
                    </div>
                  )}

                  {q.projet.eclairageData && (
                    <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-950 grid grid-cols-3 gap-2">
                      <div>Longueur : <strong>{q.projet.eclairageData.longueurVoieKm} km</strong></div>
                      <div>Type voirie : <strong>{q.projet.eclairageData.typeVoirie}</strong></div>
                      <div>Hauteur mât : <strong>{q.projet.eclairageData.hauteurMatSouhaiteeM} m</strong></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: DISCUSSIONS & MESSAGES CLIENTS */}
      {adminTab === 'discussions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                <MessageCircle className="w-4 h-4" />
                <span>Messagerie Directe Client & Administration</span>
              </div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                Discussions & Réponses Clients
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Consultez les demandes envoyées par les clients depuis les fiches produits et répondez-leur en direct.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setDiscussionFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  discussionFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Toutes ({discussions.length})
              </button>
              <button
                onClick={() => setDiscussionFilter('unread')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  discussionFilter === 'unread' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <span>Non lues</span>
                {discussions.filter((d) => d.nbNonLusAdmin > 0).length > 0 && (
                  <span className="bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                    {discussions.filter((d) => d.nbNonLusAdmin > 0).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Barre de Visualisation & Navigation Rapide dans les Pages du Site */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <h3 className="font-heading font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider">
                  Visualiser les Pages du Site & de la Boutique (Accès Direct Administrateur)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Inspectez le contenu exact de chaque page pour conseiller précisément les clients
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('accueil')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Accueil</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('boutique')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>Boutique Globale</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('eclairage-solaire')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Éclairage Solaire</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('eclairage-electrique')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Éclairage Électrique</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pompage-solaire')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Pompage Solaire</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('kits-solaires')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Kits Solaires</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('composants-solaires')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Protection & Composants</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('a-propos')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>À Propos de Nous</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('devis')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors font-medium active:scale-95"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Demande de Devis</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Discussions List */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Conversations Clients</span>
                <span className="text-slate-400 font-mono text-[11px]">{discussions.length} client(s)</span>
              </div>

              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {discussions
                  .filter((d) => (discussionFilter === 'unread' ? d.nbNonLusAdmin > 0 : true))
                  .map((disc) => {
                    const isSelected = (selectedDiscussionId || (discussions[0] && discussions[0].id)) === disc.id;
                    const lastMsg = disc.messages[disc.messages.length - 1];
                    const isReplied = lastMsg?.sender === 'admin';

                    return (
                      <button
                        key={disc.id}
                        onClick={() => {
                          setSelectedDiscussionId(disc.id);
                          markDiscussionAsReadByAdmin(disc.id);
                        }}
                        className={`w-full p-4 text-left transition-all flex flex-col gap-2 hover:bg-slate-50 ${
                          isSelected ? 'bg-amber-50/70 border-l-4 border-amber-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                              {disc.clientNom.charAt(0)}
                            </div>
                            <div>
                              <span className="font-heading font-bold text-xs text-slate-900 block leading-tight">
                                {disc.clientNom}
                              </span>
                              <span className="text-[11px] text-slate-400 block truncate max-w-[180px]">
                                {disc.clientEmail}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[10px] text-slate-400 font-mono">
                              {disc.dateDernierMessage.slice(5)}
                            </span>
                            {disc.nbNonLusAdmin > 0 ? (
                              <span className="bg-rose-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full shadow-2xs">
                                {disc.nbNonLusAdmin} nouveau(x)
                              </span>
                            ) : isReplied ? (
                              <span className="bg-emerald-100 text-emerald-800 font-semibold text-[10px] px-1.5 py-0.2 rounded">
                                ✓ Répondu
                              </span>
                            ) : (
                              <span className="bg-amber-100 text-amber-900 font-semibold text-[10px] px-1.5 py-0.2 rounded">
                                ⏳ À répondre
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Page Source Tag */}
                        {disc.pageSource && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-max">
                            <Compass className="w-3 h-3 text-amber-600" />
                            <span>Origine : {disc.pageSource}</span>
                          </div>
                        )}

                        {/* Attached Product Snippet */}
                        {disc.produitReference && (
                          <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-700">
                            {disc.produitReference.image ? (
                              <img
                                src={disc.produitReference.image}
                                alt={disc.produitReference.nom}
                                className="w-7 h-7 rounded object-cover border border-slate-100 shrink-0"
                              />
                            ) : null}
                            <span className="font-medium truncate">{disc.produitReference.nom}</span>
                          </div>
                        )}

                        <p className="text-xs text-slate-600 line-clamp-2 italic">
                          "{disc.dernierMessage}"
                        </p>
                      </button>
                    );
                  })}

                {discussions.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500">
                    Aucune discussion client pour le moment.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Active Discussion & Admin Response Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
              {(() => {
                const activeId = selectedDiscussionId || (discussions[0] && discussions[0].id);
                const activeDisc = discussions.find((d) => d.id === activeId);

                if (!activeDisc) {
                  return (
                    <div className="p-12 text-center text-slate-400 space-y-3">
                      <MessageCircle className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="text-xs">Sélectionnez une discussion à gauche pour y répondre.</p>
                    </div>
                  );
                }

                return (
                  <>
                    {/* Top Active Bar */}
                    <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-extrabold text-sm text-white">
                            {activeDisc.clientNom}
                          </h3>
                          <span className="text-[10px] bg-slate-800 text-amber-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                            Client Vérifié
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-amber-400" />
                            <span>{activeDisc.clientEmail}</span>
                          </span>
                          {activeDisc.clientTelephone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-400" />
                              <span>{activeDisc.clientTelephone}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {activeDisc.pageSource && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const s = activeDisc.pageSource?.toLowerCase() || '';
                              if (s.includes('eclairage-solaire') || s.includes('solaire')) setActiveTab('eclairage-solaire');
                              else if (s.includes('eclairage-electrique') || s.includes('électrique')) setActiveTab('eclairage-electrique');
                              else if (s.includes('pompage')) setActiveTab('pompage-solaire');
                              else if (s.includes('kit')) setActiveTab('kits-solaires');
                              else if (s.includes('protection') || s.includes('composant')) setActiveTab('composants-solaires');
                              else if (s.includes('accueil')) setActiveTab('accueil');
                              else if (s.includes('propos')) setActiveTab('a-propos');
                              else if (s.includes('devis')) setActiveTab('devis');
                              else setActiveTab('boutique');
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                            title="Ouvrir la page visitée par le client"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-950" />
                            <span>Voir la page ({activeDisc.pageSource})</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Attached Product Box in Admin */}
                    {activeDisc.produitReference && (
                      <div className="bg-amber-50/80 border-b border-amber-200 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {activeDisc.produitReference.image && (
                            <img
                              src={activeDisc.produitReference.image}
                              alt={activeDisc.produitReference.nom}
                              className="w-12 h-12 rounded-lg object-cover border border-amber-200 bg-white shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                              Équipement concerné par la question :
                            </span>
                            <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                              {activeDisc.produitReference.nom}
                            </h4>
                            {activeDisc.produitReference.prixFCFA ? (
                              <span className="font-mono font-bold text-xs text-amber-900">
                                {formatPrice(activeDisc.produitReference.prixFCFA)}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {activeDisc.produitReference.reference && (
                            <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-1 rounded border border-amber-200 hidden sm:inline-block">
                              Réf : {activeDisc.produitReference.reference}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const found = products.find((p) => p.id === activeDisc.produitReference?.id);
                              if (found) {
                                setSpecModalProduct(found);
                              } else {
                                const fallback = products.find((p) =>
                                  p.nom.toLowerCase().includes(activeDisc.produitReference?.nom.toLowerCase() || '')
                                ) || products[0];
                                if (fallback) setSpecModalProduct(fallback);
                              }
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                            title="Consulter les détails techniques du matériel"
                          >
                            <Eye className="w-3.5 h-3.5 text-amber-400" />
                            <span>Voir fiche produit</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Chat Messages Feed */}
                    <div className="p-4 sm:p-5 space-y-4 bg-slate-50 max-h-[380px] overflow-y-auto min-h-[220px]">
                      {activeDisc.messages.map((m) => {
                        const isAdmin = m.sender === 'admin';
                        return (
                          <div
                            key={m.id}
                            className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'} space-y-1`}
                          >
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              {isAdmin ? (
                                <>
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="font-bold text-emerald-800">Vous (Administration)</span>
                                </>
                              ) : (
                                <>
                                  <span className="font-semibold text-slate-700">{m.senderName}</span>
                                  <span className="text-slate-400">({activeDisc.clientEmail})</span>
                                </>
                              )}
                              <span className="text-[10px] text-slate-400">· {m.date}</span>
                            </div>

                            <div
                              className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                                isAdmin
                                  ? 'bg-emerald-950 text-emerald-50 rounded-tr-none'
                                  : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none font-medium'
                              }`}
                            >
                              {m.texte}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Admin Reply Chips */}
                    <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-xs overflow-x-auto no-scrollbar">
                      <div className="flex items-center gap-1.5 w-max">
                        <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 shrink-0">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>Réponses types :</span>
                        </span>
                        {[
                          'Bonjour, cet équipement est disponible immédiatement en stock à notre entrepôt de Dakar.',
                          'Bonjour, la livraison et l\'installation sont réalisables sous 48h ouvrées par nos techniciens.',
                          'Bonjour, nous pouvons vous accorder une remise quantitative pour cette commande.',
                          'Bonjour, un technicien dédié va vous appeler pour valider les dimensions de votre installation.'
                        ].map((txt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setAdminReplyText(txt)}
                            className="text-[11px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 rounded-lg px-2.5 py-1 whitespace-nowrap transition-colors font-medium shadow-2xs"
                          >
                            {txt.slice(0, 42)}...
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reply Input Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!adminReplyText.trim()) return;
                        sendMessageAsAdmin(activeDisc.id, adminReplyText);
                        setAdminReplyText('');
                      }}
                      className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <textarea
                          rows={2}
                          required
                          placeholder={`Répondre à ${activeDisc.clientNom}...`}
                          value={adminReplyText}
                          onChange={(e) => setAdminReplyText(e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium resize-none"
                        />
                        <button
                          type="submit"
                          className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-2xs shrink-0 self-stretch justify-center active:scale-95"
                        >
                          <Send className="w-4 h-4" />
                          <span className="hidden sm:inline">Répondre</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Votre réponse apparaîtra en direct dans la fenêtre de discussion du client.
                      </p>
                    </form>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BASE DE DONNÉES & LIENS API (DÉVELOPPEUR UNIQUEMENT) */}
      {adminTab === 'database' && (
        !isDevAuthenticated ? (
          <div className="max-w-xl mx-auto py-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-950 p-6 sm:p-8 text-white relative">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Accès Développeur Strictement Protégé</span>
                </div>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  Authentification Base de Données & Liens API
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  L'accès aux schémas SQL, endpoints JSON directs, dumps de données et configurations d'infrastructure est strictement réservé au Lead Développeur (<strong>morsangare@gmail.com</strong>).
                </p>
              </div>

              <form onSubmit={handleDevLoginSubmit} className="p-6 sm:p-8 space-y-4">
                {devLoginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{devLoginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Identifiant Développeur *
                  </label>
                  <div className="relative">
                    <Terminal className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="morsangare@gmail.com ou dev"
                      value={devLoginId}
                      onChange={(e) => setDevLoginId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Code Secret Développeur *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showDevPass ? 'text' : 'password'}
                      required
                      placeholder="Code secret développeur"
                      value={devLoginPass}
                      onChange={(e) => setDevLoginPass(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDevPass(!showDevPass)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      {showDevPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Déverrouiller l'Espace Développeur</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="text-slate-400 font-mono">Compte : morsangare@gmail.com</span>
                  <span className="font-mono text-emerald-600 font-semibold">🔒 Chiffrement Actif</span>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Developer Session Active Strip */}
            <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-mono text-slate-300">
                  Session Développeur Active · <strong>morsangare@gmail.com</strong> (Base de Données & API Déverrouillées)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded font-medium transition-colors flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Dossier Architecture v2.0</span>
                </button>
                <button
                  onClick={logoutDev}
                  className="px-3 py-1 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded font-medium transition-colors flex items-center gap-1.5"
                  title="Verrouiller l'accès développeur"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Verrouiller</span>
                </button>
              </div>
            </div>

            {/* Header Info */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Database className="w-4 h-4" />
                <span>CENTRE DE GESTION & LIENS DE LA BASE DE DONNÉES</span>
              </div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                Connexions & Endpoints de la Base de Données
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Retrouvez ci-dessous l'ensemble des liens directs pour interroger, synchroniser, exporter ou intégrer la base de données de <strong>DIARRA ENERGIE & BUSINESS</strong> via vos outils tiers (ERP, CRM, passerelles bancaires ou connecteurs SQL).
              </p>
            </div>

            {/* Direct Endpoints & Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. REST JSON API */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                      REST API JSON
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded">
                      GET 200 OK
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-sm">
                    Flux JSON Complet de la Base
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Endpoint HTTP en direct renvoyant l'état consolidé des produits, commandes, devis et zones de livraison.
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 break-all">
                    {window.location.origin}/api/database
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href="/api/database"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ouvrir l'API</span>
                  </a>

                  <button
                    onClick={() => copyToClipboard(`${window.location.origin}/api/database`, 'API JSON')}
                    className="p-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs"
                    title="Copier le lien de l'API"
                  >
                    {copiedLink === 'API JSON' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2. PostgreSQL DDL Schema */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded">
                      SQL SCHEMA (DDL)
                    </span>
                    <span className="text-[10px] text-sky-700 bg-sky-50 font-bold px-2 py-0.5 rounded">
                      PostgreSQL
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-sm">
                    Script SQL DDL & Données de Démarrage
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Script de création des tables relationnelles (`products`, `orders`, `quotes`, `clients`) conforme aux normes OHADA.
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 break-all">
                    {window.location.origin}/api/database/sql
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href="/api/database/sql"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Voir le Script SQL</span>
                  </a>

                  <button
                    onClick={() => copyToClipboard(`${window.location.origin}/api/database/sql`, 'Script SQL')}
                    className="p-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs"
                    title="Copier le lien du script SQL"
                  >
                    {copiedLink === 'Script SQL' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 3. Downloadable Dump Backup */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                      SAUVEGARDE EXPORT
                    </span>
                    <span className="text-[10px] text-slate-600 bg-slate-100 font-bold px-2 py-0.5 rounded">
                      .JSON
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-sm">
                    Téléchargement du Fichier de Sauvegarde
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Exportation brute horodatée pour conservation hors-ligne ou restauration dans une autre instance.
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 break-all">
                    {window.location.origin}/api/database/download
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href="/api/database/download"
                    download
                    className="flex-1 py-2 px-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger le Dump</span>
                  </a>

                  <button
                    onClick={() => copyToClipboard(`${window.location.origin}/api/database/download`, 'Lien Téléchargement')}
                    className="p-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs"
                    title="Copier le lien"
                  >
                    {copiedLink === 'Lien Téléchargement' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Database Live Schema & Tables Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-heading font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                Structure Relationnelle & État des Tables en Mémoire
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-mono text-slate-500 font-bold">Table: products</span>
                  <p className="font-mono text-xl font-black text-slate-900">{products.length} entrées</p>
                  <p className="text-[11px] text-slate-500">Lampadaires, pompes, kits, panneaux</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-mono text-slate-500 font-bold">Table: orders</span>
                  <p className="font-mono text-xl font-black text-slate-900">{orders.length} commandes</p>
                  <p className="text-[11px] text-slate-500">Paiements Wave, Orange Money, Moov, MTN</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-mono text-slate-500 font-bold">Table: quotes</span>
                  <p className="font-mono text-xl font-black text-slate-900">{quotes.length} dossiers</p>
                  <p className="text-[11px] text-slate-500">Études hydrauliques & dimensionnements</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-mono text-slate-500 font-bold">Table: delivery_zones</span>
                  <p className="font-mono text-xl font-black text-slate-900">3 pays actifs</p>
                  <p className="text-[11px] text-slate-500">Sénégal (Dakar), Bénin (Cotonou), Togo (Lomé)</p>
                </div>
              </div>
            </div>

            {/* Cloud SQL / Production Database Integration Note */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 text-xs space-y-2">
              <h4 className="font-bold text-amber-950 text-sm">
                Déploiement d'une Base PostgreSQL Cloud SQL Managée
              </h4>
              <p className="text-amber-900 leading-relaxed">
                Si vous souhaitez provisionner une instance de base de données relationnelle <strong>Google Cloud SQL (PostgreSQL)</strong> hébergée dans le cloud avec adresses IP publiques, réplication haute disponibilité et sauvegardes automatiques, il vous suffit de demander : <em>« Configure Cloud SQL »</em> ou <em>« Provisionne une base PostgreSQL »</em>. Le système activera alors le service Cloud SQL dédié pour DIARRA ENERGIE & BUSINESS.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
