/**
 * 小卡拉趣味记单词 - 应用逻辑
 */

// MiniMax API配置
const API_KEY = 'sk-cp-U3Mq_6zVBmDvwiV27JjZpRjjSpY-1h4LNuDwV_TEDQvWdoCY78OHSbpSeRG3Ea4bkRu6f5sou7EbldG-eb1b7zoVQl6VJMVgaiaNi7sDX93JEkePRMgNpgA';

// 状态管理
const state = {
    wordList: [],
    currentWords: [],
    currentIndex: 0,
    reviewWords: [],
    reviewIndex: 0,
    mediaRecorder: null,
    audioChunks: [],
    isRecording: false,
    sessionCorrect: 0,
    totalLearned: 0,
    isReviewMode: false
};

// 故事库
const STORIES = {
    cat: '小卡拉的邻居有一只超级可爱的小猫咪🐱，叫"毛球"。毛球最喜欢在阳光下睡觉，它的呼噜声就像小火车一样！',
    dog: '小卡拉养了一只小狗🐕，叫"旺财"。每天早上，旺财都会用尾巴摇醒小卡拉，汪汪汪地叫个不停！',
    fish: '小卡拉去了海洋馆，看到了五颜六色的小鱼🐠。有一条橙色的小鱼游得最快，它说自己是"尼莫"的好朋友！',
    rabbit: '小卡拉的奶奶养了一只小白兔🐰，耳朵长长的，眼睛红红的。它最爱吃胡萝卜！',
    bird: '窗外飞来一只小鸟🐦，它在树枝上唱着歌。小卡拉说："小鸟小鸟，早上好！"',
    apple: '小卡拉今天吃了一个红红的大苹果🍎，"咔嚓"一口，又脆又甜！苹果是红色的，像小脸蛋。',
    red: '小卡拉有一个红红的苹果🍎，咬一口，甜甜的！他把苹果涂成红色送给妈妈，妈妈好开心！',
    blue: '天空是蓝蓝的☁️，云朵是白白的。小卡拉指着天空说："天空像大海一样蓝！"',
    green: '小卡拉在院子里种了一棵小树🌱。每天浇水，小树越长越高，叶子绿绿的！',
    yellow: '小卡拉最喜欢吃香蕉🍌，香蕉是黄黄的、弯弯的，像天上的月牙！',
    one: '小卡拉有1个超级英雄玩具🧸，他每天都抱着它睡觉。他说："你是我的好朋友！"',
    two: '小卡拉有两只手👋，一只是左手，一只是右手。它们一起可以帮助我们做好多事情！',
    three: '小卡拉有3个好朋友，一起玩捉迷藏。他们数着："一、二、三！"然后就开始找人了！',
    happy: '小卡拉今天数学考了一百分🎉，他开心得眼睛都弯成了月牙！开心就是心里像吃了蜜一样甜！',
    sad: '小卡拉的风筝飞走了，他有点难过😢。不过没关系，妈妈说："我们再做一个新的！"',
    book: '小卡拉有一本绘本📖，上面画着小动物们的故事。他每天睡前都要看一本新故事！',
    ball: '小卡拉在公园里玩球⚽，"砰"一脚把球踢得好远好远，他跑着笑着！',
    car: '小卡拉有一辆红色的小汽车🚗，它可以在地上开来开去，"滴滴滴"，小汽车会按喇叭！',
    run: '运动会上，小卡拉跑得飞快🏃，"嗖"一下就冲过了终点线。他赢得了第一名！',
    jump: '小卡拉在草地上跳来跳去🦘，像小兔子一样。他跳得好高，"嘿哟嘿哟"！',
    default: '小卡拉今天学了一个新单词，他觉得好有趣！每天学一点新知识，就像每天吃一颗糖果，甜甜的、开心的！💪'
};

// 角色图片映射
const CHARACTERS = {
    greeting: '../角色设计/小卡拉_开心打招呼.jpg',
    think: '../角色设计/小卡拉_认真思考.jpg',
    happy: '../角色设计/小卡拉_得意欢呼.jpg',
    funny: '../角色设计/小卡拉_调皮鬼脸.jpg'
};

// 默认单词
const DEFAULT_WORDS = [
    {word: 'apple', translation: '苹果'},
    {word: 'cat', translation: '猫'},
    {word: 'dog', translation: '狗'},
    {word: 'red', translation: '红色'},
    {word: 'blue', translation: '蓝色'},
    {word: 'green', translation: '绿色'},
    {word: 'one', translation: '一'},
    {word: 'two', translation: '二'},
    {word: 'three', translation: '三'},
    {word: 'happy', translation: '高兴的'},
    {word: 'sad', translation: '难过的'},
    {word: 'book', translation: '书'},
    {word: 'ball', translation: '球'},
    {word: 'car', translation: '小汽车'},
    {word: 'fish', translation: '鱼'},
    {word: 'bird', translation: '鸟'},
    {word: 'run', translation: '跑'},
    {word: 'jump', translation: '跳'}
];

