import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SmartQuestionnaire } from '../components/SmartQuestionnaire';
import { GeoMap } from '../components/GeoMap';
import { DataBadge } from '../components/DataBadges';
import type { QuestionField, LocationPoint } from '../types';
import { CheckCircle2, ArrowRight, RefreshCw, Calculator, MapPin, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TaskRunnerPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { profile } = useApp();

  const [completed, setCompleted] = useState(false);
  const [taskAnswers, setTaskAnswers] = useState<Record<string, any>>({});

  const getQuestions = (id?: string): { title: string; subtitle: string; questions: QuestionField[] } => {
    switch(id) {
      case '3':
        return {
          title: 'Build a New Brand',
          subtitle: 'Generate brand positioning, name ideas, and customer attraction strategies.',
          questions: [
            { id: 'bizType', label: 'What type of business are you building?', type: 'text', required: true, defaultValue: 'Electrical Shop', placeholder: 'e.g. Electrical Shop, Kirana, Boutique...' },
            { id: 'targetAudience', label: 'Primary Target Audience', type: 'select', required: true, options: [{ label: 'Local Village Households', value: 'households' }, { label: 'Farmers & Agri-contractors', value: 'farmers' }, { label: 'Electricians & Builders', value: 'contractors' }, { label: 'Youth & Professionals', value: 'youth' }] },
            { id: 'location', label: 'Business Location', type: 'text', required: true, defaultValue: `${profile.villageTown}, ${profile.district}` }
          ]
        };
      case '4':
        return {
          title: 'Find the Best Location',
          subtitle: 'Evaluate 5km GIS spatial mapping and zone suitability for your specific business.',
          questions: [
            { id: 'bizType', label: 'What type of business are you setting up?', type: 'text', required: true, defaultValue: 'Electrical Shop', placeholder: 'e.g. Electrical Shop, Kirana, Bakery...' },
            { id: 'location', label: 'City / Town / Village Name', type: 'text', required: true, defaultValue: `${profile.villageTown}, ${profile.district}` },
            { id: 'radius', label: 'Target Search Radius (km)', type: 'slider', min: 1, max: 15, required: true, defaultValue: 5, unit: 'km' },
            { id: 'rentBudget', label: 'Maximum Monthly Rent Budget (₹)', type: 'number', required: true, defaultValue: 8000 }
          ]
        };
      case '5':
        return {
          title: 'Analyze Local Competition',
          subtitle: 'Map nearby competitors, density, and potential market gaps.',
          questions: [
            { id: 'bizType', label: 'Business Type', type: 'text', required: true, defaultValue: 'Electrical Shop' },
            { id: 'location', label: 'Target Location Area', type: 'text', required: true, defaultValue: `${profile.villageTown}, ${profile.district}` },
            { id: 'perceivedCompetition', label: 'How many competitors operate in your area?', type: 'select', required: true, options: [{ label: '0-2 Competitors (Low)', value: 'low' }, { label: '3-5 Competitors (Moderate)', value: 'mod' }, { label: '6+ Competitors (High)', value: 'high' }] }
          ]
        };
      case '6':
        return {
          title: 'Plan My Finances',
          subtitle: 'Deterministic cash-flow, operating expense, and break-even calculator.',
          questions: [
            { id: 'bizType', label: 'Business Name / Type', type: 'text', required: true, defaultValue: 'Electrical Shop' },
            { id: 'capital', label: 'Available Capital (₹)', type: 'slider', min: 25000, max: 500000, step: 25000, required: true, defaultValue: 150000, unit: 'INR' },
            { id: 'expectedRevenue', label: 'Expected Monthly Gross Sales (₹)', type: 'number', required: true, defaultValue: 120000 }
          ]
        };
      case '7':
        return {
          title: 'Calculate Project Cost',
          subtitle: 'Itemized startup costs: equipment, shop setup, initial stock.',
          questions: [
            { id: 'bizCategory', label: 'Business Type / Category', type: 'text', required: true, defaultValue: 'Electrical Shop & Electronics' },
            { id: 'equipCost', label: 'Estimated Equipment & Fixtures Cost (₹)', type: 'number', required: true, defaultValue: 65000 },
            { id: 'stockCost', label: 'Initial Inventory & Raw Materials (₹)', type: 'number', required: true, defaultValue: 150000 },
            { id: 'location', label: 'Proposed Location', type: 'text', required: true, defaultValue: `${profile.villageTown}, ${profile.district}` }
          ]
        };
      case '8':
        return {
          title: 'Loan Repayment Planner',
          subtitle: 'Mudra / PMEGP loan EMI schedule and cash-flow affordability indicator.',
          questions: [
            { id: 'loanAmount', label: 'Required Loan Amount (₹)', type: 'slider', min: 50000, max: 1000000, step: 25000, required: true, defaultValue: 200000, unit: 'INR' },
            { id: 'tenureYears', label: 'Repayment Tenure (Years)', type: 'select', required: true, options: [{ label: '3 Years', value: '3' }, { label: '5 Years', value: '5' }, { label: '7 Years', value: '7' }] },
            { id: 'bizType', label: 'Business Name', type: 'text', required: true, defaultValue: 'Electrical Shop' }
          ]
        };
      case '15':
        return {
          title: 'Solve a Business Problem',
          subtitle: 'Diagnose low customers, high expenses, or location bottlenecks.',
          questions: [
            { id: 'bizType', label: 'Business Name / Type', type: 'text', required: true, defaultValue: 'Electrical Shop' },
            { id: 'location', label: 'Location', type: 'text', required: true, defaultValue: `${profile.villageTown}, ${profile.district}` },
            { id: 'probType', label: 'What primary problem are you facing?', type: 'select', required: true, options: [
              { label: 'Low Customers / Footfall', value: 'low_customers' },
              { label: 'High Competition', value: 'high_comp' },
              { label: 'High Operating Expenses', value: 'high_exp' },
              { label: 'Low Profit Margins', value: 'low_profit' }
            ]}
          ]
        };
      default:
        return {
          title: `Task #${id || '1'} — Business Advisory`,
          subtitle: 'Custom advisory questionnaire powered by Vyapar Mitra Engine.',
          questions: [
            { id: 'bizType', label: 'Business Name or Type', type: 'text', required: true, defaultValue: 'Electrical Shop', placeholder: 'e.g. Electrical Shop, Kirana...' },
            { id: 'location', label: 'Location', type: 'text', required: true, defaultValue: `${profile.villageTown}, ${profile.district}` },
            { id: 'generalInput', label: 'Specific Requirements or Goals', type: 'text', required: true, placeholder: 'Describe what you want to achieve...' }
          ]
        };
    }
  };

  const taskData = getQuestions(taskId);

  const handleTaskComplete = (answers: Record<string, any>) => {
    setTaskAnswers(answers);
    setCompleted(true);
  };

  // Helper to extract clean town name
  const userLocRaw = taskAnswers.location || `${profile.villageTown}, ${profile.district}`;
  const userTown = userLocRaw.split(',')[0].trim() || profile.villageTown || 'Local Area';
  const bizName = taskAnswers.bizType || taskAnswers.bizCategory || 'Electrical Shop';

  // Dynamic location recommendations for case 4
  const mapLocations: LocationPoint[] = [
    {
      id: 'l1',
      name: `${userTown} Bus Stand Junction`,
      type: 'Recommended',
      lat: 16.24,
      lng: 80.64,
      suitability: 95,
      competitionDensity: `2 ${bizName} stores within 500m`,
      footTrafficEstimate: 'High (3,900/day)'
    },
    {
      id: 'l2',
      name: `${userTown} Main Commercial Market`,
      type: 'High Competition',
      lat: 16.25,
      lng: 80.65,
      suitability: 72,
      competitionDensity: `5 ${bizName} stores within 300m`,
      footTrafficEstimate: 'Very High (6,100/day)'
    },
    {
      id: 'l3',
      name: `${userTown} Station Road / Colony`,
      type: 'Moderate',
      lat: 16.23,
      lng: 80.63,
      suitability: 84,
      competitionDensity: `1 ${bizName} store within 800m`,
      footTrafficEstimate: 'Moderate (2,200/day)'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {!completed ? (
        <SmartQuestionnaire
          title={taskData.title}
          subtitle={taskData.subtitle}
          questions={taskData.questions}
          onComplete={handleTaskComplete}
        />
      ) : (
        <div className="space-y-6">
          {/* Top Banner */}
          <div className="bg-vyapar-navy text-white p-6 rounded-xl shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-vyapar-saffron tracking-wider">
                  Advisory Analysis Report
                </span>
                <h2 className="text-2xl font-serif font-bold mt-0.5">{taskData.title}</h2>
              </div>
              <DataBadge type="CALCULATED" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-vyapar-ivory/70 block">Target Business</span>
                <span className="font-bold text-white text-sm">{bizName}</span>
              </div>
              <div>
                <span className="text-vyapar-ivory/70 block">Target Location</span>
                <span className="font-bold text-vyapar-saffron text-sm">{userLocRaw}</span>
              </div>
              <div>
                <span className="text-vyapar-ivory/70 block">Confidence Rating</span>
                <span className="font-bold text-green-400 text-sm">High (94%)</span>
              </div>
            </div>
          </div>

          {/* Special Result view for Location Task #4 */}
          {taskId === '4' && (
            <div className="space-y-6">
              <GeoMap locations={mapLocations} centerName={userTown} />
              
              <div className="bg-white p-6 rounded-xl border border-vyapar-border space-y-3">
                <h3 className="font-serif font-bold text-lg text-vyapar-navy flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-vyapar-saffron" />
                  <span>Key Location Insights for {bizName} in {userTown}</span>
                </h3>
                <ul className="space-y-2 text-xs text-vyapar-text-primary">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-vyapar-green shrink-0 mt-0.5" />
                    <span><strong>Top Zone:</strong> {userTown} Bus Stand Junction offers peak morning & evening footfall with manageable competition.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-vyapar-green shrink-0 mt-0.5" />
                    <span><strong>Rent Viability:</strong> Rent budget of ₹{(taskAnswers.rentBudget || 8000).toLocaleString()}/mo is sufficient for a 150-250 sq.ft commercial shop.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-vyapar-green shrink-0 mt-0.5" />
                    <span><strong>GIS Radius:</strong> 5 km coverage captures both local urban customers and surrounding village commuters.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Special Result view for Project Cost #7 */}
          {taskId === '7' && (
            <div className="bg-white p-6 rounded-xl border border-vyapar-border space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-serif font-bold text-lg text-vyapar-navy flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-vyapar-teal" />
                  <span>Itemized Project Cost Breakdown</span>
                </h3>
                <span className="text-xs text-vyapar-text-secondary">Currency: INR (₹)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-vyapar-ivory p-3 rounded-lg border">
                  <span className="text-vyapar-text-secondary block">Equipment & Machinery</span>
                  <span className="font-bold text-base text-vyapar-navy">₹{(Number(taskAnswers.equipCost) || 65000).toLocaleString()}</span>
                </div>
                <div className="bg-vyapar-ivory p-3 rounded-lg border">
                  <span className="text-vyapar-text-secondary block">Initial Inventory / Stock</span>
                  <span className="font-bold text-base text-vyapar-navy">₹{(Number(taskAnswers.stockCost) || 150000).toLocaleString()}</span>
                </div>
                <div className="bg-vyapar-ivory p-3 rounded-lg border">
                  <span className="text-vyapar-text-secondary block">Working Capital Reserve</span>
                  <span className="font-bold text-base text-vyapar-navy">₹35,000</span>
                </div>
              </div>

              <div className="p-4 bg-navy-50 rounded-lg border border-vyapar-navy/20 flex justify-between items-center text-sm font-bold text-vyapar-navy">
                <span>Total Estimated Project Capital Needed:</span>
                <span className="text-xl text-vyapar-saffron">
                  ₹{((Number(taskAnswers.equipCost) || 65000) + (Number(taskAnswers.stockCost) || 150000) + 35000).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Special Result view for Problem Solver #15 */}
          {taskId === '15' && (
            <div className="bg-white p-6 rounded-xl border border-vyapar-border space-y-4">
              <h3 className="font-serif font-bold text-lg text-vyapar-navy flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-vyapar-saffron" />
                <span>Diagnostic Solution Plan for {bizName}</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-1">Identified Bottleneck:</span>
                  <p className="text-amber-950">
                    {taskAnswers.probType === 'low_customers' && 'Insufficient local footfall & brand awareness'}
                    {taskAnswers.probType === 'high_comp' && 'Price undercutting by established nearby competitors'}
                    {taskAnswers.probType === 'high_exp' && 'High shop rent and excessive utility overheads'}
                    {taskAnswers.probType === 'low_profit' && 'Low gross margins due to retail distributor markups'}
                    {!taskAnswers.probType && 'Operating cash flow constraints'}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2">
                  <span className="font-bold text-emerald-900 block">Recommended Solution Sequence:</span>
                  <ul className="list-disc list-inside space-y-1 text-emerald-950">
                    <li>Launch targeted local WhatsApp catalog & UPI cashback promotions for {bizName} in {userTown}.</li>
                    <li>Negotiate direct bulk distributor pricing to increase gross margins by 4-6%.</li>
                    <li>Introduce high-demand complementary products (e.g. electrical test meters, LED accessories).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 flex flex-wrap justify-between items-center gap-3 bg-white p-4 rounded-xl border border-vyapar-border">
            <button
              onClick={() => setCompleted(false)}
              className="px-4 py-2.5 border border-vyapar-border hover:bg-gray-50 text-vyapar-text-primary text-xs font-bold rounded-lg flex items-center gap-2 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Re-run Task Questionnaire</span>
            </button>

            <button
              onClick={() => navigate('/start-business')}
              className="px-6 py-2.5 bg-vyapar-navy hover:bg-vyapar-slate text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition"
            >
              <span>Continue to Full Business Journey & DPR →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
