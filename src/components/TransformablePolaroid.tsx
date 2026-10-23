import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { RotateCw } from 'lucide-react';
import { PhotoItem, PhotoState } from '../types';

export interface PolaroidHandle {
  getElement: () => HTMLDivElement | null;
}

interface TransformablePolaroidProps {
  photo: PhotoItem;
  state: PhotoState;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateState: (id: string, updates: Partial<PhotoState>) => void;
  onDragMove?: (e: MouseEvent | TouchEvent, el: HTMLDivElement) => void;
  onDragEnd?: (el: HTMLDivElement) => void;
}

export const TransformablePolaroid = forwardRef<PolaroidHandle, TransformablePolaroidProps>(
  (
    {
      photo,
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
    const [imgError, setImgError] = useState(false);

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

        onUpdateState(photo.id, { x: newX, y: newY });
        if (polaroidRef.current && onDragMove) {
          onDragMove(ev, polaroidRef.current);
        }
      };

      const onPointerUp = () => {
        setIsDragging(false);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        if (polaroidRef.current && onDragEnd) {
          onDragEnd(polaroidRef.current);
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    };

    // 處理 360° 旋轉
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
        onUpdateState(photo.id, { rot: deg });
      };

      const onRotateUp = () => {
        window.removeEventListener('pointermove', onRotateMove);
        window.removeEventListener('pointerup', onRotateUp);
      };

      window.addEventListener('pointermove', onRotateMove);
      window.addEventListener('pointerup', onRotateUp);
    };

    // 處理四角縮放
    const handleScalePointerDown = (e: React.PointerEvent, isRight: boolean) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startWidth = state.width;

      const onScaleMove = (ev: PointerEvent) => {
        const deltaX = (ev.clientX - startX) * (isRight ? 1 : -1);
        const newWidth = Math.max(120, Math.min(420, startWidth + deltaX));
        onUpdateState(photo.id, { width: newWidth });
      };

      const onScaleUp = () => {
        window.removeEventListener('pointermove', onScaleMove);
        window.removeEventListener('pointerup', onScaleUp);
      };

      window.addEventListener('pointermove', onScaleMove);
      window.addEventListener('pointerup', onScaleUp);
    };

    const tapeBgClass =
      photo.tapeColor === 'coral'
        ? 'washi-tape-coral'
        : photo.tapeColor === 'mint'
        ? 'washi-tape-mint'
        : 'washi-tape';

    return (
      <div
        ref={polaroidRef}
        data-id={photo.id}
        data-group={photo.groupId}
        onPointerDown={handlePointerDown}
        style={{
          display: state.inPouch ? 'none' : 'block',
          transform: `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rot}deg)`,
          width: `${state.width}px`,
          top: `${photo.defaultPosition.topPercent}%`,
          left: `${photo.defaultPosition.leftPercent}%`
        }}
        className={`transformable-polaroid absolute z-20 select-none touch-none p-2.5 pb-4 bg-[#FFFFFF] polaroid-frame cursor-grab active:cursor-grabbing will-change-transform ${
          isSelected ? 'is-selected ring-2 ring-[#E68A00]' : ''
        } ${isDragging ? 'shadow-2xl scale-[1.02]' : ''}`}
      >
        {/* 頂部紙膠帶 */}
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 ${tapeBgClass} rounded-sm shadow-sm pointer-events-none z-10`}
        />

        {/* 照片圖片與圓角 */}
        <div className="relative overflow-hidden rounded bg-[#F8F4EE] aspect-[4/3] flex items-center justify-center">
          <img
            src={imgError ? photo.fallbackSrc : photo.src}
            alt={photo.caption}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* 拍立得手寫簽名題字 */}
        <div className="mt-2.5 text-center px-1">
          <p className="font-['Zen_Maru_Gothic'] text-[13px] font-bold text-[#4A3319] leading-snug truncate">
            {photo.caption}
          </p>
        </div>

        {/* 選中時顯示的旋轉把手與縮放角 */}
        {isSelected && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* 頂部 360° 旋轉控制把手 */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto control-handle">
              <button
                onPointerDown={handleRotatePointerDown}
                className="w-6 h-6 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#E68A00] text-[#E68A00] flex items-center justify-center shadow-md hover:bg-[#E68A00] hover:text-white transition-colors cursor-grab active:cursor-grabbing"
                title="按住旋轉照片"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1.5px] h-2 bg-[#E68A00]" />
            </div>

            {/* 四角縮放點 (細緻暖橙點，無生硬藍色框) */}
            <div
              onPointerDown={(e) => handleScalePointerDown(e, true)}
              className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#E68A00] shadow-sm pointer-events-auto cursor-nwse-resize hover:scale-125 transition-transform control-handle"
              title="拖動縮放大小"
            />
            <div
              onPointerDown={(e) => handleScalePointerDown(e, false)}
              className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#E68A00] shadow-sm pointer-events-auto cursor-nesw-resize hover:scale-125 transition-transform control-handle"
              title="拖動縮放大小"
            />
          </div>
        )}
      </div>
    );
  }
);
