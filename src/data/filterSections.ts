import { FilterSection } from '../types';

export const filterSections: FilterSection[] = [
  {
    title: "モデルタイプ",
    titleEn: "Model Types",
    options: [
      { value: "checkpoint", label: "チェックポイント", labelEn: "Checkpoint" },
      { value: "embedding", label: "埋め込み", labelEn: "Embedding" },
      { value: "hypernetwork", label: "ハイパーネットワーク", labelEn: "Hypernetwork" },
      { value: "aestheticGradient", label: "審美的勾配", labelEn: "Aesthetic Gradient" },
      { value: "lora", label: "LoRA", labelEn: "LoRA" },
      { value: "lycoris", label: "LyCORIS", labelEn: "LyCORIS" },
      { value: "dora", label: "DoRA", labelEn: "DoRA" },
      { value: "controlnet", label: "ControlNet", labelEn: "ControlNet" },
      { value: "upscaler", label: "アップスケーラー", labelEn: "Upscaler" },
      { value: "motion", label: "モーション", labelEn: "Motion" },
      { value: "vae", label: "VAE", labelEn: "VAE" },
      { value: "poses", label: "ポーズ", labelEn: "Poses" },
      { value: "wildcards", label: "ワイルドカード", labelEn: "Wildcards" },
      { value: "workflows", label: "ワークフロー", labelEn: "Workflows" },
      { value: "other", label: "その他", labelEn: "Other" }
    ]
  },
  {
    title: "ベースモデル",
    titleEn: "Base Model",
    options: [
      { value: "sd1_4", label: "SD 1.4", labelEn: "SD 1.4" },
      { value: "sd1_5", label: "SD 1.5", labelEn: "SD 1.5" },
      { value: "sd1_5_lcm", label: "SD 1.5 LCM", labelEn: "SD 1.5 LCM" },
      { value: "sd1_5_hyper", label: "SD 1.5 Hyper", labelEn: "SD 1.5 Hyper" },
      { value: "sd2_0", label: "SD 2.0", labelEn: "SD 2.0" },
      { value: "sd2_1", label: "SD 2.1", labelEn: "SD 2.1" },
      { value: "sdxl1_0", label: "SDXL 1.0", labelEn: "SDXL 1.0" },
      { value: "sd3", label: "SD 3", labelEn: "SD 3" },
      { value: "sd3_5", label: "SD 3.5", labelEn: "SD 3.5" },
      { value: "pony", label: "Pony", labelEn: "Pony" },
      { value: "flux1s", label: "Flux .1 S", labelEn: "Flux .1 S" },
      { value: "flux1d", label: "Flux .1 D", labelEn: "Flux .1 D" },
      { value: "aura_flow", label: "Aura Flow", labelEn: "Aura Flow" },
      { value: "sdxl1_0_lcm", label: "SDXL 1.0 LCM", labelEn: "SDXL 1.0 LCM" },
      { value: "sdxl_turbo", label: "SDXL Turbo", labelEn: "SDXL Turbo" },
      { value: "sdxl_lightning", label: "SDXL Lightning", labelEn: "SDXL Lightning" },
      { value: "sdxl_hyper", label: "SDXL Hyper", labelEn: "SDXL Hyper" },
      { value: "stable_cascade", label: "Stable Cascade", labelEn: "Stable Cascade" },
      { value: "svd", label: "SVD", labelEn: "SVD" },
      { value: "svd_xt", label: "SVD XT", labelEn: "SVD XT" },
      { value: "playground_v2", label: "Playground V2", labelEn: "Playground V2" },
      { value: "pixart_a", label: "PixArt A", labelEn: "PixArt A" },
      { value: "pixart_s", label: "PixArt Σ", labelEn: "PixArt Σ" },
      { value: "hunyuan1", label: "Hunyuan 1", labelEn: "Hunyuan 1" },
      { value: "lumina", label: "Lumina", labelEn: "Lumina" },
      { value: "kolors", label: "Kolors", labelEn: "Kolors" },
      { value: "illustrious", label: "Illustrious", labelEn: "Illustrious" },
      { value: "other", label: "その他", labelEn: "Other" }
    ]
  },
  {
    title: "ライセンス",
    titleEn: "License",
    options: [
      { value: "creativeml", label: "CreativeML Open RAIL++-M", labelEn: "CreativeML Open RAIL++-M" },
      { value: "useWithoutCredit", label: "クレジット表記不要", labelEn: "Use without crediting" },
      { value: "sellImages", label: "生成画像の販売可能", labelEn: "Sell generated images" },
      { value: "runOnServices", label: "サービスでの実行可能", labelEn: "Run on services" },
      { value: "runOnCivitai", label: "Civitaiでの実行可能", labelEn: "Run on Civitai" },
      { value: "shareMerges", label: "マージの共有可能", labelEn: "Share merges" },
      { value: "sellMerges", label: "マージの販売可能", labelEn: "Sell merges" },
      { value: "differentPermissions", label: "異なる許可での共有可能", labelEn: "Share with different permissions" }
    ]
  },
  {
    title: "期間",
    titleEn: "Time Period",
    options: [
      { value: "day", label: "24時間", labelEn: "24 Hours" },
      { value: "week", label: "週間", labelEn: "Week" },
      { value: "month", label: "月間", labelEn: "Month" },
      { value: "year", label: "年間", labelEn: "Year" },
      { value: "allTime", label: "全期間", labelEn: "All Time" }
    ]
  },
  {
    title: "モデルの状態",
    titleEn: "Model Status",
    options: [
      { value: "earlyAccess", label: "アーリーアクセス", labelEn: "Early Access" },
      { value: "onSiteGeneration", label: "サイト上で生成可能", labelEn: "On-Site Generation" },
      { value: "madeOnSite", label: "サイト上で作成", labelEn: "Made On-Site" }
    ]
  }
];