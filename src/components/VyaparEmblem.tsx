import React from 'react';

interface EmblemProps {
  className?: string;
  size?: number;
}

export const VyaparEmblem: React.FC<EmblemProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vyapar Mitra Emblem"
    >
      {/* Background Circle Frame */}
      <circle cx="50" cy="50" r="46" stroke="#17324D" strokeWidth="4" className="fill-vyapar-navy" />
      
      {/* Rural Horizon / Field Lines */}
      <path d="M15 65 Q50 55 85 65" stroke="#287A4B" strokeWidth="3" fill="none" />
      <path d="M10 75 Q50 68 90 75" stroke="#287A4B" strokeWidth="2" strokeDasharray="3 3" fill="none" />
      
      {/* Partnership & Upward Growth Geometry */}
      <path d="M30 65 L45 35 L55 50 L70 25" stroke="#E8892E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Growth Opportunity Sun/Node */}
      <circle cx="70" cy="25" r="7" fill="#E8892E" />
      
      {/* Supportive Hand / Human Partnership arc */}
      <path d="M25 50 C 35 40, 65 40, 75 50" stroke="#267C78" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
};