// 工具函数
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-message').textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function showLoading(text = '小卡拉在准备...') {
    const overlay = document.getElementById('loading-overlay');
    overlay.querySelector('.loading-text').textContent = text;
    overlay.classList.add('active');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.remove('active');
}

function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function getStory(word) {
    const key = word.toLowerCase().replace(/[^a-z]/g, '');
    return STORIES[key] || STORIES.default;
}

function updateStats() {
    const learned = JSON.parse(localStorage.getItem('kala_learned') || '[]');
    state.totalLearned = learned.length;
    document.getElementById('learned-count').textContent = state.totalLearned;
}

function saveLearnedWord(word) {
    let learned = JSON.parse(localStorage.getItem('kala_learned') || '[]');
    if (!learned.find(w => w.word === word.word)) {
        learned.push(word);
        localStorage.setItem('kala_learned', JSON.stringify(learned));
    }
}

// TTS - 使用Web Speech API
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

// ASR - 使用Web Speech API
function startASR() {
    return new Promise((resolve) => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SR();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onresult = (e) => resolve(e.results[0][0].transcript.toLowerCase());
            recognition.onerror = () => resolve('');
            recognition.start();
            
            setTimeout(() => {
                recognition.stop();
                setTimeout(() => resolve(''), 500);
            }, 8000);
        } else {
            resolve('');
        }
    });
}

// 录音功能
async function startRecording(btn, textEl, iconEl) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        state.mediaRecorder = new MediaRecorder(stream);
        state.audioChunks = [];
        
        state.mediaRecorder.ondataavailable = e => state.audioChunks.push(e.data);
        state.mediaRecorder.onstop = async () => {
            stream.getTracks().forEach(t => t.stop());
            const blob = new Blob(state.audioChunks, { type: 'audio/webm' });
            showLoading('正在识别...');
            const text = await startASR();
            hideLoading();
            checkResult(text, btn, textEl, iconEl);
        };
        
        state.mediaRecorder.start();
        state.isRecording = true;
        btn.classList.add('recording');
        textEl.textContent = '正在录音...';
        iconEl.textContent = '⏹️';
        
        setTimeout(() => { if (state.isRecording) stopRecording(btn, textEl, iconEl); }, 10000);
    } catch (e) {
        showToast('请允许使用麦克风', 'error');
    }
}

function stopRecording(btn, textEl, iconEl) {
    if (state.mediaRecorder && state.isRecording) {
        state.mediaRecorder.stop();
        state.isRecording = false;
        btn.classList.remove('recording');
        textEl.textContent = '跟读录音';
        iconEl.textContent = '🎤';
    }
}

function checkResult(text, btn, textEl, iconEl) {
    const word = state.isReviewMode ? state.reviewWords[state.reviewIndex] : state.currentWords[state.currentIndex];
    const target = word.word.toLowerCase().replace(/[^a-z]/g, '');
    const correct = text.includes(target) || (text && target && levenshtein(text, target) <= 2);
    
    const feedback = document.getElementById(state.isReviewMode ? 'review-feedback-area' : 'feedback-area');
    const charImg = document.querySelector(state.isReviewMode ? '#review-character' : '#learn-character');
    
    if (correct) {
        state.sessionCorrect++;
        if (!state.isReviewMode) saveLearnedWord(word);
        feedback.innerHTML = '<div class="feedback-item feedback-success"><span class="feedback-icon">🎉</span><span>太棒啦！你真厉害！</span></div>';
        charImg.src = CHARACTERS.happy;
        setTimeout(() => state.isReviewMode ? nextReview() : nextWord(), 2000);
    } else {
        feedback.innerHTML = `<div class="feedback-item feedback-error"><span class="feedback-icon">🤔</span><span>再试一次！你说的是：${text || '（没听清）'}</span></div>`;
        charImg.src = CHARACTERS.think;
        showToast('没关系，再试试！', 'error');
    }
}

function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array(m+1).fill().map(() => Array(n+1).fill(0));
    for(let i=0;i<=m;i++) dp[i][0]=i;
    for(let j=0;j<=n;j++) dp[0][j]=j;
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
        dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1;
    return dp[m][n];
}

// 学习流程
async function loadWords() {
    try {
        showLoading('小卡拉在加载词库...');
        const res = await fetch('../词库/二年级词库.json');
        if (res.ok) {
            const data = await res.json();
            state.wordList = [];
            data.books.forEach(book => book.units.forEach(unit => state.wordList.push(...unit.words)));
        }
        hideLoading();
        if (!state.wordList.length) state.wordList = DEFAULT_WORDS;
    } catch (e) {
        hideLoading();
        state.wordList = DEFAULT_WORDS;
    }
}

