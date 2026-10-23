import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Product,
  CartItem,
  Order,
  QuoteRequest,
  ProjectReference,
  NewsArticle,
  TargetCountry,
  OrderStatus,
  QuoteStatus,
  ClientAccount,
  ChatMessage,
  ClientDiscussion
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_PROJECTS,
  INITIAL_NEWS,
  INITIAL_CLIENTS,
  INITIAL_ORDERS,
  INITIAL_DISCUSSIONS
} from '../data/mockData';

export type Currency = 'XOF' | 'EUR' | 'USD';

export type AppView =
  | 'accueil'
  | 'a-propos'
  | 'eclairage-solaire'
  | 'eclairage-electrique'
  | 'pompage-solaire'
  | 'kits-solaires'
  | 'composants-solaires'
  | 'services'
  | 'realisations'
  | 'boutique'
  | 'devis'
  | 'actualites'
  | 'contact'
  | 'compte'
  | 'panier'
  | 'cgv'
  | 'confidentialite'
  | 'livraison'
  | 'admin'
  | 'architecture';

export const APP_VIEW_LABELS: Record<AppView, string> = {
  accueil: 'Accueil',
  'a-propos': 'À Propos de Nous',
  'eclairage-solaire': 'Éclairage Solaire',
  'eclairage-electrique': 'Éclairage Électrique & LED',
  'pompage-solaire': 'Pompes & Forages',
  'kits-solaires': 'Kits & Stockage',
  'composants-solaires': 'Panneaux, Batteries & Onduleurs',
  services: 'Nos Services & Ingénierie',
  realisations: 'Nos Réalisations',
  boutique: 'Boutique en Ligne',
  devis: 'Demande de Devis',
  actualites: 'Actualités & Conseils',
  contact: 'Contact & Agences',
  compte: 'Mon Compte Client',
  panier: 'Panier & Commande',
  cgv: 'Conditions Générales de Vente',
  confidentialite: 'Politique de Confidentialité',
  livraison: 'Politique de Livraison',
  admin: "Espace d'Administration",
  architecture: 'Architecture Technique v2.0'
};

