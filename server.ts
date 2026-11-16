import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PERSIST_PATH = path.join('/tmp', 'diarra_energie_db.json');

async function startServer() {
  const app = express();
  // Dev server must always bind to port 3000 in AI Studio environment
  // (process.env.PORT is often set to 8080 which is reserved by nginx)
  const portArgIndex = process.argv.indexOf('--port');
  const cliPort = portArgIndex !== -1 && process.argv[portArgIndex + 1] ? parseInt(process.argv[portArgIndex + 1]) : null;
  const PORT = cliPort || 3000;

  app.use(express.json({ limit: '15mb' }));

  // Initial Database Records
  const initialDatabaseData = {
    metadata: {
      nomEntreprise: "DIARRA ENERGIE & BUSINESS",
      description: "Base de données commerciale et technique pour solutions solaires, pompage et éclairage public en Afrique de l'Ouest",
      zones: ["Sénégal"],
      version: "2.1.0",
      derniereMiseAJour: new Date().toISOString(),
      format: "PostgreSQL Compatible JSON / Relational DDL"
    },
    tables: {
      products: [
        {
          id: "deb-eps-01",
          reference: "DEB-SL-100-PRO",
          nom: "Lampadaire Solaire Intégré All-In-One 100W Lumileds",
          categorie: "eclairage-solaire",
          sousCategorie: "Lampadaires intégrés",
          prixFCFA: 195000,
          estSurDevis: false,
          stockDisponible: 64,
          specs: {
            puissance: "100W LED",
            fluxLumineux: "16 500 Lumens",
            panneauSolaire: "Monocristallin 120Wc",
            batterieType: "LiFePO4 12.8V 54Ah",
            autonomie: "36 à 48 heures",
            hauteurMat: "6 à 8 mètres",
            indiceProtection: "IP66 / IK09",
            garantie: "3 ans"
          }
        },
        {
          id: "deb-eps-02",
          reference: "DEB-SL-150-SPLIT",
          nom: "Lampadaire Solaire Split 150W Haute Puissance Autoroute",
          categorie: "eclairage-solaire",
          sousCategorie: "Lampadaires à panneau séparé",
          prixFCFA: 320000,
          estSurDevis: true,
          stockDisponible: 30,
          specs: {
            puissance: "150W LED Bridgelux",
            fluxLumineux: "24 000 Lumens",
            panneauSolaire: "Bi-verre 200Wc",
            batterieType: "LiFePO4 25.6V 60Ah",
            autonomie: "4 nuits garanties",
            hauteurMat: "8 à 10 mètres",
            indiceProtection: "IP67 / IK10",
            garantie: "5 ans"
          }
        },
        {
          id: "deb-ps-01",
          reference: "DEB-PUMP-SUB-2HP",
          nom: "Système de Pompage Solaire Immergé 2.2kW (3HP) Débit Forage 18m³/h",
          categorie: "pompage-solaire",
          sousCategorie: "Pompes solaires immergées",
          prixFCFA: 890000,
          estSurDevis: false,
          stockDisponible: 18,
          specs: {
            puissance: "2.2 kW / 3.0 HP",
            debitMax: "18 m³/h",
            hmtMax: "115 mètres",
            profondeurImmersion: "40m à 100m",
            garantie: "2 ans"
          }
        },
        {
          id: "deb-kit-01",
          reference: "DEB-KIT-VILLA-5KW",
          nom: "Kit Solaire Hybride Villa & PME 5kVA / 10kWh LiFePO4",
          categorie: "kits-solaires",
          sousCategorie: "Systèmes pour maisons et villas",
          prixFCFA: 3650000,
          estSurDevis: false,
          stockDisponible: 12,
          specs: {
            puissance: "5 000 VA / 5 000 W Pur Sinus",
            batterieCapacite: "51.2V / 200Ah (10.24 kWh LiFePO4)",
            panneauSolaire: "10x 550Wc (5.5 kWc)",
            garantie: "5 ans batterie / 25 ans panneaux"
          }
        },
        {
          id: "deb-comp-01",
          reference: "DEB-PV-550-MONO",
          nom: "Panneau Solaire Monocristallin 550Wc Half-Cell Tier-1",
          categorie: "composants-solaires",
          sousCategorie: "Panneaux photovoltaïques",
          prixFCFA: 65000,
          estSurDevis: false,
          stockDisponible: 450,
          specs: {
            puissance: "550 Wc",
            rendement: "21.8%",
            garantie: "12 ans produit / 25 ans performance"
          }
        }
      ] as any[],
      orders: [
        {
          id: "ord-init-1",
          numeroCommande: "DEB-CMD-2026-0842",
          dateCreation: "2026-10-09 14:22",
          client: {
            nomComplet: "Ousmane Fall",
            raisonSociale: "Fall Agro BTP",
            email: "o.fall@fallagro.sn",
            telephone: "+221 77 123 45 67",
            pays: "Sénégal",
            ville: "Thiès"
          },
          totalFCFA: 905000,
          methodeLivraison: "transporteur_interurbain",
          moyenPaiement: "wave",
          statutCommande: "en_preparation",
          statutPaiement: "paye"
        }
      ] as any[],
      quotes: [
        {
          id: "quote-init-1",
          numeroDevis: "DEB-DEV-2026-0319",
          dateCreation: "2026-10-07 10:15",
          demandeur: {
            nomComplet: "Mme Aïcha Bio",
            entreprise: "Commune de Parakou — Direction Technique",
            email: "services.techniques@parakou.bj",
            telephone: "+229 97 45 88 12",
            paysProjet: "Bénin",
            villeProjet: "Parakou"
          },
          projet: {
            typeProjet: "eclairage-solaire",
            intitule: "Projet Éclairage Public Solaire Boulevard Central (60 mâts 8m)",
            quantiteEstimee: 60,
            descriptionBesoin: "Installation de 60 lampadaires solaires monoblocs 100W avec candélabres octogonaux 8m."
          },
          estimationEstimeeFCFA: 26400000,
          statut: "en_etude"
        }
      ] as any[],
      clients: [] as any[],
      paymentAlerts: [] as any[],
      paytechTransactions: [] as any[],
      deliveryZones: [
        { pays: "Sénégal", capital: "Dakar", fraisBaseFCFA: 5000, delaiMoyen: "24h à 72h" }
      ]
    }
  };

  let databaseData = initialDatabaseData;
  try {
    if (fs.existsSync(DB_PERSIST_PATH)) {
      const savedRaw = fs.readFileSync(DB_PERSIST_PATH, 'utf8');
      const parsed = JSON.parse(savedRaw);
      if (parsed && parsed.tables) {
        databaseData = {
          ...initialDatabaseData,
          ...parsed,
          tables: {
            ...initialDatabaseData.tables,
            ...parsed.tables
          }
        };
      }
    }
  } catch (err) {
    console.warn('Database reload fallback to initial seed:', err);
  }

  const persistDbToDisk = () => {
    try {
      fs.writeFileSync(DB_PERSIST_PATH, JSON.stringify(databaseData, null, 2), 'utf8');
    } catch (err) {
      console.warn('Database disk write warning:', err);
    }
  };

  // 0. Health Check Endpoint
  app.get('/api/health', (_req, res) => {
    const hasPaytechKeys = Boolean(
      process.env.PAYTECH_API_KEY &&
      process.env.PAYTECH_API_SECRET &&
      !process.env.PAYTECH_API_KEY.startsWith('MY_')
    );
    res.json({
      status: 'ok',
      service: 'DIARRA ENERGIE & BUSINESS API',
      paytechMode: hasPaytechKeys ? (process.env.PAYTECH_ENV || 'live') : 'sandbox',
      timestamp: new Date().toISOString(),
      tables: {
        products: databaseData.tables.products.length,
        orders: databaseData.tables.orders.length,
        quotes: databaseData.tables.quotes.length,
        clients: databaseData.tables.clients?.length || 0,
        paymentAlerts: databaseData.tables.paymentAlerts?.length || 0,
        paytechTransactions: databaseData.tables.paytechTransactions?.length || 0
      }
    });
  });

  // 0b. PayTech Payment Gateway API Integration (https://paytech.sn)
  app.post('/api/paytech/request-payment', async (req, res) => {
    try {
      const {
        item_name,
        item_price,
        currency = 'XOF',
        ref_command,
        command_name,
        channel = 'Wave / Orange Money / Carte',
        client,
        baseUrl
      } = req.body || {};

      const amount = Math.round(Number(item_price));
      if (!item_name || !Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ ok: false, error: 'Montant ou désignation invalide pour PayTech.' });
      }

      const refCommand = ref_command || `DEB-PT-${Date.now()}`;
      const appBaseUrl = (process.env.APP_URL && !process.env.APP_URL.startsWith('MY_'))
        ? process.env.APP_URL.replace(/\/$/, '')
        : (typeof baseUrl === 'string' && baseUrl.startsWith('http') ? baseUrl.replace(/\/$/, '') : `http://localhost:${PORT}`);

      const apiKey = process.env.PAYTECH_API_KEY;
      const apiSecret = process.env.PAYTECH_API_SECRET;
      const hasLiveKeys = Boolean(
        apiKey &&
        apiSecret &&
        !apiKey.startsWith('MY_') &&
        !apiSecret.startsWith('MY_')
      );

      if (!Array.isArray(databaseData.tables.paytechTransactions)) {
        databaseData.tables.paytechTransactions = [];
      }

      if (hasLiveKeys) {
        const paytechPayload = {
          item_name: String(item_name).slice(0, 120),
          item_price: amount,
          currency,
          ref_command: refCommand,
          command_name: String(command_name || item_name).slice(0, 180),
          env: process.env.PAYTECH_ENV || 'test',
          ipn_url: `${appBaseUrl}/api/paytech/ipn`,
          success_url: `${appBaseUrl}/?paytech_status=success&ref=${encodeURIComponent(refCommand)}`,
          cancel_url: `${appBaseUrl}/?paytech_status=cancel&ref=${encodeURIComponent(refCommand)}`,
          custom_field: JSON.stringify({ client, channel })
        };

        const ptResponse = await fetch('https://paytech.sn/api/payment/request-payment', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            API_KEY: apiKey!,
            API_SECRET: apiSecret!
          },
          body: JSON.stringify(paytechPayload)
        });

        const ptData = await ptResponse.json() as any;
        if (!ptResponse.ok || (ptData.success !== 1 && ptData.success !== true)) {
          return res.status(502).json({
            ok: false,
            error: ptData.message || ptData.error || 'Erreur de réponse de la passerelle PayTech.'
          });
        }

        const txRecord = {
          ref_command: refCommand,
          token: ptData.token,
          redirect_url: ptData.redirect_url,
          mode: 'live',
          env: process.env.PAYTECH_ENV || 'test',
          amount,
          currency,
          channel,
          client: client || {},
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        databaseData.tables.paytechTransactions.unshift(txRecord);
        persistDbToDisk();

        return res.json({
          ok: true,
          success: 1,
          mode: 'live',
          token: ptData.token,
          redirect_url: ptData.redirect_url,
          ref_command: refCommand,
          amount,
          currency
        });
      }

      // Integrated Server-Side Sandbox Session when live merchant keys are not configured
      const sandboxToken = `pt_sbx_${crypto.randomBytes(8).toString('hex')}`;
      const sandboxRecord = {
        ref_command: refCommand,
        token: sandboxToken,
        redirect_url: null,
        mode: 'sandbox',
        env: 'test',
        amount,
        currency,
        channel,
        client: client || {},
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      databaseData.tables.paytechTransactions.unshift(sandboxRecord);
      persistDbToDisk();

      return res.json({
        ok: true,
        success: 1,
        mode: 'sandbox',
        token: sandboxToken,
        redirect_url: null,
        ref_command: refCommand,
        amount,
        currency
      });
    } catch (err: any) {
      console.error('PayTech request-payment error:', err);
      return res.status(500).json({ ok: false, error: err?.message || 'Erreur interne PayTech.' });
    }
  });

  app.post('/api/paytech/confirm', (req, res) => {
    try {
      const { ref_command, token, channel, payer_phone, card_last4 } = req.body || {};
      if (!ref_command || !token) {
        return res.status(400).json({ ok: false, error: 'Référence ou jeton PayTech manquant.' });
      }

      const txs = databaseData.tables.paytechTransactions || [];
      const tx = txs.find((t: any) => t.ref_command === ref_command && t.token === token);
      if (!tx) {
        return res.status(404).json({ ok: false, error: 'Session PayTech introuvable ou expirée.' });
      }

      const transactionId = `PT-SN-${Date.now().toString().slice(-8)}`;
      tx.status = 'completed';
      tx.payment_method = channel || tx.channel || 'PayTech Mobile Money';
      if (payer_phone) tx.payer_phone = String(payer_phone).trim();
      if (card_last4) tx.card_last4 = String(card_last4).trim();
      tx.transaction_id = transactionId;
      tx.paid_at = new Date().toISOString();

      databaseData.metadata.derniereMiseAJour = tx.paid_at;
      persistDbToDisk();

      return res.json({
        ok: true,
        status: 'completed',
        ref_command: tx.ref_command,
        transaction_id: transactionId,
        payment_method: tx.payment_method,
        payer_phone: tx.payer_phone || tx.client?.telephone || '+221 77 114 95 39',
        paid_at: tx.paid_at
      });
    } catch (err: any) {
      return res.status(500).json({ ok: false, error: err?.message || 'Erreur confirmation PayTech.' });
    }
  });

  app.post('/api/paytech/ipn', (req, res) => {
    try {
      const {
        type_event,
        ref_command,
        payment_method,
        api_key_sha256,
        api_secret_sha256,
        token
      } = req.body || {};

      const apiKey = process.env.PAYTECH_API_KEY;
      const apiSecret = process.env.PAYTECH_API_SECRET;
      if (apiKey && apiSecret && !apiKey.startsWith('MY_')) {
        const expectedKeyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
        const expectedSecretHash = crypto.createHash('sha256').update(apiSecret).digest('hex');
        if (api_key_sha256 !== expectedKeyHash || api_secret_sha256 !== expectedSecretHash) {
          return res.status(403).json({ ok: false, error: 'Signature IPN PayTech invalide.' });
        }
      }

      const txs = databaseData.tables.paytechTransactions || [];
      const tx = txs.find((t: any) => t.ref_command === ref_command || (token && t.token === token));
      if (tx) {
        if (type_event === 'sale_complete') {
          tx.status = 'completed';
          tx.payment_method = payment_method || tx.channel || 'PayTech';
          tx.transaction_id = tx.transaction_id || `PT-IPN-${Date.now().toString().slice(-8)}`;
          tx.paid_at = new Date().toISOString();
        } else if (type_event === 'sale_canceled') {
          tx.status = 'canceled';
        }
        persistDbToDisk();
      }

      return res.json({ ok: true, received: true });
    } catch (err: any) {
      return res.status(500).json({ ok: false, error: err?.message || 'Erreur IPN PayTech.' });
    }
  });

  app.get('/api/paytech/status/:ref', (req, res) => {
    const ref = req.params.ref;
    const txs = databaseData.tables.paytechTransactions || [];
    const tx = txs.find((t: any) => t.ref_command === ref);
    if (!tx) {
      return res.status(404).json({ ok: false, found: false, error: 'Transaction PayTech introuvable.' });
    }
    return res.json({ ok: true, found: true, transaction: tx });
  });

  // 1. JSON Database Endpoint
  app.get('/api/database', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(databaseData);
  });

  // 1b. Live Sync Endpoint from Frontend State -> Backend Store
  app.post('/api/database/sync', (req, res) => {
    try {
      const body = req.body || {};
      if (Array.isArray(body.products)) databaseData.tables.products = body.products;
      if (Array.isArray(body.orders)) databaseData.tables.orders = body.orders;
      if (Array.isArray(body.quotes)) databaseData.tables.quotes = body.quotes;
      if (Array.isArray(body.clients)) databaseData.tables.clients = body.clients;
      if (Array.isArray(body.paymentAlerts)) databaseData.tables.paymentAlerts = body.paymentAlerts;
      databaseData.metadata.derniereMiseAJour = new Date().toISOString();
      persistDbToDisk();
      res.json({ ok: true, updatedAt: databaseData.metadata.derniereMiseAJour });
    } catch (err) {
      res.status(400).json({ ok: false, error: 'Invalid sync payload' });
    }
  });

  // 2. Direct JSON Download Link
  app.get('/api/database/download', (_req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename="diarra_energie_database_backup.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(databaseData, null, 2));
  });

  // 3. PostgreSQL Schema / DDL script endpoint
  app.get('/api/database/sql', (_req, res) => {
    const sqlSchema = `
-- ====================================================================
-- BASE DE DONNÉES OFFICIELLE : DIARRA ENERGIE & BUSINESS
-- Version : 2.0 (PostgreSQL / OHADA E-Commerce Compliant)
-- ====================================================================

CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(50) PRIMARY KEY,
    nom_complet VARCHAR(150) NOT NULL,
    raison_sociale VARCHAR(150),
    type_client VARCHAR(50) DEFAULT 'entreprise',
    email VARCHAR(150) NOT NULL,
    telephone VARCHAR(50) NOT NULL,
    pays VARCHAR(50) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL,
    numero_fiscal VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL,
    nom VARCHAR(255) NOT NULL,
    categorie VARCHAR(100) NOT NULL,
    sous_categorie VARCHAR(100),
    prix_fcfa NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    est_sur_devis BOOLEAN DEFAULT FALSE,
    stock_disponible INT DEFAULT 0,
    delai_livraison_jours INT DEFAULT 3,
    specs JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    numero_commande VARCHAR(50) UNIQUE NOT NULL,
    client_id VARCHAR(50) REFERENCES clients(id),
    sous_total_fcfa NUMERIC(14, 2) NOT NULL,
    frais_livraison_fcfa NUMERIC(14, 2) NOT NULL,
    total_fcfa NUMERIC(14, 2) NOT NULL,
    methode_livraison VARCHAR(50) NOT NULL,
    moyen_paiement VARCHAR(50) NOT NULL, -- wave, orange_money, moov_money, mtn_momo, carte_bancaire, virement
    statut_commande VARCHAR(50) DEFAULT 'en_attente', -- en_attente, confirmee, en_preparation, expediee, livree, annulee
    statut_paiement VARCHAR(50) DEFAULT 'en_cours_de_validation',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quotes (
    id VARCHAR(50) PRIMARY KEY,
    numero_devis VARCHAR(50) UNIQUE NOT NULL,
    client_nom VARCHAR(150) NOT NULL,
    client_email VARCHAR(150) NOT NULL,
    client_telephone VARCHAR(50) NOT NULL,
    pays_projet VARCHAR(50) NOT NULL,
    ville_projet VARCHAR(100) NOT NULL,
    type_projet VARCHAR(100) NOT NULL,
    description_besoin TEXT NOT NULL,
    estimation_fcfa NUMERIC(14, 2),
    statut VARCHAR(50) DEFAULT 'recu', -- recu, en_etude, devis_transmis, accepte, refuse
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- SEED DATA (DIARRA ENERGIE & BUSINESS)
-- ====================================================================
INSERT INTO products (id, reference, nom, categorie, prix_fcfa, est_sur_devis, stock_disponible)
VALUES
('deb-eps-01', 'DEB-SL-100-PRO', 'Lampadaire Solaire Intégré All-In-One 100W', 'eclairage-solaire', 195000, FALSE, 64),
('deb-eps-02', 'DEB-SL-150-SPLIT', 'Lampadaire Solaire Split 150W Autoroute', 'eclairage-solaire', 320000, TRUE, 30),
('deb-ps-01', 'DEB-PUMP-SUB-2HP', 'Système de Pompage Solaire Immergé 2.2kW (3HP)', 'pompage-solaire', 890000, FALSE, 18),
('deb-kit-01', 'DEB-KIT-VILLA-5KW', 'Kit Solaire Hybride 5kVA / 10kWh LiFePO4', 'kits-solaires', 3650000, FALSE, 12),
('deb-comp-01', 'DEB-PV-550-MONO', 'Panneau Solaire Monocristallin 550Wc Tier-1', 'composants-solaires', 65000, FALSE, 450)
ON CONFLICT (id) DO NOTHING;
    `;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(sqlSchema);
  });

  // Serve built dist/ in production, otherwise mount Vite middleware for development
  const distDir = path.join(__dirname, 'dist');
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(distDir, 'index.html'));

  if (isProd) {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DIARRA ENERGIE & BUSINESS Server running on http://0.0.0.0:${PORT}`);
    console.log(`Database API endpoint: http://0.0.0.0:${PORT}/api/database`);
  });
}

startServer();
