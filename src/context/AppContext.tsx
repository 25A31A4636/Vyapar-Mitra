import React, { createContext, useContext, useState } from 'react';
import type { EntrepreneurProfile, DPRDocument, RecommendationResult } from '../types';
import { translations } from '../i18n/translations';
import type { Language } from '../i18n/translations';

interface AppContextType {
  profile: EntrepreneurProfile;
  updateProfile: (partial: Partial<EntrepreneurProfile>) => void;
  savedDprs: DPRDocument[];
  addDpr: (dpr: DPRDocument) => void;
  currentResult: RecommendationResult | null;
  setCurrentResult: (result: RecommendationResult | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const defaultProfile: EntrepreneurProfile = {
  name: 'Ramesh Kumar',
  ageRange: '25-34',
  state: 'Andhra Pradesh',
  district: 'Guntur',
  villageTown: 'Tenali',
  pinCode: '522201',
  preferredLanguage: 'English',
  experience: '2 years in retail helper role',
  skills: ['Customer Interaction', 'Basic Accounting', 'Local Geography'],
  interests: ['Agri-inputs', 'Grocery Store', 'Apparel'],
  businessKnowledge: 'Moderate',
  availableCapital: 150000,
  landAvailability: 'Owned 400 sq.ft plot near main road',
  shopAvailability: 'Rented shop option available',
  equipmentOwned: ['Smartphone', 'Two-wheeler'],
  vehicles: ['Motorcycle'],
  familyWorkers: 2,
  workingHours: 10
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<EntrepreneurProfile>(defaultProfile);
  const [savedDprs, setSavedDprs] = useState<DPRDocument[]>([]);
  const [currentResult, setCurrentResult] = useState<RecommendationResult | null>(null);
  const [language, setLanguage] = useState<Language>('EN');

  const updateProfile = (partial: Partial<EntrepreneurProfile>) => {
    setProfile(prev => ({ ...prev, ...partial }));
  };

  const addDpr = (dpr: DPRDocument) => {
    setSavedDprs(prev => [dpr, ...prev]);
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = translations[language] || translations.EN;
    return langDict[key] || translations.EN[key] || defaultText || key;
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        savedDprs,
        addDpr,
        currentResult,
        setCurrentResult,
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
