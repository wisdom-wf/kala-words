# 小卡拉趣味记单词 - 开发文档

<div align="center">

![Platform](https://img.shields.io/badge/Platform-H5-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![CSS](https://img.shields.io/badge/CSS3-Custom%20Properties-264de4.svg)

</div>

---

## 📁 项目结构

```
app/
├── index.html      # 单文件完整版（推荐，直接打开即可运行）
├── original.html   # 原始分文件版入口
├── styles.css      # 样式文件
├── app.js          # 应用逻辑
└── README.md       # 本文档
```

## 🚀 本地开发

### 快速开始

1. **单文件版本（推荐）**
   ```bash
   # 直接打开 index.html 即可运行
   open index.html
   ```

2. **分文件版本**
   ```bash
   # 需要启动本地服务器（确保路径正确加载）
   cd app
   python -m http.server 8080
   # 访问 http://localhost:8080/original.html
   ```

### 环境要求

- 现代浏览器（Chrome 80+、Safari 14+、Firefox 75+、Edge 80+）
- 麦克风权限（用于跟读功能）
- 网络连接（加载外部资源，或使用离线版本）

## 🎨 代码结构

### 1. HTML结构 (original.html)

```html
<!-- 主要页面 -->
<div id="app">
    <div id="home-page" class="page active">...</div>      <!-- 首页 -->
    <div id="learn-page" class="page">...</div>           <!-- 学习页 -->
    <div id="review-page" class="page">...</div>          <!-- 复习页 -->
    <div id="complete-page" class="page">...</div>         <!-- 完成页 -->
</div>
```

### 2. 状态管理 (app.js)

```javascript
const state = {
    wordList: [],        // 词库列表
    currentWords: [],    // 当前学习单词
    currentIndex: 0,     // 当前索引
    reviewWords: [],     // 复习单词
    reviewIndex: 0,      // 复习索引
    mediaRecorder: null, // 录音器
    isRecording: false,  // 录音状态
    sessionCorrect: 0,   // 本次正确数
    totalLearned: 0,     // 已学总数
    isReviewMode: false   // 是否复习模式
};
```

### 3. 故事库

```javascript
const STORIES = {
    cat: '小卡拉的邻居有一只超级可爱的小猫咪...',
    dog: '小卡拉养了一只小狗...',
    apple: '小卡拉今天吃了一个红红的大苹果...',
    // ...
    default: '小卡拉今天学了一个新单词...'
};
```

### 4. 角色图片

```javascript
const CHARACTERS = {
    greeting: '../images/小卡拉_开心打招呼.jpg',
    think: '../images/小卡拉_认真思考.jpg',
    happy: '../images/小卡拉_得意欢呼.jpg',
    funny: '../images/小卡拉_调皮鬼脸.jpg'
};
```

## 🔧 核心API

### TTS - 文字转语音

```javascript
// 使用 Web Speech API
function playTTS(text, lang = 'en-US') {
    return new Promise((resolve) => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = lang === 'en-US' ? 0.85 : 0.9;
            utterance.onend = () => resolve(true);
            utterance.onerror = () => resolve(false);
            speechSynthesis.speak(utterance);
        } else {
            resolve(false);
        }
    });
}
```

### ASR - 语音识别

```javascript
// 使用 Web Speech Recognition API
function startASR() {
    return new Promise((resolve) => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SR();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.onresult = (e) => resolve(e.results[0][0].transcript.toLowerCase());
        recognition.onerror = () => resolve('');
        recognition.start();
        // 8秒超时
        setTimeout(() => { recognition.stop(); resolve(''); }, 8000);
    });
}
```

### 录音功能

```javascript
async function startRecording(btn, textEl, iconEl) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.mediaRecorder = new MediaRecorder(stream);
    state.mediaRecorder.ondataavailable = e => state.audioChunks.push(e.data);
    state.mediaRecorder.onstop = async () => {
        // 停止录音后进行语音识别
        const text = await startASR();
        checkResult(text, btn, textEl, iconEl);
    };
    state.mediaRecorder.start();
    state.isRecording = true;
    // 10秒自动停止
    setTimeout(() => { if (state.isRecording) stopRecording(btn, textEl, iconEl); }, 10000);
}
```

### 发音检查

```javascript
// 使用 Levenshtein 距离计算相似度
function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array(m+1).fill().map(() => Array(n+1).fill(0));
    for(let i=0;i<=m;i++) dp[i][0]=i;
    for(let j=0;j<=n;j++) dp[0][j]=j;
    for(let i=1;i<=m;i++) 
        for(let j=1;j<=n;j++) 
            dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1;
    return dp[m][n];
}

// 检查结果（允许最多2个字符的编辑距离）
const correct = text.includes(target) || levenshtein(text, target) <= 2;
```

## 📝 自定义词库

### 方式一：修改内置词库

编辑 `index.html` 中的 `WORD_DATA` 变量：

```javascript
var WORD_DATA = {
    "books": [{
        "semester": "上册",
        "units": [{
            "unit": 1,
            "words": [
                {"word": "apple", "translation": "苹果"},
                {"word": "cat", "translation": "猫"}
                // 添加更多单词...
            ]
        }]
    }]
};
```

### 方式二：外部JSON文件

```javascript
async function loadWords() {
    try {
        const res = await fetch('../data/words.json');
        const data = await res.json();
        state.wordList = [];
        data.books.forEach(book => 
            book.units.forEach(unit => 
                state.wordList.push(...unit.words)
            )
        );
    } catch (e) {
        state.wordList = DEFAULT_WORDS;
    }
}
```

### 词库JSON格式

```json
{
  "books": [
    {
      "semester": "上册",
      "units": [
        {
          "unit": 1,
          "title": "Unit Title",
          "words": [
            {"word": "word", "translation": "翻译", "part_of_speech": "词性"}
          ]
        }
      ]
    }
  ]
}
```

## 🎨 自定义样式

### CSS变量

```css
:root {
    --primary: #FF6B6B;          /* 主色调 */
    --secondary: #4ECDC4;        /* 辅助色 */
    --bg-main: #FFF9E6;         /* 背景色 */
    --success: #00B894;          /* 成功色 */
    --error: #D63031;            /* 错误色 */
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
    --radius-md: 20px;
}
```

### 添加新页面

1. HTML中添加页面结构
2. CSS中添加页面样式
3. JavaScript中添加页面切换逻辑

```javascript
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}
```

## 🔗 外部API集成

### MiniMax API（可选）

如需更优质的语音服务，可集成MiniMax API：

```javascript
// TTS示例
async function playMiniMaxTTS(text, lang) {
    const response = await fetch('https://api.minimax.chat/v1/t2a', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'speech-01',
            text: text,
            stream: false
        })
    });
    // 处理音频响应
}
```

## 🧪 测试

### 手动测试清单

- [ ] 首页加载正常
- [ ] 点击开始学习进入学习页
- [ ] 播放发音正常
- [ ] 录音功能正常（需麦克风权限）
- [ ] 发音识别正确
- [ ] 答对/答错反馈动画正常
- [ ] 复习功能正常
- [ ] 学习完成页正常
- [ ] LocalStorage数据持久化正常

### 浏览器兼容性

| 特性 | Chrome | Safari | Firefox | Edge |
|:---|:---:|:---:|:---:|:---:|
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| Speech Recognition | ✅ | ✅ | ❌ | ✅ |
| MediaRecorder | ✅ | ✅ | ✅ | ✅ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ |

## 📱 响应式设计

```css
@media (max-width: 480px) {
    .app-title { font-size: 1.8rem; }
    .character-img { width: 160px; height: 160px; }
    .word-card { padding: 20px 30px; }
    .action-buttons { flex-direction: column; }
}
```

## 🔒 安全注意事项

1. **不要提交敏感信息**
   - API密钥不要硬编码在代码中
   - 使用环境变量或后端代理

2. **麦克风权限**
   - 始终请求用户授权
   - 提供清晰的使用说明

3. **数据存储**
   - LocalStorage仅用于本地存储
   - 不存储敏感个人信息

## 📄 许可证

本项目采用 MIT 许可证

---

*文档最后更新: 2024*
