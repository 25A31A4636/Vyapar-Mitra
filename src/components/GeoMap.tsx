import React, { useState } from 'react';
import type { LocationPoint } from '../types';
import { DataBadge } from './DataBadges';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';

interface GeoMapProps {
  locations: LocationPoint[];
  centerName?: string;
}

export const GeoMap: React.FC<GeoMapProps> = ({ locations, centerName = 'Tenali Town Center' }) => {
  const [selectedPoint, setSelectedPoint] = useState<LocationPoint | null>(locations[0] || null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-vyapar-border overflow-hidden">
      {/* Header bar */}
      <div className="p-4 bg-vyapar-navy text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-vyapar-saffron" />
          <div>
            <h4 className="font-serif font-bold text-sm">Hyper-Local Opportunity & Competition Map</h4>
            <p className="text-[11px] text-vyapar-ivory/70">5 km Radius — {centerName}</p>
          </div>
        </div>
        <DataBadge type="DEMO" />
      </div>

      {/* Simulated Interactive Map Display Canvas */}
      <div className="relative h-72 bg-slate-100 p-4 flex flex-col justify-between overflow-hidden">
        {/* Background Grid Pattern simulating GIS / Topography */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#17324D_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Legend Overlay */}
        <div className="relative z-10 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-sm border border-vyapar-border inline-flex items-center gap-3 text-[11px] font-semibold w-fit">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Recommended</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Moderate</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High Competition</span>
        </div>

        {/* Map Markers */}
        <div className="relative z-10 grid grid-cols-3 gap-4 my-auto">
          {locations.map((loc, idx) => {
            const isSelected = selectedPoint?.id === loc.id;
            const colorClass = loc.type === 'Recommended' 
              ? 'bg-emerald-500 border-emerald-700 text-white'
              : loc.type === 'Moderate'
              ? 'bg-amber-500 border-amber-700 text-white'
              : 'bg-rose-500 border-rose-700 text-white';

            return (
              <button
                key={loc.id}
                onClick={() => setSelectedPoint(loc)}
                className={`p-3 rounded-lg border-2 shadow-md transition-all text-left flex flex-col justify-between ${colorClass} ${
                  isSelected ? 'ring-4 ring-vyapar-saffron scale-105' : 'hover:scale-102 opacity-90'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs">
                  <span>Zone #{idx + 1}</span>
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="mt-2">
                  <p className="font-serif font-bold text-sm leading-tight">{loc.name}</p>
                  <p className="text-[10px] opacity-90 mt-0.5">Suitability: {loc.suitability}%</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="relative z-10 text-[10px] text-vyapar-text-secondary bg-white/80 p-1.5 rounded flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-vyapar-saffron shrink-0" />
          <span>Demo Data Notice: Spatial layers simulated for hackathon demonstration.</span>
        </div>
      </div>

      {/* Selected Location Details Panel */}
      {selectedPoint && (
        <div className="p-4 bg-vyapar-ivory border-t border-vyapar-border space-y-2">
          <div className="flex justify-between items-center">
            <h5 className="font-serif font-bold text-sm text-vyapar-navy">{selectedPoint.name} Details</h5>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border text-vyapar-text-primary">
              {selectedPoint.type}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2 rounded border">
              <span className="text-vyapar-text-secondary block">Competition Density</span>
              <span className="font-bold text-vyapar-navy">{selectedPoint.competitionDensity}</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="text-vyapar-text-secondary block">Foot Traffic Estimate</span>
              <span className="font-bold text-vyapar-navy">{selectedPoint.footTrafficEstimate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
