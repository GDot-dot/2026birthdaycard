import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BeretIcon, PawPrintIcon, PostalStampMark, PurinFaceIcon } from './DecorativeOrnaments';

interface EnvelopeScreenProps {
  onOpen: () => void;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // 滑鼠 3D 視差
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen) return;
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (clientX - cx) / cx;
    const dy = (clientY - cy) / cy;
    setRotateY(dx * 12);
    setRotateX(-dy * 10);
  };

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    setRotateX(0);
    setRotateY(0);

    // 噴灑暖金色手作紙花
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.58 },
      colors: ['#FED458', '#FFA000', '#4A3319', '#FFFDF4', '#F28B82']
    });

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center perspective-[1000px] z-10 px-4 py-8 select-none"
    >
      {/* 3D 視差信封本體 */}
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isOpen ? 'transform 0.4s ease' : 'transform 0.15s ease-out'
        }}
        className="relative will-change-transform"
      >
        <div
          onClick={handleOpenEnvelope}
          className={`relative w-[340px] sm:w-[380px] h-[240px] sm:h-[260px] cursor-pointer group ${
            isOpen ? 'pointer-events-none' : ''
          }`}
        >
          {/* 信封底座 */}
          <div className="absolute inset-0 bg-[#FFE885] border-[3px] border-[#4A3319] rounded-[20px] shadow-[0_20px_45px_rgba(74,51,25,0.18)] z-1" />

          {/* 信紙 (未開時隱藏在口袋內，點擊後滑升) */}
          <div
            style={{
              transform: isOpen ? 'translateY(-125px)' : 'translateY(0)',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}
            className={`absolute bottom-3 left-4 right-4 h-[210px] sm:h-[230px] bg-[#FFFFFF] rounded-xl border-2 border-dashed border-[#E68A00] p-4 text-center flex flex-col items-center justify-center shadow-[0_-2px_12px_rgba(74,51,25,0.08)] ${
              isOpen ? 'z-20' : 'z-2'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[#E68A00] mb-1">
              <BeretIcon size={16} />
              <span className="text-[12px] font-bold tracking-widest uppercase font-sans">
                Happy 24th Birthday
              </span>
            </div>
            <h2 className="font-['Caveat'] text-4xl sm:text-5xl font-bold text-[#4A3319] leading-tight my-1">
              To 咪！！！
            </h2>
            <p className="text-[13px] font-bold text-[#8C6D4F] mt-1 flex items-center justify-center gap-1">
              翻開專屬手作生日手記
              <PawPrintIcon size={13} className="text-[#E68A00]" />
            </p>
          </div>

          {/* 信封口袋正面與兩側 (利用剪裁路徑呈現真實信封折角) */}
          <div className="absolute inset-0 envelope-pocket-polygon bg-[#FED458] rounded-b-[20px] z-3 pointer-events-none" />
          <div className="absolute inset-0 envelope-pocket-sides-polygon bg-[#FFCA28]/90 rounded-b-[20px] z-3 pointer-events-none" />

          {/* 信封表面精緻裝飾 (精美向量郵戳、手繪印花，不使用廉價 emoji) */}
          <div className="absolute inset-0 z-4 pointer-events-none overflow-hidden rounded-[20px] p-3">
            {/* 左上角復古郵戳 */}
            <div className="absolute top-3 left-3 transform -rotate-6">
              <PostalStampMark label="PURIN" date="2025.10" />
            </div>

            {/* 右上角手繪布丁狗頭像郵票 */}
            <div className="absolute top-3 right-4 w-12 h-14 bg-[#FFFDF4] border-2 border-dashed border-[#4A3319] rounded p-1 flex flex-col items-center justify-center shadow-sm transform rotate-3">
              <PurinFaceIcon size={24} />
              <span className="text-[7px] font-bold text-[#4A3319] mt-0.5 font-sans">24TH YRS</span>
            </div>

            {/* 左下與右下印花 */}
            <div className="absolute bottom-4 left-5 flex items-center gap-1 opacity-75">
              <PawPrintIcon size={14} className="text-[#4A3319]" />
              <span className="text-[11px] font-bold text-[#4A3319]">Special Delivery</span>
            </div>
            <div className="absolute bottom-4 right-5 text-right opacity-70">
              <span className="text-[11px] font-bold text-[#4A3319] font-['Caveat'] text-base">
                with lots of love
              </span>
            </div>
          </div>

          {/* 信封頂蓋 (Flap)：點擊後向後翻轉 180 度 */}
          <div
            style={{
              transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transformOrigin: 'top center',
              transition: 'transform 0.6s ease'
            }}
            className={`absolute top-0 left-0 w-full h-full envelope-flap-polygon bg-[#FED458] rounded-t-[20px] border-t-[1px] border-[#FFE082] ${
              isOpen ? 'z-1' : 'z-5'
            }`}
          />

          {/* 封蠟章：布丁狗貝雷帽 3D 質感 */}
          <div
            style={{
              opacity: isOpen ? 0 : 1,
              transform: isOpen ? 'translate(-50%, -50%) scale(0.6)' : undefined,
              transition: 'opacity 0.25s ease, transform 0.25s ease'
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-11 bg-[#3E2413] rounded-full shadow-[0_5px_15px_rgba(62,36,19,0.35)] flex items-center justify-center cursor-pointer z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
            title="點擊貝雷帽封蠟，展開生日賀卡"
          >
            {/* 貝雷帽圓頂小提把 */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-[#3E2413] rounded-t-sm" />
            {/* 燙金小星芒細節 */}
            <div className="w-6 h-6 rounded-full border border-[#D4A373]/40 flex items-center justify-center">
              <span className="text-[#D4A373] text-[11px] font-serif font-bold">24</span>
            </div>
          </div>
        </div>
      </div>

      {/* 提示引導文字 (溫潤手作感，無廉價表情符號) */}
      <div className="mt-8 flex items-center gap-2 px-5 py-2 bg-[#FFF8E1] border-2 border-[#E68A00] rounded-full shadow-sm text-sm font-bold text-[#4A3319] animate-pulse">
        <BeretIcon size={16} className="text-[#E68A00]" />
        <span>點擊貝雷帽封蠟・翻開生日賀卡手記</span>
        <BeretIcon size={16} className="text-[#E68A00]" />
      </div>
    </section>
  );
};
