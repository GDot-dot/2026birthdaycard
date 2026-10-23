export interface PhotoItem {
  id: string;
  groupId: string;
  src: string;
  fallbackSrc: string;
  caption: string;
  defaultPosition: {
    topPercent: number;
    leftPercent: number;
    rotateDeg?: number;
  };
  tapeColor?: 'yellow' | 'coral' | 'mint';
}

export interface MonthData {
  id: string;
  titleBadge: string;
  subHeader: string;
  themeColor: string;
  washiType: 'yellow' | 'coral' | 'mint';
  diaryHtmlFragments: Array<{
    textBefore: string;
    triggerWord?: {
      groupId: string;
      label: string;
    };
    textAfter: string;
  }>;
  photos: PhotoItem[];
}

export interface PhotoState {
  x: number;
  y: number;
  rot: number;
  width: number;
  inPouch: boolean;
}
