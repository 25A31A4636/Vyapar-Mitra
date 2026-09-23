export type Language = 'EN' | 'TE' | 'HI' | 'TA' | 'KN';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'EN', name: 'English', nativeName: 'English' },
  { code: 'TE', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'TA', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'KN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav & Header
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.howItWorks': 'How It Works',
    'nav.impact': 'Impact',
    'nav.dashboard': 'My Dashboard',
    'nav.ask': 'Ask Vyapar Mitra',
    'nav.tagline': 'Smart Business Companion',
    'nav.reports': 'Reports',
    'nav.profile': 'Profile',
    'nav.assistant': 'Assistant',

    // Hero
    'hero.badge': 'Smart India Hackathon 2026 — SIH26091',
    'hero.title': 'Your Business. Your Opportunity. Your Growth.',
    'hero.subtitle': 'Intelligent guidance for rural entrepreneurs.',
    'hero.desc': 'Vyapar Mitra helps you make informed decisions about business opportunities, locations, markets, finances, and growth.',
    'hero.cta.start': 'Get Started →',
    'hero.cta.how': 'How It Works',

    // Category Grid
    'cat.heading': 'What are you looking to achieve?',
    'cat.subheading': 'Select your primary goal to begin tailored advisory',
    'cat.start.title': 'START',
    'cat.start.desc': 'Find an opportunity or start a business',
    'cat.plan.title': 'PLAN',
    'cat.plan.desc': 'Plan your location, market and investment',
    'cat.grow.title': 'GROW',
    'cat.grow.desc': 'Expand and improve your existing business',
    'cat.finance.title': 'FINANCE',
    'cat.finance.desc': 'Understand costs, funding and repayment',
    'cat.solve.title': 'SOLVE',
    'cat.solve.desc': 'Solve a specific business problem',
    'cat.select': 'Select Task',

    // Why Different
    'why.heading': 'Why Vyapar Mitra is Different',
    'why.subheading': 'Not a generic chat window. A structured analytical decision-support engine.',
    'why.f1.title': 'Smart Data Collection Engine',
    'why.f1.desc': 'Never shows generic endless forms. Dynamically asks minimum required questions, explains why information is needed, and allows "I don\'t know" or voice inputs.',
    'why.f2.title': 'Deterministic Financial Engine',
    'why.f2.desc': 'Financial costs, EMIs, break-even timelines, and profit projections are calculated using code and strict formulas, never hallucinated by an AI language model.',
    'why.f3.title': 'DPR & Cryptographic Verification',
    'why.f3.desc': 'Generates complete bankable Detailed Project Reports (DPR) embedded with SHA-256 integrity hashes and Micro-QR codes to prevent unauthorized document alteration.',

    // Impact
    'impact.heading': 'Impact Metrics',
    'impact.subheading': 'Intended outcomes for rural micro-entrepreneurs across India',
    'impact.m1': 'Entrepreneurs Assisted',
    'impact.m2': 'DPR Reports Generated',
    'impact.m3': 'Locations Analyzed',
    'impact.m4': 'Financial Plans Created',

    // Final CTA
    'cta.heading': 'Ready to make a smarter business decision?',
    'cta.sub': 'Tell Vyapar Mitra what you want to achieve. Move from business idea to verified informed decision in minutes.',
    'cta.btn': 'Get Started →',

    // Questionnaire
    'q.step': 'STEP',
    'q.of': 'OF',
    'q.completed': 'Completed',
    'q.savedProfile': 'Using your saved entrepreneur profile data',
    'q.editProfile': 'Edit Profile',
    'q.whyAsk': 'Why do we ask this?',
    'q.speak': '🎙 Speak instead',
    'q.photo': '📷 Upload Photo',
    'q.dontKnow': "I don't know",
    'q.back': 'Back',
    'q.continue': 'Continue',
    'q.analyze': 'Analyze Opportunity →',

    // Flow Questions
    'flow.q1.label': 'What business category are you interested in?',
    'flow.q1.why': 'Helps us analyze hyper-local demand and supply chains for your target category.',
    'flow.q1.opt1': 'Agri-Inputs & Seeds Store',
    'flow.q1.opt2': 'Kirana / Grocery Store',
    'flow.q1.opt3': 'Apparel & Readymade Garments',
    'flow.q1.opt4': 'Food & Snack Processing Unit',

    'flow.q2.label': 'How much starting capital do you have available?',
    'flow.q2.why': 'Used to calculate loan requirements and promoter margin needed.',

    'flow.q3.label': 'Where will your business be located?',
    'flow.q3.why': 'Used by our GIS engine to evaluate competitor density and market saturation.',

    'flow.q4.label': 'Do you have a shop or commercial space ready?',
    'flow.q4.opt1': 'Own commercial shop available',
    'flow.q4.opt2': 'Planning to rent a shop',
    'flow.q4.opt3': 'Home-based operation',

    'flow.q5.label': 'What is your desired net monthly income goal?',
    'flow.q5.opt1': '₹15,000 - ₹25,000 / mo',
    'flow.q5.opt2': '₹25,000 - ₹40,000 / mo',
    'flow.q5.opt3': '₹40,000+ / mo',

    // Analysis Screen
    'analyzing.title': 'Vyapar Mitra is analyzing your opportunity...',
    'analyzing.sub': 'Applying hyper-local GIS & deterministic financial engine',
    'analyzing.s1': 'Understanding your requirements',
    'analyzing.s2': 'Processing location information',
    'analyzing.s3': 'Checking market conditions',
    'analyzing.s4': 'Evaluating competition',
    'analyzing.s5': 'Calculating financial feasibility',
    'analyzing.s6': 'Preparing recommendation',

    // Results Dashboard
    'res.banner.tag': 'Recommended Business Opportunity',
    'res.banner.score': 'Suitability Score',
    'res.cat': 'Category',
    'res.demand': 'Local Demand',
    'res.comp': 'Competition',
    'res.growth': 'Growth Potential',
    'res.why.title': 'Why This Recommendation?',
    'res.fin.title': 'Deterministic Financial Snapshot',
    'res.fin.cost': 'Total Project Cost',
    'res.fin.own': 'Own Promoter Contribution',
    'res.fin.loan': 'Loan Funding Needed',
    'res.fin.profit': 'Est. Net Monthly Profit',
    'res.dpr.cta.title': 'Generate Bank-Ready Detailed Project Report (DPR)',
    'res.dpr.cta.desc': 'Compile your suitability results, financial structures, and risk assessments into a formal DPR embedded with cryptographic SHA-256 verification.',
    'res.dpr.cta.btn': 'Generate DPR Report →',

    // What-If
    'whatif.title': 'What-If Financial Simulator',
    'whatif.desc': 'Test sensitivity to market changes. All metrics update instantly via deterministic financial logic.',
    'whatif.best': 'Best Case',
    'whatif.expected': 'Expected',
    'whatif.worst': 'Worst Case',
    'whatif.revenue': 'Estimated Monthly Revenue',
    'whatif.rent': 'Monthly Shop Rent',
    'whatif.inv': 'Inventory & Raw Materials',
    'whatif.loan': 'Bank Loan Financing',
    'whatif.outcome': 'Simulated Financial Outcome',
    'whatif.netProfit': 'Monthly Net Profit',
    'whatif.emi': 'Estimated Monthly EMI',
    'whatif.totalExp': 'Total Operating Expenses:',
    'whatif.breakeven': 'Estimated Investment Recoup:',

    // Action Plan
    'action.title': 'What Should You Do Next?',
    'action.sub': 'Step-by-step roadmap to move from decision to execution.',
    'action.progress': 'Progress:',
    'action.reqInfo': 'Required info:',

    // Footer
    'footer.tagline': 'Your Intelligent Business Companion',
    'footer.desc': 'AI-driven hyper-local business advisory and financial structuring assistant for rural micro-entrepreneurs.',
    'footer.nav': 'Navigation',
    'footer.plat': 'Platform',
    'footer.hack': 'Hackathon Identity',
    'footer.ps': 'Problem Statement: SIH26091',
    'footer.copy': '© 2026 Vyapar Mitra 2.0 • Intelligent Decision Support System'
  },

  TE: {
    // Nav & Header
    'nav.home': 'హోమ్',
    'nav.explore': 'అన్వేషించండి',
    'nav.howItWorks': 'ఇది ఎలా పనిచేస్తుంది',
    'nav.impact': 'ప్రభావం',
    'nav.dashboard': 'నా డాష్‌బోర్డ్',
    'nav.ask': 'వ్యాపార మిత్రను అడగండి',
    'nav.tagline': 'మీ తెలివైన వ్యాపార సహచరుడు',
    'nav.reports': 'నివేదికలు',
    'nav.profile': 'ప్రొఫైల్',
    'nav.assistant': 'సహాయకుడు',

    // Hero
    'hero.badge': 'స్మార్ట్ ఇండియా హ్యాకథాన్ 2026 — SIH26091',
    'hero.title': 'మీ వ్యాపారం. మీ అవకాశం. మీ ప్రగతి.',
    'hero.subtitle': 'గ్రామీణ పారిశ్రామికవేత్తల కోసం తెలివైన మార్గదర్శకత్వం.',
    'hero.desc': 'వ్యాపార అవకాశాలు, స్థలాలు, మార్కెట్లు, ఆర్థిక అంశాలు మరియు వృద్ధిపై సరైన నిర్ణయాలు తీసుకోవడంలో వ్యాపార మిత్ర మీకు సహాయపడుతుంది.',
    'hero.cta.start': 'ప్రారంభించండి →',
    'hero.cta.how': 'ఇది ఎలా పనిచేస్తుంది',

    // Category Grid
    'cat.heading': 'మీరు ఏమి సాధించాలనుకుంటున్నారు?',
    'cat.subheading': 'మీకు అనుకూలమైన సలహాలు పొందడానికి మీ ప్రధాన లక్ష్యాన్ని ఎంచుకోండి',
    'cat.start.title': 'ప్రారంభం (START)',
    'cat.start.desc': 'వ్యాపార అవకాశాన్ని కనుగొనండి లేదా కొత్త వ్యాపారం ప్రారంభించండి',
    'cat.plan.title': 'ప్రణాళిక (PLAN)',
    'cat.plan.desc': 'మీ లొకేషన్, మార్కెట్ మరియు పెట్టుబడిని ప్లాన్ చేయండి',
    'cat.grow.title': 'వృద్ధి (GROW)',
    'cat.grow.desc': 'మీ వ్యాపారాన్ని విస్తరించండి మరియు లాభాలను పెంచుకోండి',
    'cat.finance.title': 'ఆర్థికం (FINANCE)',
    'cat.finance.desc': 'ఖర్చులు, ప్రభుత్వ పథకాలు మరియు రుణ చెల్లింపులను అర్థం చేసుకోండి',
    'cat.solve.title': 'పరిష్కారం (SOLVE)',
    'cat.solve.desc': 'మీ వ్యాపార సమస్యకు తక్షణ పరిష్కారం పొందండి',
    'cat.select': 'టాస్క్ ఎంచుకోండి',

    // Why Different
    'why.heading': 'వ్యాపార మిత్ర ఎందుకు ప్రత్యేకం?',
    'why.subheading': 'ఇది కేవలం చాట్ విండో కాదు. ఒక విశ్లేషణాత్మక వ్యాపార నిర్ణయ వేదిక.',
    'why.f1.title': 'స్మార్ట్ డేటా సేకరణ ఇంజిన్',
    'why.f1.desc': 'పెద్ద ఫారాలు చూపించదు. అవసరమైన ప్రశ్నలను మాత్రమే సులభంగా అడుగుతుంది. వాయిస్ మరియు "తెలియదు" ఎంపికలను అనుమతిస్తుంది.',
    'why.f2.title': 'కచ్చితమైన ఆర్థిక లెక్కల ఇంజిన్',
    'why.f2.desc': 'ప్రాజెక్ట్ ఖర్చు, EMI, లాభాలు మరియు బ్రేక్-ఈవెన్ కాలాలను కచ్చితమైన ఫార్ములాలతో లెక్కిస్తుంది. ఊహాజనిత తప్పులు ఉండవు.',
    'why.f3.title': 'DPR మరియు డిజిటల్ ధృవీకరణ',
    'why.f3.desc': 'బ్యాంకు లోన్ల కోసం ప్రాజెక్ట్ రిపోర్ట్ (DPR) ను SHA-256 సెక్యూరిటీ మరియు QR కోడ్‌తో తయారు చేస్తుంది.',

    // Impact
    'impact.heading': 'ప్రభావ గణాంకాలు',
    'impact.subheading': 'భారతదేశ గ్రామీణ పారిశ్రామికవేత్తల కోసం లక్ష్యాలు',
    'impact.m1': 'సహాయం పొందిన పారిశ్రామికవేత్తలు',
    'impact.m2': 'రూపొందించిన DPR నివేదికలు',
    'impact.m3': 'విశ్లేషించిన స్థలాలు',
    'impact.m4': 'ఆర్థిక ప్రణాళికలు',

    // Final CTA
    'cta.heading': 'సరైన వ్యాపార నిర్ణయం తీసుకోవడానికి సిద్ధంగా ఉన్నారా?',
    'cta.sub': 'వ్యాపార మిత్రకు మీ లక్ష్యాన్ని తెలియజేయండి. నిమిషాల్లో సరైన సమాచారంతో కూడిన నిర్ణయం తీసుకోండి.',
    'cta.btn': 'ప్రారంభించండి →',

    // Questionnaire
    'q.step': 'దశ',
    'q.of': '/',
    'q.completed': 'పూర్తయింది',
    'q.savedProfile': 'మీ సేవ్ చేసిన ప్రొఫైల్ వివరాలు ఉపయోగించబడుతున్నాయి',
    'q.editProfile': 'ప్రొఫైల్ సవరించండి',
    'q.whyAsk': 'ఈ ప్రశ్న ఎందుకు అడుగుతున్నాం?',
    'q.speak': '🎙 మాట్లాడండి',
    'q.photo': '📷 ఫోటో అప్‌లోడ్',
    'q.dontKnow': 'నాకు తెలియదు',
    'q.back': 'వెనుకకు',
    'q.continue': 'ముందుకు',
    'q.analyze': 'విశ్లేషించండి →',

    // Flow Questions
    'flow.q1.label': 'మీకు ఏ రంగంలో వ్యాపారం చేయాలనే ఆసక్తి ఉంది?',
    'flow.q1.why': 'మీ ప్రాంతంలో ఈ వ్యాపారానికి ఉన్న డిమాండ్‌ను విశ్లేషించడానికి ఇది ఉపయోగపడుతుంది.',
    'flow.q1.opt1': 'ఎరువులు, విత్తనాల దుకాణం',
    'flow.q1.opt2': 'కిరాణా / జనరల్ స్టోర్',
    'flow.q1.opt3': 'రెడీమేడ్ దుస్తుల వ్యాపారం',
    'flow.q1.opt4': 'ఆహార పదార్థాల తయారీ యూనిట్',

    'flow.q2.label': 'మీ వద్ద ప్రస్తుతం ఎంత పెట్టుబడి సిద్ధంగా ఉంది?',
    'flow.q2.why': 'మీకు ఎంత బ్యాంక్ లోన్ అవసరమో లెక్కించడానికి ఇది అవసరం.',

    'flow.q3.label': 'మీ వ్యాపారం ఎక్కడ ప్రారంభించాలనుకుంటున్నారు?',
    'flow.q3.why': 'పోటీదారుల వివరాలు మరియు జనాభా డిమాండ్‌ను మ్యాప్ చేయడానికి ఇది ఉపయోగిస్తాము.',

    'flow.q4.label': 'మీకు షాపు లేదా స్థలం సిద్ధంగా ఉందా?',
    'flow.q4.opt1': 'సొంత షాపు అందుబాటులో ఉంది',
    'flow.q4.opt2': 'అద్దెకు షాపు తీసుకోవాలని ప్లాన్ చేస్తున్నాను',
    'flow.q4.opt3': 'ఇంటి నుంచే నిర్వహిస్తాను',

    'flow.q5.label': 'నెలకు మీరు ఎంత నికర లాభం ఆశిస్తున్నారు?',
    'flow.q5.opt1': '₹15,000 - ₹25,000 / నెలకు',
    'flow.q5.opt2': '₹25,000 - ₹40,000 / నెలకు',
    'flow.q5.opt3': '₹40,000 కంటే ఎక్కువ / నెలకు',

    // Analysis Screen
    'analyzing.title': 'వ్యాపార మిత్ర మీ అవకాశాన్ని విశ్లేషిస్తోంది...',
    'analyzing.sub': 'స్థానిక మార్కెట్ మరియు ఆర్థిక ఫార్ములాల ద్వారా లెక్కిస్తోంది',
    'analyzing.s1': 'మీ అవసరాలను అర్థం చేసుకుంటోంది',
    'analyzing.s2': 'స్థల వివరాలను ప్రాసెస్ చేస్తోంది',
    'analyzing.s3': 'మార్కెట్ పరిస్థితులను తనిఖీ చేస్తోంది',
    'analyzing.s4': 'స్థానిక పోటీని లెక్కిస్తోంది',
    'analyzing.s5': 'ఆర్థిక సాధ్యాసాధ్యాలను లెక్కిస్తోంది',
    'analyzing.s6': 'సిఫార్సును సిద్ధం చేస్తోంది',

    // Results Dashboard
    'res.banner.tag': 'మీకు అనువైన ఉత్తమ వ్యాపార అవకాశం',
    'res.banner.score': 'అనుకూలత స్కోరు',
    'res.cat': 'వర్గం',
    'res.demand': 'స్థానిక డిమాండ్',
    'res.comp': 'పోటీ తీవ్రత',
    'res.growth': 'వృద్ధి సామర్థ్యం',
    'res.why.title': 'ఈ వ్యాపారమే ఎందుకు?',
    'res.fin.title': 'కచ్చితమైన ఆర్థిక అంచనాలు',
    'res.fin.cost': 'మొత్తం ప్రాజెక్ట్ ఖర్చు',
    'res.fin.own': 'మీ సొంత పెట్టుబడి',
    'res.fin.loan': 'అవసరమైన లోన్ మొత్తం',
    'res.fin.profit': 'అంచనా వేసిన నెలవారీ నికర లాభం',
    'res.dpr.cta.title': 'బ్యాంక్ ప్రాజెక్ట్ రిపోర్ట్ (DPR) రూపొందించండి',
    'res.dpr.cta.desc': 'బ్యాంక్ లోన్ కోసం అవసరమైన పూర్తి నివేదికను SHA-256 డిజిటల్ సెక్యూరిటీతో డౌన్‌లోడ్ చేసుకోండి.',
    'res.dpr.cta.btn': 'DPR నివేదిక రూపొందించండి →',

    // What-If
    'whatif.title': 'ఆర్థిక మార్పుల సిమ్యులేటర్ (What-If)',
    'whatif.desc': 'ఖర్చులు మరియు ఆదాయంలో మార్పుల ఆధారంగా లాభాలు ఎలా మారతాయో స్వయంగా పరీక్షించండి.',
    'whatif.best': 'ఉత్తమ పరిస్థితి',
    'whatif.expected': 'సాధారణ అంచనా',
    'whatif.worst': 'కష్టకాలం',
    'whatif.revenue': 'అంచనా వేసిన నెలవారీ అమ్మకాలు',
    'whatif.rent': 'షాపు అద్దె',
    'whatif.inv': 'సరుకులు / ముడి సరుకు ఖర్చు',
    'whatif.loan': 'బ్యాంక్ లోన్ మొత్తం',
    'whatif.outcome': 'ఆర్థిక ఫలితాలు',
    'whatif.netProfit': 'నెలవారీ నికర లాభం',
    'whatif.emi': 'అంచనా వేసిన నెలవారీ EMI',
    'whatif.totalExp': 'మొత్తం నిర్వహణ ఖర్చులు:',
    'whatif.breakeven': 'పెట్టుబడి రికవరీ సమయం:',

    // Action Plan
    'action.title': 'మీరు తరువాత ఏమి చేయాలి?',
    'action.sub': 'వ్యాపారాన్ని ప్రారంభించడానికి దశలవారీ కార్యాచరణ ప్రణాళిక.',
    'action.progress': 'పురోగతి:',
    'action.reqInfo': 'కావలసిన సమాచారం:',

    // Footer
    'footer.tagline': 'మీ తెలివైన వ్యాపార సహచరుడు',
    'footer.desc': 'గ్రామీణ సూక్ష్మ పారిశ్రామికవేత్తల కోసం AI ఆధారిత వ్యాపార సలహా మరియు ఆర్థిక ప్రణాళికా వేదిక.',
    'footer.nav': 'నావిగేషన్',
    'footer.plat': 'ప్లాట్‌ఫామ్',
    'footer.hack': 'హ్యాకథాన్ గుర్తింపు',
    'footer.ps': 'సమస్య ప్రకటన: SIH26091',
    'footer.copy': '© 2026 వ్యాపార మిత్ర 2.0 • స్మార్ట్ డెసిషన్ సపోర్ట్ సిస్టమ్'
  },

  HI: {
    // Nav & Header
    'nav.home': 'होम',
    'nav.explore': 'एक्सप्लोर करें',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.impact': 'प्रभाव',
    'nav.dashboard': 'मेरा डैशबोर्ड',
    'nav.ask': 'व्यापार मित्र से पूछें',
    'nav.tagline': 'आपका बुद्धिमान व्यावसायिक साथी',
    'nav.reports': 'रिपोर्ट्स',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.assistant': 'असिस्टेंट',

    // Hero
    'hero.badge': 'स्मार्ट इंडिया हैकाथॉन 2026 — SIH26091',
    'hero.title': 'आपका व्यवसाय। आपका अवसर। आपकी प्रगति।',
    'hero.subtitle': 'ग्रामीण उद्यमियों के लिए सटीक मार्गदर्शन।',
    'hero.desc': 'व्यापार मित्र आपको व्यावसायिक अवसरों, स्थानों, बाज़ारों, वित्त और विकास के बारे में सही और सुरक्षित निर्णय लेने में मदद करता है।',
    'hero.cta.start': 'शुरू करें →',
    'hero.cta.how': 'यह कैसे काम करता है',

    // Category Grid
    'cat.heading': 'आप क्या हासिल करना चाहते हैं?',
    'cat.subheading': 'अपनी आवश्यकता के अनुसार सही श्रेणी चुनें',
    'cat.start.title': 'शुरुआत (START)',
    'cat.start.desc': 'नया व्यवसाय खोजें या शुरू करें',
    'cat.plan.title': 'योजना (PLAN)',
    'cat.plan.desc': 'स्थान, बाज़ार और निवेश की योजना बनाएं',
    'cat.grow.title': 'विकास (GROW)',
    'cat.grow.desc': 'अपने मौजूदा व्यवसाय का विस्तार करें और मुनाफ़ा बढ़ाएं',
    'cat.finance.title': 'वित्त (FINANCE)',
    'cat.finance.desc': 'लागत, सरकारी योजनाएं और ऋण भुगतान समझें',
    'cat.solve.title': 'समाधान (SOLVE)',
    'cat.solve.desc': 'व्यावसायिक समस्याओं का सटीक समाधान पाएं',
    'cat.select': 'कार्य चुनें',

    // Why Different
    'why.heading': 'व्यापार मित्र क्यों अलग है?',
    'why.subheading': 'यह केवल एक चैटबॉट नहीं, बल्कि एक संपूर्ण निर्णय-सहायता प्रणाली है।',
    'why.f1.title': 'स्मार्ट डेटा कलेक्शन इंजन',
    'why.f1.desc': 'लंबे फॉर्म भरने की ज़रूरत नहीं। केवल आवश्यक सवाल पूछे जाते हैं। आवाज़ और "पता नहीं" के विकल्प भी उपलब्ध हैं।',
    'why.f2.title': 'सटीक वित्तीय गणना इंजन',
    'why.f2.desc': 'परियोजना लागत, ईएमआई, ब्रेक-ईवन और मुनाफे की गणना गणितीय फॉर्मूलों से होती है, एआई अनुमानों से नहीं।',
    'why.f3.title': 'डीपीआर और डिजिटल सत्यापन',
    'why.f3.desc': 'बैंक ऋण के लिए डीपीआर रिपोर्ट तैयार करें, जिसमें सुरक्षा के लिए SHA-256 हैश और माइक्रो-क्यूआर कोड शामिल है।',

    // Impact
    'impact.heading': 'प्रभाव के आंकड़े',
    'impact.subheading': 'ग्रामीण भारत के सूक्ष्म उद्यमियों के लिए निर्धारित लक्ष्य',
    'impact.m1': 'सहायता प्राप्त उद्यमी',
    'impact.m2': 'तैयार डीपीआर रिपोर्ट्स',
    'impact.m3': 'विश्लेषित स्थान',
    'impact.m4': 'वित्तीय योजनाएं',

    // Final CTA
    'cta.heading': 'क्या आप सही व्यावसायिक निर्णय लेने के लिए तैयार हैं?',
    'cta.sub': 'व्यापार मित्र को अपना लक्ष्य बताएं और कुछ ही मिनटों में सत्यापित योजना प्राप्त करें।',
    'cta.btn': 'शुरू करें →',

    // Questionnaire
    'q.step': 'चरण',
    'q.of': '/',
    'q.completed': 'पूर्ण',
    'q.savedProfile': 'आपकी सहेजी गई प्रोफ़ाइल जानकारी का उपयोग किया जा रहा है',
    'q.editProfile': 'प्रोफ़ाइल बदलें',
    'q.whyAsk': 'हम यह क्यों पूछते हैं?',
    'q.speak': '🎙 बोलकर बताएं',
    'q.photo': '📷 फोटो अपलोड करें',
    'q.dontKnow': 'मुझे नहीं पता',
    'q.back': 'पीछे',
    'q.continue': 'आगे बढ़ें',
    'q.analyze': 'अवसर का विश्लेषण करें →',

    // Flow Questions
    'flow.q1.label': 'आप किस प्रकार के व्यवसाय में रुचि रखते हैं?',
    'flow.q1.why': 'यह आपके क्षेत्र में इस श्रेणी की मांग और आपूर्ति को समझने में मदद करता है।',
    'flow.q1.opt1': 'कृषि-इनपुट एवं बीज भंडार',
    'flow.q1.opt2': 'किराना एवं जनरल स्टोर',
    'flow.q1.opt3': 'रेडीमेड गारमेंट्स एवं कपड़ा',
    'flow.q1.opt4': 'खाद्य एवं स्नैक प्रसंस्करण इकाई',

    'flow.q2.label': 'आपके पास कितनी शुरुआती पूंजी उपलब्ध है?',
    'flow.q2.why': 'इससे ऋण की आवश्यकता और स्वयं का योगदान तय किया जाता है।',

    'flow.q3.label': 'आपका व्यवसाय किस स्थान पर होगा?',
    'flow.q3.why': 'स्थान के अनुसार स्थानीय प्रतिस्पर्धा और बाज़ार का विश्लेषण करने के लिए।',

    'flow.q4.label': 'क्या आपके पास दुकान या व्यावसायिक स्थान तैयार है?',
    'flow.q4.opt1': 'अपनी दुकान उपलब्ध है',
    'flow.q4.opt2': 'किराए पर दुकान लेने की योजना है',
    'flow.q4.opt3': 'घर से ही संचालन करेंगे',

    'flow.q5.label': 'आपकी अपेक्षित मासिक शुद्ध आय कितनी है?',
    'flow.q5.opt1': '₹15,000 - ₹25,000 / माह',
    'flow.q5.opt2': '₹25,000 - ₹40,000 / माह',
    'flow.q5.opt3': '₹40,000 से अधिक / माह',

    // Analysis Screen
    'analyzing.title': 'व्यापार मित्र आपके अवसर का विश्लेषण कर रहा है...',
    'analyzing.sub': 'स्थानीय भौगोलिक डेटा और वित्तीय फॉर्मूलों का प्रयोग किया जा रहा है',
    'analyzing.s1': 'आपकी आवश्यकताओं को समझा जा रहा है',
    'analyzing.s2': 'स्थान की जानकारी प्रोसेस हो रही है',
    'analyzing.s3': 'बाज़ार की स्थितियों की जांच हो रही है',
    'analyzing.s4': 'स्थानीय प्रतिस्पर्धा का आकलन',
    'analyzing.s5': 'वित्तीय व्यवहार्यता की गणना',
    'analyzing.s6': 'सलाह और रिपोर्ट तैयार की जा रही है',

    // Results Dashboard
    'res.banner.tag': 'सुझाया गया व्यावसायिक अवसर',
    'res.banner.score': 'उपयुक्तता स्कोर',
    'res.cat': 'श्रेणी',
    'res.demand': 'स्थानीय मांग',
    'res.comp': 'प्रतिस्पर्धा',
    'res.growth': 'विकास क्षमता',
    'res.why.title': 'यही व्यवसाय क्यों?',
    'res.fin.title': 'सटीक वित्तीय विवरण',
    'res.fin.cost': 'कुल परियोजना लागत',
    'res.fin.own': 'स्वयं का निवेश (मार्जिन)',
    'res.fin.loan': 'आवश्यक बैंक ऋण',
    'res.fin.profit': 'अनुमानित मासिक शुद्ध लाभ',
    'res.dpr.cta.title': 'बैंक योग्य डीपीआर रिपोर्ट (DPR) तैयार करें',
    'res.dpr.cta.desc': 'बैंक ऋण के लिए संपूर्ण परियोजना रिपोर्ट SHA-256 क्रिप्टोग्राफिक सुरक्षा के साथ डाउनलोड करें।',
    'res.dpr.cta.btn': 'डीपीआर रिपोर्ट बनाएं →',

    // What-If
    'whatif.title': 'फाइनेंशियल सिम्युलेटर (What-If)',
    'whatif.desc': 'बाज़ार और खर्चों में बदलाव का मुनाफे पर असर तुरंत जांचें।',
    'whatif.best': 'सर्वोत्तम स्थिति',
    'whatif.expected': 'सामान्य स्थिति',
    'whatif.worst': 'कठिन स्थिति',
    'whatif.revenue': 'अनुमानित मासिक बिक्री',
    'whatif.rent': 'मासिक दुकान किराया',
    'whatif.inv': 'इन्वेंट्री एवं सामग्री लागत',
    'whatif.loan': 'बैंक ऋण राशि',
    'whatif.outcome': 'सिम्युलेटेड वित्तीय परिणाम',
    'whatif.netProfit': 'मासिक शुद्ध लाभ',
    'whatif.emi': 'अनुमानित मासिक ईएमआई',
    'whatif.totalExp': 'कुल संचालन खर्च:',
    'whatif.breakeven': 'निवेश वसूली समय:',

    // Action Plan
    'action.title': 'आगे आपको क्या करना चाहिए?',
    'action.sub': 'निर्णय से क्रियान्वयन तक की चरणबद्ध कार्य योजना।',
    'action.progress': 'प्रगति:',
    'action.reqInfo': 'आवश्यक जानकारी:',

    // Footer
    'footer.tagline': 'आपका बुद्धिमान व्यावसायिक साथी',
    'footer.desc': 'ग्रामीण सूक्ष्म उद्यमियों के लिए एआई-संचालित हाइपर-लोकल व्यापार सलाह एवं वित्तीय संरचना मंच।',
    'footer.nav': 'नेविगेशन',
    'footer.plat': 'प्लेटफ़ॉर्म',
    'footer.hack': 'हैकाथॉन पहचान',
    'footer.ps': 'समस्या विवरण: SIH26091',
    'footer.copy': '© 2026 व्यापार मित्र 2.0 • इंटेलिजेंट डिसीजन सपोर्ट सिस्टम'
  },

  TA: {
    // Nav & Header
    'nav.home': 'முகப்பு',
    'nav.explore': 'ஆராயுங்கள்',
    'nav.howItWorks': 'செயல்படும் முறை',
    'nav.impact': 'தாக்கம்',
    'nav.dashboard': 'என் டாஷ்போர்டு',
    'nav.ask': 'வியாபார் மித்ராவிடம் கேளுங்கள்',
    'nav.tagline': 'உங்கள் புத்திசாலி வணிகத் தோழன்',
    'nav.reports': 'அறிக்கைகள்',
    'nav.profile': 'சுயவிவரம்',
    'nav.assistant': 'உதவியாளர்',

    // Hero
    'hero.badge': 'ஸ்மார்ட் இந்தியா ஹேக்கத்தான் 2026 — SIH26091',
    'hero.title': 'உங்கள் தொழில். உங்கள் வாய்ப்பு. உங்கள் வளர்ச்சி.',
    'hero.subtitle': 'கிராமப்புற தொழில்முனைவோருக்கான வழிகாட்டுதல்.',
    'hero.desc': 'வியாபார வாய்ப்புகள், இருப்பிடங்கள், நிதி மற்றும் வளர்ச்சி குறித்து தகவலறிந்த முடிவுகளை எடுக்க வியாபார் மித்ரா உதவுகிறது.',
    'hero.cta.start': 'தொடங்குங்கள் →',
    'hero.cta.how': 'செயல்படும் முறை',

    // Category Grid
    'cat.heading': 'நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?',
    'cat.subheading': 'உங்கள் இலக்கைத் தேர்ந்தெடுத்து ஆலோசனையைப் பெறுங்கள்',
    'cat.start.title': 'தொடக்கம் (START)',
    'cat.start.desc': 'புதிய தொழிலைத் தொடங்கவும் அல்லது வாய்ப்பைக் கண்டறியவும்',
    'cat.plan.title': 'திட்டம் (PLAN)',
    'cat.plan.desc': 'இருப்பிடம், சந்தை மற்றும் முதலீட்டைத் திட்டமிடுங்கள்',
    'cat.grow.title': 'வளர்ச்சி (GROW)',
    'cat.grow.desc': 'உங்கள் வணிகத்தை விரிவுபடுத்தி லாபத்தை அதிகரிக்கவும்',
    'cat.finance.title': 'நிதி (FINANCE)',
    'cat.finance.desc': 'செலவுகள், அரசு திட்டங்கள் மற்றும் கடன் திருப்பிச் செலுத்துதலைப் புரிந்து கொள்ளுங்கள்',
    'cat.solve.title': 'தீர்வு (SOLVE)',
    'cat.solve.desc': 'வணிகப் பிரச்சினைகளுக்கு உடனடித் தீர்வு காணுங்கள்',
    'cat.select': 'தேர்வு செய்க',

    // Why Different
    'why.heading': 'வியாபார் மித்ரா ஏன் தனித்துவமானது?',
    'why.subheading': 'இது வெறும் சாட்பாட் அல்ல, ஒரு முழுமையான வணிக முடிவு ஆதரவு தளம்.',
    'why.f1.title': 'ஸ்மார்ட் தரவு சேகரிப்பு',
    'why.f1.desc': 'நீண்ட படிவங்கள் இல்லை. குறைந்தபட்ச கேள்விகள் மட்டுமே. குரல் மற்றும் "தெரியாது" விருப்பங்களும் உண்டு.',
    'why.f2.title': 'துல்லியமான நிதி கணக்கீடுகள்',
    'why.f2.desc': 'திட்டச் செலவு, EMI மற்றும் லாபக் கணக்கீடுகள் நேரடி சூத்திரங்கள் மூலம் துல்லியமாக செய்யப்படுகின்றன.',
    'why.f3.title': 'DPR மற்றும் பாதுகாப்பு சரிபார்ப்பு',
    'why.f3.desc': 'வங்கி கடன்களுக்காக SHA-256 மற்றும் QR குறியீட்டுடன் கூடிய விரிவான திட்ட அறிக்கை (DPR).',

    // Impact
    'impact.heading': 'தாக்க அளவீடுகள்',
    'impact.subheading': 'கிராமப்புற தொழில்முனைவோருக்கான இலக்குகள்',
    'impact.m1': 'உதவி பெற்ற தொழில்முனைவோர்',
    'impact.m2': 'உருவாக்கப்பட்ட DPR அறிக்கைகள்',
    'impact.m3': 'ஆய்வு செய்யப்பட்ட பகுதிகள்',
    'impact.m4': 'நிதித் திட்டங்கள்',

    // Final CTA
    'cta.heading': 'சரியான வணிக முடிவை எடுக்கத் தயாரா?',
    'cta.sub': 'உங்கள் இலக்கை வியாபார் மித்ராவிடம் கூறி சில நிமிடங்களில் முடிவெடுங்கள்.',
    'cta.btn': 'தொடங்குங்கள் →',

    // Questionnaire
    'q.step': 'படி',
    'q.of': '/',
    'q.completed': 'முடிந்தது',
    'q.savedProfile': 'உங்கள் சேமிக்கப்பட்ட விவரங்கள் பயன்படுத்தப்படுகின்றன',
    'q.editProfile': 'சுயவிவரம் மாற்று',
    'q.whyAsk': 'இதை ஏன் கேட்கிறோம்?',
    'q.speak': '🎙 பேசவும்',
    'q.photo': '📷 புகைப்படம் பதிவேற்று',
    'q.dontKnow': 'எனக்குத் தெரியாது',
    'q.back': 'பின்செல்',
    'q.continue': 'தொடர்க',
    'q.analyze': 'ஆய்வு செய் →',

    // Flow Questions
    'flow.q1.label': 'எந்த வகையான தொழிலில் ஆர்வம் உள்ளது?',
    'flow.q1.why': 'உங்கள் பகுதியில் உள்ள தேவையை அறிய உதவுகிறது.',
    'flow.q1.opt1': 'விவசாய விதைகள் மற்றும் உரங்கள்',
    'flow.q1.opt2': 'மளிகைக் கடை (கிரானா)',
    'flow.q1.opt3': 'ஆடை மற்றும் ஜவுளி வியாபாரம்',
    'flow.q1.opt4': 'உணவு பதப்படுத்தும் அலகு',

    'flow.q2.label': 'உங்களிடம் உள்ள ஆரம்ப மூலதனம் எவ்வளவு?',
    'flow.q2.why': 'கடன் தேவையை கணக்கிட இது அவசியம்.',

    'flow.q3.label': 'உங்கள் தொழில் எங்கு அமையவுள்ளது?',
    'flow.q3.why': 'போட்டியாளர்கள் மற்றும் மக்கள் அடர்த்தியை அறிய உதவுகிறது.',

    'flow.q4.label': 'உங்களிடம் கடை அல்லது இடம் தயாராக உள்ளதா?',
    'flow.q4.opt1': 'சொந்தக் கடை உள்ளது',
    'flow.q4.opt2': 'வாடகைக்கு எடுக்கத் திட்டம்',
    'flow.q4.opt3': 'வீட்டிலிருந்தே இயங்கும்',

    'flow.q5.label': 'நீங்கள் எதிர்பார்க்கும் மாதாந்திர நிகர லாபம் எவ்வளவு?',
    'flow.q5.opt1': '₹15,000 - ₹25,000 / மாதம்',
    'flow.q5.opt2': '₹25,000 - ₹40,000 / மாதம்',
    'flow.q5.opt3': '₹40,000 க்கு மேல் / மாதம்',

    // Analysis Screen
    'analyzing.title': 'வியாபார் மித்ரா ஆய்வு செய்கிறது...',
    'analyzing.sub': 'உள்ளூர் வரைபட தரவு மற்றும் நிதி சூத்திரங்களைப் பயன்படுத்துகிறது',
    'analyzing.s1': 'தேவைகளைப் புரிந்து கொள்கிறது',
    'analyzing.s2': 'இருப்பிடத் தகவலைச் செயலாக்குகிறது',
    'analyzing.s3': 'சந்தை நிலவரங்களைச் சரிபார்க்கிறது',
    'analyzing.s4': 'போட்டி அளவை மதிப்பிடுகிறது',
    'analyzing.s5': 'நிதிச் சாத்தியக்கூறுகளைக் கணக்கிடுகிறது',
    'analyzing.s6': 'பரிந்துரையைத் தயாரிக்கிறது',

    // Results Dashboard
    'res.banner.tag': 'பரிந்துரைக்கப்பட்ட தொழில் வாய்ப்பு',
    'res.banner.score': 'பொருத்தம் மதிப்பெண்',
    'res.cat': 'வகை',
    'res.demand': 'உள்ளூர் தேவை',
    'res.comp': 'போட்டி',
    'res.growth': 'வளர்ச்சி சாத்தியம்',
    'res.why.title': 'இந்த வணிகம் ஏன்?',
    'res.fin.title': 'துல்லியமான நிதி விவரம்',
    'res.fin.cost': 'மொத்த திட்டச் செலவு',
    'res.fin.own': 'உங்கள் சொந்த முதலீடு',
    'res.fin.loan': 'தேவைப்படும் கடன்',
    'res.fin.profit': 'மதிப்பிடப்பட்ட மாதாந்திர லாபம்',
    'res.dpr.cta.title': 'வங்கி திட்ட அறிக்கை (DPR) தயாரிக்கவும்',
    'res.dpr.cta.desc': 'கடன் பெறத் தேவையான விரிவான அறிக்கையை SHA-256 பாதுகாப்புடன் பதிவிறக்கவும்.',
    'res.dpr.cta.btn': 'DPR அறிக்கை உருவாக்கவும் →',

    // What-If
    'whatif.title': 'நிதி சிமுலேட்டர் (What-If)',
    'whatif.desc': 'செலவு மற்றும் வருவாய் மாற்றங்களை சோதித்துப் பாருங்கள்.',
    'whatif.best': 'சிறந்த நிலை',
    'whatif.expected': 'எதிர்பார்க்கப்படும் நிலை',
    'whatif.worst': 'மோசமான நிலை',
    'whatif.revenue': 'மாதாந்திர விற்பனை',
    'whatif.rent': 'கடை வாடகை',
    'whatif.inv': 'பொருட்கள் செலவு',
    'whatif.loan': 'கடன் தொகை',
    'whatif.outcome': 'முடிவுகள்',
    'whatif.netProfit': 'நிகர லாபம்',
    'whatif.emi': 'மாதாந்திர EMI',
    'whatif.totalExp': 'மொத்த செலவுகள்:',
    'whatif.breakeven': 'முதலீடு திரும்பப் பெறும் காலம்:',

    // Action Plan
    'action.title': 'அடுத்து என்ன செய்ய வேண்டும்?',
    'action.sub': 'தொழிலை தொடங்குவதற்கான படிநிலைகள்.',
    'action.progress': 'முன்னேற்றம்:',
    'action.reqInfo': 'தேவையான தகவல்:',

    // Footer
    'footer.tagline': 'உங்கள் புத்திசாலி வணிகத் தோழன்',
    'footer.desc': 'கிராமப்புற தொழில்முனைவோருக்கான AI வணிக ஆலோசனை மற்றும் நிதித் திட்டமிடல் தளம்.',
    'footer.nav': 'வழிகாட்டல்',
    'footer.plat': 'தளம்',
    'footer.hack': 'ஹேக்கத்தான் அடையாளம்',
    'footer.ps': 'பிரச்சினை குறியீடு: SIH26091',
    'footer.copy': '© 2026 வியாபார் மித்ரா 2.0'
  },

  KN: {
    // Nav & Header
    'nav.home': 'ಮುಖಪುಟ',
    'nav.explore': 'ಅನ್ವೇಷಿಸಿ',
    'nav.howItWorks': 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    'nav.impact': 'ಪ್ರಭಾವ',
    'nav.dashboard': 'ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.ask': 'ವ್ಯಾಪಾರ ಮಿತ್ರನನ್ನು ಕೇಳಿ',
    'nav.tagline': 'ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ವ್ಯಾಪಾರ ಒಡನಾಡಿ',
    'nav.reports': 'ವರದಿಗಳು',
    'nav.profile': 'ಪ್ರೊಫೈಲ್',
    'nav.assistant': 'ಸಹಾಯಕ',

    // Hero
    'hero.badge': 'ಸ್ಮಾರ್ಟ್ ಇಂಡಿಯಾ ಹ್ಯಾಕಥಾನ್ 2026 — SIH26091',
    'hero.title': 'ನಿಮ್ಮ ವ್ಯಾಪಾರ. ನಿಮ್ಮ ಅವಕಾಶ. ನಿಮ್ಮ ಬೆಳವಣಿಗೆ.',
    'hero.subtitle': 'ಗ್ರಾಮೀಣ ಉದ್ಯಮಿಗಳಿಗೆ ನಿಖರ ಮಾರ್ಗದರ್ಶನ.',
    'hero.desc': 'ವ್ಯಾಪಾರ ಅವಕಾಶಗಳು, ಸ್ಥಳಗಳು, ಮಾರುಕಟ್ಟೆಗಳು மற்றும் ಹಣಕಾಸಿನ ಬಗ್ಗೆ ಸರಿಯಾದ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ವ್ಯಾಪಾರ ಮಿತ್ರ ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    'hero.cta.start': 'ಪ್ರಾರಂಭಿಸಿ →',
    'hero.cta.how': 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',

    // Category Grid
    'cat.heading': 'ನೀವು ಏನನ್ನು ಸಾಧಿಸಲು ಬಯಸುತ್ತೀರಿ?',
    'cat.subheading': 'ನಿಮ್ಮ ಗುರಿಯನ್ನು ಆರಿಸಿ ಸೂಕ್ತ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ',
    'cat.start.title': 'ಆರಂಭ (START)',
    'cat.start.desc': 'ಹೊಸ ವ್ಯಾಪಾರ ಅವಕಾಶವನ್ನು ಕಂಡುಕೊಳ್ಳಿ ಅಥವಾ ಪ್ರಾರಂಭಿಸಿ',
    'cat.plan.title': 'ಯೋಜನೆ (PLAN)',
    'cat.plan.desc': 'ಸ್ಥಳ, ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಹೂಡಿಕೆಯನ್ನು ಯೋಜಿಸಿ',
    'cat.grow.title': 'ಬೆಳವಣಿಗೆ (GROW)',
    'cat.grow.desc': 'ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ವಿಸ್ತರಿಸಿ ಲಾಭವನ್ನು ಹೆಚ್ಚಿಸಿ',
    'cat.finance.title': 'ಹಣಕಾಸು (FINANCE)',
    'cat.finance.desc': 'ವೆಚ್ಚಗಳು, ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸಾಲ ಮರುಪಾವತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
    'cat.solve.title': 'ಪರಿಹಾರ (SOLVE)',
    'cat.solve.desc': 'ವ್ಯಾಪಾರದ ಸಮಸ್ಯೆಗಳಿಗೆ ತಕ್ಷಣ ಪರಿಹಾರ ಕಂಡುಕೊಳ್ಳಿ',
    'cat.select': 'ಕಾರ್ಯ ಆರಿಸಿ',

    // Why Different
    'why.heading': 'ವ್ಯಾಪಾರ ಮಿತ್ರ ಏಕೆ ವಿಶಿಷ್ಟ?',
    'why.subheading': 'ಇದು ಕೇವಲ ಚಾಟ್‌ಬಾಟ್ ಅಲ್ಲ, ಸಮಗ್ರ ವ್ಯಾಪಾರ ನಿರ್ಧಾರ ವೇದಿಕೆ.',
    'why.f1.title': 'ಸ್ಮಾರ್ಟ್ ಡೇಟಾ ಸಂಗ್ರಹಣೆ',
    'why.f1.desc': 'ದೊಡ್ಡ ಫಾರ್ಮ್‌ಗಳಿಲ್ಲ. ಅಗತ್ಯ ಪ್ರಶ್ನೆಗಳನ್ನು ಮಾತ್ರ ಕೇಳುತ್ತದೆ. ಧ್ವನಿ ಮತ್ತು "ಗೊತ್ತಿಲ್ಲ" ಆಯ್ಕೆಗಳು ಲಭ್ಯವಿದೆ.',
    'why.f2.title': 'ನಿಖರ ಹಣಕಾಸು ಲೆಕ್ಕಾಚಾರ',
    'why.f2.desc': 'ಯೋಜನಾ ವೆಚ್ಚ, EMI ಮತ್ತು ಲಾಭದ ಲೆಕ್ಕಾಚಾರಗಳು ನಿಖರ ಗಣಿತ ಸೂತ್ರಗಳ ಮೂಲಕ ನಡೆಯುತ್ತವೆ.',
    'why.f3.title': 'DPR ಮತ್ತು ಡಿಜಿಟಲ್ ಪರಿಶೀಲನೆ',
    'why.f3.desc': 'ಬ್ಯಾಂಕ್ ಸಾಲಕ್ಕಾಗಿ SHA-256 ಮತ್ತು QR ಕೋಡ್ ಹೊಂದಿರುವ ಸಮಗ್ರ ಯೋಜನಾ ವರದಿ (DPR).',

    // Impact
    'impact.heading': 'ಪ್ರಭಾವದ ಅಂಕಿಅಂಶಗಳು',
    'impact.subheading': 'ಗ್ರಾಮೀಣ ಉದ್ಯಮಿಗಳಿಗಾಗಿ ಗುರಿಗಳು',
    'impact.m1': 'ಸಹಾಯ ಪಡೆದ ಉದ್ಯಮಿಗಳು',
    'impact.m2': 'ರಚಿಸಲಾದ DPR ವರದಿಗಳು',
    'impact.m3': 'ವಿಶ್ಲೇಷಿಸಿದ ಸ್ಥಳಗಳು',
    'impact.m4': 'ಹಣಕಾಸು ಯೋಜನೆಗಳು',

    // Final CTA
    'cta.heading': 'ಸರಿಯಾದ ವ್ಯಾಪಾರ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    'cta.sub': 'ವ್ಯಾಪಾರ ಮಿತ್ರನಿಗೆ ನಿಮ್ಮ ಗುರಿಯನ್ನು ತಿಳಿಸಿ ಮತ್ತು ನಿಮಿಷಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿದ ಯೋಜನೆಯನ್ನು ಪಡೆಯಿರಿ.',
    'cta.btn': 'ಪ್ರಾರಂಭಿಸಿ →',

    // Questionnaire
    'q.step': 'ಹಂತ',
    'q.of': '/',
    'q.completed': 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    'q.savedProfile': 'ಉಳಿಸಿದ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿಯನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ',
    'q.editProfile': 'ಪ್ರೊಫೈಲ್ ತಿದ್ದುಪಡಿ',
    'q.whyAsk': 'ಇದನ್ನು ಏಕೆ ಕೇಳುತ್ತೇವೆ?',
    'q.speak': '🎙 ಮಾತನಾಡಿ',
    'q.photo': '📷 ಫೋಟೋ ಅಪ್ಲೋಡ್',
    'q.dontKnow': 'ನನಗೆ ಗೊತ್ತಿಲ್ಲ',
    'q.back': 'ಹಿಂದೆ',
    'q.continue': 'ಮುಂದೆ',
    'q.analyze': 'ವಿಶ್ಲೇಷಿಸಿ →',

    // Flow Questions
    'flow.q1.label': 'ಯಾವ ವ್ಯಾಪಾರದಲ್ಲಿ ಆಸಕ್ತಿಯಿದೆ?',
    'flow.q1.why': 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿನ ಬೇಡಿಕೆಯನ್ನು ತಿಳಿಯಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    'flow.q1.opt1': 'ಕೃಷಿ ಪರಿಕರಗಳು ಮತ್ತು ಬೀಜಗಳ ಮಳಿಗೆ',
    'flow.q1.opt2': 'ಕಿರಾಣಿ / ಜನರಲ್ ಸ್ಟೋರ್',
    'flow.q1.opt3': 'ರೆಡಿಮೇಡ್ ಬಟ್ಟೆ ಅಂಗಡಿ',
    'flow.q1.opt4': 'ಆಹಾರ ಮತ್ತು ತಿಂಡಿ ಸಂಸ್ಕರಣಾ ಘಟಕ',

    'flow.q2.label': 'ನಿಮ್ಮ ಬಳಿ ಎಷ್ಟು ಆರಂಭಿಕ ಬಂಡವಾಳವಿದೆ?',
    'flow.q2.why': 'ಸಾಲದ ಅಗತ್ಯವನ್ನು ಲೆಕ್ಕಹಾಕಲು ಇದು ಅಗತ್ಯವಿದೆ.',

    'flow.q3.label': 'ನಿಮ್ಮ ವ್ಯಾಪಾರ ಎಲ್ಲಿ ಪ್ರಾರಂಭವಾಗಲಿದೆ?',
    'flow.q3.why': 'ಸ್ಪರ್ಧಿಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲು.',

    'flow.q4.label': 'ನಿಮ್ಮ ಬಳಿ ಮಳಿಗೆ ಅಥವಾ ಜಾಗ ಸಿದ್ಧವಾಗಿದೆಯೇ?',
    'flow.q4.opt1': 'ಸ್ವಂತ ಮಳಿಗೆ ಲಭ್ಯವಿದೆ',
    'flow.q4.opt2': 'ಬಾಡಿಗೆಗೆ ತೆಗೆದುಕೊಳ್ಳುವ ಯೋಜನೆ ಇದೆ',
    'flow.q4.opt3': 'ಮನೆಯಿಂದಲೇ ನಿರ್ವಹಣೆ',

    'flow.q5.label': 'ನೀವು ನಿರೀಕ್ಷಿಸುವ ಮಾಸಿಕ ನಿವ್ವಳ ಆದಾಯ ಎಷ್ಟು?',
    'flow.q5.opt1': '₹15,000 - ₹25,000 / ತಿಂಗಳಿಗೆ',
    'flow.q5.opt2': '₹25,000 - ₹40,000 / ತಿಂಗಳಿಗೆ',
    'flow.q5.opt3': '₹40,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು / ತಿಂಗಳಿಗೆ',

    // Analysis Screen
    'analyzing.title': 'ವ್ಯಾಪಾರ ಮಿತ್ರ ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...',
    'analyzing.sub': 'ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಹಣಕಾಸು ಸೂತ್ರಗಳನ್ನು ಅನ್ವಯಿಸಲಾಗುತ್ತಿದೆ',
    'analyzing.s1': 'ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ',
    'analyzing.s2': 'ಸ್ಥಳದ ಮಾಹಿತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ',
    'analyzing.s3': 'ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಗಳ ಪರಿಶೀಲನೆ',
    'analyzing.s4': 'ಸ್ಪರ್ಧೆಯ ಮಟ್ಟವನ್ನು ಅಳೆಯಲಾಗುತ್ತಿದೆ',
    'analyzing.s5': 'ಹಣಕಾಸು ಕಾರ್ಯಸಾಧ್ಯತೆ ಲೆಕ್ಕಾಚಾರ',
    'analyzing.s6': 'ಶಿಫಾರಸು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ',

    // Results Dashboard
    'res.banner.tag': 'ಸೂಕ್ತ ವ್ಯಾಪಾರ ಅವಕಾಶ',
    'res.banner.score': 'ಹೊಂದಾಣಿಕೆ ಅಂಕ',
    'res.cat': 'ವರ್ಗ',
    'res.demand': 'ಸ್ಥಳೀಯ ಬೇಡಿಕೆ',
    'res.comp': 'ಸ್ಪರ್ಧೆ',
    'res.growth': 'ಬೆಳವಣಿಗೆ ಸಾಮರ್ಥ್ಯ',
    'res.why.title': 'ಈ ವ್ಯಾಪಾರವನ್ನೇ ಏಕೆ ಆರಿಸಬೇಕು?',
    'res.fin.title': 'ನಿಖರ ಹಣಕಾಸು ವಿವರ',
    'res.fin.cost': 'ಒಟ್ಟು ಯೋಜನಾ ವೆಚ್ಚ',
    'res.fin.own': 'ನಿಮ್ಮ ಸ್ವಂತ ಹೂಡಿಕೆ',
    'res.fin.loan': 'ಅಗತ್ಯವಿರುವ ಸಾಲ',
    'res.fin.profit': 'ಅಂದಾಜು ಮಾಸಿಕ ನಿವ್ವಳ ಲಾಭ',
    'res.dpr.cta.title': 'ಬ್ಯಾಂಕ್ ಯೋಜನಾ ವರದಿ (DPR) ಸಿದ್ಧಪಡಿಸಿ',
    'res.dpr.cta.desc': 'ಸಾಲ ಪಡೆಯಲು SHA-256 ಭದ್ರತೆ ಹೊಂದಿರುವ ಸಂಪೂರ್ಣ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
    'res.dpr.cta.btn': 'DPR ವರದಿ ರಚಿಸಿ →',

    // What-If
    'whatif.title': 'ಹಣಕಾಸು ಸಿಮ್ಯುಲೇಟರ್ (What-If)',
    'whatif.desc': 'ಖರ್ಚು ಮತ್ತು ಆದಾಯದ ಬದಲಾವಣೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ.',
    'whatif.best': 'ಉತ್ತಮ ಸ್ಥಿತಿ',
    'whatif.expected': 'ಸಾಮಾನ್ಯ ಸ್ಥಿತಿ',
    'whatif.worst': 'ಕಷ್ಟದ ಸ್ಥಿತಿ',
    'whatif.revenue': 'ಅಂದಾಜು ಮಾಸಿಕ ಮಾರಾಟ',
    'whatif.rent': 'ಮಳಿಗೆ ಬಾಡಿಗೆ',
    'whatif.inv': 'ಸರಕು ಮತ್ತು ಕಚ್ಚಾ ವಸ್ತುಗಳ ವೆಚ್ಚ',
    'whatif.loan': 'ಬ್ಯಾಂಕ್ ಸಾಲದ ಮೊತ್ತ',
    'whatif.outcome': 'ಫಲಿತಾಂಶಗಳು',
    'whatif.netProfit': 'ಮಾಸಿಕ ನಿವ್ವಳ ಲಾಭ',
    'whatif.emi': 'ಅಂದಾಜು ಮಾಸಿಕ EMI',
    'whatif.totalExp': 'ಒಟ್ಟು ನಿರ್ವಹಣಾ ವೆಚ್ಚಗಳು:',
    'whatif.breakeven': 'ಹೂಡಿಕೆ ಮರುಪಡೆಯುವಿಕೆ ಅವಧಿ:',

    // Action Plan
    'action.title': 'ಮುಂದೆ ನೀವು ಏನು ಮಾಡಬೇಕು?',
    'action.sub': 'ವ್ಯಾಪಾರ ಪ್ರಾರಂಭಿಸಲು ಹಂತ-ಹಂತದ ಕ್ರಿಯಾ ಯೋಜನೆ.',
    'action.progress': 'ಪ್ರಗತಿ:',
    'action.reqInfo': 'ಅಗತ್ಯ ಮಾಹಿತಿ:',

    // Footer
    'footer.tagline': 'ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ವ್ಯಾಪಾರ ಒಡನಾಡಿ',
    'footer.desc': 'ಗ್ರಾಮೀಣ ಉದ್ಯಮಿಗಳಿಗಾಗಿ AI ಆಧಾರಿತ ವ್ಯಾಪಾರ ಸಲಹಾ ಮತ್ತು ಹಣಕಾಸು ಯೋಜನೆ ವೇದಿಕೆ.',
    'footer.nav': 'ನ್ಯಾವಿಗೇಷನ್',
    'footer.plat': 'ವೇದಿಕೆ',
    'footer.hack': 'ಹ್ಯಾಕಥಾನ್ ಗುರುತು',
    'footer.ps': 'ಸಮಸ್ಯೆ ಹೇಳಿಕೆ: SIH26091',
    'footer.copy': '© 2026 ವ್ಯಾಪಾರ ಮಿತ್ರ 2.0'
  }
};
