import React, { useState } from 'react';
import type { EntrepreneurProfile } from '../types';
import { X, MapPin, Save, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile, t } = useApp();
  const [formData, setFormData] = useState<EntrepreneurProfile>({ ...profile });
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof EntrepreneurProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (text: string) => {
    const skillsArr = text.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, skills: skillsArr }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    onClose();
  };

  // 📍 Real GPS Geolocation API
  const fetchGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // OpenStreetMap Nominatim reverse geocoding API
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const town = addr.village || addr.town || addr.city || addr.suburb || addr.county || 'Local Area';
            const district = addr.state_district || addr.county || addr.district || 'District';
            const state = addr.state || 'State';
            const postcode = addr.postcode || '';

            setFormData(prev => ({
              ...prev,
              villageTown: town,
              district: district,
              state: state,
              pinCode: postcode || prev.pinCode
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              villageTown: `Zone (${lat.toFixed(2)}, ${lng.toFixed(2)})`
            }));
          }
        } catch (err) {
          setFormData(prev => ({
            ...prev,
            villageTown: `GPS (${lat.toFixed(2)}, ${lng.toFixed(2)})`
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        alert(`Could not fetch location: ${error.message}`);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="bg-vyapar-navy text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-vyapar-saffron" />
            <h3 className="font-serif font-bold text-lg">{t('profile.edit.title', 'Edit Entrepreneur Profile')}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-vyapar-ivory/80 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
          {/* GPS Button */}
          <div className="bg-vyapar-ivory p-3.5 rounded-xl border border-vyapar-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="font-bold text-vyapar-navy text-xs block">Auto-Fill via Real GPS</span>
              <span className="text-vyapar-text-secondary text-[11px]">Fetch your current location using device sensors.</span>
            </div>
            <button
              type="button"
              onClick={fetchGpsLocation}
              disabled={isLocating}
              className="px-3.5 py-2 bg-vyapar-teal text-white rounded-lg font-bold flex items-center gap-1.5 hover:bg-teal-700 transition shrink-0 disabled:opacity-50"
            >
              <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating...' : '📍 Use Real GPS'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-vyapar-text-primary mb-1">Entrepreneur Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Leave blank or enter name"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-vyapar-text-primary mb-1">Available Capital (₹)</label>
              <input
                type="number"
                value={formData.availableCapital || ''}
                onChange={e => handleChange('availableCapital', Number(e.target.value))}
                placeholder="e.g. 150000"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-vyapar-text-primary mb-1">Village / Town</label>
              <input
                type="text"
                value={formData.villageTown || ''}
                onChange={e => handleChange('villageTown', e.target.value)}
                placeholder="e.g. Tenali, Karimnagar..."
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-vyapar-text-primary mb-1">District</label>
              <input
                type="text"
                value={formData.district || ''}
                onChange={e => handleChange('district', e.target.value)}
                placeholder="e.g. Guntur, Karimnagar..."
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-vyapar-text-primary mb-1">State</label>
              <input
                type="text"
                value={formData.state || ''}
                onChange={e => handleChange('state', e.target.value)}
                placeholder="e.g. Telangana, Andhra Pradesh..."
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-vyapar-text-primary mb-1">PIN Code</label>
              <input
                type="text"
                value={formData.pinCode || ''}
                onChange={e => handleChange('pinCode', e.target.value)}
                placeholder="e.g. 522201"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-vyapar-text-primary mb-1">Shop / Commercial Space Status</label>
            <input
              type="text"
              value={formData.shopAvailability || ''}
              onChange={e => handleChange('shopAvailability', e.target.value)}
              placeholder="e.g. Rented shop available / Own commercial space"
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-vyapar-text-primary mb-1">Skills (comma-separated)</label>
            <input
              type="text"
              value={formData.skills?.join(', ') || ''}
              onChange={e => handleSkillsChange(e.target.value)}
              placeholder="e.g. Customer Sales, Basic Accounting, Electrical Repairs"
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-vyapar-text-secondary font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-vyapar-navy text-white rounded-lg font-bold hover:bg-vyapar-slate flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
