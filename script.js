const startScreen = document.getElementById("startScreen");
const puzzleScreen = document.getElementById("puzzleScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

const inputs = [
  document.getElementById("answer1"),
  document.getElementById("answer2"),
  document.getElementById("answer3")
];

// =========================
// 開始
// =========================

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  puzzleScreen.classList.remove("hidden");
});

// =========================
// 整理文字
// =========================

function normalizeText(text) {
  return text
    .trim()
    .replace(/\s+/g, "")
    .replace(/[，。！？、,.!?]/g, "");
}

// =========================
// 常見短答案白名單
// =========================

const validShortAnswers = [

  // 顏色
  "紅色",
  "橘色",
  "黃色",
  "綠色",
  "藍色",
  "紫色",
  "粉色",
  "粉紅色",
  "黑色",
  "白色",
  "灰色",
  "棕色",
  "咖啡色",

  // 眼睛
  "雙眼皮",
  "單眼皮",
  "內雙",
  "大眼睛",
  "小眼睛",
  "眼睛大",
  "眼睛小",
  "眼睛圓",
  "眼睛細長",
  "有臥蠶",
  "長睫毛",

  // 眉毛
  "濃眉",
  "細眉",
  "眉毛濃",
  "眉毛細",

  // 鼻子
  "鼻子高",
  "鼻子挺",
  "鼻子小",
  "鼻子大",
  "高鼻子",
  "挺鼻子",

  // 嘴巴 / 嘴唇
  "嘴唇薄",
  "嘴唇厚",
  "嘴巴小",
  "嘴巴大",

  // 牙齒
  "牙齒整齊",
  "牙齒白",
  "有虎牙",

  // 皮膚
  "皮膚好",
  "皮膚白",
  "皮膚偏白",
  "皮膚偏黑",
  "皮膚健康",
  "膚色白",
  "膚色偏白",
  "膚色偏黑",

  // 臉型
  "圓臉",
  "長臉",
  "瓜子臉",
  "鵝蛋臉",
  "臉小",
  "臉圓",

  // 頭髮
  "長髮",
  "短髮",
  "黑髮",
  "棕髮",
  "捲髮",
  "直髮",
  "自然捲",
  "有瀏海",
  "沒瀏海",
  "中分",
  "旁分",

  // 其他外貌
  "酒窩",
  "有酒窩",
  "戴眼鏡",
  "沒戴眼鏡",
  "戴隱形眼鏡",

  // 身高 / 身材
  "身材好",
  "身材瘦",
  "身材偏瘦",
  "身材勻稱",
  "身材高挑",
  "高挑",
  "偏瘦",
  "偏壯",
  "高個子",
  "矮個子",
  "中等身高",
  "身高差不多",

  // 感情 / 個性
  "單身",
  "沒男朋友",
  "沒女朋友",
  "沒男女朋友",
  "沒有男朋友",
  "沒有女朋友",
  "沒有男女朋友",
  "重感情",
  "專一",
  "貼心",
  "疼另一半",
  "好相處",
  "隨和",
  "脾氣好",
  "好聊天",
  "內向",
  "外向",
  "慢熟",
  "害羞",
  "健談",
  "安靜",
  "樂觀",
  "怕生",
  "愛笑",
  "潔癖",
  "愛乾淨",
  "注重整潔",

  // 生活習慣
  "飲食習慣好",
  "飲食清淡",
  "吃得健康",
  "少吃宵夜",
  "熬夜",
  "晚睡",
  "早睡",
  "早起",
  "睡懶覺",
  "穿拖鞋",
  "穿球鞋",
  "戴手錶",
  "喝咖啡",
  "喝茶",
  "喝奶茶",

  // 酒 / 菸
  "酒量好",
  "酒量差",
  "不喝酒",
  "會喝酒",
  "不抽煙",
  "不抽菸",
  "不吸煙",
  "不吸菸",

  // 身分
  "學生",
  "大學生",
  "高中生",
  "研究生",
  "資工系",
  "電機系",
  "機械系",
  "企管系",
  "理工科",
  "文組",
  "理組",

  // 興趣
  "電影",
  "看電影",
  "追劇",
  "動漫",
  "動畫",
  "漫畫",
  "小說",
  "音樂",
  "聽音樂",
  "唱歌",
  "跳舞",
  "KTV",
  "遊戲",
  "玩遊戲",
  "打遊戲",
  "手遊",
  "桌遊",
  "拍照",
  "攝影",
  "旅行",
  "逛街",
  "逛夜市",

  // 運動
  "籃球",
  "羽球",
  "排球",
  "足球",
  "桌球",
  "網球",
  "棒球",
  "游泳",
  "跑步",
  "健身",
  "散步",
  "爬山",
  "騎腳踏車",

  // 食物
  "拉麵",
  "火鍋",
  "燒肉",
  "壽司",
  "披薩",
  "炸雞",
  "薯條",
  "漢堡",
  "牛肉麵",
  "滷肉飯",
  "珍奶",
  "珍珠奶茶",
  "奶茶",
  "咖啡",
  "可樂",
  "甜食",
  "蛋糕",
  "巧克力",
  "冰淇淋",

  // 動物
  "貓派",
  "狗派",
  "喜歡貓",
  "喜歡狗",
  "養貓",
  "養狗",

  // 其他
  "怕蟑螂",
  "怕蜘蛛",
  "怕鬼",
  "怕高",
  "怕冷",
  "怕熱",
  "寫程式",
  "程式設計",
  "AI",
  "數學",
  "英文",
  "讀書"
];

// =========================
// 明顯不合理的單獨答案
// =========================

