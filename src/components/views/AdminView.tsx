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
  Mail
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
    setSpecModalProduct
  } = useApp();

  if (!isAdminAuthenticated) {
    return <AdminLoginView />;
  }

  const [adminTab, setAdminTab] = useState<'dashboard' | 'produits' | 'commandes' | 'devis' | 'discussions' | 'database'>('dashboard');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<string | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [discussionFilter, setDiscussionFilter] = useState<'all' | 'unread'>('all');

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

  // Form fields for product
  const [prodRef, setProdRef] = useState('');
  const [prodNom, setProdNom] = useState('');
  const [prodCat, setProdCat] = useState<ProductCategory>('eclairage-solaire');
  const [prodSousCat, setProdSousCat] = useState('Lampadaires intégrés');
  const [prodPrix, setProdPrix] = useState(150000);
  const [prodStock, setProdStock] = useState(25);
  const [prodEstSurDevis, setProdEstSurDevis] = useState(false);
  const [prodDesc, setProdDesc] = useState('');
  const [prodGarantie, setProdGarantie] = useState('3 ans');

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
        prixFCFA: prodPrix,
        stockDisponible: prodStock,
        estSurDevis: prodEstSurDevis,
        descriptionDetaillee: prodDesc,
        specs: {
          ...editingProduct.specs,
          garantie: prodGarantie
        }
      });
      setEditingProduct(null);
    } else {
      const newP: Product = {
        id: `deb-prod-${Date.now()}`,
        reference: prodRef || `DEB-REF-${Math.floor(Math.random() * 900)}`,
        nom: prodNom,
        categorie: prodCat,
        sousCategorie: prodSousCat,
        descriptionCourte: prodDesc.slice(0, 120),
        descriptionDetaillee: prodDesc,
        prixFCFA: prodPrix,
        estSurDevis: prodEstSurDevis,
        stockDisponible: prodStock,
        delaiLivraisonJours: 3,
        imagePrincipale: './images/product_lampadaire_solaire_1791734634193.jpg',
        specs: {
          garantie: prodGarantie
        },
        paysDisponibilite: ['Sénégal', 'Bénin', 'Togo']
      };
      addProduct(newP);
      setIsAddingProduct(false);
    }
    // reset
    setProdNom('');
    setProdRef('');
    setProdDesc('');
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProdRef(p.reference);
    setProdNom(p.nom);
    setProdCat(p.categorie);
    setProdSousCat(p.sousCategorie);
    setProdPrix(p.prixFCFA);
    setProdStock(p.stockDisponible);
    setProdEstSurDevis(p.estSurDevis);
    setProdDesc(p.descriptionDetaillee);
    setProdGarantie(p.specs.garantie);
  };

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
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {products.length} équipements dans la base de données
            </span>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsAddingProduct(true);
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un équipement</span>
            </button>
          </div>

          {/* Modal / Form for adding/editing product */}
          {(isAddingProduct || editingProduct) && (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-300 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">
                {editingProduct ? `Modifier l'équipement ${editingProduct.reference}` : 'Ajouter un Nouvel Équipement Solaire'}
              </h3>
              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Référence *</label>
                  <input
                    type="text"
                    required
                    value={prodRef}
                    onChange={(e) => setProdRef(e.target.value)}
                    placeholder="Ex: DEB-SL-200"
                    className="w-full p-2 bg-white border border-slate-300 rounded font-mono"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-700 mb-1 font-medium">Nom commercial *</label>
                  <input
                    type="text"
                    required
                    value={prodNom}
                    onChange={(e) => setProdNom(e.target.value)}
                    placeholder="Ex: Lampadaire Solaire 200W Autonome"
                    className="w-full p-2 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Catégorie *</label>
                  <select
                    value={prodCat}
                    onChange={(e) => setProdCat(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-300 rounded"
                  >
                    <option value="eclairage-solaire">Éclairage public solaire</option>
                    <option value="eclairage-electrique">Éclairage public électrique</option>
                    <option value="pompage-solaire">Pompes solaires & Forages</option>
                    <option value="kits-solaires">Kits solaires & Stockage</option>
                    <option value="composants-solaires">Panneaux, batteries, onduleurs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Sous-catégorie</label>
                  <input
                    type="text"
                    value={prodSousCat}
                    onChange={(e) => setProdSousCat(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Prix unitaire (FCFA) *</label>
                  <input
                    type="number"
                    value={prodPrix}
                    onChange={(e) => setProdPrix(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Stock disponible *</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Garantie</label>
                  <input
                    type="text"
                    value={prodGarantie}
                    onChange={(e) => setProdGarantie(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodEstSurDevis}
                      onChange={(e) => setProdEstSurDevis(e.target.checked)}
                      className="rounded text-amber-500"
                    />
                    <span>Vente sur devis uniquement</span>
                  </label>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-slate-700 mb-1 font-medium">Description commerciale</label>
                  <textarea
                    rows={2}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 text-white rounded font-medium hover:bg-slate-800"
                  >
                    Enregistrer l'équipement
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product Inventory Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="p-3">Référence</th>
                  <th className="p-3">Désignation</th>
                  <th className="p-3">Catégorie</th>
                  <th className="p-3">Prix FCFA</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{p.reference}</td>
                    <td className="p-3 font-medium text-slate-800 max-w-xs truncate">{p.nom}</td>
                    <td className="p-3 text-slate-500">{p.sousCategorie}</td>
                    <td className="p-3 font-mono font-medium">{p.estSurDevis ? 'Sur devis' : formatPrice(p.prixFCFA)}</td>
                    <td className="p-3 font-mono">
                      <span className={p.stockDisponible < 10 ? 'text-rose-600 font-bold' : 'text-slate-800'}>
                        {p.stockDisponible} u.
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-[11px] text-slate-600">
                        {p.estSurDevis ? 'Devis technique' : 'Achat direct'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="text-slate-600 hover:text-slate-900"
                        title="Modifier"
                      >
                        <Edit className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Confirmer la suppression de ${p.reference} ?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Client : <strong>{order.client.nomComplet}</strong> ({order.client.telephone}) · {order.client.adresseLivraison}, {order.client.ville} ({order.client.pays})
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Paiement : <strong>{order.moyenPaiement.toUpperCase()}</strong> ({order.statutPaiement})
                    </p>
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
