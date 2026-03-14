import type { Technology } from './technology_enum';

export function getSinceUntilText(since?: string, until?: string): string {
  if (until && since) {
    return `${since} ～ ${until}`;
  }
  if (since) {
    return `${since} ～`;
  }
  if (until) {
    return `～ ${until}`;
  }
  return '';
}

export type Project = {
  name: string;
  description: string;
  repo?: string;
  since?: string;
  until?: string;
  url?: string;
  technologies?: Technology[];
  releases?: {
    date: string;
    version: string;
  }[];
};

export const projects: Project[] = [
  {
    name: 'Reverie',
    description: 'Rust 製の汎用 3D/2D ゲームエンジン',
    repo: 'https://github.com/yuma140902/Reverie',
    since: '2021年8月',
    url: '/works/reverie/',
    technologies: ['rust', 'opengl'],
    releases: [
      {
        date: '2024/09/19',
        version: 'v0.1.0',
      },
      {
        date: '2024/09/17',
        version: 'v0.0.8',
      },
      {
        date: '2024/06/04',
        version: 'v0.0.7',
      },
      {
        date: '2022/10/01',
        version: 'v0.0.6',
      },
      {
        date: '2022/08/26',
        version: 'v0.0.5',
      },
      {
        date: '2021/11/07',
        version: 'v0.0.4',
      },
      {
        date: '2021/10/12',
        version: 'v0.0.3',
      },
      {
        date: '2021/10/09',
        version: 'v0.0.2',
      },
      {
        date: '2021/10/04',
        version: 'v0.0.1',
      },
      {
        date: '2021/10/04',
        version: 'v0.0.0',
      },
    ],
  },
  {
    name: 'xanadu',
    description: 'Rust 製の Entity Component System (ECS) ライブラリ',
    since: '2021年10月',
    repo: 'https://github.com/yuma140902/Xanadu',
    url: '/works/xanadu/',
    technologies: ['rust'],
    releases: [
      {
        date: '2021/10/09',
        version: 'v0.0.0',
      },
      {
        date: '2024/04/22',
        version: 'v0.0.1',
      },
      {
        date: '2024/04/23',
        version: 'v0.0.2',
      },
      {
        date: '2024/04/24',
        version: 'v0.0.3',
      },
      {
        date: '2024/05/09',
        version: 'v0.0.4',
      },
      {
        date: '2024/05/11',
        version: 'v0.0.5',
      },
    ],
  },
  {
    name: 'Tempura SSG',
    description: 'Rust 製のパイプラインベースの静的サイトジェネレーター',
    repo: 'https://github.com/yuma140902/tempura',
    url: '/works/tempura/',
    since: '2022年8月',
    technologies: ['rust'],
    releases: [
      {
        date: '2024/09/04',
        version: 'v0.5.2',
      },
      {
        date: '2024/09/04',
        version: 'v0.5.1',
      },
      {
        date: '2023/12/18',
        version: 'v0.5.0',
      },
      {
        date: '2023/11/10',
        version: 'v0.4.3',
      },
      {
        date: '2023/11/10',
        version: 'v0.4.2',
      },
      {
        date: '2023/11/10',
        version: 'v0.4.1',
      },
      {
        date: '2023/11/10',
        version: 'v0.4.0',
      },
      {
        date: '2023/10/15',
        version: 'v0.3.3',
      },
      {
        date: '2023/10/15',
        version: 'v0.3.2',
      },
      {
        date: '2023/10/15',
        version: 'v0.3.1',
      },
      {
        date: '2023/10/15',
        version: 'v0.3.0',
      },
      {
        date: '2023/10/14',
        version: 'v0.2.3',
      },
      {
        date: '2023/07/12',
        version: 'v0.2.2',
      },
      {
        date: '2023/02/14',
        version: 'v0.2.1',
      },
      {
        date: '2022/11/01',
        version: 'v0.2.0',
      },
      {
        date: '2022/10/31',
        version: 'v0.1.0',
      },
    ],
  },
  {
    name: 'UpToDateMod',
    description: 'Minecraft の MOD',
    repo: 'https://github.com/yuma140902/UpToDateMod1.7.10',
    url: '/works/uptodatemod/',
    since: '2018年8月',
    technologies: ['java', 'scala', 'minecraft'],
    releases: [
      {
        date: '2023/02/22',
        version: 'v2.4.1',
      },
      {
        date: '2023/02/19',
        version: 'v2.4.0',
      },
      {
        date: '2023/01/20',
        version: 'v2.3.12',
      },
      {
        date: '2021/07/04',
        version: 'v2.3.11',
      },
      {
        date: '2021/12/19',
        version: 'v2.3.10',
      },
      {
        date: '2020/12/19',
        version: 'v2.3.9',
      },
      {
        date: '2020/11/06',
        version: 'v2.3.8',
      },
      {
        date: '2020/11/02',
        version: 'v2.3.7',
      },
      {
        date: '2020/11/01',
        version: 'v2.3.6',
      },
      {
        date: '2020/09/13',
        version: 'v2.3.5',
      },
      {
        date: '2020/08/19',
        version: 'v2.3.4',
      },
      {
        date: '2020/07/11',
        version: 'v2.3.3',
      },
      {
        date: '2020/06/27',
        version: 'v2.3.2',
      },
      {
        date: '2020/05/16',
        version: 'v2.3.1',
      },
      {
        date: '2020/05/13',
        version: 'v2.3.0',
      },
      {
        date: '2020/04/19',
        version: 'v2.2.2',
      },
      {
        date: '2020/04/15',
        version: 'v2.2.1',
      },
      {
        date: '2020/04/15',
        version: 'v2.2.0',
      },
      {
        date: '2020/03/21',
        version: 'v2.1.1',
      },
      {
        date: '2020/03/21',
        version: 'v2.1.0',
      },
      {
        date: '2020/03/06',
        version: 'v2.0.1',
      },
      {
        date: '2020/03/01',
        version: 'v2.0.0',
      },
      {
        date: '2019/07/09',
        version: 'v1.6.1',
      },
      {
        date: '2019/07/05',
        version: 'v1.6.0',
      },
      {
        date: '2019/05/14',
        version: 'v1.5.0',
      },
      {
        date: '2019/04/01',
        version: 'v1.4.2',
      },
      {
        date: '2019/02/22',
        version: 'v1.4.1',
      },
      {
        date: '2019/02/22',
        version: 'v1.4.0',
      },
      {
        date: '2019/02/09',
        version: 'v1.3.0',
      },
      {
        date: '2019/01/14',
        version: 'v1.2.1',
      },
      {
        date: '2019/01/09',
        version: 'v1.2.0',
      },
      {
        date: '2018/12/27',
        version: 'v1.1.0',
      },
      {
        date: '2018/12/16',
        version: 'v1.0.2',
      },
      {
        date: '2018/12/16',
        version: 'v1.0.1',
      },
      {
        date: '2018/12/09',
        version: 'v1.0.0',
      },
      {
        date: '2018/11/24',
        version: 'v0.5.1',
      },
      {
        date: '2018/11/20',
        version: 'v0.5.0',
      },
      {
        date: '2018/11/14',
        version: 'v0.4.0',
      },
      {
        date: '2018/11/11',
        version: 'v0.3.1',
      },
      {
        date: '2018/11/11',
        version: 'v0.3.0',
      },
      {
        date: '2018/11/06',
        version: 'v0.2.1',
      },
      {
        date: '2018/11/03',
        version: 'v0.2.0',
      },
      {
        date: '2018/09/08',
        version: 'v0.1.1',
      },
      {
        date: '2018/09/08',
        version: 'v0.1.0',
      },
      {
        date: '2018/09/08',
        version: 'v0.0.2',
      },
      {
        date: '2018/08/27',
        version: 'v0.0.1',
      },
      {
        date: '2018/08/26',
        version: 'v0.0.0',
      },
    ],
  },
  {
    name: 'Web Image Editor',
    description: 'ブラウザ上で動作する画像エディタ',
    repo: 'https://github.com/yuma140902/web-image-editor',
    since: '2023年9月',
    url: '/works/web-image-editor/',
    technologies: ['ts', 'opencv'],
  },
  {
    name: 'LMML Music Macro Language',
    description:
      'MML (Music Macro Language) の方言である独自言語 LMML の仕様と、パーサーやプレイヤーなどの実装',
    repo: 'https://github.com/yuma140902/lmml',
    since: '2023年11月',
    url: '/works/lmml/',
    technologies: ['rust'],
    releases: [
      {
        date: '2024/11/14',
        version: 'v0.5.4',
      },
      {
        date: '2024/09/04',
        version: 'v0.5.2',
      },
      {
        date: '2024/05/12',
        version: 'v0.5.1',
      },
      {
        date: '2023/11/17',
        version: 'v0.5.0',
      },
      {
        date: '2023/11/17',
        version: 'v0.4.0',
      },
      {
        date: '2023/11/17',
        version: 'v0.3.0',
      },
      {
        date: '2023/11/16',
        version: 'v0.2.0',
      },
      {
        date: '2023/11/16',
        version: 'v0.1.0',
      },
    ],
  },
  {
    name: 'rehype-text-autospace',
    description: '日本語と英語の間に間隔を開ける rehype プラグイン',
    repo: 'https://github.com/yuma140902/rehype-text-autospace',
    since: '2024年9月',
    url: '/works/rehype-text-autospace/',
    technologies: ['ts'],
    releases: [
      {
        date: '2024/11/14',
        version: 'v1.0.1',
      },
      {
        date: '2024/09/15',
        version: 'v1.0.0',
      },
    ],
  },
  {
    name: 'LibJsonModel',
    description: 'Minecraft の MOD 開発のためのライブラリ',
    repo: 'https://github.com/yuma140902/LibJsonModel',
    url: '/works/libjsonmodel/',
    since: '2023年7月',
    technologies: ['java', 'minecraft'],
  },
  {
    name: 'LaTeXのテンプレート集',
    description: '9種類のテンプレート',
    repo: 'https://github.com/yuma140902/lt',
    since: '2022年1月',
    technologies: ['latex'],
  },
  {
    name: 'auto-split-direction.nvim',
    description:
      'ウィンドウの分割方向を自動的に決定するNeovimプラグイン。\n\nウィンドウが縦長なら水平に、横長なら垂直に分割する。',
    repo: 'https://github.com/yuma140902/auto-split-direction.nvim',
    since: '2023年6月',
    technologies: ['lua'],
    releases: [
      {
        date: '2023/07/22',
        version: 'v0.1.0',
      },
    ],
  },
  {
    name: 'random-output',
    description:
      '標準出力・標準エラー出力にランダムな文字列を出力するCLIツール。\n\nタイムスタンプをつけたり色をつけたりもできる。シェルスクリプトの動作確認に便利。',
    repo: 'https://github.com/yuma140902/random-output',
    since: '2022年7月',
    technologies: ['rust'],
    releases: [
      {
        date: '2024/11/14',
        version: 'v0.3.1',
      },
      {
        date: '2023/02/14',
        version: 'v0.3.0',
      },
      {
        date: '2023/02/14',
        version: 'v0.2.0',
      },
    ],
  },
  {
    name: 'dotfiles',
    description: 'Neovim等の設定ファイルとそのインストーラー',
    repo: 'https://github.com/yuma140902/dotfiles-public',
    since: '2023年7月(2019年12月)',
    technologies: ['lua'],
  },
  {
    name: 'regend',
    description: '正規表現をε-NFAおよびDFAに変換する',
    repo: 'https://github.com/yuma140902/regend',
    since: '2023年11月',
    technologies: ['rust'],
  },
  {
    name: 'Regend WebUI',
    description:
      'regendのフロントエンド。\n\nDFAをマウスで掴んでグリグリ動かして遊べる。',
    repo: 'https://github.com/yuma140902/regend-webui',
    since: '2023年11月',
    technologies: ['rust', 'wasm', 'ts'],
  },
];