const invalidNouns = [
  "口水",
  "鼻涕",
  "痰",
  "桌子",
  "椅子",
  "鉛筆",
  "原子筆",
  "橡皮擦",
  "尺",
  "剪刀",
  "垃圾桶",
  "垃圾",
  "窗戶",
  "門",
  "牆壁",
  "地板",
  "天花板",
  "冷氣",
  "電風扇",
  "電燈",
  "衛生紙",
  "筷子",
  "湯匙",
  "叉子",
  "盤子",
  "碗",
  "杯子",
  "東西",
  "那個",
  "這個",
  "不知道",
  "隨便"
];

// =========================
// 合理共同點關鍵詞
// =========================

const meaningfulWords = [
  "喜歡",
  "愛",
  "都",
  "會",
  "有",
  "沒",
  "沒有",
  "單身",
  "是",
  "住",
  "來自",
  "吃",
  "喝",
  "看",
  "聽",
  "玩",
  "打",
  "穿",
  "戴",
  "養",
  "怕",
  "討厭",
  "想",
  "學",
  "讀",
  "常常",
  "常",
  "曾經",
  "去過",
  "做過",
  "搭過",
  "騎",
  "生日",
  "星座",
  "疼",
  "重感情",
  "專一",
  "乾淨",
  "整潔",
  "相處",
  "酒量",
  "抽煙",
  "抽菸",
  "吸煙",
  "吸菸",
  "飲食",
  "健康",

  // 外貌語意
  "皮膚",
  "膚色",
  "牙齒",
  "嘴唇",
  "嘴巴",
  "眼睛",
  "眉毛",
  "鼻子",
  "臉",
  "頭髮",
  "髮型",
  "身材",
  "體型",
  "身高"
];

// =========================
// 合理句型
// =========================

const commonPatterns = [
  /生日/,
  /上半年/,
  /下半年/,
  /星座/,

  /.+人$/,
  /住在/,
  /來自/,
  /.+系$/,

  /有.*哥哥/,
  /有.*姊姊/,
  /有.*姐姐/,
  /有.*弟弟/,
  /有.*妹妹/,
  /有.*兄弟/,
  /有.*姊妹/,

  /雙眼皮/,
  /單眼皮/,
  /內雙/,
  /長髮/,
  /短髮/,
  /戴眼鏡/,
  /瀏海/,

  /皮膚.+/,
  /膚色.+/,
  /牙齒.+/,
  /嘴唇.+/,
  /嘴巴.+/,
  /眼睛.+/,
  /眉毛.+/,
  /鼻子.+/,
  /臉.+/,
  /頭髮.+/,
  /髮型.+/,
  /身材.+/,
  /體型.+/,
  /身高.+/,

  /穿.*衣/,
  /穿.*鞋/,
  /穿.*褲/,
  /穿.*色/,

  /喜歡.+/,
  /愛.+/,
  /常看.+/,
  /常聽.+/,
  /常玩.+/,
  /常吃.+/,

  /去過.+/,
  /搭過.+/,
  /做過.+/,
  /學過.+/,
  /參加過.+/,

  /會.+/,
  /不會.+/,
  /每天.+/,
  /常常.+/,

  /沒.*朋友/,
  /沒有.*朋友/,
  /單身/,

  /酒量.+/,
  /不抽煙/,
  /不抽菸/,
  /不吸煙/,
  /不吸菸/,
  /飲食.+/,
  /疼.*另一半/,
  /愛乾淨/,
  /好相處/
];

// =========================
// 亂碼檢查
// =========================

function isNonsense(text) {
  const lower = text.toLowerCase();

  const nonsenseWords = [
    "asdf",
    "qwer",
    "qwerty",
    "zxcv",
    "aaaa",
    "bbbb",
    "cccc",
    "dddd",
    "abcde",
    "testtest"
  ];

  if (nonsenseWords.some(word => lower.includes(word))) {
    return true;
  }

  if (/^(.)\1{2,}$/.test(text)) {
    return true;
  }

  if (/^[0-9]+$/.test(text)) {
    return true;
  }

  if (!/[a-zA-Z\u4e00-\u9fff]/.test(text)) {
    return true;
  }

  return false;
}

// =========================
// 判斷是否合理
// =========================

function isValidHumanAnswer(originalText) {
  const text = normalizeText(originalText);

  if (text.length < 2 || text.length > 30) {
    return false;
  }

  if (isNonsense(text)) {
    return false;
  }

  if (invalidNouns.includes(text)) {
    return false;
  }

  if (validShortAnswers.includes(text)) {
    return true;
  }

  if (commonPatterns.some(pattern => pattern.test(text))) {
    return true;
  }

  if (meaningfulWords.some(word => text.includes(word))) {
    return true;
  }

  return false;
}

// =========================
// 送出答案
// =========================

submitBtn.addEventListener("click", checkAnswers);

inputs.forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      checkAnswers();
    }
  });
});

// =========================
// 檢查三個答案
// =========================

function checkAnswers() {
  const answers = inputs.map(input => input.value.trim());

  if (answers.some(answer => answer === "")) {
    message.innerText = "請先填寫三個共同點。";
    return;
  }

  for (let i = 0; i < answers.length; i++) {
    if (!isValidHumanAnswer(answers[i])) {
      message.innerText =
        `第 ${i + 1} 個答案有點難判斷是不是共同點，可以換個說法嗎？`;
      return;
    }
  }

  const normalizedAnswers = answers.map(answer =>
    normalizeText(answer).toLowerCase()
  );

  const uniqueAnswers = new Set(normalizedAnswers);

  if (uniqueAnswers.size < 3) {
    message.innerText = "三個共同點不能重複喔。";
    return;
  }

  message.innerText = "確認完成！";

  setTimeout(() => {
    puzzleScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
  }, 600);
}