function startLearning() {
    state.isReviewMode = false;
    state.currentIndex = 0;
    state.sessionCorrect = 0;
    state.currentWords = [...state.wordList].sort(() => Math.random() - 0.5).slice(0, 10);
    switchPage('learn-page');
    updateLearnUI();
}

function startReview() {
    const learned = JSON.parse(localStorage.getItem('kala_learned') || '[]');
    if (!learned.length) { showToast('还没有已学单词，快去学习吧！', 'error'); return; }
    state.isReviewMode = true;
    state.reviewIndex = 0;
    state.sessionCorrect = 0;
    state.reviewWords = [...learned].sort(() => Math.random() - 0.5).slice(0, 5);
    switchPage('review-page');
    updateReviewUI();
}

function updateLearnUI() {
    if (state.currentIndex >= state.currentWords.length) return showComplete();
    const w = state.currentWords[state.currentIndex];
    document.getElementById('word-english').textContent = w.word;
    document.getElementById('word-chinese').textContent = w.translation;
    document.getElementById('story-content').textContent = getStory(w.word);
    document.getElementById('progress-fill').style.width = `${((state.currentIndex+1)/state.currentWords.length)*100}%`;
    document.getElementById('progress-label').textContent = `${state.currentIndex+1}/${state.currentWords.length}`;
    document.getElementById('feedback-area').innerHTML = '';
    document.getElementById('learn-character').src = CHARACTERS.think;
}

function updateReviewUI() {
    if (state.reviewIndex >= state.reviewWords.length) return showComplete();
    const w = state.reviewWords[state.reviewIndex];
    document.getElementById('review-word-english').textContent = w.word;
    document.getElementById('review-word-chinese').textContent = w.translation;
    document.getElementById('review-progress-fill').style.width = `${((state.reviewIndex+1)/state.reviewWords.length)*100}%`;
    document.getElementById('review-progress-label').textContent = `${state.reviewIndex+1}/${state.reviewWords.length}`;
    document.getElementById('review-feedback-area').innerHTML = '';
    document.getElementById('review-character').src = CHARACTERS.funny;
}

function nextWord() { state.currentIndex++; updateLearnUI(); }
function nextReview() { state.reviewIndex++; updateReviewUI(); }

function showComplete() {
    document.getElementById('stat-correct').textContent = state.sessionCorrect;
    document.getElementById('stat-learned').textContent = state.totalLearned;
    document.getElementById('complete-message').textContent = state.isReviewMode ? '复习完成！' : '学习完成！';
    document.getElementById('complete-character').src = CHARACTERS.happy;
    switchPage('complete-page');
    updateStats();
}

// 事件绑定
document.addEventListener('DOMContentLoaded', async () => {
    await loadWords();
    updateStats();
    
    // 首页
    document.getElementById('start-btn').onclick = () => { showLoading(); setTimeout(() => { hideLoading(); startLearning(); }, 300); };
    document.getElementById('review-btn').onclick = startReview;
    document.getElementById('back-btn').onclick = () => switchPage('home-page');
    document.getElementById('review-back-btn').onclick = () => switchPage('home-page');
    document.getElementById('continue-btn').onclick = startLearning;
    document.getElementById('home-btn').onclick = () => switchPage('home-page');
    
    // 学习页-播放
    document.getElementById('play-sound-btn').onclick = async function() {
        this.classList.add('playing');
        const w = state.currentWords[state.currentIndex];
        await playTTS(w.word);
        setTimeout(() => playTTS(w.translation, 'zh-CN'), 1000);
        setTimeout(() => this.classList.remove('playing'), 2500);
    };
    
    // 学习页-录音
    document.getElementById('record-btn').onclick = function() {
        const icon = document.getElementById('record-icon');
        const text = document.getElementById('record-text');
        state.isRecording ? stopRecording(this, text, icon) : startRecording(this, text, icon);
    };
    
    // 复习页-播放
    document.getElementById('review-play-btn').onclick = async function() {
        this.classList.add('playing');
        const w = state.reviewWords[state.reviewIndex];
        await playTTS(w.word);
        setTimeout(() => playTTS(w.translation, 'zh-CN'), 1000);
        setTimeout(() => this.classList.remove('playing'), 2500);
    };
    
    // 复习页-录音
    document.getElementById('review-record-btn').onclick = function() {
        const icon = document.getElementById('review-record-icon');
        const text = document.getElementById('review-record-text');
        state.isRecording ? stopRecording(this, text, icon) : startRecording(this, text, icon);
    };
    
    console.log('🎉 小卡拉趣味记单词已就绪！');
});