export const old_projects: Project[] = [
  {
    name: 'gallery-viewer',
    description: 'gallery-dlが生成したメタデータを表示する',
    repo: 'https://github.com/yuma140902/gallery-viewer',
    since: '2023年2月',
    until: '2023年2月',
    technologies: ['rust', 'ts', 'tauri'],
  },
  {
    name: 'WebTools',
    description:
      'ブラウザ上で動作する小物のツール群。 Tempura 製。このサイトと一体化したため独立したプロジェクトとしては更新終了',
    repo: 'https://github.com/yuma140902/webtools',
    since: '2022年11月',
    until: '2023年11月',
    technologies: ['js'],
  },
  {
    name: 'chatgpt_to_markdown',
    description:
      'ChatGPTのウェブサイトから会話を抽出し、マークダウン形式に変換してクリップボードに書き込むユーザースクリプト',
    repo: 'https://github.com/yuma140902/chatgpt_to_markdown',
    since: '2022年4月',
    technologies: ['js'],
  },
  {
    name: 'IPAInput',
    description:
      '国際音声記号を入力するためのGoogle日本語入力用の辞書を生成するスクリプト',
    repo: 'https://github.com/yuma140902/IPAInput',
    since: '2022年4月',
    technologies: ['python'],
  },
  {
    name: 'CompareCost',
    description: '商品の単価を素早く計算するAndroidアプリ',
    repo: 'https://github.com/yuma140902/CompareCost',
    since: '2022年3月',
    technologies: ['kotlin', 'android'],
    releases: [
      {
        date: '2022/03/30',
        version: 'v2',
      },
      {
        date: '2022/03/30',
        version: 'v1',
      },
    ],
  },
  {
    name: 'AIC-Unity',
    description:
      'AIC（慶應義塾大学AI・高度プログラミングコンソーシアム）で講師をしたときに用意した教材',
    repo: 'https://github.com/yuma140902/AIC-Unity',
    since: '2022年3月',
    technologies: ['csharp', 'unity'],
  },
  {
    name: 'dotfiles-rs',
    description: 'dotfilesをインストールするツール',
    repo: 'https://github.com/yuma140902/dotfiles-rs',
    since: '2022年2月',
    technologies: ['rust'],
  },
  {
    name: 'crawl-dl-ps1',
    description: 'gallery-dlのフロントエンド',
    since: '2021年12月',
    technologies: ['pwsh'],
  },
  {
    name: 'BlockingIO',
    description:
      'マルチプレイオンライン3Dおにごっこゲーム。 ReverieEngine 製。',
    repo: 'https://github.com/kcs1959/BlockingIO-client',
    since: '2021年10月',
    until: '2021年12月',
    technologies: ['rust', 'socketio'],
    releases: [
      {
        date: '2021/11/18',
        version: 'v0.2.0',
      },
      {
        date: '2021/11/12',
        version: 'v0.1.1',
      },
    ],
  },
  {
    name: 'RustyCraft',
    description: 'Reverie Engineのデモとして作られたMinecraft風ゲーム',
    repo: 'https://github.com/yuma140902/RustyCraft',
    since: '2021年8月',
    until: '2021年10月',
    url: '/works/rustycraft',
    technologies: ['rust', 'opengl', 'minecraft'],
    releases: [
      {
        date: '2021/10/03',
        version: 'ss2021-10-03',
      },
      {
        date: '2021/09/24',
        version: 'yagami-rc-1.1',
      },
      {
        date: '2021/09/15',
        version: 'yagami-rc-1',
      },
    ],
  },
  {
    name: 'line-echo',
    description: 'しりとりができるLINE bot。漢字も読める。',
    repo: 'https://github.com/yuma140902/line-echo',
    since: '2021年7月',
    technologies: ['line', 'ts', 'postgresql'],
    releases: [
      {
        date: '2021/09/21',
        version: 'yagami-rc2.1',
      },
      {
        date: '2021/09/21',
        version: 'yagami-rc2',
      },
      {
        date: '2021/09/21',
        version: 'yagami-rc1',
      },
    ],
  },
  {
    name: 'gomoku-elm',
    description: 'Elm製の五目並べ',
    repo: 'https://github.com/yuma140902/gomoku-elm',
    since: '2021年6月',
    technologies: ['elm'],
  },
  {
    name: 'ShutdownCountdown',
    description:
      '指定した時間にPCをシャットダウンするソフト。シャットダウン前に警告表示ができる。',
    repo: 'https://github.com/yuma140902/ShutdownCountdown',
    since: '2020年2月',
    until: '2022年12月',
    technologies: ['csharp', 'winforms'],
    releases: [
      {
        date: '2022/12/10',
        version: 'v1.1.0',
      },
      {
        date: '2020/03/26',
        version: 'v0.0.0-alpha1',
      },
    ],
  },
  {
    name: 'MCResourcePackUtil',
    description:
      ' Minecraftのテクスチャを読み込み、一括でフィルターをかけてリソースパック化するソフト',
    repo: 'https://github.com/yuma140902/MCResourcePackUtil',
    since: '2020年9月',
    until: '2023年6月',
    technologies: ['csharp', 'winforms', 'opencv'],
    releases: [
      {
        date: '2023/06/15',
        version: 'v0.1.0',
      },
    ],
  },
  {
    name: 'ProconHelper',
    description:
      ' 競プロ用のソフト。「コンパイル→stdin→stdoutの確認」のイテレーションを高速に回すことができる',
    repo: 'https://github.com/yuma140902/ProconHelper',
    since: '2020年3月',
    until: '2021年4月',
    technologies: ['csharp', 'winforms'],
    releases: [
      {
        date: '2020/06/01',
        version: 'v1.5.1-alpha',
      },
      {
        date: '2020/03/26',
        version: 'v1.5.0-alpha',
      },
      {
        date: '2020/03/25',
        version: 'v1.4.0',
      },
    ],
  },
  {
    name: 'MuteClassi',
    description: 'classi.jpの通知を非表示にするFirefox機能拡張',
    since: '2020年3月',
    until: '2020年10月',
    technologies: ['fxaddon'],
    releases: [
      {
        date: '2020/10/21',
        version: 'Version 0.0.1',
      },
      {
        date: '2020/03/07',
        version: 'Version 0.0.0',
      },
    ],
  },
  {
    name: 'yuma140902.github.io',
    description: '旧個人サイト',
    since: '2020年1月',
    until: '2020年5月',
    technologies: ['html'],
  },
  {
    name: 'OreUnifyGenerator',
    description:
      'Minecraftの各工業MODごとに異なる鉱石・インゴットなどのテクスチャを統一するツール',
    since: '2020年1月',
    repo: 'https://github.com/yuma140902/OreUnifyGenerator',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'DD連番くん',
    description:
      '指定したフォルダを監視し、追加されたファイルを連番になるようにリネームする',
    since: '2019年12月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'GmailSwapChecks',
    description: 'Gmailのレガシービューの機能を拡張するFirefox機能拡張',
    since: '2019年7月',
    until: '2019年11月',
    technologies: ['fxaddon'],
    releases: [
      {
        date: '2019/11/16',
        version: 'Version 2.1',
      },
      {
        date: '2019/07/19',
        version: 'Version 2.0',
      },
      {
        date: '2019/07/09',
        version: 'Version 1.0',
      },
    ],
  },
  {
    name: 'Japan Power Outage Viewer',
    description: '東京電力管内の停電状況が見られるサイト',
    repo: 'https://github.com/yuma140902/jpov',
    since: '2019年10月',
    until: '2020年9月',
    technologies: ['angular'],
  },
  {
    name: 'SmallViewer',
    description:
      '画像を小さいウィンドウで表示できるソフト。資料を表示しておくのに便利',
    since: '2019年8月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'YumaLib',
    description:
      'MinecraftのMOD。いわゆる前提MOD。色々MODを作るつもりだったので用意したが、そうならなかったのでUpToDateModに吸収された。',
    repo: 'https://github.com/yuma140902/YumaLib',
    since: '2019年7月',
    technologies: ['java', 'minecraft'],
    releases: [
      {
        date: '2019/07/28',
        version: 'v0.0.1',
      },
    ],
  },
  {
    name: 'Polyhedron',
    description: '正多面体を3D表示する',
    since: '2019年6月',
    technologies: ['java', 'processing'],
  },
  {
    name: 'PolyhedronCG',
    description: '正多面体を3D表示する',
    since: '2019年6月',
    technologies: ['java', 'lwjgl'],
  },
  {
    name: 'MetisCas',
    description: '方程式を解いてくれるツール。LaTeX記法で入力できる',
    since: '2019年6月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'PixivBrainPortingHelper',
    description:
      '大量の画像を、改造した電子書籍Brain上のMangaMeeyaCEで閲覧しやすいように変換するツール',
    since: '2019年5月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'Counter',
    description: '数を数えるためのソフト',
    since: '2019年3月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'PixivNoStamps',
    description: 'Pixivのスタンプを非表示にするFirefox機能拡張',
    since: '2019年2月',
    technologies: ['fxaddon'],
    releases: [
      {
        date: '2019/02/08',
        version: 'Version 1.0',
      },
      {
        date: '2019/02/08',
        version: 'Version 0.1',
      },
    ],
  },
  {
    name: 'AAMakeHelper',
    description: 'アスキーアートの制作を支援するツール',
    since: '2019年5月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'HundredsOfOres',
    description: 'MinecraftのMOD',
    since: '2018年9月',
    until: '2018年10月',
    repo: 'https://github.com/yuma140902/HundredsOfOres',
    technologies: ['java', 'minecraft'],
  },
  {
    name: 'MiningMod',
    description: 'MinecraftのMOD。おそらく一番最初に作ったもの。',
    since: '2018年7月',
    until: '2018年10月',
    repo: 'https://github.com/yuma140902/MiningMod',
    technologies: ['java', 'minecraft'],
    releases: [
      {
        date: '2018/10/07',
        version: 'v1.1.4',
      },
      {
        date: '2018/09/29',
        version: 'v1.1.3',
      },
      {
        date: '2018/09/16',
        version: 'v1.1.2',
      },
      {
        date: '2018/08/21',
        version: 'v1.2.1',
      },
      {
        date: '2018/08/20',
        version: 'v1.2.0',
      },
      {
        date: '2018/08/18',
        version: 'v1.1.1',
      },
      {
        date: '2018/08/18',
        version: 'v1.1.0',
      },
      {
        date: '2018/08/17',
        version: 'v1.0.2',
      },
      {
        date: '2018/08/17',
        version: 'v1.0.1',
      },
      {
        date: '2018/08/17',
        version: 'v1.0.0',
      },
    ],
  },
  {
    name: 'CaeserCipher',
    description: 'シーザー暗号',
    since: '2018年7月',
    technologies: ['objectivec'],
  },
  {
    name: 'SearchStation4',
    description: '横断検索ができるソフト',
    since: '2018年6月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'CC',
    description: 'スタックベースの独自言語を採用した計算機',
    since: '2018年1月',
    until: '2018年2月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'OXGame',
    description: '3目ならべ',
    since: '2017年11月',
    until: '2017年12月',
    technologies: ['java'],
  },
  {
    name: 'HealthyNotification',
    description:
      'ユーザーの健康を気遣い、30秒ごとに瞬きをするように通知するネタソフト(ドライアイ防止)',
    since: '2017年10月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'Winup',
    description: 'dotup.org用のダウンローダ',
    since: '2017年7月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'CmdLauncher',
    description: 'キーボードで操作できるランチャー',
    since: '2017年6月',
    until: '2017年7月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: '『リスを実装する』',
    description:
      '円城塔の「リスを実装する」というSF小説に登場する架空のプログラムを再現したもの',
    since: '2017年7月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'a_caving_game',
    description: '壁にぶつかると死ぬゲーム',
    since: '2017年5月',
    until: '2018年3月',
    technologies: ['hsp'],
  },
  {
    name: '英読郎',
    description: '英文を色分けすると速く読めると聞いたので作った',
    since: '2017年4月',
    until: '2017年5月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'KeyLaunch',
    description: 'キーボードで操作できるランチャー',
    since: '2017年3月',
    until: '2017年6月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'FileCombine',
    description: 'ファイルを連結するソフト',
    since: '2017年3月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'hyakunin_isshu',
    description: '百人一首を覚えるアプリ',
    since: '2017年1月',
    technologies: ['js'],
  },
  {
    name: 'CountDown',
    description: 'デスクトップに常駐し、指定された日時までの残り時間を表示する',
    since: '2016年12月',
    until: '2017年2月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'CalcPostfixNotation',
    description: '逆ポーランド記法の計算機',
    since: '2016年12月',
    until: '2017年2月',
    technologies: ['csharp'],
  },
  {
    name: 'RandamPersonalInfo',
    description: '人間の名前をランダムに生成するツール',
    since: '2016年12月',
    technologies: ['csharp'],
  },
  {
    name: 'BinTree',
    description: '二分木',
    since: '2016年12月',
    technologies: ['cpp'],
  },
  {
    name: 'Fract',
    description: '分数ライブラリ',
    since: '2016年11月',
    technologies: ['csharp'],
  },
  {
    name: 'WikipediaViewer2',
    description: 'Wikipediaを閲覧するためのソフト',
    since: '2016年7月',
    until: '2016年11月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'run',
    description: 'ランチャー',
    since: '2016年10月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'RSS',
    description: 'デスクトップに常駐するタイプのRSSリーダー',
    since: '2016年10月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'MyWidgets',
    description: 'プラグイン機構を使って拡張できるソフト',
    since: '2016年10月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'SearchStation3',
    description: '横断検索ができるソフト',
    since: '2016年9月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'MyUtils3',
    description: ' 小物のプログラムシリーズ',
    since: '2016年8月',
    until: '2017年1月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'Kundoku',
    description: '漢文と返り点を与えると漢文を書き下してくれるツール',
    since: '2016年8月',
    technologies: ['csharp'],
  },
  {
    name: 'ImgDown',
    description:
      '指定したサイトから指定したルールに従って画像を一括ダウンロードするソフト',
    since: '2016年6月',
    until: '2016年8月',
    technologies: ['csharp'],
  },
  {
    name: 'MyPassManageC',
    description: 'パスワードマネージャもどき',
    since: '2016年3月',
    until: '2016年8月',
    technologies: ['csharp'],
  },
  {
    name: 'WebTop',
    description: 'ブラウザのスタートページ用のページ',
    since: '2016年2月',
    until: '2017年2月',
    technologies: ['js'],
  },
  {
    name: 'SearchStation2',
    description: '横断検索ができるソフト',
    since: '2016年3月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'SearchHub',
    description: '横断検索ができるソフト',
    since: '2016年2月',
    until: '2016年3月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'loginManager.app',
    description: 'パソコンが起動した時間を記録するMac OSXのアプリ',
    since: '2016年3月',
    technologies: ['applescript'],
  },
  {
    name: 'loginmanager',
    description: 'パソコンが起動した時間を記録する',
    since: '2016年2月',
    technologies: ['nadeshiko'],
  },
  {
    name: 'MyUtils1, 2',
    description: 'ランチャー',
    since: '2016年2月',
    until: '2016年8月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'book search',
    description: '蔵書を検索する',
    since: '2015年8月',
    until: '2016年5月',
    technologies: ['js'],
  },
];

