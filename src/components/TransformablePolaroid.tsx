import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { RotateCw } from 'lucide-react';
import { PhotoItem, PhotoState } from '../types';

export interface PolaroidHandle {
  getElement: () => HTMLDivElement | null;
}

interface TransformablePolaroidProps {
  photo: PhotoItem;
  uniqueId?: string;
  state: PhotoState;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateState: (id: string, updates: Partial<PhotoState>) => void;
  onDragMove?: (e: PointerEvent, el: HTMLDivElement) => void;
  onDragEnd?: (
    photoId: string,
    el: HTMLDivElement,
    initialPos: { x: number; y: number },
    e: PointerEvent
  ) => void;
}

export const TransformablePolaroid = forwardRef<PolaroidHandle, TransformablePolaroidProps>(
  (
    {
      photo,
      uniqueId,
      state,
      isSelected,
      onSelect,
      onUpdateState,
      onDragMove,
      onDragEnd
    },
    ref
  ) => {
    const polaroidRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [imgSrc, setImgSrc] = useState(photo.src);
    const [hasAttemptedFallback, setHasAttemptedFallback] = useState(false);

    // 每一張照片使用專屬獨立 ID，確保縮放、拖曳與旋轉完全獨立
    const actualId = uniqueId || photo.id;

    useEffect(() => {
      setImgSrc(photo.src);
      setHasAttemptedFallback(false);
    }, [photo.src]);

    const handleImageError = () => {
      if (!hasAttemptedFallback) {
        if (photo.src.endsWith('.jpg')) {
          setImgSrc(photo.src.replace('.jpg', '.JPG'));
          setHasAttemptedFallback(true);
        } else if (photo.src.endsWith('.JPG')) {
          setImgSrc(photo.src.replace('.JPG', '.png'));
          setHasAttemptedFallback(true);
        } else {
          setImgSrc(photo.fallbackSrc);
          setHasAttemptedFallback(true);
        }
      } else {
        setImgSrc(photo.fallbackSrc);
      }
    };

    useImperativeHandle(ref, () => ({
      getElement: () => polaroidRef.current
    }));

    // 處理滑鼠/觸控拖曳
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest('.control-handle')) return;

      onSelect();
      setIsDragging(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const initialPosX = state.x;
      const initialPosY = state.y;

      const onPointerMove = (ev: PointerEvent) => {
        const deltaX = ev.clientX - startX;
        const deltaY = ev.clientY - startY;
        const newX = initialPosX + deltaX;
        const newY = initialPosY + deltaY;

        onUpdateState(actualId, { x: newX, y: newY });
        if (polaroidRef.current && onDragMove) {
          onDragMove(ev, polaroidRef.current);
        }
      };

      const onPointerUp = (ev: PointerEvent) => {
        setIsDragging(false);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        if (polaroidRef.current && onDragEnd) {
          onDragEnd(actualId, polaroidRef.current, { x: initialPosX, y: initialPosY }, ev);
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    };

    // 處理單張照片獨立 360° 旋轉
    const handleRotatePointerDown = (e: React.PointerEvent) => {
      e.stopPropagation();
      const polaroidEl = polaroidRef.current;
      if (!polaroidEl) return;

      const rect = polaroidEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const onRotateMove = (ev: PointerEvent) => {
        const rad = Math.atan2(ev.clientY - centerY, ev.clientX - centerX);
        const deg = Math.round(rad * (180 / Math.PI) + 90);
        onUpdateState(actualId, { rot: deg });
      };

      const onRotateUp = () => {
        window.removeEventListener('pointermove', onRotateMove);
        window.removeEventListener('pointerup', onRotateUp);
      };

      window.addEventListener('pointermove', onRotateMove);
      window.addEventListener('pointerup', onRotateUp);
    };

    // 處理單張照片獨立四角縮放（不影響同 group 的其他照片）
    const handleScalePointerDown = (e: React.PointerEvent, isRight: boolean) => {
      e.stopPropagation();
      const startX = e.clientX;
      const polaroidEl = polaroidRef.current;
      const startWidth = polaroidEl ? polaroidEl.offsetWidth : (state.width || 210);

      const onScaleMove = (ev: PointerEvent) => {
        const deltaX = (ev.clientX - startX) * (isRight ? 1 : -1);
        const newWidth = Math.max(100, Math.min(600, Math.round(startWidth + deltaX)));

        // 即時更新該照片實體寬度
        if (polaroidEl) {
          polaroidEl.style.width = `${newWidth}px`;
        }
        onUpdateState(actualId, { width: newWidth });
      };

      const onScaleUp = () => {
        window.removeEventListener('pointermove', onScaleMove);
        window.removeEventListener('pointerup', onScaleUp);
      };

      window.addEventListener('pointermove', onScaleMove);
      window.addEventListener('pointerup', onScaleUp);
    };

    // 支援色碼（例如 '#FFB6C1'、'#87CEEB'、甚至未加 '#' 的 'FFB6C1'）或預設風格名稱
    const parseCustomTapeColor = (val?: string): string | undefined => {
      if (!val) return undefined;
      const trimmed = val.trim();
      if (trimmed.startsWith('#') || trimmed.startsWith('rgb') || trimmed.startsWith('hsl')) {
        return trimmed;
      }
      if (/^[0-9a-fA-F]{3,8}$/.test(trimmed)) {
        return `#${trimmed}`;
      }
      return undefined;
    };

    const customTapeColor = parseCustomTapeColor(photo.tapeColor);

    const customTapeStyle = customTapeColor ? {
      background: `repeating-linear-gradient(
        -45deg,
        ${customTapeColor}cc,
        ${customTapeColor}cc 6px,
        ${customTapeColor}90 6px,
        ${customTapeColor}90 12px
      )`,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
    } : undefined;

    const tapeBgClass = customTapeColor
      ? 'washi-tape'
      : photo.tapeColor === 'coral'
      ? 'washi-tape-coral'
      : photo.tapeColor === 'mint'
      ? 'washi-tape-mint'
      : photo.tapeColor === 'lavender'
      ? 'washi-tape-lavender'
      : photo.tapeColor === 'sky'
      ? 'washi-tape-sky'
      : photo.tapeColor === 'sakura'
      ? 'washi-tape-sakura'
      : photo.tapeColor === 'matcha'
      ? 'washi-tape-matcha'
      : photo.tapeColor === 'caramel'
      ? 'washi-tape-caramel'
      : 'washi-tape';

    return (
      <div
        ref={polaroidRef}
        data-id={actualId}
        data-group={photo.groupId}
        onPointerDown={handlePointerDown}
        style={{
          display: state.inPouch ? 'none' : 'block',
          transform: `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rot}deg)`,
          width: `${state.width || 210}px`,
          top: `${photo.defaultPosition.topPercent}%`,
          left: `${photo.defaultPosition.leftPercent}%`
        }}
        className={`transformable-polaroid absolute z-20 select-none touch-none p-2.5 pb-4 bg-[#FFFFFF] polaroid-frame cursor-grab active:cursor-grabbing will-change-transform ${
          isSelected ? 'is-selected ring-2 ring-[#E68A00]' : ''
        } ${isDragging ? 'shadow-2xl scale-[1.02]' : ''}`}
      >
        {/* 頂部紙膠帶（支援預設名或任意自訂色碼） */}
        <div
          style={customTapeStyle}
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 ${tapeBgClass} rounded-sm shadow-sm pointer-events-none z-10`}
        />

        {/* 照片圖片與圓角：支援直式（手機直拍）與橫式自然比例 */}
        <div className="relative overflow-hidden rounded bg-[#F8F4EE] flex items-center justify-center min-h-[140px] max-h-[75vh]">
          <img
            src={imgSrc}
            alt={photo.caption}
            onError={handleImageError}
            className="w-full h-auto max-h-[65vh] object-contain rounded-sm pointer-events-none select-none transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* 拍立得手寫簽名題字 */}
        <div className="mt-2.5 text-center px-1">
          <p className="font-['Zen_Maru_Gothic'] text-[13px] font-bold text-[#4A3319] leading-snug truncate">
            {photo.caption}
          </p>
        </div>

        {/* 選中時只在當前點擊的照片顯示獨立把手 */}
        {isSelected && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* 頂部獨立 360° 旋轉把手 */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto control-handle">
              <button
                onPointerDown={handleRotatePointerDown}
                className="w-6 h-6 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#E68A00] text-[#E68A00] flex items-center justify-center shadow-md hover:bg-[#E68A00] hover:text-white transition-colors cursor-grab active:cursor-grabbing"
                title="按住旋轉此照片"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1.5px] h-2 bg-[#E68A00]" />
            </div>

            {/* 四角獨立縮放點 */}
            <div
              onPointerDown={(e) => handleScalePointerDown(e, true)}
              className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#E68A00] shadow-sm pointer-events-auto cursor-nwse-resize hover:scale-125 transition-transform control-handle"
              title="拖動縮放此照片大小"
            />
            <div
              onPointerDown={(e) => handleScalePointerDown(e, false)}
              className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#E68A00] shadow-sm pointer-events-auto cursor-nesw-resize hover:scale-125 transition-transform control-handle"
              title="拖動縮放此照片大小"
            />
          </div>
        )}
      </div>
    );
  }
);
