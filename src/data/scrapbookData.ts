import { MonthData } from '../types';

/**
 * =========================================================================
 * 💌 【如何新增或修改信件文字教學】
 * =========================================================================
 * 
 * 1. 一句話內包含「多個關鍵字按鈕」（最推薦、最直覺！）：
 *    直接使用 `text` 並用 `[按鈕文字](群組代號)`：
 *    {
 *      text: '我們泡了 [溫泉](group_onsen)，去了 [陽明山](group_mountain)，看了 [羊](group_sheep)！'
 *    }
 *    👉 點擊「溫泉」會彈出 groupId 為 group_onsen 的照片；
 *    👉 點擊「陽明山」會彈出 groupId 為 group_mountain 的照片；
 *    👉 點擊「羊」會彈出 groupId 為 group_sheep 的照片！
 * 
 * 2. 💖 在文字之間放可愛 GIF 動圖 / 貼圖（兩種方式）：
 *    👉 寫法 A（最推薦！Markdown 語法）：
 *       {
 *         text: '那天一起吃蛋糕 ![慶祝動圖](https://media.giphy.com/.../cake.gif) 真的好幸福！'
 *       }
 *       💡 也可以自訂大小（例如高度 40px）：`![說明|40](路徑或網址)`
 *       💡 本地 GIF 放在 public 資料夾下：例如 `![布丁狗](images/stickers/love.gif)`
 * 
 *    👉 寫法 B（關鍵字與 GIF 完美混搭）：
 *       {
 *         text: '我們泡了 [溫泉之旅](group_onsen) ![泡湯](images/onsen.gif)，看咪笑得好開心！'
 *       }
 * 
 * 3. 🎨 【如何把畫布弄大 ＆ 不塞太多字豐富畫面】：
 *    👉 1. 自由指定畫布高度：在月份加上 `canvasHeight: 650`（預設 560px，可填 600、680、750 等）
 *    👉 2. 手帳天氣與心情圖章：
 *          weather: 'sunny' | 'breeze' | 'rainy' | 'starlight' | 'warm'
 *          mood: '倒鼻咪 100% 💖' 或 '心動滿分 ✨'
 *    👉 3. 手寫便條紙貼片 (Memo Note)：
 *          memoNote: { text: '抓水母抓到笑倒在沙發上，世界上最可愛的咪！' }
 *    👉 4. 復古門票/紀念票根 (Ticket Stub)：
 *          ticketStub: { title: 'TWICE 演唱會入場券', detail: '特區搖滾區', code: 'TW-1122' }
 * 
 * 4. 經典單一關鍵字寫法：
 *    {
 *      textBefore: '那天我們一起去看了 ',
 *      triggerWord: { groupId: 'group_name', label: '倒鼻咪！' },
 *      textAfter: ' 真的好好笑。'
 *    }
 * 
 * 5. 單純文字段落（無按鈕）：
 *    {
 *      text: '這是一段純心情筆記，不需要任何按鈕。'
 *    }
 * 
 * 6. 新增照片與 groupId 連動：
 *    在該月份的 `photos` 陣列中新增一筆物件，例如：
 *    {
 *      id: 'p_2026_01_new',
 *      groupId: 'group_01_custom',
 *      src: 'images/2026_01/my-photo.jpg',
 *      fallbackSrc: 'https://images.unsplash.com/...',
 *      caption: '照片說明題字',
 *      defaultPosition: { topPercent: 30, leftPercent: 30, rotateDeg: 3 },
 *      tapeColor: 'yellow' // 'yellow' | 'coral' | 'mint'
 *    }
 * =========================================================================
 */