export const scrap_projects: Project[] = [
  {
    name: 'WatchDog',
    description: '絶対に終了しないプロセスを作りたかった',
    since: '2023年3月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'sort_visualizer',
    description: ' GTKでソートビジュアライザを作りたかった',
    since: '2022年12月',
    technologies: ['gtk'],
  },
  {
    name: 't-prog',
    description: 'Rustで型レベルプログラミングをしたかった',
    since: '2022年9月',
    technologies: ['rust'],
  },
  {
    name: 's4installer',
    description: 'dotfilesをインストールするツールを作りたかった',
    since: '2022年2月',
    technologies: ['rust'],
  },
  {
    name: 'more_path_types',
    description:
      '相対パス・絶対パスを型レベルで表現するライブラリを作りたかった',
    since: '2022年2月',
    technologies: ['rust'],
  },
  {
    name: 'HideSideBarWhenNotMaximized',
    description:
      'Firefoxで、タブが1つだけのときサイドバーを非表示にする機能拡張を作りたかった',
    since: '2022年1月',
    technologies: ['js', 'fxaddon'],
  },
  {
    name: 'core-rutils',
    description: '',
    since: '2022年1月',
    technologies: ['rust'],
  },
  {
    name: 'Words',
    description: '',
    since: '2021年12月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'banishment',
    description: '',
    since: '2021年12月',
    technologies: ['pwsh'],
  },
  {
    name: 'rasm',
    description: '',
    since: '2021年12月',
    technologies: ['rust'],
  },
  {
    name: 'pear-rs',
    description: '',
    since: '2021年11月',
    technologies: ['rust'],
  },
  {
    name: 'ReverieEngine-WebGL',
    description: 'ReverieEngineをWebGLで動くようにしたかった',
    since: '2021年10月',
    repo: 'https://github.com/yuma140902/ReverieEngine-WebGL',
    technologies: ['rust', 'webgl', 'wasm'],
  },
  {
    name: 'ReverieIllustrations/ReverieManager',
    description: '画像管理ソフトを作りたかった',
    since: '2021年6月',
    until: '2021年9月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'ReverieIllustrations/reverie-manager',
    description: '画像管理ソフトを作りたかった',
    since: '2021年5月',
    until: '2021年6月',
    technologies: ['electron'],
  },
  {
    name: 'SuperNova',
    description: '',
    since: '2021年5月',
    technologies: ['rust'],
  },
  {
    name: 'silent_commander',
    description: '完全に透明なランチャーを作りたかった',
    since: '2021年5月',
    technologies: ['rust'],
  },
  {
    name: 'Star',
    description: '',
    since: '2021年4月',
    technologies: ['java', 'minecraft'],
  },
  {
    name: 'ReverieViewer',
    description: ' 画像ビューアを作りたかった',
    since: '2021年2月',
    technologies: ['electron'],
  },
  {
    name: 'AviUtlMgr',
    description: '環境を切り替えられるAviUtlのランチャーを作りたかった',
    since: '2020年10月',
    technologies: ['hsp'],
  },
  {
    name: 'MCLauncherWPF',
    description: 'Minecraftのランチャーが作りたかった',
    since: '2020年10月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'VideoTortoise',
    description: '動画管理ソフトを作りたかった',
    since: '2020年7月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'StartProcessSuspended',
    description: '',
    since: '2020年5月',
    technologies: ['cpp'],
  },
  {
    name: 'snake_game',
    description: 'Pistonを使ってゲームを作りたかった',
    since: '2020年4月',
    technologies: ['rust', 'piston'],
  },
  {
    name: 'getninst',
    description: '',
    since: '2020年4月',
    technologies: ['rust'],
  },
  {
    name: 'zombieproc',
    description: '',
    since: '2020年4月',
    technologies: ['rust'],
  },
  {
    name: 'emeth',
    description: '',
    since: '2019年12月',
    technologies: ['java'],
  },
  {
    name: 'nabla',
    description:
      '[ナブラ演算子ゲーム](https://nablagame.com/)が遊べるサイトを作りたかった',
    since: '2019年9月',
    technologies: ['angular'],
  },
  {
    name: 's4pear',
    description: '',
    since: '2019年8月',
    technologies: ['java'],
  },
  {
    name: 'youtube_download_button',
    description:
      'Youtubeの再生ページにダウンロードボタンを表示するFirefox機能拡張を作りたかった',
    since: '2019年7月',
    until: '2019年8月',
    technologies: ['fxaddon'],
  },
  {
    name: 'NablaCalc',
    description: '',
    since: '2019年5月',
    technologies: ['csharp'],
  },
  {
    name: 'WebCrawler',
    description: 'Webページの見た目の差分を表示するツールを作りたかった',
    since: '2019年4月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'Numeron',
    description:
      '[Numer0n](https://ja.wikipedia.org/wiki/Numer0n)のソルバーを作りたかった',
    since: '2019年3月',
    technologies: ['java'],
  },
  {
    name: 'MemoryCard',
    description: '',
    since: '2019年3月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'SimpleGenerationsBackup',
    description: '世代管理ができるバックアップソフトを作りたかった',
    since: '2019年2月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'HoldingMarkPdf',
    description: '',
    since: '2018年10月',
    until: '2018年12月',
    technologies: ['java', 'javafx'],
  },
  {
    name: 'IllustTags',
    description: '',
    since: '2018年10月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'ALife1',
    description: '人工生命がワイワイする様子を眺めるソフトを作りたかった',
    since: '2018年8月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'MusicPackageManager',
    description: '',
    since: '2018年7月',
    technologies: ['csharp'],
  },
  {
    name: 'eRename',
    description: '',
    since: '2018年6月',
    technologies: ['csharp'],
  },
  {
    name: 'Crypt',
    description: '',
    since: '2018年6月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'BooksBrowser',
    description: '蔵書管理用のソフトを作りたかった',
    since: '2018年4月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'PocketMoneySquares',
    description: '家計簿アプリを作りたかった',
    since: '2017年12月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'KsanMaker',
    description: '算数の問題を無限に生成するツールを作りたかった',
    since: '2017年12月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'WebCrawler',
    description: '',
    since: '2017年12月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'PCJammer',
    description: '→ ShutdownCountdown',
    since: '2017年10月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'MediaTortois',
    description: '画像・動画管理ソフトを作りたかった',
    since: '2017年9月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'TestChecker',
    description: '',
    since: '2017年2月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'QtCalc01',
    description: 'Qtで電卓を作りたかった',
    since: '2017年7月',
    technologies: ['cpp', 'qt'],
  },
  {
    name: 'MyWebCraler',
    description: '',
    since: '2017年7月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'CmdLauncherWin32',
    description: 'CmdLauncherをWin32 APIに移植したかった',
    since: '2017年6月',
    technologies: ['cpp', 'win32api'],
  },
  {
    name: 'JapaneseTextSearch',
    description: '日本語の全文検索がしたかった',
    since: '2017年6月',
    technologies: ['csharp'],
  },
  {
    name: 'eBookLibrary',
    description: '',
    since: '2017年6月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'mcalc',
    description: '',
    since: '2017年6月',
    technologies: ['csharp'],
  },
  {
    name: 'RealRecycleBin',
    description: 'デスクトップのゴミ箱の見た目を、中身の量によって変えたかった',
    since: '2017年6月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'DragAndSave',
    description: '',
    since: '2017年5月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'LaunchAt',
    description: 'タスクスケジューラのわかりやすいフロントエンドが作りたかった',
    since: '2017年4月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'BookReference',
    description: '',
    since: '2017年4月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'AnkiKun',
    description: '単語帳アプリを作りたかった',
    since: '2017年4月',
    technologies: ['csharp'],
  },
  {
    name: 'ClubLog',
    description: '',
    since: '2017年4月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'IMapMailCheck',
    description: 'IMAPのクライアントを作りたかった',
    since: '2017年4月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'CriptForm',
    description: '',
    since: '2017年4月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'FlexDataReader',
    description: '',
    since: '2017年3月',
    until: '2017年4月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'Tierra',
    description: 'トマス・S・レイのTierraを実装してみたかった',
    since: '2017年3月',
    technologies: ['java'],
  },
  {
    name: 'CuiOnGui',
    description: 'GUIからコマンドを実行できるソフトを作りたかった',
    since: '2017年2月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'ConsoleCsvEditor',
    description: 'CSVファイル専用のVimみたいなものを作りたかった',
    since: '2017年2月',
    technologies: ['java'],
  },
  {
    name: 'TagExplorer',
    description: '',
    since: '2017年2月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'InfoBox.mini',
    description: '',
    since: '2017年2月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'ideaTree.mini',
    description: 'コンパクトなアウトラインプロセッサを作りたかった',
    since: '2017年1月',
    until: '2017年2月',
    technologies: ['csharp', 'wpf'],
  },
  {
    name: 'SyncExplorer',
    description: '2画面のファイラーを作りたかった',
    since: '2017年1月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'LookOver',
    description: '',
    since: '2016年12月',
    until: '2017年1月',
    technologies: ['java', 'csharp', 'wpf'],
  },
  {
    name: 'TrashMeter',
    description: '',
    since: '2017年5月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'SShougi',
    description: '将棋ゲームが作りたかった',
    since: '2016年12月',
    technologies: ['cpp'],
  },
  {
    name: 'PCInfo',
    description: 'PCの情報を収集して表示するソフトを作りたかった',
    since: '2016年12月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'OptionSwitcher',
    description: 'コマンドライン引数のパーサーを作りたかった',
    since: '2016年12月',
    technologies: ['csharp'],
  },
  {
    name: 'Dictionary',
    description: '辞書ソフトが作りたかった',
    since: '2016年11月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'Map',
    description: 'デスクトップに常駐するタイプの地図アプリを作りたかった',
    since: '2016年10月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'run',
    description: 'Windows用に作った同名のプログラムをMac OSXに移植したかった',
    since: '2016年10月',
    technologies: ['swift'],
  },
  {
    name: 'MultiUIApp',
    description: '',
    since: '2016年9月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'SearchStationJS',
    description: '横断検索できるサイトを作りたかった',
    since: '2016年9月',
    technologies: ['js'],
  },
  {
    name: 'WidgetImg',
    description: '',
    since: '2019年4月',
    technologies: ['csharp', 'winforms'],
  },
  {
    name: 'Questions',
    description: '',
    since: '2016年8月',
    technologies: ['csharp', 'winforms'],
  },
];
