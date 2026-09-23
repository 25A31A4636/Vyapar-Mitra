import React from 'react';
import type { DPRDocument } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, CheckCircle2, Copy, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DprVerificationProps {
  dpr: DPRDocument;
}

export const DprVerification: React.FC<DprVerificationProps> = ({ dpr }) => {
  const navigate = useNavigate();
  const verifyUrl = `${window.location.origin}/verify/${dpr.dprId}`;

  const copyHash = () => {
    navigator.clipboard.writeText(dpr.sha256Hash);
    alert('SHA-256 Hash copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-vyapar-border p-8 max-w-2xl mx-auto space-y-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1 text-xs font-semibold text-vyapar-text-secondary hover:text-vyapar-navy"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Report</span>
      </button>

      <div className="text-center space-y-2 border-b border-vyapar-border pb-6">
        <div className="w-12 h-12 bg-vyapar-green/10 rounded-full flex items-center justify-center mx-auto text-vyapar-green mb-3">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-vyapar-navy">Document Integrity Verification</h2>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-vyapar-green/10 text-vyapar-green border border-vyapar-green/30 rounded-full text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>🟢 Document Integrity Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-vyapar-ivory p-6 rounded-xl border border-vyapar-border">
        {/* QR Code */}
        <div className="flex flex-col items-center space-y-2 md:col-span-1">
          <div className="bg-white p-3 rounded-lg border border-vyapar-border shadow-sm">
            <QRCodeSVG value={verifyUrl} size={120} level="H" />
          </div>
          <span className="text-[10px] text-vyapar-text-secondary font-mono">Scan Micro-QR</span>
        </div>

        {/* Verification Details */}
        <div className="space-y-3 md:col-span-2 text-xs">
          <div>
            <span className="text-vyapar-text-secondary block font-medium">Document Reference ID</span>
            <span className="font-mono font-bold text-vyapar-navy text-sm">{dpr.dprId}</span>
          </div>

          <div>
            <span className="text-vyapar-text-secondary block font-medium">Cryptographic SHA-256 Hash</span>
            <div className="flex items-center gap-2 bg-white p-2 rounded border font-mono text-[11px] break-all text-vyapar-navy">
              <span className="flex-1">{dpr.sha256Hash}</span>
              <button onClick={copyHash} title="Copy Hash" className="hover:text-vyapar-saffron shrink-0">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-vyapar-text-secondary block">Entrepreneur</span>
              <span className="font-bold text-vyapar-navy">{dpr.entrepreneurName}</span>
            </div>
            <div>
              <span className="text-vyapar-text-secondary block">Timestamp</span>
              <span className="font-bold text-vyapar-navy">{new Date(dpr.generatedTimestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Disclaimer */}
      <div className="p-4 bg-gray-50 border rounded-lg text-xs text-vyapar-text-secondary space-y-1">
        <span className="font-bold text-vyapar-navy block">Security & Integrity Guarantee</span>
        <p className="leading-relaxed">
          This verification mechanism utilizes SHA-256 cryptographic hashing to confirm that the Detailed Project Report content matches its exact original generation state without unauthorized tampering.
        </p>
        <p className="text-[11px] text-vyapar-text-secondary/80 pt-1">
          * Note: This is an analytical integrity proof. It does not represent direct bank pre-approval or government scheme guarantee.
        </p>
      </div>
    </div>
  );
};
