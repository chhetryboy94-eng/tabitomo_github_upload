const messages = document.getElementById('messages');
const input = document.getElementById('userInput');
const form = document.getElementById('chatForm');

const answers = [
  { keys:['日帰り','東京から','近く','日帰り旅行'], text:'東京からの日帰りなら、次の場所がおすすめです。\n\n🚃 鎌倉・江の島：海や寺社、食べ歩きを楽しめます。\n🗻 河口湖：富士山の景色や湖畔散歩がおすすめです。\n🌿 高尾山：自然の中を歩きたい家族にぴったりです。\n\n何を一番楽しみたいですか？「海」「自然」「買い物」などで教えてください。' },
  { keys:['子ども','こども','子供','子ども向け'], text:'子どもと一緒なら、楽しみながら休憩もしやすい場所がいいですね。\n\n🐠 水族館：天候に左右されず楽しめます。\n🎡 遊園地：乗り物やショーを楽しめます。\n🦁 動物園：動物を見ながらゆっくり過ごせます。\n\nお子さんの年齢や、出発する場所を教えてくれたら候補を絞れます。' },
  { keys:['温泉','おんせん'], text:'温泉を楽しむ家族旅行なら、箱根・熱海・草津などが候補です。\n\n♨️ 箱根：温泉のほか、美術館や自然も楽しめます。\n🌊 熱海：海の景色と温泉を楽しめます。\n🏔️ 草津：温泉街の散策が人気です。\n\n日帰りですか？それとも1泊したいですか？' },
  { keys:['予算','安い','節約','お金'], text:'予算をおさえるなら、近場の日帰り旅行や公共交通機関で行ける場所がおすすめです。\n\n・お弁当や飲み物を持って行く\n・平日や混雑しにくい時期を選ぶ\n・早めに交通チケットを調べる\n\n家族は何人ですか？また、全体の予算はいくらくらいですか？' },
  { keys:['海','ビーチ','うみ'], text:'海を楽しみたいなら、鎌倉・江の島、逗子、熱海などが候補です。\n\n🌊 江の島：海辺の散歩や食べ歩き。\n🏖️ 逗子：海岸でゆっくり過ごせます。\n🐟 熱海：海の景色と温泉を組み合わせられます。\n\n泳ぎたいですか？それとも海を見ながら散歩したいですか？' },
  { keys:['自然','山','滝','ハイキング'], text:'自然が好きな家族には、次の場所がおすすめです。\n\n🌲 高尾山：気軽なハイキング。\n💧 奥多摩：川や滝、緑を楽しめます。\n🍁 日光：湖や滝、山の景色が魅力です。\n\n歩く時間は短めがいいですか？長く歩いても大丈夫ですか？' },
  { keys:['ホテル','宿','泊まり','一泊','1泊'], text:'宿泊先を選ぶときは、駅からの距離、家族向けの部屋、食事、温泉の有無を比べると便利です。\n\nおすすめの地域を絞るために、行きたいエリアと予算（1人あたり、または家族全体）を教えてください。' },
  { keys:['ありがとう','thanks','thank you'], text:'どういたしまして！😊 楽しい家族旅行になるようにお手伝いします。ほかにも知りたいことがあれば聞いてください。' }
];

function addMessage(text, who) {
  const node = document.createElement('div');
  node.className = 'message ' + who;
  node.textContent = text;
  messages.appendChild(node);
  messages.scrollTop = messages.scrollHeight;
}
function reply(message) {
  const normalized = message.toLowerCase();
  const found = answers.find(item => item.keys.some(key => normalized.includes(key)));
  if (found) return found.text;
  if (/(こんにちは|はじめまして|hello|hi)/i.test(normalized)) return 'こんにちは！😊 旅行先、予算、日帰り・宿泊など、気になることを教えてください。';
  return '質問ありがとうございます！今は簡単なキーワードで回答する試作版です。\n\n「日帰り」「子ども」「温泉」「予算」「海」「自然」「ホテル」などの言葉を入れて、もう一度聞いてみてください。\n\n出発する場所も書くと、相談しやすくなります。';
}
function sendMessage(value) {
  const text = value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  window.setTimeout(() => addMessage(reply(text), 'bot'), 250);
}
form.addEventListener('submit', event => { event.preventDefault(); sendMessage(input.value); });
document.querySelectorAll('.chip').forEach(button => button.addEventListener('click', () => sendMessage(button.dataset.q)));
