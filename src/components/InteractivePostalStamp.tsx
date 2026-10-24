import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { BeretIcon, PawPrintIcon } from './DecorativeOrnaments';

interface InteractivePostalStampProps {
  label?: string;
  date?: string;
  themeColor?: string;
  className?: string;
}

// 4 種復古手作紀念郵戳設計
export type StampDesignType = 'classic' | 'purin' | 'love' | 'express';

export const InteractivePostalStamp: React.FC<InteractivePostalStampProps> = ({
  label = 'MEMORY',
  date = '2025.10',
  themeColor,
  className = ''
}) => {
  const [designIndex, setDesignIndex] = useState(0);
  const [stampCount, setStampCount] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(-3);
  const [feedbackText, setFeedbackText] = useState<string | null>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  const designs: StampDesignType[] = ['classic', 'purin', 'love', 'express'];
  const currentDesign = designs[designIndex];

  // 實體橡皮木質印章按壓音效 (純 Web Audio API 合成木頭重擊與棉紙吸墨的「咚噠」聲)
  const playStampSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. 低頻木質手柄敲擊 (Heavy wood-stamp impact)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.08);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);

      // 2. 橡皮印面壓迫棉紙的「帕」聲 (Rubber slap on cotton paper)
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 1.2;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
    } catch {
      // 靜音保護
    }
  };

  // 點擊蓋印互動處理
  const handleStampClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 播放敲擊聲
    playStampSound();

    // 每次蓋印產生真人用手蓋印時微幅隨機的角度與印泥深淺變化
    const randomRot = Math.round((Math.random() * 12 - 6));
    setRotationDeg(randomRot);

    const nextCount = stampCount + 1;
    setStampCount(nextCount);

    // 每點擊 2 次切換一款新紀念戳設計
    if (nextCount % 2 === 0) {
      setDesignIndex((prev) => (prev + 1) % designs.length);
    }

    // GSAP 蓋印按壓彈簧回饋
    if (stampRef.current) {
      gsap.timeline()
        .to(stampRef.current, {
          scale: 0.88,
          rotation: randomRot - 3,
          duration: 0.06,
          ease: 'power1.in'
        })
        .to(stampRef.current, {
          scale: 1.12,
          rotation: randomRot + 2,
          duration: 0.16,
          ease: 'back.out(2.5)'
        })
        .to(stampRef.current, {
          scale: 1,
          rotation: randomRot,
          duration: 0.2,
          ease: 'power2.out'
        });
    }

    // 噴灑細緻溫潤的印泥碎星花
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 18,
      spread: 45,
      startVelocity: 16,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#8A5A36', '#C84B31', '#FED458', '#E68A00']
    });

    // 俏皮浮動文字回饋
    const hints = [
      '蓋章成功！✨',
      '專屬回憶印記 💌',
      '布丁狗認證章 🐾',
      '姆姆姆 100% 💖',
      '換了一款新郵戳 🏷️',
      '手作紀念章 +1 🌸'
    ];
    const hint = hints[(nextCount - 1) % hints.length];
    setFeedbackText(hint);

    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedbackText(null);
    }, 1800);
  };

  // 顏色配置：依據郵戳類型搭配經典復古印泥色 (茶褐/硃砂紅/焦糖金/復古墨黑)
  const inkColor =
    currentDesign === 'love'
      ? '#C84B31' // 硃砂紅
      : currentDesign === 'purin'
      ? '#D48806' // 暖焦糖金
      : currentDesign === 'express'
      ? '#2E6B4F' // 郵政森林綠
      : '#8A5A36'; // 經典深茶褐

  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* 浮動提示小標籤 (蓋印後跳出) */}
      {feedbackText && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-[#4A3319] text-[#FFFDF4] text-[10.5px] font-bold rounded-full shadow-md z-30 pointer-events-none animate-bounce">
          {feedbackText}
        </div>
      )}

      {/* 郵戳主體 (支援滑鼠按壓、微晃、點擊回饋) */}
      <div
        ref={stampRef}
        onClick={handleStampClick}
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => setIsPressing(false)}
        onMouseLeave={() => setIsPressing(false)}
        style={{
          color: inkColor,
          borderColor: inkColor,
          transform: `rotate(${rotationDeg}deg)`
        }}
        className={`group relative inline-flex items-center gap-2 cursor-pointer transition-all duration-200 p-1.5 rounded-lg hover:scale-110 active:scale-90 ${
          isPressing ? 'opacity-90' : 'opacity-85 hover:opacity-100'
        }`}
        title="點擊蓋章！每點兩次切換不同紀念戳"
      >
        {/* 1. 款式 A：經典雙圈航空郵戳 */}
        {currentDesign === 'classic' && (
          <div className="flex items-center gap-2">
            <div
              style={{ borderColor: inkColor }}
              className="w-13 h-13 rounded-full border-2 border-dashed flex flex-col items-center justify-center p-1 text-[9.5px] font-bold tracking-tight text-center relative overflow-hidden"
            >
              <div
                style={{ borderColor: inkColor }}
                className="absolute inset-0.5 rounded-full border border-dotted opacity-60"
              />
              <span className="text-[7.5px] tracking-widest uppercase font-sans font-black leading-none">
                {label}
              </span>
              <span className="text-[10px] font-bold tracking-tight my-0.5 leading-none">
                {date}
              </span>
              <span className="text-[7px] tracking-widest opacity-80 leading-none">
                SPECIAL
              </span>
            </div>

            {/* 經典三道消印波浪線 */}
            <svg width="42" height="20" viewBox="0 0 50 20" fill="none" stroke={inkColor} strokeWidth="1.5" strokeLinecap="round">
              <path d="M0 5 Q12.5 -1 25 5 T50 5" />
              <path d="M0 10 Q12.5 4 25 10 T50 10" />
              <path d="M0 15 Q12.5 9 25 15 T50 15" />
            </svg>
          </div>
        )}

        {/* 2. 款式 B：布丁狗 24 歲限定官方紀念章 */}
        {currentDesign === 'purin' && (
          <div className="flex items-center gap-2">
            <div
              style={{ borderColor: inkColor }}
              className="w-13 h-13 rounded-full border-[2.2px] border-double flex flex-col items-center justify-center p-1 text-[9.5px] font-bold tracking-tight text-center relative"
            >
              <span className="text-[7px] tracking-widest uppercase font-black leading-none mb-0.5">
                ★ PURIN 24th ★
              </span>
              <div className="my-0.5 flex items-center justify-center">
                <BeretIcon size={14} />
              </div>
              <span className="text-[7.5px] font-bold tracking-wider leading-none">
                OFFICIAL SEAL
              </span>
            </div>

            {/* 星芒消印線 */}
            <svg width="42" height="20" viewBox="0 0 50 20" fill="none" stroke={inkColor} strokeWidth="1.5" strokeLinecap="round">
              <path d="M0 6 H15 M20 6 H35 M40 6 H50" strokeDasharray="3 3" />
              <path d="M0 14 Q12.5 8 25 14 T50 14" />
            </svg>
          </div>
        )}

        {/* 3. 款式 C：咪專屬真愛認證印章 */}
        {currentDesign === 'love' && (
          <div className="flex items-center gap-2">
            <div
              style={{ borderColor: inkColor }}
              className="w-13 h-13 rounded-full border-2 border-solid flex flex-col items-center justify-center p-1 text-[9px] font-bold tracking-tight text-center relative"
            >
              <span className="text-[7px] font-black tracking-widest leading-none text-[#C84B31]">
                ♥ FOR 咪 ♥
              </span>
              <div className="my-0.5 flex items-center justify-center">
                <PawPrintIcon size={14} />
              </div>
              <span className="text-[7px] tracking-tight font-bold leading-none">
                LOVE VERIFIED
              </span>
            </div>

            {/* 愛心消印線 */}
            <svg width="42" height="20" viewBox="0 0 50 20" fill="none" stroke={inkColor} strokeWidth="1.5" strokeLinecap="round">
              <path d="M0 6 Q12.5 0 25 6 T50 6" />
              <path d="M0 14 Q12.5 8 25 14 T50 14" />
            </svg>
          </div>
        )}

        {/* 4. 款式 D：復古特快航空郵戳 */}
        {currentDesign === 'express' && (
          <div className="flex items-center gap-2">
            <div
              style={{ borderColor: inkColor }}
              className="w-13 h-13 rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-1 text-[9px] font-bold tracking-tight text-center rotate-3"
            >
              <span className="text-[7px] tracking-widest font-black uppercase leading-none">
                AIR MAIL
              </span>
              <span className="text-[9.5px] font-extrabold my-0.5 leading-none">
                {date}
              </span>
              <span className="text-[7px] tracking-wider font-bold leading-none">
                PAR AVION
              </span>
            </div>

            {/* 平行航空標籤線 */}
            <svg width="42" height="20" viewBox="0 0 50 20" fill="none" stroke={inkColor} strokeWidth="1.5" strokeLinecap="round">
              <path d="M0 5 L50 5" />
              <path d="M0 10 L50 10" strokeDasharray="4 2" />
              <path d="M0 15 L50 15" />
            </svg>
          </div>
        )}

        {/* 郵戳角落「點我蓋印」微型趣味提示徽章 */}
        <div className="absolute -bottom-1 -right-1 bg-[#FFFFFF] border border-[#8A5A36]/40 text-[#8A5A36] text-[8px] font-bold px-1 py-0.2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xs pointer-events-none whitespace-nowrap">
          {stampCount > 0 ? `已蓋 ${stampCount} 次` : '點我蓋章'}
        </div>
      </div>
    </div>
  );
};
