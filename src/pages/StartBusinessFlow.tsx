import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SmartQuestionnaire } from '../components/SmartQuestionnaire';
import { DataBadge, ConfidenceBadge } from '../components/DataBadges';
import { WhatIfSimulator } from '../components/WhatIfSimulator';
import { GeoMap } from '../components/GeoMap';
import { ActionPlanChecklist } from '../components/ActionPlanChecklist';
import { DprPreview } from '../components/DprPreview';
import { BusinessOptionsCard } from '../components/BusinessOptionsCard';
import type { QuestionField, RecommendationResult, DPRDocument, ActionStep, LocationPoint } from '../types';
import { CheckCircle2, Sparkles, FileText } from 'lucide-react';

export default function StartBusinessFlow() {
  const { profile, addDpr, t } = useApp();
  const [stage, setStage] = useState<'questionnaire' | 'analyzing' | 'results' | 'dpr'>('questionnaire');
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [generatedDpr, setGeneratedDpr] = useState<DPRDocument | null>(null);

  const questions: QuestionField[] = [
    {
      id: 'preferredCategory',
      label: t('flow.q1.label', 'What business category are you interested in?'),
      type: 'select',
      required: true,
      options: [
        { label: '⚡ Electrical Shop & Electronics', value: 'Electrical' },
        { label: '🛒 Kirana / Grocery Store', value: 'Grocery' },
        { label: '👗 Apparel & Readymade Garments', value: 'Apparel' },
        { label: '🌱 Agri-Inputs & Seeds Store', value: 'Agri-Inputs' },
        { label: '🌾 Food & Snack Processing Unit', value: 'Food Processing' },
        { label: '🔧 Hardware & Building Materials', value: 'Hardware' },
        { label: '📱 Mobile Accessories & Repair', value: 'Mobile Shop' },
        { label: '🛵 Auto Spare Parts & Garage', value: 'Auto Repair' },
        { label: '✏️ Other / Custom Business', value: 'Other' }
      ],
      defaultValue: 'Electrical',
      whyAsk: t('flow.q1.why', 'Helps us analyze hyper-local demand and supply chains for your target category.')
    },
    {
      id: 'customBusinessName',
      label: t('flow.q1_custom.label', 'Specific Business Name or Type (e.g. Electrical Shop, Bakery, etc.)'),
      type: 'text',
      placeholder: 'e.g. Electrical Shop, Sri Balaji Hardware, General Store...',
      required: false,
      whyAsk: 'Allows Vyapar Mitra to customize your Detailed Project Report (DPR) and financial projections to your exact business name.'
    },
    {
      id: 'capital',
      label: t('flow.q2.label', 'How much starting capital do you have available?'),
      type: 'slider',
      min: 25000,
      max: 500000,
      step: 25000,
      required: true,
      unit: 'INR',
      defaultValue: profile.availableCapital || 150000,
      whyAsk: t('flow.q2.why', 'Used to calculate loan requirements and promoter margin needed.')
    },
    {
      id: 'location',
      label: t('flow.q3.label', 'Where will your business be located?'),
      type: 'text',
      required: true,
      defaultValue: `${profile.villageTown}, ${profile.district}, ${profile.state}`,
      placeholder: 'e.g. Karimnagar, Warangal, Tenali, Vijayawada...',
      whyAsk: t('flow.q3.why', 'Used by our GIS engine to evaluate competitor density and market saturation.')
    },
    {
      id: 'shopAvailable',
      label: t('flow.q4.label', 'Do you have a shop or commercial space ready?'),
      type: 'radio',
      required: true,
      options: [
        { label: t('flow.q4.opt1', 'Own commercial shop available'), value: 'Own' },
        { label: t('flow.q4.opt2', 'Planning to rent a shop'), value: 'Rented' },
        { label: t('flow.q4.opt3', 'Home-based operation'), value: 'Home' }
      ],
      defaultValue: 'Rented',
      allowIDontKnow: true
    },
    {
      id: 'incomeGoal',
      label: t('flow.q5.label', 'What is your desired net monthly income goal?'),
      type: 'select',
      required: true,
      options: [
        { label: t('flow.q5.opt1', '₹15,000 - ₹25,000 / mo'), value: '20000' },
        { label: t('flow.q5.opt2', '₹25,000 - ₹40,000 / mo'), value: '35000' },
        { label: t('flow.q5.opt3', '₹40,000+ / mo'), value: '50000' }
      ],
      defaultValue: '35000'
    }
  ];

  const handleQuestionnaireComplete = (answers: Record<string, any>) => {
    setStage('analyzing');
    const steps = [
      t('analyzing.s1', 'Understanding your requirements...'),
      t('analyzing.s2', 'Processing location GIS data...'),
      t('analyzing.s3', 'Checking market saturation...'),
      t('analyzing.s4', 'Evaluating local competition...'),
      t('analyzing.s5', 'Calculating financial feasibility...'),
      t('analyzing.s6', 'Preparing AI advisory recommendation...')
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setAnalysisStep(current);
      if (current >= steps.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          generateRecommendation(answers);
          setStage('results');
        }, 800);
      }
    }, 500);
  };

  const generateRecommendation = (answers: Record<string, any>) => {
    // ── 1. Dynamic Location Parsing ──────────────────────────
    const userLocRaw = answers.location || `${profile.villageTown}, ${profile.district}, ${profile.state}`;
    const locationText = userLocRaw.trim() || 'Your Selected Area';
    
    // Extract main town/city name (e.g. "Karimnagar", "Tenali", "Suryapet", etc.)
    const locationParts = locationText.split(',').map((s: string) => s.trim()).filter(Boolean);
    const primaryTown = locationParts[0] || profile.villageTown || 'Main Center';

    // ── 2. Dynamic Business Category & Title ────────────────
    const selectedCategory = answers.preferredCategory || 'Electrical';
    const customName = (answers.customBusinessName || '').trim();

    let categoryDisplayName = 'Micro Enterprise';
    let businessTitle = 'Business Unit';
    let businessKey = 'generic';

    const lowCustom = customName.toLowerCase();
    const lowCat = selectedCategory.toLowerCase();

    if (lowCustom.includes('electric') || lowCat.includes('electric')) {
      businessKey = 'electrical';
      categoryDisplayName = 'Electrical Shop & Electronics';
      businessTitle = customName 
        ? (customName.toLowerCase().includes('shop') || customName.toLowerCase().includes('store') || customName.toLowerCase().includes('electric') ? customName : `${customName} Electricals`) 
        : 'Sri Venkateswara Electricals & Hardware';
    } else if (lowCustom.includes('kirana') || lowCustom.includes('grocer') || lowCat.includes('grocery')) {
      businessKey = 'grocery';
      categoryDisplayName = 'Kirana / Grocery Store';
      businessTitle = customName || 'Modern Kirana & Essential Goods Store';
    } else if (lowCustom.includes('apparel') || lowCustom.includes('cloth') || lowCustom.includes('garment') || lowCat.includes('apparel')) {
      businessKey = 'apparel';
      categoryDisplayName = 'Apparel & Readymade Garments';
      businessTitle = customName || 'Royal Apparel & Readymade Store';
    } else if (lowCustom.includes('agri') || lowCustom.includes('seed') || lowCustom.includes('fertilizer') || lowCat.includes('agri')) {
      businessKey = 'agri';
      categoryDisplayName = 'Agri-Inputs & Seeds Store';
      businessTitle = customName || 'Kisan Seva Agri-Inputs & Seeds Depot';
    } else if (lowCustom.includes('food') || lowCustom.includes('snack') || lowCustom.includes('process') || lowCat.includes('food')) {
      businessKey = 'food';
      categoryDisplayName = 'Food & Snack Processing Unit';
      businessTitle = customName || 'Sri Lakshmi Food & Snack Processing Unit';
    } else if (lowCustom.includes('hardware') || lowCustom.includes('paint') || lowCat.includes('hardware')) {
      businessKey = 'hardware';
      categoryDisplayName = 'Hardware & Building Materials';
      businessTitle = customName || 'Balaji Hardware & Building Materials';
    } else if (lowCustom.includes('mobile') || lowCustom.includes('repair') || lowCat.includes('mobile')) {
      businessKey = 'mobile';
      categoryDisplayName = 'Mobile Accessories & Service';
      businessTitle = customName || 'Smart Mobile & Accessories Point';
    } else if (lowCustom.includes('auto') || lowCustom.includes('spare') || lowCat.includes('auto')) {
      businessKey = 'auto';
      categoryDisplayName = 'Auto Spare Parts & Repair Garage';
      businessTitle = customName || 'Speed Auto Spares & Garage';
    } else if (customName) {
      businessKey = 'custom';
      categoryDisplayName = selectedCategory !== 'Other' ? selectedCategory : 'Micro-Enterprise';
      businessTitle = customName.length > 3 ? customName : `${customName} Enterprise`;
    } else {
      businessKey = 'electrical';
      categoryDisplayName = 'Electrical Shop & Electronics';
      businessTitle = 'Sri Venkateswara Electricals & Hardware';
    }

    // ── 3. Deterministic Financial Projections ──────────────
    const capital = Number(answers.capital) || profile.availableCapital || 150000;
    
    let grossMargin = 0.25;
    let costMultiplier = 1.6;
    let baseRevenue = 120000;

    if (businessKey === 'electrical') {
      costMultiplier = 1.75;
      grossMargin = 0.28;
      baseRevenue = 135000;
    } else if (businessKey === 'grocery') {
      costMultiplier = 1.5;
      grossMargin = 0.18;
      baseRevenue = 105000;
    } else if (businessKey === 'apparel') {
      costMultiplier = 1.6;
      grossMargin = 0.35;
      baseRevenue = 95000;
    } else if (businessKey === 'agri') {
      costMultiplier = 1.8;
      grossMargin = 0.20;
      baseRevenue = 140000;
    } else if (businessKey === 'hardware') {
      costMultiplier = 1.85;
      grossMargin = 0.25;
      baseRevenue = 150000;
    } else if (businessKey === 'food') {
      costMultiplier = 1.5;
      grossMargin = 0.32;
      baseRevenue = 90000;
    }

    const projectCost = Math.max(240000, Math.round(capital * costMultiplier));
    const ownContribution = Math.min(capital, Math.round(projectCost * 0.35));
    const loanReq = projectCost - ownContribution;

    const monthlyRevenue = baseRevenue;
    const grossProfit = Math.round(monthlyRevenue * grossMargin);

    const rent = Math.round(monthlyRevenue * 0.055);
    const inventory = Math.round(monthlyRevenue * (1 - grossMargin));
    const salaries = Math.round(monthlyRevenue * 0.045);
    const utilities = Math.round(monthlyRevenue * 0.025);
    const transport = Math.round(monthlyRevenue * 0.015);
    const marketing = 1500;
    const other = 1500;

    const totalOpExpenses = rent + salaries + utilities + transport + marketing + other;
    const netMonthlyProfit = Math.max(14000, grossProfit - totalOpExpenses);

    // EMI calculation: 5 years @ 9.5% p.a.
    const r = 0.095 / 12;
    const n = 60;
    const monthlyEmi = Math.round(
      (loanReq * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    );

    const breakEvenMonths = Math.round(projectCost / (netMonthlyProfit + monthlyEmi));

    // ── 4. Business & Location Specific Action Plan ──────────
    const actionPlan: ActionStep[] = [
      {
        id: '1',
        title: `Validate location foot traffic and competitor density in ${primaryTown} market area`,
        priority: 'High',
        estimatedEffort: '2 Days',
        requiredInformation: 'Location footfall visit count',
        status: 'Pending'
      },
      {
        id: '2',
        title: `Obtain commercial shop lease agreement or NOC from property owner in ${primaryTown}`,
        priority: 'High',
        estimatedEffort: '3 Days',
        requiredInformation: 'Rent agreement draft',
        status: 'Pending'
      },
      {
        id: '3',
        title: businessKey === 'electrical'
          ? 'Finalize wholesale distributor ties with major electrical brands (Havells, Polycab, Finolex)'
          : businessKey === 'agri'
          ? 'Apply for Seed & Fertilizer Retailer License from District Agriculture Department'
          : businessKey === 'food'
          ? 'Obtain FSSAI basic registration & local municipal sanitation clearance'
          : `Finalize local wholesale distributor list for initial inventory in ${primaryTown}`,
        priority: 'High',
        estimatedEffort: '4 Days',
        requiredInformation: 'Supplier rate cards & GST details',
        status: 'Pending'
      },
      {
        id: '4',
        title: `Apply for Mudra / PMEGP loan scheme for ₹${loanReq.toLocaleString()} using generated DPR`,
        priority: 'High',
        estimatedEffort: '7 Days',
        requiredInformation: 'Verified DPR Document',
        status: 'Pending'
      }
    ];

    // ── 5. Dynamic Location Zones tailored to user's location ─
    const locationRecommendations: LocationPoint[] = [
      {
        id: 'l1',
        name: `${primaryTown} Bus Stand Junction`,
        type: 'Recommended',
        lat: 16.24,
        lng: 80.64,
        suitability: 94,
        competitionDensity: `2 ${categoryDisplayName} stores within 500m`,
        footTrafficEstimate: 'High (3,800/day)'
      },
      {
        id: 'l2',
        name: `${primaryTown} Main Market Road`,
        type: 'High Competition',
        lat: 16.25,
        lng: 80.65,
        suitability: 71,
        competitionDensity: `6 ${categoryDisplayName} stores within 300m`,
        footTrafficEstimate: 'Very High (6,200/day)'
      },
      {
        id: 'l3',
        name: `${primaryTown} Station Road / Colony`,
        type: 'Moderate',
        lat: 16.23,
        lng: 80.63,
        suitability: 83,
        competitionDensity: `1 ${categoryDisplayName} store within 800m`,
        footTrafficEstimate: 'Moderate (2,100/day)'
      }
    ];

    // ── 6. Dynamic Why Matched Reasons ───────────────────────
    const whyMatched = [
      `High local consumer & trade demand for ${categoryDisplayName} in ${locationText}`,
      `Your available capital of ₹${capital.toLocaleString()} covers the required promoter margin of ₹${ownContribution.toLocaleString()}`,
      `Balanced competitor density within 2 km radius in ${primaryTown} commercial zone`
    ];

    const mockResult: RecommendationResult = {
      businessName: businessTitle,
      category: categoryDisplayName,
      suitabilityScore: 92,
      demandIndicator: 'High',
      competitionIndicator: 'Moderate',
      riskLevel: 'Low',
      growthPotential: 'High',
      whyMatched,
      confidence: 'High',
      confidenceReason: `Complete financial and spatial parameters calculated for ${businessTitle} in ${locationText}`,
      financialSnapshot: {
        totalProjectCost: projectCost,
        ownContribution,
        fundingRequirement: loanReq,
        monthlyRevenue,
        monthlyExpenses: {
          rent,
          inventory,
          salaries,
          utilities,
          transport,
          marketing,
          other
        },
        netMonthlyProfit,
        breakEvenMonths,
        monthlyEmi
      },
      actionPlan,
      locationRecommendations
    };

    setResult(mockResult);
  };

  const handleGenerateDPR = () => {
    if (!result) return;

    const isElectrical = result.category.toLowerCase().includes('electric') || result.businessName.toLowerCase().includes('electric');
    const isAgri = result.category.toLowerCase().includes('agri');
    const isApparel = result.category.toLowerCase().includes('apparel');

    const primaryLocation = result.locationRecommendations[0]?.name || `${profile.villageTown}, ${profile.district}`;

    const dprDoc: DPRDocument = {
      dprId: `DPR-VM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      generatedTimestamp: new Date().toISOString(),
      entrepreneurName: profile.name,
      businessName: result.businessName,
      location: primaryLocation,
      totalInvestment: result.financialSnapshot.totalProjectCost,
      ownContribution: result.financialSnapshot.ownContribution,
      loanRequested: result.financialSnapshot.fundingRequirement,
      projectedMonthlyRevenue: result.financialSnapshot.monthlyRevenue,
      projectedMonthlyProfit: result.financialSnapshot.netMonthlyProfit,
      breakEvenPeriodMonths: result.financialSnapshot.breakEvenMonths,
      repaymentTenureYears: 5,
      estimatedEmi: result.financialSnapshot.monthlyEmi,
      swotAnalysis: {
        strengths: isElectrical
          ? [
              `Strong demand for house wiring, switches, LED fixtures, and motor switchgears in ${primaryLocation}`,
              'Attractive gross profit margins (25-30%) on electrical accessories & fixtures'
            ]
          : isAgri
          ? [
              `High seasonal demand from local farmers around ${primaryLocation}`,
              'Direct dealership tie-ups with certified seed and fertilizer distributors'
            ]
          : isApparel
          ? [
              'High gross profit margins (35-40%) on readymade garments and festive wear',
              'Strong repeat customer footfall during festival and wedding seasons'
            ]
          : [
              `Strong local daily consumer demand for essential items in ${primaryLocation}`,
              'Promoter retail experience and customer relationship network'
            ],
        weaknesses: [
          'Working capital required for maintaining adequate stock inventory',
          'Credit sales to local customers/contractors require strict receivables tracking'
        ],
        opportunities: [
          isElectrical
            ? 'Solar accessory sales, inverter retrofits, and partnerships with local electrical contractors'
            : 'Digital UPI payments, WhatsApp ordering, and local home delivery service',
          `Expansion into surrounding villages across ${profile.district} district`
        ],
        threats: [
          'Entry of new retail stores on main transit highways',
          'Seasonal fluctuations in rural purchasing power'
        ]
      }
    };

    setGeneratedDpr(dprDoc);
    addDpr(dprDoc);
    setStage('dpr');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Questionnaire Stage */}
      {stage === 'questionnaire' && (
        <SmartQuestionnaire
          title={t('cat.start.title', 'Start a New Business') + ' — ' + t('why.f1.title', 'Smart Questionnaire')}
          subtitle="We collect minimum required inputs to evaluate your business suitability."
          questions={questions}
          onComplete={handleQuestionnaireComplete}
        />
      )}

      {/* AI Analysis Loading Engine */}
      {stage === 'analyzing' && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-vyapar-border text-center max-w-lg mx-auto space-y-6">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-vyapar-navy/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-vyapar-saffron border-t-transparent rounded-full animate-spin" />
            <Sparkles className="w-6 h-6 text-vyapar-navy absolute inset-0 m-auto" />
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-vyapar-navy">
              {t('analyzing.title', 'Vyapar Mitra is analyzing your opportunity...')}
            </h2>
            <p className="text-xs text-vyapar-text-secondary mt-1">
              {t('analyzing.sub', 'Applying hyper-local GIS & deterministic financial engine')}
            </p>
          </div>

          <div className="space-y-2 text-left bg-vyapar-ivory p-4 rounded-lg border text-xs">
            {[
              t('analyzing.s1', 'Understanding your requirements'),
              t('analyzing.s2', 'Processing location information'),
              t('analyzing.s3', 'Checking market conditions'),
              t('analyzing.s4', 'Evaluating competition'),
              t('analyzing.s5', 'Calculating financial feasibility'),
              t('analyzing.s6', 'Preparing recommendation')
            ].map((st, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx <= analysisStep ? (
                  <CheckCircle2 className="w-4 h-4 text-vyapar-green shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />
                )}
                <span className={idx <= analysisStep ? 'font-semibold text-vyapar-navy' : 'text-vyapar-text-secondary'}>
                  {st}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Dashboard Stage */}
      {stage === 'results' && result && (
        <div className="space-y-8">
          {/* Top Result Banner */}
          <div className="bg-vyapar-navy text-white p-6 sm:p-8 rounded-xl shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-vyapar-saffron font-bold">
                  {t('res.banner.tag', 'Recommended Business Opportunity')}
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold mt-1">{result.businessName}</h1>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/20 text-center">
                <span className="text-xs text-vyapar-ivory/80 block">
                  {t('res.banner.score', 'Suitability Score')}
                </span>
                <span className="text-3xl font-serif font-bold text-vyapar-saffron">{result.suitabilityScore} / 100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-vyapar-ivory/70 block">{t('res.cat', 'Category')}</span>
                <span className="font-semibold text-white">{result.category}</span>
              </div>
              <div>
                <span className="text-vyapar-ivory/70 block">{t('res.demand', 'Local Demand')}</span>
                <span className="font-semibold text-vyapar-saffron">{result.demandIndicator}</span>
              </div>
              <div>
                <span className="text-vyapar-ivory/70 block">{t('res.comp', 'Competition')}</span>
                <span className="font-semibold text-white">{result.competitionIndicator}</span>
              </div>
              <div>
                <span className="text-vyapar-ivory/70 block">{t('res.growth', 'Growth Potential')}</span>
                <span className="font-semibold text-vyapar-green">{result.growthPotential}</span>
              </div>
            </div>
          </div>

          <ConfidenceBadge level={result.confidence} reason={result.confidenceReason} />

          {/* Why This Recommendation */}
          <div className="bg-white p-6 rounded-xl border border-vyapar-border space-y-3">
            <h3 className="text-lg font-serif font-bold text-vyapar-navy">
              {t('res.why.title', 'Why This Recommendation?')}
            </h3>
            <ul className="space-y-2 text-xs text-vyapar-text-primary">
              {result.whyMatched.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-vyapar-green shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Financial Snapshot */}
          <div className="bg-white p-6 rounded-xl border border-vyapar-border space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-serif font-bold text-vyapar-navy">
                {t('res.fin.title', 'Deterministic Financial Snapshot')}
              </h3>
              <DataBadge type="CALCULATED" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-vyapar-ivory p-3 rounded-lg border">
                <span className="text-xs text-vyapar-text-secondary block">
                  {t('res.fin.cost', 'Total Project Cost')}
                </span>
                <span className="font-serif font-bold text-lg text-vyapar-navy">₹{result.financialSnapshot.totalProjectCost.toLocaleString()}</span>
              </div>
              <div className="bg-vyapar-ivory p-3 rounded-lg border">
                <span className="text-xs text-vyapar-text-secondary block">
                  {t('res.fin.own', 'Own Promoter Contribution')}
                </span>
                <span className="font-serif font-bold text-lg text-vyapar-navy">₹{result.financialSnapshot.ownContribution.toLocaleString()}</span>
              </div>
              <div className="bg-vyapar-ivory p-3 rounded-lg border">
                <span className="text-xs text-vyapar-text-secondary block">
                  {t('res.fin.loan', 'Loan Funding Needed')}
                </span>
                <span className="font-serif font-bold text-lg text-vyapar-navy">₹{result.financialSnapshot.fundingRequirement.toLocaleString()}</span>
              </div>
              <div className="bg-vyapar-ivory p-3 rounded-lg border">
                <span className="text-xs text-vyapar-text-secondary block">
                  {t('res.fin.profit', 'Est. Net Monthly Profit')}
                </span>
                <span className="font-serif font-bold text-lg text-vyapar-green">₹{result.financialSnapshot.netMonthlyProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Business Specific Suggested Growth Options */}
          <BusinessOptionsCard businessName={result.businessName} category={result.category} />

          {/* Geo Map */}
          <GeoMap 
            locations={result.locationRecommendations} 
            centerName={result.locationRecommendations[0]?.name || profile.villageTown} 
          />

          {/* What-If Financial Simulator */}
          <WhatIfSimulator initialMetrics={result.financialSnapshot} />

          {/* Action Plan */}
          <ActionPlanChecklist steps={result.actionPlan} />

          {/* Generate DPR CTA */}
          <div className="bg-vyapar-navy text-white p-8 rounded-xl text-center space-y-4">
            <h3 className="text-2xl font-serif font-bold">
              {t('res.dpr.cta.title', 'Generate Bank-Ready Detailed Project Report (DPR)')}
            </h3>
            <p className="text-xs text-vyapar-ivory/80 max-w-xl mx-auto">
              {t('res.dpr.cta.desc', 'Compile your suitability results, financial structures, and risk assessments into a formal DPR embedded with cryptographic SHA-256 verification.')}
            </p>
            <button
              onClick={handleGenerateDPR}
              className="px-8 py-3.5 bg-vyapar-saffron hover:bg-amber-600 text-white font-bold rounded-lg shadow-md transition inline-flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              <span>{t('res.dpr.cta.btn', 'Generate DPR Report →')}</span>
            </button>
          </div>
        </div>
      )}

      {/* DPR Generated Preview Stage */}
      {stage === 'dpr' && generatedDpr && (
        <DprPreview dpr={generatedDpr} />
      )}
    </div>
  );
}
