import { Link, useNavigate } from 'react-router-dom';
import { VyaparEmblem } from '../components/VyaparEmblem';
import { DataBadge } from '../components/DataBadges';
import { Rocket, MapPin, TrendingUp, Landmark, HelpCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useApp();

  const categories = [
    {
      id: 'START',
      title: t('cat.start.title', 'START'),
      subtitle: t('cat.start.desc', 'Find an opportunity or start a business'),
      icon: <Rocket className="w-6 h-6 text-vyapar-saffron" />,
      color: 'border-l-4 border-vyapar-saffron',
      path: '/start-business'
    },
    {
      id: 'PLAN',
      title: t('cat.plan.title', 'PLAN'),
      subtitle: t('cat.plan.desc', 'Plan your location, market and investment'),
      icon: <MapPin className="w-6 h-6 text-vyapar-teal" />,
      color: 'border-l-4 border-vyapar-teal',
      path: '/explore?cat=PLAN'
    },
    {
      id: 'GROW',
      title: t('cat.grow.title', 'GROW'),
      subtitle: t('cat.grow.desc', 'Expand and improve your existing business'),
      icon: <TrendingUp className="w-6 h-6 text-vyapar-green" />,
      color: 'border-l-4 border-vyapar-green',
      path: '/explore?cat=GROW'
    },
    {
      id: 'FINANCE',
      title: t('cat.finance.title', 'FINANCE'),
      subtitle: t('cat.finance.desc', 'Understand costs, funding and repayment'),
      icon: <Landmark className="w-6 h-6 text-vyapar-navy" />,
      color: 'border-l-4 border-vyapar-navy',
      path: '/explore?cat=FINANCE'
    },
    {
      id: 'SOLVE',
      title: t('cat.solve.title', 'SOLVE'),
      subtitle: t('cat.solve.desc', 'Solve a specific business problem'),
      icon: <HelpCircle className="w-6 h-6 text-rose-600" />,
      color: 'border-l-4 border-rose-600',
      path: '/explore?cat=SOLVE'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-vyapar-navy text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8892E_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-vyapar-slate/80 border border-vyapar-saffron/40 rounded-full text-xs font-semibold text-vyapar-saffron">
            <VyaparEmblem size={16} />
            <span>{t('hero.badge', 'Smart India Hackathon 2026 — SIH26091')}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            {t('hero.title', 'Your Business. Your Opportunity. Your Growth.')}
          </h1>

          <p className="text-xl font-serif text-vyapar-saffron font-medium">
            {t('hero.subtitle', 'Intelligent guidance for rural entrepreneurs.')}
          </p>

          <p className="text-sm sm:text-base text-vyapar-ivory/80 max-w-3xl mx-auto leading-relaxed">
            {t('hero.desc', 'Vyapar Mitra helps you make informed decisions about business opportunities, locations, markets, finances, and growth.')}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/start-business"
              className="w-full sm:w-auto px-8 py-3.5 bg-vyapar-saffron hover:bg-amber-600 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition"
            >
              <span>{t('hero.cta.start', 'Get Started →')}</span>
            </Link>
            <Link
              to="/how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 flex items-center justify-center gap-2 transition"
            >
              <span>{t('hero.cta.how', 'How It Works')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Entry Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif font-bold text-vyapar-navy">
            {t('cat.heading', 'What are you looking to achieve?')}
          </h2>
          <p className="text-sm text-vyapar-text-secondary">
            {t('cat.subheading', 'Select your primary goal to begin tailored advisory')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigate(cat.path)}
              className={`bg-white p-6 rounded-xl shadow-sm border border-vyapar-border hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 ${cat.color}`}
            >
              <div className="space-y-2">
                <div className="p-2.5 bg-gray-50 rounded-lg w-fit">
                  {cat.icon}
                </div>
                <h3 className="font-serif font-bold text-xl text-vyapar-navy">{cat.title}</h3>
                <p className="text-xs text-vyapar-text-secondary leading-normal">{cat.subtitle}</p>
              </div>
              <div className="flex items-center text-xs font-bold text-vyapar-navy group">
                <span>{t('cat.select', 'Select Task')}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-vyapar-saffron group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structured Decision Engine Features */}
      <section className="bg-vyapar-ivory py-16 border-y border-vyapar-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-vyapar-navy">
              {t('why.heading', 'Why Vyapar Mitra is Different')}
            </h2>
            <p className="text-sm text-vyapar-text-secondary max-w-2xl mx-auto">
              {t('why.subheading', 'Not a generic chat window. A structured analytical decision-support engine.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-vyapar-border space-y-3">
              <div className="w-10 h-10 bg-vyapar-navy/10 text-vyapar-navy rounded-lg flex items-center justify-center font-bold font-serif text-lg">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-vyapar-navy">
                {t('why.f1.title', 'Smart Data Collection Engine')}
              </h3>
              <p className="text-xs text-vyapar-text-secondary leading-relaxed">
                {t('why.f1.desc', 'Never shows generic endless forms. Dynamically asks minimum required questions, explains why information is needed, and allows "I don\'t know" or voice inputs.')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-vyapar-border space-y-3">
              <div className="w-10 h-10 bg-vyapar-saffron/10 text-vyapar-saffron rounded-lg flex items-center justify-center font-bold font-serif text-lg">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-vyapar-navy">
                {t('why.f2.title', 'Deterministic Financial Engine')}
              </h3>
              <p className="text-xs text-vyapar-text-secondary leading-relaxed">
                {t('why.f2.desc', 'Financial costs, EMIs, break-even timelines, and profit projections are calculated using code and strict formulas, never hallucinated by an AI language model.')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-vyapar-border space-y-3">
              <div className="w-10 h-10 bg-vyapar-teal/10 text-vyapar-teal rounded-lg flex items-center justify-center font-bold font-serif text-lg">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-vyapar-navy">
                {t('why.f3.title', 'DPR & Cryptographic Verification')}
              </h3>
              <p className="text-xs text-vyapar-text-secondary leading-relaxed">
                {t('why.f3.desc', 'Generates complete bankable Detailed Project Reports (DPR) embedded with SHA-256 integrity hashes and Micro-QR codes to prevent unauthorized document alteration.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Prototype Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b pb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-vyapar-navy">
              {t('impact.heading', 'Impact Metrics')}
            </h2>
            <p className="text-xs text-vyapar-text-secondary">
              {t('impact.subheading', 'Intended outcomes for rural micro-entrepreneurs across India')}
            </p>
          </div>
          <DataBadge type="DEMO" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-6 rounded-xl border border-vyapar-border">
            <span className="text-3xl font-serif font-bold text-vyapar-navy block">1,240+</span>
            <span className="text-xs text-vyapar-text-secondary mt-1 block">
              {t('impact.m1', 'Entrepreneurs Assisted')}
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-vyapar-border">
            <span className="text-3xl font-serif font-bold text-vyapar-navy block">850+</span>
            <span className="text-xs text-vyapar-text-secondary mt-1 block">
              {t('impact.m2', 'DPR Reports Generated')}
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-vyapar-border">
            <span className="text-3xl font-serif font-bold text-vyapar-navy block">320+</span>
            <span className="text-xs text-vyapar-text-secondary mt-1 block">
              {t('impact.m3', 'Locations Analyzed')}
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-vyapar-border">
            <span className="text-3xl font-serif font-bold text-vyapar-navy block">₹4.2 Cr</span>
            <span className="text-xs text-vyapar-text-secondary mt-1 block">
              {t('impact.m4', 'Financial Plans Created')}
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <div className="bg-vyapar-navy text-white p-12 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-3xl font-serif font-bold">
            {t('cta.heading', 'Ready to make a smarter business decision?')}
          </h2>
          <p className="text-vyapar-ivory/80 text-sm max-w-xl mx-auto">
            {t('cta.sub', 'Tell Vyapar Mitra what you want to achieve. Move from business idea to verified informed decision in minutes.')}
          </p>
          <button
            onClick={() => navigate('/start-business')}
            className="px-8 py-3.5 bg-vyapar-saffron hover:bg-amber-600 text-white font-bold rounded-lg shadow-md transition"
          >
            {t('cta.btn', 'Get Started →')}
          </button>
        </div>
      </section>
    </div>
  );
}
