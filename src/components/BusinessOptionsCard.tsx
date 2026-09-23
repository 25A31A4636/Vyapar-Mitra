import React from 'react';
import { Package, ShoppingBag, Award, Zap, ChevronRight } from 'lucide-react';

interface BusinessOptionsCardProps {
  businessName: string;
  category: string;
}

export const BusinessOptionsCard: React.FC<BusinessOptionsCardProps> = ({ businessName, category }) => {
  const isElectrical = category.toLowerCase().includes('electric') || businessName.toLowerCase().includes('electric');
  const isApparel = category.toLowerCase().includes('apparel') || category.toLowerCase().includes('garment');
  const isAgri = category.toLowerCase().includes('agri') || category.toLowerCase().includes('seed');
  const isHardware = category.toLowerCase().includes('hardware') || category.toLowerCase().includes('paint');

  let inventoryBundles = [
    { title: 'Essential Fast-Moving Goods Pack', margin: '18-22%', items: 'Daily household staples, packaged foods, personal care items' },
    { title: 'High-Margin Seasonal Assortment', margin: '25-30%', items: 'Festival gift packs, seasonal beverages, local organic products' }
  ];

  let sourcingChannels = [
    { title: 'Regional Wholesale Hub Distributors', detail: 'Direct procurement from district FMCG stockists' },
    { title: 'B2B Wholesale Platforms', detail: 'Digital ordering with 48h shop-door delivery' }
  ];

  let valueAddServices = [
    { title: 'WhatsApp Order & Village Home Delivery', earning: '+₹4,000 / mo' },
    { title: 'UPI QR Payment & Micro-ATM Cash Out Point', earning: '+₹2,500 / mo' }
  ];

  let governmentSubsidies = [
    { scheme: 'PMEGP Subsidy', detail: '15% to 35% margin money subsidy for rural micro-units' },
    { scheme: 'Mudra Loan (Kishor / Tarun)', detail: 'Collateral-free bank loan up to ₹5 Lakhs @ 8.5-9.5%' }
  ];

  if (isElectrical) {
    inventoryBundles = [
      { title: 'House Wiring & Conduit Fittings Pack', margin: '28-35%', items: 'Copper wires (0.75-4.0 sqmm), PVC conduits, junction boxes' },
      { title: 'Modular Switches & LED Lighting Range', margin: '30-40%', items: 'Modular switchboards, LED bulbs/battens, decorative ceiling lights' },
      { title: 'Agriculture & Heavy Motor Starters', margin: '22-28%', items: 'Submersible pump control panels, MCBs, 3-phase starters, capacitors' },
      { title: 'Solar & Inverter Backup Kits', margin: '25-30%', items: 'Home inverter batteries, solar charge controllers, emergency lamps' }
    ];

    sourcingChannels = [
      { title: 'Authorized Brand Distributorship (Havells / Polycab / Finolex / Anchor)', detail: 'Tier-2 distributor pricing with 30-day credit cycle' },
      { title: 'State Electrical Wholesale Market Hub', detail: 'Direct cash purchases for non-branded accessories & tools' }
    ];

    valueAddServices = [
      { title: 'Electrician Referral Loyalty Program', earning: '+₹8,000 / mo commission pipeline' },
      { title: 'Home Wiring & Appliance Maintenance AMC', earning: '+₹5,000 / mo recurring retainer' }
    ];

    governmentSubsidies = [
      { scheme: 'PMEGP Electrical Service & Retail Scheme', detail: 'Up to 35% subsidy on project capital for rural entrepreneurs' },
      { scheme: 'PM Surya Ghar Solar Retail Partnering', detail: 'Government subsidy support for solar equipment dealers' }
    ];
  } else if (isApparel) {
    inventoryBundles = [
      { title: 'Festive & Ethnic Wear Collection', margin: '35-45%', items: 'Sarees, kurtis, festival dresses, kids ethnic wear' },
      { title: 'Everyday Casual & Work Wear', margin: '30-35%', items: 'Cotton shirts, denim jeans, nightwear, innerwear' }
    ];

    sourcingChannels = [
      { title: 'Textile Wholesale Hub (Surat / Tirupur / Hyderabad)', detail: 'Direct manufacturer catalog ordering' }
    ];

    valueAddServices = [
      { title: 'In-house Tailoring & Alteration Service', earning: '+₹6,000 / mo' }
    ];
  } else if (isAgri) {
    inventoryBundles = [
      { title: 'Hybrid Seeds & Germination Boosters', margin: '20-25%', items: 'Certified paddy, cotton, maize, vegetable seeds' },
      { title: 'Bio-Pesticides & Micro-Nutrients', margin: '25-35%', items: 'Organic growth promoters, drip irrigation fittings' }
    ];

    sourcingChannels = [
      { title: 'State Agriculture University & Certified Seed Depots', detail: 'Licensed wholesale procurement' }
    ];
  } else if (isHardware) {
    inventoryBundles = [
      { title: 'Paints, Primers & Waterproofing Pack', margin: '25-32%', items: 'Emulsion paints, wall putty, waterproofing chemicals' },
      { title: 'Plumbing & PVC Pipe Accessories', margin: '28-35%', items: 'CPVC pipes, brass valves, taps, sanitary fittings' }
    ];
  }

  return (
    <div className="bg-white rounded-xl border border-vyapar-border shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <span className="text-[10px] font-bold text-vyapar-saffron uppercase tracking-wider">Tailored Advisory</span>
          <h3 className="text-xl font-serif font-bold text-vyapar-navy">
            Recommended Growth & Product Options for {businessName}
          </h3>
        </div>
        <Zap className="w-6 h-6 text-vyapar-saffron" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Recommended Inventory & Product Mix */}
        <div className="bg-vyapar-ivory p-4 rounded-xl border space-y-3">
          <div className="flex items-center gap-2 font-bold text-vyapar-navy text-sm">
            <Package className="w-4 h-4 text-vyapar-navy" />
            <span>1. Recommended Inventory & High-Margin Bundles</span>
          </div>
          <div className="space-y-2 text-xs">
            {inventoryBundles.map((bundle, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-lg border">
                <div className="flex justify-between items-center font-bold text-vyapar-navy">
                  <span>{bundle.title}</span>
                  <span className="text-vyapar-green text-[11px]">{bundle.margin} Margin</span>
                </div>
                <p className="text-[11px] text-vyapar-text-secondary mt-1">{bundle.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Value-Added Service Options */}
        <div className="bg-vyapar-ivory p-4 rounded-xl border space-y-3">
          <div className="flex items-center gap-2 font-bold text-vyapar-navy text-sm">
            <ShoppingBag className="w-4 h-4 text-vyapar-teal" />
            <span>2. Value-Added Income Extensions</span>
          </div>
          <div className="space-y-2 text-xs">
            {valueAddServices.map((srv, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-lg border flex justify-between items-center">
                <div>
                  <span className="font-bold text-vyapar-navy block">{srv.title}</span>
                  <span className="text-[11px] text-vyapar-text-secondary">Additional revenue stream</span>
                </div>
                <span className="font-bold text-vyapar-green text-xs bg-green-50 px-2 py-1 rounded border border-green-200">
                  {srv.earning}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Sourcing & Supplier Channels */}
        <div className="bg-vyapar-ivory p-4 rounded-xl border space-y-3">
          <div className="flex items-center gap-2 font-bold text-vyapar-navy text-sm">
            <ChevronRight className="w-4 h-4 text-vyapar-saffron" />
            <span>3. Sourcing & Distributor Channels</span>
          </div>
          <div className="space-y-2 text-xs">
            {sourcingChannels.map((ch, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-lg border">
                <span className="font-bold text-vyapar-navy block">{ch.title}</span>
                <span className="text-[11px] text-vyapar-text-secondary">{ch.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Target Government Subsidies */}
        <div className="bg-vyapar-ivory p-4 rounded-xl border space-y-3">
          <div className="flex items-center gap-2 font-bold text-vyapar-navy text-sm">
            <Award className="w-4 h-4 text-vyapar-saffron" />
            <span>4. Eligible Subsidies & Government Schemes</span>
          </div>
          <div className="space-y-2 text-xs">
            {governmentSubsidies.map((sub, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-lg border">
                <span className="font-bold text-vyapar-navy block">{sub.scheme}</span>
                <span className="text-[11px] text-vyapar-text-secondary">{sub.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
