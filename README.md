# Family Travel Assistant（家族旅行相談チャットボット）

初心者向けの、ルールベースの旅行相談Webアプリです。
Python / Flask、HTML、CSS、JavaScriptで作っています。外部APIキーは不要です。

## できること
- 日本の旅行先や観光スポットの紹介
- 家族旅行、予算、季節、温泉、海、自然などの相談
- よくある質問ボタンから簡単に質問
- 自由入力でチャット

## 起動方法

### 1. ZIPを解凍
`Family_Travel_Chatbot` フォルダを開きます。

### 2. ターミナルで必要なライブラリを入れる
```bash
python -m pip install -r requirements.txt
```

### 3. アプリを起動
```bash
python app.py
```

### 4. ブラウザで開く
`http://127.0.0.1:5000` にアクセスします。

## GitHubにアップロードする場合
このフォルダ内のファイルをGitHubリポジトリにアップロードしてください。

## ファイル構成
```text
Family_Travel_Chatbot/
├── app.py
├── requirements.txt
├── README.md
├── render.yaml
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── app.js
```

## 回答の仕組み
このアプリは、入力された言葉に含まれるキーワードをJavaScriptで確認して回答を選ぶ「ルールベース方式」です。
AIやリアルタイム検索ではないため、最新の料金・営業時間・運行情報は旅行前に公式サイトで確認してください。
