import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BeretIcon, PawPrintIcon, PurinFaceIcon } from './DecorativeOrnaments';
import { Sparkles, Heart, RotateCcw, FileText, ExternalLink } from 'lucide-react';
import { LetterPdfViewerModal } from './LetterPdfViewerModal';

interface CelebrationSectionProps {
  onBlowCandle?: () => void;
  onResetCandle?: () => void;
  pdfUrl?: string;
}

export const CelebrationSection: React.FC<CelebrationSectionProps> = ({
  onBlowCandle,
  onResetCandle,
  pdfUrl = 'documents/2026_birthday_letter.pdf'
}) => {
  const [isBlown, setIsBlown] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const handleBlowCandle = () => {
    setIsBlown(true);
    onBlowCandle?.();

    // 豪華暖金與繽紛生日紙花盛宴
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.65 },
      colors: ['#FED458', '#E68A00', '#F28B82', '#81C784', '#4A3319', '#FFFFFF']
    });

    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#FED458', '#E68A00', '#FFE082']
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#F28B82', '#FFFDF4', '#81C784']
      });
    }, 300);
  };

  const handleReset = () => {
    setIsBlown(false);
    onResetCandle?.();
  };

  return (
    <section className="relative my-20 sm:my-28 text-center flex flex-col items-center justify-center px-4 select-none">
      {/* 手繪生日蛋糕與燭火 */}
      <div className="relative mb-8 flex flex-col items-center">
        {/* 燭火光芒 */}
        <div className="relative h-16 flex items-center justify-center">
          {!isBlown ? (
            <div className="flex flex-col items-center animate-[bounce_1.5s_infinite]">
              {/* 火焰主體 */}
              <div className="w-4 h-7 bg-gradient-to-t from-[#E68A00] via-[#FED458] to-[#FFFDF4] rounded-full shadow-[0_0_20px_#FED458] filter blur-[0.5px] animate-pulse" />
              {/* 燭芯 */}
              <div className="w-0.5 h-3 bg-[#4A3319] -mt-1" />
            </div>
          ) : (
            <div className="flex flex-col items-center animate-fade-out">
              {/* 裊裊輕煙 */}
              <div className="text-xs font-serif text-[#8C6D4F] animate-[pulse_2s_infinite]">
                ~ 願望成真 ~
              </div>
              <div className="w-0.5 h-3 bg-[#4A3319]" />
            </div>
          )}
        </div>

        {/* 雙層布丁布丁狗蛋糕身 */}
        <div className="relative w-40 sm:w-48 bg-[#FFF4C2] border-[2.5px] border-[#4A3319] rounded-2xl p-4 shadow-[0_12px_30px_rgba(74,51,25,0.14)] flex flex-col items-center">
          {/* 蛋糕上層焦糖淋醬 */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-[#7A4B23] rounded-t-xl" />
          {/* 24 歲金色小糖霜立牌 */}
          <div className="mt-3 flex items-center gap-1 px-3 py-1 bg-[#FFFFFF] border border-[#E68A00] rounded-full shadow-sm text-xs font-bold text-[#E68A00]">
            <Sparkles className="w-3 h-3" />
            <span>24 歲生日特製</span>
            <Sparkles className="w-3 h-3" />
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            <PurinFaceIcon size={26} />
            <span className="font-['Caveat'] text-2xl font-bold text-[#4A3319]">For Phoebe</span>
          </div>
        </div>
      </div>

      {/* 互動吹蠟燭按鈕 */}
      {!isBlown ? (
        <button
          onClick={handleBlowCandle}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-[#FED458] hover:bg-[#FFE082] text-[#4A3319] font-black text-base sm:text-lg rounded-full border-[2.5px] border-[#4A3319] shadow-[0_8px_24px_rgba(230,138,0,0.35)] hover:shadow-[0_12px_30px_rgba(230,138,0,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all cursor-pointer"
        >
          <BeretIcon size={20} className="group-hover:rotate-12 transition-transform" />
          <span>輕輕吹熄蠟燭・許下 24 歲願望</span>
          <Sparkles className="w-5 h-5 text-[#E68A00]" />
        </button>
      ) : (
        <div className="w-full max-w-xl bg-[#FFFFFF] border-[2px] border-[#4A3319] rounded-3xl p-8 sm:p-10 shadow-[0_18px_45px_rgba(74,51,25,0.14)] animate-in fade-in zoom-in-95 duration-500">
          <div className="flex items-center justify-center gap-2 text-[#E68A00] mb-3">
            <PawPrintIcon size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">Birthday Wish for Phoebe</span>
            <PawPrintIcon size={16} />
          </div>

          <h3 className="font-['Caveat'] text-3xl sm:text-4xl font-bold text-[#4A3319] mb-4">
            祝寶貝咪 24 歲生日快樂！
          </h3>

          <p className="text-base sm:text-lg leading-relaxed text-[#5C3D28] font-medium mb-6">
            願新的一歲裡，所有的日子都能更加順利勢如破竹，生活充滿意想不到的困難寶寶都能與咪一起協心克服。
            無論是大安森林公園的散步、鐵道旅行、或是今日的冬日溫泉，我們一起創造了無數的回憶！未來也一起牽手走下去。
          </p>

          {/* 💌 專屬手寫信 / 紀念 PDF 附錄插槽 */}
          <div className="my-6 p-4 rounded-2xl bg-[#FFF9E6] border-[1.5px] border-[#E68A00]/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FED458] border border-[#4A3319] flex items-center justify-center text-[#4A3319] shrink-0 shadow-sm">
                <FileText className="w-5 h-5 text-[#4A3319]" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-[#4A3319] flex items-center gap-1.5">
                  <span>給咪的一封秘密手寫信</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E68A00] text-white font-mono font-bold">
                    PDF
                  </span>
                </div>
                <p className="text-xs text-[#8C6D4F] mt-0.5">點擊即刻在線展開閱讀專屬信件</p>
              </div>
            </div>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-4 py-2 bg-[#FED458] hover:bg-[#FFC629] text-[#4A3319] font-bold text-xs rounded-full border border-[#4A3319] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>點此翻開信件</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#8C6D4F] pt-4 border-t border-dashed border-[#EAE0D3]">
            <Heart className="w-4 h-4 text-[#F28B82] fill-current" />
            <span>願所有美好都與咪同在</span>
            <Heart className="w-4 h-4 text-[#F28B82] fill-current" />
          </div>

          <button
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FFF8E1] hover:bg-[#FFE082] text-[#4A3319] text-xs font-bold rounded-full border border-[#4A3319]/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>再點亮一次蠟燭</span>
          </button>
        </div>
      )}

      {/* 典雅在線 PDF 手寫信彈窗 (以 HTML5 Canvas 渲染，徹底解決 iframe 俄羅斯娃娃問題) */}
      <LetterPdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={pdfUrl}
      />
    </section>
  );
};
