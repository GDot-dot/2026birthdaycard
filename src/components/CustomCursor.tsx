import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 檢查是否有精確游標 (避免手機觸摸裝置出錯)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const renderLoop = () => {
      // 絲滑插值跟隨
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(renderLoop);
    };

    // 監聽可互動元素 hover
    const checkHoverTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('button, a, .trigger-word, .transformable-polaroid, .fukubukuro-pouch, input, .seal-wax, .hoverable');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', checkHoverTarget, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', checkHoverTarget);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 游標核心小點 */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#4A3319] rounded-full pointer-events-none z-[9999] opacity-90 transition-opacity duration-200"
      />

      {/* 細緻不擋眼的布丁狗屁屁米字 (＊) 跟隨器 */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ease-out ${
          isHovered
            ? 'w-[32px] h-[32px] bg-[#FED458] border-[#382410] shadow-[0_4px_12px_rgba(74,51,25,0.25)] animate-[gentleButtWiggle_0.6s_ease-in-out_infinite_alternate]'
            : 'w-[25px] h-[25px] bg-[#FFECA8]/90 border-[#4A3319] shadow-[0_2px_8px_rgba(74,51,25,0.12)]'
        } rounded-full border-[1.5px] backdrop-blur-[1px]`}
      >
        {/* 招牌可愛小尾巴 */}
        <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[4px] h-[6px] bg-[#FFE082] border-[1.2px] border-b-0 border-[#4A3319] rounded-t-[3px]" />
        
        {/* 招牌米字「＊」 */}
        <span className="text-[13px] font-black text-[#4A3319] leading-none select-none font-sans">
          ＊
        </span>
      </div>
    </>
  );
};
