import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, FileText, Shield, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProfileEditModal } from '../components/ProfileEditModal';

export default function MyVyaparMitraPage() {
  const { profile, savedDprs } = useApp();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-vyapar-border pb-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-vyapar-navy">My Vyapar Mitra Dashboard</h1>
          <p className="text-xs text-vyapar-text-secondary mt-1">Manage your entrepreneur profile, saved analyses, and generated DPR documents.</p>
        </div>
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-4 py-2 bg-vyapar-navy text-white text-xs font-bold rounded-lg hover:bg-vyapar-slate flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4 text-vyapar-saffron" />
          <span>Edit Entrepreneur Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl border border-vyapar-border shadow-sm space-y-4 lg:col-span-1">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-vyapar-saffron" />
              <h3 className="font-serif font-bold text-lg text-vyapar-navy">Entrepreneur Profile</h3>
            </div>
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-xs text-vyapar-navy font-bold hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-vyapar-text-secondary block font-medium">Name</span>
              <span className="font-bold text-vyapar-navy text-sm">{profile.name || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-vyapar-text-secondary block font-medium">Location</span>
              <span className="font-semibold text-vyapar-navy">
                {[profile.villageTown, profile.district, profile.state].filter(Boolean).join(', ') || 'Not specified'} {profile.pinCode ? `(${profile.pinCode})` : ''}
              </span>
            </div>
            <div>
              <span className="text-vyapar-text-secondary block font-medium">Available Capital</span>
              <span className="font-bold text-vyapar-green">₹{(profile.availableCapital || 0).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-vyapar-text-secondary block font-medium">Land & Shop</span>
              <span className="font-semibold text-vyapar-navy">{profile.landAvailability || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-vyapar-text-secondary block font-medium">Skills</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {(profile.skills && profile.skills.length > 0) ? (
                  profile.skills.map((sk, idx) => (
                    <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-semibold text-vyapar-navy">
                      {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-vyapar-text-secondary italic">None specified</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Saved DPRs & Analyses */}
        <div className="bg-white p-6 rounded-xl border border-vyapar-border shadow-sm space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-vyapar-navy" />
              <h3 className="font-serif font-bold text-lg text-vyapar-navy">Saved DPR Reports & Analyses</h3>
            </div>
            <span className="text-xs font-semibold text-vyapar-text-secondary">{savedDprs.length} Documents</span>
          </div>

          {savedDprs.length === 0 ? (
            <div className="text-center py-12 space-y-3 border-2 border-dashed rounded-lg bg-vyapar-ivory/50">
              <FileText className="w-10 h-10 text-vyapar-text-secondary mx-auto" />
              <h4 className="font-serif font-bold text-sm text-vyapar-navy">No DPR Reports Saved Yet</h4>
              <p className="text-xs text-vyapar-text-secondary max-w-xs mx-auto">
                Complete the "Start a New Business" task flow to generate your first bankable project report.
              </p>
              <button
                onClick={() => navigate('/start-business')}
                className="px-4 py-2 bg-vyapar-navy text-white text-xs font-bold rounded-lg hover:bg-vyapar-slate"
              >
                Start Analysis →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedDprs.map(dpr => (
                <div key={dpr.dprId} className="p-4 rounded-lg border border-vyapar-border hover:border-vyapar-navy transition flex justify-between items-center text-xs">
                  <div>
                    <span className="font-serif font-bold text-sm text-vyapar-navy block">{dpr.businessName}</span>
                    <span className="text-vyapar-text-secondary">Ref: {dpr.dprId} • ₹{dpr.totalInvestment.toLocaleString()} Investment</span>
                  </div>
                  <button
                    onClick={() => navigate('/verification', { state: { dpr } })}
                    className="px-3 py-1.5 bg-vyapar-saffron text-white font-bold rounded hover:bg-amber-600 flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Verify</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
}
