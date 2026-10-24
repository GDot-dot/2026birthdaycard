import React, { useState, useEffect, useRef } from 'react';
import { BeretIcon, PawPrintIcon } from './DecorativeOrnaments';
import { X, Download, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText, RotateCcw } from 'lucide-react';

interface LetterPdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  letterTitle?: string;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export const LetterPdfViewerModal: React.FC<LetterPdfViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl = 'documents/2026_birthday_letter.pdf',
  letterTitle = '給咪的 24 歲專屬手寫信 💌'
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [scale, setScale] = useState(1.2);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);

  // 規範化 PDF 網址（確保以根路徑存取）
  const activePdfUrl = pdfUrl.startsWith('/') || pdfUrl.startsWith('http') || pdfUrl.startsWith('blob:')
    ? pdfUrl
    : `/${pdfUrl}`;

  // 1. 動態載入 Mozilla PDF.js 核心並載入 PDF 文件
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const initPdf = async () => {
      try {
        if (!window.pdfjsLib) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
              if (window.pdfjsLib) {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                resolve();
              } else {
                reject(new Error('PDF.js failed to initialize'));
              }
            };
            script.onerror = () => reject(new Error('Failed to load PDF engine'));
            document.head.appendChild(script);
          });
        }

        const loadingTask = window.pdfjsLib.getDocument({
          url: activePdfUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true
        });

        const doc = await loadingTask.promise;
        if (!isMounted) return;

        pdfDocRef.current = doc;
        setNumPages(doc.numPages);
        setPageNum(1);
        setLoading(false);
      } catch (err: any) {
        console.warn('PDF load error:', err);
        if (isMounted) {
          setError(
            err?.message?.includes('Missing PDF') || err?.message?.includes('Invalid PDF')
              ? `未在路徑（${activePdfUrl}）找到有效的 PDF 檔案`
              : 'PDF 文件載入失敗，建議直接點擊新分頁或下載閱讀'
          );
          setLoading(false);
        }
      }
    };

    initPdf();

    return () => {
      isMounted = false;
    };
  }, [isOpen, activePdfUrl]);

  // 2. 渲染指定頁面至 HTML5 Canvas
  useEffect(() => {
    if (!isOpen || !pdfDocRef.current || loading) return;

    let isCancelled = false;

    const renderCurrentPage = async () => {
      try {
        const page = await pdfDocRef.current.getPage(pageNum);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const dpr = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale });

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        const task = page.render(renderContext);
        renderTaskRef.current = task;
        await task.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn('Canvas render error:', err);
        }
      }
    };

    renderCurrentPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [isOpen, pageNum, scale, loading]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[#382410]/65 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl h-[90vh] bg-[#FFFDF6] border-[2.5px] border-[#4A3319] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* 頂部導航工具列：標題 + 在新分頁打開 + 下載 + 關閉 */}
        <div className="px-4 sm:px-6 py-3 bg-[#FFF4C2] border-b-[2px] border-[#4A3319] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <BeretIcon size={18} className="text-[#E68A00] shrink-0" />
            <h4 className="font-['Zen_Maru_Gothic'] font-black text-xs sm:text-base text-[#4A3319] truncate">
              {letterTitle}
            </h4>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* 在其他網頁 / 新分頁開啟 */}
            <a
              href={activePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#FED458] text-[#4A3319] border border-[#4A3319] rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="在瀏覽器新分頁中直接開啟 PDF"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">新分頁開啟</span>
            </a>

            {/* 下載 PDF 檔案 */}
            <a
              href={activePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="2026_birthday_letter.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#FED458] text-[#4A3319] border border-[#4A3319] rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="下載此份 PDF 檔案"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">下載 PDF</span>
            </a>

            {/* 關閉視窗 */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FFFFFF] hover:bg-[#FFD1D1] text-[#4A3319] border border-[#4A3319] flex items-center justify-center transition-colors cursor-pointer"
              title="關閉"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 核心內容區：純粹的 PDF 預覽（包含翻頁、縮放與 Canvas 畫布） */}
        <div className="flex-1 w-full flex flex-col overflow-hidden bg-[#FAF6F0]">
          {/* PDF 閱讀工具列（翻頁與縮放） */}
          <div className="px-4 py-2 bg-[#FFFDF8] border-b border-[#EAE0D3] flex items-center justify-between text-xs text-[#4A3319] select-none">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPageNum((prev) => Math.max(1, prev - 1))}
                disabled={pageNum <= 1 || loading}
                className="p-1 rounded-md border border-[#EAE0D3] hover:bg-[#FED458] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="上一頁"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold">
                第 {pageNum} / {numPages} 頁
              </span>
              <button
                onClick={() => setPageNum((prev) => Math.min(numPages, prev + 1))}
                disabled={pageNum >= numPages || loading}
                className="p-1 rounded-md border border-[#EAE0D3] hover:bg-[#FED458] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="下一頁"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setScale((prev) => Math.max(0.7, prev - 0.2))}
                className="p-1 rounded-md border border-[#EAE0D3] hover:bg-[#FED458] cursor-pointer"
                title="縮小"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] text-[#8C6D4F]">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((prev) => Math.min(2.5, prev + 0.2))}
                className="p-1 rounded-md border border-[#EAE0D3] hover:bg-[#FED458] cursor-pointer"
                title="放大"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas 畫布渲染中心容器 */}
          <div className="flex-1 w-full overflow-auto p-4 sm:p-8 flex items-start justify-center">
            {loading && (
              <div className="my-auto flex flex-col items-center justify-center p-8 text-center text-[#8C6D4F]">
                <PawPrintIcon size={32} className="animate-bounce text-[#E68A00] mb-3" />
                <p className="font-bold text-sm text-[#4A3319]">正在翻開專屬手寫信 PDF...</p>
                <p className="text-xs text-[#8C6D4F] mt-1">載入頁面中</p>
              </div>
            )}

            {error && (
              <div className="my-auto max-w-md bg-[#FFFDF6] border-[2px] border-[#E68A00] rounded-2xl p-6 sm:p-8 text-center shadow-md">
                <FileText className="w-10 h-10 text-[#E68A00] mx-auto mb-3" />
                <h4 className="font-bold text-base text-[#4A3319] mb-1">
                  無法直接於畫布內預覽
                </h4>
                <p className="text-xs text-[#8C6D4F] mb-5">
                  {error}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={activePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#FED458] hover:bg-[#FFC629] text-[#4A3319] font-bold text-xs rounded-full border border-[#4A3319] shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>在新分頁中直接開啟</span>
                  </a>
                  <a
                    href={activePdfUrl}
                    download="2026_birthday_letter.pdf"
                    className="px-4 py-2 bg-[#FFFDF6] hover:bg-[#FED458] text-[#4A3319] font-bold text-xs rounded-full border border-[#4A3319] shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>直接下載</span>
                  </a>
                </div>
              </div>
            )}

            {/* 核心 Canvas：不依賴任何瀏覽器擴充插件，以標準畫布繪出真實 PDF */}
            <div
              style={{ display: loading || error ? 'none' : 'block' }}
              className="bg-[#FFFFFF] rounded-sm shadow-[0_12px_36px_rgba(74,51,25,0.18)] border border-[#E8DFC8] overflow-hidden transition-transform duration-200"
            >
              <canvas ref={canvasRef} className="block max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