export const scrapbookMonths: MonthData[] = [
  // ── 1. 2025.10 ──────────────────────────────────────────────
  {
    id: 'month_2025_10',
    titleBadge: '2025 . 10 ・ 秋日回憶',
    subHeader: 'October Memory Card',
    themeColor: '#FED458',
    washiType: 'yellow',
    diaryHtmlFragments: [
      {
        textBefore: '3號，那天一起視訊看到了',
        triggerWord: {
          groupId: 'group_25_10_03',
          label: '倒鼻咪！'
        },
        textAfter: ' 嗷嗷笑![抓蟲布丁狗|30](images/stickers/抓蟲布丁狗.gif)'
      },
      {
        textBefore: '4號，一起去了大安森林公園走走！',
        triggerWord: {
          groupId: 'group_25_10_04',
          label: '在大安森林公園拍咪！'
        },
        textAfter: ' 姆姆姆'
      },
      {
        textBefore: '6號、拍了',
        triggerWord: {
          groupId: 'group_25_10_06',
          label: '拍貼機📸、金G獨立咪🐣、很會抓水姆寶！',
        },
        textAfter: '！'
      },
      {
        textBefore: '11、12號，',
        triggerWord: {
          groupId: 'group_25_10_11',
          label: '搖滾台中',
        },
        textAfter: '![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)！'
      },
      {
        textBefore: '18號、',
        triggerWord: {
          groupId: 'group_25_10_18',
          label: '🐟🐠魚魚拍貼機、逛街、偷吃泡麵咪、涼拌對話紀錄、皮克敏',
        },
        textAfter: '！'
      },
      {
        textBefore: '25號、',
        triggerWord: {
          groupId: 'group_25_10_25',
          label: '討論寶寶電量問題、送寶可達鴨🐥、買🎈褲、吃關東煮',
        },
        textAfter: '！'
      },
      {
        textBefore: '27號、',
        triggerWord: {
          groupId: 'group_25_10_27',
          label: '熊熊&可達鴨',
        },
        textAfter: '！'
      },
    ],
    photos: [
      {
        id: 'p_2025_10_03_1',
        groupId: 'group_25_10_03',
        src: 'images/2025_10/2025-10-03.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '倒鼻咪紀念照',
        defaultPosition: { topPercent: 8, leftPercent: 52, rotateDeg: -4 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2025_10_04_1',
        groupId: 'group_25_10_04',
        src: 'images/2025_10/2025-10-04 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大安森林公園拍咪 (1)',
        defaultPosition: { topPercent: 24, leftPercent: 20, rotateDeg: 3 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2025_10_04_2',
        groupId: 'group_25_10_04',
        src: 'images/2025_10/2025-10-04 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大安森林公園拍咪 (2)',
        defaultPosition: { topPercent: 44, leftPercent: 48, rotateDeg: -3 },
        tapeColor: 'coral'
      },
      {
        id: 'p_2025_10_06_1',
        groupId: 'group_25_10_06',
        src: 'images/2025_10/2025-10-06 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '金雞獨立咪！',
        defaultPosition: { topPercent: 58, leftPercent: 18, rotateDeg: 5 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_06_2',
        groupId: 'group_25_10_06',
        src: 'images/2025_10/2025-10-06 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '相親相愛<3',
        defaultPosition: { topPercent: 58, leftPercent: 10, rotateDeg: 5 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_06_3',
        groupId: 'group_25_10_06',
        src: 'images/2025_10/2025-10-06 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '拍立得',
        defaultPosition: { topPercent: 58, leftPercent: 5, rotateDeg: -5 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_06_4',
        groupId: 'group_25_10_06',
        src: 'images/2025_10/2025-10-06 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '看起來很會抓水母',
        defaultPosition: { topPercent: 58, leftPercent: 30, rotateDeg: 8 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_11_01',
        groupId: 'group_25_10_11',
        src: 'images/2025_10/2025-10-11 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '吃飯',
        defaultPosition: { topPercent: 57, leftPercent: 30, rotateDeg: 8 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_11_02',
        groupId: 'group_25_10_11',
        src: 'images/2025_10/2025-10-11 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '搖滾台中',
        defaultPosition: { topPercent: 20, leftPercent: 15, rotateDeg: 2 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_11_03',
        groupId: 'group_25_10_11',
        src: 'images/2025_10/2025-10-11 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '瞪咪',
        defaultPosition: { topPercent: 20, leftPercent: 45, rotateDeg: 2 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_18_01',
        groupId: 'group_25_10_18',
        src: 'images/2025_10/2025-10-18 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '涼拌對話紀錄1',
        defaultPosition: { topPercent: 50, leftPercent: 45, rotateDeg: 2 },
        tapeColor: '#27C5F5'
      },
      {
        id: 'p_2025_10_18_02',
        groupId: 'group_25_10_18',
        src: 'images/2025_10/2025-10-18 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '涼拌對話紀錄2',
        defaultPosition: { topPercent: 50, leftPercent: 45, rotateDeg: 9 },
        tapeColor: '#27C5F5'
      },
      {
        id: 'p_2025_10_18_03',
        groupId: 'group_25_10_18',
        src: 'images/2025_10/2025-10-18 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '皮克敏',
        defaultPosition: { topPercent: 40, leftPercent: 45, rotateDeg: 2 },
        tapeColor: '#27C5F5'
      },
      {
        id: 'p_2025_10_18_04',
        groupId: 'group_25_10_18',
        src: 'images/2025_10/2025-10-18 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '漂亮咪',
        defaultPosition: { topPercent: 40, leftPercent: 45, rotateDeg: -6 },
        tapeColor: '#27C5F5'
      },
      {
        id: 'p_2025_10_18_05',
        groupId: 'group_25_10_18',
        src: 'images/2025_10/2025-10-18 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '是不是偷吃泡麵',
        defaultPosition: { topPercent: 40, leftPercent: 45, rotateDeg: 10 },
        tapeColor: '#27C5F5'
      },
      {
        id: 'p_2025_10_18_06',
        groupId: 'group_25_10_18',
        src: 'images/2025_10/2025-10-18 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '魚魚拍立得',
        defaultPosition: { topPercent: 67, leftPercent: 45, rotateDeg: 14 },
        tapeColor: '#27C5F5'
      },
      {
        id: 'p_2025_10_25_01',
        groupId: 'group_25_10_25',
        src: 'images/2025_10/2025-10-25 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '吃關東煮',
        defaultPosition: { topPercent: 50, leftPercent: 45, rotateDeg: 14 },
        tapeColor: '#CEF522'
      },
      {
        id: 'p_2025_10_25_02',
        groupId: 'group_25_10_25',
        src: 'images/2025_10/2025-10-25 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '幹嘛咬我！',
        defaultPosition: { topPercent: 40, leftPercent: 45, rotateDeg: -10 },
        tapeColor: '#CEF522'
      },
      {
        id: 'p_2025_10_25_03',
        groupId: 'group_25_10_25',
        src: 'images/2025_10/2025-10-25 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '咪枕可達鴨',
        defaultPosition: { topPercent: 50, leftPercent: 45, rotateDeg: 0 },
        tapeColor: '#CEF522'
      },
      {
        id: 'p_2025_10_27_01',
        groupId: 'group_25_10_27',
        src: 'images/2025_10/2025-10-27.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '熊&鴨！',
        defaultPosition: { topPercent: 50, leftPercent: 30, rotateDeg: 8 },
        tapeColor: '#F59D22'
      },
    ]
  },

  // ── 2. 2025.11 ──────────────────────────────────────────────
  {
    id: 'month_2025_11',
    titleBadge: '2025 . 11 ・ TWICE 與特別的日子',
    subHeader: 'November Special TWICE Days',
    themeColor: '#95DFED',
    washiType: '#95DFED',
    diaryHtmlFragments: [
      {
        textBefore: '8、咪 ',
        triggerWord: {
          groupId: 'group_25_11_08',
          label: '拿我手機偷自拍'
        },
        textAfter: '，相簿裡多了一些可愛的照片....<3'
      },
      {
        textBefore: '15、三人組 ',
        triggerWord: {
          groupId: 'group_25_11_15',
          label: '一起熱熱鬧鬧過生日'
        },
        textAfter: '開心吃海鮮咪！'
      },
      {
        textBefore: '22、是期待超久的 ',
        triggerWord: {
          groupId: 'group_11_twice',
          label: 'TWICE 演唱會！'
        },
        textAfter: '全場 ONCE 一起大合唱好感動！布幕升上去就哭哭，散場之後根本出不去！'
      },
      {
        textBefore: '29、嘿嘿...',
        triggerWord: {
          groupId: 'group_25_11_29',
          label: '正妹！布ㄉㄨㄞ狗'
        },
        textAfter: '、預約健身房'
      },
    ],
    photos: [
      {
        id: 'p_2025_11_08',
        groupId: 'group_25_11_08',
        src: 'images/2025_11/2025-11-08.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '偷偷自拍咪！',
        defaultPosition: { topPercent: 10, leftPercent: 44, rotateDeg: -2 },
        tapeColor: 'coral'
      },
      {
        id: 'p_2025_11_15-1',
        groupId: 'group_25_11_15',
        src: 'images/2025_11/2025-11-15 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大狗狗！',
        defaultPosition: { topPercent: 32, leftPercent: 18, rotateDeg: 4 },
        tapeColor: '#F3E5AB'
      },
      {
        id: 'p_2025_11_15-2',
        groupId: 'group_25_11_15',
        src: 'images/2025_11/2025-11-15 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '生蠔餐',
        defaultPosition: { topPercent: 32, leftPercent: 25, rotateDeg:-4 },
        tapeColor: '#F3E5AB'
      },
      {
        id: 'p_2025_11_15-3',
        groupId: 'group_25_11_15',
        src: 'images/2025_11/2025-11-15 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '開ㄘ',
        defaultPosition: { topPercent: 32, leftPercent: 18, rotateDeg:8 },
        tapeColor: '#F3E5AB'
      },
      {
        id: 'p_2025_11_15-4',
        groupId: 'group_25_11_15',
        src: 'images/2025_11/2025-11-15 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '生日快樂，拉屎順暢',
        defaultPosition: { topPercent: 32, leftPercent: 18, rotateDeg:15 },
        tapeColor: '#F3E5AB'
      },
      {
        id: 'p_2025_11_22',
        groupId: 'group_11_twice',
        src: 'images/2025_11/2025-11-22 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '演唱會結束，走不出去',
        defaultPosition: { topPercent: 0, leftPercent: 10, rotateDeg: 0 },
        tapeColor: '#95DFED'
      },
      {
        id: 'p_2025_11_22',
        groupId: 'group_11_twice',
        src: 'images/2025_11/2025-11-22 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '在外面癡癡望著咪',
        defaultPosition: { topPercent: 26, leftPercent: 40, rotateDeg: 0 },
        tapeColor: '#95DFED'
      },
      {
        id: 'p_2025_11_22',
        groupId: 'group_11_twice',
        src: 'images/2025_11/2025-11-22 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'TWICE再來一次',
        defaultPosition: { topPercent: 0, leftPercent: 40, rotateDeg: -10 },
        tapeColor: '#95DFED'
      },
      {
        id: 'p_2025_11_29',
        groupId: 'group_25_11_29',
        src: 'images/2025_11/2025-11-29 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '正妹咪...身材好',
        defaultPosition: { topPercent: 20, leftPercent: 55, rotateDeg: -5 },
        tapeColor: '#1EFAD4'
      },
      {
        id: 'p_2025_11_29',
        groupId: 'group_25_11_29',
        src: 'images/2025_11/2025-11-29 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '布ㄉㄨㄞ狗',
        defaultPosition: { topPercent:40, leftPercent: 5, rotateDeg: 10 },
        tapeColor: '#1EFAD4'
      },
      
    ]
  },

  // ── 3. 2025.12 ──────────────────────────────────────────────
  {
    id: 'month_2025_12',
    titleBadge: '2025 . 12 ・ 冬日溫泉之旅',
    subHeader: 'December Cozy Winter',
    themeColor: '#81C784',
    washiType: 'mint',
    diaryHtmlFragments: [
      {
        text:'6、成為[一級玩家](group_12_06_一級玩家)喝了[海倫咖啡](group_12_06_海倫咖啡)還...約會[牽牽手](group_12_06_牽牽手)',
      },
      {
        textBefore: '14、去 ',
        triggerWord: {
          groupId: 'group_25_12_14',
          label: '漂亮地方'
        },
        textAfter: '🌟餔拎餔拎！✨'
      },
      {
        textBefore: '15、 ',
        triggerWord: {
          groupId: 'group_25_12_15',
          label: '搶房寶漂亮咪！'
        },
      },
      {
        textBefore: '19、 ',
        triggerWord: {
          groupId: 'group_25_12_19',
          label: '北投溫泉之旅',
        },
        textAfter: '![趴|30](images/stickers/趴.gif)吃冰冰、溫暖暖、看硫磺 地熱谷'
      },
      {
        textBefore: '27、跑的好趕好餓去看 ',
        triggerWord: {
          groupId: 'group_25_12_27',
          label: 'Major in Body Bear',
        },
        textAfter: '還有公司聚餐合照哦！！！'
      },
    ],
    photos: [
      {
        id: 'p_2025_12_06',
        groupId: 'group_12_06_一級玩家',
        src: 'images/2025_12/2025-12-06 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '地下街一級玩家',
        defaultPosition: { topPercent: 12, leftPercent: 45, rotateDeg: 3 },
        tapeColor: '#E02454'
      },
      {
        id: 'p_2025_12_06',
        groupId: 'group_12_06_一級玩家',
        src: 'images/2025_12/2025-12-06 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '咪！！！！！',
        defaultPosition: { topPercent: 12, leftPercent: 20, rotateDeg: -10 },
        tapeColor: '#E02454'
      },
      {
        id: 'p_2025_12_06',
        groupId: 'group_12_06_海倫咖啡',
        src: 'images/2025_12/2025-12-06 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '海倫咖啡',
        defaultPosition: { topPercent: 36, leftPercent: 10, rotateDeg: 5 },
        tapeColor: '#800000'
      },
      {
        id: 'p_2025_12_06',
        groupId: 'group_12_06_海倫咖啡',
        src: 'images/2025_12/2025-12-06 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '香香咖啡',
        defaultPosition: { topPercent: 36, leftPercent: 25, rotateDeg: -3 },
        tapeColor: '#800000'
      },
      {
        id: 'p_2025_12_06',
        groupId: 'group_12_06_海倫咖啡',
        src: 'images/2025_12/2025-12-06 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '太驚喜....',
        defaultPosition: { topPercent: 36, leftPercent: 45, rotateDeg: -2 },
        tapeColor: '#800000'
      },
      {
        id: 'p_2025_12_06',
        groupId: 'group_12_06_牽牽手',
        src: 'images/2025_12/2025-12-06 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '一起拍照！📷',
        defaultPosition: { topPercent: 10, leftPercent: 24, rotateDeg: -4 },
        tapeColor: '#F098AE'
      },
      {
        id: 'p_2025_12_06',
        groupId: 'group_12_06_牽牽手',
        src: 'images/2025_12/2025-12-06 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '💞牽牽手<3',
        defaultPosition: { topPercent: 10, leftPercent: 60, rotateDeg: 4 },
        tapeColor: '#F098AE'
      },
      {
        id: 'p_2025_12_14',
        groupId: 'group_25_12_14',
        src: 'images/2025_12/2025-12-14 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '喝茶咪！🍵',
        defaultPosition: { topPercent: 10, leftPercent: 60, rotateDeg: 4 },
        tapeColor: '#FBFFE6'
      },
      {
        id: 'p_2025_12_14',
        groupId: 'group_25_12_14',
        src: 'images/2025_12/2025-12-14 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '漂亮咪！',
        defaultPosition: { topPercent: 10, leftPercent: 40, rotateDeg: -4 },
        tapeColor: '#FBFFE6'
      },
      {
        id: 'p_2025_12_14',
        groupId: 'group_25_12_14',
        src: 'images/2025_12/2025-12-14 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '漂亮地方！',
        defaultPosition: { topPercent: 30, leftPercent: 60, rotateDeg: 4 },
        tapeColor: '#FBFFE6'
      },
      {
        id: 'p_2025_12_15',
        groupId: 'group_25_12_15',
        src: 'images/2025_12/2025-12-15 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '搶房寶！',
        defaultPosition: { topPercent: 20, leftPercent: 20, rotateDeg: 4 },
        tapeColor: '#FFCC8A'
      },
      {
        id: 'p_2025_12_15',
        groupId: 'group_25_12_15',
        src: 'images/2025_12/2025-12-15 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '雪咪！！',
        defaultPosition: { topPercent: 20, leftPercent: 40, rotateDeg: -4 },
        tapeColor: '#FFCC8A'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '嗷大的冰...！',
        defaultPosition: { topPercent: 0, leftPercent: 0, rotateDeg: -4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (11).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '嗷大的冰...！',
        defaultPosition: { topPercent: 0, leftPercent: 0, rotateDeg: 6 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '小杯酒!!！',
        defaultPosition: { topPercent: -20, leftPercent: 20, rotateDeg: -90 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '關東煮',
        defaultPosition: { topPercent: 0, leftPercent: 50, rotateDeg: 4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '太陽...☀️need🕶️',
        defaultPosition: { topPercent: 0, leftPercent: 70, rotateDeg: -4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '冒煙...酷',
        defaultPosition: { topPercent: 40, leftPercent: 0, rotateDeg: 4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '小橋流水',
        defaultPosition: { topPercent: 40, leftPercent: 20, rotateDeg: -4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '燙燙水冒煙',
        defaultPosition: { topPercent: 40, leftPercent: 40, rotateDeg: 4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (8).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '❣️偷啾一個..',
        defaultPosition: { topPercent: 40, leftPercent: 60, rotateDeg: -4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (9).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '偷看咪',
        defaultPosition: { topPercent: 40, leftPercent: 80, rotateDeg: 4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_19',
        groupId: 'group_25_12_19',
        src: 'images/2025_12/2025-12-19 (10).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '漂亮花花',
        defaultPosition: { topPercent: 60, leftPercent: 0, rotateDeg: 4 },
        tapeColor: '#81C784'
      },
      {
        id: 'p_2025_12_27',
        groupId: 'group_25_12_27',
        src: 'images/2025_12/2025-12-27 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '寶做的工具',
        defaultPosition: { topPercent: 60, leftPercent: 70, rotateDeg: 4 },
        tapeColor: '#272520'
      },
      {
        id: 'p_2025_12_27',
        groupId: 'group_25_12_27',
        src: 'images/2025_12/2025-12-27 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '跟體熊聚餐照',
        defaultPosition: { topPercent: 38, leftPercent: 45, rotateDeg: -4 },
        tapeColor: '#272520'
      },
      {
        id: 'p_2025_12_27',
        groupId: 'group_25_12_27',
        src: 'images/2025_12/2025-12-27 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '開心吃火鍋咪！',
        defaultPosition: { topPercent: 42, leftPercent: 20, rotateDeg: 4 },
        tapeColor: '#272520'
      },
    ]
  },

  // ── 4. 2026.01 ──────────────────────────────────────────────
  {
    id: 'month_2026_01',
    titleBadge: '2026 . 01 ・ 新的一年！',
    subHeader: 'January Warm Beginning',
    themeColor: '#EF3E49',
    washiType: '#EF3E49',
    diaryHtmlFragments: [
      {
        textBefore: '4、第幾個～ 一百天.. ',
        triggerWord: {
          groupId: 'group_26_01_04',
          label: '第八個！'
        },
        textAfter: '時間好快好快！！'
      },
      {
        textBefore: '23、突然就.. ',
        triggerWord: {
          groupId: 'group_26_01_23',
          label: '長針眼了...'
        },
        textAfter: '👋秀秀摸摸'
      },
      {
        textBefore: '31、今天收到了 ',
        triggerWord: {
          groupId: 'group_26_01_31',
          label: '瑪格的禮物！'
        },
        textAfter: '💖嗷可愛哦'
      },
    ],
    photos: [
      {
        id: 'p_2026_01_4',
        groupId: 'group_26_01_04',
        src: 'images/2026_01/2026-01-04 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '800天！',
        defaultPosition: { topPercent: 5, leftPercent: 10, rotateDeg: 4 },
        tapeColor: '#EF3E49'
      },
      {
        id: 'p_2026_01_4',
        groupId: 'group_26_01_04',
        src: 'images/2026_01/2026-01-04 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '800天！開心咪！',
        defaultPosition: { topPercent: 12, leftPercent: 30, rotateDeg: -3 },
        tapeColor: '#EF3E49'
      },
      {
        id: 'p_2026_01_23',
        groupId: 'group_26_01_23',
        src: 'images/2026_01/2026-01-23.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '長針眼了...',
        defaultPosition: { topPercent: 23, leftPercent: 20, rotateDeg: 5},
        tapeColor: '#DC92F6'
      },
      {
        id: 'p_2026_01_31',
        groupId: 'group_26_01_31',
        src: 'images/2026_01/2026-01-31.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '瑪格的禮物可愛咪！',
        defaultPosition: { topPercent: 12, leftPercent: 68, rotateDeg: -6 },
        tapeColor: '#F368DC'
      }
    ]
  },

  // ── 5. 2026.02 ──────────────────────────────────────────────
  {
    id: 'month_2026_02',
    titleBadge: '2026 . 02 ・ 綻放初春與情人節',
    subHeader: 'February Valentine Romance',
    themeColor: '#BEB1D2',
    washiType: '#BEB1D2',
    diaryHtmlFragments: [
      {
        textBefore: '13、出去走走晃晃拍拍 ',
        triggerWord: {
          groupId: 'group_26_02_13',
          label: '皮克敏明信片'
        },
        textAfter: '![皮克敏|35](images/stickers/紅皮.gif)![皮克敏|35](images/stickers/黃皮.gif)![皮克敏|35](images/stickers/藍皮.gif)mimimimi'
      },     
      {
        textBefore: '15、天氣豪豪早早出花去',
        triggerWord: {
          groupId: 'group_26_02_15',
          label: '大安森林公園野餐'
        },
        textAfter: '![抓蟲|35](images/stickers/抓蟲布丁狗.gif)還有買花花給咪票釀票釀'
      },
      {
        textBefore: '27、咪心心念念帶寶寶去吃了',
        triggerWord: {
          groupId: 'group_26_02_27',
          label: '文字燒'
        },
        textAfter: '卯卯卯卯卯![咬|35](images/stickers/咬一口.gif)'
      },
      {
        textBefore: '28、去看了',
        triggerWord: {
          groupId: 'group_26_02_28',
          label: '綻放、維也納百年花繪展'
        },
      },
    ],
    photos: [
      {
        id: 'p_2026_02_13',
        groupId: 'group_26_02_13',
        src: 'images/2026_02/2026-02-13.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '皮克敏明信片',
        defaultPosition: { topPercent: 14, leftPercent: 40, rotateDeg: 2 },
        tapeColor: 'coral'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '超亮一級玩家',
        defaultPosition: { topPercent: 0, leftPercent: 0, rotateDeg: 2 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '漂亮咪自拍💞',
        defaultPosition: { topPercent: 10, leftPercent: 20, rotateDeg: -5 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '咪先到的報備位置照！',
        defaultPosition: { topPercent: 0, leftPercent: 40, rotateDeg: 5 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '鋪好地墊了！開始野餐',
        defaultPosition: { topPercent: 10, leftPercent: 60, rotateDeg: -5 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '跟花花拍照咪',
        defaultPosition: { topPercent: 0, leftPercent: 70, rotateDeg: 5 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '吃一口花花',
        defaultPosition: { topPercent: 0, leftPercent: 70, rotateDeg: -5 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '野餐花花',
        defaultPosition: { topPercent: 20, leftPercent: 0, rotateDeg: 2 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (8).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '聽爵士喝茶茶',
        defaultPosition: { topPercent: 10, leftPercent: 20, rotateDeg: -5 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (9).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '自拍咪偷拍到寶',
        defaultPosition: { topPercent: 20, leftPercent: 40, rotateDeg: 2 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (10).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '跟花花自拍可愛咪💘',
        defaultPosition: { topPercent: 10, leftPercent: 60, rotateDeg: -5 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (11).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '軟軟鴨鴨軟軟咪',
        defaultPosition: { topPercent: 20, leftPercent: 80, rotateDeg: 2 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (12).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '咬一口咪！',
        defaultPosition: { topPercent: 40, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_15',
        groupId: 'group_26_02_15',
        src: 'images/2026_02/2026-02-15 (13).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '抬起腳腳踩太陽',
        defaultPosition: { topPercent: 40, leftPercent: 40, rotateDeg: 2 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_27',
        groupId: 'group_26_02_27',
        src: 'images/2026_02/2026-02-15 (13).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '抬起腳腳踩太陽',
        defaultPosition: { topPercent: 40, leftPercent: 40, rotateDeg: 2 },
        tapeColor: '#F4590B'
      },
      {
        id: 'p_2026_02_27',
        groupId: 'group_26_02_27',
        src: 'images/2026_02/2026-02-27 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '文字燒',
        defaultPosition: { topPercent: 40, leftPercent: 20, rotateDeg: 2 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_27',
        groupId: 'group_26_02_27',
        src: 'images/2026_02/2026-02-27 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '有酒喝hehhee',
        defaultPosition: { topPercent: 40, leftPercent: 40, rotateDeg: -2 },
        tapeColor: '#BEB1D2'
      },
      {
        id: 'p_2026_02_28',
        groupId: 'group_26_02_28',
        src: 'images/2026_02/2026-02-28 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '窺賊鐵器',
        defaultPosition: { topPercent: 60, leftPercent: 20, rotateDeg: 3 },
        tapeColor: '#9795F3'
      },
      {
        id: 'p_2026_02_28',
        groupId: 'group_26_02_28',
        src: 'images/2026_02/2026-02-28 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '看展咪！',
        defaultPosition: { topPercent: 60, leftPercent: 40, rotateDeg: -2 },
        tapeColor: '#9795F3'
      },
      {
        id: 'p_2026_02_28',
        groupId: 'group_26_02_28',
        src: 'images/2026_02/2026-02-28 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '綻放',
        defaultPosition: { topPercent: 60, leftPercent: 60, rotateDeg: 4 },
        tapeColor: '#9795F3'
      },
    ]
  },

  // ── 6. 2026.03 ──────────────────────────────────────────────
  {
    id: 'month_2026_03',
    titleBadge: '2026 . 03 ・ 春櫻綻放與午後野餐',
    subHeader: 'March Cherry Blossom',
    themeColor: '#0bdede',
    washiType: '#ADC7C7',
    diaryHtmlFragments: [
      {
        textBefore: '7、第一次出好遠門去山上待著，走山路走走走～走到了',
        triggerWord: {
          groupId: 'group_26_03_07',
          label: '邀月'
        },
        textAfter: '貓貓跟菜菜都好棒！'
      },
    ],
    photos: [
      {
        id: 'p_2026_03_07',
        groupId: 'group_26_03_07',
        src: 'images/2026_03/2026-03-07 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '抵達貓空',
        defaultPosition: { topPercent: 0, leftPercent: 0, rotateDeg: 4 },
        tapeColor: '#0bdede'
      },
      {
        id: 'p_2026_03_07',
        groupId: 'group_26_03_07',
        src: 'images/2026_03/2026-03-07 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '兩位 歐耶！',
        defaultPosition: { topPercent: 0, leftPercent: 20, rotateDeg: -4 },
        tapeColor: '#0bdede'
      },
      {
        id: 'p_2026_03_07',
        groupId: 'group_26_03_07',
        src: 'images/2026_03/2026-03-07 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '貓貓會跳上來耶！',
        defaultPosition: { topPercent: 0, leftPercent: 40, rotateDeg: 4},
        tapeColor: '#0bdede'
      },
      {
        id: 'p_2026_03_07',
        groupId: 'group_26_03_07',
        src: 'images/2026_03/2026-03-07 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '他要睡ㄍㄡˊ了...',
        defaultPosition: { topPercent: 0, leftPercent: 60, rotateDeg: -4},
        tapeColor: '#0bdede'
      },
      {
        id: 'p_2026_03_07',
        groupId: 'group_26_03_07',
        src: 'images/2026_03/2026-03-07 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '好熟的吐司🍞',
        defaultPosition: { topPercent: 0, leftPercent: 60, rotateDeg: -4},
        tapeColor: '#0bdede'
      },
      {
        id: 'p_2026_03_07',
        groupId: 'group_26_03_07',
        src: 'images/2026_03/2026-03-07 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '好吃的菜菜！',
        defaultPosition: { topPercent: 60, leftPercent: 0, rotateDeg: -5},
        tapeColor: '#0bdede'
      },
      {
        id: 'p_2026_03_07',
        groupId: 'group_26_03_07',
        src: 'images/2026_03/2026-03-07 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '還在ㄍㄡˊ',
        defaultPosition: { topPercent: 50, leftPercent: 30, rotateDeg: 4},
        tapeColor: '#0bdede'
      },
      {
        id: 'p_2026_03_07',
        groupId: 'group_26_03_07',
        src: 'images/2026_03/2026-03-07 (8).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '回家家',
        defaultPosition: { topPercent: 30, leftPercent: 60, rotateDeg: -4},
        tapeColor: '#0bdede'
      },
    ]
  },

  // ── 7. 2026.04 ──────────────────────────────────────────────
  {
    id: 'month_2026_04',
    titleBadge: '2026 . 04 ・ One OK Rock -DETOX',
    subHeader: 'April Rain & one ok rock',
    themeColor: '#E03C54',
    washiType: '#E03C54',
    diaryHtmlFragments: [
      {
        textBefore: '一起去聽',
        triggerWord: {
          groupId: 'group_26_04_26',
          label: 'One Ok Rock'
        },
      },
    ],
    photos: [
      {
        id: 'p_2026_04_26',
        groupId: 'group_26_04_26',
        src: 'images/2026_04/2026-04-26 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '準備就緒！',
        defaultPosition: { topPercent: 12, leftPercent: 35, rotateDeg: -2 },
        tapeColor: '#F39595'
      },
      {
        id: 'p_2026_04_2',
        groupId: 'group_26_04_26',
        src: 'images/2026_04/2026-04-26 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '不遠也不近的剛剛好',
        defaultPosition: { topPercent: 60, leftPercent: 20, rotateDeg: 3 },
        tapeColor: '#F39595'
      },
      {
        id: 'p_2026_04_2',
        groupId: 'group_26_04_26',
        src: 'images/2026_04/2026-04-26 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '結束ㄋ嗷嗷港動',
        defaultPosition: { topPercent: 20, leftPercent: 60, rotateDeg: 3 },
        tapeColor: '#F39595'
      },
    ]
  },

  // ── 8. 2026.05 ──────────────────────────────────────────────
  {
    id: 'month_2026_05',
    titleBadge: '2026 . 05 ・ 布丁狗*咖啡廳*動物園',
    subHeader: 'Purin*caffee*zoo',
    themeColor: '#74A269',
    washiType: '#74A269',
    diaryHtmlFragments: [
      {
        textBefore: '9、跑到三重看![抓蟲|30](images/stickers/抓蟲布丁狗.gif) ',
        triggerWord: {
          groupId: 'group_26_05_09',
          label: '花花跟布丁狗！'
        },
        textAfter: '雖然是陰天但能跟咪出去就很開心！而且是布丁咪![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)![抓蟲|30](images/stickers/抓蟲布丁狗.gif)'
      },
      {
        text: '16、跟媽媽一起去參加猛禽研究會看[鳳頭蒼鷹](group_26_05_16_eagle)，後來也去探了大姊姊的[女僕咖啡廳](group_26_05_16_maid)，後來也去了西門町逛逛開開心心回家',
      },
      {
        textBefore: '17、跑跑跑又再去看了',
        triggerWord: {
          groupId: 'group_26_05_17',
          label: 'Rainy Knight'
        },
        textAfter:'這一次他們會說中文ㄋ'
      },
      {
        text: '30、跑到新竹拿[sw2(沒圖片)](group_26_05_30_sw2)，跟老哥見面遊[新竹](group_26_05_30_新竹遊)水潤餅...吃不懂，最後一站！[動物園](group_26_05_30_zoo)',
      }
    ],
    photos: [
      {
        id: 'p_2026_05_09',
        groupId: 'group_26_05_09',
        src: 'images/2026_05/2026-05-09 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '屁眼*氣球',
        defaultPosition: { topPercent: 0, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#6bee4a'
      },
      {
        id: 'p_2026_05_09',
        groupId: 'group_26_05_09',
        src: 'images/2026_05/2026-05-09 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '布丁鼻🐝',
        defaultPosition: { topPercent: 0, leftPercent: 25, rotateDeg: -3 },
        tapeColor: '#6bee4a'
      },
      {
        id: 'p_2026_05_09',
        groupId: 'group_26_05_09',
        src: 'images/2026_05/2026-05-09 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大大蛋糕布丁狗',
        defaultPosition: { topPercent: 0, leftPercent: 45, rotateDeg: 5 },
        tapeColor: '#6bee4a'
      },
      {
        id: 'p_2026_05_09',
        groupId: 'group_26_05_09',
        src: 'images/2026_05/2026-05-09 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大大蛋糕布丁狗',
        defaultPosition: { topPercent: 0, leftPercent: 70, rotateDeg: -6 },
        tapeColor: '#6bee4a'
      },
      {
        id: 'p_2026_05_16eagle',
        groupId: 'group_26_05_16_eagle',
        src: 'images/2026_05/2026-05-16 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '滿地夜鷺',
        defaultPosition: { topPercent: 30, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#97f380'
      },
      {
        id: 'p_2026_05_16eagle',
        groupId: 'group_26_05_16_eagle',
        src: 'images/2026_05/2026-05-16 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '綠繡眼的巢',
        defaultPosition: { topPercent: 30, leftPercent: 20, rotateDeg: 5 },
        tapeColor: '#97f380'
      },
      {
        id: 'p_2026_05_16eagle',
        groupId: 'group_26_05_16_eagle',
        src: 'images/2026_05/2026-05-16 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '白條紋鴿鴿',
        defaultPosition: { topPercent: 30, leftPercent: 50, rotateDeg: -5 },
        tapeColor: '#97f380'
      },
      {
        id: 'p_2026_05_16maid',
        groupId: 'group_26_05_16_maid',
        src: 'images/2026_05/2026-05-16 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '皮克敏吃(吸管)',
        defaultPosition: { topPercent: 50, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#14f15a'
      },
      {
        id: 'p_2026_05_16maid',
        groupId: 'group_26_05_16_maid',
        src: 'images/2026_05/2026-05-16 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '紫皮生氣',
        defaultPosition: { topPercent: 50, leftPercent: 20, rotateDeg: -5 },
        tapeColor: '#14f15a'
      },
      {
        id: 'p_2026_05_16maid',
        groupId: 'group_26_05_16_maid',
        src: 'images/2026_05/2026-05-16 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '粉皮&畫盤',
        defaultPosition: { topPercent: 45, leftPercent: 40, rotateDeg: 5 },
        tapeColor: '#14f15a'
      },
      {
        id: 'p_2026_05_16maid',
        groupId: 'group_26_05_16_maid',
        src: 'images/2026_05/2026-05-16 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '義大利麵&義大利麵',
        defaultPosition: { topPercent: 45, leftPercent: 60, rotateDeg: -5 },
        tapeColor: '#14f15a'
      },
      {
        id: 'p_2026_05_16maid',
        groupId: 'group_26_05_16_maid',
        src: 'images/2026_05/2026-05-16 (8).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '端冰皮',
        defaultPosition: { topPercent: 45, leftPercent: 80, rotateDeg: 5 },
        tapeColor: '#14f15a'
      },
      {
        id: 'p_2026_05_17',
        groupId: 'group_26_05_17',
        src: 'images/2026_05/2026-05-17.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '蓋印章',
        defaultPosition: { topPercent: 45, leftPercent: 45, rotateDeg: 5 },
        tapeColor: '#3aecae'
      },
      {
        id: 'p_2026_05_17_新竹遊',
        groupId: 'group_26_05_30_新竹遊',
        src: 'images/2026_05/2026-05-30 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '超強水果豆花',
        defaultPosition: { topPercent: 0, leftPercent: 15, rotateDeg: -5 },
        tapeColor: '#53efbe'
      },
      {
        id: 'p_2026_05_30_新竹遊',
        groupId: 'group_26_05_30_新竹遊',
        src: 'images/2026_05/2026-05-30 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '逛街！',
        defaultPosition: { topPercent: 30, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#53efbe'
      },
      {
        id: 'p_2026_05_30_新竹遊',
        groupId: 'group_26_05_30_新竹遊',
        src: 'images/2026_05/2026-05-30 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '好吃肉圓',
        defaultPosition: { topPercent: 45, leftPercent: 15, rotateDeg: -5 },
        tapeColor: '#53efbe'
      },
      {
        id: 'p_2026_05_30_zoo',
        groupId: 'group_26_05_30_zoo',
        src: 'images/2026_05/2026-05-30 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '小皮跟鹿',
        defaultPosition: { topPercent: 0, leftPercent: 45, rotateDeg: 5 },
        tapeColor: '#53efbe'
      },
      {
        id: 'p_2026_05_30_zoo',
        groupId: 'group_26_05_30_zoo',
        src: 'images/2026_05/2026-05-30 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '太陽大大咬咪一口',
        defaultPosition: { topPercent: 30, leftPercent: 40, rotateDeg: -5 },
        tapeColor: '#53efbe'
      },
      {
        id: 'p_2026_05_30_zoo',
        groupId: 'group_26_05_30_zoo',
        src: 'images/2026_05/2026-05-30 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '紅毛猩猩...太熱ㄋ',
        defaultPosition: { topPercent: 45, leftPercent: 45, rotateDeg: 5 },
        tapeColor: '#53efbe'
      },
      {
        id: 'p_2026_05_30_zoo',
        groupId: 'group_26_05_30_zoo',
        src: 'images/2026_05/2026-05-30 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '太空艙狐蒙',
        defaultPosition: { topPercent: 23, leftPercent: 70, rotateDeg: 10 },
        tapeColor: '#53efbe'
      },
    ]
  },

  // ── 9. 2026.06 ──────────────────────────────────────────────
  {
    id: 'month_2026_06',
    titleBadge: '2026 . 06 ・ 布丁狗月！',
    subHeader: 'June Summer of Purin',
    themeColor: '#FED458',
    washiType: 'yellow',
    diaryHtmlFragments: [
      {
        textBefore: '11、竟然會有！！！是這個！ ',
        triggerWord: {
          groupId: 'group_26_06_11',
          label: '超大布布丁'
        },
        textAfter: '，布丁狗也抵擋不住！'
      },
      {
        textBefore: '23、寶寶在唐吉軻德逛阿逛，本來要找看看什麼酷東西突然看到了 ',
        triggerWord: {
          groupId: 'group_26_06_23',
          label: '布丁狗限定化妝包'
        },
        textAfter: '💞咪一定會很開心![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)'
      }
    ],
    photos: [
      {
        id: 'p_2026_06_11',
        groupId: 'group_26_06_11',
        src: 'images/2026_06/2026-06-11 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '你找我嗎！！！ㄏㄚˋ!',
        defaultPosition: { topPercent: 10, leftPercent: 15, rotateDeg: 5 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2026_06_11',
        groupId: 'group_26_06_11',
        src: 'images/2026_06/2026-06-11 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '超喜歡咪！',
        defaultPosition: { topPercent: 10, leftPercent: 45, rotateDeg: -3 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2026_06_23',
        groupId: 'group_26_06_23',
        src: 'images/2026_06/2026-06-23 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '超可愛化妝包耶！',
        defaultPosition: { topPercent: 40, leftPercent: 5, rotateDeg: -5 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2026_06_23',
        groupId: 'group_26_06_23',
        src: 'images/2026_06/2026-06-23 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '配上窩的爪！！',
        defaultPosition: { topPercent: 40, leftPercent: 35, rotateDeg: 5 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2026_06_23',
        groupId: 'group_26_06_23',
        src: 'images/2026_06/2026-06-23 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'RUA！！！爪',
        defaultPosition: { topPercent: 40, leftPercent: 60, rotateDeg: -5 },
        tapeColor: 'yellow'
      },
    ]
  },

  // ── 10. 2026.07 ─────────────────────────────────────────────
  {
    id: 'month_2026_07',
    titleBadge: '2026 . 07 ・ 林布蘭到歌雅',
    subHeader: 'July Rembrandt to Goya',
    themeColor: '	#F1A79B',
    washiType: '#F1A79B',
    diaryHtmlFragments: [
      {
        textBefore: '19、咪唱是新的 ',
        triggerWord: {
          groupId: 'group_26_07_19',
          label: '藍色眼影！'
        },
        textAfter: '變得好像要表演舞蹈 嘿嘿嘿，雲門舞集'
      },
      {
        textBefore: '24、跟咪約會去 ',
        triggerWord: {
          groupId: 'group_26_07_24',
          label: '散步、吃好吃手工冰、吃麵！'
        },
        textAfter: '心靈跟![咬|50](images/stickers/咬一口.gif)肚肚腹足的一天！'
      },
      {
        textBefore: '25、今天是跟咪 ',
        triggerWord: {
          groupId: 'group_26_07_25',
          label: '大便1000天情侶、看展'
        },
        textAfter: '![趴|30](images/stickers/趴.gif)'
      },
    ],
    photos: [
      {
        id: 'p_2026_07_19',
        groupId: 'group_26_07_19',
        src: 'images/2026_07/2026-07-19.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '雲門舞集咪',
        defaultPosition: { topPercent: 12, leftPercent: 42, rotateDeg: 2 },
        tapeColor: '#ec5841'
      },
      {
        id: 'p_2026_07_24',
        groupId: 'group_26_07_24',
        src: 'images/2026_07/2026-07-24 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '好吃手工冰！很多口味',
        defaultPosition: { topPercent: 5, leftPercent: 10, rotateDeg: 5 },
        tapeColor: '#f9724d'
      },
      {
        id: 'p_2026_07_24',
        groupId: 'group_26_07_24',
        src: 'images/2026_07/2026-07-24 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '你看他在對我笑ㄟ',
        defaultPosition: { topPercent: 30, leftPercent: 15, rotateDeg: -5 },
        tapeColor: '#f9724d'
      },
      {
        id: 'p_2026_07_24',
        groupId: 'group_26_07_24',
        src: 'images/2026_07/2026-07-24 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '好吃咪！',
        defaultPosition: { topPercent: 15, leftPercent: 30, rotateDeg: 5 },
        tapeColor: '#f9724d'
      },
      {
        id: 'p_2026_07_24',
        groupId: 'group_26_07_24',
        src: 'images/2026_07/2026-07-24 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '自拍漂亮咪...！',
        defaultPosition: { topPercent: 0, leftPercent: 45, rotateDeg: -7 },
        tapeColor: '#f9724d'
      },
      {
        id: 'p_2026_07_24',
        groupId: 'group_26_07_24',
        src: 'images/2026_07/2026-07-24 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '自拍漂亮咪...！',
        defaultPosition: { topPercent: 30, leftPercent: 53, rotateDeg: 7 },
        tapeColor: '#f9724d'
      },
      {
        id: 'p_2026_07_24',
        groupId: 'group_26_07_24',
        src: 'images/2026_07/2026-07-24 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '啾一個咪！',
        defaultPosition: { topPercent: 54, leftPercent: 45, rotateDeg: -7 },
        tapeColor: '#f9724d'
      },
      {
        id: 'p_2026_07_25',
        groupId: 'group_26_07_25',
        src: 'images/2026_07/2026-07-25 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大便一千天情侶！',
        defaultPosition: { topPercent: 0, leftPercent:70, rotateDeg: -7 },
        tapeColor: '#d53306'
      },
      {
        id: 'p_2026_07_25',
        groupId: 'group_26_07_25',
        src: 'images/2026_07/2026-07-25 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '你長得很奇怪ㄟ',
        defaultPosition: { topPercent: 30, leftPercent:65, rotateDeg: 7 },
        tapeColor: '#d53306'
      },
      {
        id: 'p_2026_07_25',
        groupId: 'group_26_07_25',
        src: 'images/2026_07/2026-07-25 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '讓寶寶覺得寧靜的畫',
        defaultPosition: { topPercent: 70, leftPercent:65, rotateDeg: -7 },
        tapeColor: '#d53306'
      },
    ]
  },

  // ── 11. 2026.08 ─────────────────────────────────────────────
  {
    id: 'month_2026_08',
    titleBadge: '2026 . 08 ・ 盛夏星空與埃及旅行',
    subHeader: 'August Starlight Roadtrip',
    themeColor: '	#FF8E3C',
    washiType: '#FF8E3C',
    diaryHtmlFragments: [
      {
        textBefore: '2、咪跟新的朋友約一約在晚上去 ',
        triggerWord: {
          groupId: 'group_26_08_02',
          label: '夜間動物園'
        },
        textAfter: '雖然有一些小屁還但還是很酷！'
      },
      {
        textBefore: '7、想跟咪一起看電影！這次看什麼呢 ',
        triggerWord: {
          groupId: 'group_26_08_07',
          label: '吉依卡哇'
        },
        textAfter: 'すきやき![咬一口|30](images/stickers/咬一口.gif)(壽喜燒)![咬一口|30](images/stickers/咬一口.gif)![咬一口|30](images/stickers/咬一口.gif)、照り照りソースの焼きそば![咬一口|30](images/stickers/咬一口.gif)(淋上醬汁的炒麵)![咬一口|30](images/stickers/咬一口.gif)![咬一口|30](images/stickers/咬一口.gif)![咬一口|30](images/stickers/咬一口.gif)![咬一口|30](images/stickers/咬一口.gif)'
      },
      {
        textBefore: '21、轉生台南超級大雨還淹水，突然跑到',
        triggerWord: {
          groupId: 'group_26_08_21',
          label: '埃及去修項鍊'
        },
        textAfter: '是否搞錯了甚麼'
      },
      {
        textBefore: '28、約會逛到',
        triggerWord: {
          groupId: 'group_26_08_28',
          label: '吉伊卡哇、姆姆'
        },
        textAfter: '跟咪一起看姆姆卡通可愛！'
      },
      {
        textBefore: '30、偷偷摸摸送了咪',
        triggerWord: {
          groupId: 'group_26_08_30',
          label: '布丁狗小滿貫'
        },
        textAfter: '衣服可以讓誰都是布丁狗！'
      },
    ],
    photos: [
      {
        id: 'p_2026_08_02',
        groupId: 'group_26_08_02',
        src: 'images/2026_08/2026-08-02 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '帶著新爪子去繪繪新朋友',
        defaultPosition: { topPercent: 0, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#FF8E3C'
      },
      {
        id: 'p_2026_08_02',
        groupId: 'group_26_08_02',
        src: 'images/2026_08/2026-08-02 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '新朋友拍',
        defaultPosition: { topPercent: 0, leftPercent: 25, rotateDeg: -5 },
        tapeColor: '#FF8E3C'
      },
      {
        id: 'p_2026_08_02',
        groupId: 'group_26_08_02',
        src: 'images/2026_08/2026-08-02 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '夜間動物咪',
        defaultPosition: { topPercent: 0, leftPercent: 50, rotateDeg: 5 },
        tapeColor: '#FF8E3C'
      },
      {
        id: 'p_2026_08_02',
        groupId: 'group_26_08_02',
        src: 'images/2026_08/2026-08-02 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄚ挖...貴龜龜',
        defaultPosition: { topPercent: 0, leftPercent: 75, rotateDeg: -5 },
        tapeColor: '#FF8E3C'
      },
      {
        id: 'p_2026_08_07',
        groupId: 'group_26_08_07',
        src: 'images/2026_08/2026-08-07.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '電影票票票票票....',
        defaultPosition: { topPercent: 20, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#f6761a'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '跟新的一樣',
        defaultPosition: { topPercent: 0, leftPercent: 10, rotateDeg: -5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (13).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '冒著風雨去修項鍊',
        defaultPosition: { topPercent: 0, leftPercent: 30, rotateDeg: 5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '汽車旅館民宿的早餐',
        defaultPosition: { topPercent: 0, leftPercent: 50, rotateDeg: -5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '聖蛇Uraeus',
        defaultPosition: { topPercent: 0, leftPercent: 70, rotateDeg: 5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '牛牛角跟打仗',
        defaultPosition: { topPercent: 30, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '誇張細緻的小物',
        defaultPosition: { topPercent: 30, leftPercent: 25, rotateDeg: -5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '全上釉的小物..',
        defaultPosition: { topPercent: 30, leftPercent: 50, rotateDeg: 5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '三個守護神',
        defaultPosition: { topPercent: 30, leftPercent: 70, rotateDeg: 5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (8).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '超薄的精細小戒指',
        defaultPosition: { topPercent: 50, leftPercent: 70, rotateDeg: -5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (9).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '超大雕刻石牆',
        defaultPosition: { topPercent: 60, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (10).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '三隻小貓',
        defaultPosition: { topPercent: 60, leftPercent: 25, rotateDeg: 5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (11).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '棺材的彩色繪畫',
        defaultPosition: { topPercent: 60, leftPercent: 50, rotateDeg: -5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_21',
        groupId: 'group_26_08_21',
        src: 'images/2026_08/2026-08-21 (12).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '我的埃及英文名字',
        defaultPosition: { topPercent: 60, leftPercent: 70, rotateDeg: 5 },
        tapeColor: '#e0640b'
      },
      {
        id: 'p_2026_08_28',
        groupId: 'group_26_08_28',
        src: 'images/2026_08/2026-08-28 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄚ姆ㄚ姆吃好看電影',
        defaultPosition: { topPercent: 25, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#f7bf97'
      },
      {
        id: 'p_2026_08_28',
        groupId: 'group_26_08_28',
        src: 'images/2026_08/2026-08-28 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '小巴',
        defaultPosition: { topPercent: 25, leftPercent: 30, rotateDeg: -5 },
        tapeColor: '#f7bf97'
      },
      {
        id: 'p_2026_08_28',
        groupId: 'group_26_08_28',
        src: 'images/2026_08/2026-08-28 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '吉伊',
        defaultPosition: { topPercent: 25, leftPercent: 55, rotateDeg: 5 },
        tapeColor: '#f7bf97'
      },
      {
        id: 'p_2026_08_28',
        groupId: 'group_26_08_28',
        src: 'images/2026_08/2026-08-28 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '烏薩奇',
        defaultPosition: { topPercent: 25, leftPercent: 70, rotateDeg: -5 },
        tapeColor: '#f7bf97'
      },
      {
        id: 'p_2026_08_28',
        groupId: 'group_26_08_28',
        src: 'images/2026_08/2026-08-28 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '姆姆抱抱!!',
        defaultPosition: { topPercent: 50, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#f7bf97'
      },
      {
        id: 'p_2026_08_30',
        groupId: 'group_26_08_30',
        src: 'images/2026_08/2026-08-30 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '布丁鼠',
        defaultPosition: { topPercent: 40, leftPercent: 25, rotateDeg: -5 },
        tapeColor: '#f9a01c'
      },
      {
        id: 'p_2026_08_30',
        groupId: 'group_26_08_30',
        src: 'images/2026_08/2026-08-30 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄏㄚˋ！！我有冷麵',
        defaultPosition: { topPercent: 40, leftPercent: 50, rotateDeg: 5 },
        tapeColor: '#f9a01c'
      },
      {
        id: 'p_2026_08_30',
        groupId: 'group_26_08_30',
        src: 'images/2026_08/2026-08-30 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '驕傲布丁、生氣紫皮',
        defaultPosition: { topPercent: 40, leftPercent: 70, rotateDeg: -5 },
        tapeColor: '#f9a01c'
      },
    ]
  },

  // ── 12. 2026.09 ─────────────────────────────────────────────
  {
    id: 'month_2026_09',
    titleBadge: '2026 . 09 ・ 火車旅行與倒數生日',
    canvasHeight: 1500,
    subHeader: 'September Birthday Countdown',
    themeColor: '	#4F6D97',
    washiType: '#4F6D97',
    diaryHtmlFragments: [
      {
        textBefore: '5、咪跟家人出遊兩天！ ',
        triggerWord: {
          groupId: 'group_26_09_05',
          label: '出去玩！'
        },
        textAfter: '帶著布丁鼠、跟小象'
      },
      {
        textBefore: '12、跟咪趕場！！有上次的經驗這一次快快地抵達 ',
        triggerWord: {
          groupId: 'group_26_09_12',
          label: '超脫樂團之我要幹大事'
        },
        textAfter: '睽違8年以上的真實拍攝！超酷！ ![ㄉㄨㄞ|30](images/stickers/ㄉㄨㄞㄉㄨㄞ.gif)'
      },
      {
        textBefore: '18、寶寶選到一間酷酷飯店 ',
        triggerWord: {
          groupId: 'group_26_09_18',
          label: '住一晚'
        },
        textAfter: '很多日本人來住，跟很多特別的泡麵可以吃![趴|40](images/stickers/趴.gif)'
      },
      {
        textBefore: '19、火車之旅！跑到',
        triggerWord: {
          groupId: 'group_26_09_19',
          label: '十分、平溪、嶺腳、九份'
        },
        textAfter: '開心！出去玩得很開心！'
      },
      {
        textBefore: '\n\n\n\n\n\n',
      },
    ],
    photos: [
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '星空！',
        defaultPosition: { topPercent: 0, leftPercent: 0, rotateDeg: 4 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '魷魚圈！',
        defaultPosition: { topPercent: 0, leftPercent: 20, rotateDeg: -4 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大鼻丁鼠ㄘ！',
        defaultPosition: { topPercent: 0, leftPercent: 40, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大鼻好朋友',
        defaultPosition: { topPercent: 0, leftPercent: 60, rotateDeg: -4 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '豐盛早餐！',
        defaultPosition: { topPercent: 0, leftPercent: 80, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄘ!!!',
        defaultPosition: { topPercent: 20, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄘ!!!!!!！',
        defaultPosition: { topPercent: 20, leftPercent: 20, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (8).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄚ沙灘',
        defaultPosition: { topPercent: 20, leftPercent: 40, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (9).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄚ大鼻象',
        defaultPosition: { topPercent: 20, leftPercent: 60, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (10).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄚ沙灘',
        defaultPosition: { topPercent: 20, leftPercent: 80, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_05',
        groupId: 'group_26_09_05',
        src: 'images/2026_09/2026-09-05 (11).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: 'ㄚ帳棚',
        defaultPosition: { topPercent: 40, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_12',
        groupId: 'group_26_09_12',
        src: 'images/2026_09/2026-09-12.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '電影票根',
        defaultPosition: { topPercent: 40, leftPercent: 20, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_18',
        groupId: 'group_26_09_18',
        src: 'images/2026_09/2026-09-18.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大欣旅館',
        defaultPosition: { topPercent: 40, leftPercent: 40, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '好吃便宜乾麵',
        defaultPosition: { topPercent: 0, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (5).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '勇敢走下去漂亮咪',
        defaultPosition: { topPercent: 0, leftPercent: 15, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '背影漂亮咪',
        defaultPosition: { topPercent: 0, leftPercent: 30, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '蘑菇',
        defaultPosition: { topPercent: 0, leftPercent: 45, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '嶺腳瀑布景',
        defaultPosition: { topPercent: 0, leftPercent: 60, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (6).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '漂亮回眸咪',
        defaultPosition: { topPercent: 20, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (13).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大景瀑布',
        defaultPosition: { topPercent: 20, leftPercent: 30, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (14).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '瀑布&咪',
        defaultPosition: { topPercent: 20, leftPercent: 15, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (7).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '隱密溫馨的小店',
        defaultPosition: { topPercent: 35, leftPercent: 30, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (8).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '瓜習柑',
        defaultPosition: { topPercent: 0, leftPercent:80, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (9).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '寶拍星空',
        defaultPosition: { topPercent: 20, leftPercent: 60, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (16).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '咪拍星空',
        defaultPosition: { topPercent: 20, leftPercent: 80, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (10).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '火車',
        defaultPosition: { topPercent: 45, leftPercent: 0, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (11).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '後站通行證',
        defaultPosition: { topPercent: 45, leftPercent: 25, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (15).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '摸摸貓咪',
        defaultPosition: { topPercent: 45, leftPercent: 50, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (17).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '米跌早餐',
        defaultPosition: { topPercent: 45, leftPercent: 70, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (18).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '綜合五味香腸',
        defaultPosition: { topPercent: 70, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (19).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '五味大雞排',
        defaultPosition: { topPercent: 70, leftPercent: 20, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (20).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '姊妹雞腿捲',
        defaultPosition: { topPercent: 70, leftPercent: 40, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (21).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '石花凍',
        defaultPosition: { topPercent: 70, leftPercent: 60, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (12).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '九份',
        defaultPosition: { topPercent: 70, leftPercent: 80, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (22).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '九份巷內',
        defaultPosition: { topPercent: 82, leftPercent: 0, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (24).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '九份巷內',
        defaultPosition: { topPercent: 82, leftPercent: 20, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (23).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '開心寶&咪九份合照',
        defaultPosition: { topPercent: 82, leftPercent: 40, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (25).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '平溪街道',
        defaultPosition: { topPercent: 82, leftPercent: 60, rotateDeg: 5 },
        tapeColor: '#4F6D97'
      },
      {
        id: 'p_2026_09_19',
        groupId: 'group_26_09_19',
        src: 'images/2026_09/2026-09-19 (26).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '溪隱小陽台',
        defaultPosition: { topPercent: 82, leftPercent: 80, rotateDeg: -5 },
        tapeColor: '#4F6D97'
      },
    ]
  }
];
