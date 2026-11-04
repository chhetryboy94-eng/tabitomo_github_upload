const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const clearButton = document.getElementById("clearButton");

const welcomeMessage = "こんにちは！😊<br>家族旅行について何でも聞いてください。<br>たとえば「東京から日帰りで行ける場所は？」「おすすめの温泉は？」などです。";

const answers = [
  {
    keys: ["日帰り", "近く", "東京から", "日帰り旅行"],
    reply: "東京からの日帰り旅行なら、次の場所がおすすめです！<br><br>🚃 <b>鎌倉</b>：お寺や大仏、海辺の散歩を楽しめます。<br>🌿 <b>高尾山</b>：自然の中でハイキングができます。<br>🏞️ <b>箱根</b>：芦ノ湖や美術館、温泉が人気です。<br>🌊 <b>江の島</b>：海の景色や食べ歩きを楽しめます。"
  },
  {
    keys: ["温泉", "おんせん"],
    reply: "家族旅行におすすめの温泉地です！<br><br>♨️ <b>箱根</b>：東京から行きやすく、観光も楽しめます。<br>♨️ <b>草津温泉</b>：湯畑の景色が有名です。<br>♨️ <b>熱海</b>：海の近くで温泉と食事を楽しめます。<br><br>小さなお子さんがいる場合は、家族風呂がある宿も探してみてください。"
  },
  {
    keys: ["自然", "山", "森", "きれいな景色", "景色"],
    reply: "自然やきれいな景色を楽しみたいなら、こちらがおすすめです！<br><br>🏔️ <b>富士五湖</b>：富士山と湖の景色が魅力です。<br>🌲 <b>日光</b>：滝や森、歴史的な建物があります。<br>🌿 <b>奥多摩</b>：川や山の自然を楽しめます。<br>🌸 <b>長野</b>：山や高原の景色がきれいです。"
  },
  {
    keys: ["予算", "お金", "安く", "費用", "料金"],
    reply: "旅行の予算は、行き先・人数・宿泊日数によって変わります。計画するときは、次の費用を考えましょう。<br><br>① 交通費（電車・バス・車）<br>② ホテル・宿泊費<br>③ 食事代<br>④ 観光・入場料<br>⑤ お土産代<br><br>人数、出発地、何泊するかを教えてくれれば、簡単な予算プランを一緒に考えます！"
  },
  {
    keys: ["子ども", "こども", "子供", "遊園地", "家族向け"],
    reply: "子どもと一緒の家族旅行なら、楽しめる場所がたくさんあります！<br><br>🎡 <b>東京ディズニーリゾート</b>：家族でテーマパークを楽しめます。<br>🦁 <b>上野動物園</b>：動物を見ながら過ごせます。<br>🐠 <b>新江ノ島水族館</b>：海の生き物を見られます。<br>🚂 <b>鉄道博物館（さいたま）</b>：電車が好きな子どもにおすすめです。"
  },
  {
    keys: ["海", "ビーチ", "海水浴"],
    reply: "海を楽しみたい家族には、こちらがおすすめです！<br><br>🏖️ <b>江の島・湘南</b>：海辺の散歩や食事を楽しめます。<br>🌊 <b>熱海</b>：海と温泉を一緒に楽しめます。<br>🐚 <b>三浦海岸</b>：海辺でゆっくり過ごせます。<br><br>海水浴が目的なら、季節や遊泳期間を事前に確認してください。"
  },
  {
    keys: ["大阪", "京都", "関西"],
    reply: "関西方面の家族旅行なら、次の場所がおすすめです！<br><br>⛩️ <b>京都</b>：お寺、神社、伝統的な街並みを楽しめます。<br>🐙 <b>大阪</b>：食べ歩きやテーマパークが人気です。<br>🦌 <b>奈良</b>：奈良公園で鹿と出会えます。"
  },
  {
    keys: ["北海道", "沖縄", "旅行先", "おすすめ", "どこ"],
    reply: "人気の旅行先をいくつか紹介します！<br><br>❄️ <b>北海道</b>：広い自然、おいしい食べ物、季節の景色。<br>🌺 <b>沖縄</b>：美しい海、ビーチ、独特の文化。<br>⛩️ <b>京都</b>：歴史や日本文化を楽しめます。<br>🏔️ <b>長野</b>：山や温泉、自然が魅力です。<br><br>出発する場所と旅行する季節を教えてください。もっと合う場所を紹介します！"
  },
  {
    keys: ["こんにちは", "hello", "はじめまして"],
    reply: "こんにちは！😊 家族旅行の計画をお手伝いします。行きたい場所、予算、旅行する季節などを気軽に聞いてください！"
  }
];

function addMessage(message, sender) {
  const row = document.createElement("div");
  row.className = `message-row ${sender === "user" ? "user" : ""}`;

  if (sender === "bot") {
    const avatar = document.createElement("div");
    avatar.className = "bot-avatar small";
    avatar.textContent = "✈";
    row.appendChild(avatar);
  }

  const wrap = document.createElement("div");
  wrap.className = "bubble-wrap";

  if (sender === "bot") {
    const speaker = document.createElement("span");
    speaker.className = "speaker";
    speaker.textContent = "Travel Assistant";
    wrap.appendChild(speaker);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  // ボットの回答はアプリ内に用意した固定文のみ。ユーザー入力はHTMLとして扱わない。
  if (sender === "bot") {
    bubble.innerHTML = message;
  } else {
    bubble.textContent = message;
  }

  wrap.appendChild(bubble);
  row.appendChild(wrap);
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAnswer(message) {
  const normalized = message.toLowerCase().replace(/\s/g, "");
  for (const item of answers) {
    if (item.keys.some(key => normalized.includes(key.toLowerCase()))) {
      return item.reply;
    }
  }
  return "質問ありがとうございます！😊<br>まだその質問への回答は用意されていません。次のような言葉で質問してみてください。<br><br>・おすすめの旅行先は？<br>・温泉に行きたい<br>・自然がきれいな場所は？<br>・予算はいくら必要？<br>・子どもと楽しめる場所は？<br><br>「東京から日帰りで行きたい」のように、詳しく書いても大丈夫です！";
}

function sendMessage(message) {
  const text = message.trim();
  if (!text) return;
  addMessage(text, "user");
  messageInput.value = "";
  const answer = getAnswer(text);
  window.setTimeout(() => addMessage(answer, "bot"), 250);
  messageInput.focus();
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(messageInput.value);
});

document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.question));
});

clearButton.addEventListener("click", () => {
  chatMessages.innerHTML = "";
  addMessage(welcomeMessage, "bot");
});
