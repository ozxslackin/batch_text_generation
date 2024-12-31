// 定义角色和关系数据
const characters = {
    film: '一名女演员，跟namtan一起进行同性营业',
    namtan: '一名女演员，跟film一起进行同性营业',
    may: 'film在pluto中扮演的角色，和aioon, oom有感情纠葛，最终和aioon在一起',
    aioon: 'namtan扮演的双胞胎之一，和may是一对曲折的情侣',
    oom: 'namtan扮演的双胞胎之一，和may曾经有过恋情',
    pluto: '是电视剧的名字，里面讲述了may, aioon, oom的感情纠葛'
};

// 定义角色组合及其夸赞方向
const characterCombinations = [
    {
        chars: ['film', 'namtan'],
        praiseDirections: [
            '姐妹情深', '默契十足', '舞台表现力', '互动甜蜜', '粉丝福利',
            '营业效果', '台下互动', '综艺表现', '共同成长', '舞台魅力',
            '粉丝应援', '社交媒体互动', '采访表现', '团队合作', '个人魅力'
        ]
    },
    {
        chars: ['may', 'aioon'],
        praiseDirections: [
            '感情真挚', '演技精湛', '化学反应', '剧情发展', '角色塑造',
            '感情表达', '戏剧冲突', '人物成长', '感情升温', '默契配合',
            '剧中互动', '感情基调', '人物张力', '剧情推进', '角色魅力'
        ]
    },
    {
        chars: ['may', 'oom'],
        praiseDirections: [
            '过往情感', '纠葛演绎', '人物刻画', '情感张力', '角色突破',
            '感情基础', '人物层次', '戏剧冲突', '情感表达', '人物塑造'
        ]
    },
    {
        chars: ['aioon', 'oom'],
        praiseDirections: [
            '双胞胎演技', '角色差异', '人物特点', '姐妹关系', '性格对比',
            '双重身份', '人物魅力', '角色张力', '表演层次', '人物刻画'
        ]
    },
    {
        chars: ['film', 'may'],
        praiseDirections: [
            '角色诠释', '演技突破', '人物塑造', '戏剧表现', '角色魅力',
            '表演层次', '人物成长', '剧中表现', '演技张力'
        ]
    },
    {
        chars: ['namtan', 'aioon', 'oom'],
        praiseDirections: [
            '三重演绎', '角色转换', '表演层次', '人物刻画', '演技张力',
            '双重身份', '角色突破', '表演魅力', '戏剧冲突'
        ]
    },
    {
        chars: ['may', 'aioon', 'oom'],
        praiseDirections: [
            '三角关系', '情感纠葛', '剧情发展', '人物互动', '感情线索',
            '戏剧冲突', '角色张力', '感情表达', '剧情推进'
        ]
    }
];

// 全局变量
let isGenerating = false;
let totalGenerated = 0;
let targetCount = 0;
let generatedTexts = new Set();

