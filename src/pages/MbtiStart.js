// Fin-MBTI 테스트 시작 페이지 - 이미지 디자인 반영
import { router } from '../router.js';
import { store } from '../store.js';

export function renderMbtiStart(container) {
  // 기존 답변 초기화
  store.set('mbtiAnswers', []);

  container.innerHTML = `
    <div class="mbti-start-page">
      <div class="mbti-start-content">
        <div class="mbti-visual animate-fade-in">
          <div class="visual-circle">
            <div class="circle-ring ring-1"></div>
            <div class="circle-ring ring-2"></div>
            <div class="circle-ring ring-3"></div>
            <div class="visual-icons">
              <span class="v-icon v-1">📊</span>
              <span class="v-icon v-2">💰</span>
              <span class="v-icon v-3">📈</span>
              <span class="v-icon v-4">🎯</span>
              <span class="v-icon v-5">💎</span>
              <span class="v-icon v-6">🏦</span>
            </div>
          </div>
        </div>
        
        <div class="mbti-text animate-slide-up">
          <h1 class="mbti-title">
            2026<br>
            투자 성향 테스트
          </h1>
          <p class="mbti-subtitle">
            나의 투자 캐릭터를<br>
            찾으러 가볼까요?
          </p>
        </div>
        
        <div class="mbti-info">
          <div class="info-chips">
            <span class="info-chip"><span class="chip-icon">⏱️</span> 2분</span>
            <span class="info-chip"><span class="chip-icon">📝</span> 16문항</span>
          </div>
        </div>
      </div>
      
      <div class="mbti-bottom">
        <button class="btn btn-primary btn-lg btn-full start-btn" id="startBtn">
          테스트 시작하기
        </button>
      </div>
    </div>
    
    <style>
      .mbti-start-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
      }
      
      .mbti-start-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-xl);
        position: relative;
        z-index: 1;
      }
      
      .mbti-visual {
        position: relative;
        width: 280px;
        height: 280px;
        margin-bottom: var(--spacing-xl);
      }
      
      .visual-circle {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .circle-ring {
        position: absolute;
        border-radius: 50%;
        border: 2px solid rgba(49, 130, 246, 0.3);
      }
      
      .ring-1 {
        width: 120px;
        height: 120px;
        border-color: rgba(49, 130, 246, 0.5);
        animation: pulse-ring 2s ease-in-out infinite;
      }
      
      .ring-2 {
        width: 180px;
        height: 180px;
        animation: pulse-ring 2s ease-in-out infinite 0.3s;
      }
      
      .ring-3 {
        width: 240px;
        height: 240px;
        animation: pulse-ring 2s ease-in-out infinite 0.6s;
      }
      
      @keyframes pulse-ring {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.05); opacity: 0.8; }
      }
      
      .visual-icons {
        position: relative;
        width: 100%;
        height: 100%;
      }
      
      .v-icon {
        position: absolute;
        font-size: 32px;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        animation: float-icon 3s ease-in-out infinite;
      }
      
      .v-1 { top: 20px; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
      .v-2 { top: 60px; right: 30px; animation-delay: 0.5s; }
      .v-3 { bottom: 60px; right: 30px; animation-delay: 1s; }
      .v-4 { bottom: 20px; left: 50%; transform: translateX(-50%); animation-delay: 1.5s; }
      .v-5 { bottom: 60px; left: 30px; animation-delay: 2s; }
      .v-6 { top: 60px; left: 30px; animation-delay: 2.5s; }
      
      @keyframes float-icon {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      
      .v-1, .v-4 {
        animation: float-icon-center 3s ease-in-out infinite;
      }
      
      @keyframes float-icon-center {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-8px); }
      }
      
      .mbti-text {
        text-align: center;
        color: white;
        margin-bottom: var(--spacing-xl);
      }
      
      .mbti-title {
        font-size: 36px;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: var(--spacing-md);
        background: linear-gradient(135deg, #fff 0%, #a8d8ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .mbti-subtitle {
        font-size: var(--font-lg);
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.5;
      }
      
      .mbti-info {
        margin-bottom: var(--spacing-lg);
      }
      
      .info-chips {
        display: flex;
        gap: var(--spacing-md);
      }
      
      .info-chip {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm) var(--spacing-md);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-full);
        color: white;
        font-size: var(--font-sm);
        backdrop-filter: blur(10px);
      }
      
      .chip-icon {
        font-size: 14px;
      }
      
      .mbti-bottom {
        padding: var(--spacing-lg);
        padding-bottom: calc(var(--spacing-xl) + var(--safe-area-bottom));
      }
      
      .start-btn {
        height: 56px;
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        background: linear-gradient(135deg, #3182F6 0%, #6B5CE7 100%);
        box-shadow: 0 8px 24px rgba(49, 130, 246, 0.4);
        border: none;
      }
      
      .start-btn:active {
        transform: scale(0.98);
      }
    </style>
  `;

  // 이벤트 바인딩
  document.getElementById('startBtn').addEventListener('click', () => {
    router.navigate('/fin-mbti/question?q=1');
  });
}
