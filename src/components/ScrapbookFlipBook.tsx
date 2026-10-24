import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { MonthData, PhotoState } from '../types';
import { ScrapbookMonthCard } from './ScrapbookMonthCard';
import { BeretIcon, PawPrintIcon, PurinFaceIcon } from './DecorativeOrnaments';
import { ChevronLeft, ChevronRight, BookOpen, ScrollText } from 'lucide-react';

interface ScrapbookFlipBookProps {
  months: MonthData[];
  photoStates: Record<string, PhotoState>;
  onUpdatePhotoState: (id: string, updates: Partial<PhotoState>) => void;
  onBatchUpdatePhotoState: (updates: Record<string, Partial<PhotoState>>) => void;
}

export const ScrapbookFlipBook: React.FC<ScrapbookFlipBookProps> = ({
  months,
  photoStates,
  onUpdatePhotoState,
  onBatchUpdatePhotoState
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'flip' | 'scroll'>('flip');
  const [isFlipping, setIsFlipping] = useState(false);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const currentMonth = months[currentIndex];

  // 擬真紙張翻閱音效 (以 Web Audio API 合成輕柔舒緩的紙張窸窣聲，無需外部載入音檔)
  const playPaperRustle = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 0.12; // 120ms 輕柔紙張沙沙聲
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 0.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // 靜音保護
    }
  };

  // 執行擬真紙張翻頁動畫
  const goToPage = useCallback(
    (targetIndex: number) => {
      if (isFlipping || targetIndex === currentIndex || targetIndex < 0 || targetIndex >= months.length) {
        return;
      }

      const isNext = targetIndex > currentIndex;
      const container = pageContainerRef.current;

      if (!container) {
        setCurrentIndex(targetIndex);
        return;
      }

      setIsFlipping(true);
      playPaperRustle();

      // 第一階段：當前頁面順應紙張張力掀起彎折並滑出
      gsap.to(container, {
        duration: 0.28,
        transformOrigin: isNext ? 'left center' : 'right center',
        rotateY: isNext ? -26 : 26,
        xPercent: isNext ? -12 : 12,
        opacity: 0.15,
        scale: 0.96,
        ease: 'power2.in',
        onComplete: () => {
          // 切換月份
          setCurrentIndex(targetIndex);

          // 第二階段：新紙張從對側翻入並自然飄落就位
          gsap.fromTo(
            container,
            {
              transformOrigin: isNext ? 'right center' : 'left center',
              rotateY: isNext ? 26 : -26,
              xPercent: isNext ? 14 : -14,
              opacity: 0,
              scale: 0.96
            },
            {
              duration: 0.42,
              rotateY: 0,
              xPercent: 0,
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
              onComplete: () => {
                setIsFlipping(false);
                // 滾動確保視角聚焦在手帳上方
                const topOffset = container.getBoundingClientRect().top + window.scrollY - 100;
                if (window.scrollY > topOffset + 200 || window.scrollY < topOffset - 200) {
                  window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
                }
              }
            }
          );
        }
      });
    },
    [currentIndex, isFlipping, months.length]
  );

  // 鍵盤左右鍵翻頁支援
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'flip') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToPage(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPage(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goToPage, viewMode]);

  // 手機平板觸控滑動翻頁 (左右滑動)
  const handleTouchStart = (e: React.TouchEvent) => {
    // 若正在點擊拖曳拍立得，不觸發翻頁
    if ((e.target as HTMLElement).closest('.transformable-polaroid') || (e.target as HTMLElement).closest('.trigger-word')) {
      return;
    }
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // 水平滑動距離大於垂直滑動且超過 60px 視為翻頁
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        goToPage(currentIndex + 1); // 向左滑：看下一月
      } else {
        goToPage(currentIndex - 1); // 向右滑：看上一月
      }
    }
  };

  // 取得月份短標籤（例如 "10月"、"11月"、"12月"、"1月"...）
  const getMonthShortName = (m: MonthData) => {
    const parts = m.id.replace('month_', '').split('_');
    const monthNum = parseInt(parts[1], 10);
    return `${monthNum}月`;
  };

  return (
    <div className="w-full relative">
      {/* 頂部控制列：月份書籤索引標籤 ＋ 視圖模式切換 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 select-none">
        {/* 12 個月份的精緻手帳索引標籤 (Traveler's Notebook 側標籤風格) */}
        <div className="w-full sm:w-auto overflow-x-auto pb-2 scrollbar-none flex items-center gap-1.5 px-1 py-1">
          {months.map((m, idx) => {
            const isActive = idx === currentIndex && viewMode === 'flip';
            const tabTheme = m.themeColor || '#FED458';

            return (
              <button
                key={m.id}
                onClick={() => {
                  if (viewMode !== 'flip') setViewMode('flip');
                  goToPage(idx);
                }}
                style={{
                  backgroundColor: isActive ? tabTheme : '#FFFDF6',
                  borderColor: isActive ? '#4A3319' : '#E8DCCF',
                  color: isActive ? '#4A3319' : '#8C6D4F',
                  boxShadow: isActive
                    ? '0 3px 8px rgba(74, 51, 25, 0.16)'
                    : '0 1px 3px rgba(74, 51, 25, 0.05)'
                }}
                className={`relative px-3 py-1.5 rounded-t-lg border-[1.5px] border-b-[2.5px] text-xs sm:text-[13px] font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? '-translate-y-1 scale-105 font-black z-10'
                    : 'hover:-translate-y-0.5 hover:bg-[#FFF9E6]'
                }`}
                title={m.titleBadge}
              >
                {isActive && (
                  <span className="inline-block mr-1">
                    <PawPrintIcon size={11} className="inline-block" />
                  </span>
                )}
                {getMonthShortName(m)}
              </button>
            );
          })}
        </div>

        {/* 右側：翻頁模式 📖 / 全覽模式 📜 切換按鈕 */}
        <div className="shrink-0 flex items-center gap-2 bg-[#FFFDF6] border border-[#EAE0D3] rounded-full p-1 shadow-sm">
          <button
            onClick={() => setViewMode('flip')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              viewMode === 'flip'
                ? 'bg-[#FED458] text-[#4A3319] shadow-sm'
                : 'text-[#8C6D4F] hover:text-[#4A3319]'
            }`}
            title="手帳實體紙張翻頁模式"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>翻頁手記</span>
          </button>
          <button
            onClick={() => setViewMode('scroll')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              viewMode === 'scroll'
                ? 'bg-[#FED458] text-[#4A3319] shadow-sm'
                : 'text-[#8C6D4F] hover:text-[#4A3319]'
            }`}
            title="長卷連續全覽模式"
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>全部展開</span>
          </button>
        </div>
      </div>

      {/* 模式 A：擬真 3D 實體紙張翻頁手帳模式 */}
      {viewMode === 'flip' ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full overflow-visible py-2"
          style={{ perspective: '1800px' }}
        >
          {/* 底座多層棉紙厚度視覺效果 (Layered Paper Stack) */}
          <div className="absolute inset-0 max-w-full rounded-[22px] bg-[#FDF9F2] border-[1.5px] border-[#E8DEC8] shadow-md translate-x-1.5 translate-y-2 pointer-events-none -z-10" />
          <div className="absolute inset-0 max-w-full rounded-[24px] bg-[#F9F3E6] border-[1.5px] border-[#E2D5BE] shadow-lg translate-x-3 translate-y-4 pointer-events-none -z-20" />

          {/* 當前紙張主卡片 (具備 3D 紙張翻動姿態) */}
          <div
            ref={pageContainerRef}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-full will-change-transform"
          >
            <ScrapbookMonthCard
              key={currentMonth.id}
              month={currentMonth}
              photoStates={photoStates}
              onUpdatePhotoState={onUpdatePhotoState}
              onBatchUpdatePhotoState={onBatchUpdatePhotoState}
            />
          </div>

          {/* 底部翻頁懸浮控制列 (手作書籤皮帶風格) */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 px-3 select-none">
            {/* 上一頁按鈕 */}
            <button
              onClick={() => goToPage(currentIndex - 1)}
              disabled={currentIndex === 0 || isFlipping}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-[1.5px] text-xs sm:text-sm font-bold transition-all shadow-sm ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-[#E0D4C5] bg-[#FAF5EE] text-[#A89885]'
                  : 'cursor-pointer border-[#4A3319] bg-[#FFFDF6] text-[#4A3319] hover:bg-[#FED458] hover:scale-105 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>
                {currentIndex > 0
                  ? `上一頁 ・ ${getMonthShortName(months[currentIndex - 1])}`
                  : '第一頁'}
              </span>
            </button>

            {/* 頁碼指針與年份手寫註記 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4A3319]">
                <BeretIcon size={15} className="text-[#E68A00]" />
                <span className="font-['Caveat'] text-lg font-bold">
                  Page {currentIndex + 1} / {months.length}
                </span>
                <span className="text-[#8C6D4F] font-normal text-xs sm:text-sm">
                  ({currentMonth.titleBadge})
                </span>
              </div>
              <span className="text-[11px] text-[#A89885] mt-0.5 hidden sm:inline">
                可使用鍵盤左右鍵 ◀ ▶ 或觸控滑動翻閱
              </span>
            </div>

            {/* 下一頁按鈕 */}
            <button
              onClick={() => goToPage(currentIndex + 1)}
              disabled={currentIndex === months.length - 1 || isFlipping}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-[1.5px] text-xs sm:text-sm font-bold transition-all shadow-sm ${
                currentIndex === months.length - 1
                  ? 'opacity-40 cursor-not-allowed border-[#E0D4C5] bg-[#FAF5EE] text-[#A89885]'
                  : 'cursor-pointer border-[#4A3319] bg-[#FED458] text-[#4A3319] hover:bg-[#FFC629] hover:scale-105 active:scale-95 shadow-[0_2px_8px_rgba(230,138,0,0.2)]'
              }`}
            >
              <span>
                {currentIndex < months.length - 1
                  ? `下一頁 ・ ${getMonthShortName(months[currentIndex + 1])}`
                  : '最後一頁'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* 模式 B：長卷全覽展開模式 */
        <div className="space-y-8 sm:space-y-12 py-2">
          {months.map((month) => (
            <ScrapbookMonthCard
              key={month.id}
              month={month}
              photoStates={photoStates}
              onUpdatePhotoState={onUpdatePhotoState}
              onBatchUpdatePhotoState={onBatchUpdatePhotoState}
            />
          ))}
        </div>
      )}
    </div>
  );
};
