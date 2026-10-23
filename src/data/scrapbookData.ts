import { MonthData } from '../types';

/**
 * =========================================================================
 * 💌 【如何新增或修改信件文字教學】
 * =========================================================================
 * 
 * 1. 修改信件段落：
 *    每個月份的 `diaryHtmlFragments` 陣列代表左側手帳的段落。
 *    - `textBefore`: 關鍵字按鈕「前面」的文字
 *    - `triggerWord`: （可選）點擊會觸發照片飛出的關鍵字
 *        - `groupId`: 關聯的照片群組名稱（需與該月 photos 裡的 groupId 一致）
 *        - `label`: 顯示在高亮按鈕上的文字
 *    - `textAfter`: 關鍵字按鈕「後面」的文字
 * 
 * 2. 新增單純文字段落（無按鈕）：
 *    {
 *      textBefore: '這是全新的一段回憶文字，沒有按鈕。',
 *      textAfter: ''
 *    }
 * 
 * 3. 新增照片：
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
          groupId: 'group_10_03',
          label: '倒鼻咪！'
        },
        textAfter: ' 嗷嗷笑'
      },
      {
        textBefore: '4號，一起去了大安森林公園走走！',
        triggerWord: {
          groupId: 'group_10_04',
          label: '在大安森林公園拍咪！'
        },
        textAfter: ' 姆姆姆'
      },
      {
        textBefore: '6號、拍了',
        triggerWord: {
          groupId: 'group_10_06',
          label: '拍貼機📸、金G獨立咪🐣、很會抓水姆寶！',
        },
        textAfter: '！'
      },
      {
        textBefore: '11、12號，',
        triggerWord: {
          groupId: 'group_10_11',
          label: '搖滾台中',
        },
        textAfter: '！'
      },
    ],
    photos: [
      {
        id: 'p_2025_10_03_1',
        groupId: 'group_10_03',
        src: 'images/2025_10/2025-10-03.jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '倒鼻咪紀念照',
        defaultPosition: { topPercent: 8, leftPercent: 52, rotateDeg: -4 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2025_10_04_1',
        groupId: 'group_10_04',
        src: 'images/2025_10/2025-10-04 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大安森林公園拍咪 (1)',
        defaultPosition: { topPercent: 24, leftPercent: 20, rotateDeg: 3 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2025_10_04_2',
        groupId: 'group_10_04',
        src: 'images/2025_10/2025-10-04 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '大安森林公園拍咪 (2)',
        defaultPosition: { topPercent: 44, leftPercent: 48, rotateDeg: -3 },
        tapeColor: 'coral'
      },
      {
        id: 'p_2025_10_06_1',
        groupId: 'group_10_06',
        src: 'images/2025_10/2025-10-06 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '金雞獨立咪！',
        defaultPosition: { topPercent: 58, leftPercent: 18, rotateDeg: 5 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_06_2',
        groupId: 'group_10_06',
        src: 'images/2025_10/2025-10-06 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '相親相愛<3',
        defaultPosition: { topPercent: 58, leftPercent: 10, rotateDeg: 5 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_06_3',
        groupId: 'group_10_06',
        src: 'images/2025_10/2025-10-06 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '拍立得',
        defaultPosition: { topPercent: 58, leftPercent: 5, rotateDeg: -5 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_06_4',
        groupId: 'group_10_06',
        src: 'images/2025_10/2025-10-06 (4).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '看起來很會抓水母',
        defaultPosition: { topPercent: 58, leftPercent: 30, rotateDeg: 8 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_11_01',
        groupId: 'group_10_11',
        src: 'images/2025_10/2025-10-11 (1).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '吃飯',
        defaultPosition: { topPercent: 10, leftPercent: 30, rotateDeg: 8 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_11_02',
        groupId: 'group_10_11',
        src: 'images/2025_10/2025-10-11 (2).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '搖滾台中',
        defaultPosition: { topPercent: 67, leftPercent: 15, rotateDeg: 2 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_10_11_03',
        groupId: 'group_10_11',
        src: 'images/2025_10/2025-10-11 (3).jpg',
        fallbackSrc: 'images/fail.jpg',
        caption: '瞪咪',
        defaultPosition: { topPercent: 67, leftPercent: 45, rotateDeg: 2 },
        tapeColor: 'mint'
      },
    ]
  },

  // ── 2. 2025.11 ──────────────────────────────────────────────
  {
    id: 'month_2025_11',
    titleBadge: '2025 . 11 ・ TWICE 與特別的日子',
    subHeader: 'November Special Days',
    themeColor: '#F28B82',
    washiType: 'coral',
    diaryHtmlFragments: [
      {
        textBefore: '8號咪 ',
        triggerWord: {
          groupId: 'group_11_twice',
          label: '拿我手機偷自拍'
        },
        textAfter: '，相簿裡多了一堆超搞怪的大頭照！15號三人組一起熱熱鬧鬧過生日。'
      },
      {
        textBefore: '22號是期待超久的 ',
        triggerWord: {
          groupId: 'group_11_twice',
          label: 'TWICE 演唱會！'
        },
        textAfter: '現場的應援海太壯觀了！手裡拿著應援棒，跟著全場 ONCE 一起大合唱真的好感動！'
      },
      {
        textBefore: '散場之後還在體育場外面激動地拍照留念，29號正妹布丁狗預約健軀，每一天都充滿驚喜與大笑。',
        textAfter: ''
      }
    ],
    photos: [
      {
        id: 'p_2025_11_1',
        groupId: 'group_11_twice',
        src: 'images/2025_11/2025_11_22-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&auto=format&fit=crop&q=80',
        caption: 'ONCE 現場應援海',
        defaultPosition: { topPercent: 10, leftPercent: 44, rotateDeg: -2 },
        tapeColor: 'coral'
      },
      {
        id: 'p_2025_11_2',
        groupId: 'group_11_twice',
        src: 'images/2025_11/2025_11_08-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&auto=format&fit=crop&q=80',
        caption: '偷拿手機搞怪大頭照',
        defaultPosition: { topPercent: 32, leftPercent: 18, rotateDeg: 4 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2025_11_3',
        groupId: 'group_11_twice',
        src: 'images/2025_11/2025_11_15-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&auto=format&fit=crop&q=80',
        caption: '三人組熱鬧過生日',
        defaultPosition: { topPercent: 55, leftPercent: 46, rotateDeg: -5 },
        tapeColor: 'coral'
      }
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
        textBefore: '6號玩了一級玩家、喝了海倫咖啡的魯魯手。14號跑去好多漂亮的地方看海，冷冷的天只要在一起就特別舒服。',
        textAfter: ''
      },
      {
        textBefore: '最期待的就是15號我們預定了 19-20 的溫泉！這趟 ',
        triggerWord: {
          groupId: 'group_12_onsen',
          label: '19-20 溫泉之旅'
        },
        textAfter: ' 真的好難忘！'
      },
      {
        textBefore: '暖呼呼的露天溫泉超舒服、飯店住宿開箱、晚上還一起玩沐浴球冒泡泡，笑到肚子痛！27號看了 Major in body bear。',
        textAfter: ''
      }
    ],
    photos: [
      {
        id: 'p_2025_12_1',
        groupId: 'group_12_onsen',
        src: 'images/2025_12/2025_12_19-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80',
        caption: '暖呼呼露天溫泉',
        defaultPosition: { topPercent: 12, leftPercent: 45, rotateDeg: 3 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2025_12_2',
        groupId: 'group_12_onsen',
        src: 'images/2025_12/2025_12_19-2.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&auto=format&fit=crop&q=80',
        caption: '溫泉旅館住宿開箱',
        defaultPosition: { topPercent: 36, leftPercent: 16, rotateDeg: -3 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2025_12_3',
        groupId: 'group_12_onsen',
        src: 'images/2025_12/2025_12_20-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=700&auto=format&fit=crop&q=80',
        caption: '玩沐浴球泡泡超歡樂',
        defaultPosition: { topPercent: 58, leftPercent: 44, rotateDeg: 4 },
        tapeColor: 'mint'
      }
    ]
  },

  // ── 4. 2026.01 ──────────────────────────────────────────────
  {
    id: 'month_2026_01',
    titleBadge: '2026 . 01 ・ 新年與暖冬小事',
    subHeader: 'January Warm Beginning',
    themeColor: '#FED458',
    washiType: 'yellow',
    diaryHtmlFragments: [
      {
        textBefore: '跨年夜倒數計時，一起在冷風裡看了燦爛的 ',
        triggerWord: {
          groupId: 'group_26_01_fireworks',
          label: '跨年夜璀璨煙火'
        },
        textAfter: '，新的一年第一秒是握著你的手度過的！'
      },
      {
        textBefore: '元旦早晨窩在暖暖的被窩裡賴床，午後散步順道買了排隊名店的 ',
        triggerWord: {
          groupId: 'group_26_01_sweet',
          label: '草莓大福與熱奶茶'
        },
        textAfter: '，甜滋滋的滋味開啟了整個一月。'
      },
      {
        textBefore: '寫下了好多今年的願望清單，只要身邊有咪，每一天都充滿了前進的踏實感。',
        textAfter: ''
      }
    ],
    photos: [
      {
        id: 'p_2026_01_1',
        groupId: 'group_26_01_fireworks',
        src: 'images/2026_01/2026_01_01-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=700&auto=format&fit=crop&q=80',
        caption: '跨年璀璨夜景',
        defaultPosition: { topPercent: 12, leftPercent: 46, rotateDeg: -3 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2026_01_2',
        groupId: 'group_26_01_sweet',
        src: 'images/2026_01/2026_01_15-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80',
        caption: '冬日午茶甜點時光',
        defaultPosition: { topPercent: 42, leftPercent: 18, rotateDeg: 4 },
        tapeColor: 'coral'
      }
    ]
  },

  // ── 5. 2026.02 ──────────────────────────────────────────────
  {
    id: 'month_2026_02',
    titleBadge: '2026 . 02 ・ 甜蜜初春與情人節',
    subHeader: 'February Valentine Romance',
    themeColor: '#F28B82',
    washiType: 'coral',
    diaryHtmlFragments: [
      {
        textBefore: '二月的街頭開始有微暖的陽光，情人節那天收到了滿滿驚喜的 ',
        triggerWord: {
          groupId: 'group_26_02_choco',
          label: '手作生巧克力'
        },
        textAfter: '，入口即化真的太好吃了！'
      },
      {
        textBefore: '週末偶遇了巷弄裡的 ',
        triggerWord: {
          groupId: 'group_26_02_cafe',
          label: '陽光貓咪咖啡廳'
        },
        textAfter: '，咪摸貓咪摸得好溫柔，那一刻看著你的側臉覺得無比幸福。'
      }
    ],
    photos: [
      {
        id: 'p_2026_02_1',
        groupId: 'group_26_02_choco',
        src: 'images/2026_02/2026_02_14-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=700&auto=format&fit=crop&q=80',
        caption: '甜蜜情人節禮物',
        defaultPosition: { topPercent: 14, leftPercent: 40, rotateDeg: 2 },
        tapeColor: 'coral'
      },
      {
        id: 'p_2026_02_2',
        groupId: 'group_26_02_cafe',
        src: 'images/2026_02/2026_02_20-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700&auto=format&fit=crop&q=80',
        caption: '被貓咪包圍的午後',
        defaultPosition: { topPercent: 45, leftPercent: 22, rotateDeg: -4 },
        tapeColor: 'yellow'
      }
    ]
  },

  // ── 6. 2026.03 ──────────────────────────────────────────────
  {
    id: 'month_2026_03',
    titleBadge: '2026 . 03 ・ 春櫻綻放與午後野餐',
    subHeader: 'March Cherry Blossom',
    themeColor: '#F8BBD0',
    washiType: 'coral',
    diaryHtmlFragments: [
      {
        textBefore: '春天的腳步悄悄來了！三月中旬一起去山上看滿開的 ',
        triggerWord: {
          groupId: 'group_26_03_sakura',
          label: '粉嫩粉嫩的春櫻步道'
        },
        textAfter: '，微風吹過落櫻繽紛好夢幻。'
      },
      {
        textBefore: '鋪開野餐墊在草地上曬太陽，咪準備了 ',
        triggerWord: {
          groupId: 'group_26_03_picnic',
          label: '特製三明治野餐盒'
        },
        textAfter: '，一邊看著藍天白雲一邊聊天，舒服到差點睡著。'
      }
    ],
    photos: [
      {
        id: 'p_2026_03_1',
        groupId: 'group_26_03_sakura',
        src: 'images/2026_03/2026_03_15-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=700&auto=format&fit=crop&q=80',
        caption: '春日櫻花樹下的咪',
        defaultPosition: { topPercent: 10, leftPercent: 45, rotateDeg: 4 },
        tapeColor: 'coral'
      },
      {
        id: 'p_2026_03_2',
        groupId: 'group_26_03_picnic',
        src: 'images/2026_03/2026_03_22-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=700&auto=format&fit=crop&q=80',
        caption: '草地上的悠閒野餐',
        defaultPosition: { topPercent: 42, leftPercent: 18, rotateDeg: -3 },
        tapeColor: 'mint'
      }
    ]
  },

  // ── 7. 2026.04 ──────────────────────────────────────────────
  {
    id: 'month_2026_04',
    titleBadge: '2026 . 04 ・ 愚人節與春雨季節',
    subHeader: 'April Rain & Laughter',
    themeColor: '#81C784',
    washiType: 'mint',
    diaryHtmlFragments: [
      {
        textBefore: '4月1號愚人節一早就被咪認真搞怪的假話逗到捧腹大笑！這天在路上遇到了突然的大雨，一起 ',
        triggerWord: {
          groupId: 'group_26_04_rain',
          label: '共撐一把黃色小傘'
        },
        textAfter: ' 踩水窪。'
      },
      {
        textBefore: '淋了一點雨之後，躲進了街角那家熱氣騰騰的 ',
        triggerWord: {
          groupId: 'group_26_04_ramen',
          label: '濃郁豚骨拉麵店'
        },
        textAfter: '，湯頭暖到心坎裡。'
      }
    ],
    photos: [
      {
        id: 'p_2026_04_1',
        groupId: 'group_26_04_rain',
        src: 'images/2026_04/2026_04_01-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=700&auto=format&fit=crop&q=80',
        caption: '雨天裡的浪漫漫步',
        defaultPosition: { topPercent: 12, leftPercent: 44, rotateDeg: -2 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2026_04_2',
        groupId: 'group_26_04_ramen',
        src: 'images/2026_04/2026_04_12-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop&q=80',
        caption: '熱氣騰騰暖胃拉麵',
        defaultPosition: { topPercent: 45, leftPercent: 20, rotateDeg: 3 },
        tapeColor: 'yellow'
      }
    ]
  },

  // ── 8. 2026.05 ──────────────────────────────────────────────
  {
    id: 'month_2026_05',
    titleBadge: '2026 . 05 ・ 初夏海風與踏浪行',
    subHeader: 'May Sea Breeze',
    themeColor: '#4FC3F7',
    washiType: 'mint',
    diaryHtmlFragments: [
      {
        textBefore: '初夏的溫度剛剛好，五月我們跑到了北海岸看海，脫下鞋子在沙灘上 ',
        triggerWord: {
          groupId: 'group_26_05_beach',
          label: '追逐白色的碎浪花'
        },
        textAfter: '，海水冰冰涼涼的超級解壓。'
      },
      {
        textBefore: '傍晚沿著堤防散步看夕陽，手裡拿著買一送一的 ',
        triggerWord: {
          groupId: 'group_26_05_sunset',
          label: '芒果霜淇淋與夕陽金光'
        },
        textAfter: '，整個天空都被染成了溫柔的橘紫色。'
      }
    ],
    photos: [
      {
        id: 'p_2026_05_1',
        groupId: 'group_26_05_beach',
        src: 'images/2026_05/2026_05_10-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80',
        caption: '海邊踩浪花的快樂身影',
        defaultPosition: { topPercent: 12, leftPercent: 42, rotateDeg: 3 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2026_05_2',
        groupId: 'group_26_05_sunset',
        src: 'images/2026_05/2026_05_24-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=700&auto=format&fit=crop&q=80',
        caption: '橘紫色夢幻夕陽',
        defaultPosition: { topPercent: 44, leftPercent: 18, rotateDeg: -4 },
        tapeColor: 'coral'
      }
    ]
  },

  // ── 9. 2026.06 ──────────────────────────────────────────────
  {
    id: 'month_2026_06',
    titleBadge: '2026 . 06 ・ 盛夏冰品與電影夜',
    subHeader: 'June Summer Chills',
    themeColor: '#FED458',
    washiType: 'yellow',
    diaryHtmlFragments: [
      {
        textBefore: '六月的太陽好熱情！躲在冷氣房裡吃了滿滿大碗的 ',
        triggerWord: {
          groupId: 'group_26_06_shaveice',
          label: '愛文芒果雪花冰'
        },
        textAfter: '，布丁狗也抵擋不住這份甜蜜！'
      },
      {
        textBefore: '週末窩在一起看了好幾部感人的院線大片，到了晚上還去夜市玩了 ',
        triggerWord: {
          groupId: 'group_26_06_nightmarket',
          label: '夜市套圈圈與射氣球'
        },
        textAfter: '，贏得了一隻胖嘟嘟的小布偶！'
      }
    ],
    photos: [
      {
        id: 'p_2026_06_1',
        groupId: 'group_26_06_shaveice',
        src: 'images/2026_06/2026_06_08-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=700&auto=format&fit=crop&q=80',
        caption: '消暑必備芒果雪花冰',
        defaultPosition: { topPercent: 10, leftPercent: 45, rotateDeg: -3 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2026_06_2',
        groupId: 'group_26_06_nightmarket',
        src: 'images/2026_06/2026_06_21-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=700&auto=format&fit=crop&q=80',
        caption: '熱鬧的夜市遊戲戰利品',
        defaultPosition: { topPercent: 42, leftPercent: 20, rotateDeg: 4 },
        tapeColor: 'coral'
      }
    ]
  },

  // ── 10. 2026.07 ─────────────────────────────────────────────
  {
    id: 'month_2026_07',
    titleBadge: '2026 . 07 ・ 夏夜祭典與絢爛花火',
    subHeader: 'July Fireworks Festival',
    themeColor: '#F28B82',
    washiType: 'coral',
    diaryHtmlFragments: [
      {
        textBefore: '一年一度最熱鬧的夏日祭典！咪穿上了特別準備的 ',
        triggerWord: {
          groupId: 'group_26_07_yukata',
          label: '日系花色浴衣'
        },
        textAfter: '，拿著小團扇的樣子真的超級可愛，沿路吸引了無數目光。'
      },
      {
        textBefore: '祭典高潮是河畔邊的千發煙火，我們仰頭看著 ',
        triggerWord: {
          groupId: 'group_26_07_hanabi',
          label: '照亮夜空的璀璨花火'
        },
        textAfter: '，那瞬間光芒倒映在咪的眼眸裡，是整個夏天最美的畫面。'
      }
    ],
    photos: [
      {
        id: 'p_2026_07_1',
        groupId: 'group_26_07_yukata',
        src: 'images/2026_07/2026_07_14-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=700&auto=format&fit=crop&q=80',
        caption: '夏日祭典的唯美留念',
        defaultPosition: { topPercent: 12, leftPercent: 42, rotateDeg: 2 },
        tapeColor: 'coral'
      },
      {
        id: 'p_2026_07_2',
        groupId: 'group_26_07_hanabi',
        src: 'images/2026_07/2026_07_28-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=700&auto=format&fit=crop&q=80',
        caption: '綻放在夜空的絢爛花火',
        defaultPosition: { topPercent: 44, leftPercent: 16, rotateDeg: -4 },
        tapeColor: 'yellow'
      }
    ]
  },

  // ── 11. 2026.08 ─────────────────────────────────────────────
  {
    id: 'month_2026_08',
    titleBadge: '2026 . 08 ・ 盛夏星空與公路旅行',
    subHeader: 'August Starlight Roadtrip',
    themeColor: '#7E57C2',
    washiType: 'mint',
    diaryHtmlFragments: [
      {
        textBefore: '八月的深夜公路兜風，我們開車上了光害極少的高山，躺在車頂看見了整條清澈的 ',
        triggerWord: {
          groupId: 'group_26_08_stars',
          label: '銀河與漫天流星雨'
        },
        textAfter: '，咪許下了願望還偷偷不告訴我！'
      },
      {
        textBefore: '清晨五點等待著第一道曙光，看著 ',
        triggerWord: {
          groupId: 'group_26_08_sunrise',
          label: '雲海翻騰的壯麗日出'
        },
        textAfter: '，金黃色的光灑滿大地，身邊有你的溫度特別令人安心。'
      }
    ],
    photos: [
      {
        id: 'p_2026_08_1',
        groupId: 'group_26_08_stars',
        src: 'images/2026_08/2026_08_12-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=700&auto=format&fit=crop&q=80',
        caption: '高山上的浪漫滿天繁星',
        defaultPosition: { topPercent: 12, leftPercent: 44, rotateDeg: -3 },
        tapeColor: 'mint'
      },
      {
        id: 'p_2026_08_2',
        groupId: 'group_26_08_sunrise',
        src: 'images/2026_08/2026_08_25-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=700&auto=format&fit=crop&q=80',
        caption: '晨光穿透雲海的感動',
        defaultPosition: { topPercent: 45, leftPercent: 18, rotateDeg: 3 },
        tapeColor: 'yellow'
      }
    ]
  },

  // ── 12. 2026.09 ─────────────────────────────────────────────
  {
    id: 'month_2026_09',
    titleBadge: '2026 . 09 ・ 初秋微涼與倒數生日',
    subHeader: 'September Birthday Countdown',
    themeColor: '#FFA000',
    washiType: 'yellow',
    diaryHtmlFragments: [
      {
        textBefore: '轉眼來到了九月，微涼的秋風拂過，走進了準備迎接生日前夕的倒數月！這天一起去了 ',
        triggerWord: {
          groupId: 'group_26_09_cafe',
          label: '充滿溫暖木質調的手作甜點坊'
        },
        textAfter: '，悄悄籌備著給咪的驚喜。'
      },
      {
        textBefore: '翻看著過去一整年滿滿的拍立得手記，看著 ',
        triggerWord: {
          groupId: 'group_26_09_memories',
          label: '這一年裡咪大笑的每一個瞬間'
        },
        textAfter: '，心中滿溢著無窮的感謝與珍視。24 歲生日即將到來，每一天都更愛你一點！'
      }
    ],
    photos: [
      {
        id: 'p_2026_09_1',
        groupId: 'group_26_09_cafe',
        src: 'images/2026_09/2026_09_10-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&auto=format&fit=crop&q=80',
        caption: '秋日溫暖的咖啡香氣',
        defaultPosition: { topPercent: 10, leftPercent: 42, rotateDeg: 4 },
        tapeColor: 'yellow'
      },
      {
        id: 'p_2026_09_2',
        groupId: 'group_26_09_memories',
        src: 'images/2026_09/2026_09_28-1.png',
        fallbackSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700&auto=format&fit=crop&q=80',
        caption: '最珍貴的大笑笑顏',
        defaultPosition: { topPercent: 44, leftPercent: 20, rotateDeg: -3 },
        tapeColor: 'coral'
      }
    ]
  }
];
