import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { BeretIcon } from './DecorativeOrnaments';

interface AudioDeckProps {
  shouldPlay?: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const AudioDeck: React.FC<AudioDeckProps> = ({ shouldPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 載入 YouTube Iframe API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (playerRef.current) return;
      try {
        playerRef.current = new window.YT.Player('ytPlayer-container', {
          height: '60',
          width: '60',
          videoId: 'gY5TgD-yRPI',
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: 'gY5TgD-yRPI',
            playsinline: 1,
            enablejsapi: 1
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true);
              event.target.setVolume(volume);
              if (shouldPlay) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
              }
            }
          }
        });
      } catch (err) {
        console.warn('YouTube Player init error:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  // 當外部信封拆開時自動觸發音樂播放
  useEffect(() => {
    if (shouldPlay && isPlayerReady && playerRef.current) {
      try {
        playerRef.current.unMute();
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn(e);
      }
    }
  }, [shouldPlay, isPlayerReady]);

  const togglePlay = () => {
    if (!isPlayerReady || !playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.unMute();
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleMute = () => {
    if (!isPlayerReady || !playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (!isPlayerReady || !playerRef.current) return;
    try {
      if (val === 0) {
        playerRef.current.mute();
        setIsMuted(true);
      } else {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        }
        playerRef.current.setVolume(val);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      {/* 隱藏的 YouTube 音訊容器 */}
      <div className="fixed -bottom-10 -right-10 w-2 h-2 opacity-0 pointer-events-none -z-50">
        <div id="ytPlayer-container" ref={playerContainerRef} />
      </div>

      {/* 典雅復古手作音樂艙 */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-3 py-1.5 bg-[#FFFFFF]/95 backdrop-blur-md border-[2px] border-[#4A3319] rounded-full shadow-[0_6px_20px_rgba(74,51,25,0.12)] select-none">
        {/* 旋轉黑膠/布丁播放按鈕 */}
        <button
          onClick={togglePlay}
          className={`w-8 h-8 rounded-full bg-[#FFF4C2] border-[1.5px] border-[#E68A00] flex items-center justify-center text-[#4A3319] hover:bg-[#FED458] transition-transform active:scale-95 ${
            isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
          }`}
          title={isPlaying ? '暫停背景音樂' : '播放背景音樂'}
          aria-label={isPlaying ? '暫停音樂' : '播放音樂'}
        >
          {isPlaying ? <Music className="w-4 h-4 text-[#4A3319]" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-[#4A3319]" />}
        </button>

        {/* 歌曲微型標記 */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[11px] font-bold text-[#4A3319] leading-tight flex items-center gap-1">
            <BeretIcon size={12} className="text-[#4A3319]" />
            🍮布丁狗駐唱！
          </span>
          <span className="text-[9px] text-[#8C6D4F] leading-tight font-sans">
            {isPlaying ? '播放中 ♬' : '已暫停'}
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[#EAE0D3]" />

        {/* 靜音切換 */}
        <button
          onClick={toggleMute}
          className="p-1 text-[#4A3319] hover:text-[#E68A00] transition-colors"
          title={isMuted ? '取消靜音' : '靜音'}
          aria-label={isMuted ? '取消靜音' : '靜音'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-[#8C6D4F]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#4A3319]" />
          )}
        </button>

        {/* 音量滑桿 */}
        <div className="w-14 flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-[#FFE6A0] rounded-lg appearance-none cursor-pointer accent-[#4A3319]"
            title="調整音量"
          />
        </div>
      </div>
    </>
  );
};
