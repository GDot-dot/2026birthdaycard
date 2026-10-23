import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { MonthData, PhotoItem, PhotoState } from '../types';
import { TransformablePolaroid, PolaroidHandle } from './TransformablePolaroid';
import { FukubukuroIcon, PostalStampMark, PawPrintIcon } from './DecorativeOrnaments';

interface ScrapbookMonthCardProps {
  month: MonthData;
  photoStates: Record<string, PhotoState>;
  onUpdatePhotoState: (id: string, updates: Partial<PhotoState>) => void;
  onBatchUpdatePhotoState: (updates: Record<string, Partial<PhotoState>>) => void;
}

// 核心安全函數：為每張照片取得絕對唯一的獨立識別碼，避免同 group 照片共享縮放或旋轉
export const getPhotoUniqueId = (photo: PhotoItem, index: number, allPhotos: PhotoItem[]): string => {
  const duplicateCount = allPhotos.filter((p) => p.id === photo.id).length;
  // 若未填 id、或誤將 groupId 當成 id、或照片 id 有重複，自動以索引後綴隔離
  if (!photo.id || photo.id === photo.groupId || duplicateCount > 1) {
    return `${photo.id || photo.groupId || 'photo'}_u${index}`;
  }
  return photo.id;
};

export const ScrapbookMonthCard: React.FC<ScrapbookMonthCardProps> = ({
  month,
  photoStates,
  onUpdatePhotoState,
  onBatchUpdatePhotoState
}) => {
  const pouchRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<Record<string, PolaroidHandle | null>>({});
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [isDropHover, setIsDropHover] = useState(false);

  // 精準計算照片中心與福袋中心點的相對位移
  const getPouchDelta = (photoEl: HTMLElement, pouchEl: HTMLElement) => {
    const photoRect = photoEl.getBoundingClientRect();
    const pouchRect = pouchEl.getBoundingClientRect();
    return {
      x: pouchRect.left + pouchRect.width / 2 - (photoRect.left + photoRect.width / 2),
      y: pouchRect.top + pouchRect.height / 2 - (photoRect.top + photoRect.height / 2)
    };
  };

  // 計算袋內照片數量
  const hiddenCount = month.photos.filter((p, idx) => {
    const uid = getPhotoUniqueId(p, idx, month.photos);
    const s = photoStates[uid] || photoStates[p.id];
    return !s || s.inPouch !== false;
  }).length;

  // 1. 飛出照片動畫 (從福袋飛向畫布目標位置)
  const animateFlyOut = (photosToFly: typeof month.photos) => {
    const pouch = pouchRef.current;
    if (!pouch) return;

    // 福袋彈跳俏皮震動
    gsap.fromTo(
      pouch,
      { scale: 0.8 },
      { scale: 1.25, rotation: -8, yoyo: true, repeat: 1, duration: 0.22, ease: 'power1.out' }
    );

    photosToFly.forEach((photo, i) => {
      const photoIndex = month.photos.indexOf(photo);
      const uid = getPhotoUniqueId(photo, photoIndex >= 0 ? photoIndex : i, month.photos);
      const handle = photoRefs.current[uid];
      const photoEl = handle?.getElement();
      if (!photoEl) return;

      const pState = photoStates[uid] || photoStates[photo.id] || {};
      const targetX = pState.x || 0;
      const targetY = pState.y || 0;
      const targetRot = pState.rot !== undefined ? pState.rot : photo.defaultPosition.rotateDeg || 0;

      // 先設為可見並計算相對座標
      photoEl.style.display = 'block';
      const delta = getPouchDelta(photoEl, pouch);

      onUpdatePhotoState(uid, { inPouch: false, x: targetX, y: targetY, rot: targetRot });

      gsap.fromTo(
        photoEl,
        {
          scale: 0.05,
          opacity: 0,
          x: targetX + delta.x,
          y: targetY + delta.y
        },
        {
          scale: 1,
          opacity: 1,
          x: targetX,
          y: targetY,
          rotation: targetRot,
          duration: 0.65,
          delay: i * 0.12,
          ease: 'back.out(1.6)'
        }
      );
    });
  };

  // 2. 吸入福袋動畫 (縮小並吸入福袋口)
  const animateSuckBack = (photosToSuck: typeof month.photos) => {
    const pouch = pouchRef.current;
    if (!pouch) return;

    setSelectedPhotoId(null);

    photosToSuck.forEach((photo, i) => {
      const photoIndex = month.photos.indexOf(photo);
      const uid = getPhotoUniqueId(photo, photoIndex >= 0 ? photoIndex : i, month.photos);
      const handle = photoRefs.current[uid];
      const photoEl = handle?.getElement();
      if (!photoEl || photoEl.style.display === 'none') return;

      const pState = photoStates[uid] || photoStates[photo.id] || {};
      const currentX = pState.x || 0;
      const currentY = pState.y || 0;
      const delta = getPouchDelta(photoEl, pouch);

      gsap.to(photoEl, {
        scale: 0.05,
        opacity: 0,
        x: currentX + delta.x,
        y: currentY + delta.y,
        duration: 0.42,
        delay: i * 0.08,
        ease: 'power2.in',
        onComplete: () => {
          photoEl.style.display = 'none';
          gsap.set(photoEl, { x: currentX, y: currentY, scale: 1, opacity: 1 });
          onUpdatePhotoState(uid, { inPouch: true });
        }
      });
    });

    // 福袋吞入彈動
    gsap.fromTo(
      pouch,
      { scale: 1.35 },
      { scale: 1, duration: 0.45, delay: 0.15, ease: 'elastic.out(1, 0.4)' }
    );
  };

  // 點擊觸發詞：開合照片群組
  const handleTriggerClick = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();

    // 局部細緻手作小紙屑
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 22,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#FED458', '#E68A00', '#F28B82', '#4A3319']
    });

    const groupPhotos = month.photos.filter((p) => p.groupId === groupId);
    if (groupPhotos.length === 0) return;

    // 檢查該群組是否已全數在外面
    const allAreOut = groupPhotos.every((p) => {
      const photoIndex = month.photos.indexOf(p);
      const uid = getPhotoUniqueId(p, photoIndex, month.photos);
      const s = photoStates[uid] || photoStates[p.id];
      return s && s.inPouch === false;
    });

    if (allAreOut) {
      animateSuckBack(groupPhotos);
    } else {
      animateFlyOut(groupPhotos);
    }
  };

  // 點擊福袋：一鍵全拿或全收
  const handlePouchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const hiddenPhotos = month.photos.filter((p, idx) => {
      const uid = getPhotoUniqueId(p, idx, month.photos);
      const s = photoStates[uid] || photoStates[p.id];
      return !s || s.inPouch !== false;
    });

    if (hiddenPhotos.length > 0) {
      animateFlyOut(hiddenPhotos);
    } else {
      animateSuckBack(month.photos);
    }
  };

  // 拖曳照片時偵測是否靠近福袋
  const handleDragMove = (_e: MouseEvent | TouchEvent, el: HTMLDivElement) => {
    if (!pouchRef.current) return;
    const pRect = pouchRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const isOverlapping = !(
      elRect.right < pRect.left ||
      elRect.left > pRect.right ||
      elRect.bottom < pRect.top ||
      elRect.top > pRect.bottom
    );

    setIsDropHover(isOverlapping);
  };

  // 拖曳結束：若落在福袋上則吸入
  const handleDragEnd = (el: HTMLDivElement) => {
    if (isDropHover && selectedPhotoId && pouchRef.current) {
      const photo = month.photos.find((p, idx) => {
        const uid = getPhotoUniqueId(p, idx, month.photos);
        return uid === selectedPhotoId || p.id === selectedPhotoId;
      });
      if (photo) {
        animateSuckBack([photo]);
      }
    }
    setIsDropHover(false);
  };

  const washiClass =
    month.washiType === 'coral'
      ? 'washi-tape-coral'
      : month.washiType === 'mint'
      ? 'washi-tape-mint'
      : 'washi-tape';

  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('.polaroid-frame') || (e.target as HTMLElement).closest('.trigger-word')) return;
        setSelectedPhotoId(null);
      }}
      className="greeting-card-deck relative w-full my-12 sm:my-16 p-6 sm:p-10 select-none overflow-visible transition-shadow"
    >
      {/* 頂部手撕紙膠帶 */}
      <div
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-6 ${washiClass} rounded-sm shadow-sm pointer-events-none z-10`}
      />

      {/* 頂部月曆手札標籤 */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF4CE] border-[1.5px] border-[#4A3319] rounded-full shadow-[0_2px_6px_rgba(74,51,25,0.08)]">
          <PawPrintIcon size={14} className="text-[#E68A00]" />
          <span className="text-sm sm:text-base font-bold text-[#4A3319] tracking-wide">
            {month.titleBadge}
          </span>
        </div>

        {/* 復古郵戳點綴 */}
        <div className="hidden sm:block">
          <PostalStampMark label="MEMORY" date={month.id.replace('month_', '').replace('_', '.')} />
        </div>
      </div>

      {/* 手帳分欄排版 (左側文字日記 + 右側照片自由拼貼大畫布) */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 min-h-[520px]">
        {/* 左側：手帳文字筆記欄 */}
        <div className="bg-[#FFFDF6]/90 border-[1.5px] border-[#EAE0D3] rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            <div className="font-['Caveat'] text-2xl sm:text-3xl font-bold text-[#E68A00] pb-2 mb-4 border-b border-dashed border-[#E68A00]/30">
              {month.subHeader}
            </div>

            <div className="text-[15.5px] leading-[2.2] text-[#4A3319] space-y-3 font-normal">
              {month.diaryHtmlFragments.map((frag, i) => {
                const groupPhotos = frag.triggerWord
                  ? month.photos.filter((p) => p.groupId === frag.triggerWord?.groupId)
                  : [];
                const isGroupOut =
                  groupPhotos.length > 0 &&
                  groupPhotos.every((p) => {
                    const photoIndex = month.photos.indexOf(p);
                    const uid = getPhotoUniqueId(p, photoIndex, month.photos);
                    return photoStates[uid]?.inPouch === false;
                  });

                return (
                  <p key={i} className="text-left leading-[2.2] break-words">
                    {frag.textBefore}
                    {frag.triggerWord && (
                      <button
                        onClick={(e) => handleTriggerClick(e, frag.triggerWord!.groupId)}
                        className={`trigger-word inline-block mx-1 px-2.5 py-0.5 rounded-md font-bold transition-all duration-200 cursor-pointer border-b-[2px] shadow-sm ${
                          isGroupOut
                            ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#4CAF50] scale-[1.02]'
                            : 'bg-[#FFE98A] text-[#8C3B00] border-[#E68A00] hover:bg-[#FED458] hover:scale-105 active:scale-95'
                        }`}
                        title="點擊展開/收納照片"
                      >
                        {frag.triggerWord.label}
                      </button>
                    )}
                    {frag.textAfter}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EAE0D3] flex items-center justify-between text-xs text-[#8C6D4F]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#E68A00]" />
              點擊高亮文字・照片彈跳飛出
            </span>
            <span className="font-['Caveat'] text-sm font-bold text-[#4A3319]">
              Memories with 咪
            </span>
          </div>
        </div>

        {/* 右側：自由擺放拍立得畫布區 */}
        <div className="relative bg-[#FAF6F0]/60 border-2 border-dashed border-[#E0D6C6] rounded-2xl min-h-[480px] overflow-hidden p-4">
          {/* 畫布空狀態引導 */}
          {hiddenCount === month.photos.length && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none opacity-60">
              <FukubukuroIcon size={44} className="mb-2 text-[#8C6D4F]" />
              <p className="text-sm font-bold text-[#4A3319]">照片已收納在右下角福袋中</p>
              <p className="text-xs text-[#8C6D4F] mt-1">點擊左側文字關鍵字，或點擊福袋拿出照片自由拼貼</p>
            </div>
          )}

          {/* 拍立得照片群組：每張相片皆具備獨立 uid，大小、旋轉、拖曳完全各自獨立 */}
          {month.photos.map((photo, index) => {
            const uid = getPhotoUniqueId(photo, index, month.photos);
            const pState = photoStates[uid] || photoStates[photo.id] || {
              x: 0,
              y: 0,
              rot: photo.defaultPosition.rotateDeg || 0,
              width: 210,
              inPouch: true
            };

            return (
              <TransformablePolaroid
                key={uid}
                uniqueId={uid}
                ref={(el) => {
                  photoRefs.current[uid] = el;
                }}
                photo={photo}
                state={pState}
                isSelected={selectedPhotoId === uid}
                onSelect={() => setSelectedPhotoId(uid)}
                onUpdateState={onUpdatePhotoState}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
              />
            );
          })}

          {/* 右下角：和風布丁狗小福袋 */}
          <div
            ref={pouchRef}
            onClick={handlePouchClick}
            className={`fukubukuro-pouch absolute bottom-4 right-4 z-40 cursor-pointer select-none transition-transform duration-200 ${
              isDropHover
                ? 'scale-125 filter drop-shadow-[0_0_14px_#E68A00] animate-bounce'
                : 'hover:scale-110 hover:-rotate-3 active:scale-95'
            }`}
            title="點擊取出/收起所有照片，或將照片拖曳至此處收納"
          >
            {/* 袋內照片計數徽章 */}
            <div className="absolute -top-2 -right-2 bg-[#D32F2F] text-white text-[11px] font-black w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-md z-10">
              {hiddenCount}
            </div>

            {/* 福袋本體 */}
            <div className="w-14 h-16 relative flex flex-col items-center justify-end">
              <FukubukuroIcon size={56} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
