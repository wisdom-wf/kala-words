# 小卡拉趣味记单词

<div align="center">

![Logo](https://img.shields.io/badge/小卡拉趣味记单词-面向小学二年级儿童的趣味英语学习H5应用-FF6B6B?style=for-the-badge)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-H5-blue.svg)](https://developer.mozilla.org/)
[![Words](https://img.shields.io/badge/Words-152个核心词汇-4ECDC4.svg)](./data/words.json)

*卡拉卡拉，故事来啦！*

</div>

---

## 功能特点

- 🎮 **经验值系统**：每答对一个单词 +10 XP，积累经验升级
- 🔥 **连胜机制**：记录连续学习天数，激励持续学习
- 📖 **米小圈风格故事**：校园日常、幽默有趣的记忆技巧
- 🔊 **语音互动**：TTS发音 + ASR跟读识别
- ✨ **动画效果**：答题动画、星星特效、庆祝彩带
- 🎯 **关卡化设计**：每10个单词为一关，循序渐进

## 技术栈

- 纯前端H5（HTML + CSS + JavaScript）
- Web Speech API（语音合成与识别）
- LocalStorage（数据持久化）
- Web Audio API（音效系统）

## 目录结构

```
kala-words/
├── index.html          # 主应用入口（单文件完整版）
├── README.md           # 项目文档
├── app/                # 应用代码
│   ├── index.html      # 单文件版本入口（推荐）
│   ├── original.html   # 原始分文件版本
│   ├── styles.css      # 样式文件
│   ├── app.js          # 应用逻辑
│   └── README.md       # 开发文档
├── data/               # 数据文件
│   ├── words.json      # 二年级词库（152词）
│   └── words.md        # 词库预览
└── images/             # 角色图片
    ├── 小卡拉_开心打招呼.jpg
    ├── 小卡拉_得意欢呼.jpg
    ├── 小卡拉_认真思考.jpg
    └── 小卡拉_调皮鬼脸.jpg
```

## 快速开始

### 在线访问
👉 https://wisdom-wf.github.io/kala-words/

### 本地运行
1. 克隆仓库
```bash
git clone https://github.com/wisdom-wf/kala-words.git
```
2. 直接打开 `index.html` 或启动本地服务器
```bash
cd kala-words
python -m http.server 8080
# 然后访问 http://localhost:8080
```

## 词库说明

基于人教版PEP小学二年级英语教材整理：

| 学期 | 单元 | 词汇量 |
|:---:|:---:|:---:|
| 上册 | Unit 1-5 | 约80词 |
| 下册 | Unit 1-5 | 约70词 |

**总计：152个核心词汇**

### 词汇分类
- 🔢 数字：one, two, three... ten
- 🎨 颜色：red, blue, green, yellow...
- 🐾 动物：cat, dog, fish, rabbit...
- 🧸 玩具：toy, car, ball, plane...
- 😊 情感：happy, sad, angry, hungry...
- 🏃 动作：run, jump, swim, fly...

## 角色设计

### 小卡拉 - 8岁小学二年级男生

- **性格**：活泼、调皮、爱讲故事
- **口头禅**："卡拉卡拉，故事来啦！"
- **特点**：穿着印有26字母的彩色卫衣
- **好友**：铁头、姜小牙

### 角色表情
| 状态 | 场景 | 图片 |
|:---:|:---|:---|
| 开心打招呼 | 首页 | `小卡拉_开心打招呼.jpg` |
| 得意欢呼 | 答对/完成 | `小卡拉_得意欢呼.jpg` |
| 认真思考 | 学习中 | `小卡拉_认真思考.jpg` |
| 调皮鬼脸 | 复习模式 | `小卡拉_调皮鬼脸.jpg` |

## 开发计划

- [ ] MiniMax API集成（TTS/ASR增强）
- [ ] 更多词库支持（三年级、语法）
- [ ] 家长端管理
- [ ] 学习报告生成
- [ ] 多语言支持
- [ ] 小程序版本

## 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 开发指南

### 环境要求
- 现代浏览器（Chrome、Safari、Edge、Firefox）
- 支持麦克风权限（用于跟读功能）

### 项目结构
```
app/
├── index.html      # 单文件完整版（HTML+CSS+JS内联）
├── original.html    # 分文件版入口
├── styles.css       # 样式
├── app.js           # JavaScript逻辑
└── README.md        # 开发文档
```

详细开发文档请查看 [app/README.md](./app/README.md)

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 作者

**陕西红泥数智科技有限公司**

- 网站：https://www.hongnicloud.com
- 联系：info@hongnicloud.com

## 致谢

- 人教版PEP教材提供词汇来源
- 米小圈系列提供故事风格灵感
- 所有参与测试的小朋友们

---

<div align="center">

⭐ 如果这个项目对你有帮助，请给我们一个星标！

Made with ❤️ by 陕西红泥数智科技有限公司

</div>