interface AppContextType {
  activeTab: AppView;
  setActiveTab: (tab: AppView) => void;
  // Navigation & Page Back Arrow
  canGoBack: boolean;
  previousTab: AppView | null;
  previousTabTitle: string | null;
  goBack: () => void;
  selectedCountry: TargetCountry;
  setSelectedCountry: (country: TargetCountry) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountFCFA: number) => string;

  // Products
  products: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotalFCFA: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'numeroCommande' | 'dateCreation' | 'statutCommande' | 'statutPaiement'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Quotes
  quotes: QuoteRequest[];
  createQuote: (quote: Omit<QuoteRequest, 'id' | 'numeroDevis' | 'dateCreation' | 'statut'>) => QuoteRequest;
  updateQuoteStatus: (quoteId: string, status: QuoteStatus, responseNotes?: string) => void;

  // Comparison
  comparisonList: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;

  // Technical Modal
  specModalProduct: Product | null;
  setSpecModalProduct: (p: Product | null) => void;

  // Projects & News
  projects: ProjectReference[];
  news: NewsArticle[];
  addProject: (proj: ProjectReference) => void;
  addNews: (art: NewsArticle) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminUser: { name: string; email: string; role: string } | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Client Authentication & Isolation (Boutique en ligne)
  clients: ClientAccount[];
  currentClient: ClientAccount | null;
  isClientAuthenticated: boolean;
  loginClient: (email: string, pass: string, rememberMe?: boolean) => boolean;
  registerClient: (data: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    ville: string;
    pays?: TargetCountry;
    adresse?: string;
    typeClient?: 'particulier' | 'entreprise' | 'collectivite';
    raisonSociale?: string;
    motDePasse: string;
    rememberMe?: boolean;
  }) => ClientAccount;
  logoutClient: () => void;
  switchClient: (clientId: string) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register';

  // Client-isolated orders (Client A only sees Client A's orders)
  clientOrders: Order[];

  // SunLumin Official Technical Catalog Modal (Public for Clients & Admin)
  isSunLuminModalOpen: boolean;
  openSunLuminModal: () => void;
  closeSunLuminModal: () => void;

  // Developer-Only Access to Architecture Dossier v2.0, Database & API Links
  isDevAuthenticated: boolean;
  loginDev: (identifier: string, pass: string) => boolean;
  logoutDev: () => void;
  changeDevPassword: (newPass: string) => boolean;

  // Discussion & Chat Direct Client <-> Administration
  discussions: ClientDiscussion[];
  clientDiscussions: ClientDiscussion[];
  activeDiscussionProduct: Product | null;
  isDiscussionChoiceOpen: boolean;
  isDiscussionModalOpen: boolean;
  isDiscussionPending: boolean;
  openDiscussionModal: (product?: Product) => void;
  closeDiscussionChoice: () => void;
  openOnlineChatModal: (product?: Product) => void;
  closeDiscussionModal: () => void;
  openWhatsAppChat: (product?: Product, customMsg?: string) => void;
  sendMessageAsClient: (
    clientId: string,
    texte: string,
    produit?: Product,
    pageSource?: string,
    discussionId?: string
  ) => void;
  sendMessageAsAdmin: (discussionId: string, texte: string) => void;
  markDiscussionAsReadByAdmin: (discussionId: string) => void;
  markDiscussionAsReadByClient: (discussionId: string) => void;

  // Social & Quick Connect (Google, Facebook, Email)
  loginWithGoogle: (customEmail?: string, customName?: string, rememberMe?: boolean) => void;
  loginWithFacebook: (customEmail?: string, customName?: string, rememberMe?: boolean) => void;
  loginWithEmailQuick: (email: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<AppView>('accueil');
  const [navigationHistory, setNavigationHistory] = useState<AppView[]>(() => {
    try {
      const saved = sessionStorage.getItem('deb_nav_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return ['accueil'];
  });

  const [selectedCountry, setSelectedCountry] = useState<TargetCountry>('Sénégal');
  const [currency, setCurrency] = useState<Currency>('XOF');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [specModalProduct, setSpecModalProduct] = useState<Product | null>(null);
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  // Smooth scroll to top on tab change and register in history
  const setActiveTab = (tab: AppView) => {
    setActiveTabState((current) => {
      if (current !== tab) {
        setNavigationHistory((prev) => {
          const updated = [...prev, tab];
          try {
            sessionStorage.setItem('deb_nav_history', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
      return tab;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setNavigationHistory((prev) => {
      if (prev.length > 1) {
        const updated = [...prev];
        updated.pop(); // remove current active page
        const prevTab = updated[updated.length - 1];
        setActiveTabState(prevTab);
        try {
          sessionStorage.setItem('deb_nav_history', JSON.stringify(updated));
        } catch {}
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return updated;
      } else {
        // Already at root or single page
        if (activeTab !== 'accueil') {
          setActiveTabState('accueil');
        } else {
          setToastMessage("Vous êtes sur la page d'accueil.");
          setTimeout(() => setToastMessage(null), 3000);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return ['accueil'];
      }
    });
  };

  const previousTab: AppView | null =
    navigationHistory.length > 1
      ? navigationHistory[navigationHistory.length - 2]
      : activeTab !== 'accueil'
      ? 'accueil'
      : null;

  const previousTabTitle: string | null = previousTab ? APP_VIEW_LABELS[previousTab] || previousTab : null;
  const canGoBack = navigationHistory.length > 1 || activeTab !== 'accueil';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 0. Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('deb_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    try {
      const saved = sessionStorage.getItem('deb_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginAdmin = (emailInput: string, passInput: string): boolean => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput.trim();

    // Accepted admin credentials
    const isValid =
      (cleanEmail === 'admin@diarraenergie.com' || cleanEmail === 'directeur@diarraenergie.com' || cleanEmail === 'admin') &&
      (cleanPass === 'Admin@Diarra2026!' || cleanPass === 'Diarra2026!' || cleanPass === 'admin123');

    if (isValid) {
      const user = {
        name: cleanEmail.includes('directeur') ? 'M. Diarra — Directeur Général' : 'Administrateur Principal',
        email: cleanEmail.includes('@') ? cleanEmail : 'admin@diarraenergie.com',
        role: 'Super Administrateur'
      };
      setIsAdminAuthenticated(true);
      setAdminUser(user);
      // Ensure strict role separation: clear any client session
      setCurrentClient(null);
      try {
        localStorage.removeItem('deb_current_client');
        sessionStorage.setItem('deb_admin_auth', 'true');
        sessionStorage.setItem('deb_admin_user', JSON.stringify(user));
      } catch (e) {
        console.warn('Session storage error', e);
      }
      showToast('Connexion réussie. Bienvenue dans l’Espace d’Administration.');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    try {
      sessionStorage.removeItem('deb_admin_auth');
      sessionStorage.removeItem('deb_admin_user');
    } catch (e) {
      console.warn('Session storage error', e);
    }
    showToast('Session administrateur fermée.');
  };

  // 0.1 Developer Authentication State (Architecture Dossier v2.0 Protection)
  const [isDevAuthenticated, setIsDevAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('deb_dev_auth') === 'true';
    } catch {
      return false;
    }
  });

  const loginDev = (identifierInput: string, passInput: string): boolean => {
    const cleanId = identifierInput.trim().toLowerCase();
    const cleanPass = passInput.trim();

    // Accepted Developer identifiers:
    // morsangare@gmail.com (developer account from user metadata), dev, developpeur, or dev@diarraenergie.com
    const isIdValid =
      cleanId === 'morsangare@gmail.com' ||
      cleanId === 'dev' ||
      cleanId === 'developpeur' ||
      cleanId === 'dev@diarraenergie.com' ||
      cleanId === 'morsan' ||
      cleanId === 'admin';

    let customPass = '';
    try {
      customPass = localStorage.getItem('deb_custom_dev_password') || '';
    } catch {
      // ignore
    }

    const isPassValid =
      cleanPass === 'Dev@Diarra2026!' ||
      cleanPass === 'dev2026' ||
      cleanPass === 'DiarraDev2026!' ||
      cleanPass === 'Morsan2026!' ||
      cleanPass === 'admin2026' ||
      cleanPass === 'diarra2026' ||
      (customPass && cleanPass === customPass);

    if (isIdValid && isPassValid) {
      setIsDevAuthenticated(true);
      try {
        sessionStorage.setItem('deb_dev_auth', 'true');
      } catch (e) {
        console.warn('Session storage error', e);
      }
      showToast('Accès Développeur validé. Bienvenue dans votre espace technique.');
      return true;
    }
    showToast('Identifiant ou code secret développeur invalide.');
    return false;
  };

  const logoutDev = () => {
    setIsDevAuthenticated(false);
    try {
      sessionStorage.removeItem('deb_dev_auth');
    } catch (e) {
      console.warn('Session storage error', e);
    }
    showToast('Session Développeur verrouillée.');
  };

  const changeDevPassword = (newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) {
      showToast('Le nouveau code doit comporter au moins 4 caractères.');
      return false;
    }
    try {
      localStorage.setItem('deb_custom_dev_password', newPass.trim());
      showToast('Nouveau code secret développeur enregistré.');
      return true;
    } catch {
      showToast('Erreur lors de la sauvegarde du mot de passe.');
      return false;
    }
  };

  // 0.2 SunLumin Official Technical Catalog Modal State (Accessible by Clients and Admin)
  const [isSunLuminModalOpen, setIsSunLuminModalOpen] = useState(false);
  const openSunLuminModal = () => setIsSunLuminModalOpen(true);
  const closeSunLuminModal = () => setIsSunLuminModalOpen(false);

  // 1. Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('deb_products');
      if (saved) {
        const parsed = JSON.parse(saved) as Product[];
        const customAdded = parsed.filter((p) => !p.id.startsWith('deb-'));
        const syncedInitial = INITIAL_PRODUCTS.map((ip) => {
          const savedItem = parsed.find((p) => p.id === ip.id);
          return savedItem ? { ...savedItem, ...ip } : ip;
        });
        return [...syncedInitial, ...customAdded];
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [products]);

  const addProduct = (p: Product) => {
    setProducts((prev) => [p, ...prev]);
    showToast(`Produit ${p.reference} ajouté au catalogue.`);
  };

  const updateProduct = (p: Product) => {
    setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)));
    showToast(`Produit ${p.reference} mis à jour.`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Produit retiré du catalogue.');
  };

  // 2. Client Authentication State (Boutique en ligne & isolation client)
  const [clients, setClients] = useState<ClientAccount[]>(() => {
    try {
      const saved = localStorage.getItem('deb_clients');
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_clients', JSON.stringify(clients));
    } catch (e) {
      console.warn('Clients storage error', e);
    }
  }, [clients]);

  const [currentClient, setCurrentClient] = useState<ClientAccount | null>(() => {
    try {
      const saved = localStorage.getItem('deb_current_client');
      if (saved) return JSON.parse(saved);
      const rememberedId = localStorage.getItem('deb_remember_client_id');
      if (rememberedId) {
        const savedClients = localStorage.getItem('deb_clients');
        const list: ClientAccount[] = savedClients ? JSON.parse(savedClients) : INITIAL_CLIENTS;
        const found = list.find((c) => c.id === rememberedId);
        if (found) return found;
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentClient && !isAdminAuthenticated) {
        localStorage.setItem('deb_current_client', JSON.stringify(currentClient));
      } else {
        localStorage.removeItem('deb_current_client');
      }
    } catch (e) {
      console.warn('Current client storage error', e);
    }
  }, [currentClient, isAdminAuthenticated]);

  // Ensure that if admin is authenticated, any client session is automatically cleared
  useEffect(() => {
    if (isAdminAuthenticated && currentClient) {
      setCurrentClient(null);
    }
  }, [isAdminAuthenticated, currentClient]);

  const isClientAuthenticated = !!currentClient;

  // Client Auth modal controls
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    if (isAdminAuthenticated) {
      showToast("Accès restreint : Vous êtes connecté en tant qu'Administrateur. Déconnectez-vous de l'espace admin pour accéder à un compte client.");
      return;
    }
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginClient = (emailInput: string, passInput: string, rememberMe: boolean = true): boolean => {
    if (isAdminAuthenticated) {
      showToast("Accès refusé : session Administrateur active. Veuillez vous déconnecter de l'espace admin.");
      return false;
    }
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput ? passInput.trim() : '';

    if (!cleanEmail) {
      showToast("Veuillez renseigner votre adresse email.");
      return false;
    }
    if (!cleanPass) {
      showToast("Le mot de passe est obligatoire pour accéder à votre espace client.");
      return false;
    }

    const found = clients.find((c) => c.email.toLowerCase() === cleanEmail);
    if (!found) {
      showToast(`Aucun compte client trouvé avec l’adresse : ${emailInput}. Veuillez créer un compte.`);
      return false;
    }

    // Strict password verification
    if (found.motDePasse && found.motDePasse !== cleanPass) {
      showToast("Mot de passe incorrect pour ce compte client.");
      return false;
    }

    setCurrentClient(found);
    // Load this client's specific cart
    try {
      if (rememberMe) {
        localStorage.setItem('deb_remember_client_id', found.id);
        localStorage.setItem('deb_saved_client_email', found.email);
      } else {
        localStorage.removeItem('deb_remember_client_id');
      }
      const clientCartKey = `deb_cart_${found.id}`;
      const savedCart = localStorage.getItem(clientCartKey);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } catch {
      setCart([]);
    }
    showToast(`Bienvenue, ${found.prenom} ${found.nom} ! Connexion réussie.`);
    setIsAuthModalOpen(false);
    if (activeDiscussionProduct || isDiscussionPending) {
      setIsDiscussionModalOpen(true);
      setIsDiscussionPending(false);
    }
    return true;
  };

  const registerClient = (data: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    ville: string;
    pays?: TargetCountry;
    adresse?: string;
    typeClient?: 'particulier' | 'entreprise' | 'collectivite';
    raisonSociale?: string;
    motDePasse: string;
    rememberMe?: boolean;
  }): ClientAccount => {
    if (isAdminAuthenticated) {
      showToast("Création impossible : Vous êtes connecté en tant qu'Administrateur. Déconnectez-vous d'abord de l'admin.");
      throw new Error("Admin cannot create client account while admin session is active");
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPass = data.motDePasse ? data.motDePasse.trim() : '';

    if (!cleanPass || cleanPass.length < 4) {
      showToast("Le mot de passe est obligatoire (minimum 4 caractères).");
      throw new Error("Password is mandatory");
    }

    const existing = clients.find((c) => c.email.toLowerCase() === cleanEmail);
    if (existing) {
      showToast(`Un compte client existe déjà avec cet email (${cleanEmail}). Connectez-vous avec votre mot de passe.`);
      throw new Error("Email already registered");
    }

    const newClient: ClientAccount = {
      id: `cli-${Date.now()}`,
      nom: data.nom.trim(),
      prenom: data.prenom.trim(),
      nomComplet: `${data.prenom.trim()} ${data.nom.trim()}`,
      email: cleanEmail,
      telephone: data.telephone.trim(),
      ville: data.ville.trim(),
      pays: data.pays || selectedCountry || 'Sénégal',
      adresse: data.adresse?.trim() || '',
      typeClient: data.typeClient || 'particulier',
      raisonSociale: data.raisonSociale?.trim() || undefined,
      dateInscription: new Date().toISOString().replace('T', ' ').slice(0, 10),
      motDePasse: cleanPass
    };

    setClients((prev) => [newClient, ...prev]);
    setCurrentClient(newClient);
    // Initialize empty personal cart for new client
    setCart([]);
    try {
      if (data.rememberMe !== false) {
        localStorage.setItem('deb_remember_client_id', newClient.id);
        localStorage.setItem('deb_saved_client_email', newClient.email);
      }
      localStorage.setItem(`deb_cart_${newClient.id}`, JSON.stringify([]));
    } catch (e) {
      console.warn('Cart error', e);
    }
    showToast(`Compte client créé avec succès pour ${newClient.prenom} ${newClient.nom} (${newClient.ville}) !`);
    setIsAuthModalOpen(false);
    if (activeDiscussionProduct || isDiscussionPending) {
      setIsDiscussionModalOpen(true);
      setIsDiscussionPending(false);
    }
    return newClient;
  };

  // 2.5 Discussions / Live Chat entre Client et Administration
  const [discussions, setDiscussions] = useState<ClientDiscussion[]>(() => {
    try {
      const saved = localStorage.getItem('deb_discussions');
      if (saved) return JSON.parse(saved);
      return INITIAL_DISCUSSIONS;
    } catch {
      return INITIAL_DISCUSSIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_discussions', JSON.stringify(discussions));
    } catch (e) {
      console.warn('Discussions storage error', e);
    }
  }, [discussions]);

  const [activeDiscussionProduct, setActiveDiscussionProduct] = useState<Product | null>(null);
  const [isDiscussionChoiceOpen, setIsDiscussionChoiceOpen] = useState(false);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);
  const [isDiscussionPending, setIsDiscussionPending] = useState(false);

  const openWhatsAppChat = (product?: Product, customMsg?: string) => {
    const prodToUse = product || activeDiscussionProduct;
    const phoneNumbers: Record<string, string> = {
      'Sénégal': '221771149539',
      'Bénin': '22997000000',
      'Togo': '22890000000',
      'Sous-Région': '221771149539'
    };
    const phone = phoneNumbers[selectedCountry] || '221771149539';
    const prodText = prodToUse
      ? `l'équipement solaire "${prodToUse.nom}" (Réf: ${prodToUse.reference || prodToUse.id})`
      : 'vos solutions et équipements solaires';
    const defaultMsg = customMsg || `Bonjour DIARRA ENERGIE, je souhaite des renseignements et conseils à propos de ${prodText}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openDiscussionModal = (product?: Product) => {
    if (product) {
      setActiveDiscussionProduct(product);
    }
    // Propose the two discussion choices: WhatsApp or Online Chat!
    setIsDiscussionChoiceOpen(true);
  };

  const closeDiscussionChoice = () => {
    setIsDiscussionChoiceOpen(false);
  };

  const openOnlineChatModal = (product?: Product) => {
    const prod = product || activeDiscussionProduct;
    if (prod) {
      setActiveDiscussionProduct(prod);
    }
    setIsDiscussionChoiceOpen(false);

    if (isAdminAuthenticated) {
      showToast("Session Administrateur active : consultez l'onglet Discussions dans le panneau d'administration.");
      setActiveTab('admin');
      return;
    }

    if (!currentClient) {
      setIsDiscussionPending(true);
      openAuthModal('login');
      showToast("Connectez-vous ou créez un compte (Google, Facebook ou Email) pour discuter en ligne avec l'administration.");
      return;
    }

    setIsDiscussionModalOpen(true);
  };

  const closeDiscussionModal = () => {
    setIsDiscussionModalOpen(false);
    setIsDiscussionPending(false);
  };

  const sendMessageAsClient = (
    clientId: string,
    texte: string,
    produit?: Product,
    pageSource?: string,
    discussionId?: string
  ) => {
    if (!texte.trim() || !currentClient) return;

    const prodToAttach = produit || activeDiscussionProduct || undefined;
    const nowFormatted = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      senderName: currentClient.nomComplet,
      senderEmail: currentClient.email,
      texte: texte.trim(),
      date: nowFormatted,
      produitId: prodToAttach?.id,
      produitNom: prodToAttach?.nom
    };

    setDiscussions((prev) => {
      const idx = prev.findIndex(
        (d) =>
          (discussionId && d.id === discussionId) ||
          d.clientId === clientId ||
          (currentClient.email && d.clientEmail.toLowerCase() === currentClient.email.toLowerCase())
      );

      if (idx >= 0) {
        const existing = prev[idx];
        const updatedDisc: ClientDiscussion = {
          ...existing,
          dernierMessage: texte.trim(),
          dateDernierMessage: nowFormatted,
          nbNonLusAdmin: (existing.nbNonLusAdmin || 0) + 1,
          nbNonLusClient: 0,
          pageSource: pageSource || existing.pageSource || (`Page ${APP_VIEW_LABELS[activeTab] || activeTab}`),
          produitReference: prodToAttach
            ? {
                id: prodToAttach.id,
                nom: prodToAttach.nom,
                reference: prodToAttach.reference,
                prixFCFA: prodToAttach.prixFCFA,
                image: prodToAttach.imagePrincipale
              }
            : existing.produitReference,
          messages: [...existing.messages, newMsg]
        };
        const updated = [...prev];
        updated[idx] = updatedDisc;
        return updated;
      } else {
        const newDisc: ClientDiscussion = {
          id: discussionId || `disc-${Date.now()}`,
          clientId: currentClient.id,
          clientNom: currentClient.nomComplet,
          clientEmail: currentClient.email,
          clientTelephone: currentClient.telephone,
          pageSource: pageSource || (`Page ${APP_VIEW_LABELS[activeTab] || activeTab}`),
          produitReference: prodToAttach
            ? {
                id: prodToAttach.id,
                nom: prodToAttach.nom,
                reference: prodToAttach.reference,
                prixFCFA: prodToAttach.prixFCFA,
                image: prodToAttach.imagePrincipale
              }
            : undefined,
          dernierMessage: texte.trim(),
          dateDernierMessage: nowFormatted,
          nbNonLusAdmin: 1,
          nbNonLusClient: 0,
          messages: [newMsg]
        };
        return [newDisc, ...prev];
      }
    });

    showToast("Votre réponse a été transmise à l'équipe DIARRA ENERGIE.");
  };

  const sendMessageAsAdmin = (discussionId: string, texte: string) => {
    if (!texte.trim()) return;

    const nowFormatted = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'admin',
      senderName: 'Service Client DIARRA ENERGIE (Admin)',
      texte: texte.trim(),
      date: nowFormatted
    };

    setDiscussions((prev) =>
      prev.map((disc) => {
        if (disc.id === discussionId) {
          return {
            ...disc,
            dernierMessage: texte.trim(),
            dateDernierMessage: nowFormatted,
            nbNonLusClient: (disc.nbNonLusClient || 0) + 1,
            nbNonLusAdmin: 0,
            messages: [...disc.messages, newMsg]
          };
        }
        return disc;
      })
    );

    showToast('Réponse envoyée au client.');
  };

  const markDiscussionAsReadByAdmin = useCallback((discussionId: string) => {
    setDiscussions((prev) => {
      const target = prev.find((d) => d.id === discussionId);
      if (!target || target.nbNonLusAdmin === 0) return prev;
      return prev.map((disc) =>
        disc.id === discussionId
          ? { ...disc, nbNonLusAdmin: 0 }
          : disc
      );
    });
  }, []);

  const markDiscussionAsReadByClient = useCallback((discussionId: string) => {
    setDiscussions((prev) => {
      const target = prev.find((d) => d.id === discussionId);
      if (!target || target.nbNonLusClient === 0) return prev;
      return prev.map((disc) =>
        disc.id === discussionId
          ? { ...disc, nbNonLusClient: 0 }
          : disc
      );
    });
  }, []);

  // Discussions strictly filtered for the current client (memoized for reference stability)
  const clientDiscussions = useMemo(() => {
    return currentClient
      ? discussions.filter(
          (d) =>
            d.clientId === currentClient.id ||
            (currentClient.email && d.clientEmail?.toLowerCase() === currentClient.email.toLowerCase())
        )
      : [];
  }, [currentClient, discussions]);

  // Social & Quick Connect Methods (Google, Facebook, Email direct)
  const loginWithGoogle = (customEmail?: string, customName?: string, rememberMe: boolean = true) => {
    if (isAdminAuthenticated) {
      showToast("Session Administrateur active.");
      return;
    }

    const email = (customEmail || 'morsangare@gmail.com').trim().toLowerCase();
    const nomComplet = customName || (email.includes('morsangare') ? 'Mor Sangaré' : 'Amadou Diallo');
    const parts = nomComplet.split(' ');
    const prenom = parts[0] || 'Client';
    const nom = parts.slice(1).join(' ') || 'Google';

    const existing = clients.find((c) => c.email.toLowerCase() === email);
    let activeClient: ClientAccount;

    if (existing) {
      activeClient = existing;
      setCurrentClient(existing);
    } else {
      activeClient = {
        id: `cli-google-${Date.now()}`,
        nom,
        prenom,
        nomComplet: `${prenom} ${nom} (Google)`,
        email,
        telephone: '+221 77 114 95 39',
        ville: 'Dakar',
        pays: selectedCountry || 'Sénégal',
        typeClient: 'particulier',
        dateInscription: new Date().toISOString().slice(0, 10),
        motDePasse: 'google_oauth_pass'
      };
      setClients((prev) => [activeClient, ...prev]);
      setCurrentClient(activeClient);
    }

    if (rememberMe) {
      try {
        localStorage.setItem('deb_remember_client_id', activeClient.id);
        localStorage.setItem('deb_saved_client_email', activeClient.email);
      } catch {}
    }

    setIsAuthModalOpen(false);
    showToast(`Connexion réussie avec votre compte Google (${email}) !`);
    if (activeDiscussionProduct || isDiscussionPending) {
      setIsDiscussionModalOpen(true);
      setIsDiscussionPending(false);
    }
  };

  const loginWithFacebook = (customEmail?: string, customName?: string, rememberMe: boolean = true) => {
    if (isAdminAuthenticated) {
      showToast("Session Administrateur active.");
      return;
    }

    const email = (customEmail || 'mariama.sarr@facebook.com').trim().toLowerCase();
    const nomComplet = customName || 'Mariama Sarr';
    const parts = nomComplet.split(' ');
    const prenom = parts[0] || 'Client';
    const nom = parts.slice(1).join(' ') || 'Facebook';

    const existing = clients.find((c) => c.email.toLowerCase() === email);
    let activeClient: ClientAccount;

    if (existing) {
      activeClient = existing;
      setCurrentClient(existing);
    } else {
      activeClient = {
        id: `cli-fb-${Date.now()}`,
        nom,
        prenom,
        nomComplet: `${prenom} ${nom} (Facebook)`,
        email,
        telephone: '+221 78 440 60 80',
        ville: 'Dakar',
        pays: selectedCountry || 'Sénégal',
        typeClient: 'particulier',
        dateInscription: new Date().toISOString().slice(0, 10),
        motDePasse: 'facebook_oauth_pass'
      };
      setClients((prev) => [activeClient, ...prev]);
      setCurrentClient(activeClient);
    }

    if (rememberMe) {
      try {
        localStorage.setItem('deb_remember_client_id', activeClient.id);
        localStorage.setItem('deb_saved_client_email', activeClient.email);
      } catch {}
    }

    setIsAuthModalOpen(false);
    showToast(`Connexion réussie avec votre compte Facebook (${email}) !`);
    if (activeDiscussionProduct || isDiscussionPending) {
      setIsDiscussionModalOpen(true);
      setIsDiscussionPending(false);
    }
  };

  const loginWithEmailQuick = (emailInput: string): boolean => {
    if (isAdminAuthenticated) {
      showToast("Session Administrateur active.");
      return false;
    }
    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast('Veuillez saisir une adresse email valide.');
      return false;
    }
    const existing = clients.find((c) => c.email.toLowerCase() === cleanEmail);
    if (existing) {
      setCurrentClient(existing);
      showToast(`Bienvenue, ${existing.prenom} ${existing.nom} !`);
    } else {
      const prefix = cleanEmail.split('@')[0];
      const capitalized = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      const newClient: ClientAccount = {
        id: `cli-${Date.now()}`,
        nom: 'Client',
        prenom: capitalized,
        nomComplet: `${capitalized} (Email)`,
        email: cleanEmail,
        telephone: '+221 77 123 00 00',
        ville: 'Dakar',
        pays: selectedCountry || 'Sénégal',
        typeClient: 'particulier',
        dateInscription: new Date().toISOString().slice(0, 10),
        motDePasse: 'client123'
      };
      setClients((prev) => [newClient, ...prev]);
      setCurrentClient(newClient);
      showToast(`Compte créé pour ${cleanEmail}.`);
    }
    setIsAuthModalOpen(false);
    if (activeDiscussionProduct || isDiscussionPending) {
      setIsDiscussionModalOpen(true);
      setIsDiscussionPending(false);
    }
    return true;
  };

  const logoutClient = () => {
    const prevName = currentClient ? `${currentClient.prenom} ${currentClient.nom}` : '';
    setCurrentClient(null);
    try {
      localStorage.removeItem('deb_current_client');
      localStorage.removeItem('deb_remember_client_id');
      const guestCart = localStorage.getItem('deb_cart_guest');
      setCart(guestCart ? JSON.parse(guestCart) : []);
    } catch {
      setCart([]);
    }
    showToast(prevName ? `Déconnexion réussie (${prevName}).` : 'Session client fermée.');
  };

  const switchClient = (clientId: string) => {
    if (isAdminAuthenticated) {
      showToast("Accès restreint en session Administrateur.");
      return;
    }
    const target = clients.find((c) => c.id === clientId);
    if (target) {
      setCurrentClient(target);
      try {
        const savedCart = localStorage.getItem(`deb_cart_${target.id}`);
        setCart(savedCart ? JSON.parse(savedCart) : []);
      } catch {
        setCart([]);
      }
      showToast(`Compte basculé vers : ${target.prenom} ${target.nom} (${target.ville})`);
    }
  };

  // 3. Cart state - Strictly isolated per client ("chaque client a son propre panier")
  const activeCartClientIdRef = useRef<string>(currentClient ? currentClient.id : 'guest');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const activeClientId = currentClient ? currentClient.id : 'guest';
      const key = `deb_cart_${activeClientId}`;
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });

  // Load client-specific cart whenever the active client changes
  useEffect(() => {
    const nextClientId = currentClient ? currentClient.id : 'guest';
    if (activeCartClientIdRef.current !== nextClientId) {
      // 1. Persist previous client's cart state
      try {
        localStorage.setItem(`deb_cart_${activeCartClientIdRef.current}`, JSON.stringify(cart));
      } catch (e) {
        console.warn('Storage cart save before switch error', e);
      }

      // 2. Load the next client's cart
      try {
        const saved = localStorage.getItem(`deb_cart_${nextClientId}`);
        const parsed = saved ? JSON.parse(saved) : [];
        setCart(parsed);
      } catch {
        setCart([]);
      }

      // 3. Update the active client ID ref
      activeCartClientIdRef.current = nextClientId;
    }
  }, [currentClient]);

  // Persist cart changes strictly to the active client's isolated storage
  useEffect(() => {
    const activeClientId = currentClient ? currentClient.id : 'guest';
    if (activeCartClientIdRef.current === activeClientId) {
      try {
        localStorage.setItem(`deb_cart_${activeClientId}`, JSON.stringify(cart));
      } catch (e) {
        console.warn('Storage cart error', e);
      }
    }
  }, [cart, currentClient]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`« ${product.nom} » ajouté au panier (${quantity}x)`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Article retiré du panier');
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalFCFA = cart.reduce(
    (sum, item) => sum + item.product.prixFCFA * item.quantity,
    0
  );

  // 4. Orders state - Total orders in database (visible to Admin)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('deb_orders');
      if (saved) return JSON.parse(saved);
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage orders error', e);
    }
  }, [orders]);

  // Client-isolated orders: Client A ONLY sees Client A's orders, Client B ONLY sees Client B's orders!
  const clientOrders = useMemo(() => {
    return currentClient
      ? orders.filter(
          (o) =>
            o.clientId === currentClient.id ||
            (o.client.email && o.client.email.toLowerCase() === currentClient.email.toLowerCase())
        )
      : [];
  }, [currentClient, orders]);

  const createOrder = (orderData: Omit<Order, 'id' | 'numeroCommande' | 'dateCreation' | 'statutCommande' | 'statutPaiement'>): Order => {
    const timestamp = Date.now().toString().slice(-4);
    const clientId = currentClient?.id || orderData.clientId || 'cli-guest';
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      clientId,
      numeroCommande: `DEB-CMD-2026-${timestamp}`,
      dateCreation: new Date().toISOString().replace('T', ' ').slice(0, 16),
      statutCommande: 'confirmee',
      statutPaiement: orderData.moyenPaiement === 'wave' || orderData.moyenPaiement === 'orange_money' ? 'paye' : 'en_cours_de_validation'
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Commande ${newOrder.numeroCommande} enregistrée avec succès !`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, statutCommande: status } : ord))
    );
    showToast(`Statut de commande actualisé : ${status}`);
  };

  // 4. Quotes state
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem('deb_quotes');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'quote-init-1',
          numeroDevis: 'DEB-DEV-2026-0319',
          dateCreation: '2026-10-07 10:15',
          demandeur: {
            nomComplet: 'Mme Aïcha Bio',
            entreprise: 'Commune de Parakou — Direction Technique',
            typeEntite: 'collectivite',
            email: 'services.techniques@parakou.bj',
            telephone: '+229 97 45 88 12',
            whatsapp: '+229 97 45 88 12',
            paysProjet: 'Bénin',
            villeProjet: 'Parakou',
            lieuDit: 'Avenue de la Préfecture'
          },
          projet: {
            typeProjet: 'eclairage-solaire',
            intitule: 'Projet Éclairage Public Solaire Boulevard Central (60 mâts 8m)',
            datePrevisionnelle: 'Décembre 2026',
            quantiteEstimee: 60,
            descriptionBesoin: 'Installation de 60 lampadaires solaires monoblocs 100W avec candélabres octogonaux 8m et massifs de béton pour sécuriser le tronçon urbain.',
            eclairageData: {
              longueurVoieKm: 2.4,
              largeurVoieM: 12,
              hauteurMatSouhaiteeM: 8,
              typeVoirie: 'boulevard'
            }
          },
          estimationEstimeeFCFA: 26400000,
          statut: 'en_etude'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_quotes', JSON.stringify(quotes));
    } catch (e) {
      console.warn('Storage quotes error', e);
    }
  }, [quotes]);

  const createQuote = (quoteData: Omit<QuoteRequest, 'id' | 'numeroDevis' | 'dateCreation' | 'statut'>): QuoteRequest => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `dev-${Date.now()}`,
      numeroDevis: `DEB-DEV-2026-${randomSuffix}`,
      dateCreation: new Date().toISOString().replace('T', ' ').slice(0, 16),
      statut: 'recu'
    };
    setQuotes((prev) => [newQuote, ...prev]);
    showToast(`Demande de devis ${newQuote.numeroDevis} transmise à nos ingénieurs !`);
    return newQuote;
  };

  const updateQuoteStatus = (quoteId: string, status: QuoteStatus, responseNotes?: string) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              statut: status,
              reponseCommerciale: responseNotes || q.reponseCommerciale
            }
          : q
      )
    );
    showToast(`Statut du devis actualisé : ${status}`);
  };

  // 5. Comparison
  const toggleCompare = (product: Product) => {
    setComparisonList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Retiré du comparateur : ${product.nom}`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('Vous pouvez comparer jusqu’à 4 équipements simultanément');
        return prev;
      }
      showToast(`Ajouté au comparateur : ${product.nom}`);
      return [...prev, product];
    });
  };

  const clearCompare = () => setComparisonList([]);

  // 6. Projects & News
  const [projects, setProjects] = useState<ProjectReference[]>(() => {
    try {
      const saved = localStorage.getItem('deb_projects');
      if (saved) {
        const parsed = JSON.parse(saved) as ProjectReference[];
        const initialMap = new Map(INITIAL_PROJECTS.map((p) => [p.id, p]));
        parsed.forEach((p) => {
          if (!initialMap.has(p.id)) {
            initialMap.set(p.id, p);
          }
        });
        return Array.from(initialMap.values());
      }
      return INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('Storage projects error', e);
    }
  }, [projects]);

  const addProject = (p: ProjectReference) => {
    setProjects((prev) => [p, ...prev]);
    showToast('Référence projet publiée.');
  };

  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);

  const addNews = (n: NewsArticle) => {
    setNews((prev) => [n, ...prev]);
    showToast('Article conseil publié.');
  };

  // Currency Formatter
  const formatPrice = (amountFCFA: number): string => {
    if (currency === 'EUR') {
      const eur = amountFCFA / 655.957;
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(eur);
    }
    if (currency === 'USD') {
      const usd = amountFCFA / 605;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(usd);
    }
    // Default XOF / FCFA with clean space separator
    return new Intl.NumberFormat('fr-FR').format(amountFCFA) + ' FCFA';
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        canGoBack,
        previousTab,
        previousTabTitle,
        goBack,
        selectedCountry,
        setSelectedCountry,
        currency,
        setCurrency,
        formatPrice,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        cartCount,
        cartTotalFCFA,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        orders,
        createOrder,
        updateOrderStatus,
        quotes,
        createQuote,
        updateQuoteStatus,
        comparisonList,
        toggleCompare,
        clearCompare,
        specModalProduct,
        setSpecModalProduct,
        projects,
        news,
        addProject,
        addNews,
        toastMessage,
        showToast,
        isAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin,
        clients,
        currentClient,
        isClientAuthenticated,
        loginClient,
        registerClient,
        logoutClient,
        switchClient,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        clientOrders,
        isSunLuminModalOpen,
        openSunLuminModal,
        closeSunLuminModal,
        isDevAuthenticated,
        loginDev,
        logoutDev,
        changeDevPassword,
        discussions,
        clientDiscussions,
        activeDiscussionProduct,
        isDiscussionChoiceOpen,
        isDiscussionModalOpen,
        isDiscussionPending,
        openDiscussionModal,
        closeDiscussionChoice,
        openOnlineChatModal,
        closeDiscussionModal,
        openWhatsAppChat,
        sendMessageAsClient,
        sendMessageAsAdmin,
        markDiscussionAsReadByAdmin,
        markDiscussionAsReadByClient,
        loginWithGoogle,
        loginWithFacebook,
        loginWithEmailQuick
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
