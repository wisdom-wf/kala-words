# 小卡拉趣味记单词

🎉 面向7-8岁小学生的趣味英语学习H5应用

## 目录说明

```
./趣味记单词/
├── app/                    # 应用代码目录
│   ├── index.html         # 主页面
│   ├── styles.css         # 样式文件
│   ├── app.js             # 应用逻辑
│   └── README.md          # 本文件
├── 词库/                   # 单词库
│   └── 二年级词库.json    # 人教版二年级英语词库
└── 角色设计/               # 小卡拉角色图片
    ├── 小卡拉_开心打招呼.jpg
    ├── 小卡拉_得意欢呼.jpg
    ├── 小卡拉_认真思考.jpg
    └── 小卡拉_调皮鬼脸.jpg
```

## 功能特性

- ✅ 首页展示小卡拉形象，显示学习进度
- ✅ 单词学习：英文+中文+趣味故事
- ✅ 语音播放：TTS发音
- ✅ 跟读录音：ASR语音识别
- ✅ 智能评测：判断跟读正确与否
- ✅ 即时反馈：答对欢呼/答错鼓励再试
- ✅ 复习模式：复习已学单词
- ✅ 进度展示：学习统计

## 本地运行

### 方式一：直接打开（推荐）

1. 直接双击 `index.html` 文件在浏览器中打开

### 方式二：使用本地服务器

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```

然后访问 http://localhost:8080

### 方式三：VS Code Live Server

使用 VS Code 的 Live Server 插件，右键点击 `index.html` → "Open with Live Server"

## 部署上线

### 静态托管平台（免费）

1. **Vercel**
   ```bash
   npx vercel
   ```

2. **Netlify**
   ```bash
   npx netlify deploy
   ```

3. **GitHub Pages**
   - 创建仓库，上传代码
   - Settings → Pages → 选择 main branch

4. **阿里云/腾讯云 OSS**
   - 上传整个 `app` 目录
   - 设置静态网站托管

### 部署结构

确保部署时保持目录结构不变：
```
your-domain/
├── index.html
├── styles.css
├── app.js
├── 词库/
│   └── 二年级词库.json
└── 角色设计/
    └── *.jpg
```

## MiniMax API 配置

### 当前状态

应用默认使用浏览器内置的 **Web Speech API**（TTS+ASR），无需额外配置即可使用。

### MiniMax API 接入（可选）

如需使用 MiniMax API 获取更好的语音效果，按以下步骤操作：

1. **获取 API Key**
   - 注册 MiniMax API：https://platform.minimaxi.com/
   - 创建应用获取 API Key

2. **TTS 语音合成**
   ```javascript
   // 在 app.js 中配置
   const API_KEY = 'your-api-key';
   const GROUP_ID = 'your-group-id';
   
   async function textToSpeech(text) {
       const response = await fetch(`https://api.minimax.chat/v1/t2a_v2?GroupId=${GROUP_ID}`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${API_KEY}`
           },
           body: JSON.stringify({
               model: 'speech-02-hd',
               text: text,
               stream: false,
               voice_setting: {
                   voice_id: 'male-qn-qingse',
                   speed: 1.0
               }
           })
       });
       // 处理音频响应...
   }
   ```

3. **ASR 语音识别**
   ```javascript
   async function speechToText(audioBlob) {
       // 转换音频为 base64
       const base64 = await blobToBase64(audioBlob);
       
       const response = await fetch(`https://api.minimax.chat/v1/asr?GroupId=${GROUP_ID}`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${API_KEY}`
           },
           body: JSON.stringify({
               model: 'semantic_asr',
               audio_file: base64
           })
       });
       // 返回识别结果...
   }
   ```

## 技术说明

### 技术栈
- HTML5 + CSS3 + JavaScript（原生）
- 无需构建工具，纯前端实现

### 浏览器兼容性
- Chrome 33+ ✅
- Safari 14.1+ ✅
- Edge 79+ ✅
- 微信内置浏览器 ✅

### 依赖特性
- Web Speech API（语音合成+识别）
- MediaRecorder API（录音功能）
- localStorage（本地存储学习进度）
- CSS3 Animations（动画效果）

## 目录结构

```
./趣味记单词/app/
├── index.html          # 主HTML文件（所有页面）
├── styles.css         # 样式表
├── app.js             # JavaScript逻辑
└── README.md           # 说明文档
```

## 使用流程

1. 打开应用 → 显示小卡拉首页
2. 点击「开始学习」→ 随机抽取10个单词
3. 学习每个单词：
   - 查看单词和故事
   - 点击「听发音」→ 播放英文+中文
   - 点击「跟读录音」→ 录音并识别
   - 正确 → 欢呼动画进入下一个
   - 错误 → 鼓励再试
4. 学习完成 → 显示统计
5. 可选「复习」已学单词

## 自定义词库

修改 `../词库/二年级词库.json` 或替换为其他 JSON 文件，格式：

```json
{
  "books": [{
    "units": [{
      "words": [
        {"word": "apple", "translation": "苹果"},
        {"word": "cat", "translation": "猫"}
      ]
    }]
  }]
}
```

## 注意事项

1. **录音权限**：首次使用需允许麦克风权限
2. **网络**：语音识别需要网络连接
3. **存储**：学习进度保存在浏览器本地

---

💪 **卡拉卡拉，故事来啦！** - 让每个单词都变成有趣的故事！
