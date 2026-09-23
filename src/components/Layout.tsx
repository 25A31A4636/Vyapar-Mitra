import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { VyaparEmblem } from './VyaparEmblem';
import { Home, Compass, User, Globe, PhoneCall, Edit3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { ProfileEditModal } from './ProfileEditModal';
import { GsmIvrSimulator } from './GsmIvrSimulator';

export default function Layout() {
  const location = useLocation();
  const { language, setLanguage, t, profile } = useApp();
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isIvrOpen, setIsIvrOpen] = useState(false);

  const navLinks = [
    { label: t('nav.home', 'Home'), path: '/home' },
    { label: t('nav.explore', 'Explore'), path: '/explore' },
    { label: t('nav.howItWorks', 'How It Works'), path: '/how-it-works' },
    { label: t('nav.impact', 'Impact'), path: '/impact' },
    { label: t('nav.dashboard', 'My Dashboard'), path: '/dashboard' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-vyapar-ivory">
      {/* Top Header */}
      <header className="bg-white border-b border-vyapar-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Wordmark & Original Emblem */}
            <Link to="/home" className="flex items-center space-x-2.5">
              <VyaparEmblem size={32} />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-vyapar-navy tracking-tight leading-none">
                  VYAPAR MITRA
                </span>
                <span className="text-[10px] text-vyapar-text-secondary font-medium tracking-wide">
                  {t('nav.tagline', 'Smart Business Companion')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 text-xs font-semibold">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`transition-colors py-1 ${
                      isActive
                        ? 'text-vyapar-navy font-bold border-b-2 border-vyapar-saffron'
                        : 'text-vyapar-text-secondary hover:text-vyapar-navy'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* 2G IVR Demo Trigger */}
              <button
                onClick={() => setIsIvrOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition"
                title="Simulate 2G Keypad Toll-Free Call / SMS"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>2G IVR / SMS</span>
              </button>

              {/* Profile Pill / Quick Edit */}
              <button
                onClick={() => setIsProfileEditOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-gray-50 text-vyapar-navy border border-vyapar-border hover:bg-gray-100 transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-vyapar-teal" />
                <span className="max-w-[100px] truncate">{profile.name || 'Edit Profile'}</span>
              </button>

              {/* Multilingual Selector */}
              <div className="flex items-center text-xs font-semibold text-vyapar-text-secondary bg-gray-50 p-1 rounded-lg border border-vyapar-border">
                <Globe className="w-3.5 h-3.5 text-vyapar-teal mx-1 hidden sm:inline" />
                <div className="flex space-x-1">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-2 py-0.5 rounded transition text-xs font-bold ${
                        language === lang.code
                          ? 'bg-vyapar-navy text-white shadow-xs'
                          : 'text-vyapar-text-secondary hover:text-vyapar-navy hover:bg-gray-200/60'
                      }`}
                      title={lang.name}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/start-business"
                className="hidden sm:inline-flex bg-vyapar-navy hover:bg-vyapar-slate text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm"
              >
                {t('nav.ask', 'Ask Vyapar Mitra')}
              </Link>
            </div>
          </div>
        </div>

        {/* Thin Identity Accent Line */}
        <div className="flex h-[2px] w-full">
          <div className="flex-1 bg-vyapar-saffron" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-vyapar-green" />
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Profile Edit Modal */}
      <ProfileEditModal isOpen={isProfileEditOpen} onClose={() => setIsProfileEditOpen(false)} />

      {/* 2G IVR & GSM Channel Simulator */}
      <GsmIvrSimulator isOpen={isIvrOpen} onClose={() => setIsIvrOpen(false)} />

      {/* Deep Navy Footer */}
      <footer className="bg-vyapar-navy text-white py-12 border-t border-vyapar-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <VyaparEmblem size={28} />
                <span className="font-serif font-bold text-xl tracking-tight">VYAPAR MITRA</span>
              </div>
              <p className="text-vyapar-saffron text-xs font-serif font-medium">
                {t('footer.tagline', 'Your Intelligent Business Companion')}
              </p>
              <p className="text-xs text-vyapar-ivory/80 leading-relaxed max-w-sm">
                {t('footer.desc', 'AI-driven hyper-local business advisory and financial structuring assistant for rural micro-entrepreneurs.')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-vyapar-ivory/70">
              <div className="space-y-2">
                <span className="font-bold text-white block uppercase tracking-wider text-[10px]">
                  {t('footer.nav', 'Navigation')}
                </span>
                <Link to="/home" className="block hover:text-white">{t('nav.home', 'Home')}</Link>
                <Link to="/explore" className="block hover:text-white">{t('nav.explore', 'Explore')}</Link>
                <Link to="/how-it-works" className="block hover:text-white">{t('nav.howItWorks', 'How It Works')}</Link>
              </div>
              <div className="space-y-2">
                <span className="font-bold text-white block uppercase tracking-wider text-[10px]">
                  {t('footer.plat', 'Platform')}
                </span>
                <Link to="/dashboard" className="block hover:text-white">{t('nav.dashboard', 'My Dashboard')}</Link>
                <Link to="/impact" className="block hover:text-white">{t('nav.impact', 'Impact')}</Link>
                <Link to="/verification" className="block hover:text-white">Verify DPR Report</Link>
              </div>
            </div>

            <div className="space-y-2 text-xs text-vyapar-ivory/70">
              <span className="font-bold text-white block uppercase tracking-wider text-[10px]">
                {t('footer.hack', 'Hackathon Identity')}
              </span>
              <p className="text-vyapar-ivory/90 font-mono">Smart India Hackathon 2026</p>
              <p className="text-vyapar-saffron font-semibold">
                {t('footer.ps', 'Problem Statement: SIH26091')}
              </p>
              <p className="text-[11px] text-vyapar-ivory/60 pt-2">
                Team Hexa Syndicate • Original technology platform prototype.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-vyapar-ivory/50">
            {t('footer.copy', '© 2026 Vyapar Mitra 2.0 • Intelligent Decision Support System')}
          </div>
        </div>
      </footer>

      {/* Mobile-First Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-vyapar-border z-40 px-2 py-1.5 flex justify-around items-center text-[10px] font-bold text-vyapar-text-secondary">
        <Link to="/home" className={`flex flex-col items-center p-1 ${location.pathname === '/home' ? 'text-vyapar-navy' : ''}`}>
          <Home className="w-5 h-5" />
          <span>{t('nav.home', 'Home')}</span>
        </Link>
        <Link to="/explore" className={`flex flex-col items-center p-1 ${location.pathname === '/explore' ? 'text-vyapar-navy' : ''}`}>
          <Compass className="w-5 h-5" />
          <span>{t('nav.explore', 'Explore')}</span>
        </Link>
        <button onClick={() => setIsIvrOpen(true)} className="flex flex-col items-center p-1 text-emerald-700">
          <PhoneCall className="w-5 h-5" />
          <span>2G Call</span>
        </button>
        <Link to="/dashboard" className={`flex flex-col items-center p-1 ${location.pathname === '/dashboard' ? 'text-vyapar-navy' : ''}`}>
          <User className="w-5 h-5" />
          <span>{t('nav.profile', 'Profile')}</span>
        </Link>
      </div>
    </div>
  );
}