// 工具函数：随机选择数组中的一个元素
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 生成单个prompt的函数
function generatePrompt(language) {
    const combination = randomChoice(characterCombinations);
    const direction = randomChoice(combination.praiseDirections);

    // 获取角色描述
    const characterDescriptions = combination.chars.map(char => `${char}（${characters[char]}）`).join('、');

    const prompts = {
        chinese: `角色说明：${characterDescriptions}

请以${combination.chars.join('和')}为主题，从${direction}的角度，生成100条不同的夸赞文本。每条文本要求：
1. 字数在50-90之间
2. 内容要积极正面
3. 表达要自然流畅
4. 每条文本用两个换行符分隔
5. 不要带序号或标点符号
6. 直接输出文本内容，不要有任何其他说明
7. 使用中文输出`,
        english: `Character descriptions: ${characterDescriptions}

Generate 100 different praise texts about ${combination.chars.join(' and ')} focusing on ${direction}. Requirements:
1. 50-90 characters each
2. Positive content
3. Natural flow
4. Separate each text with two newlines
5. No numbers or punctuation marks
6. Output text content directly without any explanations
7. Use English output`,
        thai: `สำอธิบายตัวละคร: ${characterDescriptions}

สร้างข้อความชื่นชม 100 ข้อความที่แตกต่างกันเกี่ยวกับ ${combination.chars.join(' และ ')} เน้นที่ ${direction} โดยมีข้อกำหนด:
1. 50-90 ตัวอักษรต่อข้อความ
2. เนื้อหาเชิงบวก
3. การไหลเวียนเป็นธรรมชาติ
4. แยกแต่ละข้อความด้วยการขึ้นบรรทัดใหม่สองครั้ง
5. ไม่มีตัวเลขหรือเครื่องหมายวรรคตอน
6. แสดงเนื้อหาข้อความโดยตรงโดยไม่มีคำอธิบายใดๆ
7. ใช้ภาษาไทยออก`,
        vietnamese: `Mô tả nhân vật: ${characterDescriptions}

Tạo 100 văn bản khen ngợi khác nhau về ${combination.chars.join(' và ')} tập trung vào ${direction}. Yêu cầu:
1. 50-90 ký tự mỗi văn bản
2. Nội dung tích cực
3. Luân chuyển tự nhiên
4. Phân tách mỗi văn bản bằng hai dòng mới
5. Không có số hoặc dấu chấm câu
6. Xuất nội dung văn bản trực tiếp không có bất kỳ giải thích nào
7. Sử dụng tiếng Việt`,
        korean: `캐릭터 설명: ${characterDescriptions}

${combination.chars.join('와 ')}에 대해 ${direction}에 초점을 맞춘 100개의 다른 칭찬 텍스트를 생성하세요. 요구사항:
1. 각각 50-90자
2. 긍정적인 내용
3. 자연스러운 흐름
4. 각 텍스트를 두 개의 새 줄로 구분
5. 숫자나 문장 부호 없음
6. 설명 없이 텍스트 내용을 직접 출력
7. 한국어 출력`,
    };

    const selectedPrompt = prompts[language] || prompts.chinese;
    console.log('生成的Prompt:', selectedPrompt);
    return selectedPrompt;
}

// 处理文本分割
function processGeneratedText(text) {
    // 首先尝试用双换行符分割
    let texts = text.split('\n\n');

    // 如果分割后只有一个元素，说明可能是使用单换行符
    if (texts.length <= 1) {
        texts = text.split('\n');
    }

    // 移除空文本和处理不完整的最后一行
    texts = texts
        .map(t => t.trim())
        .filter(t => t.length > 0)
        .filter((t, index, array) => {
            // 如果是最后一行，检查是否完整
            if (index === array.length - 1) {
                // 如果最后一行明显不完整（比如以逗号或"和"结尾），则移除
                const lastChar = t[t.length - 1];
                const isIncomplete = t.endsWith('和') || t.endsWith('與') || t.endsWith('and') ||
                                   t.endsWith('และ') || t.endsWith('và') || t.endsWith('와') ||
                                   ['，', ',', '、', '；', ';'].includes(lastChar);
                if (isIncomplete) {
                    console.log('检测到不完整的最后一行，已移除:', t);
                    return false;
                }
            }
            return true;
        });

    // 检查文本去重
    const processedTexts = texts
        .filter(t => {
            // 记录重复的文本
            const isDuplicate = generatedTexts.has(t);
            if (isDuplicate) {
                console.log('发现重复文本:', t);
            }
            return !isDuplicate;
        });

    // 详细的日志记录
    console.log('原始文本数量:', texts.length);
    console.log('处理后的文本数量:', processedTexts.length);

    // 记录被过滤掉的文本数量
    const filteredCount = texts.length - processedTexts.length;
    if (filteredCount > 0) {
        console.log(`被过滤掉的文本数量: ${filteredCount}`);
    }

    // 如果没有有效文本，记录警告
    if (processedTexts.length === 0) {
        console.warn('警告：没有找到符合条件的文本！');
        console.warn('原始文本:', text);
        console.warn('分割后的文本数组:', texts);
    }

    return processedTexts;
}

