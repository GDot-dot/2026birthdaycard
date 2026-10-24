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
  tapeColor?: 'yellow' | 'coral' | 'mint' | 'lavender' | 'sky' | 'sakura' | 'matcha' | 'caramel' | string;
}

export interface TriggerWordItem {
  groupId: string;
  label: string;
}

export interface DiaryGifItem {
  gif: string;
  alt?: string;
  size?: number;
}

export interface DiaryFragment {
  // 方式 1：超簡便寫法（支援多個關鍵字、GIF 動圖與貼圖）：'我們泡了 [溫泉](group_onsen) ![泡湯動圖](images/onsen.gif)，去了 [陽明山](group_mountain)！'
  text?: string;
  // 方式 2：陣列組合寫法（可包含文字、關鍵字按鈕、或 GIF 物件）
  segments?: Array<string | TriggerWordItem | DiaryGifItem>;
  // 方式 3：經典單關鍵字寫法（相容既有寫法）
  textBefore?: string;
  triggerWord?: TriggerWordItem;
  textAfter?: string;
}

export interface MonthData {
  id: string;
  titleBadge: string;
  subHeader: string;
  themeColor: string;
  washiType?: 'yellow' | 'coral' | 'mint' | 'lavender' | 'sky' | 'sakura' | 'matcha' | 'caramel' | string;
  diaryHtmlFragments: DiaryFragment[];
  photos: PhotoItem[];
}

export interface PhotoState {
  x: number;
  y: number;
  rot: number;
  width: number;
  inPouch: boolean;
}
