export type ForkType = {
  name: string;
  downstream: {
    repo: string;
    branch: string;
  };
  upstream: {
    repo: string;
    branch: string;
  };
  description: string;
  change: string;
};

export const forks: ForkType[] = [
  {
    name: 'vim-vsnip',
    downstream: {
      repo: 'yuma140902/vim-vsnip',
      branch: 'master',
    },
    upstream: {
      repo: 'hrsh7th/vim-vsnip',
      branch: 'master',
    },
    description:
      "Snippet plugin for vim/nvim that supports LSP/VSCode's snippet format.",
    change: '`cmd` マッピングが無い古いバージョンの Vim で動作するようにした',
  },
  {
    name: 'ctrlp-grep',
    downstream: {
      repo: 'yuma140902/ctrlp-grep',
      branch: 'master',
    },
    upstream: {
      repo: 'ompugao/ctrlp-grep',
      branch: 'master',
    },
    description: 'grep your source code via ctrlp.vim!',
    change:
      'grep コマンドのコマンドライン引数が正しくないと思われるので変更した',
  },
  {
    name: 'nvim-dap-projects',
    downstream: {
      repo: 'yuma140902/nvim-dap-projects',
      branch: 'main',
    },
    upstream: {
      repo: 'ldelossa/nvim-dap-projects',
      branch: 'main',
    },
    description:
      'A very simple plugin which implements "per-project" nvim-dap debugger adapters and configurations.',
    change:
      'フォーク元はプロジェクト単位の設定がグローバル設定を上書きするようになっていた。これをグローバル設定に追記する形にした。',
  },
  {
    name: 'persisted.nvim',
    downstream: {
      repo: 'yuma140902/persisted.nvim',
      branch: 'main',
    },
    upstream: {
      repo: 'olimorris/persisted.nvim',
      branch: 'main',
    },
    description:
      'Simple session management for Neovim with git branching, autoloading and Telescope support',
    change:
      'フォーク元は `fnameescape` を使用しており、Windows ではセッションの削除ができないという問題があった。これを修正した。',
  },
  {
    name: 'egui_node_graph',
    downstream: {
      repo: 'yuma140902/egui_node_graph',
      branch: 'cabernet',
    },
    upstream: {
      repo: 'setzer22/egui_node_graph',
      branch: 'main',
    },
    description: 'Build your node graph applications in Rust, using egui',
    change:
      'egui のバージョンを上げた。またワークスペース構成をやめて自分のプロジェクトに導入しやすくした',
  },
  {
    name: 'neosolarized.nvim',
    downstream: {
      repo: 'yuma140902/neosolarized.nvim',
      branch: 'main',
    },
    upstream: {
      repo: 'svrana/neosolarized.nvim',
      branch: 'main',
    },
    description: 'Truecolor solarized theme for neovim in Lua using colorbuddy',
    change: '`Normal` と `NormalNC` の色を同じにした',
  },
];
