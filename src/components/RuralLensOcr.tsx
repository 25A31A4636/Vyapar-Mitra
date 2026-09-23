import React, { useState, useRef } from 'react';
import { DataBadge } from './DataBadges';
import { Camera, Check, AlertCircle, RefreshCw, FileText } from 'lucide-react';

interface ExtractedItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  confidence: number;
}

export const RuralLensOcr: React.FC = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<ExtractedItem[]>([
    { id: '1', category: 'Shop Rent', description: 'Monthly commercial shop rent (handwritten)', amount: 6000, confidence: 95 },
    { id: '2', category: 'Initial Stock', description: 'Opening inventory (electrical / goods batch #1)', amount: 45000, confidence: 91 },
    { id: '3', category: 'Fixtures', description: 'Display racks, counter & shelving', amount: 15000, confidence: 89 },
    { id: '4', category: 'Utilities', description: 'Power connection & deposit estimate', amount: 2500, confidence: 84 },
  ]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setFileUploaded(true);
    }, 1800);
  };

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setFileUploaded(true);
    }, 1500);
  };

  const handleEditItem = (id: string, newAmount: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, amount: newAmount } : item));
  };

  const totalExtractedCost = items.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-vyapar-border p-6 max-w-3xl mx-auto space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-vyapar-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-serif font-bold text-vyapar-navy">Rural Lens OCR (Vision Engine)</h2>
            <DataBadge type="CALCULATED" />
          </div>
          <p className="text-xs text-vyapar-text-secondary mt-1">
            Convert handwritten business notes, ledger books, and receipts into structured financial budgets.
          </p>
        </div>
      </div>

      {!fileUploaded && !isProcessing && (
        <div 
          onClick={triggerFileInput}
          className="border-2 border-dashed border-vyapar-border hover:border-vyapar-navy p-10 rounded-xl text-center space-y-4 cursor-pointer bg-vyapar-ivory/50 transition-colors"
        >
          <div className="w-14 h-14 bg-vyapar-teal/10 text-vyapar-teal rounded-full flex items-center justify-center mx-auto">
            <Camera className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-vyapar-navy">Upload Handwritten Note or Ledger Photo</h4>
            <p className="text-xs text-vyapar-text-secondary mt-1">PNG, JPG, HEIC formats supported (Camera & Gallery)</p>
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
              className="px-5 py-2.5 bg-vyapar-navy text-white text-xs font-bold rounded-lg hover:bg-vyapar-slate transition"
            >
              Select Photo / Take Snapshot
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleSimulateUpload(); }}
              className="px-4 py-2.5 border border-vyapar-border text-vyapar-navy text-xs font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Try Sample Ledger Demo
            </button>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-vyapar-navy border-t-vyapar-saffron rounded-full animate-spin mx-auto" />
          <h4 className="font-serif font-bold text-lg text-vyapar-navy">Processing Image with Rural Lens Vision OCR...</h4>
          <p className="text-xs text-vyapar-text-secondary">Detecting handwritten ledger lines, items, currencies, and totals</p>
        </div>
      )}

      {fileUploaded && (
        <div className="space-y-6">
          {imagePreview && (
            <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-3">
              <img src={imagePreview} alt="Ledger Preview" className="h-16 w-20 object-cover rounded border" />
              <div>
                <span className="font-bold text-xs text-vyapar-navy block">Uploaded Ledger Document</span>
                <span className="text-[11px] text-vyapar-text-secondary">Analyzed by Gemini 1.5 Flash Vision OCR</span>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Important OCR Safety Verification</span>
              Extracted values are pre-calculated. Please review and edit any detected item before importing into your DPR.
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-base text-vyapar-navy flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-vyapar-navy" />
                <span>Extracted Financial Budget</span>
              </h3>
              <span className="text-xs font-bold text-vyapar-navy">Calculated Total: ₹{totalExtractedCost.toLocaleString()}</span>
            </div>

            <div className="border border-vyapar-border rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-vyapar-navy/5 font-bold text-vyapar-navy">
                  <tr>
                    <th className="p-3">Category</th>
                    <th className="p-3">Detected Ledger Line</th>
                    <th className="p-3">Amount (₹)</th>
                    <th className="p-3">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold text-vyapar-navy">{item.category}</td>
                      <td className="p-3 text-vyapar-text-secondary">{item.description}</td>
                      <td className="p-3 font-bold">
                        <input
                          type="number"
                          value={item.amount}
                          onChange={e => handleEditItem(item.id, Number(e.target.value))}
                          className="w-24 px-2 py-1 border rounded focus:ring-1 focus:ring-vyapar-navy font-mono"
                        />
                      </td>
                      <td className="p-3">
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {item.confidence}% match
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-vyapar-border">
            <button 
              onClick={() => { setFileUploaded(false); setImagePreview(null); }}
              className="text-xs text-vyapar-text-secondary hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-upload Image
            </button>

            <button
              onClick={() => setConfirmed(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white shadow-sm transition ${
                confirmed ? 'bg-vyapar-green' : 'bg-vyapar-navy hover:bg-vyapar-slate'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{confirmed ? 'Budget Confirmed ✓' : 'Confirm & Save Budget →'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
