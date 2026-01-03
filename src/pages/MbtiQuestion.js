// Fin-MBTI 질문 페이지 - 질문별 이미지 변경
import { router } from '../router.js';
import { store, mbtiQuestions } from '../store.js';

export function renderMbtiQuestion(container, params) {
  const questionNum = parseInt(params.get('q')) || 1;
  const question = mbtiQuestions[questionNum - 1];
  const totalQuestions = mbtiQuestions.length;
  const progress = (questionNum / totalQuestions) * 100;

  if (!question) {
    router.navigate('/fin-mbti/result');
    return;
  }

  // 카테고리별 색상
  const categoryColors = {
    '투자 접근성': { bg: '#667eea', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    '판단 근거': { bg: '#00C48C', gradient: 'linear-gradient(135deg, #00C48C, #00D9A0)' },
    '리스크 감응': { bg: '#FF6B6B', gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)' },
    '전략 조정': { bg: '#F5A623', gradient: 'linear-gradient(135deg, #F5A623, #FFD93D)' },
  };

  const color = categoryColors[question.category] || categoryColors['투자 접근성'];

  container.innerHTML = `
    <div class="mbti-question-page">
      <header class="mbti-question-header">
        <button class="btn btn-icon back-btn" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="question-progress-wrap">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%; background: ${color.gradient};"></div>
          </div>
          <span class="question-count">${questionNum}/${totalQuestions}</span>
        </div>
        <div style="width: 44px;"></div>
      </header>
      
      <div class="mbti-question-content">
        <!-- 질문 영역 -->
        <div class="question-content animate-slide-up">
          <div class="question-meta">
            <span class="question-category" style="background: ${color.bg}20; color: ${color.bg};">${question.category}</span>
            <span class="question-number">Q${questionNum}</span>
          </div>
          <h2 class="question-text">${question.question}</h2>
        </div>

        <!-- 선택지 (이모지보다 위에 배치) -->
        <div class="question-options animate-slide-up">
          <button class="option-btn" id="optionA" data-type="${question.optionA.type}">
            <div class="option-indicator" style="background: ${color.gradient};">A</div>
            <span class="option-text">${question.optionA.text}</span>
          </button>

          <button class="option-btn" id="optionB" data-type="${question.optionB.type}">
            <div class="option-indicator" style="background: ${color.gradient};">B</div>
            <span class="option-text">${question.optionB.text}</span>
          </button>
        </div>

        <!-- 이모지 영역 (선택지 아래로 이동) -->
        <div class="question-visual animate-scale-in">
          <div class="visual-bg" style="background: ${color.gradient};"></div>
          <div class="visual-emoji-wrap">
            <span class="visual-emoji">${question.emoji}</span>
          </div>
          <div class="visual-particles">
            <span class="particle p1">✨</span>
            <span class="particle p2">💫</span>
            <span class="particle p3">⭐</span>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .mbti-question-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
        display: flex;
        flex-direction: column;
      }
      
      .mbti-question-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md);
        position: sticky;
        top: 0;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        z-index: 100;
      }
      
      .back-btn {
        color: var(--toss-gray-700);
      }
      
      .question-progress-wrap {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: 0 var(--spacing-md);
      }
      
      .question-progress-wrap .progress-bar {
        flex: 1;
        height: 6px;
        background: var(--toss-gray-200);
        border-radius: var(--radius-full);
        overflow: hidden;
      }
      
      .question-progress-wrap .progress-fill {
        height: 100%;
        border-radius: var(--radius-full);
        transition: width 0.3s ease;
      }
      
      .question-count {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
        font-weight: var(--font-medium);
        min-width: 45px;
        text-align: right;
      }
      
      .mbti-question-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: var(--spacing-lg);
        padding-top: 0;
      }
      
      /* 이미지 영역 (하단 배치) */
      .question-visual {
        position: relative;
        height: 150px;
        margin-top: auto;
        padding-bottom: var(--spacing-xl);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .visual-bg {
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        opacity: 0.15;
        animation: pulse-bg 2s ease-in-out infinite;
      }
      
      @keyframes pulse-bg {
        0%, 100% { transform: scale(1); opacity: 0.15; }
        50% { transform: scale(1.1); opacity: 0.25; }
      }
      
      .visual-emoji-wrap {
        position: relative;
        width: 90px;
        height: 90px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        animation: float-emoji 3s ease-in-out infinite;
      }
      
      @keyframes float-emoji {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .visual-emoji {
        font-size: 48px;
      }
      
      .visual-particles {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      
      .particle {
        position: absolute;
        font-size: 20px;
        animation: float-particle 3s ease-in-out infinite;
      }
      
      .p1 { top: 20%; left: 15%; animation-delay: 0s; }
      .p2 { top: 30%; right: 15%; animation-delay: 0.5s; }
      .p3 { bottom: 25%; left: 25%; animation-delay: 1s; }
      
      @keyframes float-particle {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-15px) rotate(10deg); opacity: 1; }
      }
      
      /* 질문 영역 */
      .question-content {
        text-align: center;
        margin-bottom: var(--spacing-xl);
      }
      
      .question-meta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
      }
      
      .question-category {
        padding: 4px 12px;
        border-radius: var(--radius-full);
        font-size: var(--font-xs);
        font-weight: var(--font-semibold);
      }
      
      .question-number {
        font-size: var(--font-sm);
        color: var(--toss-gray-400);
        font-weight: var(--font-medium);
      }
      
      .question-text {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
        line-height: 1.4;
        word-break: keep-all;
      }
      
      /* 선택지 */
      .question-options {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        margin-top: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
      }
      
      .option-btn {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        background: white;
        border: 2px solid var(--toss-gray-100);
        border-radius: var(--radius-xl);
        text-align: left;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }
      
      .option-btn:active {
        transform: scale(0.98);
        border-color: var(--toss-blue);
        background: var(--toss-blue-light);
      }
      
      .option-indicator {
        width: 36px;
        height: 36px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        flex-shrink: 0;
      }
      
      .option-text {
        font-size: var(--font-md);
        font-weight: var(--font-medium);
        color: var(--toss-gray-800);
        flex: 1;
        line-height: 1.4;
      }
    </style>
  `;

  // 뒤로가기 버튼
  document.getElementById('backBtn').addEventListener('click', () => {
    if (questionNum > 1) {
      const answers = store.get('mbtiAnswers');
      answers.pop();
      store.set('mbtiAnswers', answers);
      router.navigate(`/fin-mbti/question?q=${questionNum - 1}`);
    } else {
      router.navigate('/fin-mbti');
    }
  });

  // 옵션 선택
  const handleOptionClick = (type) => {
    const answers = store.get('mbtiAnswers');
    answers.push(type);
    store.set('mbtiAnswers', answers);

    if (questionNum < totalQuestions) {
      router.navigate(`/fin-mbti/question?q=${questionNum + 1}`);
    } else {
      router.navigate('/fin-mbti/result');
    }
  };

  document.getElementById('optionA').addEventListener('click', (e) => {
    handleOptionClick(e.currentTarget.dataset.type);
  });

  document.getElementById('optionB').addEventListener('click', (e) => {
    handleOptionClick(e.currentTarget.dataset.type);
  });
}
