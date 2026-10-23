/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { AudioDeck } from './components/AudioDeck';
import { EnvelopeScreen } from './components/EnvelopeScreen';
import { ScrapbookMonthCard } from './components/ScrapbookMonthCard';
import { CelebrationSection } from './components/CelebrationSection';
import { scrapbookMonths } from './data/scrapbookData';
import { PhotoState } from './types';
import { BeretIcon, PawPrintIcon, PurinFaceIcon } from './components/DecorativeOrnaments';
import { Heart, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'purin_birthday_scrapbook_state_v5';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [photoStates, setPhotoStates] = useState<Record<string, PhotoState>>({});

  // 1. 載入本機記憶的照片拼貼狀態 (相容先前儲存資料)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPhotoStates(parsed);
      }
    } catch (e) {
      console.warn('Failed to parse saved photo state:', e);
    }
  }, []);

  // 2. 儲存狀態至 localStorage
  const saveStates = (newStates: Record<string, PhotoState>) => {
    setPhotoStates(newStates);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStates));
    } catch (e) {
      console.warn('Failed to write to localStorage:', e);
    }
  };

  const handleUpdatePhotoState = (id: string, updates: Partial<PhotoState>) => {
    setPhotoStates((prev) => {
      const current = prev[id] || {
        x: 0,
        y: 0,
        rot: 0,
        width: 210,
        inPouch: true
      };
      const updated = {
        ...prev,
        [id]: { ...current, ...updates }
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleBatchUpdatePhotoState = (updates: Record<string, Partial<PhotoState>>) => {
    setPhotoStates((prev) => {
      const updated = { ...prev };
      Object.entries(updates).forEach(([id, u]) => {
        const current = updated[id] || {
          x: 0,
          y: 0,
          rot: 0,
          width: 210,
          inPouch: true
        };
        updated[id] = { ...current, ...u };
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <div className="min-h-screen relative text-[#4A3319] selection:bg-[#FFE082] selection:text-[#4A3319]">
      {/* 宣紙/棉紙自然微細顆粒 */}
      <div className="paper-texture-overlay" />

      {/* 精緻不擋眼的布丁狗屁屁米字 (＊) 游標跟隨器 */}
      <CustomCursor />

      {/* 典雅復古音樂播放艙 */}
      <AudioDeck shouldPlay={isEnvelopeOpened} />

      {/* 第一幕：3D 視差開合立體信封 */}
      {!isEnvelopeOpened ? (
        <EnvelopeScreen onOpen={() => setIsEnvelopeOpened(true)} />
      ) : (
        /* 第二幕：巨幅手帳月記與賀卡拍立得畫布 */
        <main className="relative max-w-[1240px] mx-auto px-4 sm:px-8 py-12 sm:py-16 animate-in fade-in duration-700">
          {/* 賀卡頂部典雅手寫扉頁 */}
          <header className="text-center mb-10 select-none">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF4CE] border-[1.5px] border-[#4A3319] rounded-full shadow-sm mb-4">
              <BeretIcon size={14} className="text-[#E68A00]" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#4A3319]">
                SANRIO POMPOMPURIN SPECIAL EDITION
              </span>
              <BeretIcon size={14} className="text-[#E68A00]" />
            </div>

            <h1 className="font-['Caveat'] text-5xl sm:text-6xl md:text-7xl font-bold text-[#4A3319] leading-tight mb-2">
              寶貝咪 24 歲生日月記
            </h1>

            <p className="text-sm sm:text-base font-bold text-[#8C6D4F] max-w-lg mx-auto flex items-center justify-center gap-1.5 mt-2">
              <Sparkles className="w-4 h-4 text-[#E68A00]" />
              收集這一年份的歡笑、溫暖與點滴心動
              <Sparkles className="w-4 h-4 text-[#E68A00]" />
            </p>
          </header>

          {/* 三個月份手帳賀卡主卡片 */}
          <div className="space-y-6 sm:space-y-10">
            {scrapbookMonths.map((month) => (
              <ScrapbookMonthCard
                key={month.id}
                month={month}
                photoStates={photoStates}
                onUpdatePhotoState={handleUpdatePhotoState}
                onBatchUpdatePhotoState={handleBatchUpdatePhotoState}
              />
            ))}
          </div>

          {/* 底部：互動吹蠟燭生日祝賀與真摯賀詞 */}
          <CelebrationSection />

          {/* 典雅頁腳 (無 AI 虛假儀表板，乾淨真誠) */}
          <footer className="mt-16 pb-12 text-center text-xs text-[#8C6D4F]/80 flex flex-col items-center gap-2 select-none">
            <div className="flex items-center gap-2">
              <PurinFaceIcon size={20} />
              <span className="font-bold">Made with Love for 咪</span>
              <Heart className="w-3.5 h-3.5 text-[#F28B82] fill-current" />
            </div>
            <p className="text-[11px] font-sans">
              2025 – 2026 ・ Happy 24th Birthday Memory Book
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}
