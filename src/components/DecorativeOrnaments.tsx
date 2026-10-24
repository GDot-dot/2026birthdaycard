import React from 'react';

// 布丁狗經典貝雷帽封蠟壓印
export const BeretIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 28"
    fill="currentColor"
    className={`inline-block ${className}`}
  >
    {/* 貝雷帽小圓柄 */}
    <rect x="18" y="0" width="4" height="6" rx="2" fill="currentColor" />
    {/* 貝雷帽圓弧身 */}
    <path
      d="M3 20 C6 9, 34 9, 37 20 C35 26, 5 26, 3 20 Z"
      fill="currentColor"
    />
  </svg>
);

// 布丁狗溫潤手繪剪影
export const PurinFaceIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    {/* 垂垂耳朵 */}
    <ellipse cx="6" cy="18" rx="5" ry="9" transform="rotate(-15 6 18)" fill="#FED458" stroke="#4A3319" strokeWidth="2" />
    <ellipse cx="42" cy="18" rx="5" ry="9" transform="rotate(15 42 18)" fill="#FED458" stroke="#4A3319" strokeWidth="2" />
    {/* 臉頰 */}
    <circle cx="24" cy="22" r="16" fill="#FED458" stroke="#4A3319" strokeWidth="2" />
    {/* 招牌貝雷帽 */}
    <path d="M22 3 H26 V7 H22 Z" fill="#4A3319" />
    <path d="M14 12 C16 7, 32 7, 34 12 C32 15, 16 15, 14 12 Z" fill="#4A3319" />
    {/* 眼睛與小嘴 */}
    <circle cx="18" cy="22" r="1.5" fill="#4A3319" />
    <circle cx="30" cy="22" r="1.5" fill="#4A3319" />
    <path d="M22 25 Q24 27 26 25" stroke="#4A3319" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 復古郵戳與波浪消印線 (Postal Cancellation Mark)
export const PostalStampMark: React.FC<{ label: string; date?: string; className?: string }> = ({
  label,
  date = '2025-2026',
  className = ''
}) => (
  <div className={`inline-flex items-center gap-2 select-none opacity-75 ${className}`}>
    {/* 雙圈郵戳 */}
    <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#8A5A36] flex flex-col items-center justify-center p-1 text-[9px] font-bold tracking-tight text-[#8A5A36]">
      <span className="leading-tight">{label}</span>
      <span className="text-[7px] tracking-widest">{date}</span>
    </div>
    {/* 郵戳波浪線 */}
    <svg width="45" height="18" viewBox="0 0 50 20" fill="none" stroke="#8A5A36" strokeWidth="1.5" strokeLinecap="round">
      <path d="M0 6 Q12.5 0 25 6 T50 6" />
      <path d="M0 14 Q12.5 8 25 14 T50 14" />
    </svg>
  </div>
);

// 細緻的手繪星芒小點綴 (取代 AI 雜亂 emoji)
export const HandDrawnSparkle: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block ${className}`}
  >
    <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z" />
  </svg>
);

// 細緻小腳印章 (代替 🐾 emoji)
export const PawPrintIcon: React.FC<{ className?: string; size?: number; style?: React.CSSProperties }> = ({
  className = '',
  size = 16,
  style
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={style}
    className={`inline-block ${className}`}
  >
    <circle cx="6" cy="7" r="2.2" />
    <circle cx="11" cy="4" r="2.2" />
    <circle cx="17" cy="6" r="2.2" />
    <ellipse cx="12" cy="14" rx="5" ry="4" />
  </svg>
);

// 溫潤和風小福袋圖標
export const FukubukuroIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={`inline-block ${className}`}
  >
    {/* 束口袋褶皺頂部 */}
    <path d="M12 12 Q20 8 28 12 L26 15 Q20 13 14 15 Z" fill="#FED458" stroke="#4A3319" strokeWidth="1.5" />
    {/* 紅色束口繩 */}
    <rect x="13" y="14" width="14" height="3" rx="1.5" fill="#D32F2F" />
    <path d="M15 17 L13 22" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 17 L27 22" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" />
    {/* 袋身圓潤 */}
    <path
      d="M10 18 C8 24, 7 34, 14 36 C18 37, 22 37, 26 36 C33 34, 32 24, 30 18 Z"
      fill="#FFE082"
      stroke="#4A3319"
      strokeWidth="2"
    />
    {/* 袋身小紋理 */}
    <circle cx="20" cy="27" r="3" fill="#FED458" stroke="#4A3319" strokeWidth="1" />
  </svg>
);
