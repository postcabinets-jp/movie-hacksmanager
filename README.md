# 動画管理マネージャー（管理者側）

社内向け動画管理プラットフォームの管理者用ダッシュボード

## 主な機能

- ユーザー管理（登録・権限設定）
- カテゴリー管理
- タグ管理
- 視聴記録管理
- システム設定
- メールテンプレート管理
- 視聴統計の分析とレポート作成

## 技術スタック

- フロントエンド
  - React 18
  - Material-UI
  - React Router
  - Axios
  - Chart.js

- バックエンド（モック）
  - Node.js
  - Express
  - json-server

## 開発環境のセットアップ

### 前提条件

- Node.js 14.x以上
- npm 6.x以上

### インストール

```bash
# adminディレクトリに移動
cd admin

# 依存パッケージのインストール
npm install

# モックサーバーの起動
cd mock
node server.js

# 別のターミナルでフロントエンドの起動
cd admin
PORT=1801 npm start
```

### デプロイ

```bash
# ビルドとデプロイ
npm run deploy
```

### アクセス

- 開発環境: http://localhost:1801
- モックAPI: http://localhost:3000
- 本番環境: https://postcabinets-jp.github.io/movie-hacksmanager/

## ディレクトリ構造

```
/admin
├── src
│   ├── components      # 再利用可能なUIコンポーネント
│   ├── containers      # ページコンテナ
│   ├── services        # API通信、認証
│   ├── hooks          # カスタムフック
│   ├── utils          # ユーティリティ関数
│   └── theme.js       # MUIテーマ設定
├── public             # 静的ファイル
└── mock               # モックサーバー
```

## 開発ガイドライン

- コンポーネントは関数コンポーネントを使用
- 状態管理はReact Hooksを使用
- API通信はAxiosを使用
- スタイリングはMaterial-UIを使用
- テストはJestを使用

## 機能詳細

### 1. ユーザー管理
- ユーザーの追加、編集、削除
- ロール管理
- アクセス権限の設定

### 2. カテゴリー管理
- カテゴリーの追加、編集、削除
- カテゴリーの並び替え

### 3. タグ管理
- タグの追加、編集、削除
- タグの色設定

### 4. 視聴記録管理
- 視聴履歴の表示
- 視聴進捗の管理
- CSVエクスポート機能

### 5. システム設定
- サイト基本設定
- 動画設定
- メール通知設定
- バックアップ設定

### 6. メールテンプレート管理
- テンプレートの追加、編集、削除
- 変数の管理
- プレビュー機能

## ライセンス

MIT
