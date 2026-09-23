import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, Camera } from 'lucide-react';

interface TaskCardDef {
  id: string;
  title: string;
  category: 'START' | 'PLAN' | 'GROW' | 'FINANCE' | 'SOLVE';
  description: string;
  path: string;
  isSpecial?: boolean;
}

export default function ExploreTasks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategoryFilter = searchParams.get('cat') || 'ALL';
  const [searchQuery, setSearchQuery] = useState('');

  const allTasks: TaskCardDef[] = [
    { id: '1', title: 'Find a Business Idea', category: 'START', description: 'Discover 3-5 high-suitability business opportunities based on local demand.', path: '/start-business' },
    { id: '2', title: 'Start a New Business', category: 'START', description: 'Complete step-by-step decision flow from idea to DPR generation.', path: '/start-business' },
    { id: '3', title: 'Build a New Brand', category: 'START', description: 'AI creative brand concepts, names, and local customer positioning.', path: '/task/3' },
    
    { id: '4', title: 'Find the Best Location', category: 'PLAN', description: 'Hyper-local 5km GIS spatial mapping and zone suitability analysis.', path: '/task/4' },
    { id: '5', title: 'Analyze Local Competition', category: 'PLAN', description: 'Map nearby competitors, density, and potential market gaps.', path: '/task/5' },
    { id: '6', title: 'Plan My Finances', category: 'PLAN', description: 'Deterministic cash-flow, operating expense, and break-even calculator.', path: '/task/6' },

    { id: '7', title: 'Calculate Project Cost', category: 'FINANCE', description: 'Itemized startup costs: equipment, shop setup, initial stock.', path: '/task/7' },
    { id: '8', title: 'Loan Repayment Planner', category: 'FINANCE', description: 'Mudra/PMEGP loan EMI schedule and cash-flow affordability indicator.', path: '/task/8' },
    { id: '9', title: 'Funding & Scheme Advisor', category: 'FINANCE', description: 'Match eligible government subsidies and financial programs.', path: '/task/9' },
    { id: '16', title: 'Rural Lens OCR', category: 'FINANCE', description: 'Turn handwritten ledger notes & photos into structured financial data.', path: '/ocr', isSpecial: true },

    { id: '10', title: 'Expand My Business', category: 'GROW', description: 'Evaluate capacity upgrades, new product lines, and branch costs.', path: '/task/10' },
    { id: '11', title: 'Get More Customers', category: 'GROW', description: 'Low-cost local marketing tactics and customer acquisition advisory.', path: '/task/11' },
    { id: '12', title: 'Improve Profitability', category: 'GROW', description: 'Cost-driver analysis and margin optimization recommendations.', path: '/task/12' },
    { id: '13', title: 'Diversify My Business', category: 'GROW', description: 'Cross-selling & business diversification sequence planner.', path: '/task/13' },
    { id: '14', title: 'Plan Future Growth', category: 'GROW', description: '6, 12, and 24-month roadmap with investment milestones.', path: '/task/14' },

    { id: '15', title: 'Solve a Business Problem', category: 'SOLVE', description: 'Diagnose low customers, high expenses, or location bottlenecks.', path: '/task/15' },
  ];

  const filteredTasks = allTasks.filter(t => {
    const matchesCat = activeCategoryFilter === 'ALL' || t.category === activeCategoryFilter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-vyapar-navy">Task Routing Engine</h1>
        <p className="text-sm text-vyapar-text-secondary">Select any of our 18 specialized business advisory tasks</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-vyapar-border shadow-sm">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {['ALL', 'START', 'PLAN', 'FINANCE', 'GROW', 'SOLVE'].map(cat => (
            <button
              key={cat}
              onClick={() => navigate(cat === 'ALL' ? '/explore' : `/explore?cat=${cat}`)}
              className={`px-3 py-1.5 rounded-lg border transition ${
                activeCategoryFilter === cat
                  ? 'bg-vyapar-navy text-white border-vyapar-navy'
                  : 'bg-gray-50 text-vyapar-text-secondary border-vyapar-border hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-vyapar-text-secondary absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-vyapar-border rounded-lg text-xs focus:ring-1 focus:ring-vyapar-navy focus:outline-none"
          />
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            onClick={() => navigate(task.path)}
            className={`bg-white p-6 rounded-xl border border-vyapar-border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
              task.isSpecial ? 'ring-2 ring-vyapar-teal/50 bg-teal-50/20' : ''
            }`}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-vyapar-navy/10 text-vyapar-navy">
                  {task.category}
                </span>
                {task.isSpecial && (
                  <span className="text-[10px] font-bold text-vyapar-teal flex items-center gap-1">
                    <Camera className="w-3 h-3" /> OCR Feature
                  </span>
                )}
              </div>
              <h3 className="font-serif font-bold text-lg text-vyapar-navy">{task.title}</h3>
              <p className="text-xs text-vyapar-text-secondary leading-relaxed">{task.description}</p>
            </div>

            <div className="flex items-center text-xs font-bold text-vyapar-navy group pt-2 border-t border-gray-100">
              <span>Launch Task</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-vyapar-saffron group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
