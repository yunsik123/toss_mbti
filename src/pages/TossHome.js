// 토스 앱 홈 화면 - 2026 버전
import { router } from '../router.js';
import { store } from '../store.js';

export function renderTossHome(container) {
  const character = store.get('character');
  const hasCharacter = !!character;

  container.innerHTML = `
    <div class="toss-home">
      <header class="toss-header">
        <div class="header-logo">
          <span class="logo-text">2026</span>
          <span class="logo-sub">투자 캐릭터</span>
        </div>
        <div class="header-actions">
          <button class="btn btn-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </header>
      
      <div class="toss-content">
        <!-- 메인 배너 -->
        <section class="hero-banner animate-fade-in">
          <div class="hero-bg"></div>
          <div class="hero-content">
            <span class="hero-badge">Fin-MBTI</span>
            <h1 class="hero-title">2026년,<br>나의 투자 성향은?</h1>
            <p class="hero-desc">16개 질문으로 알아보는 투자 캐릭터</p>
          </div>
          <div class="hero-visual">
            <span class="hero-icon h-1">📈</span>
            <span class="hero-icon h-2">💎</span>
            <span class="hero-icon h-3">🎯</span>
          </div>
        </section>
        
        <!-- 캐릭터 또는 테스트 버튼 -->
        ${hasCharacter ? `
          <section class="character-section animate-slide-up" id="goToCharacter">
            <div class="char-card">
              <div class="char-avatar" style="background: ${character.color}20;">
                <span class="char-emoji">${character.emoji}</span>
              </div>
              <div class="char-info">
                <h3 class="char-name">${character.characterName}</h3>
                <p class="char-desc">오늘도 성장시켜볼까요?</p>
              </div>
              <div class="char-arrow">›</div>
            </div>
          </section>
        ` : `
          <section class="cta-section animate-slide-up">
            <button class="cta-btn" id="startTest">
              <span class="cta-icon">🚀</span>
              <span class="cta-text">테스트 시작하기</span>
            </button>
          </section>
        `}
        
        <!-- 서비스 그리드 -->
        <section class="services-section animate-slide-up">
          <h3 class="section-title">투자 도구</h3>
          <div class="services-grid">
            <div class="service-item">
              <div class="service-icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">💰</div>
              <span class="service-label">자산</span>
            </div>
            <div class="service-item">
              <div class="service-icon" style="background: linear-gradient(135deg, #00C48C, #00D9A0);">📊</div>
              <span class="service-label">분석</span>
            </div>
            <div class="service-item">
              <div class="service-icon" style="background: linear-gradient(135deg, #FF6B6B, #FF8E8E);">📰</div>
              <span class="service-label">뉴스</span>
            </div>
            <div class="service-item">
              <div class="service-icon" style="background: linear-gradient(135deg, #F5A623, #FFD93D);">📚</div>
              <span class="service-label">학습</span>
            </div>
          </div>
        </section>
        
        <!-- Fin-MBTI 정보 -->
        <section class="info-section">
          <h3 class="section-title">Fin-MBTI란?</h3>
          <div class="info-cards">
            <div class="info-card">
              <span class="info-icon">🎯</span>
              <div class="info-content">
                <h4>투자 성향 분석</h4>
                <p>4개 축으로 16가지 유형 분류</p>
              </div>
            </div>
            <div class="info-card">
              <span class="info-icon">🐾</span>
              <div class="info-content">
                <h4>캐릭터 매칭</h4>
                <p>나만의 투자 캐릭터와 함께</p>
              </div>
            </div>
            <div class="info-card">
              <span class="info-icon">📈</span>
              <div class="info-content">
                <h4>성장 시스템</h4>
                <p>미션으로 캐릭터 키우기</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <div class="footer">
        <p>© 2026 투자 캐릭터</p>
      </div>
    </div>
    
    <style>
      .toss-home {
        min-height: 100vh;
        background: #f8f9fa;
      }
      
      .toss-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md) var(--spacing-lg);
        background: white;
        position: sticky;
        top: 0;
        z-index: 100;
        border-bottom: 1px solid var(--toss-gray-100);
      }
      
      .header-logo {
        display: flex;
        align-items: baseline;
        gap: var(--spacing-xs);
      }
      
      .logo-text {
        font-size: var(--font-xl);
        font-weight: 800;
        background: linear-gradient(135deg, #3182F6, #6B5CE7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .logo-sub {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
        font-weight: var(--font-medium);
      }
      
      .header-actions .btn-icon {
        color: var(--toss-gray-600);
      }
      
      .toss-content {
        padding: var(--spacing-lg);
      }
      
      /* 히어로 배너 */
      .hero-banner {
        position: relative;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        border-radius: var(--radius-2xl);
        padding: var(--spacing-xl);
        margin-bottom: var(--spacing-lg);
        overflow: hidden;
        min-height: 200px;
      }
      
      .hero-bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 80% 20%, rgba(107, 92, 231, 0.3), transparent 50%);
      }
      
      .hero-content {
        position: relative;
        z-index: 1;
      }
      
      .hero-badge {
        display: inline-block;
        padding: 4px 12px;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: var(--radius-full);
        color: white;
        font-size: var(--font-xs);
        font-weight: var(--font-bold);
        margin-bottom: var(--spacing-md);
        backdrop-filter: blur(10px);
      }
      
      .hero-title {
        font-size: 28px;
        font-weight: 800;
        color: white;
        line-height: 1.3;
        margin-bottom: var(--spacing-sm);
      }
      
      .hero-desc {
        font-size: var(--font-md);
        color: rgba(255, 255, 255, 0.7);
      }
      
      .hero-visual {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 100px;
        height: 100px;
      }
      
      .hero-icon {
        position: absolute;
        font-size: 28px;
        animation: float-hero 3s ease-in-out infinite;
      }
      
      .h-1 { top: 0; right: 0; animation-delay: 0s; }
      .h-2 { top: 30px; right: 40px; animation-delay: 0.5s; }
      .h-3 { top: 60px; right: 10px; animation-delay: 1s; }
      
      @keyframes float-hero {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      
      /* 캐릭터 섹션 */
      .character-section {
        margin-bottom: var(--spacing-lg);
      }
      
      .char-card {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        background: white;
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: transform 0.2s;
      }
      
      .char-card:active {
        transform: scale(0.98);
      }
      
      .char-avatar {
        width: 56px;
        height: 56px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .char-emoji {
        font-size: 32px;
      }
      
      .char-info {
        flex: 1;
      }
      
      .char-name {
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
      }
      
      .char-desc {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
      }
      
      .char-arrow {
        font-size: 24px;
        color: var(--toss-gray-400);
      }
      
      /* CTA 버튼 */
      .cta-section {
        margin-bottom: var(--spacing-lg);
      }
      
      .cta-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        width: 100%;
        padding: var(--spacing-lg);
        background: linear-gradient(135deg, #3182F6, #6B5CE7);
        border-radius: var(--radius-xl);
        color: white;
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        box-shadow: 0 8px 24px rgba(49, 130, 246, 0.3);
        transition: transform 0.2s;
      }
      
      .cta-btn:active {
        transform: scale(0.98);
      }
      
      .cta-icon {
        font-size: 24px;
      }
      
      /* 서비스 그리드 */
      .services-section {
        margin-bottom: var(--spacing-lg);
      }
      
      .section-title {
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
        margin-bottom: var(--spacing-md);
      }
      
      .services-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--spacing-sm);
        background: white;
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }
      
      .service-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
      }
      
      .service-icon {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }
      
      .service-label {
        font-size: var(--font-sm);
        color: var(--toss-gray-700);
        font-weight: var(--font-medium);
      }
      
      /* 정보 카드 */
      .info-section {
        margin-bottom: var(--spacing-lg);
      }
      
      .info-cards {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }
      
      .info-card {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        background: white;
        border-radius: var(--radius-lg);
        padding: var(--spacing-md) var(--spacing-lg);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }
      
      .info-icon {
        font-size: 28px;
      }
      
      .info-content h4 {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-900);
        margin-bottom: 2px;
      }
      
      .info-content p {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
      }
      
      /* 푸터 */
      .footer {
        text-align: center;
        padding: var(--spacing-xl);
        color: var(--toss-gray-400);
        font-size: var(--font-sm);
      }
    </style>
  `;

  // 이벤트 바인딩
  const startTestBtn = document.getElementById('startTest');
  const goToCharacterBtn = document.getElementById('goToCharacter');

  if (startTestBtn) {
    startTestBtn.addEventListener('click', () => {
      router.navigate('/fin-mbti');
    });
  }

  if (goToCharacterBtn) {
    goToCharacterBtn.addEventListener('click', () => {
      router.navigate('/main');
    });
  }
}
