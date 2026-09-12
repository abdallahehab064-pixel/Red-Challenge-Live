import React from 'react';

interface ArkanLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: 'full' | 'emblem-only' | 'horizontal';
}

export const ArkanLogo: React.FC<ArkanLogoProps> = ({
  className = '',
  size = 56,
  showText = true,
  variant = 'full',
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  // The official circular emblem replicating the authentic gold & royal navy seal
  const Emblem = (
    <svg
      viewBox="0 0 320 320"
      className="shrink-0 drop-shadow-md select-none"
      style={{ width: dimension, height: dimension }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Luxury Gold Gradients */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC377" />
          <stop offset="35%" stopColor="#C9A227" />
          <stop offset="70%" stopColor="#F3E5AB" />
          <stop offset="100%" stopColor="#99751A" />
        </linearGradient>

        <linearGradient id="goldMetallic" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FAF0CA" />
          <stop offset="45%" stopColor="#C9A227" />
          <stop offset="80%" stopColor="#A37E1C" />
          <stop offset="100%" stopColor="#E9D698" />
        </linearGradient>

        <linearGradient id="darkNavyBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#081427" />
          <stop offset="50%" stopColor="#0B1E38" />
          <stop offset="100%" stopColor="#07101E" />
        </linearGradient>

        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B335A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#081427" stopOpacity="1" />
        </radialGradient>

        {/* Text Paths for Dual Arcs */}
        <path
          id="topTextPath"
          d="M 46,160 A 114,114 0 1,1 274,160"
          fill="none"
        />
        <path
          id="bottomTextPath"
          d="M 274,160 A 114,114 0 0,1 46,160"
          fill="none"
        />
      </defs>

      {/* Outer Fine Gold Border & Royal Navy Rim */}
      <circle cx="160" cy="160" r="154" stroke="url(#goldGradient)" strokeWidth="3" />
      <circle cx="160" cy="160" r="148" stroke="#081427" strokeWidth="2" />
      <circle cx="160" cy="160" r="145" fill="url(#darkNavyBg)" stroke="url(#goldGradient)" strokeWidth="3" />

      {/* Inner Circle Border */}
      <circle cx="160" cy="160" r="96" fill="url(#centerGlow)" stroke="url(#goldGradient)" strokeWidth="3.5" />

      {/* Text Arc: Arabic Top ("مؤسسة أركان للمحاماة والاستشارات القانونية والمحاسبية والضريبية") */}
      <text fill="url(#goldMetallic)" fontSize="11" fontWeight="700" letterSpacing="0.5" fontFamily="Cairo, Tajawal, sans-serif">
        <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
          مؤسسة أركان للمحاماة والاستشارات القانونية والمحاسبية والضريبية
        </textPath>
      </text>

      {/* Text Arc: English Bottom ("ARKAN LEGAL, ACCOUNTING, & TAX CONSULTANCIES") */}
      <text fill="url(#goldMetallic)" fontSize="8.5" fontWeight="800" letterSpacing="1.2" fontFamily="serif">
        <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
          ARKAN LEGAL, ACCOUNTING, & TAX CONSULTANCIES
        </textPath>
      </text>

      {/* Left and Right Star Dividers */}
      <g transform="translate(42, 160) scale(0.9)">
        <polygon points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2" fill="url(#goldGradient)" />
      </g>
      <g transform="translate(278, 160) scale(0.9)">
        <polygon points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2" fill="url(#goldGradient)" />
      </g>

      {/* INNER CREST: Column (Pillar / أركان) + Scales of Justice (الميزان) + Calculator/Books/Files */}
      <g transform="translate(160, 160)">
        {/* Upper Peak / Arch forming Triangle Apex and Balance Pivot */}
        <path
          d="M 0,-62 L 20,-30 L 12,-30 L 0,-50 L -12,-30 L -20,-30 Z"
          fill="url(#goldGradient)"
        />

        {/* Balance Pivot Ball */}
        <circle cx="0" cy="-48" r="4.5" fill="url(#goldMetallic)" />

        {/* Balance Arms (Beams) */}
        <path
          d="M -54,-36 Q -26,-46 0,-48 Q 26,-46 54,-36"
          stroke="url(#goldMetallic)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Scale Pan & Strings */}
        <line x1="-54" y1="-36" x2="-68" y2="-8" stroke="url(#goldGradient)" strokeWidth="1.5" />
        <line x1="-54" y1="-36" x2="-40" y2="-8" stroke="url(#goldGradient)" strokeWidth="1.5" />
        <path
          d="M -72,-8 Q -54,12 -36,-8 Z"
          fill="url(#goldGradient)"
          stroke="#0A192F"
          strokeWidth="0.8"
        />

        {/* Right Scale Pan & Strings */}
        <line x1="54" y1="-36" x2="40" y2="-8" stroke="url(#goldGradient)" strokeWidth="1.5" />
        <line x1="54" y1="-36" x2="68" y2="-8" stroke="url(#goldGradient)" strokeWidth="1.5" />
        <path
          d="M 36,-8 Q 54,12 72,-8 Z"
          fill="url(#goldGradient)"
          stroke="#0A192F"
          strokeWidth="0.8"
        />

        {/* Central Architectural Doric Column (Pillars of Law) */}
        {/* Capital (Top Crown) */}
        <rect x="-18" y="-30" width="36" height="5" rx="1.5" fill="url(#goldMetallic)" />
        <rect x="-14" y="-25" width="28" height="4" fill="url(#goldGradient)" />

        {/* Column Shaft Flutes */}
        <path
          d="M -13,-21 L -13,24 L -5,24 L -5,-21 Z"
          fill="url(#goldGradient)"
        />
        <path
          d="M -4,-21 L -4,24 L 4,24 L 4,-21 Z"
          fill="url(#goldMetallic)"
        />
        <path
          d="M 5,-21 L 5,24 L 13,24 L 13,-21 Z"
          fill="url(#goldGradient)"
        />

        {/* Column Base Pedestal */}
        <polygon points="-16,24 16,24 20,38 0,48 -20,38" fill="url(#goldMetallic)" />

        {/* BASE ELEMENTS: Files on Left, Calculator Grid in Middle, Law Books on Right */}
        
        {/* Left: Financial Folders / Documents */}
        <g transform="translate(-36, 12)">
          <rect x="-8" y="0" width="16" height="22" rx="1" fill="url(#goldGradient)" />
          {/* Document Lines */}
          <line x1="-5" y1="5" x2="5" y2="5" stroke="#081427" strokeWidth="1.5" />
          <line x1="-5" y1="9" x2="5" y2="9" stroke="#081427" strokeWidth="1.5" />
          <line x1="-5" y1="13" x2="5" y2="13" stroke="#081427" strokeWidth="1.5" />
          <line x1="-5" y1="17" x2="2" y2="17" stroke="#081427" strokeWidth="1.5" />
        </g>

        {/* Center Base: Calculator Grid (Accounting / Tax) */}
        <g transform="translate(0, 31)">
          {/* Calculator Screen / Rows */}
          <rect x="-10" y="-4" width="20" height="5" rx="1" fill="#081427" />
          {/* Keys 2x3 Grid */}
          <rect x="-8" y="3" width="4" height="3" rx="0.5" fill="#081427" />
          <rect x="-2" y="3" width="4" height="3" rx="0.5" fill="#081427" />
          <rect x="4" y="3" width="4" height="3" rx="0.5" fill="#081427" />
          <rect x="-8" y="8" width="4" height="3" rx="0.5" fill="#081427" />
          <rect x="-2" y="8" width="4" height="3" rx="0.5" fill="#081427" />
          <rect x="4" y="8" width="4" height="3" rx="0.5" fill="#081427" />
        </g>

        {/* Right: Law Books & Registers */}
        <g transform="translate(34, 11)">
          {/* Book 1 (Vertical) */}
          <rect x="-8" y="1" width="7" height="23" rx="1" fill="url(#goldGradient)" />
          <line x1="-7" y1="5" x2="-2" y2="5" stroke="#081427" strokeWidth="1" />
          <line x1="-7" y1="9" x2="-2" y2="9" stroke="#081427" strokeWidth="1" />
          
          {/* Book 2 (Slanted) */}
          <g transform="rotate(18, 5, 12)">
            <rect x="1" y="2" width="7" height="22" rx="1" fill="url(#goldMetallic)" />
            <line x1="2" y1="6" x2="7" y2="6" stroke="#081427" strokeWidth="1" />
          </g>
        </g>
      </g>
    </svg>
  );

  if (variant === 'emblem-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{Emblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 text-right ${className}`}>
      {Emblem}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-black text-lg md:text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#DFC377] via-[#C9A227] to-[#FAF0CA]">
              مؤسسة أركان
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
          </div>
          <span className="text-[11px] md:text-xs text-slate-300 font-medium leading-tight">
            للمحاماة والاستشارات القانونية والمحاسبية والضريبية
          </span>
          <span className="text-[9px] text-[#C9A227]/80 tracking-widest font-sans uppercase">
            ARKAN LEGAL & FINANCIAL
          </span>
        </div>
      )}
    </div>
  );
};
