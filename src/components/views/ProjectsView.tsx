import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectReference } from '../../types';
import {
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  X,
  Globe2,
  Zap,
  Sparkles,
  FileText
} from 'lucide-react';

const COUNTRY_FLAGS: Record<string, string> = {
  'Dubaï': '🇦🇪',
  'Mali': '🇲🇱',
  'Malaisie': '🇲🇾',
  'Bangladesh': '🇧🇩',
  'Nigeria': '🇳🇬',
  'Koweït': '🇰🇼',
  'Sénégal': '🇸🇳',
  'Bénin': '🇧🇯',
  'Togo': '🇹🇬'
};

export const ProjectsView: React.FC = () => {
  const { projects, setActiveTab } = useApp();
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('Tous');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('Toutes les villes');
  const [activeModalProject, setActiveModalProject] = useState<ProjectReference | null>(null);

  const countryList = [
    'Tous',
    'Sénégal',
    'Dubaï',
    'Mali',
    'Malaisie',
    'Bangladesh',
    'Nigeria',
    'Koweït',
    'Bénin',
    'Togo'
  ];

  const senegalCities = [
    'Toutes les villes',
    'Thiès',
    'Louga',
    'Fatick',
    'Ziguinchor',
    'Mboro',
    'Notto Gouye Diama',
    'Saint-Louis',
    'Diamniadio'
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedCountryFilter !== 'Tous' && p.pays !== selectedCountryFilter) return false;
    if (selectedCountryFilter === 'Sénégal' && selectedCityFilter !== 'Toutes les villes') {
      if (!p.ville.toLowerCase().includes(selectedCityFilter.toLowerCase())) return false;
    }
    if (selectedCategoryFilter !== 'all' && p.categorie !== selectedCategoryFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
          <Globe2 className="w-4 h-4" />
          <span>Références & Réalisations Internationales</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
          Nos Réalisations à l’International & en Afrique de l’Ouest
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          Découvrez nos projets d'ingénierie et de déploiement en éclairage public solaire et éolien réalisés à travers le monde : 
          <strong className="text-slate-900"> Dubaï, Mali, Malaisie, Bangladesh, Nigeria, Koweït</strong>, ainsi que nos chantiers d'électrification rurale, de pompage de forage et de voiries au <strong className="text-slate-900">Sénégal, Bénin et Togo</strong>.
        </p>
      </div>

      {/* Filter Tabs by Country & Domain */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs font-medium">
          {countryList.map((country) => {
            const count = country === 'Tous'
              ? projects.length
              : projects.filter((p) => p.pays === country).length;
            const flag = COUNTRY_FLAGS[country] || '';

            return (
              <button
                key={country}
                onClick={() => {
                  setSelectedCountryFilter(country);
                  setSelectedCityFilter('Toutes les villes');
                }}
                className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCountryFilter === country
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {flag && <span>{flag}</span>}
                <span>{country}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedCountryFilter === country ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs shrink-0">
          <span className="text-slate-500 font-medium">Secteur :</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs font-medium"
          >
            <option value="all">Tous les secteurs ({filteredProjects.length})</option>
            <option value="eclairage-solaire">Éclairage solaire</option>
            <option value="eclairage-electrique">Éclairage électrique</option>
            <option value="pompage-solaire">Pompage solaire</option>
            <option value="kits-solaires">Kits solaires</option>
          </select>
        </div>
      </div>

      {/* Senegal City Filter Pills */}
      {selectedCountryFilter === 'Sénégal' && (
        <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl flex flex-wrap items-center gap-2 animate-in fade-in duration-200">
          <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mr-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Villes équipées au Sénégal :</span>
          </span>
          {senegalCities.map((city) => {
            const count = city === 'Toutes les villes'
              ? projects.filter((p) => p.pays === 'Sénégal').length
              : projects.filter((p) => p.pays === 'Sénégal' && p.ville.toLowerCase().includes(city.toLowerCase())).length;

            return (
              <button
                key={city}
                onClick={() => setSelectedCityFilter(city)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                  selectedCityFilter === city
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/70 border border-amber-200'
                }`}
              >
                <span>{city}</span>
                <span className="ml-1 text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => {
          const flag = COUNTRY_FLAGS[proj.pays] || '📍';

          return (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image banner with clickable zoom */}
              <div
                onClick={() => setActiveModalProject(proj)}
                className="aspect-[16/10] bg-slate-900 relative overflow-hidden cursor-pointer"
              >
                <img
                  src={proj.image}
                  alt={proj.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('fallbacked')) {
                      const filename = proj.image.split('/').pop();
                      if (filename) {
                        target.src = `./images/${filename}?fallbacked=1`;
                      }
                    }
                  }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Country + City Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border border-white/10 shadow-lg">
                  <span className="text-base">{flag}</span>
                  <span>{proj.ville} · {proj.pays}</span>
                </div>

                {/* Zoom button badge */}
                <div className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-900 p-2 rounded-lg text-xs font-medium backdrop-blur-sm transition-colors shadow-md flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px] font-semibold">Agrandir</span>
                </div>

                {/* Bottom specs overlay on image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="bg-amber-500 text-slate-950 font-mono font-bold px-2 py-0.5 rounded text-[11px]">
                    {proj.capaciteInstallee}
                  </span>
                  <span className="bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-slate-300 font-mono">
                    Année {proj.annee}
                  </span>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {proj.client}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{proj.typeClient}</span>
                  </div>

                  <h3
                    onClick={() => setActiveModalProject(proj)}
                    className="font-heading font-bold text-lg text-slate-900 leading-snug cursor-pointer hover:text-amber-600 transition-colors"
                  >
                    {proj.titre}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Résultats & Points Forts :
                    </span>
                    {proj.pointsForts.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalProject(proj)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Détails & Photo HD</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('devis')}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 bg-amber-50 hover:bg-amber-100 py-1.5 px-3 rounded-lg transition-colors"
                  >
                    <span>Étude similaire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to action card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-700 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bureau d’Études Photométriques & Solaires</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Vous avez un projet municipal, autoroutier ou industriel ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Nos ingénieurs modélisent votre implantation sur Dialux, calculent l'autonomie sans soleil sous climat local et assurent la fourniture, la pose sur camion-nacelle et la maintenance garantie.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('devis')}
          className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-lg flex items-center gap-2 shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>Demander une étude & devis clé en main</span>
        </button>
      </div>

      {/* Photo HD & Detailed Project Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{COUNTRY_FLAGS[activeModalProject.pays] || '📍'}</span>
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 leading-tight">
                    {activeModalProject.titre}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {activeModalProject.ville} · {activeModalProject.pays} ({activeModalProject.annee})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* High-res Image */}
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 relative aspect-[16/9] shadow-inner">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.titre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('fallbacked')) {
                      const filename = activeModalProject.image.split('/').pop();
                      if (filename) {
                        target.src = `./images/${filename}?fallbacked=1`;
                      }
                    }
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs px-3 py-1.5 rounded-lg font-mono font-bold border border-amber-400/30">
                  {activeModalProject.capaciteInstallee}
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Client / Maître d’Ouvrage</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{activeModalProject.client}</span>
                  <span className="text-slate-500 text-[11px]">{activeModalProject.typeClient}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Localisation & Année</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{activeModalProject.ville}, {activeModalProject.pays}</span>
                  <span className="text-slate-500 text-[11px]">Projet livré et réceptionné en {activeModalProject.annee}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Configuration Technique</span>
                  <span className="font-bold text-amber-700 text-sm mt-0.5 block font-mono">{activeModalProject.capaciteInstallee}</span>
                  <span className="text-slate-500 text-[11px]">Secteur : {activeModalProject.categorie}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-slate-900 text-sm">
                  Descriptif Technique de l’Installation :
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-slate-900 text-sm">
                  Résultats Clés & Impact Constaté :
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeModalProject.pointsForts.map((point, index) => (
                    <div
                      key={index}
                      className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-emerald-950 font-medium leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  setActiveModalProject(null);
                  setActiveTab('devis');
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
              >
                <span>Demander un devis pour une installation similaire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
