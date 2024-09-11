---
layout: "../../layouts/WorkLayout.astro"
name: Reverie
---
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yuma140902/reverie/rust.yml?logo=github&label=CI)](https://github.com/yuma140902/reverie/actions/workflows/rust.yml)
[![Crates.io Version](https://img.shields.io/crates/v/reverie-engine)](https://crates.io/crates/reverie-engine)
[![docs.rs](https://img.shields.io/docsrs/reverie-engine?logo=docsdotrs)](https://docs.rs/reverie-engine/latest/reverie-engine/)

Rust 製の汎用 3D/2D ゲームエンジン。OpenGL を使っていて、Windows と Linux 上で動作する。

![ReverieEngine 製ゲームのスクリーンショット](../../images/reverie.png)

最近はレンダリング API を OpenGL から [wgpu](https://wgpu.rs/) へ切り替えようとしている。

## 関連項目

- [RustyCraft](/works/rustycraft/) と [BlockingIO](https://github.com/kcs1959/BlockingIO-client)
  - この 2 つのゲームの共通部分を取り出したものが最初期の ReverieEngine である。
- [Xanadu](/works/xanadu/)
  - ReverieEngine の内部で使う予定の [Entity Component System (ECS)](https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%B3%E3%83%86%E3%82%A3%E3%83%86%E3%82%A3%E3%83%BB%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%83%BB%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0) ライブラリ