// 更新UI状态
function updateUI(status, count, progress) {
    document.getElementById('status').textContent = status;
    document.getElementById('currentCount').textContent = `已生成: ${count}`;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}%`;

    // 只要有生成的文本就启用下载按钮
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.disabled = generatedTexts.size === 0;
}

// 生成文本的主要函数
async function generateTexts(apiKey, apiUrl, model, language, target) {
    targetCount = target; // 修复targetCount未定义的问题
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    while (isGenerating && totalGenerated < target) {
        try {
            const prompt = generatePrompt(language);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    model: model,
                    messages: [{
                        role: 'user',
                        content: prompt
                    }],
                    temperature: 0.7,
                    max_tokens: 4080
                })
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }

            const data = await response.json();
            const newTexts = processGeneratedText(data.choices[0].message.content);

            // 记录每次生成的文本数量
            console.log(`本次生成文本数量: ${newTexts.length}`);
            console.log('新生成的文本:', newTexts);

            let addedCount = 0;
            newTexts.forEach(text => {
                if (!generatedTexts.has(text)) {
                    generatedTexts.add(text);
                    addedCount++;
                }
            });

            // 更新总数并记录
            totalGenerated += addedCount;
            console.log(`新增文本数量: ${addedCount}, 总文本数量: ${totalGenerated}, 目标数量: ${target}`);

            const progress = (totalGenerated / target) * 100;
            updateUI('正在生成...', totalGenerated, progress);

            if (totalGenerated >= target) {
                completeGeneration();
                break; // 确保达到目标后立即停止
            }

            // 添加延迟以避免API限制
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('生成过程中出错:', error);
            updateUI(`错误: ${error.message}`, totalGenerated, (totalGenerated / target) * 100);
            isGenerating = false;
            break;
        }
    }
}

// 完成生成过程
function completeGeneration() {
    isGenerating = false;
    updateUI('生成完成!', totalGenerated, 100);
    document.getElementById('generateBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}

// 获取格式化的日期时间字符串
function getFormattedDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}-${hour}${minute}${second}`;
}

// 获取语言显示名称
function getLanguageDisplayName(languageCode) {
    const languageMap = {
        'chinese': '中文',
        'english': 'English',
        'thai': 'Thai',
        'vietnamese': 'Vietnamese',
        'korean': 'Korean'
    };
    return languageMap[languageCode] || languageCode;
}

// 下载生成的文本
function downloadTexts() {
    if (generatedTexts.size === 0) {
        alert('没有可下载的文本！');
        return;
    }

    const language = document.getElementById('language').value;
    const languageName = getLanguageDisplayName(language);
    const dateTime = getFormattedDateTime();
    const fileName = `${languageName}-${generatedTexts.size}-${dateTime}.txt`;

    const blob = new Blob([Array.from(generatedTexts).join('\n\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 事件监听器设置
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('generationForm');
    const generateBtn = document.getElementById('generateBtn');
    const stopBtn = document.getElementById('stopBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const apiKey = document.getElementById('apiKey').value;
        const apiUrl = document.getElementById('apiUrl').value;
        const model = document.getElementById('model').value;
        const language = document.getElementById('language').value;
        const target = parseInt(document.getElementById('target').value) * 100;

        if (!apiKey || !apiUrl || !model || !target) {
            alert('请填写所有必要信息');
            return;
        }

        isGenerating = true;
        totalGenerated = 0;
        generatedTexts.clear();

        generateBtn.disabled = true;
        stopBtn.disabled = false;

        updateUI('开始生成...', 0, 0);

        generateTexts(apiKey, apiUrl, model, language, target);
    });

    stopBtn.addEventListener('click', () => {
        isGenerating = false;
        stopBtn.disabled = true;
        generateBtn.disabled = false;
        updateUI('已停止生成', totalGenerated, (totalGenerated / targetCount) * 100);
    });

    downloadBtn.addEventListener('click', downloadTexts);
});